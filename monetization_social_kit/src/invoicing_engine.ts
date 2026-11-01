/**
 * Dual-Currency Clinic Social Management Invoicing Engine
 * 
 * Computes monthly clinical retainers and software suite licenses in USD and INR.
 * Handles GST export LUT zero-rated exemptions for international cross-border sales
 * and domestic Indian GST (18% IGST / 9% CGST + 9% SGST).
 * 
 * Remittance: UPI milind.chatrabhuji@okhdfcbank | PayPal milind.chatrabhuji@gmail.com
 */

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPriceUsd: number;
  unitPriceInr: number;
}

export interface ClientBillingProfile {
  clientName: string;
  companyName: string;
  billingEmail: string;
  country: string;
  stateOrRegion?: string;
  isInternational: boolean;
  gstinOrVat?: string;
}

export interface InvoiceCalculationResult {
  invoiceNumber: string;
  generatedDate: string;
  dueDate: string;
  client: ClientBillingProfile;
  lineItems: InvoiceLineItem[];
  subtotalUsd: number;
  subtotalInr: number;
  taxRatePercentage: number;
  taxAmountUsd: number;
  taxAmountInr: number;
  totalUsd: number;
  totalInr: number;
  currency: 'USD' | 'INR';
  isLutExportZeroRated: boolean;
  remittance: {
    upiHandle: string;
    paypalHandle: string;
  };
}

export class InvoicingEngine {
  private defaultUpi = 'milind.chatrabhuji@okhdfcbank';
  private defaultPaypal = 'milind.chatrabhuji@gmail.com';

  /**
   * Generates a fully calculated invoice for clinic social media retainers or software licenses.
   */
  public generateInvoice(
    client: ClientBillingProfile,
    lineItems: InvoiceLineItem[],
    preferredCurrency?: 'USD' | 'INR'
  ): InvoiceCalculationResult {
    let subtotalUsd = 0;
    let subtotalInr = 0;

    lineItems.forEach(item => {
      subtotalUsd += item.unitPriceUsd * item.quantity;
      subtotalInr += item.unitPriceInr * item.quantity;
    });

    const isInternational = client.isInternational || client.country.toUpperCase() !== 'INDIA';
    const currency = preferredCurrency || (isInternational ? 'USD' : 'INR');

    let taxRatePercentage = 0;
    let isLutExportZeroRated = false;

    if (isInternational) {
      taxRatePercentage = 0;
      isLutExportZeroRated = true;
    } else {
      taxRatePercentage = 18.0;
      isLutExportZeroRated = false;
    }

    const taxAmountUsd = Number(((subtotalUsd * taxRatePercentage) / 100).toFixed(2));
    const taxAmountInr = Number(((subtotalInr * taxRatePercentage) / 100).toFixed(2));

    const totalUsd = Number((subtotalUsd + taxAmountUsd).toFixed(2));
    const totalInr = Number((subtotalInr + taxAmountInr).toFixed(2));

    const today = new Date();
    const due = new Date();
    due.setDate(today.getDate() + 15); // Net-15 terms

    return {
      invoiceNumber: `INV-SOC-${today.getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
      generatedDate: today.toISOString().split('T')[0],
      dueDate: due.toISOString().split('T')[0],
      client,
      lineItems,
      subtotalUsd,
      subtotalInr,
      taxRatePercentage,
      taxAmountUsd,
      taxAmountInr,
      totalUsd,
      totalInr,
      currency,
      isLutExportZeroRated,
      remittance: {
        upiHandle: this.defaultUpi,
        paypalHandle: this.defaultPaypal
      }
    };
  }

  /**
   * Generates invoice for a standard monthly clinic retainer tier.
   */
  public createRetainerInvoice(
    client: ClientBillingProfile,
    tier: 'starter' | 'growth' | 'enterprise'
  ): InvoiceCalculationResult {
    let description = '';
    let usd = 0;
    let inr = 0;

    switch (tier) {
      case 'starter':
        description = 'Starter Practice Presence Retainer (Monthly) - 12 Posts + LinkedIn & IG + 48h Review SLA';
        usd = 500;
        inr = 41500;
        break;
      case 'growth':
        description = 'Growth Patient Acquisition Retainer (Monthly) - 30 Posts + 4 Channels + PubMed Citations + 24h SLA';
        usd = 1500;
        inr = 124500;
        break;
      case 'enterprise':
        description = 'Enterprise Multi-Specialty Clinic Retainer (Monthly) - 60+ Posts + 5 Channels + Dedicated Lead + 12h SLA';
        usd = 3000;
        inr = 249000;
        break;
    }

    return this.generateInvoice(client, [{ description, quantity: 1, unitPriceUsd: usd, unitPriceInr: inr }]);
  }

  /**
   * Generates invoice for the software suite package ($9 Single or $19 Master Suite).
   */
  public createSoftwarePackageInvoice(
    client: ClientBillingProfile,
    isMasterSuite: boolean = true
  ): InvoiceCalculationResult {
    const usd = isMasterSuite ? 19 : 9;
    const inr = isMasterSuite ? 1599 : 750;
    const description = isMasterSuite
      ? 'Production Clinic Social Media Management Master Suite (Packs 1, 2, 3 + Showcase + Commercial License)'
      : 'Production Medical Content Calendar Engine (Pack 1 Standalone)';

    return this.generateInvoice(client, [{ description, quantity: 1, unitPriceUsd: usd, unitPriceInr: inr }]);
  }

  /**
   * Formats invoice as clean, printable Markdown.
   */
  public formatInvoiceMarkdown(invoice: InvoiceCalculationResult): string {
    return `# COMMERCIAL INVOICE: CLINICAL SOCIAL MEDIA MANAGEMENT
**Invoice Number:** ${invoice.invoiceNumber}  
**Date of Issue:** ${invoice.generatedDate}  
**Payment Due Date:** ${invoice.dueDate} (Net-15)  

---

### BILL TO:
**Client:** ${invoice.client.companyName} (${invoice.client.clientName})  
**Email:** ${invoice.client.billingEmail}  
**Location:** ${invoice.client.country}  
${invoice.isLutExportZeroRated ? '**Tax Treatment:** Zero-Rated Export of Healthcare IT & Marketing Services under GST Letter of Undertaking (LUT)' : `**GST Rate:** ${invoice.taxRatePercentage}%`}

---

### LINE ITEMS:
| Description | Qty | Unit USD | Unit INR | Total USD | Total INR |
| :--- | :--- | :--- | :--- | :--- | :--- |
${invoice.lineItems.map(i => `| ${i.description} | ${i.quantity} | $${i.unitPriceUsd} | ₹${i.unitPriceInr.toLocaleString('en-IN')} | $${i.unitPriceUsd * i.quantity} | ₹${(i.unitPriceInr * i.quantity).toLocaleString('en-IN')} |`).join('\n')}

---

### TOTALS:
- **Subtotal:** $${invoice.subtotalUsd} USD / ₹${invoice.subtotalInr.toLocaleString('en-IN')} INR
- **Taxes (${invoice.taxRatePercentage}%):** $${invoice.taxAmountUsd} USD / ₹${invoice.taxAmountInr.toLocaleString('en-IN')} INR
- **TOTAL PAYABLE:** **$${invoice.totalUsd} USD** / **₹${invoice.totalInr.toLocaleString('en-IN')} INR**

---

### PAYMENT REMITTANCE INSTRUCTIONS:
- **Domestic Direct UPI (India):** \`${invoice.remittance.upiHandle}\`
- **International Direct PayPal:** \`${invoice.remittance.paypalHandle}\`
- *Please reference Invoice Number \`${invoice.invoiceNumber}\` upon remittance.*
`;
  }
}
