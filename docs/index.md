# :material-recycle: AI-Reclaim™

## Milestone 0 — Discovery Phase Documentation

**Prepared for:** A to Z IT Recycling Ltd
**Prepared by:** Oluwasegun Olumbe
**Date:** January 2025

---

!!! info "About This Document"
    This documentation defines the technical, architectural, and compliance foundations of AI-Reclaim™ — a compliance-first SaaS platform for IT asset disposition (ITAD) management.

    **Target Market:** NHS trusts, banks, local authorities, and enterprises requiring auditable IT asset disposal with environmental reporting.

---

## :material-file-document-multiple: Deliverables

| # | Document | Description | Status |
|:-:|----------|-------------|:------:|
| 01 | [:material-server-network: System Architecture](./01-system-architecture/README.md) | AWS design, multi-tenant architecture, scalability | :white_check_mark: |
| 02 | [:material-database: Core Data Model](./02-data-model/README.md) | Entities, relationships, ER diagrams | :white_check_mark: |
| 03 | [:material-api: API & Integration](./03-api-integration/README.md) | REST API structure, auth, integrations | :white_check_mark: |
| 04 | [:material-shield-check: Compliance & Security](./04-compliance-security/README.md) | GDPR, NHS DSPT, audit logging | :white_check_mark: |
| 05 | [:material-road-variant: Delivery Roadmap](./05-delivery-roadmap/README.md) | Phase 1 scope, milestones | :white_check_mark: |
| 06 | [:material-alert-circle: Risks Register](./06-risks-register/README.md) | Risks, unknowns, mitigations | :white_check_mark: |
| 07 | [:material-account-arrow-right: User Flows](./USER-FLOWS.md) | End-to-end user journeys | :white_check_mark: |

[:material-timeline: View Project Roadmap](./ROADMAP.md){ .md-button }

---

## :material-check-decagram: Key Decisions

!!! success "Architecture Decisions"
    - **Cloud Provider:** AWS (eu-west-2 London) — UK data residency
    - **Database:** PostgreSQL with Row-Level Security — multi-tenant isolation
    - **Containers:** Docker Hardened Images — near-zero CVE posture
    - **Authentication:** AWS Cognito — managed MFA, JWT tokens
    - **AI:** AWS Rekognition — image-based asset identification

---

## :material-help-circle: Open Questions

!!! question "Requiring Resolution"
    - [ ] Operator portal scope and UX requirements
    - [ ] ISO 27001 certification timing
    - [ ] Certificate retention periods (legal review)
    - [ ] AI identification accuracy thresholds

---

## :material-clipboard-check: Assumptions to Validate

!!! warning "Before Phase 1"
    - [ ] Pilot client available for UAT
    - [ ] Standard certificate templates are acceptable
    - [ ] English-only UI sufficient for UK launch
    - [ ] AWS Rekognition accuracy meets requirements

---

<div class="grid cards" markdown>

-   :material-certificate:{ .lg .middle } **Compliance Ready**

    ---

    Designed for GDPR, NHS DSPT, ISO 27001, and Cyber Essentials Plus

-   :material-cloud-check:{ .lg .middle } **UK Data Residency**

    ---

    All data stored and processed in AWS eu-west-2 (London)

-   :material-lock:{ .lg .middle } **Security First**

    ---

    Immutable audit logs, MFA, defence-in-depth architecture

-   :material-leaf:{ .lg .middle } **ESG Reporting**

    ---

    CO₂ avoided, landfill diverted, environmental impact tracking

</div>
