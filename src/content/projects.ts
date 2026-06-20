import type { Project } from './types';

export const projects: Project[] = [
  {
    id: 'atm',
    name: 'Algorithm Throughput Modeler — Thermo Fisher Scientific',
    employer: 'Thermo Fisher (Contract)',
    period: 'Jan–Oct 2025',
    oneLiner:
      'Built software quality tooling solo — Activity Diagram extraction from C# AST + telemetry-driven performance modelling — eliminating 80% of physical TEM test time.',
    metric: '80% reduction in physical performance verification time',
    tags: ['qa', 'backend', 'product'],
    isPurePE: true,
  },
  {
    id: 'ev-fleet',
    name: 'EV Fleet Dashboard — Alltrons',
    employer: 'Alltrons',
    period: 'Jan–Mar 2026',
    oneLiner:
      'Architected and delivered a full-stack IoT dashboard end-to-end: real-time location mapping, ETL pipelines, and CAN-bus telemetry translated into fleet business insights.',
    metric: 'Solo full-stack ownership across AWS, Laravel, React, Terraform, CAN-bus ETL',
    tags: ['backend', 'fullstack', 'product'],
    isPurePE: true,
  },
  {
    id: 'secure-iot',
    name: 'Secure Offline IoT Bridge — Alltrons × Kayle Knops Holding (WBSO 2026-1)',
    employer: 'Alltrons',
    period: 'Jun 2026 – present',
    oneLiner:
      'R&D Architect for a cryptographic trust chain between a trusted server and an offline IoT device relayed via untrusted BLE phone — without a real-time clock, without per-token state, on commodity silicon.',
    metric: 'Signed CBOR tokens · RSA-3072 via ESP32-S3 DS peripheral · monotonic-counter O(1) replay defence · dual-signed rotation artifacts',
    tags: ['embedded', 'backend', 'product'],
    isPurePE: true,
  },
  {
    id: 'mifare',
    name: 'MIFARE Smart-Lock Integration — Alltrons',
    employer: 'Alltrons',
    period: 'Apr–May 2026',
    oneLiner:
      'Contactless MIFARE unlock with full lock-sequence parity (solenoid, LEDs, Hall sensor auto-relock) across 3 firmware stacks — STM32 ST HAL, nRF52833 Zephyr RTOS, ESP32 ESP-IDF — via I²C and serial daisy chain.',
    metric: '3 hardware platforms, zero mobile/backend dependency',
    tags: ['embedded'],
  },
  {
    id: 'transjakarta',
    name: 'Transjakarta Bus Operation Management System — Ecomindo',
    employer: 'Ecomindo',
    period: '2021–2022',
    oneLiner:
      'Scrum Master + Architect. Replaced Moovit API with a custom high-performance distributed real-time GPS platform.',
    metric: '1M+ daily commuters · 7,000+ buses',
    tags: ['backend', 'fullstack', 'pm', 'techlead'],
  },
  {
    id: 'kawan-lama',
    name: 'Kawan Lama Group DevSecOps Framework — Ecomindo',
    employer: 'Ecomindo',
    period: '2023',
    oneLiner:
      'Architecture lead for a company-wide DevSecOps framework standardising development, security, and observability across 30+ retail and F&B brands.',
    metric: '50+ engineers · 9 teams · 30+ brands',
    tags: ['backend', 'fullstack', 'techlead', 'qa'],
  },
  {
    id: 'pintar',
    name: 'PINTAR — PLN National Land Clearance Monitoring',
    employer: 'PT PLN Enjiniring',
    period: '2014–2018',
    oneLiner:
      'PM + Analyst + Architect on Indonesia\'s national 35GW power programme monitoring platform — integrated with Accenture PMO and PLN holding SAP.',
    metric: '18 regional construction offices · 4-year delivery',
    tags: ['backend', 'pm', 'techlead'],
  },
  {
    id: 'prima',
    name: 'PRIMA — Integrated Project Monitoring — PLN Enjiniring',
    employer: 'PT PLN Enjiniring',
    period: '2013',
    oneLiner:
      'Expeditor + Analyst + SE on a 24-person implementation team. Year-one result: €100K+ in financial anomalies surfaced, €200K write-off prevented.',
    metric: '€200K write-off prevented · €100K+ anomalies detected',
    tags: ['backend', 'qa', 'pm'],
  },
  {
    id: 'has-green',
    name: 'Brush Usage Detection — HAS Green Academy (TU/e EngD)',
    employer: 'TU Eindhoven',
    period: 'May–Jun 2024',
    oneLiner:
      'Test Manager + SE. Automated cow-welfare detection system; delivered 90% pytest coverage and 20% accuracy improvement in 8 weeks.',
    metric: '90% pytest coverage · 20% accuracy improvement',
    tags: ['qa', 'backend'],
  },
];
