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

## :material-file-document-multiple: Checkpoint 1 — Deliverables

| # | Document | Description | Status |
|:-:|----------|-------------|:------:|
| 01 | [:material-server-network: System Architecture](./01-system-architecture/README.md) | AWS design, multi-tenant architecture, scalability | :material-file-search: Review |
| 02 | [:material-database: Core Data Model](./02-data-model/README.md) | Entities, relationships, ER diagrams | :material-file-search: Review |

!!! note "Upcoming Checkpoints"
    Additional deliverables (API & Integration, Compliance & Security, Delivery Roadmap, Risks Register) will be shared in subsequent checkpoints.

---

## :material-check-decagram: Key Decisions

!!! success "Architecture Decisions"
    - **Cloud Provider:** AWS (eu-west-2 London) — UK data residency
    - **Database:** [PostgreSQL RDS](https://aws.amazon.com/rds/postgresql/) with Row-Level Security — multi-tenant isolation
    - **Containers:** Docker Hardened Images on [ECS Fargate](https://aws.amazon.com/fargate/) — near-zero CVE posture
    - **Authentication:** [AWS Cognito](https://aws.amazon.com/cognito/) — managed MFA, JWT tokens
    - **AI:** [AWS Rekognition](https://aws.amazon.com/rekognition/) — image-based asset identification

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
