# User Flows — End-to-End

**AI-Reclaim™ Discovery Phase**

**Author:** Oluwasegun Olumbe
**Client:** A to Z IT Recycling Ltd

---

> **MILESTONE 0 — DISCOVERY PHASE**
>
> This document illustrates assumed user journeys through the AI-Reclaim™ platform. These flows require validation with stakeholders before Phase 1 development.

---

## 1. Complete Platform Flow

```mermaid
flowchart TB
    subgraph "CLIENT ORGANISATION"
        A1[Login] --> A2[Register Asset]
        A2 --> A3[Upload Photo]
        A3 --> A4[AI Identification]
        A4 --> A5[Confirm Details]
        A5 --> A6[Add to Batch]
        A6 --> A7[Submit for Collection]
    end

    subgraph "A TO Z OPERATIONS"
        B1[View Pending Batches] --> B2[Collect Assets]
        B2 --> B3[Update Status: Collected]
        B3 --> B4[Process Assets]
        B4 --> B5[Update Status: Processing]
        B5 --> B6[Complete Processing]
        B6 --> B7[Generate Certificate]
    end

    subgraph "CLIENT ORGANISATION "
        C1[Receive Notification] --> C2[View Certificate]
        C2 --> C3[Download PDF]
    end

    A7 --> B1
    B7 --> C1
```

---

## 2. Client Organisation User Flow

```mermaid
flowchart LR
    subgraph "AUTHENTICATION"
        L1[Visit Portal] --> L2[Enter Credentials]
        L2 --> L3{MFA Required?}
        L3 -->|Yes| L4[Enter MFA Code]
        L3 -->|No| L5[Dashboard]
        L4 --> L5
    end

    subgraph "ASSET REGISTRATION"
        L5 --> R1[New Asset]
        R1 --> R2[Upload Photo]
        R2 --> R3[AI Analysis]
        R3 --> R4{Confident?}
        R4 -->|Yes| R5[Auto-fill Details]
        R4 -->|No| R6[Manual Entry]
        R5 --> R7[Review & Save]
        R6 --> R7
    end

    subgraph "BATCH & TRACKING"
        R7 --> T1[Add to Batch]
        T1 --> T2[Schedule Collection]
        T2 --> T3[Track Status]
        T3 --> T4[Download Certificate]
    end
```

---

## 3. Asset Lifecycle Flow

```mermaid
stateDiagram-v2
    [*] --> Registered: Client registers asset

    Registered --> Collected: A to Z collects batch

    Collected --> Processing: Asset received at facility

    Processing --> Completed: Destruction/Recycling done

    Completed --> [*]: Certificate issued

    state Processing {
        [*] --> DataWipe
        DataWipe --> PhysicalProcess
        PhysicalProcess --> QualityCheck
        QualityCheck --> [*]
    }
```

---

## 4. Operator (A to Z Staff) Flow

```mermaid
flowchart TB
    subgraph "START SHIFT"
        O1[Login] --> O2[View Dashboard]
        O2 --> O3[See Pending Batches]
    end

    subgraph "COLLECTION"
        O3 --> C1[Select Batch]
        C1 --> C2[View Asset List]
        C2 --> C3[Collect from Client]
        C3 --> C4[Verify Assets]
        C4 --> C5[Mark Collected]
    end

    subgraph "PROCESSING"
        C5 --> P1[Receive at Facility]
        P1 --> P2[Scan Asset]
        P2 --> P3[Process Asset]
        P3 --> P4{Data Bearing?}
        P4 -->|Yes| P5[Data Sanitisation]
        P4 -->|No| P6[Physical Processing]
        P5 --> P7[Mark Completed]
        P6 --> P7
    end

    subgraph "CERTIFICATION"
        P7 --> X1[Select Certificate Type]
        X1 --> X2[Generate Certificate]
        X2 --> X3[Client Notified]
    end
```

---

## 5. Auditor Flow

```mermaid
flowchart LR
    subgraph "ACCESS"
        A1[Login] --> A2[Read-Only Dashboard]
    end

    subgraph "AUDIT ACTIVITIES"
        A2 --> B1[Search Audit Logs]
        B1 --> B2[Filter by Date/User/Action]
        B2 --> B3[View Entry Details]
        B3 --> B4[Export Report]
    end

    subgraph "COMPLIANCE"
        A2 --> C1[View Certificates]
        C1 --> C2[Verify Chain of Custody]
        C2 --> C3[Generate Compliance Report]
    end
```

---

## 6. AI Identification Flow

```mermaid
flowchart TB
    subgraph "INPUT"
        I1[User Uploads Photo] --> I2[Image Stored in S3]
        I3[User Scans Barcode] --> I4[Serial Number Captured]
    end

    subgraph "AI PROCESSING"
        I2 --> P1[AWS Rekognition]
        P1 --> P2{Device Recognised?}
        P2 -->|Yes| P3[Return Device Type]
        P2 -->|No| P4[Return Low Confidence]

        I4 --> P5[Database Lookup]
        P5 --> P6{Match Found?}
        P6 -->|Yes| P7[Return Device Details]
        P6 -->|No| P8[No Match]
    end

    subgraph "RESULT"
        P3 --> R1[Auto-populate Form]
        P4 --> R2[Manual Entry Required]
        P7 --> R1
        P8 --> R2
        R1 --> R3[User Confirms]
        R2 --> R3
    end
```

---

## 7. Certificate Generation Flow

```mermaid
flowchart TB
    subgraph "TRIGGER"
        T1[Asset Marked Completed] --> T2{Certificate Type?}
    end

    subgraph "VALIDATION"
        T2 -->|Destruction| V1[Verify Data Bearing]
        T2 -->|Recycling| V2[Verify Recyclable]
        T2 -->|Sanitisation| V3[Verify Data Wiped]
        T2 -->|WEEE| V4[Verify WEEE Category]
    end

    subgraph "GENERATION"
        V1 --> G1[Create Certificate Record]
        V2 --> G1
        V3 --> G1
        V4 --> G1
        G1 --> G2[Generate PDF]
        G2 --> G3[Store in S3]
        G3 --> G4[Log Audit Entry]
    end

    subgraph "DELIVERY"
        G4 --> D1[Notify Client]
        D1 --> D2[Client Downloads PDF]
    end
```

---

## 8. Role-Based Access Summary

```mermaid
flowchart TB
    subgraph "ADMIN"
        AD[Administrator]
        AD --> AD1[Manage Users]
        AD --> AD2[Manage Organisations]
        AD --> AD3[View All Data]
        AD --> AD4[System Configuration]
    end

    subgraph "OPERATOR"
        OP[Operator]
        OP --> OP1[Process Assets]
        OP --> OP2[Update Status]
        OP --> OP3[Generate Certificates]
        OP --> OP4[View Assigned Batches]
    end

    subgraph "CLIENT"
        CL[Client User]
        CL --> CL1[Register Assets]
        CL --> CL2[Create Batches]
        CL --> CL3[Track Status]
        CL --> CL4[Download Certificates]
    end

    subgraph "AUDITOR"
        AU[Auditor]
        AU --> AU1[View All Data]
        AU --> AU2[Export Audit Logs]
        AU --> AU3[Read-Only Access]
    end
```

---

## Assumptions to Validate

| # | Assumption | Validate With |
|---|------------|---------------|
| 1 | Client registers assets before collection | Client stakeholders |
| 2 | Single portal serves all user types | Operators, Clients |
| 3 | AI identification happens at registration | Client stakeholders |
| 4 | Operators update status at each stage | A to Z operations team |
| 5 | Certificates generated per-asset (not batch only) | Compliance team |
| 6 | Auditors need export functionality | Auditor stakeholders |

---

## Document Cross-References

- [System Architecture](./01-system-architecture/README.md) — Technical implementation
- [Data Model](./02-data-model/README.md) — Entity relationships
- [API & Integration](./03-api-integration/README.md) — Endpoint design
- [Compliance & Security](./04-compliance-security/README.md) — Audit requirements
