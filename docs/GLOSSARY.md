# Glossary

This glossary defines key terms, acronyms, and standards referenced throughout the AI-Reclaim™ documentation.

---

## Compliance & Security Standards

| Term | Full Name | Description |
|------|-----------|-------------|
| **ISO 27001** | ISO/IEC 27001 | International standard for information security management systems (ISMS). Provides a framework for managing sensitive company and customer information. [Learn more](https://www.iso.org/isoiec-27001-information-security.html) |
| **ISO 27017** | ISO/IEC 27017 | Security controls for cloud services, extending ISO 27001 for cloud computing environments. |
| **ISO 27018** | ISO/IEC 27018 | Code of practice for protection of personally identifiable information (PII) in public clouds. |
| **GDPR** | General Data Protection Regulation | EU regulation on data protection and privacy. Applies to UK via UK GDPR post-Brexit. Governs how personal data must be collected, stored, and processed. [Learn more](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/) |
| **NHS DSPT** | NHS Data Security and Protection Toolkit | Annual self-assessment for organisations processing NHS patient data. Demonstrates compliance with data security standards. [Learn more](https://www.dsptoolkit.nhs.uk/) |
| **Cyber Essentials** | Cyber Essentials / Cyber Essentials Plus | UK government-backed scheme to help organisations protect against common cyber attacks. Plus includes hands-on technical verification. [Learn more](https://www.ncsc.gov.uk/cyberessentials/overview) |
| **SOC 1/2/3** | Service Organization Control | AICPA audit reports on controls at a service organisation. SOC 2 focuses on security, availability, processing integrity, confidentiality, and privacy. |
| **NIST 800-88** | NIST Special Publication 800-88 | Guidelines for media sanitisation. Defines standards for secure data erasure (Clear, Purge, Destroy). [Learn more](https://csrc.nist.gov/publications/detail/sp/800-88/rev-1/final) |
| **FIPS** | Federal Information Processing Standards | US government standards for cryptographic modules and security requirements. |
| **STIG** | Security Technical Implementation Guide | Configuration standards for securing information systems, used by US DoD and often adopted by government clients. |

---

## Industry Terms

| Term | Full Name | Description |
|------|-----------|-------------|
| **ITAD** | IT Asset Disposition | The process of disposing of obsolete or unwanted IT equipment in a safe, secure, and environmentally responsible manner. |
| **WEEE** | Waste Electrical and Electronic Equipment | EU directive governing the collection, recycling, and recovery of electronic waste. [Learn more](https://www.gov.uk/guidance/regulations-waste-electrical-and-electronic-equipment) |
| **ESG** | Environmental, Social, and Governance | Framework for measuring sustainability and ethical impact. Includes carbon footprint, waste diversion, and corporate responsibility metrics. |
| **R2** | Responsible Recycling | Certification standard for electronics recyclers, focusing on environmental responsibility and worker safety. [Learn more](https://sustainableelectronics.org/r2/) |
| **e-Stewards** | e-Stewards Certification | Certification for responsible e-waste recyclers, prohibiting export of hazardous e-waste to developing countries. [Learn more](https://e-stewards.org/) |
| **Chain of Custody** | — | Documented trail tracking the handling, transfer, and processing of assets from collection to final disposition. |
| **Certificate of Destruction** | CoD | Legal document confirming that IT assets have been securely destroyed or recycled according to specified standards. |
| **Data Sanitisation** | — | Secure erasure of data from storage devices to prevent recovery. Methods include overwriting, degaussing, and physical destruction. |

---

## Technical Terms

| Term | Full Name | Description |
|------|-----------|-------------|
| **API** | Application Programming Interface | Set of protocols and tools for building software applications. REST APIs use HTTP methods (GET, POST, PUT, DELETE). |
| **JWT** | JSON Web Token | Compact, URL-safe token format for securely transmitting claims between parties. Used for authentication and authorisation. |
| **MFA** | Multi-Factor Authentication | Security mechanism requiring two or more verification methods (password + SMS code, authenticator app, etc.). |
| **RLS** | Row-Level Security | Database feature that restricts which rows users can access. Used in PostgreSQL for multi-tenant data isolation. |
| **TLS** | Transport Layer Security | Cryptographic protocol for secure communication over networks. TLS 1.3 is the current version. |
| **ACID** | Atomicity, Consistency, Isolation, Durability | Properties guaranteeing reliable database transactions. |
| **CDN** | Content Delivery Network | Distributed network of servers that delivers content to users based on geographic location for faster load times. |
| **VPC** | Virtual Private Cloud | Isolated virtual network within a cloud provider where resources are deployed securely. |
| **IAM** | Identity and Access Management | Framework for managing digital identities and controlling access to resources. |
| **RBAC** | Role-Based Access Control | Access control method where permissions are assigned to roles, and users are assigned to roles. |
| **SaaS** | Software as a Service | Software delivery model where applications are hosted in the cloud and accessed via subscription. |
| **PoC** | Proof of Concept | Small-scale implementation to verify that a concept or approach is feasible. |
| **UAT** | User Acceptance Testing | Final testing phase where end users validate that the system meets requirements. |
| **SLA** | Service Level Agreement | Contract defining expected service performance metrics (uptime, response time, etc.). |
| **DHI** | Docker Hardened Images | Security-hardened container base images with minimal attack surface and near-zero CVE count. |
| **CVE** | Common Vulnerabilities and Exposures | Publicly disclosed cybersecurity vulnerabilities, each assigned a unique identifier. |
| **SLSA** | Supply-chain Levels for Software Artifacts | Framework for ensuring the integrity of software artifacts throughout the supply chain. |

---

## AWS Services

| Abbreviation | Full Name | Description |
|--------------|-----------|-------------|
| **S3** | Simple Storage Service | Object storage service for storing and retrieving files, images, and backups. [Learn more](https://aws.amazon.com/s3/) |
| **RDS** | Relational Database Service | Managed relational database service supporting PostgreSQL, MySQL, and others. [Learn more](https://aws.amazon.com/rds/) |
| **ECS** | Elastic Container Service | Container orchestration service for running Docker containers. [Learn more](https://aws.amazon.com/ecs/) |
| **ECR** | Elastic Container Registry | Private Docker container image registry. [Learn more](https://aws.amazon.com/ecr/) |
| **ALB** | Application Load Balancer | Layer 7 load balancer for distributing HTTP/HTTPS traffic across targets. [Learn more](https://aws.amazon.com/elasticloadbalancing/) |
| **WAF** | Web Application Firewall | Firewall protecting web applications from common exploits (SQL injection, XSS). [Learn more](https://aws.amazon.com/waf/) |
| **KMS** | Key Management Service | Managed service for creating and controlling encryption keys. [Learn more](https://aws.amazon.com/kms/) |
| **Cognito** | Amazon Cognito | Managed authentication service providing user sign-up, sign-in, and access control. [Learn more](https://aws.amazon.com/cognito/) |
| **CloudFront** | Amazon CloudFront | Global CDN for fast content delivery with edge caching. [Learn more](https://aws.amazon.com/cloudfront/) |
| **CloudTrail** | AWS CloudTrail | Service for logging and monitoring API calls and user activity. [Learn more](https://aws.amazon.com/cloudtrail/) |
| **Rekognition** | Amazon Rekognition | AI service for image and video analysis, including object detection. [Learn more](https://aws.amazon.com/rekognition/) |
| **ElastiCache** | Amazon ElastiCache | Managed in-memory caching service (Redis or Memcached). [Learn more](https://aws.amazon.com/elasticache/) |
| **Fargate** | AWS Fargate | Serverless compute engine for containers (no server management required). [Learn more](https://aws.amazon.com/fargate/) |

---

## Document Status Terms

| Term | Description |
|------|-------------|
| **Draft** | Document under development, not ready for review |
| **Draft for Review** | Document complete but awaiting stakeholder review |
| **Complete** | Document reviewed and approved |
| **Superseded** | Document replaced by a newer version |

