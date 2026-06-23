import type { RoleLens } from './types';

export type LensDef = {
  id: RoleLens;
  label: string;
  tagline: string;
  /** Per-role reframe of the headline. */
  headline: string;
  /** Why he fits this role — grounded in real projects. */
  fitSummary: string;
  /** §E stack-deficit honesty: name the gap + the transferable bridge. */
  bridge: string;
  /** Role-relevant skills to surface for this lens. */
  skills: string[];
};

// Order mirrors ROADMAP: Backend · Embedded/IoT · Full-stack · QA/Test ·
// Scrum-Master/PM · Tech Lead/EM · Forward-Deployed/Product.
export const lenses: LensDef[] = [
  {
    id: 'backend',
    label: 'Backend Engineer',
    tagline: 'Distributed systems, APIs, data pipelines',
    headline:
      '18+ years building backend systems — C# .NET, Java, Python, SQL — from national-scale monitoring platforms to distributed real-time GPS.',
    fitSummary:
      'Backend is the spine of nearly every project: Transjakarta’s high-performance distributed real-time GPS (1M+ commuters, 7,000+ buses), the Kawan Lama DevSecOps framework on Kafka / Elasticsearch / Redis, PINTAR’s national monitoring platform integrated with SAP, and the EV Fleet ETL pipelines turning raw CAN telemetry into business insight.',
    bridge:
      'Primary production stacks are C# .NET and Java. Less production Go or Rust — but the polyglot track record (Java → PHP → C# → Python → embedded C/C++) shows he ramps a new backend language to production quality fast.',
    skills: [
      'C# .NET', 'Entity Framework', 'Java', 'Python', 'SQL',
      'Kafka', 'Elasticsearch', 'Redis', 'PostgreSQL',
      'Distributed systems', 'Event-driven', 'ETL pipelines',
    ],
  },
  {
    id: 'embedded',
    label: 'Embedded / IoT Engineer',
    tagline: 'Firmware, RTOS, secure devices',
    headline:
      'Multi-platform embedded firmware across STM32, nRF52833, and ESP32 — plus cryptographic security R&D for offline IoT devices.',
    fitSummary:
      'At Alltrons: a MIFARE smart-lock unlock with full lock-sequence parity (solenoid, LEDs, Hall-sensor auto-relock) across 3 firmware stacks — STM32 ST HAL, nRF52833 Zephyr RTOS, ESP32 ESP-IDF — over I²C and a serial daisy chain. And the Secure Offline IoT Bridge: architecting a cryptographic trust chain (signed CBOR tokens, RSA-3072 via the ESP32-S3 DS peripheral, monotonic-counter replay defence) for offline devices relayed through an untrusted BLE phone.',
    bridge:
      'The deep embedded work is recent (2026) rather than a decade long. The bridge: he ramped across 3 hardware platforms and a non-trivial cryptographic threat model in months, on top of CCNA-era networking fundamentals and hands-on Raspberry Pi / GPIO tinkering.',
    skills: [
      'STM32 (ST HAL)', 'nRF52833 (Zephyr RTOS)', 'ESP32 (ESP-IDF / FreeRTOS)',
      'I²C', 'BLE', 'MIFARE / RFID / NFC', 'CBOR', 'RSA-3072 / Ed25519',
      'HAL-portable firmware',
    ],
  },
  {
    id: 'fullstack',
    label: 'Full-stack Engineer',
    tagline: 'UI to cloud, owned end-to-end',
    headline:
      'End-to-end ownership — React front-ends on C# .NET / Laravel backends, deployed to AWS and Azure.',
    fitSummary:
      'The EV Fleet Dashboard is full-stack ownership in a single project: React UI, Laravel backend, AWS + Amazon Athena, CAN-bus ETL pipelines, real-time mapping, and Terraform IaC — architected and delivered solo. Reinforced by Transjakarta and the Kawan Lama framework spanning backend, frontend, and mobile.',
    bridge:
      'Strong on React + C# / .NET / Laravel. Less Next.js or Vue in production — but the framework-agnostic full-stack pattern (build the UI, wire the API, ship to cloud) transfers directly; this very site is React + TypeScript on Vite.',
    skills: [
      'React', 'C# .NET', 'Laravel', 'Web API', 'Micro Frontend',
      'AWS', 'Azure', 'Docker', 'Terraform', 'PostgreSQL',
    ],
  },
  {
    id: 'qa',
    label: 'QA / Test Engineer',
    tagline: 'Quality as a discipline',
    headline:
      'Software quality as a discipline — Test Manager roles, 90% pytest coverage, static + dynamic analysis tooling, ISO 25010 training, and an ISTQB roadmap in progress.',
    fitSummary:
      'Test Manager on the HAS Green Academy cow-welfare detection system: 90% pytest coverage across critical, happy, and boundary paths, with a 20% improvement in detection accuracy. The ATM tool at Thermo Fisher is static + dynamic analysis — C# AST → Activity Diagrams and OpenTelemetry → flame graphs — that can cut physical performance verification by 90%. Plus internal-auditor experience for the ISO 9001 Quality Management System.',
    bridge:
      'ISTQB CTFL and CT-AI are in progress, not yet certified — the honest gap. The bridge: a formal Test Manager role with hard coverage metrics, ISO/IEC 25010 software-product-quality training (TU/e), and requirements & test-plan / test-scenario workshops mentored during the EngD.',
    skills: [
      'pytest', 'Static / dynamic analysis', 'AST', 'OpenTelemetry',
      'ISO/IEC 25010', 'V-model test plans', 'Test scenarios',
      'Internal audit (ISO 9001)', 'Risk-based testing',
    ],
  },
  {
    id: 'pm',
    label: 'Scrum Master / Project Manager',
    tagline: 'Delivery, governance, stakeholders',
    headline:
      '10+ years of formal PM / SM ownership — PMP (active) + PSM I — across a €1M+ portfolio and a national IT function.',
    fitSummary:
      'Scrum Master + Architect + PM at Ecomindo across 9 teams (financial services, retail, transportation). Before that, PMO Team member and PM / Analyst across PLN’s 10+ internal-product portfolio — PINTAR (4-year), Virtual Cubicle (team of 30, 3-year), the SAP ERP rescue (team of 18).',
    bridge:
      'Credentials are current, not lapsed: PMP active until Jan 2028, PSM I with no expiry. Methodology breadth spans Scrum, SAFe, PMBOK, and ITIL v4 — applied in the field, with the formal certs to back the agile and PM sides.',
    skills: [
      'PMP', 'PSM I', 'Scrum', 'SAFe', 'PMBOK',
      'Stakeholder management', 'Roadmap & prioritisation',
      'PRD authoring', 'Portfolio governance (PMO)',
    ],
  },
  {
    id: 'techlead',
    label: 'Tech Lead / Engineering Manager',
    tagline: 'Technical depth + people judgment',
    headline:
      '8.5 years running an IT function (30× asset growth) and leading 9 teams — technical depth paired with people judgment.',
    fitSummary:
      'PLN IT Manager: led digital transformation, grew managed IT assets from 1B to 30B IDR over 8 years (30×), and established ITIL v4 ITSM to the 2nd-highest maturity level in the PLN group. At Ecomindo, led engineering effectiveness across 9 software and data teams. Throughout, mentored team members to grow as professionals.',
    bridge:
      'Most of the formal leadership tenure is in Indonesia (PLN, Ecomindo) rather than the EU — but it is leadership at national scale, and the recent EU IC work (Thermo Fisher, Alltrons) keeps the hands-on technical credibility an EM needs current.',
    skills: [
      'Team leadership', 'Mentorship', 'Digital transformation',
      'ITIL v4 ITSM', 'Architecture at scale', 'IT strategy / Master Plans',
      'Stakeholder management',
    ],
  },
  {
    id: 'product',
    label: 'Product / Forward-Deployed Engineer',
    tagline: 'One-person owner, AI-augmented',
    headline:
      'The most experienced one-person owner on the market — 4 pure-PE projects + 13 years of role-cycling, now AI-augmented.',
    fitSummary:
      'Four projects owned end-to-end by a single engineer: ATM (Thermo Fisher), the EV Fleet Dashboard, the Secure Offline IoT Bridge, and hasrul.buzz (this site — a gamified personal brand with persona routing and game-first landing). Behind them, 13+ years cycling through PM / Analyst / Architect / Developer / QE — often holding 2–3 hats at once. Plus daily AI-augmented engineering (Claude, Gemini, Copilot, ChatGPT, Deepseek) and a standalone LLM SQL-agent build.',
    bridge:
      'FDE / PE roles want someone who shape-shifts per customer and per phase — which is exactly what the role-cycling proves; the 4 pure-PE projects show he can also be every role at once when the project demands it. PM Flip training + PMP + PSM I back the customer / PRD / problem-validation muscle.',
    skills: [
      'End-to-end ownership', 'AI-augmented engineering (Claude / Gemini / Copilot / ChatGPT / Deepseek)',
      'LLM SQL agent', 'PM Flip / PRD / MVP', 'Cross-stack delivery',
      'Customer-facing scoping',
    ],
  },
];

export function getLens(id: string | null): LensDef | null {
  if (!id) return null;
  return lenses.find((l) => l.id === id) ?? null;
}
