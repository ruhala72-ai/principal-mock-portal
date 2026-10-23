import { Question, ExamConfig, ExamType } from '../types/quiz';
import { UPSC_PRINCIPAL_QUESTIONS } from './upscPrincipalBank';
import { UP_INTER_COLLEGE_QUESTIONS } from './upInterCollegeBank';

export const EXAM_CONFIGS: Record<ExamType, ExamConfig> = {
  'upsc-principal': {
    examType: 'upsc-principal',
    titleEn: 'UPSC Principal & Vice Principal (CRT)',
    titleHi: 'संघ लोक सेवा आयोग प्राचार्य एवं उप-प्राचार्य (CRT)',
    subtitleEn: 'UPSC Combined Recruitment Test: 8 Prescribed Syllabus Areas (120 Questions • 300 Marks)',
    subtitleHi: 'यूपीएससी संयुक्त भर्ती परीक्षा: 8 निर्धारित पाठ्यक्रम क्षेत्र (120 प्रश्न • 300 अंक)',
    durationMinutes: 120,
    totalMarksPerQuestion: 2.5,
    negativeMarksPerQuestion: 2.5 / 3, // Exact fraction: -0.8333333333333334
    configuredQuestionCount: 120,
    allowedTestLengths: [120, 130, 140, 150],
    officialDoc: {
      recruitingAuthority: 'Union Public Service Commission (UPSC)',
      exactPostName: 'Principal / Vice Principal (Directorate of Education, GNCTD / Central Schools)',
      advertisementNumber: 'UPSC Advt. No. 07/2022 (Combined Recruitment Test - CRT)',
      advertisementDate: '23-04-2022',
      officialSourceUrl: 'https://upsc.gov.in/recruitment/recruitment-advertisement',
      verificationStatus: 'Verified',
      lastCheckedDate: '2026-10-20',
      verifiedBy: 'Official UPSC CRT Syllabus and Scheme Notification',
      notes: 'Official Scheme: 2 Hours Duration, 300 Maximum Marks, Equal Marks per Question, Objective MCQs, Bilingual English & Hindi, Deduction of one-third mark assigned to the question for wrong answers. Covers all 8 prescribed syllabus areas.'
    },
    topics: [
      { id: 'upsc-area-1', nameEn: 'General Knowledge', nameHi: 'सामान्य ज्ञान (समकालीन मुद्दे, समसामयिकी व सामान्य जागरूकता)', weightagePractice: 12.5, isVerified: true },
      { id: 'upsc-area-2', nameEn: 'General Hindi', nameHi: 'सामान्य हिन्दी (व्याकरण, शब्दावली, वाक्य-शुद्धि व अपठित गद्यांश)', weightagePractice: 12.5, isVerified: true },
      { id: 'upsc-area-3', nameEn: 'General English', nameHi: 'सामान्य अंग्रेजी (Grammar, Vocabulary, Sentence Correction, Comprehension)', weightagePractice: 12.5, isVerified: true },
      { id: 'upsc-area-4', nameEn: 'Reasoning Ability and Quantitative Aptitude', nameHi: 'तार्किक क्षमता एवं संख्यात्मक अभिरुचि (Logical Reasoning, Quantitative Aptitude & DI)', weightagePractice: 12.5, isVerified: true },
      { id: 'upsc-area-5', nameEn: 'Educational Policies, Educational Measurement and Evaluation', nameHi: 'शैक्षिक नीतियां, शैक्षिक मापन एवं मूल्यांकन (NEP 2020, RTE, Assessment)', weightagePractice: 12.5, isVerified: true },
      { id: 'upsc-area-6', nameEn: 'Management and Financial Administration', nameHi: 'प्रबंधन एवं वित्तीय प्रशासन (CCS Rules, GFR 2017, GeM, Budgeting)', weightagePractice: 12.5, isVerified: true },
      { id: 'upsc-area-7', nameEn: 'Office Procedure', nameHi: 'कार्यालय प्रक्रिया (CSMOP, Noting & Drafting, Records, Official Procedures)', weightagePractice: 12.5, isVerified: true },
      { id: 'upsc-area-8', nameEn: 'Pedagogy in Education and Digital Literacy', nameHi: 'शिक्षा शास्त्र एवं डिजिटल साक्षरता (Pedagogy, Psychology, ICT, Cyber Safety)', weightagePractice: 12.5, isVerified: true },
    ]
  },
  'up-aided-principal': {
    examType: 'up-aided-principal',
    titleEn: 'UP Inter College Principal Written Exam',
    titleHi: 'उ.प्र. अशासकीय सहायता प्राप्त इंटर कॉलेज प्रधानाचार्य लिखित परीक्षा',
    subtitleEn: 'Prescribed 30 + 30 + 60 Section Distribution across 12 Units (120 Questions • 300 Marks)',
    subtitleHi: 'निर्धारित 30 + 30 + 60 खंडीय संरचना: 12 इकाइयां (120 प्रश्न • 300 अंक)',
    durationMinutes: 120,
    totalMarksPerQuestion: 2.5,
    negativeMarksPerQuestion: 2.5 / 3, // Exact fraction: -0.8333333333333334
    configuredQuestionCount: 120,
    allowedTestLengths: [120, 130, 140, 150],
    officialDoc: {
      recruitingAuthority: 'UPSESSB / UP Education Service Selection Commission (Prayagraj)',
      exactPostName: 'Principal (Aided Secondary Inter College) / अशासकीय सहायता प्राप्त इंटर कॉलेज प्रधानाचार्य',
      advertisementNumber: 'UPSESSB Principal Examination Scheme & Prescribed 12 Units',
      advertisementDate: '2026-10-15',
      officialSourceUrl: 'https://upsessb.org/',
      verificationStatus: 'Verified',
      lastCheckedDate: '2026-10-20',
      verifiedBy: 'Uttar Pradesh Education Service Selection Commission & Intermediate Education Act 1921',
      notes: 'Prescribed Written Test: 120 questions divided strictly into Section I (30 Qs - General Studies, History, Polity, Geography, Science, ICT), Section II (30 Qs - General Hindi 15 + General English 15), and Section III (60 Qs - Educational Leadership, UP Acts, Finance & Schemes).'
    },
    topics: [
      { id: 'up-unit-1', nameEn: 'Unit 1: Current Affairs & Sports', nameHi: 'इकाई 1: समसामयिक घटनाएं, राष्ट्रीय व अंतरराष्ट्रीय परिदृश्य व खेलकूद', weightagePractice: 8.33, isVerified: true },
      { id: 'up-unit-2', nameEn: 'Unit 2: Indian History, Polity, Economy & Geography', nameHi: 'इकाई 2: भारतीय इतिहास, स्वतंत्रता आंदोलन, संविधान, भूगोल व जनसंख्या', weightagePractice: 8.33, isVerified: true },
      { id: 'up-unit-3', nameEn: 'Unit 3: General Science, Environment, Health & ICT', nameHi: 'इकाई 3: सामान्य विज्ञान, पर्यावरण, मानव स्वास्थ्य व शैक्षिक तकनीकी', weightagePractice: 8.33, isVerified: true },
      { id: 'up-unit-4', nameEn: 'Unit 4: General Hindi (सामान्य हिन्दी)', nameHi: 'इकाई 4: सामान्य हिन्दी (व्याकरण, शब्द रचना व पत्र लेखन)', weightagePractice: 12.5, isVerified: true },
      { id: 'up-unit-5', nameEn: 'Unit 5: General English', nameHi: 'इकाई 5: सामान्य अंग्रेजी (व्याकरण, शब्दावली व रूपांतरण)', weightagePractice: 12.5, isVerified: true },
      { id: 'up-unit-6', nameEn: 'Unit 6: Development of Education & Thinkers', nameHi: 'इकाई 6: भारत में शिक्षा का विकास, शैक्षिक विचारक व एनईपी', weightagePractice: 8.33, isVerified: true },
      { id: 'up-unit-7', nameEn: 'Unit 7: UP Intermediate Education Act 1921', nameHi: 'इकाई 7: उप्र इंटरमीडिएट शिक्षा अधिनियम 1921 व परिषद', weightagePractice: 6.67, isVerified: true },
      { id: 'up-unit-8', nameEn: 'Unit 8: Role of Principal & Leadership', nameHi: 'इकाई 8: प्रधानाचार्य की भूमिका, नेतृत्व व संसाधन प्रबंधन', weightagePractice: 5.0, isVerified: true },
      { id: 'up-unit-9', nameEn: 'Unit 9: Educational Administration & Quality', nameHi: 'इकाई 9: शैक्षिक प्रशासन, समय सारणी, क्लब व गुणवत्ता', weightagePractice: 5.0, isVerified: true },
      { id: 'up-unit-10', nameEn: 'Unit 10: Office Administration, Records & RTI', nameHi: 'इकाई 10: कार्यालय प्रशासन, अभिलेख, आरटीआई व अल्पसंख्यक अधिकार', weightagePractice: 6.67, isVerified: true },
      { id: 'up-unit-11', nameEn: 'Unit 11: Financial Administration & Salaries Act', nameHi: 'इकाई 11: वित्तीय प्रशासन, बजट, वेतन अधिनियम 1971 व जेम', weightagePractice: 6.67, isVerified: true },
      { id: 'up-unit-12', nameEn: 'Unit 12: Flagship Education Schemes (Alankar, Kayakalp, etc.)', nameHi: 'इकाई 12: प्रमुख शैक्षिक योजनाएं (अलंकार, कायाकल्प, पीएम पोषण आदि)', weightagePractice: 11.67, isVerified: true },
    ]
  },
  'up-technical-principal': {
    examType: 'up-technical-principal',
    titleEn: 'UP Technical Education Principal',
    titleHi: 'उ.प्र. प्राविधिक शिक्षा (पॉलिटेक्निक) प्रधानाचार्य',
    subtitleEn: 'AICTE Norms, Polytechnic Administration, Technical Service Rules & Governance',
    subtitleHi: 'एआईसीटीई मानक, पॉलिटेक्निक प्रशासन, प्राविधिक शिक्षा सेवा नियमावली व संस्थागत प्रबंधन',
    durationMinutes: 120,
    totalMarksPerQuestion: 2.5,
    negativeMarksPerQuestion: 2.5 / 3,
    configuredQuestionCount: 120,
    allowedTestLengths: [120, 130, 140, 150],
    officialDoc: {
      recruitingAuthority: 'Uttar Pradesh Public Service Commission (UPPSC)',
      exactPostName: 'Principal, Government Polytechnic / Diploma Level Technical Institutions',
      advertisementNumber: 'UPPSC Advt. No. A-7/E-1/2021',
      advertisementDate: '15-09-2021',
      officialSourceUrl: 'https://uppsc.up.nic.in/',
      verificationStatus: 'Pending official verification',
      lastCheckedDate: '2026-10-20',
      notes: 'Pending official verification: The post-specific written examination scheme for Technical Education Principal requires administrator review of the notification document.'
    },
    topics: [
      { id: 'tech-governance', nameEn: 'AICTE Norms & Technical Education Governance', nameHi: 'एआईसीटीई मानक व प्राविधिक शिक्षा अभिशासन', weightagePractice: 20, isVerified: false },
      { id: 'polytechnic-admin', nameEn: 'UP Polytechnic Institutional Administration', nameHi: 'उप्र पॉलिटेक्निक संस्थागत प्रशासन', weightagePractice: 20, isVerified: false },
      { id: 'tech-financial', nameEn: 'Technical Institutional Budget & State Financial Rules', nameHi: 'संस्थागत वित्तीय बजट व राज्य वित्तीय नियमावली', weightagePractice: 20, isVerified: false },
      { id: 'nba-curriculum', nameEn: 'NBA Accreditation, Curriculum Design & Industry Linkages', nameHi: 'एनबीए प्रत्यायन, पाठ्यचर्या डिजाइन व उद्योग साझेदारी', weightagePractice: 20, isVerified: false },
      { id: 'general-aptitude', nameEn: 'Administrative Aptitude & Educational Technology', nameHi: 'प्रशासनिक अभिक्षमता एवं शैक्षणिक प्रौद्योगिकी', weightagePractice: 20, isVerified: false },
    ]
  },
  'uppcs-principal': {
    examType: 'uppcs-principal',
    titleEn: 'UP Inter College Principal Written Exam',
    titleHi: 'उ.प्र. अशासकीय सहायता प्राप्त इंटर कॉलेज प्रधानाचार्य लिखित परीक्षा',
    subtitleEn: 'Prescribed 30 + 30 + 60 Section Distribution across 12 Units (120 Questions • 300 Marks)',
    subtitleHi: 'निर्धारित 30 + 30 + 60 खंडीय संरचना: 12 इकाइयां (120 प्रश्न • 300 अंक)',
    durationMinutes: 120,
    totalMarksPerQuestion: 2.5,
    negativeMarksPerQuestion: 2.5 / 3,
    configuredQuestionCount: 120,
    allowedTestLengths: [120, 130, 140, 150],
    officialDoc: {
      recruitingAuthority: 'UPSESSB / UP Education Service Selection Commission (Prayagraj)',
      exactPostName: 'Principal (Aided Secondary Inter College)',
      advertisementNumber: 'UPSESSB Principal Scheme',
      advertisementDate: '2026-10-15',
      officialSourceUrl: 'https://upsessb.org/',
      verificationStatus: 'Verified',
      lastCheckedDate: '2026-10-20',
      verifiedBy: 'Uttar Pradesh Education Service Selection Commission'
    },
    topics: [
      { id: 'up-unit-1', nameEn: 'Unit 1: Current Affairs & Sports', nameHi: 'इकाई 1: समसामयिक घटनाएं व खेलकूद', weightagePractice: 8.33, isVerified: true },
      { id: 'up-unit-2', nameEn: 'Unit 2: Indian History, Polity & Geography', nameHi: 'इकाई 2: भारतीय इतिहास, संविधान व भूगोल', weightagePractice: 8.33, isVerified: true },
      { id: 'up-unit-3', nameEn: 'Unit 3: General Science, Environment & ICT', nameHi: 'इकाई 3: सामान्य विज्ञान, पर्यावरण व आईसीटी', weightagePractice: 8.33, isVerified: true },
      { id: 'up-unit-4', nameEn: 'Unit 4: General Hindi (सामान्य हिन्दी)', nameHi: 'इकाई 4: सामान्य हिन्दी', weightagePractice: 12.5, isVerified: true },
      { id: 'up-unit-5', nameEn: 'Unit 5: General English', nameHi: 'इकाई 5: सामान्य अंग्रेजी', weightagePractice: 12.5, isVerified: true },
      { id: 'up-unit-6', nameEn: 'Unit 6: Development of Education & Thinkers', nameHi: 'इकाई 6: शिक्षा का विकास व विचारक', weightagePractice: 8.33, isVerified: true },
      { id: 'up-unit-7', nameEn: 'Unit 7: UP Intermediate Education Act 1921', nameHi: 'इकाई 7: उप्र अधिनियम 1921', weightagePractice: 6.67, isVerified: true },
      { id: 'up-unit-8', nameEn: 'Unit 8: Role of Principal & Leadership', nameHi: 'इकाई 8: प्रधानाचार्य नेतृत्व', weightagePractice: 5.0, isVerified: true },
      { id: 'up-unit-9', nameEn: 'Unit 9: Educational Administration & Quality', nameHi: 'इकाई 9: शैक्षिक प्रशासन व गुणवत्ता', weightagePractice: 5.0, isVerified: true },
      { id: 'up-unit-10', nameEn: 'Unit 10: Office Administration & RTI', nameHi: 'इकाई 10: कार्यालय प्रशासन व आरटीआई', weightagePractice: 6.67, isVerified: true },
      { id: 'up-unit-11', nameEn: 'Unit 11: Financial Administration & Salaries Act', nameHi: 'इकाई 11: वित्तीय प्रशासन व वेतन अधिनियम', weightagePractice: 6.67, isVerified: true },
      { id: 'up-unit-12', nameEn: 'Unit 12: Flagship Education Schemes', nameHi: 'इकाई 12: प्रमुख शैक्षिक योजनाएं', weightagePractice: 11.67, isVerified: true },
    ]
  }
};

import { UPSC_PRINCIPAL_EXPANSION_QUESTIONS } from './upscPrincipalExpansion';
import { UP_INTER_COLLEGE_EXPANSION_QUESTIONS } from './upInterCollegeExpansion';
import { UP_TECHNICAL_PRINCIPAL_QUESTIONS } from './upTechnicalPrincipalBank';

export const INITIAL_QUESTIONS: Question[] = [
  ...UPSC_PRINCIPAL_QUESTIONS,
  ...UPSC_PRINCIPAL_EXPANSION_QUESTIONS,
  ...UP_INTER_COLLEGE_QUESTIONS,
  ...UP_INTER_COLLEGE_EXPANSION_QUESTIONS,
  ...UP_TECHNICAL_PRINCIPAL_QUESTIONS
];
