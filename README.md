**KustodyFi – SEAL-governed hedging & settlement orchestration (demo)**  
This repo captures the minimal wiring we use to show how SEAL manages a hedge: price guidance, multi-bank RFQ, two-person approvals, execution, and proof. Everything stays keyless on the server and ends with an audit pack.

## Goals of Demo

- Prove the full lifecycle (pricing → RFQ → approvals → execute → attest → audit pack) without server-side private keys.
- Force Dealer + CFO passkeys before unlocking execution.
- Emit a ZIP that bundles curve inputs, quotes, approvals, tx/bank refs, Travel-Rule receipt stub, and the hash-chain digest.

## Architecture (Final Target)

The final product is a middle-layer orchestration with SEAL as the execution firewall. It integrates bank RFQ, enterprise custodians, Travel-Rule networks, and on-chain rails while producing a regulator-ready audit pack (quote→approvals→settlement proofs). Each block below addresses the incident patterns and competitor gaps we see in the field: policy-as-code plus dual approval to block insider pushes, simulation and circuit breakers to avoid fat-finger or velocity abuse, and unified audit outputs so ops/legal have a single source of truth.

### System Architecture (Mermaid)

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "fontFamily": "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
    "fontSize": "14px",
    "primaryColor": "#F6F8FB",
    "primaryBorderColor": "#AEB7C2",
    "lineColor": "#64748B",
    "tertiaryColor": "#FFFFFF"
  },
  "flowchart": { "curve": "linear", "htmlLabels": true, "useMaxWidth": true }
}}%%
flowchart LR
  %% ===== Styles for nodes =====
  classDef box  fill:#F6F8FB,stroke:#AEB7C2,rx:8,ry:8,color:#0F172A,font-size:12px
  classDef white fill:#FFFFFF,stroke:#CBD5E1,rx:8,ry:8,color:#0F172A,font-size:12px
  classDef seal fill:#E8F0FE,stroke:#A0A6C8,rx:8,ry:8,color:#0F172A,font-size:12px
  classDef ext  fill:#ECFDF5,stroke:#86EFAC,rx:8,ry:8,color:#0F172A,font-size:12px
  classDef ops  fill:#FFF7ED,stroke:#F59E0B,rx:8,ry:8,color:#0F172A,font-size:12px

  %% ===== Client lane =====
  subgraph CLIENT["Client Org (Treasury · Risk · Finance)"]
    UI["Web App (Next.js/TS)<br/>Pricing · RFQ · Approvals · Execute · Audit"]:::box
    IDP["SSO (OIDC/SAML) · SCIM"]:::box
    PASSKEY["FIDO2/WebAuthn authenticators<br/>(Dealer · CFO)"]:::box
  end
  style CLIENT fill:#F9FAFB,stroke:#CBD5E1,stroke-width:2,stroke-dasharray:6 4

  %% ===== Orchestration lane (with SEAL) =====
  subgraph KF["KustodyFi Orchestration Plane (SEAL inside)"]
    GW["API Gateway/WAF (Kong/Envoy)<br/>mTLS · JWT/OIDC · rate limit · request signing"]:::white

    subgraph ORCH["Orchestration Services"]
      PRICE["Pricing Guidance svc<br/>Theo curve (spot+carry+basis+ops); versioned snapshot"]:::white
      RFQ["RFQ Router<br/>Bank connectors (FIX/REST/ISO20022/SFTP); quote timers/IDs"]:::white
      SETTLER["Settlement Orchestrator<br/>Fiat tasks · stablecoin linkage; attestation builder"]:::white
      SIGNER["Signer Broker<br/>Custodian adapters (Fireblocks/BitGo/Copper/Anchorage/Circle)"]:::white
      TR["Compliance Orchestrator<br/>Travel‑Rule (CODE/VerifyVASP/Sygna) · KYC/KYB hooks"]:::white
      EXPORT["Audit Exporter<br/>PDF/CSV bundles · API export · evidence packaging"]:::white
      ERP["ERP/TMS adapters (SAP/Kyriba/etc.)<br/>Status sync · reference matching"]:::white
    end

    subgraph SEAL["SEAL Core — Execution Firewall"]
      POLICY["Policy Engine (DSL→WASM)<br/>Limits · whitelists · time windows · method allowlists"]:::seal
      APPROVAL["Approvals svc<br/>Role/quorum · FIDO2 step‑up · hardware attestations"]:::seal
      SIM["Tx Simulation<br/>EVM static‑call/ABI decode; human‑readable diffs; allowlists"]:::seal
      BRAKE["Circuit Breakers<br/>Velocity/bulk caps · org‑wide FREEZE · cold→warm guardrails"]:::seal
      AUDIT["Immutable Audit Ledger<br/>Append‑only hash chain · daily Merkle root · on‑chain anchor"]:::seal
    end
  end
  style KF fill:#FFFFFF,stroke:#94A3B8,stroke-width:2,stroke-dasharray:6 4

  %% ===== Data & Ops lane =====
  subgraph DATA["Data & Ops Plane"]
    DB["Postgres (OLTP)<br/>orgs · users · policies · quotes · approvals · executions · settlement · audit_events"]:::ops
    BUS["Event Bus (Kafka/Redpanda)<br/>outbox · retries · SAGA orchestration"]:::ops
    OBJ["Object Store (WORM)<br/>quotes · TR receipts · PDFs · CSVs"]:::ops
    WH["Warehouse (Snowflake/BigQuery)<br/>reporting · anomaly features"]:::ops
    OBS["Observability<br/>OTel · Prom/Graf · Jaeger · Loki"]:::ops
    SECRETS["Secrets<br/>Vault/KMS · mTLS/OIDC tokens · rotation"]:::ops
  end
  style DATA fill:#FFFBEB,stroke:#F59E0B,stroke-width:2,stroke-dasharray:6 4

  %% ===== External lane =====
  subgraph EXT["External Counterparties"]
    BANKS["Banks / Liquidity Providers<br/>multi‑bank quotes & confirms"]:::ext
    CUST["Enterprise Custodians<br/>client‑managed MPC/HSM signers"]:::ext
    CHAINS["On‑chain Networks (EVM L2 first)<br/>Base · Polygon · testnets/mainnets"]:::ext
    TRNET["Travel‑Rule Networks<br/>CODE · VerifyVASP · Sygna"]:::ext
    KYC["KYC/KYB vendors"]:::ext
  end
  style EXT fill:#F0FDF4,stroke:#86EFAC,stroke-width:2,stroke-dasharray:6 4

  %% ===== Primary flows (orthogonal) =====
  UI --> GW
  GW --> PRICE
  GW --> RFQ
  GW --> SETTLER
  GW --> EXPORT

  RFQ --> BANKS
  BANKS --> RFQ

  GW --> POLICY
  GW --> APPROVAL
  GW --> SIM
  GW --> BRAKE

  POLICY --> AUDIT
  APPROVAL --> AUDIT
  SIM --> AUDIT
  BRAKE --> AUDIT

  SIGNER --> CUST
  CUST --> CHAINS
  CHAINS --> SETTLER
  SETTLER --> AUDIT

  TR --> TRNET
  TRNET --> TR
  TR --> AUDIT

  GW --> DB
  PRICE --> DB
  RFQ --> DB
  SETTLER --> DB
  EXPORT --> DB
  ERP --> DB

  POLICY --> BUS
  APPROVAL --> BUS
  SIM --> BUS
  BRAKE --> BUS
  AUDIT --> BUS
  BUS --> WH
  EXPORT --> OBJ

  SECRETS --> GW
  SECRETS --> RFQ
  SECRETS --> SETTLER
  SECRETS --> TR
  SECRETS --> EXPORT
```

## Demo Architecture (Vercel + Neon + n8n)

The hosted demo trims the system down to Vercel (Next.js) for the UI/API, Neon for storage, Render-hosted n8n for deterministic webhooks, and an optional browser wallet on an EVM testnet. We keep the same SEAL framing—policy-as-code, dual approvals, simulation, circuit breakers, Travel-Rule receipt stub, and unified audit packs—so the flow mirrors the final target even though the integrations are mocked.

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "fontFamily": "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
    "fontSize": "14px",
    "primaryColor": "#F6F8FB",
    "primaryBorderColor": "#AEB7C2",
    "lineColor": "#64748B",
    "tertiaryColor": "#FFFFFF"
  },
  "flowchart": { "curve": "linear", "htmlLabels": true, "useMaxWidth": true }
}}%%
flowchart LR
  classDef box  fill:#F6F8FB,stroke:#AEB7C2,rx:8,ry:8,color:#0F172A,font-size:12px
  classDef white fill:#FFFFFF,stroke:#CBD5E1,rx:8,ry:8,color:#0F172A,font-size:12px
  classDef seal fill:#E8F0FE,stroke:#A0A6C8,rx:8,ry:8,color:#0F172A,font-size:12px
  classDef ext  fill:#ECFDF5,stroke:#86EFAC,rx:8,ry:8,color:#0F172A,font-size:12px
  classDef ops  fill:#FFF7ED,stroke:#F59E0B,rx:8,ry:8,color:#0F172A,font-size:12px

  %% ===== Client lane (browser) =====
  subgraph CLIENT["Browser (User)"]
    UI["Next.js UI (Vercel)<br/>Pricing · RFQ · Approvals(WebAuthn) · Execute · Audit"]:::box
    WAL["(Optional) Browser wallet (wagmi/viem)<br/>EVM testnet signer"]:::ext
  end
  style CLIENT fill:#F9FAFB,stroke:#CBD5E1,stroke-width:2,stroke-dasharray:6 4

  %% ===== App/API lane =====
  subgraph VERCEL["Vercel — Next.js API routes"]
    API["/pricing/curve · /rfq · /seal/policy-check · /seal/approve<br/>/execute · /settlement/attest · /audit-pack"]:::white
    subgraph SEAL["SEAL v0 — Demo Gates"]
      P["Policy evaluator (JSON)<br/>limits · whitelists · time windows"]:::seal
      A["Two‑person approvals (WebAuthn)<br/>Dealer + CFO"]:::seal
      SIM["Human‑readable simulation<br/>(intent explainer templates)"]:::seal
      L["Immutable log (hash‑chained)<br/>daily root (no on‑chain anchor in demo)"]:::seal
    end
  end
  style VERCEL fill:#FFFFFF,stroke:#94A3B8,stroke-width:2,stroke-dasharray:6 4

  %% ===== Data lane =====
  subgraph NEON["Neon Postgres (Free)"]
    DB["users · webauthn_credentials · policies · quotes · executions · audit_events"]:::ops
  end
  style NEON fill:#FFFBEB,stroke:#F59E0B,stroke-width:2,stroke-dasharray:6 4

  %% ===== External-stub lane =====
  subgraph N8N["Render (Free) — n8n stubs"]
    RFQW["/webhook/rfq → 3 quotes (IDs, validUntil)"]:::ext
    CUST["/webhook/custodian → pseudo txHash"]:::ext
    COMP["/webhook/compliance → Travel‑Rule receipt stub"]:::ext
  end
  style N8N fill:#F0FDF4,stroke:#86EFAC,stroke-width:2,stroke-dasharray:6 4

  %% ===== Flows =====
  UI --> API
  API --> DB
  API --> RFQW
  API --> CUST
  API --> COMP
  API --> P
  API --> A
  API --> SIM
  L --> DB

  %% Demo Mode (browser wallet signer)
  WAL -. "Demo Mode: sign‑intent → sendTransaction (testnet)" .-> API
```

### Component responsibilities

- **Client** – Next.js UI handles auth, passkey prompts, curve/RFQ views, approvals, and audit downloads. Everything dynamic comes from API routes.
- **API routes** – Each handler validates input, runs SEAL logic, and logs an audit event before responding.
- **SEAL core** – Modules for policy parsing, simulation output, WebAuthn verification, circuit breakers, and hash-chain logging.
- **Neon Postgres** – Ground truth for identities, policies, quotes, executions, and audit events.
- **Render / n8n** – Deterministic stubs that mimic banks, custodians, and compliance gateways so the demo can run end-to-end without external credentials.
- **Demo signer** – Optional testnet wallet. In demo mode we only return sign intents and rely on the browser wallet to broadcast.

## Implementation plan (high level)

1. **Pricing** – Seeded FX/IR inputs generate a theoretical curve. Store version + inputs for later.
2. **RFQ** – Call n8n `/webhook/rfq`, persist quotes with expiries, and show countdown timers.
3. **Policy check** – JSON policy defines limits, whitelists, time windows, and quorum. `/seal/policy-check` runs the rules and returns a readable trace.
4. **Approvals** – Dealer + CFO complete WebAuthn flows via `@simplewebauthn/server`; `/seal/approve` stores attestations and sets quorum.
5. **Execute** – Demo mode on: return sign intent → wallet signs/broadcasts → `txHash`. Demo mode off: call `/webhook/custodian` for a synthetic `txHash`/bank ref.
6. **Attest** – `/settlement/attest` ties `txHash`, `bankRef`, and compliance `trId` into `executions` and the audit ledger.
7. **Audit pack** – `/audit-pack` streams a ZIP with the curve snapshot, quotes, approvals, settlement data, TR receipt stub, CSVs, and hash-chain manifest.

## Endpoints (contract)

| Method | Path | Purpose | Input → Output |
| --- | --- | --- | --- |
| GET | `/pricing/curve?pair=` | Theoretical curve snapshot | → `{version, points[], inputs}` |
| POST | `/rfq` | Request quotes via n8n | `{pair, tenorDays, notionalUSD} → {rfqId, quotes[]}` |
| POST | `/seal/policy-check` | Evaluate policy rules | `{quote} → {ok, checks, simulation}` |
| POST | `/seal/approve` | Store a WebAuthn approval | `{actionId, webauthnProof} → {approvedBy, quorum}` |
| POST | `/execute` | Execute after quorum | Demo on: `{signIntent}`; demo off: `{txHash, bankRef?}` |
| POST | `/settlement/attest` | Persist settlement proof | `{execId, txHash, bankRef?, trId?} → OK` |
| GET | `/audit-pack?execId=` | Download artifacts | → ZIP stream |

## Data model (minimal)

- `users` (`id`, `email`, `role`).
- `webauthn_credentials` (`user_id`, `credential_id`, `public_key`, `transports`).
- `policies` (version metadata + JSON blob).
- `quotes` (`rfq_id`, `bank`, `quote_id`, `tenor_days`, `notional_usd`, `fwd`, `valid_until`).
- `executions` (`id`, `quote_id`, `approver_quorum`, `tx_hash`, `bank_ref`, `status`).
- `audit_events` (`seq`, `prev_hash`, `event_type`, `payload`, `event_hash`, `created_at`).

## Environment & deployment

- **Vercel**: `DATABASE_URL` (Neon), `APP_BASE_URL` (WebAuthn origin), `N8N_BASE_URL`, `DEMO_MODE=true`.
- **Neon**: apply the schema (Prisma or SQL), note the connection string.
- **Render / n8n**: deploy three webhooks—`/webhook/rfq`, `/webhook/custodian`, `/webhook/compliance`—with deterministic JSON payloads.

## Security posture

- Server stays keyless; execution either happens in the browser wallet (testnet) or via the custodian stub.
- SEAL evaluates every step (policy, simulation, approvals, circuit breakers) and logs to an append-only hash chain.

