# API & Integration Outline

**Document Version:** 1.0
**Last Updated:** 24 January 2025
**Status:** Complete
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

This document outlines the proposed API structure for AI-Reclaim™. The API serves as the interface between the web application and backend services, enabling asset management, audit logging, certificate generation, and ESG reporting.

**Key decisions:**
- RESTful API design for broad compatibility and ease of integration
- JWT-based authentication via AWS Cognito
- Versioned API (v1) to support future evolution
- External integrations documented as future consideration

---

## 1. API Design Principles

| Principle | Description |
|-----------|-------------|
| **RESTful** | Resource-oriented endpoints following REST conventions |
| **Versioned** | API version in URL path (e.g., `/v1/assets`) |
| **JSON** | Request and response bodies in JSON format |
| **Authenticated** | All endpoints require valid JWT token (except health check) |
| **Tenant-scoped** | Organisation ID derived from token; users access only their data |
| **Audited** | All write operations generate audit log entries |

---

## 2. API Structure Overview

### 2.1 Resource Domains

The API is organised around the following resource domains:

```
/v1
├── /auth              → Authentication & session management
├── /assets            → Asset lifecycle management
├── /batches           → Batch/collection management
├── /certificates      → Certificate generation & retrieval
├── /audit             → Audit log queries
├── /esg               → ESG reporting
├── /users             → User management (admin)
└── /organisations     → Organisation settings (admin)
```

### 2.2 Endpoint Summary

| Domain | Key Operations | Access |
|--------|----------------|--------|
| **Auth** | Login, logout, refresh token, password reset | Public/Authenticated |
| **Assets** | Register, list, view, update status, AI identify | Client, Operator |
| **Batches** | Create, add assets, close, view | Client, Operator |
| **Certificates** | Generate, list, download PDF | Operator, Client (read) |
| **Audit** | Query logs, export | Auditor, Admin |
| **ESG** | Generate report, list reports, download | Client, Admin |
| **Users** | Create, list, update, deactivate | Admin |
| **Organisations** | View settings, update | Admin |

---

## 3. Core API Resources

### 3.1 Assets

Primary resource for IT equipment tracking.

| Operation | Method | Endpoint | Description |
|-----------|--------|----------|-------------|
| List assets | GET | `/v1/assets` | Paginated list with filters |
| Register asset | POST | `/v1/assets` | Create new asset record |
| Get asset | GET | `/v1/assets/{id}` | Retrieve asset details |
| Update asset | PATCH | `/v1/assets/{id}` | Update asset fields |
| Change status | POST | `/v1/assets/{id}/status` | Transition lifecycle status |
| AI identify | POST | `/v1/assets/{id}/identify` | Submit image for AI recognition |
| Asset history | GET | `/v1/assets/{id}/history` | Audit trail for asset |

**Common Filters:**
- `status` — Filter by lifecycle status
- `batch_id` — Filter by batch
- `asset_type_id` — Filter by equipment type
- `created_after` / `created_before` — Date range

### 3.2 Batches

Grouping of assets for collection and processing.

| Operation | Method | Endpoint | Description |
|-----------|--------|----------|-------------|
| List batches | GET | `/v1/batches` | Paginated list |
| Create batch | POST | `/v1/batches` | Create new batch |
| Get batch | GET | `/v1/batches/{id}` | Batch details with asset summary |
| Add assets | POST | `/v1/batches/{id}/assets` | Add assets to batch |
| Close batch | POST | `/v1/batches/{id}/close` | Mark batch ready for collection |
| Batch assets | GET | `/v1/batches/{id}/assets` | List assets in batch |

### 3.3 Certificates

Compliance documentation.

| Operation | Method | Endpoint | Description |
|-----------|--------|----------|-------------|
| List certificates | GET | `/v1/certificates` | Paginated list with filters |
| Generate certificate | POST | `/v1/certificates` | Issue new certificate |
| Get certificate | GET | `/v1/certificates/{id}` | Certificate details |
| Download PDF | GET | `/v1/certificates/{id}/pdf` | Download PDF document |

**Certificate Generation Requirements:**
- Asset or batch must be in `completed` status
- Operator role required
- Certificate type must be appropriate for asset type (e.g., destruction for data-bearing)

### 3.4 Audit

Compliance audit trail.

| Operation | Method | Endpoint | Description |
|-----------|--------|----------|-------------|
| Query logs | GET | `/v1/audit` | Paginated audit log query |
| Asset audit | GET | `/v1/audit/assets/{id}` | Audit trail for specific asset |
| Export logs | GET | `/v1/audit/export` | Export audit logs (CSV/JSON) |

**Query Parameters:**
- `entity_type` — Filter by entity (asset, user, certificate)
- `action` — Filter by action type
- `user_id` — Filter by acting user
- `date_from` / `date_to` — Date range

### 3.5 ESG Reporting

Environmental impact reports.

| Operation | Method | Endpoint | Description |
|-----------|--------|----------|-------------|
| List reports | GET | `/v1/esg/reports` | Previous reports |
| Generate report | POST | `/v1/esg/reports` | Generate new report for period |
| Get report | GET | `/v1/esg/reports/{id}` | Report details |
| Download PDF | GET | `/v1/esg/reports/{id}/pdf` | Download PDF report |

---

## 4. Authentication & Authorisation

### 4.1 Authentication Flow

```
┌──────────┐     ┌─────────┐     ┌──────────┐
│  Client  │────▶│   API   │────▶│ Cognito  │
│   App    │◀────│ Service │◀────│   Pool   │
└──────────┘     └─────────┘     └──────────┘
     │                                │
     │◀───────── JWT Token ──────────▶│
```

1. User submits credentials to `/auth/login`
2. API validates with Cognito
3. Cognito returns JWT tokens (access + refresh)
4. Client includes access token in `Authorization` header
5. API validates token and extracts organisation_id

### 4.2 Authorisation Matrix

| Role | Assets | Batches | Certificates | Audit | ESG | Users |
|------|--------|---------|--------------|-------|-----|-------|
| **Admin** | Full | Full | Full | Full | Full | Full |
| **Operator** | Read/Update | Full | Generate | Read | Read | — |
| **Client** | Create/Read | Create/Read | Read | — | Read | — |
| **Auditor** | Read | Read | Read | Full | Read | — |

---

## 5. Integration Points

### 5.1 Internal Integrations

Services the API integrates with internally:

| Service | Purpose | Integration Method |
|---------|---------|-------------------|
| AWS Cognito | Authentication | SDK / REST |
| AWS S3 | File storage (images, PDFs) | SDK |
| AWS Rekognition | AI image analysis | SDK |
| PostgreSQL | Data persistence | Connection pool |
| Redis | Caching, sessions | Connection pool |

### 5.2 External Integrations (Future Consideration)

Potential external integrations identified for future phases:

| Integration | Purpose | Priority |
|-------------|---------|----------|
| Client ERP systems | Asset data sync | Medium |
| Email service | Notifications, certificate delivery | High |
| SMS gateway | Collection notifications | Low |
| Logistics providers | Collection scheduling | Medium |
| Accounting systems | Invoice generation | Low |

**Note:** External API access for client systems is documented as a future requirement. Phase 1 will focus on internal platform functionality.

---

## 6. Non-Functional Requirements

| Requirement | Target | Notes |
|-------------|--------|-------|
| Response time (p95) | < 500ms | Excluding AI identification |
| AI identification | < 5 seconds | May need async pattern |
| Rate limiting | 100 req/min per user | Prevent abuse |
| Max payload size | 10 MB | For image uploads |
| Pagination default | 20 items | Configurable per endpoint |

---

## 7. Open Questions

| ID | Question | Impact | Resolution Approach |
|----|----------|--------|---------------------|
| Q1 | Should AI identification be async with webhooks? | UX design | Prototype and test response times |
| Q2 | What file formats for bulk asset import? | Feature scope | Client consultation |
| Q3 | Real-time updates needed (WebSockets)? | Architecture | Review UX requirements |
| Q4 | Public API for client integrations in Phase 1? | Scope | Stakeholder decision (deferred) |

---

## 8. Assumptions

### 8.1 Confirmed Assumptions

| ID | Assumption | Source |
|----|------------|--------|
| A1 | RESTful API design | Stakeholder decision |
| A2 | JWT-based authentication via Cognito | Architecture decision |
| A3 | JSON request/response format | Industry standard |
| A4 | API versioning in URL path | Best practice |

### 8.2 Assumptions Requiring Validation

| ID | Assumption | Confidence | Validation Approach |
|----|------------|------------|---------------------|
| A5 | Synchronous AI identification acceptable | Medium | Performance testing |
| A6 | Standard pagination (limit/offset) sufficient | High | Review with frontend |
| A7 | Webhook/callback not needed for MVP | Medium | Confirm with stakeholders |
| A8 | File uploads via signed S3 URLs | High | Security review |

---

## 9. Decision Log

| ID | Decision | Rationale |
|----|----------|-----------|
| D1 | REST over GraphQL | Simpler implementation, broader familiarity, sufficient for use cases |
| D2 | External integrations deferred | Focus Phase 1 on core platform; integrations as future enhancement |
| D3 | Cognito for auth | Managed service, MFA support, reduces implementation risk |
| D4 | Versioned API from start | Enables future evolution without breaking clients |
