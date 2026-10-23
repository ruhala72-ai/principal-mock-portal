import { Question } from '../types/quiz';

/**
 * UP Aided / Minority Intermediate College Principal Written Exam - Expansion Bank
 * Additional Verified Questions across all 3 Prescribed Sections & 12 Units
 * Complete with Source Verification Tiers, Statutory References, and Bilingual Text.
 */
export const UP_INTER_COLLEGE_EXPANSION_QUESTIONS: Question[] = [
  // =========================================================================
  // SECTION I: General Studies, History, Polity, Geography, Science & ICT (Units 1, 2, 3)
  // =========================================================================
  {
    id: "up-ic-exp-1",
    examType: "up-aided-principal",
    sectionId: "up-sec-1",
    unitId: "up-unit-1",
    topic: "Unit 1: Current Affairs & Sports",
    topicHi: "इकाई 1: समसामयिक घटनाएं, राष्ट्रीय व अंतरराष्ट्रीय परिदृश्य व खेलकूद",
    subtopic: "National Sports Governance",
    officialReference: "UP Inter College Principal Syllabus Unit 1",
    statuteOrScheme: "Ministry of Youth Affairs & Sports",
    conceptId: "UP-GS-SPORTS-KHELO",
    sourceInfo: {
      priorityTier: 1,
      sourceName: "Sports Authority of India & Khelo India Scheme",
      citation: "Khelo India Youth Games & Talent Search",
      verificationStatus: "Verified",
      verifiedDate: "2026-10-21"
    },
    questionTextEn: "Under the Khelo India scheme of the Government of India, selected talented athletes in priority sports disciplines are provided financial assistance of how much per annum for up to 8 years?",
    questionTextHi: "भारत सरकार की 'खेलो इंडिया' योजना के तहत प्राथमिकता वाले खेलों में चयनित प्रतिभावान खिलाड़ियों को 8 वर्षों तक प्रति वर्ष कितनी वित्तीय सहायता प्रदान की जाती है?",
    optionsEn: [
      "Rs. 5 lakh per annum",
      "Rs. 2 lakh per annum",
      "Rs. 10 lakh per annum",
      "Rs. 1 lakh per annum"
    ],
    optionsHi: [
      "₹5 लाख प्रति वर्ष",
      "₹2 लाख प्रति वर्ष",
      "₹10 लाख प्रति वर्ष",
      "₹1 लाख प्रति वर्ष"
    ],
    correctOptionIndex: 0,
    explanationEn: "Under the Khelo India Talent Development scheme, 1,000 talented athletes are selected annually and provided financial support of Rs. 5 lakh per annum for 8 years to groom them for international sports competitions.",
    explanationHi: "खेलो इंडिया टैलेंट डेवलपमेंट स्कीम के तहत चयनित प्रत्येक प्रतिभाशाली एथलीट को 8 वर्षों तक ₹5 लाख प्रति वर्ष की वित्तीय सहायता दी जाती है।",
    difficulty: "Medium",
    tags: ["Khelo India", "Sports", "Unit 1"],
    isPracticeQuestion: true,
    isApproved: true
  },
  {
    id: "up-ic-exp-2",
    examType: "up-aided-principal",
    sectionId: "up-sec-1",
    unitId: "up-unit-2",
    topic: "Unit 2: Indian History, Polity, Economy & Geography",
    topicHi: "इकाई 2: भारतीय इतिहास, स्वतंत्रता आंदोलन, संविधान, भूगोल व जनसंख्या",
    subtopic: "Indian National Congress 1916 Lucknow Session",
    officialReference: "UP Inter College Principal Syllabus Unit 2",
    statuteOrScheme: "Modern Indian History, Lucknow Pact 1916",
    conceptId: "UP-HIST-LUCKNOW-PACT",
    sourceInfo: {
      priorityTier: 1,
      sourceName: "NCERT Indian National Movement & Gazetteers of Uttar Pradesh",
      citation: "Lucknow Session 1916 & Ambica Charan Mazumdar",
      verificationStatus: "Verified",
      verifiedDate: "2026-10-21"
    },
    questionTextEn: "Who presided over the historic Lucknow Session of the Indian National Congress in 1916 where the Moderate and Extremist factions reunited and the Lucknow Pact was signed with the Muslim League?",
    questionTextHi: "भारतीय राष्ट्रीय कांग्रेस के ऐतिहासिक लखनऊ अधिवेशन (1916) की अध्यक्षता किसने की थी, जिसमें नरम दल और गरम दल का पुनः मिलन हुआ तथा मुस्लिम लीग के साथ लखनऊ समझौता हस्ताक्षरित हुआ?",
    optionsEn: [
      "Ambica Charan Mazumdar",
      "Bal Gangadhar Tilak",
      "Gopal Krishna Gokhale",
      "Annie Besant"
    ],
    optionsHi: [
      "अंबिका चरण मजूमदार",
      "बाल गंगाधर तिलक",
      "गोपाल कृष्ण गोखले",
      "एनी बेसेंट"
    ],
    correctOptionIndex: 0,
    explanationEn: "The 31st session of the Indian National Congress held in Lucknow in December 1916 was presided over by Ambica Charan Mazumdar. It saw the famous reunion of Moderates and Extremists as well as the Congress-League Pact.",
    explanationHi: "1916 के ऐतिहासिक लखनऊ अधिवेशन की अध्यक्षता अंबिका चरण मजूमदार ने की थी। इसी अधिवेशन में नरम दल और गरम दल फिर से एक हुए और कांग्रेस-लीग समझौता संपन्न हुआ।",
    difficulty: "Easy",
    tags: ["History", "Lucknow Pact", "Unit 2"],
    isPracticeQuestion: true,
    isApproved: true
  },
  {
    id: "up-ic-exp-3",
    examType: "up-aided-principal",
    sectionId: "up-sec-1",
    unitId: "up-unit-3",
    topic: "Unit 3: General Science, Environment, Health & ICT",
    topicHi: "इकाई 3: सामान्य विज्ञान, पर्यावरण, मानव स्वास्थ्य व शैक्षिक तकनीकी",
    subtopic: "Human Health, Vitamins & Deficiency Diseases",
    officialReference: "UP Inter College Principal Syllabus Unit 3",
    statuteOrScheme: "ICMR Nutritional Guidelines & NCERT Science",
    conceptId: "UP-SCI-VITAMINS-D",
    sourceInfo: {
      priorityTier: 1,
      sourceName: "Indian Council of Medical Research (ICMR) & NCERT",
      citation: "Human Nutrition and Fat-Soluble Vitamins",
      verificationStatus: "Verified",
      verifiedDate: "2026-10-21"
    },
    questionTextEn: "Deficiency of Vitamin D in growing children leads to improper bone calcification and skeletal deformities known as:",
    questionTextHi: "बढ़ते बच्चों में विटामिन डी (Vitamin D) की कमी से अस्थियों का अनुचित कैल्सीकरण होता है, जिसे किस रोग के रूप में जाना जाता है?",
    optionsEn: [
      "Rickets (सूखा रोग)",
      "Scurvy (स्कर्वी)",
      "Pellagra (पेलाग्रा)",
      "Beri-beri (बेरी-बेरी)"
    ],
    optionsHi: [
      "रिकेट्स (सूखा रोग)",
      "स्कर्वी",
      "पेलाग्रा",
      "बेरी-बेरी"
    ],
    correctOptionIndex: 0,
    explanationEn: "Vitamin D promotes calcium absorption in the gut. Its deficiency causes rickets in children (soft and weak bones) and osteomalacia in adults.",
    explanationHi: "विटामिन डी की कमी से बच्चों में रिकेट्स (सूखा रोग) होता है जिसमें हड्डियां कमजोर होकर मुड़ जाती हैं, जबकि वयस्कों में यह ऑस्टियोमलेशिया कहलाता है।",
    difficulty: "Easy",
    tags: ["Science", "Vitamins", "Human Health", "Unit 3"],
    isPracticeQuestion: true,
    isApproved: true
  },

  // =========================================================================
  // SECTION II: Language Competence (Units 4 & 5)
  // =========================================================================
  {
    id: "up-ic-exp-16",
    examType: "up-aided-principal",
    sectionId: "up-sec-2",
    unitId: "up-unit-4",
    topic: "Unit 4: General Hindi (सामान्य हिन्दी)",
    topicHi: "इकाई 4: सामान्य हिन्दी (व्याकरण, शब्द रचना व पत्र लेखन)",
    subtopic: "Hindi Official Correspondence (कार्यालयी पत्राचार)",
    officialReference: "UP Inter College Principal Syllabus Unit 4",
    conceptId: "UP-HINDI-OFFICIAL-MEMO",
    sourceInfo: {
      priorityTier: 2,
      sourceName: "UP Secretariat Manual of Office Procedure",
      citation: "Chapter 4: Official Letter Formats (ज्ञापन व परिपत्र)",
      verificationStatus: "Verified",
      verifiedDate: "2026-10-21"
    },
    questionTextEn: "In official government correspondence, which format is specifically utilized when communicating decisions or instructions to subordinate offices or employees without formal salutation and subscription?",
    questionTextHi: "सरकारी कार्यालयी पत्राचार में, अधीनस्थ कार्यालयों या कर्मचारियों को बिना किसी औपचारिक संबोधन (महोदय) और अधोलेख (भवदीय) के अनुदेश या निर्णय संप्रेषित करने के लिए किस प्रारूप का प्रयोग किया जाता है?",
    optionsEn: [
      "कार्यालय ज्ञापन (Office Memorandum)",
      "शासकीय पत्र (Official Letter)",
      "अर्धशासकीय पत्र (Demi-Official Letter)",
      "अधिसूचना (Notification)"
    ],
    optionsHi: [
      "कार्यालय ज्ञापन (Office Memorandum)",
      "शासकीय पत्र (Official Letter)",
      "अर्धशासकीय पत्र (Demi-Official Letter)",
      "अधिसूचना (Notification)"
    ],
    correctOptionIndex: 0,
    explanationEn: "An Office Memorandum (कार्यालय ज्ञापन) is written in the third person and does not contain a salutation (महोदय) or complimentary close (भवदीय). It is used for internal official instructions.",
    explanationHi: "कार्यालय ज्ञापन (Office Memorandum) अन्य पुरुष में लिखा जाता है और इसमें महोदय अथवा भवदीय जैसे औपचारिक संबोधनों का प्रयोग नहीं किया जाता।",
    difficulty: "Medium",
    tags: ["General Hindi", "Patrachar", "Unit 4"],
    isPracticeQuestion: true,
    isApproved: true
  },
  {
    id: "up-ic-exp-17",
    examType: "up-aided-principal",
    sectionId: "up-sec-2",
    unitId: "up-unit-5",
    topic: "Unit 5: General English",
    topicHi: "इकाई 5: सामान्य अंग्रेजी (व्याकरण, शब्दावली व रूपांतरण)",
    subtopic: "One-Word Substitution",
    officialReference: "UP Inter College Principal Syllabus Unit 5",
    conceptId: "UP-ENG-ONEWORD-1",
    sourceInfo: {
      priorityTier: 4,
      sourceName: "Standard Advanced Lexicon & Grammar",
      citation: "Educational Administration Vocabulary",
      verificationStatus: "Verified",
      verifiedDate: "2026-10-21"
    },
    questionTextEn: "Choose the correct one-word substitution for: 'A person holding an official position temporarily during an interregnum or pending regular selection':",
    questionTextHi: "'A person holding an official position temporarily during an interregnum or pending regular selection' के लिए एक शब्द का चयन कीजिए:",
    optionsEn: [
      "Officiating (तदर्थ / कार्यवाहक)",
      "Permanent",
      "Tenured",
      "Honorary"
    ],
    optionsHi: [
      "Officiating",
      "Permanent",
      "Tenured",
      "Honorary"
    ],
    correctOptionIndex: 0,
    explanationEn: "'Officiating' describes an officer appointed temporarily to perform the duties of an office while the permanent post holder is absent or pending formal regular appointment.",
    explanationHi: "नियमित चयन अथवा नियुक्ति होने तक पद का अस्थायी दायित्व संभालने वाले अधिकारी को 'Officiating' (कार्यवाहक/तदर्थ) कहा जाता है।",
    difficulty: "Easy",
    tags: ["General English", "One-Word Substitution", "Unit 5"],
    isPracticeQuestion: true,
    isApproved: true
  },

  // =========================================================================
  // SECTION III: Educational Leadership, UP Acts, Finance & Schemes (Units 6 to 12)
  // =========================================================================
  {
    id: "up-ic-exp-31",
    examType: "up-aided-principal",
    sectionId: "up-sec-3",
    unitId: "up-unit-7",
    topic: "Unit 7: UP Intermediate Education Act 1921",
    topicHi: "इकाई 7: उप्र इंटरमीडिएट शिक्षा अधिनियम 1921 व परिषद",
    subtopic: "Section 16-G Disciplinary Approval by DIOS",
    officialReference: "UP Inter College Principal Syllabus Unit 7",
    statuteOrScheme: "UP Intermediate Education Act 1921, Section 16-G(3)(a)",
    conceptId: "UP-ACT-1921-SEC-16G",
    sourceInfo: {
      priorityTier: 1,
      sourceName: "UP Intermediate Education Act 1921 (Amended)",
      citation: "Section 16-G: Conditions of service of Heads of Institutions, teachers and other employees",
      verificationStatus: "Verified",
      verifiedDate: "2026-10-21"
    },
    questionTextEn: "Under Section 16-G(3)(a) of the UP Intermediate Education Act 1921, no order of dismissal, removal or reduction in rank passed against a Principal, Headmaster or teacher of a recognized aided institution shall take effect unless:",
    questionTextHi: "उप्र इंटरमीडिएट शिक्षा अधिनियम 1921 की धारा 16-G(3)(a) के अनुसार, किसी मान्यता प्राप्त सहायता प्राप्त संस्था के प्रधानाचार्य, प्रधानाध्यापक या शिक्षक के विरुद्ध पारित पदच्युति (Dismissal), निष्कासन (Removal) या पदावनति (Reduction in Rank) का कोई भी आदेश तब तक प्रभावी नहीं होगा जब तक कि:",
    optionsEn: [
      "It has been approved in writing by the District Inspector of Schools (DIOS) or competent regulatory authority",
      "It has been published in a national English daily newspaper",
      "It has been endorsed by at least 75% of the Parents-Teacher Association members",
      "The institution has completed three financial years without audit objections"
    ],
    optionsHi: [
      "जिला विद्यालय निरीक्षक (DIOS) या सक्षम विनियामक प्राधिकारी द्वारा इसे लिखित रूप में अनुमोदित न कर दिया गया हो",
      "इसे किसी राष्ट्रीय अंग्रेजी दैनिक समाचार पत्र में प्रकाशित न किया गया हो",
      "अभिभावक-शिक्षक संघ के कम से कम 75% सदस्यों द्वारा इसका समर्थन न किया गया हो",
      "संस्था ने बिना लेखा आपत्ति के तीन वित्तीय वर्ष पूर्ण न कर लिए हों"
    ],
    correctOptionIndex: 0,
    explanationEn: "Section 16-G(3)(a) strictly establishes that no principal or teacher can be dismissed, removed, or reduced in rank by the Committee of Management without prior written approval of the Inspector (DIOS) or Commission.",
    explanationHi: "धारा 16-G(3)(a) स्पष्ट रूप से यह सुरक्षा प्रदान करती है कि प्रबंधक समिति द्वारा पारित पदच्युति, निष्कासन अथवा पदावनति का प्रस्ताव तब तक कानूनी रूप से शून्य रहता है जब तक DIOS द्वारा उसका विधिवत अनुमोदन न कर दिया जाए।",
    difficulty: "Medium",
    tags: ["UP Act 1921", "Section 16-G", "DIOS Approval", "Unit 7"],
    isPracticeQuestion: true,
    isApproved: true
  },
  {
    id: "up-ic-exp-32",
    examType: "up-aided-principal",
    sectionId: "up-sec-3",
    unitId: "up-unit-11",
    topic: "Unit 11: Financial Administration & Salaries Act",
    topicHi: "इकाई 11: वित्तीय प्रशासन, बजट, वेतन अधिनियम 1971 व जेम",
    subtopic: "Payment of Salaries Act 1971 Section 5 Joint Account",
    officialReference: "UP Inter College Principal Syllabus Unit 11",
    statuteOrScheme: "UP High Schools and Intermediate Colleges (Payment of Salaries of Teachers and Other Employees) Act 1971, Section 5",
    conceptId: "UP-SALARIES-ACT-SEC-5",
    sourceInfo: {
      priorityTier: 1,
      sourceName: "UP Act No. 24 of 1971",
      citation: "Section 5: Procedure for Payment of Salary in Joint Account",
      verificationStatus: "Verified",
      verifiedDate: "2026-10-21"
    },
    questionTextEn: "Under Section 5 of the UP High Schools and Intermediate Colleges (Payment of Salaries of Teachers and Other Employees) Act 1971, salary grant is deposited into a separate joint bank account operated by:",
    questionTextHi: "उप्र हाईस्कूल तथा इंटरमीडिएट कॉलेज (अध्यापकों तथा अन्य कर्मचारियों के वेतन का भुगतान) अधिनियम 1971 की धारा 5 के अंतर्गत, वेतन अनुदान बैंक में किस संयुक्त खाते में जमा किया जाता है, जिसका संचालन किसके द्वारा होता है?",
    optionsEn: [
      "Operated jointly by the Manager of the institution (or his authorized nominee) and the District Inspector of Schools (DIOS)",
      "Operated solely by the Headmaster without departmental supervision",
      "Operated jointly by the District Magistrate and State Finance Secretary",
      "Operated directly by the Student Council and Parent Committee"
    ],
    optionsHi: [
      "संस्था के प्रबंधक (अथवा उनके अधिकृत प्रतिनिधि) और जिला विद्यालय निरीक्षक (DIOS) द्वारा संयुक्त रूप से",
      "विभागीय पर्यवेक्षण के बिना केवल प्रधानाध्यापक द्वारा एकल रूप से",
      "जिलाधिकारी एवं राज्य वित्त सचिव द्वारा संयुक्त रूप से",
      "छात्र परिषद एवं अभिभावक समिति द्वारा सीधे"
    ],
    correctOptionIndex: 0,
    explanationEn: "Section 5 of UP Act 24 of 1971 mandates that salary disbursement takes place through a dedicated Joint Account operated jointly by the Management of the institution and the DIOS to prevent delay or misappropriation of staff salaries.",
    explanationHi: "वेतन भुगतान अधिनियम 1971 (UP Act 24 of 1971) की धारा 5 के अनुसार, शिक्षकों और कर्मचारियों का वेतन प्रबंधक और जिला विद्यालय निरीक्षक (DIOS) के संयुक्त खाते (Joint Account) से बैंक हस्तांतरण के माध्यम से किया जाता है।",
    difficulty: "Medium",
    tags: ["Salaries Act 1971", "Joint Account", "DIOS", "Unit 11"],
    isPracticeQuestion: true,
    isApproved: true
  },
  {
    id: "up-ic-exp-33",
    examType: "up-aided-principal",
    sectionId: "up-sec-3",
    unitId: "up-unit-12",
    topic: "Unit 12: Flagship Education Schemes (Alankar, Kayakalp, etc.)",
    topicHi: "इकाई 12: प्रमुख शैक्षिक योजनाएं (अलंकार, कायाकल्प, पीएम पोषण आदि)",
    subtopic: "Project Alankar for Secondary Schools",
    officialReference: "UP Inter College Principal Syllabus Unit 12",
    statuteOrScheme: "Government of Uttar Pradesh, Madhyamik Shiksha Vibhag",
    conceptId: "UP-SCHEME-ALANKAR",
    sourceInfo: {
      priorityTier: 1,
      sourceName: "Government Orders of Uttar Pradesh Secondary Education Department",
      citation: "Project Alankar Guidelines for Government & Aided Secondary Schools",
      verificationStatus: "Verified",
      verifiedDate: "2026-10-21"
    },
    questionTextEn: "What is the primary objective of the 'Project Alankar' (प्रोजेक्ट अलंकार) launched by the Uttar Pradesh Government in secondary schools?",
    questionTextHi: "उत्तर प्रदेश सरकार द्वारा माध्यमिक विद्यालयों में प्रारंभ किए गए 'प्रोजेक्ट अलंकार' (Project Alankar) का प्राथमिक उद्देश्य क्या है?",
    optionsEn: [
      "Revamping and upgrading physical infrastructure, smart classrooms, laboratories, solar power, and sanitation in government and aided secondary schools",
      "Distributing cosmetic kits to secondary school teachers",
      "Providing free international air travel to student toppers",
      "Conducting annual jewellery-making vocational diplomas"
    ],
    optionsHi: [
      "राजकीय एवं सहायता प्राप्त अशासकीय माध्यमिक विद्यालयों में भौतिक बुनियादी ढांचे, स्मार्ट कक्षाओं, प्रयोगशालाओं, सौर ऊर्जा और स्वच्छता सुविधाओं का कायाकल्प व सुदृढ़ीकरण",
      "माध्यमिक विद्यालय के शिक्षकों को सौंदर्य प्रसाधन किट वितरित करना",
      "शीर्ष स्थान प्राप्त विद्यार्थियों को निःशुल्क अंतरराष्ट्रीय हवाई यात्रा प्रदान करना",
      "वार्षिक आभूषण निर्माण व्यावसायिक डिप्लोमा संचालित करना"
    ],
    correctOptionIndex: 0,
    explanationEn: "Project Alankar was launched by the UP Government to rejuvenate dilapidated secondary school buildings, construct modern science labs, smart classrooms, separate toilets for girls and boys, and install solar plants in state-aided secondary schools.",
    explanationHi: "प्रोजेक्ट अलंकार का मुख्य उद्देश्य उत्तर प्रदेश के पुराने अशासकीय सहायता प्राप्त एवं राजकीय माध्यमिक विद्यालयों के भवनों का जीर्णोद्धार, आधुनिक प्रयोगशालाओं, स्मार्ट क्लासरूम और सोलर संयंत्रों की स्थापना कर अवस्थापना सुविधाओं को उच्चीकृत करना है।",
    difficulty: "Easy",
    tags: ["Project Alankar", "UP Education Schemes", "Unit 12"],
    isPracticeQuestion: true,
    isApproved: true
  }
];
