# Milestone 0 — Content Index

**AI-Reclaim™ Discovery Phase Documentation**  
**Author:** Oluwasegun Olumbe  
**Client:** A to Z IT Recycling Ltd

---

> MILESTONE 0 — DISCOVERY PHASE
>
> This index links to all discovery deliverables that define the technical, architectural, and compliance foundations of AI‑Reclaim™ prior to any production build.

---

## Document Overview

| #   | Document                                                    | Description                                           | Status   |
| --- | ----------------------------------------------------------- | ----------------------------------------------------- | -------- |
| 01  | [System Architecture](./01-system-architecture/README.md)   | High‑level SaaS architecture, AWS design, scalability | Complete |
| 02  | [Core Data Model](./02-data-model/README.md)                | Entities, relationships, ER diagrams                  | Complete |
| 03  | [API & Integration](./03-api-integration/README.md)         | REST API structure, auth, integrations                | Complete |
| 04  | [Compliance & Security](./04-compliance-security/README.md) | GDPR, NHS DSPT, audit logging, security               | Complete |
| 05  | [Delivery Roadmap](./05-delivery-roadmap/README.md)         | Phase 1 scope, milestones, dependencies               | Complete |
| 06  | [Risks Register](./06-risks-register/README.md)             | Risks, unknowns, mitigations                          | Complete |
| 07  | [User Flows](./USER-FLOWS.md)                               | End‑to‑end user journeys (Mermaid)                    | Complete |

**Tracking:** [ROADMAP.md](./ROADMAP.md)  
**Glossary & Context:** See `CLAUDE.md` at repository root

---

## Key Decisions Summary

- UK data residency: AWS eu‑west‑2 only
- Multi‑tenant isolation: PostgreSQL RLS
- Auth: AWS Cognito (JWT, MFA)
- Immutable audit logging
- Certificates: destruction, recycling, sanitisation, WEEE

---

## Open Questions Summary

- Operator portal scope and UX
- ISO 27001 requirement timing
- Certificate retention periods
- AI identification accuracy thresholds

---

## Assumptions Requiring Validation

- Pilot client available for UAT
- Standard certificate templates are acceptable
- English‑only UI for UK launch
