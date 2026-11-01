/**
 * Content Calendar Engine - Master Module Export
 * 
 * Part of Production Clinic Social Media Management Suite (Way #51 / Product 53)
 * Remittance: UPI milind.chatrabhuji@okhdfcbank | PayPal milind.chatrabhuji@gmail.com
 */

export * from './medical_content_generator.js';
export * from './calendar_scheduler.js';
export * from './compliance_guardian.js';

import { MedicalContentGenerator } from './medical_content_generator.js';
import { CalendarScheduler } from './calendar_scheduler.js';
import { ComplianceGuardian } from './compliance_guardian.js';

export function runDemonstrationPipeline() {
  const generator = new MedicalContentGenerator();
  const scheduler = new CalendarScheduler();
  const guardian = new ComplianceGuardian();

  const posts = generator.getClinicalPosts();
  const calendar30Days = scheduler.generate30DayCalendar(posts, '2026-11-01');

  // Verify compliance on first day's LinkedIn variant
  const sampleText = calendar30Days[0].platformVariants['LINKEDIN'].formattedText;
  const auditReport = guardian.scanPost(sampleText);

  return {
    totalPostsInBank: posts.length,
    calendarDaysGenerated: calendar30Days.length,
    sampleAudit: auditReport
  };
}
