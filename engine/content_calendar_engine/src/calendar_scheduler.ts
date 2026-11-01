/**
 * Multi-Platform Clinical Social Media Calendar Scheduler
 * 
 * Formats clinical educational content for LinkedIn, Instagram/Threads, X/Twitter,
 * Facebook, and YouTube Community with platform character limits, optimal posting times,
 * and structured hook/body/citation/disclaimer/CTA templates.
 * 
 * Strict RFC 2606 testing domains: clinic.example.com, social.example.com.
 * Remittance: UPI milind.chatrabhuji@okhdfcbank | PayPal milind.chatrabhuji@gmail.com
 */

import { GeneratedMedicalPost } from './medical_content_generator.js';

export type SocialPlatform = 'LINKEDIN' | 'INSTAGRAM' | 'TWITTER_X' | 'FACEBOOK' | 'YOUTUBE_COMMUNITY';

export interface FormattedPlatformPost {
  platform: SocialPlatform;
  characterCount: number;
  maxCharacterLimit: number;
  optimalPostingTimeIso: string;
  formattedText: string;
  hasMandatoryDisclaimer: boolean;
  hasPeerReviewedCitation: boolean;
  callToAction: string;
}

export interface ScheduledCalendarDay {
  dayNumber: number; // 1 to 30 or 90
  scheduledDate: string; // YYYY-MM-DD
  themeCategory: string;
  primaryPost: GeneratedMedicalPost;
  platformVariants: Record<SocialPlatform, FormattedPlatformPost>;
}

export class CalendarScheduler {
  private static readonly PLATFORM_LIMITS: Record<SocialPlatform, number> = {
    'LINKEDIN': 3000,
    'INSTAGRAM': 2200,
    'TWITTER_X': 280,
    'FACEBOOK': 5000,
    'YOUTUBE_COMMUNITY': 10000
  };

  /**
   * Formats a raw medical post for a specific platform.
   */
  public formatForPlatform(post: GeneratedMedicalPost, platform: SocialPlatform, targetDate: string, clinicDomain: string = 'clinic.example.com'): FormattedPlatformPost {
    const limit = CalendarScheduler.PLATFORM_LIMITS[platform];
    let formattedText = '';
    const cta = `Learn more about our clinical services at https://${clinicDomain}/appointments`;

    if (platform === 'TWITTER_X') {
      // Micro-concise format fitting 280 characters
      const hookShort = post.headlineHook.substring(0, 75);
      const takeawayShort = post.keyActionableTakeaway.substring(0, 110);
      formattedText = `[Clinical Insight] ${hookShort}\n\nEvidence: ${takeawayShort}\n\nCitation: ${post.citation.leadAuthor} (${post.citation.publicationYear})\n\n*Educational only. Consult doctor.`;
      if (formattedText.length > limit) {
        formattedText = formattedText.substring(0, limit - 3) + '...';
      }
    } else if (platform === 'LINKEDIN') {
      // Long-form authoritative professional format
      formattedText = `🩺 ${post.headlineHook.toUpperCase()}

${post.clinicalContextBody}

📌 Key Clinical Takeaway for Practitioners & Patients:
${post.keyActionableTakeaway}

📚 Peer-Reviewed Evidence & Guideline Reference:
- Guideline / Study: ${post.citation.guidelineBody || post.citation.journalTitle}
- Author(s): ${post.citation.leadAuthor} et al. (${post.citation.publicationYear})
- DOI / Reference: ${post.citation.doiOrPmid}

🔗 ${cta}

${post.suggestedHashtags.join(' ')}

---
⚖️ ${post.mandatoryDisclaimer}`;
    } else if (platform === 'INSTAGRAM') {
      // Visual carousel caption format
      formattedText = `📊 ${post.headlineHook} (Slide 1/5)

👉 Swipe through for evidence-based clinical breakdowns from peer-reviewed literature.

${post.clinicalContextBody}

💡 What you should discuss with your doctor:
${post.keyActionableTakeaway}

📖 Source: ${post.citation.journalTitle} (${post.citation.publicationYear}) | Lead Author: ${post.citation.leadAuthor} et al.

📍 Follow our clinic for board-certified health education. ${cta}

.
.
${post.suggestedHashtags.join(' ')}

---
⚠️ ${post.mandatoryDisclaimer}`;
    } else {
      // Facebook & YouTube Community standard educational format
      formattedText = `🏥 CLINICAL UPDATE: ${post.headlineHook}

${post.clinicalContextBody}

Key Takeaway: ${post.keyActionableTakeaway}

Citation: ${post.citation.journalTitle} (${post.citation.publicationYear})
Reference: ${post.citation.doiOrPmid}

Schedule a consultation with our clinical team: ${cta}

---
${post.mandatoryDisclaimer}`;
    }

    const optimalTime = `${targetDate}T09:30:00Z`;

    return {
      platform,
      characterCount: formattedText.length,
      maxCharacterLimit: limit,
      optimalPostingTimeIso: optimalTime,
      formattedText,
      hasMandatoryDisclaimer: formattedText.includes('Educational only') || formattedText.includes('Educational Notice'),
      hasPeerReviewedCitation: formattedText.includes(post.citation.leadAuthor),
      callToAction: cta
    };
  }

  /**
   * Generates a complete 30-day multi-platform social calendar.
   */
  public generate30DayCalendar(posts: GeneratedMedicalPost[], startDateIso: string = '2026-11-01'): ScheduledCalendarDay[] {
    const calendar: ScheduledCalendarDay[] = [];
    const platforms: SocialPlatform[] = ['LINKEDIN', 'INSTAGRAM', 'TWITTER_X', 'FACEBOOK', 'YOUTUBE_COMMUNITY'];

    const start = new Date(startDateIso);

    for (let day = 1; day <= 30; day++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + (day - 1));
      const dateStr = currentDate.toISOString().split('T')[0];

      // Rotate through posts bank
      const post = posts[(day - 1) % posts.length];

      const platformVariants: Record<string, FormattedPlatformPost> = {};
      platforms.forEach(p => {
        platformVariants[p] = this.formatForPlatform(post, p, dateStr);
      });

      calendar.push({
        dayNumber: day,
        scheduledDate: dateStr,
        themeCategory: post.category,
        primaryPost: post,
        platformVariants: platformVariants as Record<SocialPlatform, FormattedPlatformPost>
      });
    }

    return calendar;
  }
}
