# Production Deployment Manual: Clinic Social Media Management Suite
**Way #51 (Product 53)** | **Author:** Dr. Milind Chatrabhuji  
**Remittance Handles:** Domestic UPI `milind.chatrabhuji@okhdfcbank` | International PayPal `milind.chatrabhuji@gmail.com`

---

## 1. Prerequisites
- Node.js 20+ LTS
- TypeScript 5.3+
- Wrangler CLI (`npm install -g wrangler`)
- Cloudflare Account (Workers & D1 enabled)

---

## 2. Directory Structure Overview
```
way51_social_media_clinic_suite/
├── assets/
│   └── clinic_social_hero.svg
├── engine/
│   ├── content_calendar_engine/     (Pack 1: Core Medical Content & Compliance Guardian)
│   └── edge_social_gateway/         (Pack 2: Edge Webhook & Engagement Analytics Gateway)
├── monetization_social_kit/         (Pack 3: Retainers, Clinic Agreements & Invoicing)
├── releases/                        (8 CRC-verified release archives)
├── showcase/                        (Interactive 4-screen simulator application)
│   └── index.html
├── CATALOG.md
├── CLIENT_DELIVERY_WORKFLOW.md
├── DEPLOYMENT_MANUAL.md
├── LICENSE
└── README.md
```

---

## 3. Local Build & Test

### Pack 1: Content Calendar Engine
```bash
cd engine/content_calendar_engine
npm install
npm run build
```

### Pack 2: Edge Social Gateway
```bash
cd ../edge_social_gateway
npm install
npm run build
npx wrangler dev
```

### Pack 3: Monetization Kit
```bash
cd ../../monetization_social_kit
npm install
npm run build
```

---

## 4. Production Cloudflare Edge Deployment
Deploy the edge publishing gateway:
```bash
cd engine/edge_social_gateway
npx wrangler deploy
```

Verify edge endpoints:
- `GET https://clinic-social-edge-gateway.<your-subdomain>.workers.dev/health`
- `GET https://clinic-social-edge-gateway.<your-subdomain>.workers.dev/api/retainers`
- `POST https://clinic-social-edge-gateway.<your-subdomain>.workers.dev/api/reports/analytics`

---

## 5. Commercial Pricing & Remittance
- **Pack 1 Standalone**: $9.00 USD (~₹750 INR)
- **Master Suite**: $19.00 USD (~₹1,599 INR)
- **Retainer Tiers**: $500 Starter / $1,500 Growth / $3,000 Enterprise per month
- **UPI**: `milind.chatrabhuji@okhdfcbank`
- **PayPal**: `milind.chatrabhuji@gmail.com`
