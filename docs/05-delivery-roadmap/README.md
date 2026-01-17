# Phase 1 Delivery Roadmap

**Document Version:** 1.0
**Last Updated:** 24 January 2025
**Status:** Draft for Review
**Author:** Oluwasegun Olumbe

---

> **MILESTONE 0 — DISCOVERY PHASE**
>
> This document is a deliverable of Milestone 0, a paid discovery phase intended to define the technical, architectural, and compliance foundations of AI-Reclaim™ **prior to any production build**.
>
> This document does not constitute a commitment to build. Detailed scope, timelines, and commercials for development phases will be defined following successful completion and acceptance of Milestone 0.
>
> All intellectual property vests exclusively in A to Z IT Recycling Ltd.

---

## Executive Summary

This document defines the scope and milestone breakdown for Phase 1 (MVP) of AI-Reclaim™. Phase 1 delivers the core asset disposition workflow from registration through to certificate generation, including AI-powered asset identification.

**Phase 1 Goal:** Deliver a working platform that enables a client organisation to register IT assets, track them through collection and processing, and receive compliance certificates.

**Key inclusions:**
- Complete asset lifecycle (Registered → Collected → Processing → Completed)
- AI-powered asset identification (image + barcode)
- Certificate generation (Destruction, Recycling, Sanitisation, WEEE)
- Immutable audit logging
- Multi-tenant architecture with RBAC

---

## 1. Phase 1 Scope

### 1.1 In Scope

| Feature | Description | Priority |
|---------|-------------|----------|
| **User authentication** | Cognito-based login, MFA for privileged roles | Must have |
| **Organisation management** | Create/manage client organisations | Must have |
| **User management** | Create users, assign roles (Admin, Operator, Client, Auditor) | Must have |
| **Asset registration** | Register individual assets with details | Must have |
| **AI identification** | Image upload + barcode/serial lookup | Must have |
| **Asset lifecycle** | Status transitions through 4 stages | Must have |
| **Batch management** | Group assets for collection | Must have |
| **Certificate generation** | Issue 4 certificate types with PDF | Must have |
| **Audit logging** | Immutable log of all actions | Must have |
| **Basic reporting** | Asset counts, status summaries | Should have |

### 1.2 Out of Scope (Future Phases)

| Feature | Rationale | Target Phase |
|---------|-----------|--------------|
| ESG reporting | Not critical for core workflow | Phase 2 |
| External API access | Focus on internal platform first | Phase 2 |
| Mobile native apps | Web responsive sufficient for MVP | Phase 2+ |
| Client ERP integrations | Requires client-specific work | Phase 2+ |
| Advanced analytics | Basic reporting sufficient for MVP | Phase 2 |
| Multi-language support | English-only for UK launch | Phase 2+ |

### 1.3 User Stories

**Client Organisation Staff:**
- Register IT assets for disposal (individually or batch)
- Upload photos for AI identification
- Track asset status through lifecycle
- Download certificates for completed assets

**Recycling Operator:**
- View assets assigned for processing
- Update asset status as work progresses
- Generate certificates upon completion
- View audit trail for assets

**Administrator:**
- Manage users and permissions
- View organisation-wide reports
- Access full audit logs

**Auditor:**
- Read-only access to all data
- Export audit logs for compliance review

---

## 2. Milestone Breakdown

### 2.1 Milestone Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     PHASE 1 MILESTONES                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  M1          M2          M3          M4          M5          M6 │
│  ────        ────        ────        ────        ────        ───│
│  Foundation  Auth &      Asset       Processing  Certificates  │
│  & Infra     Users       Mgmt        & Batches   & Audit     QA │
│                                                                 │
│  ▼           ▼           ▼           ▼           ▼           ▼  │
│  AWS setup   Cognito     CRUD        Status      PDF gen     Test│
│  CI/CD       RBAC        AI ID       Batches     Audit UI    Fix │
│  DB setup    User UI     Search      Workflow    Reports     UAT │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Milestone Details

---

#### M1: Foundation & Infrastructure

**Objective:** Establish development environment, CI/CD pipeline, and core infrastructure.

| Deliverable | Description |
|-------------|-------------|
| AWS infrastructure | VPC, subnets, security groups (IaC) |
| Database setup | RDS PostgreSQL with RLS policies |
| CI/CD pipeline | GitHub Actions for build/test/deploy |
| Development environment | Local dev setup, staging environment |
| Monitoring foundation | CloudWatch, logging setup |

**Dependencies:** None (starting point)

**Acceptance Criteria:**
- Infrastructure deployed via IaC
- Database accessible with RLS enabled
- CI/CD pipeline runs successfully
- Staging environment accessible

---

#### M2: Authentication & User Management

**Objective:** Implement secure authentication and user/organisation management.

| Deliverable | Description |
|-------------|-------------|
| Cognito integration | User pools, MFA configuration |
| Authentication API | Login, logout, password reset, token refresh |
| Organisation CRUD | Create, read, update organisations |
| User CRUD | Create, read, update, deactivate users |
| RBAC implementation | Role-based permissions |
| Admin UI | User and organisation management screens |

**Dependencies:** M1 (infrastructure)

**Acceptance Criteria:**
- Users can register and login
- MFA works for Admin/Operator roles
- Admins can manage users
- Role permissions enforced on all endpoints

---

#### M3: Asset Management & AI Identification

**Objective:** Implement core asset registration with AI-powered identification.

| Deliverable | Description |
|-------------|-------------|
| Asset CRUD | Create, read, update assets |
| Asset type reference data | Seed standard IT equipment types |
| Image upload | S3 integration for asset photos |
| AI identification | Rekognition integration for device recognition |
| Barcode/serial lookup | Manual and scanned entry |
| Asset search | Filter and search assets |
| Asset UI | Registration form, list view, detail view |

**Dependencies:** M2 (authentication, organisations)

**Acceptance Criteria:**
- Users can register assets
- Image upload triggers AI identification
- AI results populate asset fields (with confidence score)
- Assets searchable and filterable

**Work Breakdown Structure — AI Identification:**

```
M3: AI Identification
│
├── 3.1 Image Upload Infrastructure
│   ├── 3.1.1 S3 bucket configuration (asset-images)
│   ├── 3.1.2 Pre-signed URL generation
│   ├── 3.1.3 Image validation (format, size)
│   └── 3.1.4 Thumbnail generation
│
├── 3.2 AWS Rekognition Integration
│   ├── 3.2.1 Rekognition API connection
│   ├── 3.2.2 Label detection implementation
│   ├── 3.2.3 Confidence threshold configuration (70%)
│   └── 3.2.4 Error handling & fallback
│
├── 3.3 Device Matching Logic
│   ├── 3.3.1 Device database schema (make/model/type)
│   ├── 3.3.2 Seed data for common IT assets
│   ├── 3.3.3 Rekognition label → device mapping
│   └── 3.3.4 Barcode/serial number lookup
│
├── 3.4 AI Response Handling
│   ├── 3.4.1 Parse Rekognition response
│   ├── 3.4.2 Calculate confidence score
│   ├── 3.4.3 Map to asset fields (make, model, type)
│   └── 3.4.4 Store AI results in asset.ai_identification JSON
│
└── 3.5 UI Integration
    ├── 3.5.1 Photo capture/upload component
    ├── 3.5.2 AI processing indicator (loading state)
    ├── 3.5.3 Auto-fill form with AI results
    ├── 3.5.4 Confidence display & manual override
    └── 3.5.5 Fallback to manual entry flow
```

---

#### M4: Processing & Batch Management

**Objective:** Implement asset lifecycle workflow and batch grouping.

| Deliverable | Description |
|-------------|-------------|
| Status transitions | Implement 4-stage lifecycle with validation |
| Batch CRUD | Create, read, update batches |
| Batch-asset linking | Add/remove assets from batches |
| Batch status | Batch lifecycle (open → closed → collected → processing → completed) |
| Workflow UI | Status update screens, batch management |

**Dependencies:** M3 (assets)

**Acceptance Criteria:**
- Assets transition through lifecycle correctly
- Invalid transitions rejected
- Batches group assets correctly
- Batch status reflects contained assets

---

#### M5: Certificates & Audit

**Objective:** Implement certificate generation and audit trail visibility.

| Deliverable | Description |
|-------------|-------------|
| Certificate generation | Create certificate records |
| PDF generation | Generate certificate PDFs (Lambda) |
| Certificate types | Support all 4 types with validation |
| Audit log API | Query and export audit logs |
| Audit UI | Audit log viewer with filters |
| Asset history | View audit trail per asset |

**Dependencies:** M4 (asset lifecycle complete)

**Acceptance Criteria:**
- Certificates generated for completed assets
- PDF downloads work
- Certificate types validated (e.g., destruction requires data-bearing)
- Audit logs queryable and exportable

---

#### M6: QA & Launch Preparation

**Objective:** Testing, bug fixes, and launch readiness.

| Deliverable | Description |
|-------------|-------------|
| Integration testing | End-to-end workflow testing |
| Security testing | Vulnerability scan, pen test (if required) |
| Performance testing | Load testing core workflows |
| Bug fixes | Address issues from testing |
| Documentation | User guides, API documentation |
| UAT | User acceptance testing with pilot client |
| Production deployment | Deploy to production environment |

**Dependencies:** M1-M5 complete

**Acceptance Criteria:**
- All critical bugs resolved
- Security scan passed
- Performance meets targets
- UAT sign-off received
- Production environment live

---

## 3. Dependencies & Critical Path

### 3.1 Dependency Map

```
M1 Foundation
 │
 └──▶ M2 Auth & Users
       │
       └──▶ M3 Asset Management
             │
             └──▶ M4 Processing & Batches
                   │
                   └──▶ M5 Certificates & Audit
                         │
                         └──▶ M6 QA & Launch
```

### 3.2 Critical Path

All milestones are sequential, forming a single critical path:

**M1 → M2 → M3 → M4 → M5 → M6**

No milestone can start until the previous is complete due to technical dependencies.

### 3.3 Risk to Timeline

| Risk | Impact | Mitigation |
|------|--------|------------|
| AI accuracy issues | May delay M3 | Early PoC with sample images |
| Cognito complexity | May delay M2 | Spike on MFA integration |
| PDF generation issues | May delay M5 | Evaluate PDF libraries early |
| Scope creep | Delays all | Strict change control |

---

## 4. Technical Approach

### 4.1 Technology Stack (Proposed)

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | React / Next.js | Modern, widely supported |
| Backend | Node.js / Express | Team familiarity, async performance |
| Database | PostgreSQL (RDS) | Per architecture document |
| Auth | AWS Cognito | Per architecture document |
| Storage | AWS S3 | Per architecture document |
| AI | AWS Rekognition | Per architecture document |
| PDF | AWS Lambda + library | Serverless, scalable |
| IaC | Terraform / CDK | Reproducible infrastructure |
| CI/CD | GitHub Actions | Integrated with repo |

### 4.2 Development Practices

| Practice | Approach |
|----------|----------|
| Version control | GitHub, feature branches, PR reviews |
| Testing | Unit tests, integration tests, E2E tests |
| Code quality | Linting, formatting, type checking |
| Documentation | API docs auto-generated, user guides |
| Environments | Development, Staging, Production |

---

## 5. Resource Requirements

### 5.1 Team Composition (Indicative)

| Role | Responsibility |
|------|----------------|
| Tech Lead | Architecture decisions, code review, technical guidance |
| Backend Developer | API development, database, integrations |
| Frontend Developer | UI development, UX implementation |
| DevOps | Infrastructure, CI/CD, monitoring |
| QA | Testing strategy, test execution |

---

## 6. Assumptions

| ID | Assumption | Impact if Invalid |
|----|------------|-------------------|
| A1 | Single pilot client for UAT | May need multiple test scenarios |
| A2 | English-only UI sufficient | Delays if i18n required |
| A3 | Standard certificate templates acceptable | Custom templates add effort |
| A4 | AWS Rekognition accuracy sufficient | May need custom model training |
| A5 | Team has React/Node experience | Learning curve if not |

---

## 7. Open Questions

| ID | Question | Decision Needed By |
|----|----------|-------------------|
| Q1 | Who is the pilot client for UAT? | Before M6 |
| Q2 | Are custom certificate templates required? | Before M5 |
| Q3 | Penetration testing required before launch? | Before M6 |
| Q4 | Production support model post-launch? | Before M6 |

---

## 8. Decision Log

| ID | Decision | Rationale |
|----|----------|-----------|
| D1 | Core flow for MVP (not full platform) | Faster to market, validate with users |
| D2 | AI identification in Phase 1 | Key differentiator, core value prop |
| D3 | ESG reporting deferred to Phase 2 | Not critical for core workflow |
| D4 | Sequential milestones | Technical dependencies require this |
