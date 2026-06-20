import type { Station } from './types';

export const stations: Station[] = [
  {
    id: 'alltrons',
    period: 'Jan 2026 – present',
    employer: 'Alltrons B.V.',
    location: 'Eindhoven, Netherlands',
    role: 'Senior Software / Fullstack Engineer',
    summary:
      'Shipping across 5 simultaneous projects spanning full-stack web, enterprise supply chain, mobile, multi-platform embedded firmware, and security R&D — the breadth of a 5-role team as one IC.',
    bullets: [
      'EV Fleet Dashboard — full-stack IoT dashboard (Laravel, React, AWS, Amazon Athena, CAN-bus ETL, Terraform) giving fleet operators real-time vehicle health and energy insights',
      'AlphaTheta (Pioneer DJ) Warranty & Service Support — global supply chain system with Obligato (Hitachi) ERP integration across international warehouses, couriers, and service centres',
      'Speechlabel — cross-platform Android & iOS accessibility app using QR/NFC scanning to help people with low-vision identify objects',
      'MIFARE Smart-Lock Integration — contactless unlock across 3 firmware stacks (STM32 ST HAL, nRF52833 Zephyr RTOS, ESP32 ESP-IDF) connected via I²C and serial daisy chain',
      'Secure Offline IoT Bridge (WBSO 2026-1) — R&D Architect for cryptographic trust chain between server and offline IoT device relayed over BLE through an untrusted phone; signed CBOR tokens, RSA-3072 via ESP32-S3 DS peripheral, monotonic-counter replay defence',
    ],
    tags: ['backend', 'fullstack', 'embedded', 'product'],
  },
  {
    id: 'thermo-fisher',
    period: 'Jan 2025 – Oct 2025',
    employer: 'Thermo Fisher Scientific (Contract) · TU/e EngD',
    location: 'Eindhoven, Netherlands',
    role: 'Software Engineer / Static Analysis Engineer',
    summary:
      'Individual EngD year-2 design assignment formalised as a contract. Built software quality tooling for Semiconductor TEM systems — one engineer, one tool, one measurable outcome.',
    bullets: [
      'Algorithm Throughput Modeler (ATM) — extracts Activity Diagrams from C# solutions so hardware and domain engineers can understand complex software without reading code',
      'Performance modelling via OpenTelemetry telemetry → flame graphs, reducing reliance on costly physical TEM performance tests by 80%',
      'Stack: Python, C# .NET, AST, PlantUML, Flamegraph, OpenTelemetry · SAFe · Team of 4',
    ],
    tags: ['backend', 'qa', 'product'],
  },
  {
    id: 'tue-engd',
    period: 'Oct 2023 – Oct 2025',
    employer: 'TU Eindhoven — EngD Software Technology',
    location: 'Eindhoven, Netherlands',
    role: 'EngD Trainee',
    summary:
      '3rd-cycle postgraduate technological designer program at the Stan Ackermans Institute (4TU). Year 1: advanced design methods. Year 2: individual industry assignment at Thermo Fisher.',
    bullets: [
      'SWAP Store @ Thermo Fisher — Quality Manager + Developer + Supporting Architect; built an App Store for Electron Microscopy in 5 effective working weeks (team of 8)',
      'Brush Usage Detection @ HAS Green Academy — Test Manager + SE; delivered 90% pytest coverage (critical/happy/boundary), 20% improvement in detection accuracy (team of 7)',
      'WWF Forest Foresight — Software Quality Engineer; hands-on Databricks + MLflow / MLOps on a GIS deforestation-prediction pipeline used by Ministries of Forestry across tropical-belt countries',
    ],
    tags: ['qa', 'backend', 'fullstack'],
  },
  {
    id: 'ecomindo',
    period: 'Nov 2021 – Oct 2023',
    employer: 'Ecomindo',
    location: 'Indonesia',
    role: 'Scrum Master / Supporting Architect / Project Manager',
    summary:
      'Led engineering effectiveness across 9 software and data teams spanning financial services, retail, and transportation — one person holding the Scrum Master + Architect + PM stack across a €1M+ portfolio.',
    bullets: [
      'Kawan Lama Group DevSecOps Framework — architecture lead; framework adopted by 50+ engineers across 9 teams and 30+ retail & F&B brands (C# .NET, React, Kafka, Elasticsearch, Redis, Azure)',
      'Transjakarta Bus Operation Management System — Scrum Master + Architect; replaced Moovit API with custom high-performance distributed real-time GPS serving 1M+ daily commuters and 7,000+ buses',
      'SIS ADARO Integrated Data Platform (mining), Astra Internasional Azure AD/B2C (identity), TICMI National Capital Markets Data Platform — PM / Scrum Master',
      'Multiple ID Clear (KPEI) fintech engagements — securities clearing and risk management',
    ],
    tags: ['backend', 'fullstack', 'pm', 'techlead'],
  },
  {
    id: 'pln',
    period: 'Feb 2013 – Nov 2021',
    employer: 'PT PLN Enjiniring',
    location: 'Jakarta, Indonesia',
    role: 'IT Manager → Risk Analyst (+ PMO Team 2013–2015)',
    summary:
      '8.5 years owning the IT function of Indonesia\'s flagship power-engineering consultancy — grew IT assets 30× while simultaneously acting as Product Manager, Business Analyst, and Architect across 10+ internal products.',
    bullets: [
      'Grew managed IT assets from 1B IDR (2013) to 30B IDR (2021) — 30× in 8 years',
      'PINTAR — national land-clearance monitoring platform for Indonesia\'s 35GW power programme across PLN HQ and 18 regional construction offices, integrated with Accenture PMO and PLN SAP (4-year project as PM + Analyst + Architect)',
      'PRIMA — integrated project monitoring system that surfaced €100K+ in financial anomalies and prevented a €200K write-off in year one',
      'IT Service Management (ITIL v4) — achieved 2nd highest IT maturity level in the PLN group',
      'GitLab & Docker implementation, SAP Business One ERP (team of 18), Virtual Cubicle digital-workplace platform (team of 30, 3 years, New Relic observability), Detail Engineering Design / Integrated BIM platform (PM + procurement, team of 15), 3× IT Master Plans',
    ],
    tags: ['backend', 'fullstack', 'pm', 'techlead', 'qa'],
  },
  {
    id: 'pariti',
    period: 'Nov 2011 – Jan 2013',
    employer: 'Pariti Indonesia',
    location: 'Indonesia',
    role: 'Co-Founder / Software Engineer',
    summary:
      'Co-founded Pariti and ran client engagements end-to-end — met clients, scoped, built, and delivered. The original one-person-owner shape.',
    bullets: [
      'Bank Indonesia CRR Application — Cash Recovery Rate system for the central bank (Java, SQL, C#)',
      'BNI Biometric Attendance System — biometric attendance for a national bank (Java)',
      'Pegadaian RINGS — Risk Management System for Indonesia\'s national pawnbroking SOE (PHP, SQL)',
    ],
    tags: ['backend', 'fullstack', 'product'],
  },
  {
    id: 'academia',
    period: '2004 – 2016',
    employer: 'Warnet · UI · Sun Moon University',
    location: 'Indonesia / South Korea',
    role: 'Entrepreneur · Researcher · Lecturer',
    summary:
      'The origin arc: 7-year internet café owner (tech + ops + HR + finance), MSc at Sun Moon University in South Korea on a BK21 government scholarship, and UI Lecturer for 4 years (parallel with Pariti and PLN).',
    bullets: [
      'Warnet (Internet Café), Asrama UI — launched and ran a dorm internet café from his 2nd undergrad semester; recruited staff, managed accounting, served the university community for ~8 years',
      'Sun Moon University ITRC — Graduate Researcher; developed Java bridge and API for the C++-based SID simulation system (BK21 full scholarship, South Korea)',
      'University of Indonesia — Lecturer (Information Systems & Operations Management) + Teaching/Research Assistant',
    ],
    tags: ['product', 'pm', 'backend'],
  },
];
