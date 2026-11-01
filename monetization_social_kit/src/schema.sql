-- Cloudflare D1 SQL Schema: Production Clinic Social Media Management Suite
-- Engineered by Dr. Milind Chatrabhuji
-- Remittance: UPI milind.chatrabhuji@okhdfcbank | PayPal milind.chatrabhuji@gmail.com

CREATE TABLE IF NOT EXISTS clinics (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  domain TEXT NOT NULL,
  specialty TEXT NOT NULL,
  booking_url TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS calendar_posts (
  id TEXT PRIMARY KEY,
  clinic_id TEXT NOT NULL,
  scheduled_date TEXT NOT NULL,
  category TEXT NOT NULL,
  headline_hook TEXT NOT NULL,
  clinical_context TEXT NOT NULL,
  citation_title TEXT,
  citation_author TEXT,
  citation_year INTEGER,
  citation_doi TEXT,
  has_disclaimer INTEGER DEFAULT 1,
  approval_status TEXT CHECK(approval_status IN ('DRAFT', 'APPROVED', 'PUBLISHED', 'ARCHIVED')) DEFAULT 'DRAFT',
  created_at TEXT NOT NULL,
  FOREIGN KEY (clinic_id) REFERENCES clinics(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS channels (
  id TEXT PRIMARY KEY,
  clinic_id TEXT NOT NULL,
  platform TEXT CHECK(platform IN ('LINKEDIN', 'INSTAGRAM', 'TWITTER_X', 'FACEBOOK', 'YOUTUBE_COMMUNITY')) NOT NULL,
  webhook_url TEXT,
  account_handle TEXT,
  is_active INTEGER DEFAULT 1,
  FOREIGN KEY (clinic_id) REFERENCES clinics(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS compliance_audits (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  compliance_score INTEGER DEFAULT 100,
  is_hipaa_safe INTEGER DEFAULT 1,
  has_cure_claims INTEGER DEFAULT 0,
  has_disclaimer INTEGER DEFAULT 1,
  scanned_at TEXT NOT NULL,
  FOREIGN KEY (post_id) REFERENCES calendar_posts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS scheduled_queues (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  channel_id TEXT NOT NULL,
  scheduled_for TEXT NOT NULL,
  dispatch_status TEXT CHECK(dispatch_status IN ('PENDING', 'SENT', 'FAILED', 'RETRY')) DEFAULT 'PENDING',
  http_response_code INTEGER,
  dispatched_at TEXT,
  FOREIGN KEY (post_id) REFERENCES calendar_posts(id) ON DELETE CASCADE,
  FOREIGN KEY (channel_id) REFERENCES channels(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS engagement_metrics (
  id TEXT PRIMARY KEY,
  clinic_id TEXT NOT NULL,
  reporting_month TEXT NOT NULL,
  impressions INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,
  engagements INTEGER DEFAULT 0,
  booking_clicks INTEGER DEFAULT 0,
  attributed_appointments INTEGER DEFAULT 0,
  recorded_at TEXT NOT NULL,
  FOREIGN KEY (clinic_id) REFERENCES clinics(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS retainer_subscriptions (
  id TEXT PRIMARY KEY,
  clinic_id TEXT NOT NULL,
  tier_name TEXT CHECK(tier_name IN ('starter', 'growth', 'enterprise')) NOT NULL,
  monthly_price_usd REAL NOT NULL,
  monthly_price_inr REAL NOT NULL,
  status TEXT CHECK(status IN ('ACTIVE', 'PAUSED', 'CANCELLED')) DEFAULT 'ACTIVE',
  started_at TEXT NOT NULL,
  next_billing_date TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS invoices (
  id TEXT PRIMARY KEY,
  subscription_id TEXT,
  invoice_number TEXT UNIQUE NOT NULL,
  clinic_name TEXT NOT NULL,
  total_usd REAL NOT NULL,
  total_inr REAL NOT NULL,
  currency TEXT CHECK(currency IN ('USD', 'INR')) NOT NULL,
  status TEXT CHECK(status IN ('ISSUED', 'PAID', 'OVERDUE')) DEFAULT 'ISSUED',
  issued_at TEXT NOT NULL,
  due_at TEXT NOT NULL
);

-- Fast Edge Composite Indices for Sub-5ms Queries
CREATE INDEX IF NOT EXISTS idx_post_clinic_date ON calendar_posts(clinic_id, scheduled_date);
CREATE INDEX IF NOT EXISTS idx_queue_scheduled ON scheduled_queues(scheduled_for, dispatch_status);
CREATE INDEX IF NOT EXISTS idx_metrics_clinic_month ON engagement_metrics(clinic_id, reporting_month);
