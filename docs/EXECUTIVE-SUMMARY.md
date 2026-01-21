# AI-Reclaim™ — Executive Summary

**Milestone 0: Discovery Phase Deliverables**

**Prepared for:** A to Z IT Recycling Ltd
**Prepared by:** Oluwasegun Olumbe

---

## Overview

This document summarises the technical discovery phase for AI-Reclaim™, a compliance-first SaaS platform for IT asset disposition (ITAD) management.

**Target Market:** NHS trusts, banks, local authorities, and enterprises requiring auditable IT asset disposal with environmental reporting.

---

## What We've Defined

| Deliverable | Summary |
|-------------|---------|
| **System Architecture** | AWS-hosted multi-tenant platform with hardened containers, UK data residency (eu-west-2), and defence-in-depth security |
| **Data Model** | 8 core entities supporting asset lifecycle from registration through certified disposal |
| **API Design** | RESTful API with Cognito authentication and role-based access control |
| **Compliance** | GDPR, NHS DSPT, ISO 27001, and Cyber Essentials alignment |
| **Delivery Roadmap** | 6 milestones from infrastructure to launch |
| **Risk Register** | 23 identified risks with mitigations; 11 unknowns requiring resolution |

---

## Key Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Cloud Provider | AWS (eu-west-2 London) | UK data residency, NHS compliance programme |
| Database | PostgreSQL with RLS | Multi-tenant isolation, audit compliance |
| Containers | Hardened base images | Minimal CVE footprint, regular scanning |
| Authentication | AWS Cognito | Managed MFA, enterprise SSO capability |
| AI Identification | AWS Rekognition | Image-based asset recognition |

---

## Platform Capabilities (Phase 1)

```
┌─────────────────────────────────────────────────────────┐
│                    AI-RECLAIM™ MVP                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✓ Asset Registration      ✓ AI Identification          │
│  ✓ Batch Management        ✓ Status Tracking            │
│  ✓ Certificate Generation  ✓ Immutable Audit Logs       │
│  ✓ Role-Based Access       ✓ Multi-Tenant Isolation     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Asset Lifecycle:**
```
Registered → Collected → Processing → Completed
                                         ↓
                                   Certificate
                                   (Destruction/Recycling/
                                    Sanitisation/WEEE)
```

---

## Compliance Coverage

| Framework | Status |
|-----------|--------|
| GDPR | Architecture designed for compliance |
| NHS DSPT | Mapped to 10 DSPT standards |
| ISO 27001 | Aligned to control domains |
| Cyber Essentials Plus | Mapped to 5 CE+ control areas |

> **Note:** Organisation remains responsible for achieving DSPT and CE+ certification via appropriate controls and assessment processes.

---

## Delivery Milestones

```
M1 Foundation → M2 Auth → M3 Assets → M4 Processing → M5 Certificates → M6 QA
     ↓            ↓          ↓            ↓               ↓              ↓
   AWS/DB      Cognito    AI ID      Batches          PDF Gen        Launch
   CI/CD        RBAC      CRUD       Workflow         Audit UI        UAT
```

---

## Critical Items Requiring Decision

| Priority | Item | Action Required |
|----------|------|-----------------|
| 🔴 | <abbr title="We need to test if AWS Rekognition can accurately identify IT equipment types (laptops, servers, monitors, etc.) from photos. A Proof of Concept with real sample images from your warehouse will validate this before we commit to the approach.">AI accuracy unknown</abbr> | Approve PoC with sample IT asset images |
| 🔴 | <abbr title="Should recycling facility staff have their own simplified interface focused on processing tasks, or can they use the same portal as clients with different permissions? A separate UI adds development cost but may improve efficiency.">Operator portal scope</abbr> | Confirm if separate UI needed |
| 🟠 | <abbr title="ISO 27001 is an information security certification. Some enterprise clients may require AI-Reclaim to be ISO 27001 certified before they can use it. This affects infrastructure design and adds compliance overhead.">ISO 27001 requirement</abbr> | Confirm with enterprise prospects |
| 🟠 | <abbr title="How long must certificates of destruction/recycling be stored? UK regulations typically require 3-7 years for compliance records. This affects database storage costs and data retention policies.">Certificate retention period</abbr> | Legal consultation required |
| 🟡 | <abbr title="Penetration testing is a security assessment where ethical hackers attempt to find vulnerabilities. Required by some regulated clients (NHS, banks) but adds cost and time before launch.">Penetration testing</abbr> | Confirm if required before launch |

---

## Open Questions for Client

1. **Operator workflow** — Do recycling operators need a separate portal or can role-based access suffice?

2. **Certificate templates** — Are standard templates acceptable or do you need custom branding?

3. **Pilot client** — Who will participate in UAT testing?

4. **NHS engagement** — Do you have an NHS trust contact for DSPT requirements clarification?

5. **Offline capability** — Do field staff need offline data entry?

---

## Next Steps

1. **Review** — Client reviews all 6 deliverables
2. **Clarify** — Address open questions above
3. **Validate** — Run AI identification PoC (critical assumption)
4. **Approve** — Sign-off on Milestone 0
5. **Proceed** — Define Phase 1 scope and commercials

---

## Milestone 0 Document Index

| # | Document | Description |
|---|----------|-------------|
| 01 | [System Architecture](./01-system-architecture/README.md) | Technical architecture, AWS design |
| 02 | [Core Data Model](./02-data-model/README.md) | Entities, relationships, ER diagrams |
| 03 | [API & Integration](./03-api-integration/README.md) | REST API structure, authentication |
| 04 | [Compliance & Security](./04-compliance-security/README.md) | GDPR, NHS DSPT, audit logging |
| 05 | [Delivery Roadmap](./05-delivery-roadmap/README.md) | Phase 1 milestones |
| 06 | [Risks Register](./06-risks-register/README.md) | Risks, unknowns, mitigations |

**Supplementary (Added Value):**

| Document | Description |
|----------|-------------|
| [User Flows (Scenarios)](./USER-FLOWS.md) | Proposed user journeys for validation |
| [Glossary](./GLOSSARY.md) | Acronyms and terminology |

---

> **Note:** This discovery phase defines foundations only. Detailed scope, timelines, and commercials for development phases will be defined following Milestone 0 acceptance.
>
> All intellectual property vests exclusively in A to Z IT Recycling Ltd.
