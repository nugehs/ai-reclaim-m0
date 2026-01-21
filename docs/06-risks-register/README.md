# Risks & Unknowns Register

**Document Version:** 1.0
**Last Updated:** 24 January 2026
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

This register consolidates all risks and unknowns identified across Milestone 0 deliverables. It provides a single view of items requiring attention before or during Phase 1 development.

**Summary:**
- 12 Technical risks
- 6 Compliance risks
- 5 Operational risks
- 11 Unknowns requiring resolution

---

## 1. Risk Assessment Matrix

| Probability ↓ / Impact → | Low | Medium | High |
|--------------------------|-----|--------|------|
| **High** | Monitor | Mitigate | 🔴 Critical |
| **Medium** | Accept | Monitor | 🟠 Mitigate |
| **Low** | Accept | Accept | 🟡 Monitor |

---

## 2. Technical Risks

| ID | Risk | Prob | Impact | Rating | Mitigation | Source |
|----|------|------|--------|--------|------------|--------|
| T1 | AWS Rekognition doesn't recognise IT equipment accurately | Medium | High | 🟠 Mitigate | PoC with 50+ sample images before Phase 1 | Architecture |
| T2 | AI identification response time exceeds 5s | Medium | Medium | Monitor | Implement async pattern with polling/webhook if needed | API |
| T3 | PostgreSQL audit log performance degrades at scale | Medium | High | 🟠 Mitigate | Load test with projected volumes; consider time-series DB | Architecture |
| T4 | Multi-tenant RLS insufficient for client requirements | Low | High | 🟡 Monitor | Security review; consider schema-per-tenant if needed | Architecture |
| T5 | Cognito MFA/SSO doesn't meet enterprise requirements | Low | Medium | Accept | Spike on Cognito capabilities early in M2 | Architecture |
| T6 | PDF generation fails at scale | Medium | Medium | Monitor | Evaluate PDF libraries; use Lambda for burst capacity | Roadmap |
| T7 | S3 signed URL security concerns | Low | Medium | Accept | Security review during M3 | API |
| T8 | Database connection pool exhaustion | Low | High | 🟡 Monitor | Configure appropriate pool size; implement connection management | Architecture |
| T9 | Image storage capacity planning | Low | Low | Accept | Implement lifecycle policies; review after pilot | Architecture |
| T10 | Third-party API dependencies unavailable | Medium | Medium | Monitor | Abstract integrations; implement circuit breakers | Architecture |
| T11 | Barcode scanning accuracy issues | Low | Medium | Accept | Support manual entry fallback | Data Model |
| T12 | Real-time updates needed (WebSocket) | Medium | Medium | Monitor | Review UX requirements; add if needed in Phase 2 | API |

---

## 3. Compliance Risks

| ID | Risk | Prob | Impact | Rating | Mitigation | Source |
|----|------|------|--------|--------|------------|--------|
| C1 | GDPR non-compliance discovered post-launch | Low | High | 🟡 Monitor | Legal review before launch; DPO consultation | Compliance |
| C2 | NHS DSPT requirements unclear or change | Medium | Medium | Monitor | Early engagement with NHS clients; track DSPT updates | Compliance |
| C3 | ISO 27001 certification required for Phase 1 | Medium | High | 🟠 Mitigate | Confirm with enterprise clients early; budget if needed | Compliance |
| C4 | Audit log tampering vulnerability | Low | High | 🟡 Monitor | Immutable storage; S3 Object Lock; consider cryptographic signing | Compliance |
| C5 | Data residency violation (accidental cross-region) | Low | High | 🟡 Monitor | AWS Config rules; IAM deny policies; regular audit | Architecture |
| C6 | Breach notification process inadequate | Low | High | 🟡 Monitor | Document procedure; legal review; test with tabletop exercise | Compliance |

---

## 4. Operational Risks

| ID | Risk | Prob | Impact | Rating | Mitigation | Source |
|----|------|------|--------|--------|------------|--------|
| O1 | Scope creep delays delivery | High | Medium | 🟠 Mitigate | Strict change control; defer non-critical features to Phase 2 | Roadmap |
| O2 | Key person dependency | Medium | Medium | Monitor | Documentation; knowledge sharing; cross-training | Roadmap |
| O3 | Pilot client unavailable for UAT | Medium | Medium | Monitor | Identify backup client; internal UAT as fallback | Roadmap |
| O4 | Team lacks React/Node experience | Low | Medium | Accept | Training time; hire if needed | Roadmap |
| O5 | Infrastructure capacity planning | Low | Low | Accept | Monitor usage; implement alerts | Roadmap |

---

## 5. Unknowns

Items requiring resolution before or during Phase 1:

| ID | Unknown | Impact if Unresolved | Resolution Approach | Owner | Due |
|----|---------|---------------------|---------------------|-------|-----|
| U1 | Operator portal requirements | May need separate UI design | Interview 2-3 recycling operators | Product | Before M3 |
| U2 | AI training data availability | May need custom model | Assess data sources; test Rekognition | Tech | Before M3 |
| U3 | NHS specific security questionnaire | May delay NHS sales | Engage NHS trust prospect | Sales | Before M6 |
| U4 | Legal retention period for certificates | Storage capacity impact | Legal consultation | Legal | Before M5 |
| U5 | Custom certificate templates needed | Additional design/dev | Confirm with pilot client | Product | Before M5 |
| U6 | Penetration testing required | Scope impact | Stakeholder decision | PM | Before M6 |
| U7 | Offline capability requirement | Architecture impact | Confirm with field staff users | Product | Before M3 |
| U8 | Integration requirements (ERP, etc.) | Phase 2 scope | Discovery with target clients | Sales | Before Phase 2 |
| U9 | Bulk import file formats | Feature scope | Client consultation | Product | Before M3 |
| U10 | Production support model | Operational planning | Stakeholder decision | PM | Before M6 |
| U11 | Cryptographic signing for audit logs | Implementation effort | Security review | Tech | Before M5 |

---

## 6. Risk Heatmap

```
                    IMPACT
           Low      Medium     High
        ┌────────┬──────────┬──────────┐
  High  │   —    │   O1     │    —     │
        ├────────┼──────────┼──────────┤
Prob    │  T9    │ T2,T6    │ T1,T3    │
Medium  │  O5    │ T10,T12  │   C3     │
        │        │ C2,O2,O3 │          │
        ├────────┼──────────┼──────────┤
  Low   │   —    │ T5,T7    │ T4,T8    │
        │        │ T11,O4   │ C1,C4    │
        │        │          │ C5,C6    │
        └────────┴──────────┴──────────┘
```

---

## 7. Critical Items for Immediate Action

These items should be addressed before Phase 1 development begins:

| Priority | ID | Item | Action Required |
|----------|----|----- |-----------------|
| 🔴 1 | T1 | AI accuracy unknown | Run PoC with 50+ IT asset images |
| 🔴 2 | U1 | Operator portal scope | Interview recycling operators |
| 🟠 3 | C3 | ISO 27001 requirement | Confirm with enterprise prospects |
| 🟠 4 | T3 | Audit log performance | Estimate volumes; benchmark PostgreSQL |
| 🟡 5 | U4 | Certificate retention | Legal consultation |

---

## 8. Risk Review Schedule

| Activity | Frequency | Participants |
|----------|-----------|--------------|
| Risk register review | Weekly during development | Tech Lead, PM |
| Risk status update | Each milestone completion | Full team |
| New risk identification | Ongoing | All team members |
| Critical risk escalation | Immediate | PM → Stakeholders |

---

## 9. Risk Response Definitions

| Response | Description |
|----------|-------------|
| **Accept** | Risk is acknowledged; no specific action taken |
| **Monitor** | Risk is tracked; action taken if probability/impact increases |
| **Mitigate** | Active steps taken to reduce probability or impact |
| **Avoid** | Change approach to eliminate risk entirely |
| **Transfer** | Shift risk to third party (insurance, contracts) |

---

## 10. Document Cross-References

Risks consolidated from:

| Document | Risks | Open Questions |
|----------|-------|----------------|
| [01 - System Architecture](../01-system-architecture/README.md) | T1-T5, T8-T10, C5 | 5 |
| [02 - Core Data Model](../02-data-model/README.md) | T11 | 4 |
| [03 - API & Integration](../03-api-integration/README.md) | T2, T7, T12 | 4 |
| [04 - Compliance & Security](../04-compliance-security/README.md) | C1-C4, C6 | 4 |
| [05 - Delivery Roadmap](../05-delivery-roadmap/README.md) | T6, O1-O5 | 4 |
