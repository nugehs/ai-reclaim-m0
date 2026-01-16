# Compliance, Security & Audit Logging

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

This document defines the compliance, security, and audit logging approach for AI-Reclaim™. As a platform serving NHS trusts, banks, local authorities, and enterprises, compliance is a foundational requirement rather than an afterthought.

**Key decisions:**
- Target compliance: GDPR, NHS DSPT, ISO 27001, Cyber Essentials Plus
- Immutable audit logging with before/after state capture
- UK data residency (AWS eu-west-2 only)
- Defence-in-depth security architecture
- Role-based access control with MFA for privileged users

---

## 1. Compliance Framework

### 1.1 Target Compliance Standards

| Standard | Relevance | Priority |
|----------|-----------|----------|
| **GDPR** | All UK/EU personal data processing | Critical |
| **NHS DSPT** | NHS trust customers | Critical |
| **ISO 27001** | Enterprise customers, demonstrates security maturity | High |
| **Cyber Essentials Plus** | UK government contracts, baseline security | High |
| **WEEE Regulations** | IT asset disposal compliance | Medium |

### 1.2 GDPR Compliance

| Requirement | Implementation Approach |
|-------------|------------------------|
| Lawful basis | Processing based on contract (service delivery) and legitimate interest (security) |
| Data minimisation | Collect only data required for asset tracking and compliance |
| Storage limitation | Defined retention periods per data type (see Data Retention) |
| Right to access | Export functionality for organisation data |
| Right to erasure | Soft delete with anonymisation after retention period |
| Right to portability | Standard export formats (JSON, CSV) |
| Security of processing | Encryption, access controls, audit logging |
| Breach notification | Incident response procedure with 72-hour notification |

**Personal Data Processed:**

| Data Category | Examples | Retention |
|---------------|----------|-----------|
| User account data | Name, email, role | Account lifetime + 1 year |
| Audit logs | User actions, IP addresses | 7 years |
| Asset data | Serial numbers (may link to individuals) | 7 years |

### 1.3 NHS Data Security and Protection Toolkit (DSPT)

The NHS DSPT requires organisations to meet 10 data security standards. Key requirements addressed:

| DSPT Standard | How AI-Reclaim Addresses |
|---------------|-------------------------|
| 1. Personal confidential data | Role-based access, need-to-know principle |
| 2. Staff responsibilities | User training documentation, access policies |
| 3. Training | Platform includes user role documentation |
| 4. Managing access | RBAC, MFA, access reviews |
| 5. Process reviews | Audit logging, compliance reporting |
| 6. Responding to incidents | Incident response procedure |
| 7. Continuity planning | Multi-AZ deployment, backup strategy |
| 8. Unsupported systems | AWS managed services, regular updates |
| 9. IT protection | Encryption, WAF, security monitoring |
| 10. Accountable suppliers | Supplier security assessment process |

### 1.4 ISO 27001 Alignment

Key ISO 27001 control domains addressed:

| Control Domain | Implementation |
|----------------|----------------|
| A.5 Information security policies | Documented security policies |
| A.6 Organisation of information security | Defined roles and responsibilities |
| A.8 Asset management | Asset inventory, classification |
| A.9 Access control | RBAC, authentication, authorisation |
| A.10 Cryptography | Encryption at rest and in transit |
| A.12 Operations security | Logging, monitoring, change management |
| A.13 Communications security | Network segmentation, TLS |
| A.14 System acquisition | Secure development practices |
| A.16 Incident management | Incident response procedure |
| A.18 Compliance | Legal and regulatory compliance |

### 1.5 Cyber Essentials Plus

| Control | Implementation |
|---------|----------------|
| Firewalls | AWS WAF, Security Groups, VPC |
| Secure configuration | Infrastructure as Code, hardened AMIs |
| User access control | Cognito MFA, RBAC, least privilege |
| Malware protection | AWS GuardDuty, regular scanning |
| Patch management | Managed services, automated updates |

---

## 2. Security Architecture

### 2.1 Defence in Depth

```
┌─────────────────────────────────────────────────────────────┐
│                     PERIMETER SECURITY                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ CloudFront  │  │   AWS WAF   │  │   DDoS Protection   │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                    NETWORK SECURITY                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │     VPC     │  │   Subnets   │  │  Security Groups    │  │
│  │  Isolation  │  │ Public/Priv │  │   (Least Privilege) │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                   APPLICATION SECURITY                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Cognito   │  │    RBAC     │  │  Input Validation   │  │
│  │  Auth/MFA   │  │             │  │                     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                      DATA SECURITY                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Encryption  │  │     RLS     │  │   Audit Logging     │  │
│  │ Rest/Transit│  │  (Postgres) │  │                     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Security Controls by Layer

| Layer | Control | Purpose |
|-------|---------|---------|
| **Perimeter** | CloudFront | CDN, edge caching, TLS termination |
| | AWS WAF | OWASP Top 10 protection, rate limiting |
| | Shield | DDoS protection |
| **Network** | VPC | Network isolation |
| | Private subnets | Backend services not internet-accessible |
| | Security groups | Micro-segmentation, least privilege |
| | NACLs | Subnet-level access control |
| **Application** | Cognito | Authentication, MFA |
| | JWT validation | Request authentication |
| | RBAC | Authorisation |
| | Input validation | Prevent injection attacks |
| | CORS | Cross-origin protection |
| **Data** | KMS encryption | Data at rest |
| | TLS 1.3 | Data in transit |
| | RLS | Tenant isolation |
| | Audit logging | Accountability |

### 2.3 Network Architecture

```
┌──────────────────── VPC (10.0.0.0/16) ────────────────────┐
│                                                            │
│  ┌─────────── Public Subnets (10.0.1.0/24) ───────────┐   │
│  │  ALB    NAT Gateway                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                │
│  ┌─────────── Private Subnets (10.0.2.0/24) ──────────┐   │
│  │  ECS Tasks (API, Services)                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                │
│  ┌─────────── Data Subnets (10.0.3.0/24) ─────────────┐   │
│  │  RDS    ElastiCache                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 3. Authentication & Access Control

### 3.1 Authentication

| Requirement | Implementation |
|-------------|----------------|
| Identity provider | AWS Cognito User Pools |
| Password policy | Min 12 chars, complexity requirements |
| MFA | Required for Admin and Operator roles |
| Session management | JWT tokens, 1-hour access token, 30-day refresh |
| Account lockout | 5 failed attempts triggers temporary lockout |
| Password reset | Secure email-based flow |

### 3.2 Role-Based Access Control (RBAC)

| Role | Description | MFA Required |
|------|-------------|--------------|
| **Admin** | Organisation administrator, full access | Yes |
| **Operator** | Recycling facility staff, asset processing | Yes |
| **Client** | Client organisation staff, asset registration | No (recommended) |
| **Auditor** | Compliance auditor, read-only access | Yes |

### 3.3 Permission Matrix

| Permission | Admin | Operator | Client | Auditor |
|------------|-------|----------|--------|---------|
| Manage users | ✓ | — | — | — |
| View all audit logs | ✓ | — | — | ✓ |
| Generate certificates | ✓ | ✓ | — | — |
| Process assets | ✓ | ✓ | — | — |
| Register assets | ✓ | ✓ | ✓ | — |
| View own assets | ✓ | ✓ | ✓ | ✓ |
| Download certificates | ✓ | ✓ | ✓ | ✓ |
| Generate ESG reports | ✓ | — | ✓ | — |

---

## 4. Audit Logging

### 4.1 Audit Logging Approach

All significant actions are logged to an immutable audit trail. The audit log captures:

| Field | Description | Example |
|-------|-------------|---------|
| Timestamp | When action occurred | 2025-01-13T10:30:00Z |
| User ID | Who performed action | uuid |
| Organisation ID | Tenant context | uuid |
| Action | What was done | `asset.status_changed` |
| Entity type | What was affected | `asset` |
| Entity ID | Which record | uuid |
| Before state | Previous values | JSON |
| After state | New values | JSON |
| IP address | Client IP | 192.168.1.1 |

### 4.2 Audited Events

| Category | Events |
|----------|--------|
| **Authentication** | Login success, login failure, logout, password change, MFA setup |
| **Assets** | Create, update, status change, delete |
| **Batches** | Create, add assets, close, status change |
| **Certificates** | Generate, download |
| **Users** | Create, update, deactivate, role change |
| **System** | Configuration change, export data |

### 4.3 Audit Log Immutability

Audit log immutability is critical for compliance. A multi-layered approach ensures logs cannot be tampered with at any level.

#### 4.3.1 Immutability Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    AUDIT LOG FLOW                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Application                                                    │
│      │                                                          │
│      ▼                                                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              PostgreSQL (Hot Storage)                    │   │
│  │  ┌─────────────────────────────────────────────────┐    │   │
│  │  │  audit_logs table                               │    │   │
│  │  │  • INSERT only (triggers block UPDATE/DELETE)   │    │   │
│  │  │  • RLS enforced                                 │    │   │
│  │  │  • Hash chain: each row references previous     │    │   │
│  │  └─────────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────┘   │
│      │                                                          │
│      │ Archive Job (90 days)                                    │
│      ▼                                                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              S3 (Cold Storage)                           │   │
│  │  ┌─────────────────────────────────────────────────┐    │   │
│  │  │  s3://ai-reclaim-audit-logs/                    │    │   │
│  │  │  • Object Lock: Compliance Mode                 │    │   │
│  │  │  • Retention: 7 years                           │    │   │
│  │  │  • Versioning enabled                           │    │   │
│  │  │  • Server-side encryption (KMS)                 │    │   │
│  │  └─────────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 4.3.2 Database-Level Controls

| Control | Implementation | Purpose |
|---------|----------------|---------|
| INSERT-only trigger | PostgreSQL trigger on audit_logs | Blocks UPDATE and DELETE statements |
| RLS policy | `USING (false)` for UPDATE/DELETE | Users cannot modify via SQL |
| Separate schema | `audit` schema with restricted grants | Limits access to audit data |
| Connection isolation | Dedicated audit writer role | Application uses least-privilege role |

**Trigger Logic:**
- Any UPDATE attempt → raises exception
- Any DELETE attempt → raises exception
- Only INSERT permitted from application service

#### 4.3.3 S3 Object Lock Configuration

S3 Object Lock provides WORM (Write Once Read Many) storage for archived audit logs.

| Setting | Value | Rationale |
|---------|-------|-----------|
| **Mode** | Compliance | Cannot be overridden, even by root account |
| **Retention period** | 7 years (2,555 days) | Meets financial/legal retention requirements |
| **Versioning** | Enabled | Required for Object Lock |
| **Encryption** | SSE-KMS | AWS managed keys with audit trail |
| **Legal hold** | Available | Can extend retention for litigation |

**Compliance Mode vs Governance Mode:**

| Aspect | Compliance Mode ✓ | Governance Mode |
|--------|-------------------|-----------------|
| Override by root | No | Yes (with permission) |
| Retention change | Cannot shorten | Can shorten with permission |
| Audit requirement | Meets strict compliance | May not satisfy auditors |
| Recommendation | **Selected** | Not recommended |

**Bucket Policy:**
- Deny `s3:DeleteObject` for all principals
- Deny `s3:PutObjectRetention` (shorten) for all principals
- Allow `s3:PutObjectLegalHold` for compliance officers only

#### 4.3.4 Hash Chain Integrity

Each audit log entry includes a cryptographic hash linking it to the previous entry, creating a tamper-evident chain.

**Hash Calculation:**

| Field | Included in Hash |
|-------|------------------|
| Previous hash | ✓ |
| Timestamp | ✓ |
| User ID | ✓ |
| Organisation ID | ✓ |
| Action | ✓ |
| Entity type | ✓ |
| Entity ID | ✓ |
| Before state | ✓ |
| After state | ✓ |

**Hash Algorithm:** SHA-256

**Chain Structure:**
```
Entry 1: hash_1 = SHA256(genesis + data_1)
Entry 2: hash_2 = SHA256(hash_1 + data_2)
Entry 3: hash_3 = SHA256(hash_2 + data_3)
...
Entry N: hash_N = SHA256(hash_N-1 + data_N)
```

**Verification Process:**
1. Read entries in sequence
2. Recalculate hash for each entry
3. Compare calculated hash with stored hash
4. Any mismatch indicates tampering

#### 4.3.5 Cryptographic Signing (Future Enhancement)

> **Note:** This capability is designed for future implementation. Can be deferred to Phase 2.

For enhanced non-repudiation, audit log batches can be digitally signed using AWS KMS.

| Component | Approach |
|-----------|----------|
| Signing key | AWS KMS asymmetric key (RSA_2048) |
| Signed content | Daily batch hash + metadata |
| Signature storage | Alongside archived logs in S3 |
| Key rotation | Annual, with key versioning |
| Verification | Public key available for auditors |

**Benefits:**
- Proves logs existed at signing time
- Detects any post-signing modification
- Non-repudiation for legal proceedings

**Implementation Approach:**
1. Daily job calculates Merkle root of day's entries
2. Signs Merkle root with KMS key
3. Stores signature in S3 alongside log archive
4. Auditors can verify using public key

#### 4.3.6 Verification & Compliance Reporting

| Verification Type | Method | Frequency |
|-------------------|--------|-----------|
| Hash chain integrity | Automated job recalculates chain | Daily |
| S3 Object Lock status | AWS Config rule | Continuous |
| Archive completeness | Compare DB count vs S3 objects | Weekly |
| Retention compliance | S3 Inventory report | Monthly |

**Compliance Reports:**
- Audit log volume by organisation
- Hash verification results
- Object Lock retention status
- Access attempts to audit data

**Audit Support:**
- Export capability for external auditors
- Chain verification tool for spot checks
- Object Lock retention proof via S3 console

### 4.4 Audit Log Access

| Role | Access Level |
|------|--------------|
| Admin | View own organisation logs |
| Auditor | View and export all logs |
| Operator | View logs for own actions |
| Client | No direct access (via asset history) |

---

## 5. Data Protection

### 5.1 Encryption

| Data State | Method | Key Management |
|------------|--------|----------------|
| At rest (database) | AES-256 via RDS encryption | AWS KMS |
| At rest (files) | AES-256 via S3 encryption | AWS KMS |
| At rest (cache) | AES-256 via ElastiCache encryption | AWS KMS |
| In transit | TLS 1.3 | AWS Certificate Manager |

### 5.2 Key Management

| Aspect | Approach |
|--------|----------|
| Key storage | AWS KMS (FIPS 140-2 Level 2) |
| Key rotation | Automatic annual rotation |
| Access control | IAM policies, least privilege |
| Audit | CloudTrail logging of key usage |

### 5.3 Data Classification

| Classification | Examples | Handling |
|----------------|----------|----------|
| **Confidential** | User credentials, API keys | Encrypted, no logging of values |
| **Sensitive** | Personal data, audit logs | Encrypted, access controlled |
| **Internal** | Asset details, certificates | Encrypted, tenant-isolated |
| **Public** | Asset type reference data | No special handling |

---

## 6. Data Residency

### 6.1 UK Data Sovereignty

| Requirement | Implementation |
|-------------|----------------|
| Data location | AWS eu-west-2 (London) only |
| Processing location | All compute in eu-west-2 |
| Backup location | Same region |
| Replication | No cross-region replication |

### 6.2 Technical Controls

| Control | Purpose |
|---------|---------|
| AWS Config rules | Alert on non-UK resource creation |
| IAM policies | Deny actions in other regions |
| CloudFront | Origin in eu-west-2 |
| Service Control Policies | Organisation-level region restriction |

---

## 7. Data Retention

| Data Type | Active Retention | Archive | Deletion |
|-----------|------------------|---------|----------|
| User accounts | Account lifetime | +1 year | Anonymise |
| Assets | 7 years | S3 Glacier | Anonymise |
| Audit logs | 90 days hot | 7 years S3 | Delete |
| Certificates | Indefinite | — | Never |
| ESG reports | 2 years | 7 years S3 | Delete |
| Asset images | 1 year | — | Delete |
| Session data | 30 days | — | Delete |

---

## 8. Incident Response

### 8.1 Incident Classification

| Severity | Description | Response Time |
|----------|-------------|---------------|
| **Critical** | Data breach, system compromise | Immediate |
| **High** | Service outage, security vulnerability | 4 hours |
| **Medium** | Partial outage, suspicious activity | 24 hours |
| **Low** | Minor issue, policy violation | 72 hours |

### 8.2 Incident Response Process

```
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│ Detect  │──▶│ Assess  │──▶│ Contain │──▶│Eradicate│──▶│ Recover │
└─────────┘   └─────────┘   └─────────┘   └─────────┘   └─────────┘
                                                              │
                                                              ▼
                                                        ┌─────────┐
                                                        │ Review  │
                                                        └─────────┘
```

### 8.3 Breach Notification

| Requirement | Timeline |
|-------------|----------|
| Internal escalation | Immediate |
| ICO notification (if required) | Within 72 hours |
| Affected organisation notification | Without undue delay |
| Documentation | Complete incident report |

---

## 9. Security Monitoring

### 9.1 Monitoring Components

| Component | Purpose |
|-----------|---------|
| AWS CloudTrail | API activity logging |
| AWS GuardDuty | Threat detection |
| CloudWatch Logs | Application logging |
| CloudWatch Alarms | Threshold alerting |
| AWS Config | Configuration compliance |

### 9.2 Security Alerts

| Alert Type | Trigger | Response |
|------------|---------|----------|
| Failed logins | 5+ failures in 5 minutes | Review, potential lockout |
| Unusual access | Off-hours admin access | Verify legitimacy |
| Data export | Large data export | Review authorisation |
| Configuration change | Security group modified | Verify change request |

---

## 10. Assumptions

### 10.1 Confirmed Assumptions

| ID | Assumption | Source |
|----|------------|--------|
| A1 | UK data residency required | Compliance requirement |
| A2 | MFA required for privileged roles | Security best practice |
| A3 | 7-year audit log retention | Legal/compliance guidance |
| A4 | AWS managed services acceptable | Architecture decision |

### 10.2 Assumptions Requiring Validation

| ID | Assumption | Confidence | Validation |
|----|------------|------------|------------|
| A5 | NHS DSPT self-assessment sufficient (vs. audit) | Medium | Confirm with NHS clients |
| A6 | ISO 27001 certification not required for MVP | Medium | Confirm with enterprise clients |
| A7 | Standard audit logging sufficient (vs. forensic) | High | Confirm with auditors |
| A8 | 72-hour breach notification meets all requirements | High | Legal review |

---

## 11. Open Questions

| ID | Question | Impact | Resolution |
|----|----------|--------|------------|
| Q1 | Is ISO 27001 certification required for Phase 1? | Scope | Client consultation |
| Q2 | Specific NHS trust security questionnaire requirements? | Compliance scope | Engage with NHS clients |
| Q3 | Should audit logs be cryptographically signed? | Implementation effort | Security review |
| Q4 | Third-party penetration testing required before launch? | Scope | Stakeholder decision |

---

## 12. Decision Log

| ID | Decision | Rationale |
|----|----------|-----------|
| D1 | Target all major compliance frameworks | Broadest market coverage |
| D2 | Standard audit depth (not forensic) | Balance between compliance and storage/performance |
| D3 | 7-year audit retention | Aligns with financial record requirements |
| D4 | MFA required for Admin/Operator only | Balance security and usability |
| D5 | AWS KMS for key management | Managed service, compliance certifications |
