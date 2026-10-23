import { ExamSyllabusDatabase } from '../types/syllabus';
import { ExamType } from '../types/quiz';

export const OFFICIAL_SYLLABUS_DATABASE: Record<ExamType, ExamSyllabusDatabase> = {
  'upsc-principal': {
    examinationId: 'upsc-principal',
    officialTitleEn: 'UPSC Principal & Vice Principal Combined Recruitment Test (CRT)',
    officialTitleHi: 'संघ लोक सेवा आयोग प्राचार्य एवं उप-प्राचार्य संयुक्त भर्ती परीक्षा (CRT)',
    recruitingAuthority: 'Union Public Service Commission (UPSC)',
    officialNotificationRef: 'UPSC Advt. No. 07/2022 & Post-Specific CRT Syllabus Notification',
    totalPrescribedQuestions: 120,
    durationMinutes: 120,
    maximumMarks: 300,
    marksPerQuestion: 2.5,
    negativeMarkingFraction: 1 / 3, // -0.833333...
    hasOfficialSectionWiseCount: false,
    sections: [
      {
        id: 'upsc-sec-1',
        sectionNumber: 'I',
        titleEn: 'UPSC Principal Combined Recruitment Test (8 Prescribed Areas)',
        titleHi: 'संघ लोक सेवा आयोग प्राचार्य संयुक्त भर्ती परीक्षा (8 निर्धारित पाठ्यक्रम क्षेत्र)',
        prescribedQuestionCount: 120,
        units: [
          {
            id: 'upsc-area-1',
            unitNumber: 1,
            nameEn: 'General Knowledge',
            nameHi: 'सामान्य ज्ञान (समकालीन मुद्दे, समसामयिकी व सामान्य जागरूकता)',
            officialRef: 'UPSC CRT Syllabus Area 1',
            expectedQuestionCount: 15,
            subtopics: [
              { id: 'upsc-1-1', nameEn: 'Indian and world history, geography, polity and Constitution', nameHi: 'भारतीय एवं विश्व इतिहास, भूगोल, राजव्यवस्था एवं संविधान' },
              { id: 'upsc-1-2', nameEn: 'Economy, science, environment and contemporary social, economic and cultural issues', nameHi: 'अर्थव्यवस्था, विज्ञान, पर्यावरण एवं समकालीन सामाजिक, आर्थिक व सांस्कृतिक मुद्दे' },
              { id: 'upsc-1-3', nameEn: 'National and international current affairs, especially education-related developments', nameHi: 'राष्ट्रीय एवं अंतर्राष्ट्रीय समसामयिकी, विशेषकर शिक्षा क्षेत्र के विकास' }
            ]
          },
          {
            id: 'upsc-area-2',
            unitNumber: 2,
            nameEn: 'General Hindi',
            nameHi: 'सामान्य हिन्दी (व्याकरण, शब्दावली, वाक्य-शुद्धि व अपठित गद्यांश)',
            officialRef: 'UPSC CRT Syllabus Area 2',
            expectedQuestionCount: 15,
            subtopics: [
              { id: 'upsc-2-1', nameEn: 'व्याकरण, संधि, समास, उपसर्ग-प्रत्यय, पर्यायवाची-विलोम', nameHi: 'व्याकरण, संधि, समास, उपसर्ग-प्रत्यय, पर्यायवाची-विलोम' },
              { id: 'upsc-2-2', nameEn: 'मुहावरे-लोकोक्तियाँ, वाक्य-शुद्धि, शब्द-शुद्धि, शब्दावली', nameHi: 'मुहावरे-लोकोक्तियाँ, वाक्य-शुद्धि, शब्द-शुद्धि, शब्दावली' },
              { id: 'upsc-2-3', nameEn: 'अपठित गद्यांश और prescribed syllabus के अन्य भाषा-विषय', nameHi: 'अपठित गद्यांश और निर्धारित पाठ्यक्रम के अन्य भाषा-विषय' }
            ]
          },
          {
            id: 'upsc-area-3',
            unitNumber: 3,
            nameEn: 'General English',
            nameHi: 'सामान्य अंग्रेजी (Grammar, Vocabulary, Sentence Correction, Comprehension)',
            officialRef: 'UPSC CRT Syllabus Area 3',
            expectedQuestionCount: 15,
            subtopics: [
              { id: 'upsc-3-1', nameEn: 'Grammar, parts of speech, tenses, articles and prepositions', nameHi: 'Grammar, parts of speech, tenses, articles and prepositions' },
              { id: 'upsc-3-2', nameEn: 'Vocabulary, synonyms, antonyms and one-word substitution', nameHi: 'Vocabulary, synonyms, antonyms and one-word substitution' },
              { id: 'upsc-3-3', nameEn: 'Idioms, sentence correction, error detection and comprehension', nameHi: 'Idioms, sentence correction, error detection and comprehension' }
            ]
          },
          {
            id: 'upsc-area-4',
            unitNumber: 4,
            nameEn: 'Reasoning Ability and Quantitative Aptitude',
            nameHi: 'तार्किक क्षमता एवं संख्यात्मक अभिरुचि (Logical Reasoning, Quantitative Aptitude & DI)',
            officialRef: 'UPSC CRT Syllabus Area 4',
            expectedQuestionCount: 15,
            subtopics: [
              { id: 'upsc-4-1', nameEn: 'Logical & analytical reasoning (Analogy, Classification, Series, Coding-Decoding, Syllogism, Directions)', nameHi: 'तार्किक निष्कर्ष, सादृश्यता, श्रृंखला, कोडिंग-डिकोडिंग, न्यायवाक्य व दिशा ज्ञान' },
              { id: 'upsc-4-2', nameEn: 'Quantitative aptitude (Number system, ratio, percentage, average, profit & loss, work, time & distance)', nameHi: 'संख्या पद्धति, अनुपात, प्रतिशत, औसत, लाभ-हानि, समय व कार्य' },
              { id: 'upsc-4-3', nameEn: 'Data interpretation and numerical problem-solving', nameHi: 'आंकड़ा निर्वचन (DI) एवं प्रासंगिक संख्यात्मक समस्या समाधान' }
            ]
          },
          {
            id: 'upsc-area-5',
            unitNumber: 5,
            nameEn: 'Educational Policies, Educational Measurement and Evaluation',
            nameHi: 'शैक्षिक नीतियां, शैक्षिक मापन एवं मूल्यांकन (NEP 2020, RTE, Assessment)',
            officialRef: 'UPSC CRT Syllabus Area 5',
            expectedQuestionCount: 15,
            subtopics: [
              { id: 'upsc-5-1', nameEn: 'Applicable education policies, NEP 2020, RTE and relevant official frameworks', nameHi: 'प्रासंगिक शिक्षा नीतियां, NEP 2020, RTE एवं आधिकारिक रूपरेखाएं' },
              { id: 'upsc-5-2', nameEn: 'Assessment, measurement, evaluation and learning outcomes (CCE, PARAKH, HPC, Bloom Taxonomy)', nameHi: 'आकलन, मापन, मूल्यांकन एवं अधिगम प्रतिफल (CCE, PARAKH, HPC)' }
            ]
          },
          {
            id: 'upsc-area-6',
            unitNumber: 6,
            nameEn: 'Management and Financial Administration',
            nameHi: 'प्रबंधन एवं वित्तीय प्रशासन (CCS Rules, GFR 2017, GeM, Budgeting)',
            officialRef: 'UPSC CRT Syllabus Area 6',
            expectedQuestionCount: 15,
            subtopics: [
              { id: 'upsc-6-1', nameEn: 'School leadership, administration and personnel management', nameHi: 'विद्यालय नेतृत्व, प्रशासन एवं कार्मिक प्रबंधन' },
              { id: 'upsc-6-2', nameEn: 'Financial rules (GFR 2017), budgeting, procurement through GeM, PFMS, stock verification & cash book', nameHi: 'वित्तीय नियम (GFR 2017), बजट, GeM खरीद, PFMS, स्टॉक सत्यापन व कैश बुक' }
            ]
          },
          {
            id: 'upsc-area-7',
            unitNumber: 7,
            nameEn: 'Office Procedure',
            nameHi: 'कार्यालय प्रक्रिया (CSMOP, Noting & Drafting, Records, Official Procedures)',
            officialRef: 'UPSC CRT Syllabus Area 7',
            expectedQuestionCount: 15,
            subtopics: [
              { id: 'upsc-7-1', nameEn: 'Central Secretariat Manual of Office Procedure (CSMOP) - noting, drafting, docketing & file management', nameHi: 'केंद्रीय सचिवालय कार्यालय कार्यप्रणाली नियमावली (CSMOP) - नोटिंग व ड्राफ्टिंग' },
              { id: 'upsc-7-2', nameEn: 'CCS (Conduct) Rules 1964, CCS (CCA) Rules 1965, CCS (Leave) Rules 1972 & service books', nameHi: 'आचरण नियम (CCS Conduct 1964), अवकाश नियम 1972, सीसीए नियम 1965 व सेवा पुस्तिका' },
              { id: 'upsc-7-3', nameEn: 'Right to Information (RTI) Act 2005, POSH Act 2013 & records retention schedules', nameHi: 'सूचना का अधिकार अधिनियम 2005, कार्यस्थल महिला सुरक्षा (POSH) व रिकॉर्ड वर्गीकरण' }
            ]
          },
          {
            id: 'upsc-area-8',
            unitNumber: 8,
            nameEn: 'Pedagogy in Education and Digital Literacy',
            nameHi: 'शिक्षा शास्त्र एवं डिजिटल साक्षरता (Pedagogy, Psychology, ICT, Cyber Safety)',
            officialRef: 'UPSC CRT Syllabus Area 8',
            expectedQuestionCount: 15,
            subtopics: [
              { id: 'upsc-8-1', nameEn: 'Teaching-learning principles, educational psychology, cognitive theories & inclusive education', nameHi: 'शिक्षण-अधिगम सिद्धांत, शैक्षिक मनोविज्ञान, पियाजे-वाइगोत्स्की सिद्धांत एवं समावेशी शिक्षा' },
              { id: 'upsc-8-2', nameEn: 'ICT in education, computer fundamentals, DIKSHA, PM e-VIDYA, cyber safety & educational technology', nameHi: 'शैक्षिक आईसीटी, कंप्यूटर मूल बातें, दीक्षा, पीएम ई-विद्या, साइबर सुरक्षा एवं शैक्षिक तकनीक' }
            ]
          }
        ]
      }
    ]
  },

  'up-aided-principal': {
    examinationId: 'up-aided-principal',
    officialTitleEn: 'Uttar Pradesh Inter College Principal Written Examination',
    officialTitleHi: 'उत्तर प्रदेश अशासकीय सहायता प्राप्त इंटर कॉलेज प्रधानाचार्य लिखित परीक्षा',
    recruitingAuthority: 'UPSESSB / Uttar Pradesh Education Service Selection Commission (Prayagraj)',
    officialNotificationRef: 'Prescribed Written Examination Scheme: 120 Questions (Section I: 30, Section II: 30, Section III: 60)',
    totalPrescribedQuestions: 120,
    durationMinutes: 120,
    maximumMarks: 300,
    marksPerQuestion: 2.5,
    negativeMarkingFraction: 1 / 3, // deduction of one-third
    hasOfficialSectionWiseCount: true,
    sections: [
      {
        id: 'up-sec-1',
        sectionNumber: 'I',
        titleEn: 'Section I: General Studies, History, Polity, Geography, Science & ICT',
        titleHi: 'खंड I: सामान्य अध्ययन, इतिहास, राजव्यवस्था, भूगोल, सामान्य विज्ञान व सूचना प्रौद्योगिकी',
        prescribedQuestionCount: 30,
        units: [
          {
            id: 'up-unit-1',
            unitNumber: 1,
            nameEn: 'Unit 1: Current Affairs, National & International Events, Personalities & Sports',
            nameHi: 'इकाई 1: समसामयिक घटनाएं, राष्ट्रीय व अंतर्राष्ट्रीय परिदृश्य, प्रमुख व्यक्तित्व एवं खेलकूद',
            officialRef: 'UP Principal Syllabus Unit 1',
            expectedQuestionCount: 10,
            subtopics: [
              { id: 'up-1-1', nameEn: 'Major National and UP State Contemporary Events', nameHi: 'राष्ट्रीय एवं उत्तर प्रदेश राज्य समसामयिक घटनाएं' },
              { id: 'up-1-2', nameEn: 'International Summits, Treaties & Organizations', nameHi: 'अंतर्राष्ट्रीय सम्मेलन, संधियां व संगठन' },
              { id: 'up-1-3', nameEn: 'Eminent Personalities, Honors & National Awards', nameHi: 'प्रमुख व्यक्तित्व, सम्मान एवं राष्ट्रीय पुरस्कार' },
              { id: 'up-1-4', nameEn: 'Sports Events, Olympic, Asian, National Games & Trophies', nameHi: 'खेल परिदृश्य, ओलंपिक, एशियाई, राष्ट्रीय खेल व ट्रॉफियां' }
            ]
          },
          {
            id: 'up-unit-2',
            unitNumber: 2,
            nameEn: 'Unit 2: Indian History, Freedom Movement, Constitution, Polity, Economy, Geography & Population',
            nameHi: 'इकाई 2: भारतीय इतिहास, स्वतंत्रता आंदोलन, भारतीय संविधान, राजव्यवस्था, अर्थव्यवस्था, भूगोल व जनसंख्या',
            officialRef: 'UP Principal Syllabus Unit 2',
            expectedQuestionCount: 10,
            subtopics: [
              { id: 'up-2-1', nameEn: 'Indian National Movement & 1857 to 1947 Freedom Milestones', nameHi: 'भारतीय राष्ट्रीय आंदोलन एवं 1857 से 1947 के प्रमुख पड़ाव' },
              { id: 'up-2-2', nameEn: 'Indian Constitution: Preamble, Fundamental Rights, DPSP & Judicial System', nameHi: 'भारतीय संविधान: प्रस्तावना, मूल अधिकार, नीति-निदेशक तत्व व न्यायपालिका' },
              { id: 'up-2-3', nameEn: 'Indian & Uttar Pradesh Geography, Climate, Agriculture & Resources', nameHi: 'भारत एवं उत्तर प्रदेश का भूगोल, जलवायु, कृषि एवं प्राकृतिक संसाधन' },
              { id: 'up-2-4', nameEn: 'Indian Economy, Five-Year Legacy, NITI Aayog, Demography & Census Trends', nameHi: 'भारतीय अर्थव्यवस्था, नीति आयोग, जनसांख्यिकी व जनगणना प्रवृत्तियां' }
            ]
          },
          {
            id: 'up-unit-3',
            unitNumber: 3,
            nameEn: 'Unit 3: General Science, Environment, Human Health, Computer, Internet & Educational Technology',
            nameHi: 'इकाई 3: सामान्य विज्ञान, पर्यावरण, मानव स्वास्थ्य, कंप्यूटर व इंटरनेट प्रौद्योगिकी एवं शैक्षिक तकनीकी',
            officialRef: 'UP Principal Syllabus Unit 3',
            expectedQuestionCount: 10,
            subtopics: [
              { id: 'up-3-1', nameEn: 'Everyday General Science, Physics, Chemistry & Biology Applications', nameHi: 'दैनिक जीवन में सामान्य विज्ञान: भौतिक, रसायन व जीव विज्ञान' },
              { id: 'up-3-2', nameEn: 'Ecology, Biodiversity, Climate Change & Environmental Conservation', nameHi: 'पारिस्थितिकी, जैव-विविधता, जलवायु परिवर्तन व पर्यावरण संरक्षण' },
              { id: 'up-3-3', nameEn: 'Human Health, Nutrition, Epidemics, Immunization & First Aid', nameHi: 'मानव स्वास्थ्य, पोषण, संक्रामक रोग, टीकाकरण व प्राथमिक चिकित्सा' },
              { id: 'up-3-4', nameEn: 'Computer Basics, Internet, ICT in Classrooms & Educational Software Tools', nameHi: 'कंप्यूटर के मूल सिद्धांत, इंटरनेट, कक्षा में आईसीटी व शैक्षिक टूल्स' }
            ]
          }
        ]
      },
      {
        id: 'up-sec-2',
        sectionNumber: 'II',
        titleEn: 'Section II: Language Competence (General Hindi & General English)',
        titleHi: 'खंड II: भाषा दक्षता (सामान्य हिन्दी एवं सामान्य अंग्रेजी)',
        prescribedQuestionCount: 30,
        units: [
          {
            id: 'up-unit-4',
            unitNumber: 4,
            nameEn: 'Unit 4: General Hindi (सामान्य हिन्दी)',
            nameHi: 'इकाई 4: सामान्य हिन्दी (व्याकरण, वाक्य रचना, उपसर्ग, प्रत्यय, विलोम, पर्यायवाची, मुहावरे, लोकोक्तियाँ व पत्र लेखन)',
            officialRef: 'UP Principal Syllabus Unit 4',
            expectedQuestionCount: 15,
            subtopics: [
              { id: 'up-4-1', nameEn: 'हिन्दी व्याकरण: वर्णमाला, वर्तनी शुद्धि, संधि एवं समास', nameHi: 'हिन्दी व्याकरण: वर्णमाला, वर्तनी शुद्धि, संधि एवं समास' },
              { id: 'up-4-2', nameEn: 'शब्द भेद: संज्ञा, सर्वनाम, क्रिया, विशेषण, उपसर्ग व प्रत्यय', nameHi: 'शब्द भेद: संज्ञा, सर्वनाम, क्रिया, विशेषण, उपसर्ग व प्रत्यय' },
              { id: 'up-4-3', nameEn: 'शब्द संपदा: पर्यायवाची, विलोम शब्द, अनेकार्थी, तत्सम-तद्भव व वाक्यांश के लिए एक शब्द', nameHi: 'शब्द संपदा: पर्यायवाची, विलोम शब्द, अनेकार्थी, तत्सम-तद्भव व वाक्यांश के लिए एक शब्द' },
              { id: 'up-4-4', nameEn: 'वाक्य रचना, मुहावरे, लोकोक्तियाँ, संक्षेपण (Précis) एवं शासकीय व अर्द्धशासकीय पत्राचार', nameHi: 'वाक्य रचना, मुहावरे, लोकोक्तियाँ, संक्षेपण (Précis) एवं शासकीय व अर्द्धशासकीय पत्राचार' }
            ]
          },
          {
            id: 'up-unit-5',
            unitNumber: 5,
            nameEn: 'Unit 5: General English',
            nameHi: 'इकाई 5: सामान्य अंग्रेजी (व्याकरण, शब्दावली, मुहावरे, वाक्य रूपांतरण व त्रुटि संशोधन)',
            officialRef: 'UP Principal Syllabus Unit 5',
            expectedQuestionCount: 15,
            subtopics: [
              { id: 'up-5-1', nameEn: 'English Prepositions, Conjunctions, Articles & Parts of Speech', nameHi: 'Prepositions, Conjunctions, Articles and Parts of Speech' },
              { id: 'up-5-2', nameEn: 'Vocabulary: Synonyms, Antonyms, One-Word Substitutions & Spelling Rules', nameHi: 'Synonyms, Antonyms, One-Word Substitutions and Spelling Rules' },
              { id: 'up-5-3', nameEn: 'Idioms and Phrases, Phrasal Verbs & Common Linguistic Errors', nameHi: 'Idioms and Phrases, Phrasal Verbs and Common Errors' },
              { id: 'up-5-4', nameEn: 'Sentence Transformation: Active/Passive Voice, Direct/Indirect Speech, Sequencing & Punctuation', nameHi: 'Voice, Narration, Sentence Sequencing and Punctuation' }
            ]
          }
        ]
      },
      {
        id: 'up-sec-3',
        sectionNumber: 'III',
        titleEn: 'Section III: Educational Leadership, UP Acts, Administration, Finance & Schemes',
        titleHi: 'खंड III: शैक्षिक नेतृत्व, उप्र माध्यमिक शिक्षा अधिनियम, विद्यालय प्रशासन, वित्तीय नियम एवं योजनाएं',
        prescribedQuestionCount: 60,
        units: [
          {
            id: 'up-unit-6',
            unitNumber: 6,
            nameEn: 'Unit 6: Development of Education in Pre & Post-Independence India, Educational Thinkers & National Policies',
            nameHi: 'इकाई 6: स्वतंत्रता पूर्व व पश्चात भारत में शिक्षा का विकास, शैक्षिक विचारक एवं राष्ट्रीय शिक्षा नीतियां',
            officialRef: 'UP Principal Syllabus Unit 6',
            expectedQuestionCount: 10,
            subtopics: [
              { id: 'up-6-1', nameEn: 'Charter Act 1813, Macaulay Minute 1835, Wood\'s Despatch 1854 & Hunter Commission 1882', nameHi: 'चार्टर एक्ट 1813, मैकाले मिनट 1835, वुड्स डिस्पैच 1854 व हंटर आयोग 1882' },
              { id: 'up-6-2', nameEn: 'Sadler Commission 1917, Hartog Committee 1929, Wardha Basic Scheme 1937 & Princely States', nameHi: 'सैडलर आयोग 1917, हार्टोग समिति 1929, वर्धा बुनियादी शिक्षा 1937 व देशी रियासतें' },
              { id: 'up-6-3', nameEn: 'Educational Thinkers: Gandhi, Nehru, Tagore, Swami Vivekananda & Dr. B.R. Ambedkar', nameHi: 'शैक्षिक विचारक: महात्मा गांधी, नेहरू, टैगोर, स्वामी विवेकानंद व डॉ. भीमराव आंबेडकर' },
              { id: 'up-6-4', nameEn: 'Post-Independence: Radhakrishnan, Mudaliar, Kothari Commission 1964-66, NPE 1986 & NEP 2020', nameHi: 'स्वतंत्रता पश्चात: मुदालियर, कोठारी आयोग 1964-66, राष्ट्रीय शिक्षा नीति 1986 व एनईपी 2020' }
            ]
          },
          {
            id: 'up-unit-7',
            unitNumber: 7,
            nameEn: 'Unit 7: Uttar Pradesh Intermediate Education Act 1921, Associated Acts, UP Board (UPMSP) & Directorates',
            nameHi: 'इकाई 7: उत्तर प्रदेश इंटरमीडिएट शिक्षा अधिनियम 1921, संबद्ध अधिनियम, माध्यमिक शिक्षा परिषद (UPMSP) व निदेशालय',
            officialRef: 'UP Principal Syllabus Unit 7',
            expectedQuestionCount: 8,
            subtopics: [
              { id: 'up-7-1', nameEn: 'UP Intermediate Education Act 1921 Structure, Chapters, Regulations & Powers of UP Board', nameHi: 'उप्र इंटरमीडिएट शिक्षा अधिनियम 1921 की संरचना, अध्याय, विनियम व परिषद की शक्तियां' },
              { id: 'up-7-2', nameEn: 'Chapter II & III: Service Conditions of Teachers, Appointment, Dismissal & Suspension Approval', nameHi: 'अध्याय II व III: अध्यापकों की सेवा शर्तें, नियुक्ति, निलंबन व पदच्युति अनुमोदन' },
              { id: 'up-7-3', nameEn: 'Role of DIOS (जिला विद्यालय निरीक्षक), Regional Joint Directors (JDA) & Directorate of Education', nameHi: 'जिला विद्यालय निरीक्षक (DIOS), क्षेत्रीय संयुक्त शिक्षा निदेशक (JDA) व शिक्षा निदेशालय' },
              { id: 'up-7-4', nameEn: 'Scheme of Administration (प्रबंध योजना), Committee of Management & Approval Guidelines', nameHi: 'संस्था की प्रबंध योजना (Scheme of Administration), प्रबंध समिति व अनुमोदन नियम' }
            ]
          },
          {
            id: 'up-unit-8',
            unitNumber: 8,
            nameEn: 'Unit 8: Role and Responsibilities of the Principal, Leadership & Resource Management',
            nameHi: 'इकाई 8: प्रधानाचार्य की भूमिका एवं दायित्व, शैक्षिक नेतृत्व, पर्यवेक्षण व संसाधन प्रबंधन',
            officialRef: 'UP Principal Syllabus Unit 8',
            expectedQuestionCount: 6,
            subtopics: [
              { id: 'up-8-1', nameEn: 'Principal as Academic, Administrative & Community Leader (संस्था प्रमुख के दायित्व)', nameHi: 'संस्था प्रमुख के रूप में शैक्षिक, प्रशासनिक व सामुदायिक नेतृत्व' },
              { id: 'up-8-2', nameEn: 'Supervision of Instruction, Pedagogical Mentoring & Teacher Professional Development', nameHi: 'शिक्षण का पर्यवेक्षण, शैक्षणिक मार्गदर्शन व अध्यापकों का सतत व्यावसायिक विकास' },
              { id: 'up-8-3', nameEn: 'Decision Making, Staff Motivation, Delegation, Conflict Resolution & Crisis Management', nameHi: 'निर्णयन प्रक्रिया, स्टाफ अभिप्रेरणा, कार्य विभाजन, संघर्ष समाधान व आपदा प्रबंधन' },
              { id: 'up-8-4', nameEn: 'Physical, Human & Infrastructure Resource Mobilization and Maintenance', nameHi: 'भौतिक, मानवीय व अवसंरचनात्मक संसाधनों का प्रबंधन व अनुरक्षण' }
            ]
          },
          {
            id: 'up-unit-9',
            unitNumber: 9,
            nameEn: 'Unit 9: Educational Administration, Academic Planning, School Calendar, Clubs & Quality Assurance',
            nameHi: 'इकाई 9: शैक्षिक प्रशासन, अकादमिक नियोजन, विद्यालय कैलेंडर, क्लब, समय सारिणी व गुणवत्ता संवर्धन',
            officialRef: 'UP Principal Syllabus Unit 9',
            expectedQuestionCount: 6,
            subtopics: [
              { id: 'up-9-1', nameEn: 'School Annual Academic Calendar, Timetable Construction & Curriculum Distribution', nameHi: 'विद्यालय का वार्षिक अकादमिक कैलेंडर, समय सारिणी निर्माण व पाठ्यचर्या विभाजन' },
              { id: 'up-9-2', nameEn: 'Subject Clubs, Science Clubs, Eco Clubs, Literary Activities & Morning Assemblies', nameHi: 'विषय क्लब, विज्ञान क्लब, इको क्लब, साहित्यिक गतिविधियां व प्रातःकालीन प्रार्थना सभा' },
              { id: 'up-9-3', nameEn: 'Lesson Planning, Unit Plans, Teacher Diaries & Continuous Learning Assessment', nameHi: 'पाठ योजना, इकाई योजना, शिक्षक दैनंदिनी व सतत अधिगम मूल्यांकन' },
              { id: 'up-9-4', nameEn: 'Teacher In-Service Training, SCERT / DIET Programs & Quality Benchmarking', nameHi: 'शिक्षकों का सेवारत प्रशिक्षण, एससीईआरटी/डायट कार्यक्रम व गुणवत्ता मानक' }
            ]
          },
          {
            id: 'up-unit-10',
            unitNumber: 10,
            nameEn: 'Unit 10: Office Administration, Records, RTI Act 2005, Workplace Safety & Minority Rights',
            nameHi: 'इकाई 10: कार्यालय प्रशासन, अभिलेख प्रबंधन, सूचना का अधिकार 2005, कार्यस्थल सुरक्षा व अल्पसंख्यक अधिकार',
            officialRef: 'UP Principal Syllabus Unit 10',
            expectedQuestionCount: 8,
            subtopics: [
              { id: 'up-10-1', nameEn: 'School Record Maintenance: Scholar Register (SR), Admission-Withdrawal, TC & Service Books', nameHi: 'विद्यालय अभिलेख: छात्र पंजिका (SR), प्रवेश-निकास पंजिका, टीसी व सेवा पुस्तिका' },
              { id: 'up-10-2', nameEn: 'Right to Information (RTI) Act 2005: Public Information Officer Duties & Timelines', nameHi: 'सूचना का अधिकार अधिनियम 2005: जन सूचना अधिकारी के दायित्व व समय सीमाएं' },
              { id: 'up-10-3', nameEn: 'Rights of Persons with Disabilities (RPwD) Act 2016 & POSH Act 2013 Internal Complaints Committee', nameHi: 'दिव्यांगजन अधिकार कानून 2016 व कार्यस्थल पर महिला उत्पीड़न संरक्षण (POSH) आंतरिक समिति' },
              { id: 'up-10-4', nameEn: 'Article 30 of Indian Constitution & Special Statutory Provisions for Recognized Minority Institutions', nameHi: 'अनुच्छेद 30 एवं मान्यता प्राप्त अल्पसंख्यक शिक्षण संस्थाओं के विशेष कानूनी प्रावधान' }
            ]
          },
          {
            id: 'up-unit-11',
            unitNumber: 11,
            nameEn: 'Unit 11: School Financial Administration, Budgeting, PFMS, GeM, Salaries Act 1971 & Accounts',
            nameHi: 'इकाई 11: विद्यालय वित्तीय प्रशासन, बजट, पीएफएमएस, जेम, उप्र वेतन भुगतान अधिनियम 1971 व लेखा प्रणाली',
            officialRef: 'UP Principal Syllabus Unit 11',
            expectedQuestionCount: 8,
            subtopics: [
              { id: 'up-11-1', nameEn: 'UP High Schools & Intermediate Colleges (Payment of Salaries of Teachers) Act 1971', nameHi: 'उत्तर प्रदेश हाईस्कूल तथा इंटरमीडिएट कॉलेज (अध्यापकों के वेतन का भुगतान) अधिनियम 1971' },
              { id: 'up-11-2', nameEn: 'Joint Bank Account Operations (प्रधानाचार्य व प्रबंधक संयुक्त खाता) & Maintenance Grant Rules', nameHi: 'प्रधानाचार्य व प्रबंधक संयुक्त खाता संचालन व अनुरक्षण अनुदान नियम' },
              { id: 'up-11-3', nameEn: 'School Budgeting, Cash Book Maintenance, Vouchers, TA Rules & Financial Handbook', nameHi: 'विद्यालय बजट, रोकड़ बही (Cash Book), वाउचर, यात्रा भत्ता नियम व वित्तीय हस्तपुस्तिका' },
              { id: 'up-11-4', nameEn: 'PFMS Digital Payments, GeM Portal Procurement, GST, TDS, NPS & Pension Records', nameHi: 'पीएफएमएस भुगतान, GeM खरीद, जीएसटी, टीडीएस, एनपीएस व पेंशन अभिलेख' }
            ]
          },
          {
            id: 'up-unit-12',
            unitNumber: 12,
            nameEn: 'Unit 12: Education Schemes & Flagship Programmes in Uttar Pradesh & Centre',
            nameHi: 'इकाई 12: उत्तर प्रदेश एवं केंद्र सरकार की प्रमुख शैक्षिक योजनाएं, कार्यक्रम व प्रोत्साहन',
            officialRef: 'UP Principal Syllabus Unit 12',
            expectedQuestionCount: 14,
            subtopics: [
              { id: 'up-12-1', nameEn: 'PM POSHAN / Mid-Day Meal Scheme: Nutritive Norms, Tithi Bhojan & Kitchen Gardens', nameHi: 'पीएम पोषण / मध्याह्न भोजन योजना: पोषण मानक, तिथि भोजन व किचन गार्डन' },
              { id: 'up-12-2', nameEn: 'Project Alankar (उत्तर प्रदेश सहायता प्राप्त विद्यालयों का जीर्णोद्धार व अवसंरचना सुधार)', nameHi: 'प्रोजेक्ट अलंकार: अशासकीय सहायता प्राप्त विद्यालयों का अवसंरचना सुदृढ़ीकरण' },
              { id: 'up-12-3', nameEn: 'Operation Kayakalp (ऑपरेशन कायाकल्प) 19 Mandated Quality Benchmarks in Schools', nameHi: 'ऑपरेशन कायाकल्प के 19 निर्धारित बुनियादी अवस्थापना मानक' },
              { id: 'up-12-4', nameEn: 'NIPUN Bharat Mission & Foundational Literacy and Numeracy (FLN) Goals in UP', nameHi: 'निपुण भारत मिशन एवं उत्तर प्रदेश में बुनियादी साक्षरता व संख्याज्ञान लक्ष्य' },
              { id: 'up-12-5', nameEn: 'School Chalo Abhiyan, Sharda (Out of School Children Tracking) & Scholarship Schemes', nameHi: 'स्कूल चलो अभियान, शारदा (आउट ऑफ स्कूल बच्चे) व छात्रवृत्ति योजनाएं' },
              { id: 'up-12-6', nameEn: 'Co-Curricular: NCC, NSS, Bharat Scouts and Guides, Youth Empowerment & State Teacher Awards', nameHi: 'एनसीसी, एनएसएस, भारत स्काउट गाइड, स्वामी विवेकानंद युवा सशक्तिकरण व राज्य शिक्षक पुरस्कार' }
            ]
          }
        ]
      }
    ]
  },
  'up-technical-principal': {
    examinationId: 'up-technical-principal',
    officialTitleEn: 'UP Technical Education (Polytechnic) Principal Examination',
    officialTitleHi: 'उ.प्र. प्राविधिक शिक्षा (पॉलिटेक्निक) प्रधानाचार्य परीक्षा',
    recruitingAuthority: 'Uttar Pradesh Public Service Commission (UPPSC)',
    officialNotificationRef: 'UPPSC Advt. No. A-7/E-1/2021 & AICTE Act 1987 Norms',
    totalPrescribedQuestions: 120,
    durationMinutes: 120,
    maximumMarks: 300,
    marksPerQuestion: 2.5,
    negativeMarkingFraction: 1 / 3,
    hasOfficialSectionWiseCount: false,
    sections: [
      {
        id: 'tech-sec-1',
        sectionNumber: 'I',
        titleEn: 'Technical Education Governance, Polytechnic Administration & Finance',
        titleHi: 'प्राविधिक शिक्षा अभिशासन, पॉलिटेक्निक प्रशासन एवं संस्थागत वित्त',
        prescribedQuestionCount: 120,
        units: [
          {
            id: 'tech-governance',
            unitNumber: 1,
            nameEn: 'AICTE Norms & Technical Education Governance',
            nameHi: 'एआईसीटीई मानक व प्राविधिक शिक्षा अभिशासन',
            officialRef: 'AICTE Act 1987 & Approval Process Handbook',
            expectedQuestionCount: 25,
            subtopics: [
              { id: 'tech-1-1', nameEn: 'Faculty-to-Student Ratio (1:25) & Cadre Norms for Diploma Institutions', nameHi: 'डिप्लोमा संस्थानों हेतु संकाय-छात्र अनुपात (1:25) व संवर्ग मानक' },
              { id: 'tech-1-2', nameEn: 'Mandatory Institutional Committees (Anti-Ragging, ICC, SGRC, SC/ST Cell)', nameHi: 'अनिवार्य संस्थागत समितियां (रैगिंग रोधी, आंतरिक शिकायत, छात्र शिकायत, एससी/एसटी प्रकोष्ठ)' },
              { id: 'tech-1-3', nameEn: 'AICTE Extension of Approval (EoA) & Land/Infrastructure Norms', nameHi: 'एआईसीटीई अनुमोदन विस्तार (EoA) व भूमि/अवस्थापना मानक' }
            ]
          },
          {
            id: 'polytechnic-admin',
            unitNumber: 2,
            nameEn: 'UP Polytechnic Institutional Administration',
            nameHi: 'उप्र पॉलिटेक्निक संस्थागत प्रशासन',
            officialRef: 'UP Pravidhik Shiksha Adhiniyam, 1962 & BTEUP Regulations',
            expectedQuestionCount: 25,
            subtopics: [
              { id: 'tech-2-1', nameEn: 'Board of Technical Education UP (BTEUP) Regulations & Exam Conduct', nameHi: 'प्राविधिक शिक्षा परिषद उप्र (BTEUP) नियमावली व परीक्षा संचालन' },
              { id: 'tech-2-2', nameEn: 'UP Technical Education Gazetted Service Rules & Leave/Discipline', nameHi: 'उप्र प्राविधिक शिक्षा राजपत्रित सेवा नियमावली, अवकाश व अनुशासन' },
              { id: 'tech-2-3', nameEn: 'Student Welfare, Hostel Administration & Workshop Safety Standards', nameHi: 'छात्र कल्याण, छात्रावास प्रशासन व कार्यशाला सुरक्षा मानक' }
            ]
          },
          {
            id: 'tech-financial',
            unitNumber: 3,
            nameEn: 'Technical Institutional Budget & State Financial Rules',
            nameHi: 'संस्थागत वित्तीय बजट व राज्य वित्तीय नियमावली',
            officialRef: 'UP Financial Handbook & Treasury Rules for Technical Institutions',
            expectedQuestionCount: 25,
            subtopics: [
              { id: 'tech-3-1', nameEn: 'State Budget Head Allocation & Institutional Maintenance Grants', nameHi: 'राज्य बजट मद आवंटन व संस्थागत अनुरक्षण अनुदान' },
              { id: 'tech-3-2', nameEn: 'GeM Portal Procurement & General Financial Rules (GFR 2017)', nameHi: 'GeM पोर्टल क्रय व सामान्य वित्तीय नियम (GFR 2017)' },
              { id: 'tech-3-3', nameEn: 'Laboratory Equipment Stock Verification & Audit Objections Resolution', nameHi: 'प्रयोगशाला उपकरण स्टॉक भौतिक सत्यापन व लेखा आपत्ति निस्तारण' }
            ]
          },
          {
            id: 'nba-curriculum',
            unitNumber: 4,
            nameEn: 'NBA Accreditation, Curriculum Design & Industry Linkages',
            nameHi: 'एनबीए प्रत्यायन, पाठ्यचर्या डिजाइन व उद्योग साझेदारी',
            officialRef: 'NBA Tier-II Diploma Manual & Apprentices Act 1961',
            expectedQuestionCount: 25,
            subtopics: [
              { id: 'tech-4-1', nameEn: 'NBA Tier-II Diploma Criteria & Outcome-Based Education (PEOs, POs, COs)', nameHi: 'एनबीए टियर-II डिप्लोमा मानक व परिणाम-आधारित शिक्षा (PEOs, POs, COs)' },
              { id: 'tech-4-2', nameEn: 'National Apprenticeship Training Scheme (NATS) & Apprentices Act 1961', nameHi: 'राष्ट्रीय शिक्षुता प्रशिक्षण योजना (NATS) व शिक्षुता अधिनियम 1961' },
              { id: 'tech-4-3', nameEn: 'Industry Advisory Board, MoUs & Polytechnic Placement Cells', nameHi: 'उद्योग सलाहकार बोर्ड, समझौता ज्ञापन (MoUs) व प्लेसमेंट सेल' }
            ]
          },
          {
            id: 'general-aptitude',
            unitNumber: 5,
            nameEn: 'Administrative Aptitude & Educational Technology',
            nameHi: 'प्रशासनिक अभिक्षमता एवं शैक्षणिक प्रौद्योगिकी',
            officialRef: 'National e-Governance & Educational Technology Initiatives',
            expectedQuestionCount: 20,
            subtopics: [
              { id: 'tech-5-1', nameEn: 'Digital Smart Classrooms, Virtual Labs & SWAYAM/NPTEL Technical Courses', nameHi: 'डिजिटल स्मार्ट कक्षाएं, वर्चुअल लैब व स्वयं/एनपीटीईएल तकनीकी पाठ्यक्रम' },
              { id: 'tech-5-2', nameEn: 'Institutional Leadership, Conflict Resolution & Faculty Performance Appraisal', nameHi: 'संस्थागत नेतृत्व, विवाद समाधान व संकाय प्रदर्शन मूल्यांकन' }
            ]
          }
        ]
      }
    ]
  },
  get 'uppcs-principal'() {
    return this['up-aided-principal'];
  }
};
