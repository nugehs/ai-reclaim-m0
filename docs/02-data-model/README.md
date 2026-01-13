# Core Data Model

**Document Version:** 1.0
**Last Updated:** 13 January 2025
**Status:** Draft for Review

---

> **MILESTONE 0 — DISCOVERY PHASE**
>
> This document is a deliverable of Milestone 0, a paid discovery phase intended to define the technical, architectural, and compliance foundations of AI-Reclaim™ **prior to any production build**.
>
> This document does not constitute a commitment to build. Detailed scope, timelines, and commercials for development phases will be defined following successful completion and acceptance of Milestone 0.
>
> All intellectual property vests exclusively in A to Z IT Recycling Ltd.

---

## Primary Entities

| Entity | Description |
|--------|-------------|
| Asset | IT equipment being tracked through disposal lifecycle |
| Organisation | Client organisation (NHS trust, bank, etc.) |
| User | System users with roles |
| AuditLog | Immutable audit trail entries |
| Certificate | Destruction/recycling certificates |
| ESGReport | Environmental impact reports |

## Entity Relationship Diagram

```mermaid
erDiagram
    Organisation ||--o{ User : has
    Organisation ||--o{ Asset : owns
    Asset ||--o{ AuditLog : generates
    Asset ||--o{ Certificate : receives
    User ||--o{ AuditLog : creates
    Organisation ||--o{ ESGReport : generates
    Asset }o--|| AssetType : categorised_as

    Asset {
        uuid id PK
        string serial_number
        string make
        string model
        enum status
        timestamp created_at
        uuid organisation_id FK
    }

    Organisation {
        uuid id PK
        string name
        string type
        timestamp created_at
    }

    AuditLog {
        uuid id PK
        string action
        json payload
        timestamp created_at
        uuid asset_id FK
        uuid user_id FK
    }

    Certificate {
        uuid id PK
        enum type
        string reference
        timestamp issued_at
        uuid asset_id FK
    }
```

## Entity Details

### Asset
(Detailed field descriptions)

### Organisation
(Detailed field descriptions)

### AuditLog
(Detailed field descriptions)
