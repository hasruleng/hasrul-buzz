export type Persona = 'recruiter' | 'founder' | 'stalker';

export type RoleLens =
  | 'backend'
  | 'embedded'
  | 'fullstack'
  | 'qa'
  | 'pm'
  | 'techlead'
  | 'product';

export type Station = {
  id: string;
  period: string;
  employer: string;
  location: string;
  role: string;
  summary: string;
  bullets: string[];
  tags: RoleLens[];
};

export type Project = {
  id: string;
  name: string;
  short: string; // compact label for dense UIs (skill tree, badges)
  employer: string;
  period: string;
  oneLiner: string;
  metric?: string;
  tech: string[]; // concrete stack, sourced verbatim from projects.csv
  tags: RoleLens[];
  isPurePE?: boolean; // the 3 pure product-engineer projects
};
