# Milestone 0 — Content Index

**AI-Reclaim™ Discovery Phase Documentation**

**Author:** Oluwasegun Olumbe
**Client:** A to Z IT Recycling Ltd

---

> **MILESTONE 0 — DISCOVERY PHASE**
>
> This index provides navigation to all Milestone 0 deliverables. These documents define the technical, architectural, and compliance foundations of AI-Reclaim™ prior to any production build.
>
> All intellectual property vests exclusively in A to Z IT Recycling Ltd.

---

## Document Overview

| # | Document | Description | Status |
|---|----------|-------------|--------|
| 01 | [System Architecture](./01-system-architecture/README.md) | High-level SaaS architecture, AWS design, scalability | Complete |
| 02 | [Core Data Model](./02-data-model/README.md) | Entities, relationships, ER diagrams | Complete |
| 03 | [API & Integration](./03-api-integration/README.md) | REST API structure, auth, integrations | Complete |
| 04 | [Compliance & Security](./04-compliance-security/README.md) | GDPR, NHS DSPT, audit logging, security | Complete |
| 05 | [Delivery Roadmap](./05-delivery-roadmap/README.md) | Phase 1 scope, milestones, dependencies | Complete |
| 06 | [Risks Register](./06-risks-register/README.md) | Risks, unknowns, mitigations | Template |
| 07 | [User Flows](./USER-FLOWS.md) | End-to-end user journeys (Mermaid) | Complete |

**Tracking:** [ROADMAP.md](./ROADMAP.md) — Task-level progress

---

## 01 — System Architecture

| Section | Description |
|---------|-------------|
| Executive Summary | Key decisions |
| 1. Introduction | Purpose, scope, audience |
| 2. High-Level Architecture | Architecture diagram, layer narrative |
| 3. Component Specifications | 11 components with AWS mapping |
| 4. Multi-Tenant Architecture | RLS isolation strategy |
| 5. Design Assumptions | Confirmed + requiring validation |
| 6. Scalability Considerations | Pilot → Growth → Scale phases |
| 7. Security Architecture | Network, data, application, access |
| 8. UK Data Residency | Compliance controls |
| 9. Decision Log | 7 architectural decisions |
| 10. Open Questions | 5 items for resolution |

---

## 02 — Core Data Model

| Section | Description |
|---------|-------------|
| Executive Summary | Key design decisions |
| 1. Entity Overview | 8 primary + 3 supporting entities |
| 2. ER Diagrams | Core relationships, detailed schema |
| 3. Entity Specifications | Full field definitions |
| 3.1 Organisation | Tenant root entity |
| 3.2 User | Roles: Admin, Operator, Client, Auditor |
| 3.3 Asset | Lifecycle: Registered → Collected → Processing → Completed |
| 3.4 Batch | Asset grouping for collection |
| 3.5 AssetType | Reference data with CO2 factors |
| 3.6 Certificate | 4 types: Destruction, Recycling, Sanitisation, WEEE |
| 3.7 AuditLog | Immutable action log |
| 3.8 ESGReport | Environmental metrics |
| 4. Multi-Tenant Isolation | RLS policies |
| 5. Indexing Strategy | Primary + full-text search |
| 6. Data Retention | Per entity type |
| 7. Open Questions | 4 items |
| 8. Decision Log | 5 data model decisions |

---

## 03 — API & Integration Outline

| Section | Description |
|---------|-------------|
| Executive Summary | Key decisions |
| 1. API Design Principles | REST, versioned, JSON, authenticated |
| 2. API Structure Overview | 8 resource domains |
| 3. Core API Resources | |
| 3.1 Assets | Register, list, update, AI identify |
| 3.2 Batches | Create, add assets, close |
| 3.3 Certificates | Generate, download PDF |
| 3.4 Audit | Query logs, export |
| 3.5 ESG Reporting | Generate reports |
| 4. Authentication & Authorisation | Cognito flow, RBAC matrix |
| 5. Integration Points | Internal (AWS) + external (future) |
| 6. API Assumptions | Confirmed + requiring validation |
| 7. Non-Functional Requirements | Response times, rate limits |
| 8. Open Questions | 4 items |
| 9. Decision Log | 4 API decisions |

---

## 04 — Compliance, Security & Audit Logging

| Section | Description |
|---------|-------------|
| Executive Summary | Key decisions |
| 1. Compliance Framework | |
| 1.1 Target Standards | GDPR, NHS DSPT, ISO 27001, Cyber Essentials |
| 1.2 GDPR Compliance | Requirements mapping |
| 1.3 NHS DSPT | 10 standards addressed |
| 1.4 ISO 27001 Alignment | Control domains |
| 1.5 Cyber Essentials Plus | 5 controls |
| 2. Security Architecture | |
| 2.1 Defence in Depth | 4-layer diagram |
| 2.2 Security Controls | By layer |
| 2.3 Network Architecture | VPC, subnets |
| 3. Authentication & Access Control | Cognito, RBAC, permissions |
| 4. Audit Logging | Fields, events, immutability |
| 5. Data Protection | Encryption, key management, classification |
| 6. Data Residency | UK-only controls |
| 7. Data Retention | Per data type |
| 8. Incident Response | Classification, process, notification |
| 9. Security Monitoring | CloudTrail, GuardDuty, alerts |
| 10. Assumptions | Confirmed + requiring validation |
| 11. Open Questions | 4 items |
| 12. Decision Log | 5 security decisions |

---

## 05 — Delivery Roadmap (Phase 1)

| Section | Description |
|---------|-------------|
| Executive Summary | Phase 1 goal, key inclusions |
| 1. Phase 1 Scope | |
| 1.1 In Scope | 10 must-have features |
| 1.2 Out of Scope | 6 deferred to Phase 2+ |
| 1.3 User Stories | Client, Operator, Admin, Auditor |
| 2. Milestone Breakdown | |
| M1 | Foundation & Infrastructure |
| M2 | Authentication & User Management |
| M3 | Asset Management & AI Identification |
| M4 | Processing & Batch Management |
| M5 | Certificates & Audit |
| M6 | QA & Launch Preparation |
| 3. Dependencies & Critical Path | M1 → M2 → M3 → M4 → M5 → M6 |
| 4. Technical Approach | Stack, practices |
| 5. Resource Requirements | Team composition |
| 6. Assumptions | 5 items |
| 7. Open Questions | 4 items |
| 8. Decision Log | 4 roadmap decisions |

---

## 06 — Risks & Unknowns Register

| Section | Description |
|---------|-------------|
| Risk Matrix | Probability × Impact |
| Technical Risks | AI accuracy, scalability, dependencies |
| Compliance Risks | GDPR, NHS DSPT, audit tampering |
| Operational Risks | Key person, scope creep |
| Unknowns | NHS requirements, AI data, integrations |

---

## Key Decisions Summary

| ID | Document | Decision |
|----|----------|----------|
| D1 | Architecture | AWS as cloud provider |
| D2 | Architecture | PostgreSQL with RLS for multi-tenancy |
| D3 | Architecture | Web-only MVP |
| D4 | Architecture | Docker Hardened Images (DHI) for containers |
| D5 | Architecture | Microservices on ECS Fargate |
| D6 | Data Model | Simple 4-stage asset lifecycle |
| D7 | Data Model | Individual + batch tracking |
| D8 | Data Model | Four certificate types |
| D9 | API | REST over GraphQL |
| D10 | API | External integrations deferred |
| D11 | Compliance | Target all major frameworks |
| D12 | Compliance | Standard audit depth |
| D13 | Roadmap | Core flow for MVP |
| D14 | Roadmap | AI identification in Phase 1 |

---

## Open Questions Summary

| ID | Document | Question |
|----|----------|----------|
| Q1 | Architecture | Operator portal scope |
| Q2 | Architecture | AI model training requirements |
| Q3 | Architecture | Offline capability needed? |
| Q4 | Data Model | Legal retention for certificates |
| Q5 | Data Model | Cryptographic signing for audit |
| Q6 | API | Async AI identification? |
| Q7 | API | Bulk import formats |
| Q8 | Compliance | ISO 27001 certification for Phase 1? |
| Q9 | Compliance | Penetration testing required? |
| Q10 | Roadmap | Pilot client for UAT |
| Q11 | Roadmap | Custom certificate templates |

---

## Assumptions Requiring Validation

| Priority | ID | Assumption | Document |
|----------|----|-----------| ---------|
| 🔴 Critical | T4 | AWS Rekognition recognises IT equipment | Architecture |
| 🟠 High | B1 | Operators use same portal as clients | Architecture |
| 🟠 High | A5 | NHS DSPT self-assessment sufficient | Compliance |
| 🟡 Medium | T3 | PostgreSQL handles audit volume | Architecture |
| 🟡 Medium | A7 | Webhook not needed for MVP | API |
