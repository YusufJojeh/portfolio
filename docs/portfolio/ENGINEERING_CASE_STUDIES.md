# Engineering Case Studies

Yusuf Mohammad Jojeh · Full-Stack Software Engineer · Backend and Applied AI

These six projects show how I translate operational requirements into interfaces, data models, API rules, integrations, and acceptance checks. Each study identifies the scope I can discuss and the evidence behind the result.

## 1. Reservations and commissions in Saudi real estate

**Context and people.** A production ERP/CRM connected Saudi real-estate sales agents, contract teams, and finance. An available unit, an accepted reservation, and an earned commission each had different business rules.

**My role.** I worked across Laravel and Vue and coordinated delivery with roughly five engineering contributors. I scoped technical work, contributed to architecture and API contracts, reviewed frontend changes, and owned advertising integrations.

**Workflow and architecture.** A salesperson records a reservation. The backend determines whether the unit is still eligible and which approval can open a contract. Finance reads the resulting events against the same reservation and contract references. Vue screens present actionable states while Laravel and the relational database enforce role, access, and transition rules. Provider adapters separate lead intake and advertising attribution from the CRM's domain model.

**Risk, testing, and evidence.** Two simultaneous requests require one durable reservation outcome and a clear response to the second user. A regression case can trace the winner, the data each role may access, and the changes triggered by cancellation. The production platform contains more than 150 APIs across the team's work.

**Lesson and next improvement.** Review an end-to-end business transition with sales and finance before implementing separate screens. I would add a small acceptance suite that exercises conflicting reservations and finance-facing reversals on every relevant release.

## 2. Recovering a commerce checkout and governing agent purchases

**Context and people.** A Saudi commerce platform had customers, operations staff, finance reviewers, and integrations capable of placing orders. Checkout availability and the integrity of financial state had to survive retries and changes in providers.

**My role.** I built and hardened an agent checkout layer and handled application-level troubleshooting and verification. I specified API behavior and the handoffs that frontend, mobile, QA, and release owners needed.

**Workflow and architecture.** REST and MCP surface scoped catalog, cart, preflight, and wallet-order operations. The backend owns delegated authorization, spending rules, the final checkout decision, and traceability. Clients can render the resulting state for the customer or support operator. Auditable order and payment references give operations and finance a common record.

**Risk, testing, and evidence.** I tested retry and concurrent-confirmation scenarios and checked financial records for duplicated effects. During a separate real gateway disruption, I enabled a fallback in production in about 45 minutes of hands-on engineering work. Provider-by-provider rollout and live transaction evidence are tracked separately.

**Lesson and next improvement.** Verify order state and the financial effect together. I would maintain a reusable reconciliation drill covering delayed confirmations during a provider switch.

## 3. Making recurring logistics queries faster

**Context and people.** A shipping and logistics application handled tracking, reporting, and workflows for multiple roles. Operators had to get current information across repeated reads without losing the correctness of account-scoped data.

**My role.** I contributed to Laravel APIs and recurring-query performance within the Mermez engagement. My scope covered the affected data-access and retrieval paths, with dashboards consuming the resulting records.

**Workflow and architecture.** An operator looks up shipments or requests a report. A Laravel query scopes data to the business and applies filters before loading associated records. Targeted indexing and query changes reduced repeated database work. Redis cached selected recurring lookups where the data and scoping rules made caching suitable.

**Risk, testing, and evidence.** Index changes can affect other write and read paths. Cache identifiers and invalidation must preserve tenant scope and avoid stale business results. I compared the affected recurring queries and recorded approximately 25% better performance on those paths.

**Lesson and next improvement.** Measure a named query path before changing the data layer. I would capture representative query plans, cold and warm cache results, and a cross-tenant access check alongside the benchmark.

## 4. Evidence and approvals in ProspectIQ

**Context and people.** Sales teams need to know why a lead received a score and which evidence supports the next proposed action. This is a public repository designed for local evaluation.

**My role.** I built the full-stack lead-intelligence flow, from the React and TypeScript workspace through FastAPI and provider integrations.

**Workflow and architecture.** Research produces normalized facts and signals. Backend rules compute the lead score. The model interprets supporting evidence and proposes next steps. A workspace member can inspect the evidence and approve a consequential write. The React interface receives run progress through server-sent events. MariaDB stores workspace and run records, and Redis supports the application.

**Risk, testing, and evidence.** Provider modes distinguish live, demo, and unavailable behavior. Workspace checks and approval gates narrow tool execution. Automated browser tests exercise the main interaction paths. The public README documents setup, provider modes, and known limits.

**Lesson and next improvement.** A score is easier to challenge when the authorization boundary and the evidence trail are visible in the interface. I would add evaluation cases for inconsistent source documents, declined approvals, and delayed provider responses.

Public source [ProspectIQ](https://github.com/YusufJojeh/ProspectIQ)

## 5. Historical reporting for an Omani waqf

**Context and people.** An Omani waqf operations platform manages endowments, property leases, donations, and records used by financial and operational teams. An obligation and the corresponding receipt can sit on different dates.

**My role.** I decomposed backend domains and built workflows on an existing custom PHP framework. I handled GraphQL contracts, MySQL behavior, and QA acceptance, with the administration client consuming scoped records.

**Workflow and architecture.** Staff record leases, dues, collections, and donations. Backend services preserve the links between the records so finance can trace a payment back to the original obligation. Identity and permission checks determine which records each actor can read or update. Payment and reporting behavior are verified against the same intended business state.

**Risk, testing, and evidence.** Payment confirmations, date cutoffs, and a reconstructed database all need verifiable results. Acceptance covered regression and a non-production backup and restore rehearsal. The endowment is described here at the domain level.

**Lesson and next improvement.** Define the report date and evidence of settlement with finance before implementing the query. I would add a repeatable comparison for a lease due before the reporting cutoff and paid after it.

## 6. Concurrent order edits in RestoCafe OS

**Context and people.** A restaurant workflow has a till, kitchen, and branch operators editing the same order. Staff need useful feedback when the order changes while their screen is open. The repository is a local development build.

**My role.** I worked on the TypeScript full-stack design and implementation across React operations screens and a NestJS API.

**Workflow and architecture.** React sends state-aware requests to NestJS. Prisma and PostgreSQL persist branch-scoped orders, and Redis and real-time events support coordination. The API checks branch access and order versions. A repeated action can reuse its prior outcome, and a stale attempt receives a conflict that lets the screen refresh.

**Risk, testing, and evidence.** Role and branch scoping apply to both reads and writes, including reconnects. Browser and API checks cover important workflows. The repository documents how to run the monorepo and test order transitions.

**Lesson and next improvement.** Make the normal recovery path for a stale screen explicit in both the API and UI. I would add a two-role scenario where a cashier retries a request after kitchen changes the order.

Public source [RestoCafe OS](https://github.com/YusufJojeh/RecafeOS)
