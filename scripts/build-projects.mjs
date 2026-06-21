// Crawl %HASRUL_PROFILE%/projects.csv and emit a career-wide tech -> projects index.
//
// Why: the skill tree needs accurate "how many projects used this stack, and which"
// numbers. Hand-curating that on a handful of flagships under-counts. This script
// reads the full project history (the private source of truth, which lives OUTSIDE
// this repo) and writes a derived, publishable index into src/content.
//
// Run:  node scripts/build-projects.mjs    (or: npm run build:projects)
//
// Only the DERIVED index is committed — projects.csv itself is never copied in.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..');

const profile = process.env.HASRUL_PROFILE;

// OneDrive Known-Folder-Move localizes "Documents" to the OS display language
// (e.g. Korean "문서"), so the env var path may not physically resolve. Swap any
// localized Documents segment back to the real "Documents" folder.
function delocalize(p) {
  const localized = ['문서', '文書', '文档', 'Documenten', 'Dokumente', 'Documentos', 'Documents'];
  return p
    .split(/([\\/])/)
    .map((seg) => (localized.includes(seg) ? 'Documents' : seg))
    .join('');
}

function resolveCsv() {
  const candidates = [];
  const arg = process.argv[2];
  if (arg) candidates.push(arg.toLowerCase().endsWith('.csv') ? arg : join(arg, 'projects.csv'));
  if (profile) {
    candidates.push(join(profile, 'projects.csv'));
    candidates.push(join(delocalize(profile), 'projects.csv'));
  }
  return candidates.find((p) => existsSync(p));
}

if (!profile && !process.argv[2]) {
  console.error('✗ HASRUL_PROFILE is not set and no path arg given — cannot find projects.csv.');
  process.exit(1);
}
const csvPath = resolveCsv();
if (!csvPath) {
  console.error('✗ Could not locate projects.csv (tried HASRUL_PROFILE and a delocalized fallback).');
  process.exit(1);
}

// ── RFC-4180-ish CSV parser (quoted fields, doubled-quote escapes, newlines in quotes)
function parseCSV(text) {
  const rows = [];
  let field = '';
  let row = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field); field = '';
    } else if (c === '\r') {
      // ignore
    } else if (c === '\n') {
      row.push(field); rows.push(row); row = []; field = '';
    } else {
      field += c;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

// ── Canonical tech vocabulary the skill tree may display.
// Superset of every `tech` token used by the curated flagships in src/content/projects.ts,
// plus a few common neighbours. Tokens not present in the CSV simply produce no entry.
const VOCAB = [
  'C# .NET', '.NET', 'Entity Framework', 'Java', 'Python', 'PHP', 'CodeIgniter', 'Laravel', 'Symfony',
  'JavaScript', 'React', 'Web API', 'Angular',
  'SQL', 'SQL Server', 'PostgreSQL', 'MySQL', 'Oracle', 'MongoDB', 'Redis', 'Elasticsearch',
  'Kafka', 'AWS', 'Azure', 'Amazon Athena', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'GitLab',
  'New Relic', 'Grafana', 'OpenTelemetry', 'Flamegraph', 'AST', 'PlantUML',
  'ETL', 'CAN bus', 'SAP', 'SAP Business One', 'SharePoint', 'Alfresco',
  'STM32', 'nRF52833', 'ESP32', 'ESP32-S3', 'Zephyr RTOS', 'ESP-IDF', 'FreeRTOS', 'ST HAL',
  'MIFARE', 'I²C', 'BLE', 'RFID/NFC', 'NFC', 'QR',
  'CBOR', 'RSA-3072', 'Ed25519', 'eFuse', 'HAL',
  'pytest', 'Databricks', 'MLflow', 'IoT', 'Machine Learning', 'GIS', 'R',
];

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// "uses token" = token appears in the field as a whole word/phrase (not glued to alnum).
// Prevents Java∈JavaScript, SQL∈MySQL, .NET∈ASP.NET false positives.
function uses(field, token) {
  if (!field) return false;
  const re = new RegExp(`(?<![A-Za-z0-9])${escapeRegex(token)}(?![A-Za-z0-9])`, 'i');
  return re.test(field);
}

function shortName(name) {
  let s = (name || '').split(/\s+\(/)[0];     // drop trailing "(...)"
  s = s.split(/\s+[—–-]\s+/)[0].trim();        // drop after dash separators
  return s.length > 52 ? s.slice(0, 50).trim() + '…' : s;
}

// ── Read + parse
let raw;
try {
  raw = readFileSync(csvPath, 'utf8');
} catch (e) {
  console.error(`✗ Could not read ${csvPath}: ${e.message}`);
  process.exit(1);
}
const rows = parseCSV(raw);
const header = rows[0].map((h) => h.trim());
const NAME = header.indexOf('project_name');
const TECH = header.indexOf('technologies');
if (NAME < 0 || TECH < 0) {
  console.error('✗ Could not find project_name / technologies columns in the CSV header.');
  process.exit(1);
}

// ── Build the index: token -> [project short names], deduped, career-wide.
const index = {};
let scanned = 0;
for (let r = 1; r < rows.length; r++) {
  const row = rows[r];
  if (!row || row.length <= TECH) continue;
  scanned++;
  const techField = row[TECH];
  const sn = shortName(row[NAME]);
  if (!sn) continue;
  for (const token of VOCAB) {
    if (uses(techField, token)) {
      (index[token] ??= []);
      if (!index[token].includes(sn)) index[token].push(sn);
    }
  }
}

// Sort each proof list alphabetically for stable output.
for (const k of Object.keys(index)) index[k].sort((a, b) => a.localeCompare(b));

const outDir = join(repoRoot, 'src', 'content');
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'techIndex.generated.ts');
const banner =
  '// AUTO-GENERATED by scripts/build-projects.mjs from the private projects.csv.\n' +
  '// Do not edit by hand. Regenerate with: npm run build:projects\n' +
  '// Maps a technology -> the projects (career-wide) that used it.\n\n';
const body =
  `export const techIndex: Record<string, string[]> = ${JSON.stringify(index, null, 2)};\n`;
writeFileSync(outPath, banner + body, 'utf8');

const tokenCount = Object.keys(index).length;
console.log(`✓ Scanned ${scanned} project rows.`);
console.log(`✓ Indexed ${tokenCount} technologies → src/content/techIndex.generated.ts`);
// Show a few high-count entries as a sanity check.
const top = Object.entries(index).sort((a, b) => b[1].length - a[1].length).slice(0, 8);
for (const [t, ps] of top) console.log(`   ${t}: ×${ps.length}`);
