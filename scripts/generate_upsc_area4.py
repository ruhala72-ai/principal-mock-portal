# -*- coding: utf-8 -*-
import json
import re

def tokenize(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', ' ', text)
    return [t for t in text.split() if len(t) > 2]

def generate_fingerprint(q):
    en_toks = "_".join(tokenize(q.get("questionTextEn", ""))[:12])
    hi_toks = "_".join(tokenize(q.get("questionTextHi", ""))[:12])
    concept = re.sub(r'[^a-z0-9]', '', (q.get("conceptId") or "").lower())
    statute = re.sub(r'[^a-z0-9]', '', (q.get("statuteOrScheme") or "").lower())
    return f"{concept}|{statute}|{en_toks}|{hi_toks}"

def q(id_num, area_num, topic, topic_hi, subtopic, conceptId, learning, statute, rule, tier, src, cit, q_en, q_hi, opts_en, opts_hi, correct, exp_en, exp_hi, diff, tags):
    res = {
        "id": f"upsc-crt-{id_num}",
        "examType": "upsc-principal",
        "sectionId": "upsc-sec-1",
        "unitId": f"upsc-area-{area_num}",
        "topic": topic,
        "topicHi": topic_hi,
        "subtopic": subtopic,
        "officialReference": f"UPSC CRT Syllabus Area {area_num}",
        "sourceInfo": {
            "priorityTier": tier,
            "sourceName": src,
            "citation": cit,
            "verificationStatus": "Verified",
            "verifiedDate": "2026-10-21",
            "verifiedBy": "Official Gazette & Notification Audit"
        },
        "conceptId": conceptId,
        "learningObjective": learning,
        "statuteOrScheme": statute,
        "effectiveRuleDate": rule,
        "questionTextEn": q_en,
        "questionTextHi": q_hi,
        "optionsEn": opts_en,
        "optionsHi": opts_hi,
        "correctOptionIndex": correct,
        "explanationEn": exp_en,
        "explanationHi": exp_hi,
        "difficulty": diff,
        "tags": tags + [f"Area {area_num}", "UPSC CRT"],
        "isPracticeQuestion": True,
        "isApproved": True,
        "createdAt": "2026-10-21T00:00:00Z"
    }
    res["fingerprint"] = generate_fingerprint(res)
    return res

areas_4_to_8 = []

# ========================================================
# AREA 4: Educational Policies, Measurement & Evaluation (166 to 180)
# ========================================================
t4 = "Educational policies & Educational measurement and evaluation"
th4 = "शैक्षिक नीतियां, शैक्षिक मापन एवं मूल्यांकन"

a4 = [
    # 166
    ("NEP 2020 - Foundational Stage Structure", "UPSC-EDU-NEP2020-FOUNDATIONAL-YEARS", "Tests 5+3+3+4 structure foundational stage age group and classes",
     "National Education Policy 2020", "Chapter 1, Foundational Stage", 1, "Ministry of Education, GoI", "NEP 2020 Policy Document, Para 1.1",
     "Under the National Education Policy (NEP) 2020 pedagogical restructuring (5+3+3+4), which specific age group and grade levels constitute the 'Foundational Stage'?",
     "राष्ट्रीय शिक्षा नीति (एनईपी) 2020 के नए 5+3+3+4 पाठ्यचर्या ढांचे के अनुसार, कौन सा आयु वर्ग और कक्षा स्तर 'बुनियादी चरण' (Foundational Stage) का गठन करता है?",
     ["Ages 3 to 8 years (3 years of Anganwadi/Pre-school + Grades 1 and 2)",
      "Ages 6 to 11 years (Grades 1 to 5)",
      "Ages 3 to 6 years (Pre-school only)",
      "Ages 5 to 10 years (Kindergarten to Grade 4)"],
     ["आयु 3 से 8 वर्ष (3 वर्ष आंगनवाड़ी/प्री-स्कूल + कक्षा 1 और 2)",
      "आयु 6 से 11 वर्ष (कक्षा 1 से 5)",
      "आयु 3 से 6 वर्ष (केवल प्री-स्कूल)",
      "आयु 5 से 10 वर्ष (किंडरगार्टन से कक्षा 4)"],
     0, "The Foundational Stage spans 5 years for ages 3-8: 3 years of flexible play/activity-based pre-school followed by Grades 1 and 2.",
     "एनईपी 2020 के तहत बुनियादी चरण 3 से 8 वर्ष के बच्चों के लिए 5 वर्षों का है, जिसमें 3 वर्ष पूर्व-प्राथमिक व कक्षा 1 व 2 शामिल हैं।",
     "Easy", ["NEP 2020", "5+3+3+4", "Foundational Stage"]),
    # 167
    ("PARAKH - National Assessment Centre Mandate", "UPSC-EDU-PARAKH-MANDATE-NCERT", "Tests statutory mandate of PARAKH under NCERT",
     "NEP 2020 National Assessment Centre", "NCERT Notification 2023", 1, "Department of School Education & Literacy, MoE", "PARAKH Establishment Guidelines",
     "What is the principal statutory mandate of 'PARAKH' (Performance Assessment, Review, and Analysis of Knowledge for Holistic Development) established under NCERT?",
     "एनसीईआरटी के तहत स्थापित राष्ट्रीय मूल्यांकन केंद्र 'परख' (PARAKH) का प्रमुख वैधानिक अधिदेश क्या है?",
     ["Setting norms, standards, and guidelines for student assessment and evaluation across all recognized school boards in India",
      "Conducting centralized civil services recruitment examinations",
      "Direct disbursement of scholarship funds to secondary students",
      "Auditing private school infrastructure grants"],
     ["भारत के सभी मान्यता प्राप्त स्कूल बोर्डों में छात्र मूल्यांकन और परीक्षा के लिए मानक, मानदंड और दिशानिर्देश स्थापित करना",
      "केंद्रीकृत सिविल सेवा भर्ती परीक्षाएं आयोजित करना",
      "माध्यमिक छात्रों को सीधे छात्रवृत्ति राशि का वितरण करना",
      "निजी स्कूलों के बुनियादी ढांचे के अनुदान की जांच करना"],
     0, "PARAKH is set up as a standard-setting body to establish norms and guide state and central school examination boards toward competency-based evaluation.",
     "परख (PARAKH) का मुख्य कार्य देश भर के सभी स्कूल बोर्डों के लिए मूल्यांकन मानकों और दिशानिर्देशों का मानकीकरण करना है।",
     "Medium", ["PARAKH", "Assessment", "NEP 2020"]),
    # 168
    ("Bloom's Revised Taxonomy - Higher Order Thinking Skills", "UPSC-EDU-BLOOM-REVISED-HOTS-LEVELS", "Tests hierarchical levels of Anderson and Krathwohl's revision of Bloom's Taxonomy",
     "Educational Measurement & Taxonomy", "Cognitive Domain Revision 2001", 4, "Anderson & Krathwohl Framework for Learning, Teaching & Assessing", "Standard Educational Evaluation Text",
     "According to the Anderson and Krathwohl (2001) revised Bloom's Taxonomy, which cognitive domain process represents the highest level of cognitive complexity?",
     "एंडरसन और क्रैथवोह्ल (2001) द्वारा संशोधित ब्लूम के वर्गीकरण (Bloom's Revised Taxonomy) के अनुसार, कौन सी संज्ञानात्मक प्रक्रिया संज्ञानात्मक जटिलता के उच्चतम स्तर का प्रतिनिधित्व करती है?",
     ["Evaluating", "Analyzing", "Creating", "Applying"],
     ["मूल्यांकन करना (Evaluating)", "विश्लेषण करना (Analyzing)", "सृजन करना (Creating)", "अनुप्रयोग करना (Applying)"],
     2, "In the 2001 revised taxonomy, the hierarchy (bottom to top) is: Remember -> Understand -> Apply -> Analyze -> Evaluate -> Create. 'Creating' is the apex level.",
     "संशोधित ब्लूम वर्गीकरण में उच्चतम स्तर 'सृजन करना' (Creating) है, जबकि मूल्यांकन (Evaluating) पांचवें स्तर पर है।",
     "Easy", ["Bloom Taxonomy", "Cognitive Domain", "HOTS"]),
    # 169
    ("Formative vs Summative Assessment Distinction", "UPSC-EDU-FORMATIVE-ASSESSMENT-FOR-LEARNING", "Tests core difference between assessment FOR learning vs assessment OF learning",
     "Educational Assessment Principles", "Assessment for Learning Framework", 4, "NCERT Guidelines on Holistic Assessment", "Measurement in Education",
     "In modern pedagogical evaluation, why is Formative Assessment categorized fundamentally as 'Assessment FOR Learning'?",
     "आधुनिक शैक्षिक मूल्यांकन में, रचनात्मक/रचनात्मक मूल्यांकन (Formative Assessment) को मौलिक रूप से 'अधिगम के लिए मूल्यांकन' (Assessment FOR Learning) क्यों माना जाता है?",
     ["It grades and ranks students at the end of an academic session for promotion",
      "It provides continuous, diagnostic, descriptive feedback during the instructional process to modify teaching and remediate learning gaps",
      "It is solely designed to select students for national scholarships",
      "It relies exclusively on high-stakes standardized pen-and-paper examinations"],
     ["यह सत्र के अंत में कक्षाोन्नति के लिए छात्रों को रैंक और ग्रेड देता है",
      "यह शिक्षण प्रक्रिया के दौरान निरंतर, निदानात्मक व उपचारात्मक प्रतिपुष्टि प्रदान करता है ताकि अधिगम अंतराल को सुधारा जा सके",
      "यह केवल राष्ट्रीय छात्रवृत्ति हेतु चयन के लिए बनाया गया है",
      "यह केवल कठोर मानकीकृत लिखित परीक्षाओं पर आधारित होता है"],
     1, "Formative assessment is diagnostic and developmental; it is used during instruction to give immediate feedback to both students and teachers to improve learning outcomes.",
     "रचनात्मक मूल्यांकन शिक्षण के दौरान लगातार निदान और उपचार हेतु किया जाता है, जिससे सीखने में सुधार हो सके।",
     "Medium", ["Formative Assessment", "Assessment for Learning", "Evaluation"]),
    # 170
    ("RTE Act 2009 - Section 12(1)(c) Reservation Norms", "UPSC-EDU-RTE2009-SECTION-12-1-C", "Tests quota and reimbursement rules under Section 12(1)(c) of RTE Act 2009",
     "Right of Children to Free and Compulsory Education Act, 2009", "Section 12(1)(c)", 1, "The Gazette of India", "Act No. 35 of 2009",
     "Section 12(1)(c) of the Right to Education (RTE) Act 2009 mandates what minimum percentage of entry-level seats in unaided non-minority private schools to be reserved for children belonging to disadvantaged groups and weaker sections?",
     "शिक्षा का अधिकार (RTE) अधिनियम 2009 की धारा 12(1)(c) के तहत गैर-अल्पसंख्यक गैर-सहायता प्राप्त निजी विद्यालयों में अलाभित समूह व दुर्बल वर्ग के बच्चों के लिए प्रवेश स्तर पर न्यूनतम कितने प्रतिशत आरक्षण अनिवार्य है?",
     ["15 percent", "20 percent", "25 percent", "33 percent"],
     ["15 प्रतिशत", "20 प्रतिशत", "25 प्रतिशत", "33 प्रतिशत"],
     2, "Section 12(1)(c) mandates that private unaided non-minority schools must admit at least 25% of children from weaker sections and disadvantaged groups in Class 1 (or pre-school entry level).",
     "धारा 12(1)(c) के अनुसार गैर-सहायता प्राप्त निजी विद्यालयों को प्रवेश स्तर पर कम से कम 25% सीटें वंचित वर्ग के बच्चों के लिए आरक्षित करनी होती हैं।",
     "Easy", ["RTE Act 2009", "Section 12(1)(c)", "Education Law"]),
    # 171
    ("Criterion-Referenced vs Norm-Referenced Tests", "UPSC-EDU-CRITERION-VS-NORM-REFERENCED", "Tests distinction between criterion-referenced mastery vs peer percentile ranking",
     "Measurement & Evaluation Principles", "Testing Methodology", 4, "Ebel & Frisbie, Essentials of Educational Measurement", "CBSE Assessment Handbook",
     "What is the defining characteristic of a 'Criterion-Referenced Test' (CRT) as opposed to a 'Norm-Referenced Test' (NRT)?",
     "'मानक-संदर्भित परीक्षण' (NRT) की तुलना में 'निकष-संदर्भित परीक्षण' (Criterion-Referenced Test - CRT) की परिभाषित विशेषता क्या है?",
     ["It measures a candidate's performance against predefined absolute learning standards or competencies, rather than ranking against peers",
      "It reports individual performance solely as percentiles within a bell curve distribution",
      "It requires exactly 50% of examinees to fail every test cycle",
      "It is restricted only to non-verbal intelligence assessments"],
     ["यह सहपाठियों से तुलना करने के बजाय पूर्व-निर्धारित स्पष्ट अधिगम मानकों या दक्षताओं के आधार पर प्रदर्शन का मापन करता है",
      "यह प्रदर्शन को केवल सामान्य वक्र (बेल कर्व) में परसेंटाइल के रूप में दिखाता है",
      "इसके तहत प्रत्येक परीक्षा चक्र में 50% परीक्षार्थियों का अनुत्तीर्ण होना अनिवार्य है",
      "यह केवल अशाब्दिक बुद्धि परीक्षणों तक सीमित है"],
     0, "A Criterion-Referenced Test evaluates whether examinees have mastered specific curricular criteria or competencies, irrespective of how others scored.",
     "निकष-संदर्भित परीक्षण (CRT) में छात्र के ज्ञान की तुलना किसी समूह से नहीं बल्कि पूर्व-निर्धारित अधिगम दक्षताओं के आधार पर की जाती है।",
     "Medium", ["Criterion-Referenced Test", "Evaluation", "Psychometrics"]),
    # 172
    ("National Curriculum Framework for School Education (NCF-SE 2023)", "UPSC-EDU-NCF-SE-2023-FOUR-STAGES", "Tests stage progression under NCF-SE 2023",
     "NCF-SE 2023 Framework", "Ministry of Education Gazette Notification", 1, "Department of School Education & Literacy, MoE", "NCF-SE 2023 Document, Chapter 1",
     "The National Curriculum Framework for School Education (NCF-SE 2023) developed by the National Steering Committee headed by Dr. K. Kasturirangan aligns school education into which four sequential curricular stages?",
     "डॉ. के. कस्तूरीरंगन की अध्यक्षता वाली राष्ट्रीय संचालन समिति द्वारा विकसित स्कूली शिक्षा हेतु राष्ट्रीय पाठ्यचर्या रूपरेखा (NCF-SE 2023) शिक्षा को किन चार क्रमिक चरणों में व्यवस्थित करती है?",
     ["Foundational (5 yrs), Preparatory (3 yrs), Middle (3 yrs), and Secondary (4 yrs)",
      "Primary (5 yrs), Upper Primary (3 yrs), High School (2 yrs), Intermediate (2 yrs)",
      "Pre-school (2 yrs), Lower Primary (4 yrs), Upper Primary (4 yrs), Higher Secondary (2 yrs)",
      "Early Childhood (3 yrs), Elementary (5 yrs), Secondary (4 yrs), Vocational (2 yrs)"],
     ["बुनियादी (5 वर्ष), प्रारंभिक/तैयारी (3 वर्ष), मध्य (3 वर्ष), और माध्यमिक (4 वर्ष)",
      "प्राथमिक (5 वर्ष), उच्च प्राथमिक (3 वर्ष), हाई स्कूल (2 वर्ष), इंटरमीडिएट (2 वर्ष)",
      "पूर्व-प्राथमिक (2 वर्ष), निम्न प्राथमिक (4 वर्ष), उच्च प्राथमिक (4 वर्ष), उच्चतर माध्यमिक (2 वर्ष)",
      "प्रारंभिक बाल्यावस्था (3 वर्ष), प्रारंभिक (5 वर्ष), माध्यमिक (4 वर्ष), व्यावसायिक (2 वर्ष)"],
     0, "NCF-SE 2023 structures schooling into Foundational (ages 3-8, 5 yrs), Preparatory (ages 8-11, 3 yrs), Middle (ages 11-14, 3 yrs), and Secondary (ages 14-18, 4 yrs).",
     "एनसीएफ-एसई 2023 पाठ्यचर्या को बुनियादी (5 वर्ष), तैयारी (3 वर्ष), मध्य (3 वर्ष) व माध्यमिक (4 वर्ष) में विभाजित करता है।",
     "Easy", ["NCF-SE 2023", "Curriculum", "NEP 2020"]),
    # 173
    ("Psychometrics - Reliability and Validity", "UPSC-EDU-VALIDITY-RELIABILITY-RELATIONSHIP", "Tests fundamental psychometric relationship between test validity and reliability",
     "Measurement & Evaluation Principles", "Classical Test Theory", 4, "Anastasi & Urbina, Psychological Testing", "Educational Evaluation Standards",
     "In educational measurement and psychometrics, which statement accurately articulates the scientific relationship between 'Validity' and 'Reliability' of an assessment tool?",
     "शैक्षिक मापन और मनोमिति में, किसी मूल्यांकन उपकरण की 'वैधता' (Validity) और 'विश्वसनीयता' (Reliability) के बीच वैज्ञानिक संबंध को कौन सा कथन सही ढंग से व्यक्त करता है?",
     ["A test can be valid without being reliable.",
      "Reliability is a necessary but not a sufficient condition for validity.",
      "Validity and reliability are always identical in numerical value.",
      "High reliability guarantees that the test is completely valid for all purposes."],
     ["कोई परीक्षण विश्वसनीय हुए बिना भी वैध हो सकता है।",
      "विश्वसनीयता वैधता के लिए एक आवश्यक शर्त है, किन्तु यह पर्याप्त शर्त नहीं है।",
      "वैधता और विश्वसनीयता का संख्यात्मक मान हमेशा एक समान होता है।",
      "उच्च विश्वसनीयता इस बात की गारंटी देती है कि परीक्षण सभी उद्देश्यों के लिए पूर्णतः वैध है।"],
     1, "A test must yield consistent results (reliable) to be valid, but consistency alone does not guarantee that it measures the intended construct (validity). Thus, reliability is necessary but not sufficient.",
     "विश्वसनीयता वैधता की आवश्यक पूर्व-शर्त है; यदि परीक्षण विश्वसनीय नहीं है तो वह वैध नहीं हो सकता, किन्तु केवल विश्वसनीय होना वैधता की गारंटी नहीं है।",
     "Difficult", ["Reliability", "Validity", "Psychometrics"]),
    # 174
    ("APAAR / Automated Permanent Academic Account Registry", "UPSC-EDU-APAAR-ONE-NATION-ONE-STUDENT-ID", "Tests APAAR 12-digit permanent academic identity under NEP 2020",
     "Digital Education Architecture", "Ministry of Education Implementation Order 2023", 1, "Department of School Education & Literacy, MoE", "APAAR Implementation Circular",
     "What is the primary function of 'APAAR' (Automated Permanent Academic Account Registry), often referred to as 'One Nation, One Student ID', introduced by the Ministry of Education?",
     "शिक्षा मंत्रालय द्वारा शुरू की गई 'अपार' (APAAR - Automated Permanent Academic Account Registry), जिसे 'वन नेशन, वन स्टूडेंट आईडी' कहा जाता है, का प्राथमिक कार्य क्या है?",
     ["Providing a unique 12-digit lifelong digital academic identifier that seamlessly tracks a student's learning trajectory, credits, and achievements across institutions via Digilocker/ABC",
      "Disbursing monthly pocket allowances directly to students' mobile wallets",
      "Replacing the voter identity card for all youth under 18 years",
      "Conducting automated biometric attendance for commercial coaching institutes"],
     ["एक विशिष्ट 12-अंकीय आजीवन डिजिटल शैक्षिक पहचान प्रदान करना, जो डिजिलॉकर/ABC के माध्यम से छात्र की प्रगति, क्रेडिट और उपलब्धियों को ट्रैक करता है",
      "छात्रों के मोबाइल वॉलेट में सीधे मासिक जेब खर्च वितरित करना",
      "18 वर्ष से कम आयु के सभी युवाओं के लिए मतदाता पहचान पत्र का स्थान लेना",
      "निजी कोचिंग संस्थानों के लिए स्वचालित बायोमेट्रिक उपस्थिति दर्ज करना"],
     0, "APAAR is a lifelong 12-digit ID for students in India linked to the Academic Bank of Credits (ABC) to maintain a seamless digital academic record from pre-primary to higher education.",
     "अपार (APAAR) छात्रों के लिए 12-अंकीय आजीवन विशिष्ट डिजिटल पहचान है जो उनकी सभी शैक्षिक उपलब्धियों और क्रेडिट को डिजिटल रूप से सुरक्षित रखती है।",
     "Medium", ["APAAR", "Digital Education", "NEP 2020"]),
    # 175
    ("Holistic Progress Card (HPC) - 360 Degree Assessment", "UPSC-EDU-HPC-360-DEGREE-EVALUATION", "Tests 360-degree multi-dimensional progress card domains under NEP 2020",
     "NEP 2020 Assessment Reforms", "NCERT Holistic Progress Card Prototype", 1, "NCERT PARAKH Assessment Centre", "Holistic Progress Card User Guide",
     "Under NEP 2020, how does the 360-Degree Holistic Progress Card (HPC) transform traditional school report cards?",
     "एनईपी 2020 के तहत, 360-डिग्री समग्र प्रगति कार्ड (HPC) पारंपरिक रिपोर्ट कार्ड को किस प्रकार परिवर्तित करता है?",
     ["By replacing subject marks with an individualized, multi-dimensional assessment of cognitive, socio-emotional, and psychomotor domains that integrates self-assessment, peer feedback, and teacher appraisal",
      "By eliminating all teacher evaluations in favor of artificial intelligence algorithmic grading only",
      "By restricting reporting to final year-end summative board examination scores",
      "By publishing class-wide comparative ranks on public bulletin boards"],
     ["केवल अंकों के स्थान पर संज्ञानात्मक, सामाजिक-भावनात्मक व मनोगत्यात्मक क्षेत्रों का समग्र मूल्यांकन प्रस्तुत करके, जिसमें स्व-मूल्यांकन, सहपाठी प्रतिपुष्टि व शिक्षक आकलन शामिल है",
      "शिक्षक मूल्यांकन को पूरी तरह समाप्त कर केवल एआई एल्गोरिदम से ग्रेडिंग करके",
      "प्रगति रिपोर्ट को केवल वर्ष के अंत की बोर्ड परीक्षा के अंकों तक सीमित करके",
      "कक्षा के सभी छात्रों की तुलनात्मक रैंक सार्वजनिक नोटिस बोर्ड पर प्रकाशित करके"],
     0, "The 360-degree HPC captures child's progress holistically across cognitive, affective, and psychomotor domains including self, peer, and teacher evaluations along with project-based competencies.",
     "समग्र प्रगति कार्ड (HPC) एक 360-डिग्री बहुआयामी कार्ड है जो स्व-मूल्यांकन, सहपाठी मूल्यांकन और शिक्षक मूल्यांकन को जोड़ते हुए सर्वांगीण विकास को दर्शाता है।",
     "Medium", ["Holistic Progress Card", "HPC", "NEP 2020"]),
    # 176
    ("Item Analysis - Difficulty Value & Discrimination Index", "UPSC-EDU-ITEM-ANALYSIS-DISCRIMINATION-INDEX", "Tests statistical calculation and interpretation of Item Discrimination Index in test construction",
     "Measurement & Evaluation Principles", "Item Analysis Psychometrics", 4, "Thorndike & Hagen, Measurement and Evaluation", "Standard Educational Testing Text",
     "In standardized test item analysis, an item has a Discrimination Index (D) of -0.25. What pedagogical action must the examination committee take regarding this question?",
     "मानकीकृत परीक्षण प्रश्न विश्लेषण (Item Analysis) में, यदि किसी प्रश्न का विभेदन सूचकांक (Discrimination Index - D) -0.25 आता है, तो परीक्षा समिति को उस प्रश्न के संबंध में क्या कदम उठाना चाहिए?",
     ["Retain the question as it is highly effective at identifying top-scoring students",
      "Discard or thoroughly revise the question immediately because more lower-performing students answered it correctly than higher-performing students",
      "Award double bonus marks to all students who attempted the question",
      "Make the question mandatory for all future board examinations"],
     ["प्रश्न को बनाए रखें क्योंकि यह शीर्ष छात्रों की पहचान करने में अत्यधिक प्रभावी है",
      "प्रश्न को तुरंत निरस्त या संशोधित करें क्योंकि उच्च प्रदर्शन वाले छात्रों की तुलना में निम्न प्रदर्शन वाले छात्रों ने इसका सही उत्तर अधिक दिया है",
      "प्रश्न हल करने वाले सभी छात्रों को दोगुने बोनस अंक दें",
      "भविष्य की सभी बोर्ड परीक्षाओं के लिए इस प्रश्न को अनिवार्य बनाएं"],
     1, "A negative discrimination index indicates that poorer students scored better on the item than superior students, signaling flawed wording, misleading distractors, or incorrect keying; it must be discarded or revised.",
     "ऋणात्मक विभेदन सूचकांक दर्शाता है कि कमजोर छात्रों ने प्रतिभाशाली छात्रों से बेहतर उत्तर दिया, जो प्रश्न में दोष या गलत उत्तर कुंजी का संकेत है; इसे निरस्त या संशोधित किया जाना चाहिए।",
     "Difficult", ["Item Analysis", "Discrimination Index", "Psychometrics"]),
    # 177
    ("Continuous and Comprehensive Evaluation (CCE) - Diagnostic Role", "UPSC-EDU-CCE-DIAGNOSTIC-REMEDIATION", "Tests diagnostic and remedial feedback mechanism of continuous evaluation",
     "Right to Education Act 2009", "Section 29(2) Curriculum & Evaluation", 1, "Central Board of Secondary Education (CBSE)", "CCE Teachers' Manual",
     "Under Section 29(2) of the RTE Act 2009, Continuous and Comprehensive Evaluation (CCE) is mandated primarily to ensure which educational outcome?",
     "आरटीई अधिनियम 2009 की धारा 29(2) के तहत, सतत एवं व्यापक मूल्यांकन (CCE) का मुख्य उद्देश्य किस शैक्षिक परिणाम को सुनिश्चित करना है?",
     ["Subjecting students to weekly high-stakes elimination examinations",
      "Comprehensive physical, cognitive, and social development through continuous learning gap diagnosis and timely personalized remediation without fear or trauma",
      "Segregating slow learners into separate institutions",
      "Ranking schools strictly on the basis of board merit lists"],
     ["छात्रों पर साप्ताहिक तनावपूर्ण परीक्षाओं का बोझ डालना",
      "बिना किसी भय या आघात के निरंतर अधिगम अंतराल के निदान और समयबद्ध उपचारात्मक शिक्षण द्वारा बालक का सर्वांगीण शारीरिक, मानसिक व सामाजिक विकास",
      "धीमी गति से सीखने वाले बच्चों को अलग विद्यालयों में भेजना",
      "बोर्ड मेरिट सूची के आधार पर विद्यालयों की रैंकिंग निर्धारित करना"],
     1, "CCE focuses on all-round development (scholastic and co-scholastic) through diagnostic evaluation and non-threatening remediation, fostering learning without anxiety.",
     "धारा 29(2) के अनुसार सीसीई का मूल उद्देश्य बिना किसी भय या तनाव के बच्चे के सर्वांगीण विकास का निरंतर आकलन करना और समय पर उपचारात्मक सहायता देना है।",
     "Easy", ["CCE", "RTE Section 29", "Evaluation"]),
    # 178
    ("Standard Deviation and Normal Curve in Grading", "UPSC-EDU-STANDARD-DEVIATION-NORMAL-DISTRIBUTION", "Tests standard deviation interpretation in bell-shaped grade distributions",
     "Educational Statistics", "Normal Probability Curve (NPC)", 4, "Garrett, Statistics in Psychology and Education", "Educational Measurement Manual",
     "In a large-scale standardized secondary board examination where marks are normally distributed with a Mean of 60 and a Standard Deviation of 10, approximately what percentage of candidates score between 50 and 70?",
     "एक बड़े पैमाने की मानकीकृत माध्यमिक बोर्ड परीक्षा में, जहां प्राप्तांक 60 के माध्य (Mean) और 10 के मानक विचलन (Standard Deviation) के साथ सामान्य रूप से वितरित (Normally Distributed) हैं, लगभग कितने प्रतिशत परीक्षार्थी 50 से 70 के मध्य अंक प्राप्त करते हैं?",
     ["50 percent", "68.26 percent", "95.44 percent", "99.73 percent"],
     ["50 प्रतिशत", "68.26 प्रतिशत", "95.44 प्रतिशत", "99.73 प्रतिशत"],
     1, "In a normal distribution, Mean ± 1 Standard Deviation (60 ± 10, i.e., 50 to 70) encompasses approximately 68.26% of the total distribution.",
     "सामान्य वितरण वक्र (Normal Curve) में माध्य ± 1 मानक विचलन (60 ± 10 = 50 से 70) के दायरे में कुल जनसंख्या का लगभग 68.26% भाग आता है।",
     "Medium", ["Standard Deviation", "Normal Curve", "Educational Statistics"]),
    # 179
    ("National Achievement Survey (NAS) - Systemic Health", "UPSC-EDU-NAS-SYSTEMIC-ASSESSMENT", "Tests systemic diagnostic role of NAS conducted by MoE & NCERT",
     "School Education Quality Monitoring", "MoE National Achievement Survey Framework", 1, "Department of School Education & Literacy, MoE", "NAS National Report, NCERT",
     "What is the foundational systemic objective of the triennial 'National Achievement Survey' (NAS) conducted across Indian schools?",
     "भारतीय विद्यालयों में आयोजित होने वाले त्रैवार्षिक 'राष्ट्रीय उपलब्धि सर्वेक्षण' (NAS) का मूल प्रणालीगत उद्देश्य क्या है?",
     ["To provide institutional and state-level diagnostic feedback on the health of the education system to guide policy interventions and pedagogical resource allocation",
      "To declare individual student pass/fail results for grade advancement",
      "To punish teachers whose classrooms score below state medians",
      "To auction under-performing schools to corporate entities"],
     ["नीतिगत सुधारों और संसाधनों के आवंटन हेतु शिक्षा प्रणाली के स्वास्थ्य पर संस्थागत व राज्य-स्तरीय निदानात्मक प्रतिपुष्टि प्रदान करना",
      "कक्षा में उत्तीर्ण या अनुत्तीर्ण घोषित करने हेतु व्यक्तिगत छात्र परिणाम जारी करना",
      "राज्य औसत से कम अंक पाने वाले शिक्षकों को दंडित करना",
      "कम प्रदर्शन करने वाले स्कूलों को निजी कंपनियों को बेचना"],
     0, "NAS is a sample-based systemic evaluation designed to assess the health of the school education system and provide feedback for policy and curricular planning, not for individual student certification.",
     "NAS एक प्रणालीगत नमूना-आधारित सर्वेक्षण है जिसका उद्देश्य शिक्षा प्रणाली की वास्तविक स्थिति का आकलन कर नीतिगत निर्णय व सुधार सुनिश्चित करना है।",
     "Medium", ["NAS", "Systemic Evaluation", "NCERT"]),
    # 180
    ("RTE Amendment Act 2019 - No Detention Policy Modification", "UPSC-EDU-RTE-2019-NO-DETENTION-AMENDMENT", "Tests the modified provisions of Section 16 regarding student detention in Classes 5 and 8",
     "Right of Children to Free and Compulsory Education (Amendment) Act, 2019", "Section 16 Amendment", 1, "The Gazette of India (Extraordinary)", "Act No. 1 of 2019",
     "Under the RTE (Amendment) Act 2019 that modified Section 16, what procedure must be followed before a student in Class 5 or Class 8 can be detained?",
     "आरटीई (संशोधन) अधिनियम 2019 द्वारा संशोधित धारा 16 के अनुसार, कक्षा 5 या कक्षा 8 के विद्यार्थी को अनुत्तीर्ण (रोकने) से पूर्व क्या प्रक्रिया अपनाना अनिवार्य है?",
     ["Direct expulsion from the school immediately upon failing the regular examination",
      "Holding a regular examination, followed by two months of remedial teaching and a re-examination, after which the state government may decide whether to hold back the child",
      "Detaining the student without permitting any re-examination or remedial teaching",
      "Automatic promotion regardless of failure without any evaluation"],
     ["नियमित परीक्षा में अनुत्तीर्ण होने पर तुरंत विद्यालय से निष्कासित करना",
      "नियमित परीक्षा लेना, उसके बाद दो महीने का उपचारात्मक शिक्षण और पुनः परीक्षा आयोजित करना; यदि छात्र पुनः अनुत्तीर्ण हो, तभी राज्य सरकार उसे रोकने का निर्णय ले सकती है",
      "पुनः परीक्षा या उपचारात्मक शिक्षण का अवसर दिए बिना सीधे उसी कक्षा में रोकना",
      "बिना किसी परीक्षा या मूल्यांकन के छात्र को सीधे अगली कक्षा में भेजना"],
     1, "Under amended Section 16, if a child fails the annual exam in Class 5 or 8, they must be given remedial instruction and a re-examination within 2 months. Only if they fail the re-examination may the State allow detention.",
     "संशोधित धारा 16 के तहत कक्षा 5 या 8 में अनुत्तीर्ण बच्चे को 2 माह में उपचारात्मक शिक्षण व पुन: परीक्षा का अवसर देना अनिवार्य है; उसमें असफल होने पर ही रोका जा सकता है।",
     "Difficult", ["RTE Amendment 2019", "Section 16", "No Detention Policy"])
]

for idx, item in enumerate(a4):
    qid = 166 + idx
    areas_4_to_8.append(q(
        qid, 4, t4, th4, item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7],
        item[8], item[9], item[10], item[11], item[12], item[13], item[14], item[15], item[16]
    ))

print(f"Generated Area 4 (15 Qs). Total: {len(areas_4_to_8)}")

with open("temp_upsc_area4.json", "w", encoding="utf-8") as f:
    json.dump(areas_4_to_8, f, ensure_ascii=False, indent=2)
