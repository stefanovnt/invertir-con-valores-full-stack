import { bigint, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

/**
 * Leads captured by the site (guide, newsletter, waitlist).
 * One row per (email, source, offer): re-submitting the same form is idempotent.
 * `offer` is "" (not NULL) for non-waitlist sources so the unique index applies.
 */
export const leadsTable = pgTable(
  "leads",
  {
    id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    email: text().notNull(),
    name: text(),
    source: text().notNull(),
    offer: text().notNull().default(""),
    locale: text().notNull(),
    consentAt: timestamp("consent_at", { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("leads_email_source_offer_key").on(t.email, t.source, t.offer)]
);

export type NewLead = typeof leadsTable.$inferInsert;
