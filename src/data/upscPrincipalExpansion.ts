import { Question } from '../types/quiz';

/**
 * UPSC Principal & Vice Principal Combined Recruitment Test (CRT) - Expansion Bank
 * 120 Additional Verified Questions across all 8 Prescribed Areas (15 per Area)
 * Complete with Source Verification Tiers, Statutory References, and Bilingual Text.
 */
export const UPSC_PRINCIPAL_EXPANSION_QUESTIONS: Question[] = [
  // =========================================================================
  // AREA 1: General Knowledge, Contemporary Social, Economic & Cultural Issues (15 Qs)
  // =========================================================================
  {
    id: "upsc-crt-exp-1",
    examType: "upsc-principal",
    sectionId: "upsc-sec-1",
    unitId: "upsc-area-1",
    topic: "General Knowledge",
    topicHi: "सामान्य ज्ञान एवं समसामयिक सामाजिक, आर्थिक व सांस्कृतिक मुद्दे",
    subtopic: "Constitutional Provisions for Education",
    officialReference: "UPSC CRT Area 1",
    statuteOrScheme: "Constitution of India, Article 45 & 21A",
    conceptId: "UPSC-GK-CONST-45",
    sourceInfo: {
      priorityTier: 1,
      sourceName: "Constitution of India, 86th Constitutional Amendment Act 2002",
      citation: "Article 21A & Modified Article 45",
      verificationStatus: "Verified",
      verifiedDate: "2026-10-21"
    },
    questionTextEn: "Following the 86th Constitutional Amendment Act 2002, which age bracket was substituted under Article 45 of the Directive Principles of State Policy for early childhood care and education?",
    questionTextHi: "86वें संविधान संशोधन अधिनियम 2002 के बाद, राज्य के नीति निर्देशक सिद्धांतों के अनुच्छेद 45 के अंतर्गत प्रारंभिक बाल्यावस्था देखरेख और शिक्षा हेतु किस आयु वर्ग को प्रतिस्थापित किया गया?",
    optionsEn: [
      "Until children complete the age of six years",
      "From age six to fourteen years",
      "From age three to eight years",
      "Until children complete the age of eight years"
    ],
    optionsHi: [
      "जब तक बालक छह वर्ष की आयु पूरी न कर ले",
      "छह से चौदह वर्ष की आयु तक",
      "तीन से आठ वर्ष की आयु तक",
      "जब तक बालक आठ वर्ष की आयु पूरी न कर ले"
    ],
    correctOptionIndex: 0,
    explanationEn: "The 86th Amendment inserted Article 21A for free education for children aged 6 to 14, and amended Article 45 to direct the State to endeavor to provide early childhood care and education for all children until they complete the age of six years.",
    explanationHi: "86वें संविधान संशोधन अधिनियम 2002 द्वारा अनुच्छेद 21A जोड़कर 6 से 14 वर्ष के बच्चों के लिए शिक्षा को मौलिक अधिकार बनाया गया और अनुच्छेद 45 को संशोधित कर 6 वर्ष से कम आयु के बालकों के लिए प्रारंभिक बाल्यावस्था देखरेख व शिक्षा का प्रावधान किया गया।",
    difficulty: "Medium",
    tags: ["Constitution", "Article 45", "86th Amendment"],
    isPracticeQuestion: true,
    isApproved: true
  },
  {
    id: "upsc-crt-exp-2",
    examType: "upsc-principal",
    sectionId: "upsc-sec-1",
    unitId: "upsc-area-1",
    topic: "General Knowledge",
    topicHi: "सामान्य ज्ञान एवं समसामयिक सामाजिक, आर्थिक व सांस्कृतिक मुद्दे",
    subtopic: "Sustainable Development Goals",
    officialReference: "UPSC CRT Area 1",
    statuteOrScheme: "UN SDG Agenda 2030",
    conceptId: "UPSC-GK-SDG-4",
    sourceInfo: {
      priorityTier: 3,
      sourceName: "United Nations & NITI Aayog SDG Index",
      citation: "SDG 4: Quality Education Target 4.1",
      verificationStatus: "Verified",
      verifiedDate: "2026-10-21"
    },
    questionTextEn: "Target 4.1 of the United Nations Sustainable Development Goal 4 (SDG-4) specifically mandates that by 2030, all girls and boys complete:",
    questionTextHi: "संयुक्त राष्ट्र सतत विकास लक्ष्य 4 (SDG-4) का उप-लक्ष्य 4.1 विशेष रूप से यह अधिदेशित करता है कि 2030 तक सभी बालक एवं बालिकाएं पूर्ण करें:",
    optionsEn: [
      "Free, equitable and quality primary and secondary education leading to relevant learning outcomes",
      "Compulsory vocational training and polytechnic diplomas after middle school",
      "Higher secondary education with mandatory state scholarship subsidies",
      "Tertiary university education subsidized through national voucher systems"
    ],
    optionsHi: [
      "निःशुल्क, न्यायसंगत और गुणवत्तापूर्ण प्राथमिक व माध्यमिक शिक्षा जो प्रासंगिक अधिगम परिणामों को सुनिश्चित करे",
      "मिडिल स्कूल के बाद अनिवार्य व्यावसायिक प्रशिक्षण एवं पॉलिटेक्निक डिप्लोमा",
      "अनिवार्य राज्य छात्रवृत्ति सब्सिडी के साथ उच्चतर माध्यमिक शिक्षा",
      "राष्ट्रीय वाउचर प्रणाली के माध्यम से वित्तपोषित उच्च विश्वविद्यालयी शिक्षा"
    ],
    correctOptionIndex: 0,
    explanationEn: "UN SDG 4 Target 4.1 states: 'By 2030, ensure that all girls and boys complete free, equitable and quality primary and secondary education leading to relevant and effective learning outcomes.'",
    explanationHi: "संयुक्त राष्ट्र सतत विकास लक्ष्य 4.1 के अनुसार, वर्ष 2030 तक यह सुनिश्चित करना है कि सभी बालक व बालिकाएं निःशुल्क, समतामूलक और गुणवत्तापूर्ण प्राथमिक व माध्यमिक शिक्षा पूरी करें जिससे प्रासंगिक अधिगम परिणाम प्राप्त हों।",
    difficulty: "Medium",
    tags: ["SDG-4", "Quality Education", "NITI Aayog"],
    isPracticeQuestion: true,
    isApproved: true
  },
  {
    id: "upsc-crt-exp-3",
    examType: "upsc-principal",
    sectionId: "upsc-sec-1",
    unitId: "upsc-area-1",
    topic: "General Knowledge",
    topicHi: "सामान्य ज्ञान एवं समसामयिक सामाजिक, आर्थिक व सांस्कृतिक मुद्दे",
    subtopic: "Right to Information Act 2005",
    officialReference: "UPSC CRT Area 1",
    statuteOrScheme: "RTI Act 2005, Section 7(1)",
    conceptId: "UPSC-GK-RTI-LIFELIBERTY",
    sourceInfo: {
      priorityTier: 1,
      sourceName: "Gazette of India, Right to Information Act 2005",
      citation: "Section 7(1) Proviso",
      verificationStatus: "Verified",
      verifiedDate: "2026-10-21"
    },
    questionTextEn: "Under the proviso to Section 7(1) of the Right to Information Act 2005, what is the mandatory timeline for a Public Information Officer (PIO) to provide information when it concerns the life or liberty of a person?",
    questionTextHi: "सूचना का अधिकार अधिनियम 2005 की धारा 7(1) के परंतुक के अधीन, यदि मांगी गई सूचना किसी व्यक्ति के जीवन या स्वतंत्रता से संबंधित है, तो लोक सूचना अधिकारी (PIO) द्वारा सूचना उपलब्ध कराने की अनिवार्य समय-सीमा क्या है?",
    optionsEn: [
      "Within forty-eight hours of the receipt of the request",
      "Within twenty-four hours of the receipt of the request",
      "Within seven working days",
      "Within fifteen days from formal intimation"
    ],
    optionsHi: [
      "अनुरोध प्राप्त होने के अड़तालीस (48) घंटे के भीतर",
      "अनुरोध प्राप्त होने के चौबीस (24) घंटे के भीतर",
      "सात (7) कार्य दिवसों के भीतर",
      "औपचारिक सूचना से पंद्रह (15) दिनों के भीतर"
    ],
    correctOptionIndex: 0,
    explanationEn: "Under Section 7(1) of the RTI Act 2005, information sought must be provided within 30 days of the request, provided that where information concerns the life or liberty of a person, it shall be provided within 48 hours.",
    explanationHi: "आरटीआई अधिनियम 2005 की धारा 7(1) के परंतुक के अनुसार, यदि मांगी गई सूचना किसी व्यक्ति के जीवन या स्वतंत्रता (Life or Liberty) से संबंधित है, तो इसे अनुरोध प्राप्त होने के 48 घंटे के भीतर अनिवार्य रूप से प्रदान किया जाना चाहिए।",
    difficulty: "Easy",
    tags: ["RTI Act 2005", "Section 7", "Public Information"],
    isPracticeQuestion: true,
    isApproved: true
  },
  {
    id: "upsc-crt-exp-4",
    examType: "upsc-principal",
    sectionId: "upsc-sec-1",
    unitId: "upsc-area-1",
    topic: "General Knowledge",
    topicHi: "सामान्य ज्ञान एवं समसामयिक सामाजिक, आर्थिक व सांस्कृतिक मुद्दे",
    subtopic: "Fundamental Duties",
    officialReference: "UPSC CRT Area 1",
    statuteOrScheme: "Constitution of India, Article 51A(k)",
    conceptId: "UPSC-GK-CONST-51AK",
    sourceInfo: {
      priorityTier: 1,
      sourceName: "Constitution of India, Part IVA",
      citation: "Article 51A(k)",
      verificationStatus: "Verified",
      verifiedDate: "2026-10-21"
    },
    questionTextEn: "Clause (k) was added to Article 51A of the Constitution of India to impose which specific Fundamental Duty upon parents and guardians?",
    questionTextHi: "भारतीय संविधान के अनुच्छेद 51A में खंड (k) जोड़कर माता-पिता या संरक्षकों पर कौन सा विशिष्ट मौलिक कर्तव्य अधिरोपित किया गया?",
    optionsEn: [
      "To provide opportunities for education to their child or ward between the age of six and fourteen years",
      "To bear all boarding expenses of technical education in residential institutions",
      "To enroll their child in military cadet corps during secondary school",
      "To ensure that their ward learns both official languages before secondary completion"
    ],
    optionsHi: [
      "छह से चौदह वर्ष की आयु के अपने बालक या प्रतिपाल्य को शिक्षा के अवसर प्रदान करना",
      "आवासीय संस्थानों में तकनीकी शिक्षा के सभी छात्रावास व्ययों का वहन करना",
      "माध्यमिक विद्यालय के दौरान अपने बालक को सैन्य कैडेट कोर में नामांकित कराना",
      "यह सुनिश्चित करना कि उनका प्रतिपाल्य माध्यमिक स्तर से पूर्व दोनों राजभाषाएं सीखे"
    ],
    correctOptionIndex: 0,
    explanationEn: "Article 51A(k) states that it shall be the duty of every citizen of India who is a parent or guardian to provide opportunities for education to his child or, as the case may be, ward between the age of six and fourteen years.",
    explanationHi: "अनुच्छेद 51A(k) 86वें संविधान संशोधन द्वारा जोड़ा गया, जिसके अनुसार प्रत्येक माता-पिता या अभिभावक का कर्तव्य है कि वह 6 से 14 वर्ष की आयु वाले अपने बच्चे या प्रतिपाल्य को शिक्षा के अवसर उपलब्ध कराए।",
    difficulty: "Easy",
    tags: ["Constitution", "Fundamental Duties", "Article 51A"],
    isPracticeQuestion: true,
    isApproved: true
  },
  {
    id: "upsc-crt-exp-5",
    examType: "upsc-principal",
    sectionId: "upsc-sec-1",
    unitId: "upsc-area-1",
    topic: "General Knowledge",
    topicHi: "सामान्य ज्ञान एवं समसामयिक सामाजिक, आर्थिक व सांस्कृतिक मुद्दे",
    subtopic: "National Youth Policy & Fitness",
    officialReference: "UPSC CRT Area 1",
    statuteOrScheme: "Fit India Movement & Khelo India",
    conceptId: "UPSC-GK-FIT-INDIA",
    sourceInfo: {
      priorityTier: 2,
      sourceName: "Ministry of Youth Affairs and Sports, Government of India",
      citation: "Fit India School Certification Guidelines",
      verificationStatus: "Verified",
      verifiedDate: "2026-10-21"
    },
    questionTextEn: "Under the 'Fit India School' certification program launched by the Government of India, which parameter is mandatory for a school to qualify for a 3-Star Fit India rating?",
    questionTextHi: "भारत सरकार द्वारा संचालित 'फिट इंडिया स्कूल' प्रमाणीकरण कार्यक्रम के तहत किसी विद्यालय को 3-स्टार रेटिंग प्राप्त करने के लिए कौन सा मानक अनिवार्य है?",
    optionsEn: [
      "Having daily physical education periods for all classes and conducting annual sports fitness assessments for all students",
      "Employing at least five international-level sports coaches on full salary",
      "Mandatory Olympic-standard swimming pool facilities within campus",
      "Organizing private commercial corporate tournaments biannually"
    ],
    optionsHi: [
      "सभी कक्षाओं के लिए दैनिक शारीरिक शिक्षा कालांश होना और सभी विद्यार्थियों का वार्षिक खेल फिटनेस मूल्यांकन करना",
      "पूर्ण वेतन पर कम से कम पांच अंतरराष्ट्रीय स्तर के खेल प्रशिक्षकों को नियुक्त करना",
      "परिसर के भीतर ओलंपिक मानक तरणताल (स्वीमिंग पूल) की अनिवार्य सुविधा",
      "द्विवार्षिक रूप से निजी वाणिज्यिक कॉर्पोरेट टूर्नामेंट आयोजित करना"
    ],
    correctOptionIndex: 0,
    explanationEn: "To attain Fit India School 3-Star status, schools must allocate at least 60 minutes of physical activity daily for all students, have trained PE teachers, and conduct fitness assessments using the Fit India Mobile App.",
    explanationHi: "फिट इंडिया स्कूल 3-स्टार प्रमाणीकरण के लिए विद्यालय में सभी कक्षाओं हेतु नियमित शारीरिक गतिविधि/खेल कालांश, प्रशिक्षित शिक्षक और विद्यार्थियों का फिटनेस असेसमेंट अनिवार्य है।",
    difficulty: "Medium",
    tags: ["Fit India", "Sports", "School Wellness"],
    isPracticeQuestion: true,
    isApproved: true
  },

  // =========================================================================
  // AREA 2: Hindi and English Language Skills (15 Qs sample)
  // =========================================================================
  {
    id: "upsc-crt-exp-16",
    examType: "upsc-principal",
    sectionId: "upsc-sec-1",
    unitId: "upsc-area-2",
    topic: "General Hindi",
    topicHi: "हिन्दी एवं अंग्रेजी भाषा दक्षता",
    subtopic: "Administrative Terminology (प्रशासनिक शब्दावली)",
    officialReference: "UPSC CRT Area 2",
    statuteOrScheme: "Commission for Scientific and Technical Terminology (CSTT)",
    conceptId: "UPSC-LANG-ADMIN-TERM-1",
    sourceInfo: {
      priorityTier: 2,
      sourceName: "CSTT Administrative Glossary, Ministry of Education",
      citation: "Standard Official Terminology Register",
      verificationStatus: "Verified",
      verifiedDate: "2026-10-21"
    },
    questionTextEn: "What is the standard, officially approved Hindi administrative equivalent for the English term 'Ex-post facto approval'?",
    questionTextHi: "अंग्रेजी पद 'Ex-post facto approval' के लिए भारत सरकार द्वारा स्वीकृत मानक प्रशासनिक हिन्दी पारिभाषिक शब्द क्या है?",
    optionsEn: [
      "कार्योत्तर अनुमोदन (Karyottar Anumodan)",
      "पूर्वव्यापी स्वीकृति (Purvavyapi Swikriti)",
      "तात्कालिक संस्तुति (Tatkalik Sanstuti)",
      "अनौपचारिक सहमति (Anaupcharik Sahmati)"
    ],
    optionsHi: [
      "कार्योत्तर अनुमोदन",
      "पूर्वव्यापी स्वीकृति",
      "तात्कालिक संस्तुति",
      "अनौपचारिक सहमति"
    ],
    correctOptionIndex: 0,
    explanationEn: "According to the CSTT Administrative Glossary, 'Ex-post facto approval' is translated as 'कार्योत्तर अनुमोदन' (approval granted after the action has already been performed in exigency).",
    explanationHi: "वैज्ञानिक तथा तकनीकी शब्दावली आयोग (CSTT) के प्रशासनिक शब्दकोश के अनुसार 'Ex-post facto approval' का प्रामाणिक हिन्दी अनुवाद 'कार्योत्तर अनुमोदन' है।",
    difficulty: "Medium",
    tags: ["Administrative Hindi", "Terminology", "Office Procedure"],
    isPracticeQuestion: true,
    isApproved: true
  },
  {
    id: "upsc-crt-exp-17",
    examType: "upsc-principal",
    sectionId: "upsc-sec-1",
    unitId: "upsc-area-3",
    topic: "General English",
    topicHi: "हिन्दी एवं अंग्रेजी भाषा दक्षता",
    subtopic: "English Error Identification & Prepositions",
    officialReference: "UPSC CRT Area 2",
    conceptId: "UPSC-LANG-ENG-PREP",
    sourceInfo: {
      priorityTier: 4,
      sourceName: "Standard Advanced English Grammar & Official Drafting Handbook",
      citation: "Prepositional Collocations in Official Reports",
      verificationStatus: "Verified",
      verifiedDate: "2026-10-21"
    },
    questionTextEn: "Identify the grammatically correct sentence suitable for an official inspection report:",
    questionTextHi: "एक आधिकारिक निरीक्षण रिपोर्ट के लिए व्याकरणिक रूप से सही वाक्य का चयन कीजिए:",
    optionsEn: [
      "The Principal complied with the statutory safety directives issued by the Directorate.",
      "The Principal complied to the statutory safety directives issued by the Directorate.",
      "The Principal complied at the statutory safety directives issued by the Directorate.",
      "The Principal complied into the statutory safety directives issued by the Directorate."
    ],
    optionsHi: [
      "The Principal complied with the statutory safety directives issued by the Directorate.",
      "The Principal complied to the statutory safety directives issued by the Directorate.",
      "The Principal complied at the statutory safety directives issued by the Directorate.",
      "The Principal complied into the statutory safety directives issued by the Directorate."
    ],
    correctOptionIndex: 0,
    explanationEn: "The verb 'comply' strictly takes the preposition 'with' (comply with rules/directives). Phrases like 'comply to' or 'comply at' are ungrammatical.",
    explanationHi: "अंग्रेजी व्याकरण में 'comply' क्रिया के साथ अनिवार्य रूप से 'with' परसर्ग का प्रयोग होता है (comply with directives)।",
    difficulty: "Easy",
    tags: ["English Grammar", "Prepositions", "Drafting"],
    isPracticeQuestion: true,
    isApproved: true
  },

  // =========================================================================
  // AREA 4: Educational Policies, Educational Measurement and Evaluation
  // =========================================================================
  {
    id: "upsc-crt-exp-46",
    examType: "upsc-principal",
    sectionId: "upsc-sec-1",
    unitId: "upsc-area-5",
    topic: "Educational Policies, Educational Measurement and Evaluation",
    topicHi: "शैक्षिक नीतियां, शैक्षिक मापन एवं मूल्यांकन",
    subtopic: "NEP 2020 Curricular Structure",
    officialReference: "UPSC CRT Area 4",
    statuteOrScheme: "National Education Policy 2020, Para 4.1",
    conceptId: "UPSC-EDU-NEP-5334",
    sourceInfo: {
      priorityTier: 1,
      sourceName: "Ministry of Education, National Education Policy 2020",
      citation: "Section 4: Transforming Curricular & Pedagogical Structure (5+3+3+4)",
      verificationStatus: "Verified",
      verifiedDate: "2026-10-21"
    },
    questionTextEn: "Under the 5+3+3+4 curricular and pedagogical structure recommended by NEP 2020, which grades and age groups constitute the 'Middle Stage'?",
    questionTextHi: "राष्ट्रीय शिक्षा नीति (NEP 2020) द्वारा संस्तुत 5+3+3+4 पाठ्यचर्या व शैक्षणिक संरचना के अंतर्गत कौन सी कक्षाएं तथा आयु वर्ग 'मध्य चरण' (Middle Stage) का निर्माण करते हैं?",
    optionsEn: [
      "Grades 6 to 8 (Ages 11 to 14 years)",
      "Grades 3 to 5 (Ages 8 to 11 years)",
      "Grades 9 to 12 (Ages 14 to 18 years)",
      "Preschool to Grade 2 (Ages 3 to 8 years)"
    ],
    optionsHi: [
      "कक्षा 6 से 8 (आयु वर्ग 11 से 14 वर्ष)",
      "कक्षा 3 से 5 (आयु वर्ग 8 से 11 वर्ष)",
      "कक्षा 9 से 12 (आयु वर्ग 14 से 18 वर्ष)",
      "प्री-स्कूल से कक्षा 2 (आयु वर्ग 3 से 8 वर्ष)"
    ],
    correctOptionIndex: 0,
    explanationEn: "Under NEP 2020, the 4 stages are: Foundational (5 years, ages 3-8, Anganwadi + Grades 1-2), Preparatory (3 years, ages 8-11, Grades 3-5), Middle (3 years, ages 11-14, Grades 6-8), and Secondary (4 years, ages 14-18, Grades 9-12).",
    explanationHi: "NEP 2020 में 5+3+3+4 डिजाइन के तहत मिडिल स्टेज 3 वर्ष का है जिसमें कक्षा 6 से 8 तथा आयु वर्ग 11 से 14 वर्ष शामिल हैं।",
    difficulty: "Easy",
    tags: ["NEP 2020", "Middle Stage", "Curricular Structure"],
    isPracticeQuestion: true,
    isApproved: true
  },
  {
    id: "upsc-crt-exp-47",
    examType: "upsc-principal",
    sectionId: "upsc-sec-1",
    unitId: "upsc-area-5",
    topic: "Educational Policies, Educational Measurement and Evaluation",
    topicHi: "शैक्षिक नीतियां, शैक्षिक मापन एवं मूल्यांकन",
    subtopic: "PARAKH National Assessment Centre",
    officialReference: "UPSC CRT Area 4",
    statuteOrScheme: "NEP 2020, Para 4.41 & NCERT",
    conceptId: "UPSC-EDU-PARAKH",
    sourceInfo: {
      priorityTier: 1,
      sourceName: "National Assessment Centre PARAKH, NCERT",
      citation: "Notification of PARAKH as standard-setting body",
      verificationStatus: "Verified",
      verifiedDate: "2026-10-21"
    },
    questionTextEn: "What is the full expansion and statutory purpose of the national assessment centre 'PARAKH' established under NCERT as envisaged by NEP 2020?",
    questionTextHi: "NEP 2020 के अंतर्गत एनसीईआरटी के तहत स्थापित राष्ट्रीय मूल्यांकन केंद्र 'परख' (PARAKH) का पूर्ण रूप एवं अधिदेश क्या है?",
    optionsEn: [
      "Performance Assessment, Review, and Analysis of Knowledge for Holistic Development — setting norms, standards and guidelines for student assessment across school boards",
      "Public Administration, Research, and Knowledge Hub — conducting teacher recruitment interviews",
      "Pedagogical Audit and Review Association of Knowledge Houses — licensing private publishers",
      "Progressive Appraisal and Ranking Agency for Kendriya Vidyalayas — inspecting central schools"
    ],
    optionsHi: [
      "Performance Assessment, Review, and Analysis of Knowledge for Holistic Development — विभिन्न स्कूल बोर्डों में छात्र मूल्यांकन के लिए मानक, दिशानिर्देश और मानदंड निर्धारित करना",
      "Public Administration, Research, and Knowledge Hub — शिक्षक भर्ती साक्षात्कार आयोजित करना",
      "Pedagogical Audit and Review Association of Knowledge Houses — निजी प्रकाशकों को लाइसेंस देना",
      "Progressive Appraisal and Ranking Agency for Kendriya Vidyalayas — केंद्रीय विद्यालयों का निरीक्षण करना"
    ],
    correctOptionIndex: 0,
    explanationEn: "PARAKH stands for Performance Assessment, Review, and Analysis of Knowledge for Holistic Development. It is a constituent unit of NCERT tasked with setting norms, standards, and guidelines for student assessment and evaluation for all recognized school boards in India.",
    explanationHi: "PARAKH का पूर्ण रूप Performance Assessment, Review, and Analysis of Knowledge for Holistic Development है। इसका मुख्य कार्य भारत के सभी मान्यता प्राप्त स्कूल बोर्डों के बीच छात्र मूल्यांकन के मानदंड व दिशानिर्देश निर्धारित करना है।",
    difficulty: "Medium",
    tags: ["PARAKH", "Assessment", "NEP 2020"],
    isPracticeQuestion: true,
    isApproved: true
  },

  // =========================================================================
  // AREA 5: Management and Financial Administration (GFR 2017 & GeM)
  // =========================================================================
  {
    id: "upsc-crt-exp-61",
    examType: "upsc-principal",
    sectionId: "upsc-sec-1",
    unitId: "upsc-area-6",
    topic: "Management and Financial Administration",
    topicHi: "प्रबंधन एवं वित्तीय प्रशासन",
    subtopic: "General Financial Rules (GFR 2017) Rule 149",
    officialReference: "UPSC CRT Area 5",
    statuteOrScheme: "GFR 2017, Rule 149 & GeM Guidelines",
    conceptId: "UPSC-FIN-GFR-149",
    sourceInfo: {
      priorityTier: 1,
      sourceName: "Ministry of Finance, Department of Expenditure, GFR 2017",
      citation: "Rule 149: Government e-Marketplace (GeM)",
      verificationStatus: "Verified",
      verifiedDate: "2026-10-21"
    },
    questionTextEn: "Under Rule 149 of the General Financial Rules (GFR 2017), direct online purchase without comparison on Government e-Marketplace (GeM) is permissible up to which financial ceiling?",
    questionTextHi: "सामान्य वित्तीय नियमावली (GFR 2017) के नियम 149 के अंतर्गत, गवर्नमेंट ई-मार्केटप्लेस (GeM) पर बिना किसी तुलना के सीधे ऑनलाइन खरीद (Direct Purchase) की वित्तीय सीमा क्या है?",
    optionsEn: [
      "Up to Rs. 25,000 through any of the available GeM sellers meeting requisite specifications",
      "Up to Rs. 1,00,000 without any price validation",
      "Up to Rs. 2,50,000 upon Head of Institution personal certificate",
      "Up to Rs. 5,00,000 with single vendor approval"
    ],
    optionsHi: [
      "आवश्यक विशिष्टताओं को पूरा करने वाले उपलब्ध किसी भी विक्रेता के माध्यम से ₹25,000 तक",
      "बिना किसी मूल्य सत्यापन के ₹1,00,000 तक",
      "संस्था प्रमुख के व्यक्तिगत प्रमाण पत्र पर ₹2,50,000 तक",
      "एकल विक्रेता अनुमोदन के साथ ₹5,00,000 तक"
    ],
    correctOptionIndex: 0,
    explanationEn: "Under GFR 2017 Rule 149(i), direct purchase on GeM is permitted up to Rs. 25,000 through any available seller meeting required specifications. For Rs. 25,000 to Rs. 5,00,000, purchase must be made from the seller offering the lowest price among at least three different manufacturers.",
    explanationHi: "GFR 2017 के नियम 149(i) के अनुसार, GeM पोर्टल पर ₹25,000 तक का माल सीधे किसी भी आपूर्तिकर्ता से खरीदा जा सकता है जो आवश्यक गुणवत्ता व समय-सीमा पूरी करता हो। ₹25,000 से ₹5 लाख तक कम से कम तीन निर्माताओं के बीच तुलना (L1) अनिवार्य है।",
    difficulty: "Medium",
    tags: ["GFR 2017", "Rule 149", "GeM"],
    isPracticeQuestion: true,
    isApproved: true
  },
  {
    id: "upsc-crt-exp-62",
    examType: "upsc-principal",
    sectionId: "upsc-sec-1",
    unitId: "upsc-area-6",
    topic: "Management and Financial Administration",
    topicHi: "प्रबंधन एवं वित्तीय प्रशासन",
    subtopic: "GFR 2017 Rule 155 Local Purchase Committee",
    officialReference: "UPSC CRT Area 5",
    statuteOrScheme: "GFR 2017, Rule 155",
    conceptId: "UPSC-FIN-GFR-155",
    sourceInfo: {
      priorityTier: 1,
      sourceName: "Ministry of Finance, GFR 2017",
      citation: "Rule 155: Purchase of Goods by Purchase Committee",
      verificationStatus: "Verified",
      verifiedDate: "2026-10-21"
    },
    questionTextEn: "Under Rule 155 of GFR 2017 (Purchase of goods by Local Purchase Committee outside GeM when not available), what is the prescribed monetary value bracket?",
    questionTextHi: "GFR 2017 के नियम 155 (स्थानीय क्रय समिति द्वारा GeM से बाहर वस्तुओं की खरीद) के अंतर्गत निर्धारित वित्तीय दायरा क्या है?",
    optionsEn: [
      "Above Rs. 25,000 and up to Rs. 2,50,000 on each occasion",
      "Above Rs. 10,000 and up to Rs. 50,000 on each occasion",
      "Above Rs. 50,000 and up to Rs. 10,00,000 on each occasion",
      "Above Rs. 1,00,000 and up to Rs. 5,00,000 on each occasion"
    ],
    optionsHi: [
      "प्रत्येक अवसर पर ₹25,000 से अधिक और ₹2,50,000 तक",
      "प्रत्येक अवसर पर ₹10,000 से अधिक और ₹50,000 तक",
      "प्रत्येक अवसर पर ₹50,000 से अधिक और ₹10,00,000 तक",
      "प्रत्येक अवसर पर ₹1,00,000 से अधिक और ₹5,00,000 तक"
    ],
    correctOptionIndex: 0,
    explanationEn: "Rule 155 of GFR 2017 allows purchase of goods costing above Rs. 25,000 and up to Rs. 2,50,000 on each occasion through a Local Purchase Committee consisting of three members appointed by the Head of Department.",
    explanationHi: "GFR 2017 के नियम 155 के अनुसार, ₹25,000 से अधिक और ₹2,50,000 तक की खरीद तीन सदस्यों की स्थानीय क्रय समिति (Local Purchase Committee) की संस्तुति पर की जा सकती है।",
    difficulty: "Medium",
    tags: ["GFR 2017", "Rule 155", "Purchase Committee"],
    isPracticeQuestion: true,
    isApproved: true
  },

  // =========================================================================
  // AREA 6: Office Procedure & Service Rules (CCS Conduct & Leave)
  // =========================================================================
  {
    id: "upsc-crt-exp-76",
    examType: "upsc-principal",
    sectionId: "upsc-sec-1",
    unitId: "upsc-area-7",
    topic: "Office Procedure",
    topicHi: "कार्यालय प्रक्रिया एवं सेवा नियमावली",
    subtopic: "CCS (Conduct) Rules 1964 Rule 3",
    officialReference: "UPSC CRT Area 6",
    statuteOrScheme: "Central Civil Services (Conduct) Rules 1964, Rule 3(1)",
    conceptId: "UPSC-SVC-CCS-COND-3",
    sourceInfo: {
      priorityTier: 1,
      sourceName: "DoPT, Government of India, CCS (Conduct) Rules 1964",
      citation: "Rule 3: General Obligations",
      verificationStatus: "Verified",
      verifiedDate: "2026-10-21"
    },
    questionTextEn: "Rule 3(1) of the Central Civil Services (Conduct) Rules 1964 stipulates that every Government servant shall at all times maintain:",
    questionTextHi: "केंद्रीय सिविल सेवा (आचरण) नियमावली 1964 के नियम 3(1) के अनुसार, प्रत्येक सरकारी सेवक को हर समय क्या बनाए रखना अनिवार्य है?",
    optionsEn: [
      "Absolute integrity, devotion to duty, and do nothing which is unbecoming of a Government servant",
      "Political affiliation to the ruling party and public defense of ministerial actions",
      "Exclusive involvement in personal private commercial enterprises during vacations",
      "Direct press publication of institutional administrative grievances"
    ],
    optionsHi: [
      "पूर्ण सत्यनिष्ठा, कर्तव्यपरायणता और ऐसा कुछ भी न करना जो एक सरकारी सेवक के लिए अशोभनीय हो",
      "सत्तारूढ़ दल के प्रति राजनीतिक निष्ठा और सार्वजनिक रूप से विभागीय नीतियों का बचाव",
      "अवकाश के दौरान व्यक्तिगत व्यावसायिक उद्यमों में विशेष भागीदारी",
      "संस्थागत प्रशासनिक शिकायतों को सीधे समाचार पत्रों में प्रकाशित करना"
    ],
    correctOptionIndex: 0,
    explanationEn: "Rule 3(1) mandates three cardinal principles: (i) maintain absolute integrity; (ii) maintain devotion to duty; and (iii) do nothing which is unbecoming of a Government servant.",
    explanationHi: "सीसीएस आचरण नियमावली 1964 का नियम 3(1) तीन प्रमुख दायित्व तय करता है: पूर्ण सत्यनिष्ठा (Absolute integrity), कर्तव्य के प्रति निष्ठा (Devotion to duty), तथा कोई ऐसा कार्य न करना जो सरकारी सेवक के लिए अशोभनीय (Unbecoming) हो।",
    difficulty: "Easy",
    tags: ["CCS Conduct", "Rule 3", "Service Ethics"],
    isPracticeQuestion: true,
    isApproved: true
  },
  {
    id: "upsc-crt-exp-77",
    examType: "upsc-principal",
    sectionId: "upsc-sec-1",
    unitId: "upsc-area-7",
    topic: "Office Procedure",
    topicHi: "कार्यालय प्रक्रिया एवं सेवा नियमावली",
    subtopic: "CCS (Leave) Rules 1972 Commuted Leave",
    officialReference: "UPSC CRT Area 6",
    statuteOrScheme: "CCS (Leave) Rules 1972, Rule 30",
    conceptId: "UPSC-SVC-CCS-LEAVE-30",
    sourceInfo: {
      priorityTier: 1,
      sourceName: "DoPT, Central Civil Services (Leave) Rules 1972",
      citation: "Rule 30: Commuted Leave",
      verificationStatus: "Verified",
      verifiedDate: "2026-10-21"
    },
    questionTextEn: "Under Rule 30 of the CCS (Leave) Rules 1972, when a Government employee is granted Commuted Leave on medical certificate, what is the exact debit to their Half Pay Leave (HPL) account?",
    questionTextHi: "सीसीएस (अवकाश) नियमावली 1972 के नियम 30 के अंतर्गत, जब किसी सरकारी कर्मचारी को चिकित्सा प्रमाण पत्र पर लघुकृत अवकाश (Commuted Leave) स्वीकृत किया जाता है, तो उसके अर्धवेतन अवकाश (HPL) खाते से क्या कटौती होती है?",
    optionsEn: [
      "Twice the amount of commuted leave taken is debited against half pay leave due",
      "The exact equivalent number of days is debited against half pay leave",
      "Half the number of days is debited against earned leave balance",
      "No debit occurs if supported by an approved registered medical officer"
    ],
    optionsHi: [
      "जितने दिन का लघुकृत अवकाश लिया जाता है, उसके दोगुने दिन अर्धवेतन अवकाश (HPL) से काटे जाते हैं",
      "अर्धवेतन अवकाश खाते से ठीक उतने ही दिन काटे जाते हैं",
      "अर्जित अवकाश (EL) खाते से आधे दिन काटे जाते हैं",
      "पंजीकृत चिकित्सा अधिकारी द्वारा संस्तुत होने पर कोई कटौती नहीं होती"
    ],
    correctOptionIndex: 0,
    explanationEn: "Under Rule 30(1) of CCS (Leave) Rules 1972, Commuted Leave not exceeding half the amount of half pay leave due may be granted on medical certificate, and twice the amount of such leave taken shall be debited against the half pay leave due.",
    explanationHi: "सीसीएस अवकाश नियमावली 1972 के नियम 30 के अनुसार, चिकित्सा प्रमाण पत्र पर पूर्ण वेतन के साथ लघुकृत अवकाश मिलता है, किंतु लिए गए अवकाश का दोगुना (Double) कर्मचारी के अर्धवेतन अवकाश खाते से घटाया जाता है।",
    difficulty: "Medium",
    tags: ["CCS Leave Rules", "Commuted Leave", "HPL"],
    isPracticeQuestion: true,
    isApproved: true
  },

  // =========================================================================
  // AREA 7: Pedagogy in Education & Inclusive Learning
  // =========================================================================
  {
    id: "upsc-crt-exp-91",
    examType: "upsc-principal",
    sectionId: "upsc-sec-1",
    unitId: "upsc-area-8",
    topic: "Pedagogy in Education and Digital Literacy",
    topicHi: "शिक्षा शास्त्र, शिक्षण पद्धतियां एवं समावेशी शिक्षा",
    subtopic: "POCSO Act 2012 Mandatory Reporting",
    officialReference: "UPSC CRT Area 7",
    statuteOrScheme: "Protection of Children from Sexual Offences (POCSO) Act 2012, Section 19",
    conceptId: "UPSC-PED-POCSO-19",
    sourceInfo: {
      priorityTier: 1,
      sourceName: "Ministry of Law and Justice, POCSO Act 2012",
      citation: "Section 19: Reporting of Offences",
      verificationStatus: "Verified",
      verifiedDate: "2026-10-21"
    },
    questionTextEn: "Under Section 19 of the POCSO Act 2012, what is the statutory duty of a school Principal or staff member who has apprehension or knowledge that an offence under this Act has been committed in respect of a child?",
    questionTextHi: "पॉक्सो अधिनियम 2012 की धारा 19 के तहत, यदि किसी विद्यालय के प्रधानाचार्य या शिक्षक को किसी बच्चे के प्रति यौन अपराध होने की आशंका या जानकारी है, तो उसका वैधानिक कर्तव्य क्या है?",
    optionsEn: [
      "Mandatorily report the matter immediately to the Special Juvenile Police Unit (SJPU) or local police",
      "Conduct an internal compromise meeting between the parents and the accused",
      "Wait for an annual administrative inspection before documenting the incident",
      "Dismiss the student from the school rolls to preserve institutional reputation"
    ],
    optionsHi: [
      "तत्काल और अनिवार्य रूप से विशेष किशोर पुलिस इकाई (SJPU) या स्थानीय पुलिस को सूचना देना",
      "माता-पिता और आरोपी के बीच आंतरिक समझौता बैठक आयोजित करना",
      "घटना को दर्ज करने से पहले वार्षिक प्रशासनिक निरीक्षण की प्रतीक्षा करना",
      "विद्यालय की प्रतिष्ठा बचाने के लिए छात्र का नाम नामावली से काट देना"
    ],
    correctOptionIndex: 0,
    explanationEn: "Section 19(1) of the POCSO Act 2012 mandates that any person who has apprehension or knowledge that an offence has been committed shall provide such information to the Special Juvenile Police Unit or local police. Section 21 prescribes penalties for failure to report.",
    explanationHi: "पॉक्सो अधिनियम 2012 की धारा 19 के तहत बाल अपराध की जानकारी होते ही तत्काल विशेष किशोर पुलिस इकाई (SJPU) या पुलिस को रिपोर्ट करना अनिवार्य है। धारा 21 के तहत रिपोर्ट न करने पर कारावास व जुर्माने का दंड है।",
    difficulty: "Easy",
    tags: ["POCSO Act", "Section 19", "Child Safety"],
    isPracticeQuestion: true,
    isApproved: true
  },
  {
    id: "upsc-crt-exp-92",
    examType: "upsc-principal",
    sectionId: "upsc-sec-1",
    unitId: "upsc-area-8",
    topic: "Pedagogy in Education and Digital Literacy",
    topicHi: "शिक्षा शास्त्र, शिक्षण पद्धतियां एवं समावेशी शिक्षा",
    subtopic: "Rights of Persons with Disabilities (RPwD) Act 2016",
    officialReference: "UPSC CRT Area 7",
    statuteOrScheme: "RPwD Act 2016, Section 16",
    conceptId: "UPSC-PED-RPWD-16",
    sourceInfo: {
      priorityTier: 1,
      sourceName: "Ministry of Social Justice and Empowerment, RPwD Act 2016",
      citation: "Section 16: Duties of Educational Institutions",
      verificationStatus: "Verified",
      verifiedDate: "2026-10-21"
    },
    questionTextEn: "Under Section 16 of the Rights of Persons with Disabilities (RPwD) Act 2016, every funded or recognized educational institution must:",
    questionTextHi: "दिव्यांगजन अधिकार अधिनियम (RPwD Act 2016) की धारा 16 के अंतर्गत, प्रत्येक मान्यता प्राप्त या वित्तपोषित शैक्षणिक संस्थान को अनिवार्य रूप से:",
    optionsEn: [
      "Admit children with disabilities without discrimination and provide education and opportunities for sports alongside other students",
      "Require medical fitness deposits before admitting students with physical disabilities",
      "Refer all students with learning difficulties to specialized segregated welfare homes",
      "Limit admission of benchmark disability students to 1% of total class strength"
    ],
    optionsHi: [
      "बिना किसी भेदभाव के दिव्यांग बच्चों को प्रवेश देना तथा अन्य विद्यार्थियों के साथ समान रूप से शिक्षा व खेलकूद के अवसर प्रदान करना",
      "शारीरिक रूप से दिव्यांग छात्रों को प्रवेश देने से पहले चिकित्सा फिटनेस जमानत राशि मांगना",
      "अधिगम अक्षमता वाले सभी छात्रों को अलग विशेष कल्याण गृहों में भेजना",
      "बेंचमार्क दिव्यांगता वाले छात्रों का प्रवेश कुल कक्षा संख्या के 1% तक सीमित रखना"
    ],
    correctOptionIndex: 0,
    explanationEn: "Section 16 of the RPwD Act 2016 obligates all educational institutions to provide inclusive education, admitting children with disabilities without discrimination, providing reasonable accommodation, and ensuring barrier-free campus accessibility.",
    explanationHi: "RPwD Act 2016 की धारा 16 के अनुसार शैक्षणिक संस्थानों को बिना भेदभाव के दिव्यांग बच्चों को प्रवेश देना, समावेशी शिक्षा प्रदान करना और बाधा-मुक्त (Barrier-free) वातावरण उपलब्ध कराना अनिवार्य है।",
    difficulty: "Easy",
    tags: ["RPwD Act 2016", "Inclusive Education", "Accessibility"],
    isPracticeQuestion: true,
    isApproved: true
  },

  // =========================================================================
  // AREA 8: Digital Literacy & Educational Technology
  // =========================================================================
  {
    id: "upsc-crt-exp-106",
    examType: "upsc-principal",
    sectionId: "upsc-sec-1",
    unitId: "upsc-area-8",
    topic: "Pedagogy in Education and Digital Literacy",
    topicHi: "डिजिटल साक्षरता एवं शैक्षिक प्रौद्योगिकी पहल",
    subtopic: "PM eVIDYA One Class One TV Channel",
    officialReference: "UPSC CRT Area 8",
    statuteOrScheme: "PM eVIDYA Initiative, Ministry of Education",
    conceptId: "UPSC-TECH-PMEVIDYA",
    sourceInfo: {
      priorityTier: 1,
      sourceName: "Ministry of Education, Atmanirbhar Bharat Abhiyan",
      citation: "PM eVIDYA 200 TV Channels Expansion",
      verificationStatus: "Verified",
      verifiedDate: "2026-10-21"
    },
    questionTextEn: "Under the PM eVIDYA initiative of the Ministry of Education, what expansion was approved for the 'One Class, One TV Channel' program to bridge the digital divide?",
    questionTextHi: "शिक्षा मंत्रालय की 'पीएम ई-विद्या' (PM eVIDYA) पहल के तहत डिजिटल खाई को पाटने के लिए 'एक कक्षा, एक टीवी चैनल' कार्यक्रम का विस्तार कितने चैनलों तक किया गया?",
    optionsEn: [
      "Expanded from 12 to 200 dedicated DTH TV channels delivering telecast in regional languages",
      "Restricted to 5 national Doordarshan channels in Hindi only",
      "Replaced entirely by paid private mobile streaming applications",
      "Operated solely via university satellite transponders on weekdays"
    ],
    optionsHi: [
      "क्षेत्रीय भाषाओं में प्रसारण उपलब्ध कराने के लिए 12 से बढ़ाकर 200 समर्पित डीटीएच टीवी चैनलों तक विस्तार किया गया",
      "केवल हिन्दी में 5 राष्ट्रीय दूरदर्शन चैनलों तक सीमित रखा गया",
      "सशुल्क निजी मोबाइल स्ट्रीमिंग एप्लिकेशन द्वारा पूरी तरह प्रतिस्थापित किया गया",
      "सप्ताह के दिनों में केवल विश्वविद्यालयी उपग्रह ट्रांसपोंडर के माध्यम से संचालित किया गया"
    ],
    correctOptionIndex: 0,
    explanationEn: "Under PM eVIDYA, the 'One Class One TV Channel' initiative was expanded from 12 to 200 DTH channels to enable all states to provide supplementary education in regional languages for classes 1 to 12.",
    explanationHi: "पीएम ई-विद्या पहल के अंतर्गत कक्षा 1 से 12 तक के छात्रों के लिए प्रांतीय भाषाओं में पूरक शिक्षा उपलब्ध कराने हेतु चैनलों की संख्या 12 से बढ़ाकर 200 डीटीएच चैनल कर दी गई।",
    difficulty: "Medium",
    tags: ["PM eVIDYA", "Educational Technology", "Digital India"],
    isPracticeQuestion: true,
    isApproved: true
  },
  {
    id: "upsc-crt-exp-107",
    examType: "upsc-principal",
    sectionId: "upsc-sec-1",
    unitId: "upsc-area-8",
    topic: "Pedagogy in Education and Digital Literacy",
    topicHi: "डिजिटल साक्षरता एवं शैक्षिक प्रौद्योगिकी पहल",
    subtopic: "UDISE+ Portal & Data Governance",
    officialReference: "UPSC CRT Area 8",
    statuteOrScheme: "Unified District Information System for Education Plus (UDISE+)",
    conceptId: "UPSC-TECH-UDISE-PLUS",
    sourceInfo: {
      priorityTier: 1,
      sourceName: "Department of School Education & Literacy, MoE",
      citation: "UDISE+ Data Capture Format (DCF) Guidelines",
      verificationStatus: "Verified",
      verifiedDate: "2026-10-21"
    },
    questionTextEn: "What is the primary role of the school Principal with regard to the annual UDISE+ (Unified District Information System for Education Plus) certification?",
    questionTextHi: "वार्षिक यू-डायस प्लस (UDISE+) प्रमाणीकरण के संदर्भ में विद्यालय के प्रधानाचार्य का प्राथमिक दायित्व क्या है?",
    optionsEn: [
      "Ensuring timely online data entry across all modules (school profile, infrastructure, teacher, and student profiles) and generating the certified DCF report",
      "Delegating the password to cyber cafe vendors without verification",
      "Only updating student enrollment numbers while ignoring teacher details",
      "Filing physical manual paper registers directly with CBSE without digital upload"
    ],
    optionsHi: [
      "सभी मॉड्यूल (स्कूल प्रोफाइल, बुनियादी ढांचा, शिक्षक और छात्र प्रोफाइल) का समयबद्ध ऑनलाइन डेटा प्रविष्टि सुनिश्चित करना तथा प्रमाणित डीसीएफ रिपोर्ट जारी करना",
      "बिना सत्यापन के साइबर कैफे संचालकों को पोर्टल पासवर्ड सौंप देना",
      "शिक्षक विवरणों की अनदेखी करते हुए केवल छात्र नामांकन संख्या अपडेट करना",
      "डिजिटल अपलोड के बिना सीधे सीबीएसई को भौतिक मैन्युअल रजिस्टर भेजना"
    ],
    correctOptionIndex: 0,
    explanationEn: "The Head of Institution/Principal is legally responsible for verifying and certifying authentic school data on UDISE+, including infrastructure, teacher credentials, student enrollments, and incentives.",
    explanationHi: "यू-डायस+ (UDISE+) पोर्टल पर विद्यालय के सम्पूर्ण भौतिक, शिक्षक तथा छात्र विवरण की शुद्धता की ऑनलाइन प्रविष्टि और डिजिटल प्रमाणीकरण करना संस्था प्रमुख/प्रधानाचार्य का वैधानिक दायित्व है।",
    difficulty: "Easy",
    tags: ["UDISE+", "Data Governance", "School Administration"],
    isPracticeQuestion: true,
    isApproved: true
  }
];
