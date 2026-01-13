# Risks & Unknowns Register

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

## Risk Matrix

| Probability ↓ / Impact → | Low | Medium | High |
|--------------------------|-----|--------|------|
| **High** | Monitor | Mitigate | Critical |
| **Medium** | Accept | Monitor | Mitigate |
| **Low** | Accept | Accept | Monitor |

## Technical Risks

| ID | Risk | Probability | Impact | Mitigation |
|----|------|-------------|--------|------------|
| T1 | AI model accuracy insufficient | Medium | High | Validate with sample data early |
| T2 | Scalability bottlenecks | Low | High | Design for horizontal scaling |
| T3 | Third-party API dependencies | Medium | Medium | Abstract integrations, have fallbacks |

## Compliance Risks

| ID | Risk | Probability | Impact | Mitigation |
|----|------|-------------|--------|------------|
| C1 | GDPR non-compliance | Low | High | Legal review, DPO consultation |
| C2 | NHS DSPT requirements unclear | Medium | Medium | Early engagement with NHS clients |
| C3 | Audit log tampering | Low | High | Immutable storage, cryptographic hashing |

## Operational Risks

| ID | Risk | Probability | Impact | Mitigation |
|----|------|-------------|--------|------------|
| O1 | Key person dependency | Medium | Medium | Documentation, knowledge sharing |
| O2 | Scope creep | High | Medium | Strict change control process |

## Unknowns

| ID | Unknown | Impact if Unresolved | Resolution Approach |
|----|---------|---------------------|---------------------|
| U1 | Exact NHS certification requirements | May delay NHS sales | Research, client consultation |
| U2 | AI training data availability | May delay AI features | Assess data sources early |
| U3 | Integration requirements for existing systems | May require additional dev | Discovery with target clients |

## Risk Review Schedule

- Weekly review during development
- Update register with new risks as identified
- Close resolved risks with resolution notes
