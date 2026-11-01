/**
 * Evidence-Based Medical Content Generator & Clinical Citation Engine
 * 
 * Generates objective, peer-reviewed medical educational posts for licensed clinics,
 * hospital departments, and board-certified physicians across preventive cardiology,
 * metabolic health, hypertension, sleep medicine, and oncology screening.
 * 
 * Strict standards: 100% Modern Evidence-Based Medicine only. Mandatory statutory disclaimers.
 * Strictly 0 alternative medicine claims or unverified therapeutic cure assertions.
 * 
 * Remittance: UPI milind.chatrabhuji@okhdfcbank | PayPal milind.chatrabhuji@gmail.com
 */

export type ClinicalTopicCategory = 
  | 'PREVENTIVE_CARDIOLOGY'
  | 'METABOLIC_GLYCEMIC_HEALTH'
  | 'HYPERTENSION_VASCULAR'
  | 'SLEEP_CIRCADIAN_MEDICINE'
  | 'ONCOLOGY_PREVENTIVE_SCREENING'
  | 'DIGITAL_HEALTH_TELEMEDICINE';

export interface MedicalCitation {
  journalTitle: string; // e.g. "Journal of the American College of Cardiology (JACC)"
  publicationYear: number;
  doiOrPmid: string;
  leadAuthor: string;
  guidelineBody?: string; // e.g. "AHA/ACC 2019 Guideline on the Primary Prevention of Cardiovascular Disease"
}

export interface GeneratedMedicalPost {
  postId: string;
  category: ClinicalTopicCategory;
  headlineHook: string;
  clinicalContextBody: string;
  keyActionableTakeaway: string;
  citation: MedicalCitation;
  mandatoryDisclaimer: string;
  suggestedHashtags: string[];
}

export class MedicalContentGenerator {
  public static readonly STATUTORY_DISCLAIMER = 
    "Medical Educational Notice: This post is for informational and educational purposes only and does not constitute individual medical diagnosis, therapeutic treatment, or a physician-patient relationship. Consult your licensed, board-certified physician for personalized clinical advice regarding your medical care.";

  private static readonly EVIDENCE_TOPIC_BANK: GeneratedMedicalPost[] = [
    {
      postId: 'med-cardio-01',
      category: 'PREVENTIVE_CARDIOLOGY',
      headlineHook: 'Why LDL-C Particle Burden Matters More Than Total Cholesterol in ASCVD Risk',
      clinicalContextBody: 
        'In atherosclerotic cardiovascular disease (ASCVD), apolipoprotein B (ApoB) and low-density lipoprotein particle concentration (LDL-P) directly govern atherogenic plaque accumulation in the coronary arterial endothelium. The 2019 AHA/ACC Primary Prevention Guidelines emphasize quantitative 10-year risk estimation, lifestyle optimization, and targeted lipid-lowering therapies when LDL-C remains elevated.',
      keyActionableTakeaway: 'Prioritize baseline fasting lipid profiles with ApoB or LDL particle counts to accurately gauge vascular atherogenic plaque risk.',
      citation: {
        journalTitle: 'Circulation / Journal of the American College of Cardiology',
        publicationYear: 2019,
        doiOrPmid: '10.1161/CIR.0000000000000678',
        leadAuthor: 'Arnett DK et al.',
        guidelineBody: '2019 ACC/AHA Guideline on the Primary Prevention of Cardiovascular Disease'
      },
      mandatoryDisclaimer: MedicalContentGenerator.STATUTORY_DISCLAIMER,
      suggestedHashtags: ['#Cardiology', '#ASCVD', '#PreventiveMedicine', '#EvidenceBasedMedicine', '#HeartHealth']
    },
    {
      postId: 'med-metabolic-02',
      category: 'METABOLIC_GLYCEMIC_HEALTH',
      headlineHook: 'Understanding HbA1c vs. Time-in-Range (TIR) in Continuous Glycemic Evaluation',
      clinicalContextBody: 
        'While glycated hemoglobin (HbA1c) represents the gold-standard 90-day mean glucose exposure, continuous glucose monitoring (CGM) metrics—particularly Time-in-Range (TIR, 70-180 mg/dL)—reveal glycemic variability and asymptomatic nocturnal hypoglycemia. The American Diabetes Association (ADA) 2024 Standards of Care benchmark a target TIR >70% for non-pregnant adults with diabetes.',
      keyActionableTakeaway: 'Evaluating Time-in-Range alongside quarterly HbA1c provides a comprehensive view of glycemic stability without acute hypoglycemia episodes.',
      citation: {
        journalTitle: 'Diabetes Care',
        publicationYear: 2024,
        doiOrPmid: '10.2337/dc24-S006',
        leadAuthor: 'ElSayed NA et al.',
        guidelineBody: 'ADA Standards of Care in Diabetes—2024 (Glycemic Targets)'
      },
      mandatoryDisclaimer: MedicalContentGenerator.STATUTORY_DISCLAIMER,
      suggestedHashtags: ['#Endocrinology', '#DiabetesCare', '#TimeInRange', '#ContinuousGlucoseMonitoring', '#ClinicalResearch']
    },
    {
      postId: 'med-vascular-03',
      category: 'HYPERTENSION_VASCULAR',
      headlineHook: 'Automated Office Blood Pressure (AOBP) Eliminates White-Coat Hypertensive Artefacts',
      clinicalContextBody: 
        'Standard manual sphygmomanometer readings frequently exhibit significant white-coat elevation due to sympathetic activation in clinical settings. Automated Office Blood Pressure (AOBP) protocols—taking 3 to 5 automated oscillometric readings in a quiet, isolated room—correlate far more strongly with ambulatory 24-hour daytime monitoring and long-term end-organ renal and vascular outcomes.',
      keyActionableTakeaway: 'Adopt standardized, seated AOBP measurement protocols with appropriate cuff sizing to guide pharmacological anti-hypertensive titration.',
      citation: {
        journalTitle: 'The New England Journal of Medicine (NEJM)',
        publicationYear: 2015,
        doiOrPmid: '10.1056/NEJMoa1511939',
        leadAuthor: 'SPRINT Research Group',
        guidelineBody: 'Systolic Blood Pressure Intervention Trial (SPRINT)'
      },
      mandatoryDisclaimer: MedicalContentGenerator.STATUTORY_DISCLAIMER,
      suggestedHashtags: ['#Hypertension', '#CardiovascularHealth', '#InternalMedicine', '#ClinicalGuidelines', '#SPRINTtrial']
    },
    {
      postId: 'med-sleep-04',
      category: 'SLEEP_CIRCADIAN_MEDICINE',
      headlineHook: 'Obstructive Sleep Apnea (OSA) as an Independent Driver of Drug-Resistant Hypertension',
      clinicalContextBody: 
        'Recurrent upper airway collapse during sleep triggers intermittent systemic hypoxia, oxidative stress, and persistent nighttime sympathetic surge. Clinical trials cataloged by the American Academy of Sleep Medicine (AASM) demonstrate that untreated moderate-to-severe OSA (Apnea-Hypopnea Index >= 15) strongly impairs nocturnal blood pressure dipping and accelerates systemic arterial stiffness.',
      keyActionableTakeaway: 'Screen patients with refractory hypertension using validated tools like the STOP-Bang questionnaire and home sleep apnea testing (HSAT).',
      citation: {
        journalTitle: 'Journal of Clinical Sleep Medicine (JCSM)',
        publicationYear: 2021,
        doiOrPmid: '10.5664/jcsm.9538',
        leadAuthor: 'Patil SP et al.',
        guidelineBody: 'AASM Clinical Practice Guideline for Diagnostic Testing for Adult OSA'
      },
      mandatoryDisclaimer: MedicalContentGenerator.STATUTORY_DISCLAIMER,
      suggestedHashtags: ['#SleepMedicine', '#SleepApnea', '#OSA', '#Hypertension', '#AASM']
    },
    {
      postId: 'med-oncology-05',
      category: 'ONCOLOGY_PREVENTIVE_SCREENING',
      headlineHook: 'USPSTF Evidence Guidelines for Colorectal Cancer Screening Starting at Age 45',
      clinicalContextBody: 
        'Epidemiological data shows an increasing incidence of early-onset colorectal carcinoma in adults under age 50. The United States Preventive Services Task Force (USPSTF) Grade A/B recommendations affirm that screening starting at age 45 substantially reduces disease-specific mortality through early adenomatous polyp detection and polypectomy.',
      keyActionableTakeaway: 'Ensure patients aged 45 to 75 are counseled regarding screening modalities including colonoscopy every 10 years or annual high-sensitivity fecal immunochemical tests (FIT).',
      citation: {
        journalTitle: 'JAMA: The Journal of the American Medical Association',
        publicationYear: 2021,
        doiOrPmid: '10.1001/jama.2021.6238',
        leadAuthor: 'Davidson KW et al. (USPSTF)',
        guidelineBody: 'USPSTF Recommendation Statement: Screening for Colorectal Cancer'
      },
      mandatoryDisclaimer: MedicalContentGenerator.STATUTORY_DISCLAIMER,
      suggestedHashtags: ['#Oncology', '#PreventiveCare', '#USPSTF', '#CancerScreening', '#PublicHealth']
    }
  ];

  /**
   * Generates or retrieves evidence-based medical content items.
   */
  public getClinicalPosts(category?: ClinicalTopicCategory): GeneratedMedicalPost[] {
    if (category) {
      return MedicalContentGenerator.EVIDENCE_TOPIC_BANK.filter(p => p.category === category);
    }
    return MedicalContentGenerator.EVIDENCE_TOPIC_BANK;
  }
}
