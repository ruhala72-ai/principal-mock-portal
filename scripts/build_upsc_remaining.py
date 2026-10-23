# -*- coding: utf-8 -*-
import json
import os

with open("scripts/temp_upsc_1_2.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

print(f"Loaded {len(questions)} questions from Areas 1 and 2.")

def q(id_num, area_num, topic, topic_hi, subtopic, q_en, q_hi, opts_en, opts_hi, correct, exp_en, exp_hi, diff, tags):
    return {
        "id": f"upsc-crt-{id_num}",
        "examType": "upsc-principal",
        "sectionId": "upsc-sec-1",
        "unitId": f"upsc-area-{area_num}",
        "topic": topic,
        "topicHi": topic_hi,
        "subtopic": subtopic,
        "officialReference": f"UPSC CRT Syllabus Area {area_num}",
        "questionTextEn": q_en,
        "questionTextHi": q_hi,
        "optionsEn": opts_en,
        "optionsHi": opts_hi,
        "correctOptionIndex": correct,
        "explanationEn": exp_en,
        "explanationHi": exp_hi,
        "difficulty": diff,
        "tags": tags,
        "isPracticeQuestion": True,
        "isApproved": True
    }

# ==========================================
# AREA 3: Reasoning Ability and Quantitative Aptitude (31 to 45)
# 8 Reasoning (31-38) + 7 Quant (39-45)
# ==========================================
t3 = "Reasoning Ability and Quantitative Aptitude"
th3 = "तार्किक योग्यता एवं संख्यात्मक अभिरुचि"

questions.append(q(31, 3, t3, th3, "Logical Deduction & Syllogism",
    "Statements: All teachers are scholars. Some scholars are authors. Conclusions: I. Some authors are teachers. II. Some scholars are teachers. Which conclusion logically follows?",
    "कथन: सभी शिक्षक विद्वान हैं। कुछ विद्वान लेखक हैं। निष्कर्ष: I. कुछ लेखक शिक्षक हैं। II. कुछ विद्वान शिक्षक हैं। कौन सा निष्कर्ष तार्किक रूप से निकलता है?",
    ["Only Conclusion I follows", "Only Conclusion II follows", "Both Conclusions I and II follow", "Neither Conclusion follows"],
    ["केवल निष्कर्ष I निकलता है", "केवल निष्कर्ष II निकलता है", "दोनों निष्कर्ष I और II निकलते हैं", "कोई भी निष्कर्ष नहीं निकलता"],
    1, "Since 'All teachers are scholars' (A-type), its converse 'Some scholars are teachers' is definitely true. But no valid link connects teachers and authors.",
    "'सभी शिक्षक विद्वान हैं' का परिवर्तन 'कुछ विद्वान शिक्षक हैं' वैध है। अतः केवल निष्कर्ष II सही है।",
    "Easy", ["Syllogism", "Reasoning"]))

questions.append(q(32, 3, t3, th3, "Number Series & Pattern Recognition",
    "Find the next term in the logical number series: 7, 14, 28, 56, 112, ?",
    "दी गई संख्या श्रृंखला में अगला पद ज्ञात कीजिए: 7, 14, 28, 56, 112, ?",
    ["168", "214", "224", "248"],
    ["168", "214", "224", "248"],
    2, "Each successive term is obtained by multiplying the previous term by 2: 112 * 2 = 224.",
    "प्रत्येक पद पिछले पद को 2 से गुणा करने पर प्राप्त होता है: 112 × 2 = 224।",
    "Easy", ["Number Series", "Reasoning"]))

questions.append(q(33, 3, t3, th3, "Coding-Decoding",
    "In a certain code language, if 'LEAD' is coded as '20-13-9-12' and 'TEAM' is coded as '28-13-9-21', what will be the code for 'CARE'?",
    "यदि किसी सांकेतिक भाषा में 'LEAD' को '20-13-9-12' तथा 'TEAM' को '28-13-9-21' लिखा जाता है, तो 'CARE' का कूट क्या होगा?",
    ["11-9-26-13", "11-9-26-14", "12-10-27-14", "10-8-25-12"],
    ["11-9-26-13", "11-9-26-14", "12-10-27-14", "10-8-25-12"],
    0, "Alphabet positions: C=3, A=1, R=18, E=5. Adding 8 to each position: 3+8=11, 1+8=9, 18+8=26, 5+8=13. Result: 11-9-26-13.",
    "प्रत्येक वर्णमाला क्रमांक में 8 जोड़ने का नियम लागू है: C(3+8=11), A(1+8=9), R(18+8=26), E(5+8=13)।",
    "Medium", ["Coding-Decoding", "Reasoning"]))

questions.append(q(34, 3, t3, th3, "Direction Sense Test",
    "A school principal walks 40 metres North from the administration block, turns right and walks 30 metres, then turns right again and walks 40 metres. How far and in which direction is the principal from the starting point?",
    "एक प्रधानाचार्य प्रशासनिक भवन से 40 मीटर उत्तर की ओर चलते हैं, फिर दाएं मुड़कर 30 मीटर चलते हैं, फिर दाएं मुड़कर 40 मीटर चलते हैं। वह प्रारंभिक बिंदु से कितनी दूरी पर और किस दिशा में हैं?",
    ["30 metres East", "30 metres West", "40 metres North", "70 metres South"],
    ["30 मीटर पूर्व", "30 मीटर पश्चिम", "40 मीटर उत्तर", "70 मीटर दक्षिण"],
    0, "North 40m, East 30m, South 40m brings the principal exactly 30 metres due East of the starting point.",
    "उत्तर में 40 मीटर जाकर पुनः दक्षिण में 40 मीटर लौटने पर वह प्रारंभिक स्थान से 30 मीटर पूर्व दिशा में हैं।",
    "Easy", ["Direction Sense", "Reasoning"]))

questions.append(q(35, 3, t3, th3, "Blood Relations",
    "Pointing to a photograph of a teacher, Anita said, 'Her mother's only son is my brother.' How is Anita related to the teacher in the photograph?",
    "एक शिक्षक की तस्वीर की ओर इशारा करते हुए अनिता ने कहा, 'इनकी माता का इकलौता पुत्र मेरा भाई है।' अनिता का तस्वीर वाले शिक्षक से क्या संबंध है?",
    ["Sister (or Herself)", "Mother", "Niece", "Aunt"],
    ["बहन (या स्वयं)", "माता", "भतीजी", "मौसी"],
    0, "The teacher's mother's only son is the teacher's brother. Since he is Anita's brother, Anita and the teacher are sisters (or Anita is the teacher). Thus, relationship is Sister.",
    "तस्वीर की माता का इकलौता पुत्र उसका भाई है, जो अनिता का भी भाई है। अतः अनिता उसकी बहन है।",
    "Medium", ["Blood Relations", "Reasoning"]))

questions.append(q(36, 3, t3, th3, "Seating Arrangement",
    "Five teachers A, B, C, D, and E are sitting in a row facing North. C is sitting in the middle. A is to the immediate left of B, and D is to the immediate right of C. Who is sitting at the extreme right end if E is sitting to the right of D?",
    "पांच शिक्षक A, B, C, D और E उत्तर की ओर मुख करके एक पंक्ति में बैठे हैं। C ठीक मध्य में बैठा है। A, B के ठीक बाएं है और D, C के ठीक दाएं है। यदि E, D के दाएं है, तो सबसे दाएं छोर पर कौन बैठा है?",
    ["B", "C", "D", "E"],
    ["B", "C", "D", "E"],
    3, "Row arrangement with 5 seats: 1, 2, 3, 4, 5. C is at position 3. D is at 4 (right of C). E is to the right of D, so E is at position 5 (extreme right). A and B are at 1 and 2.",
    "C मध्य में (तीसरे स्थान पर) है। D चौथे पर और E पांचवें (सबसे दाएं) छोर पर बैठा है।",
    "Easy", ["Seating Arrangement", "Reasoning"]))

questions.append(q(37, 3, t3, th3, "Analytical Reasoning & Venn Diagrams",
    "In a school staff of 60 teachers, 35 teach Humanities, 25 teach Sciences, and 10 teach both Humanities and Sciences. How many teachers teach NEITHER Humanities nor Sciences?",
    "60 शिक्षकों वाले एक विद्यालय में 35 मानविकी पढ़ाते हैं, 25 विज्ञान पढ़ाते हैं तथा 10 दोनों पढ़ाते हैं। कितने शिक्षक न तो मानविकी पढ़ाते हैं और न ही विज्ञान?",
    ["5", "10", "15", "20"],
    ["5", "10", "15", "20"],
    1, "Total teaching at least one = n(H) + n(S) - n(H ∩ S) = 35 + 25 - 10 = 50. Total neither = 60 - 50 = 10.",
    "कम से कम एक विषय पढ़ाने वाले = 35 + 25 - 10 = 50। कोई भी विषय न पढ़ाने वाले = 60 - 50 = 10।",
    "Easy", ["Venn Diagrams", "Set Theory"]))

questions.append(q(38, 3, t3, th3, "Statement and Assumption",
    "Statement: 'To improve school discipline, daily morning assembly attendance must be made strictly biometric.' Assumptions: I. Biometric tracking can monitor real-time punctuality of students and staff. II. Assembly builds collective institutional culture. Which assumption is implicit?",
    "कथन: 'विद्यालय में अनुशासन सुधारने हेतु प्रातःकालीन प्रार्थना सभा में बायोमेट्रिक उपस्थिति अनिवार्य की जानी चाहिए।' धारणाएं: I. बायोमेट्रिक ट्रैकिंग समयबद्धता की सटीक निगरानी कर सकती है। II. प्रार्थना सभा संस्थागत संस्कृति का निर्माण करती है। कौन सी धारणा अंतर्निहित है?",
    ["Only Assumption I is implicit", "Only Assumption II is implicit", "Both I and II are implicit", "Neither is implicit"],
    ["केवल धारणा I अंतर्निहित है", "केवल धारणा II अंतर्निहित है", "दोनों धारणाएं I और II अंतर्निहित हैं", "कोई भी अंतर्निहित नहीं है"],
    0, "Assumption I is directly linked to the efficacy of the biometric solution proposed in the statement. Assumption II, while generally true, is not the assumption underlying the biometric rule.",
    "बायोमेट्रिक नियम लागू करने का सीधा आधार यह धारणा है कि इससे समयबद्धता की निगरानी होगी। अतः केवल धारणा I अंतर्निहित है।",
    "Medium", ["Critical Reasoning", "Assumptions"]))

# 7 Quant Questions (39 to 45)
questions.append(q(39, 3, t3, th3, "Quantitative Aptitude - Percentages",
    "In an examination of 400 total marks, a student scores 260 marks. What percentage of marks did the student obtain?",
    "400 कुल अंकों की एक परीक्षा में एक छात्र ने 260 अंक प्राप्त किए। छात्र ने कितने प्रतिशत अंक प्राप्त किए?",
    ["60%", "62.5%", "65%", "67.5%"],
    ["60%", "62.5%", "65%", "67.5%"],
    2, "Percentage = (260 / 400) * 100 = 260 / 4 = 65%.",
    "प्रतिशत = (260 / 400) × 100 = 65%।",
    "Easy", ["Percentages", "Quantitative"]))

questions.append(q(40, 3, t3, th3, "Quantitative Aptitude - Ratios & Proportions",
    "The ratio of boys to girls in a senior secondary school is 5 : 4. If there are 720 students in the school, how many girls are enrolled?",
    "एक वरिष्ठ माध्यमिक विद्यालय में बालकों और बालिकाओं का अनुपात 5 : 4 है। यदि कुल छात्र संख्या 720 है, तो विद्यालय में कितनी बालिकाएं नामांकित हैं?",
    ["320", "360", "400", "420"],
    ["320", "360", "400", "420"],
    0, "Total parts = 5 + 4 = 9. Girls = (4 / 9) * 720 = 4 * 80 = 320.",
    "अनुपातिक योग = 5 + 4 = 9। बालिकाओं की संख्या = (4/9) × 720 = 320।",
    "Easy", ["Ratios", "Quantitative"]))

questions.append(q(41, 3, t3, th3, "Quantitative Aptitude - Averages",
    "The average marks obtained by 50 students in a mathematics unit test was 68. If the scores of the two highest scorers (98 and 92) are excluded, what is the new average of the remaining 48 students?",
    "गणित के इकाई परीक्षण में 50 विद्यार्थियों का औसत प्राप्तांक 68 था। यदि शीर्ष दो विद्यार्थियों (98 और 92) के अंक हटा दिए जाएं, तो शेष 48 विद्यार्थियों का नया औसत क्या होगा?",
    ["66.5", "66.875", "67.0", "67.25"],
    ["66.5", "66.875", "67.0", "67.25"],
    1, "Total sum = 50 * 68 = 3400. Sum of excluded = 98 + 92 = 190. Remaining sum = 3400 - 190 = 3210. New average = 3210 / 48 = 66.875.",
    "कुल योग = 50 × 68 = 3400। शीर्ष दो अंकों का योग = 190। शेष योग = 3210। नया औसत = 3210 / 48 = 66.875।",
    "Medium", ["Averages", "Quantitative"]))

questions.append(q(42, 3, t3, th3, "Quantitative Aptitude - Profit and Loss",
    "A school library purchased books at a discount of 20% on the printed catalogue price of ₹50,000. What is the net amount paid by the school?",
    "एक विद्यालय पुस्तकालय ने ₹50,000 के अंकित मूल्य वाली पुस्तकों पर 20% की छूट प्राप्त की। विद्यालय द्वारा भुगतान की गई शुद्ध राशि कितनी है?",
    ["₹35,000", "₹40,000", "₹42,500", "₹45,000"],
    ["₹35,000", "₹40,000", "₹42,500", "₹45,000"],
    1, "Discount = 20% of 50,000 = ₹10,000. Net amount = 50,000 - 10,000 = ₹40,000.",
    "छूट = ₹50,000 का 20% = ₹10,000। शुद्ध भुगतान = ₹40,000।",
    "Easy", ["Profit and Loss", "Commercial Math"]))

questions.append(q(43, 3, t3, th3, "Quantitative Aptitude - Work and Time",
    "If 12 workers can paint a school building in 15 days working 8 hours a day, in how many days can 18 workers complete the same work working 10 hours a day?",
    "यदि 12 मजदूर प्रतिदिन 8 घंटे कार्य करके 15 दिन में विद्यालय भवन की पुताई कर सकते हैं, तो 18 मजदूर प्रतिदिन 10 घंटे कार्य करके वही कार्य कितने दिन में पूरा करेंगे?",
    ["6 days", "8 days", "10 days", "12 days"],
    ["6 दिन", "8 दिन", "10 दिन", "12 दिन"],
    1, "Work formula: M1 * D1 * H1 = M2 * D2 * H2. 12 * 15 * 8 = 18 * D2 * 10 => 1440 = 180 * D2 => D2 = 1440 / 180 = 8 days.",
    "M1×D1×H1 = M2×D2×H2 => 12×15×8 = 18×D2×10 => 1440 = 180×D2 => D2 = 8 दिन।",
    "Medium", ["Work and Time", "Quantitative"]))

questions.append(q(44, 3, t3, th3, "Quantitative Aptitude - Simple Interest",
    "A school welfare committee deposited ₹2,00,000 in a fixed deposit scheme offering 7.5% per annum simple interest. What will be the interest earned after 3 years?",
    "विद्यालय कल्याण समिति ने 7.5% वार्षिक साधारण ब्याज की दर पर ₹2,00,000 की राशि 3 वर्ष के लिए सावधि जमा की। 3 वर्ष पश्चात अर्जित ब्याज कितना होगा?",
    ["₹35,000", "₹45,000", "₹50,000", "₹55,000"],
    ["₹35,000", "₹45,000", "₹50,000", "₹55,000"],
    1, "SI = (P * R * T) / 100 = (2,00,000 * 7.5 * 3) / 100 = 2000 * 22.5 = ₹45,000.",
    "साधारण ब्याज = (मूलधन × दर × समय) / 100 = (200000 × 7.5 × 3) / 100 = ₹45,000।",
    "Easy", ["Simple Interest", "Quantitative"]))

questions.append(q(45, 3, t3, th3, "Data Interpretation - Tables & Charts",
    "In a bar chart representing annual student enrolment: 2021 = 800, 2022 = 900, 2023 = 1080. What is the percentage increase in student enrolment from 2021 to 2023?",
    "वार्षिक छात्र नामांकन दर्शाने वाले दंड आरेख में: 2021 = 800, 2022 = 900, 2023 = 1080। 2021 से 2023 तक छात्र नामांकन में कुल कितने प्रतिशत की वृद्धि हुई?",
    ["25%", "30%", "35%", "40%"],
    ["25%", "30%", "35%", "40%"],
    2, "Increase = 1080 - 800 = 280. Percentage increase = (280 / 800) * 100 = 35%.",
    "वृद्धि = 1080 - 800 = 280। प्रतिशत वृद्धि = (280 / 800) × 100 = 35%।",
    "Easy", ["Data Interpretation", "Percentages"]))

# ==========================================
# AREA 4: Educational Policies, Measurement and Evaluation (46 to 60)
# ==========================================
t4 = "Educational Policies, Educational Measurement and Evaluation"
th4 = "शैक्षिक नीतियां, शैक्षिक मापन एवं मूल्यांकन"

questions.append(q(46, 4, t4, th4, "NEP 2020 Curricular Structure",
    "Under National Education Policy (NEP 2020), which age group corresponds to the 'Preparatory Stage' (Classes 3 to 5)?",
    "राष्ट्रीय शिक्षा नीति (NEP 2020) के अंतर्गत कौन सा आयु वर्ग 'प्रारंभिक चरण' (Preparatory Stage - कक्षा 3 से 5) से संबंधित है?",
    ["Ages 3 to 6", "Ages 6 to 8", "Ages 8 to 11", "Ages 11 to 14"],
    ["आयु 3 से 6 वर्ष", "आयु 6 से 8 वर्ष", "आयु 8 to 11 वर्ष", "आयु 11 से 14 वर्ष"],
    2, "NEP 2020's 5+3+3+4 design: Foundational (ages 3-8), Preparatory (ages 8-11, Classes 3-5), Middle (ages 11-14), Secondary (ages 14-18).",
    "एनईपी 2020 में प्रिपरेटरी स्टेज 8 से 11 वर्ष (कक्षा 3 से 5) के बच्चों के लिए निर्धारित है।",
    "Easy", ["NEP 2020", "Curricular Structure"]))

questions.append(q(47, 4, t4, th4, "Continuous and Comprehensive Evaluation (CCE)",
    "What is the core pedagogical objective of 'Formative Assessment' in the Continuous and Comprehensive Evaluation framework?",
    "सतत और व्यापक मूल्यांकन (CCE) रूपरेखा में 'रचनात्मक / निर्माणात्मक मूल्यांकन' (Formative Assessment) का मुख्य उद्देश्य क्या है?",
    ["Grading students for final board certification", "Providing continuous feedback during the learning process to diagnose gaps and improve teaching-learning", "Ranking schools in district league tables", "Deciding teacher salary increments"],
    ["अंतिम बोर्ड प्रमाणन हेतु छात्रों को ग्रेड देना", "अधिगम प्रक्रिया के दौरान निरंतर प्रतिपुष्टि प्रदान कर कमियों को पहचानना और शिक्षण-अधिगम में सुधार करना", "जिले में स्कूलों की रैंकिंग बनाना", "शिक्षकों के वेतन वृद्धि का निर्णय करना"],
    1, "Formative assessment is assessment FOR learning, designed to monitor learner progress and provide ongoing feedback for pedagogical improvement.",
    "निर्माणात्मक मूल्यांकन सीखने के लिए मूल्यांकन (Assessment for Learning) है जो अधिगम प्रक्रिया में निरंतर सुधार हेतु किया जाता है।",
    "Easy", ["CCE", "Formative Assessment", "Evaluation"]))

questions.append(q(48, 4, t4, th4, "Holistic Progress Card (HPC)",
    "According to NEP 2020, what is the unique feature of the 360-degree Holistic Progress Card (HPC)?",
    "एनईपी 2020 के अनुसार 360-डिग्री समग्र प्रगति कार्ड (HPC) की प्रमुख विशेषता क्या है?",
    ["It records only final examination numerical scores", "It is a multidimensional report capturing cognitive, affective, and psychomotor domains with self, peer, and teacher assessment", "It assesses only sports achievements", "It replaces all textbooks with external tests"],
    ["यह केवल अंतिम परीक्षा के अंकों को दर्ज करता है", "यह ज्ञानात्मक, भावात्मक और मनोगत्यात्मक क्षेत्रों का बहुआयामी मूल्यांकन है जिसमें स्व, सहपाठी व शिक्षक का आकलन शामिल है", "यह केवल खेलकूद का मूल्यांकन करता है", "यह पाठ्यपुस्तकों को समाप्त करता है"],
    1, "The 360-degree Holistic Progress Card assesses learners across cognitive, socio-emotional, and psychomotor domains, integrating self, peer, and teacher evaluations.",
    "समग्र प्रगति कार्ड (HPC) संज्ञानात्मक, भावात्मक और क्रियात्मक विकास का 360-डिग्री समग्र रिपोर्ट कार्ड है जिसमें स्व-मूल्यांकन व सहपाठी मूल्यांकन शामिल है।",
    "Medium", ["HPC", "NEP 2020", "Evaluation"]))

questions.append(q(49, 4, t4, th4, "PARAKH National Assessment Centre",
    "What is the statutory role of 'PARAKH' (Performance Assessment, Review, and Analysis of Knowledge for Holistic Development) established by NCERT under NEP 2020?",
    "एनईपी 2020 के अंतर्गत एनसीईआरटी द्वारा स्थापित 'परख' (PARAKH) का मुख्य वैधानिक दायित्व क्या है?",
    ["Printing state textbooks exclusively", "Setting assessment standards, learning benchmarks, and guiding all school boards across India for uniform evaluation norms", "Conducting university admissions", "Auditing midday meal food quality"],
    ["केवल पाठ्यपुस्तकों की छपाई करना", "देश भर के सभी स्कूल बोर्डों के लिए मूल्यांकन मानक तय करना तथा एकसमान मूल्यांकन दिशा-निर्देश प्रदान करना", "विश्वविद्यालय प्रवेश परीक्षा लेना", "मिड-डे मील की जांच करना"],
    1, "PARAKH serves as a standard-setting body to establish norms, benchmarks, and recommendations for assessment and evaluation across all recognized school boards in India.",
    "परख (PARAKH) देश भर के सभी मान्यता प्राप्त शिक्षा बोर्डों में मूल्यांकन के एकरूप मानक और अधिगम प्रतिफल निर्धारित करने वाला राष्ट्रीय केंद्र है।",
    "Medium", ["PARAKH", "Assessment Standards", "NEP 2020"]))

questions.append(q(50, 4, t4, th4, "Criterion-Referenced vs Norm-Referenced Tests",
    "In educational measurement, what distinguishes a 'Criterion-Referenced Test' (CRT) from a 'Norm-Referenced Test' (NRT)?",
    "शैक्षिक मापन में 'निकष-संदर्भित परीक्षण' (CRT) को 'मानक-संदर्भित परीक्षण' (NRT) से कौन सी विशेषता अलग करती है?",
    ["A CRT compares a student's performance against predefined absolute learning objectives/standards, whereas an NRT ranks students relative to a peer group", "A CRT tests only physical fitness", "An NRT has no passing marks", "CRT is used only in primary school"],
    ["सीआरटी छात्र के प्रदर्शन की तुलना पूर्व-निर्धारित अधिगम मानकों/उद्देश्यों से करता है, जबकि एनआरटी छात्रों की आपस में तुलना कर रैंक निर्धारित करता है", "सीआरटी केवल शारीरिक दक्षता नापता है", "एनआरटी में कोई पासिंग अंक नहीं होते", "सीआरटी केवल प्राथमिक स्तर पर होता है"],
    0, "Criterion-referenced testing assesses whether an individual has achieved specific learning criteria/competencies regardless of how other students scored.",
    "निकष-संदर्भित परीक्षण (CRT) में छात्र की उपलब्धि का मूल्यांकन पूर्व-निर्धारित दक्षताओं के आधार पर किया जाता है, किसी अन्य छात्र के सापेक्ष नहीं।",
    "Hard", ["Criterion-Referenced Test", "Norm-Referenced", "Measurement"]))

questions.append(q(51, 4, t4, th4, "Psychometric Concepts: Reliability and Validity",
    "If an educational test consistently yields the same scores for the same students upon repeated administrations under identical conditions, the test possesses high:",
    "यदि कोई शैक्षिक परीक्षण समान परिस्थितियों में बार-बार लिए जाने पर भी छात्रों को समान अंक प्रदान करता है, तो उस परीक्षण में उच्च स्तर की क्या पाई जाती है?",
    ["Validity (वैधता)", "Reliability (विश्वसनीयता)", "Objectivity (वस्तुनिष्ठता)", "Usability (उपयोगिता)"],
    ["वैधता (Validity)", "विश्वसनीयता (Reliability)", "वस्तुनिष्ठता (Objectivity)", "उपयोगिता (Usability)"],
    1, "Reliability refers to the consistency or repeatability of measurement scores across repeated tests or different raters.",
    "मापन की स्थिरता, निरंतरता और संगति को 'विश्वसनीयता' (Reliability) कहा जाता है।",
    "Medium", ["Reliability", "Measurement", "Validity"]))

questions.append(q(52, 4, t4, th4, "Psychometric Concepts: Validity",
    "The degree to which an examination actually measures what it purports or intends to measure is defined as its:",
    "कोई परीक्षा वास्तव में उसी योग्यता या ज्ञान का मापन करती है जिसके लिए उसका निर्माण किया गया है, यह गुण क्या कहलाता है?",
    ["Reliability", "Validity (वैधता)", "Standardization", "Difficulty index"],
    ["विश्वसनीयता", "वैधता (Validity)", "मानकीकरण", "कठिनाई स्तर"],
    1, "Validity is the most vital psychometric property: whether a test truly measures the specific construct it claims to measure.",
    "वैधता (Validity) परीक्षण की वह क्षमता है जिससे वह उसी उद्देश्य का मापन करता है जिसके लिए वह बना है।",
    "Easy", ["Validity", "Educational Measurement"]))

questions.append(q(53, 4, t4, th4, "Bloom's Revised Taxonomy in Assessment",
    "In Anderson & Krathwohl's Revised Bloom's Taxonomy of cognitive domains, which is the highest cognitive process level?",
    "एंडरसन और क्रैथवोहल द्वारा संशोधित ब्लूम के संज्ञानात्मक वर्गीकरण में सर्वोच्च स्तर कौन सा है?",
    ["Evaluating", "Creating (सृजन / निर्माण करना)", "Analyzing", "Applying"],
    ["मूल्यांकन (Evaluating)", "सृजन / निर्माण करना (Creating)", "विश्लेषण (Analyzing)", "अनुप्रयोग (Applying)"],
    1, "The revised cognitive levels from lowest to highest are: Remembering, Understanding, Applying, Analyzing, Evaluating, and Creating.",
    "संशोधित ब्लूम वर्गीकरण में उच्चतम स्तर 'Creating' (सृजन करना/नया विचार रचना) है।",
    "Medium", ["Bloom's Taxonomy", "Cognitive Levels", "Pedagogy"]))

questions.append(q(54, 4, t4, th4, "Diagnostic Assessment and Remedial Teaching",
    "What is the primary function of a 'Diagnostic Test' administered by school educators?",
    "शिक्षकों द्वारा लिए जाने वाले 'नैदानिक परीक्षण' (Diagnostic Test) का प्राथमिक उद्देश्य क्या होता है?",
    ["To fail weak students in the term examination", "To identify specific learning difficulties, misconceptions, and conceptual gaps of individual students to design remedial instruction", "To award merit scholarships", "To rank classes across the school"],
    ["सत्र परीक्षा में कमजोर छात्रों को अनुत्तीर्ण करना", "विद्यार्थियों की विशिष्ट अधिगम कठिनाइयों, भ्रांतियों और कमियों की पहचान कर उपचारात्मक शिक्षण की योजना बनाना", "मेधावी छात्रवृत्ति देना", "कक्षाओं की तुलनात्मक रैंकिंग करना"],
    1, "Diagnostic assessment identifies persistent or recurring learning difficulties that are left uncorrected by standard classroom instruction.",
    "नैदानिक परीक्षण का उद्देश्य विद्यार्थी की अधिगम संबंधी कमजोरियों और कारणों का पता लगाना है ताकि उनका सटीक उपचारात्मक शिक्षण किया जा सके।",
    "Easy", ["Diagnostic Assessment", "Remedial Teaching"]))

questions.append(q(55, 4, t4, th4, "National Achievement Survey (NAS)",
    "What is the core purpose of the periodic National Achievement Survey (NAS) conducted across Indian schools?",
    "भारतीय विद्यालयों में समय-समय पर आयोजित होने वाले राष्ट्रीय उपलब्धि सर्वेक्षण (NAS) का मुख्य उद्देश्य क्या है?",
    ["Declaring individual pass/fail results of children", "Evaluating the overall health of the school education system and providing data-driven feedback on systemic learning outcomes", "Promoting teachers to administrative posts", "Conducting university entrance screening"],
    ["बच्चों के व्यक्तिगत पास/फेल परिणाम घोषित करना", "स्कूली शिक्षा व्यवस्था के स्वास्थ्य का मूल्यांकन करना तथा सीखने के प्रतिफलों (Learning Outcomes) पर साक्ष्य-आधारित नीतिगत प्रतिपुष्टि देना", "शिक्षकों को प्रशासनिक पदों पर पदोन्नत करना", "विश्वविद्यालय प्रवेश परीक्षा लेना"],
    1, "NAS is a sample-based survey that reflects the health of the educational system, measuring children's learning competencies at Classes 3, 5, 8, and 10.",
    "राष्ट्रीय उपलब्धि सर्वेक्षण (NAS) स्कूली शिक्षा प्रणाली की प्रभावशीलता और बच्चों की दक्षताओं का आकलन करने वाला राष्ट्रीय स्तर का सर्वेक्षण है।",
    "Medium", ["NAS", "Learning Outcomes", "Educational Policy"]))

questions.append(q(56, 4, t4, th4, "NEP 2020 Foundational Literacy and Numeracy (FLN)",
    "What national deadline has been set under the NIPUN Bharat Mission for every child to attain foundational literacy and numeracy by the end of Grade 3?",
    "निपुण भारत मिशन के तहत प्रत्येक बच्चे द्वारा कक्षा 3 के अंत तक बुनियादी साक्षरता और संख्याज्ञान (FLN) प्राप्त करने का राष्ट्रीय लक्ष्य वर्ष क्या निर्धारित किया गया है?",
    ["2024-25", "2026-27", "2030-31", "2035-36"],
    ["2024-25", "2026-27", "2030-31", "2035-36"],
    1, "Under NIPUN Bharat launched pursuant to NEP 2020, universal acquisition of FLN by Grade 3 is targeted for achievement by 2026-27.",
    "एनईपी 2020 के अंतर्गत निपुण भारत मिशन का लक्ष्य वर्ष 2026-27 तक प्रत्येक बच्चे को बुनियादी साक्षरता व संख्याज्ञान में दक्ष बनाना है।",
    "Medium", ["NIPUN Bharat", "FLN", "NEP 2020"]))

questions.append(q(57, 4, t4, th4, "Item Analysis in Educational Testing",
    "In psychometrics, an examination question having a 'Difficulty Value' (p-value) of 0.85 indicates that:",
    "मनोमिति एवं परीक्षण में, किसी प्रश्न का 'कठिनाई मान' (Difficulty Index / p-value) यदि 0.85 है, तो यह क्या दर्शाता है?",
    ["The item is very difficult and only 15% answered correctly", "The item is relatively easy as 85% of test-takers answered it correctly", "The item has negative discrimination", "The question contains defective distractors"],
    ["प्रश्न बहुत कठिन है और केवल 15% ने सही उत्तर दिया", "प्रश्न अपेक्षाकृत सरल है क्योंकि 85% परीक्षार्थियों ने इसका सही उत्तर दिया है", "प्रश्न में नकारात्मक विभेदन है", "प्रश्न में त्रुटिपूर्ण विकल्प हैं"],
    1, "Difficulty index (p) is the proportion of examinees who answered the item correctly. A value of 0.85 means 85% passed the item (making it an easy item).",
    "कठिनाई सूचकांक सही उत्तर देने वाले परीक्षार्थियों का अनुपात होता है। 0.85 का अर्थ है कि 85% परीक्षार्थियों ने सही उत्तर दिया, अतः प्रश्न सरल है।",
    "Medium", ["Item Analysis", "Difficulty Index", "Evaluation"]))

questions.append(q(58, 4, t4, th4, "Rubrics in Authentic Assessment",
    "What is an 'Analytic Rubric' used by school leadership and teachers for authentic performance assessment?",
    "शिक्षकों एवं प्रधानाचार्यों द्वारा प्रामाणिक निष्पादन मूल्यांकन हेतु प्रयुक्त 'विश्लेषणात्मक रूब्रिक' (Analytic Rubric) क्या होता है?",
    ["A simple single numerical pass percentage mark", "A scoring guide that evaluates student performance on multiple distinct criteria or dimensions with explicit descriptive achievement levels", "An attendance checklist", "A multiple choice test scoring key"],
    ["एक साधारण पास प्रतिशत अंक", "एक मूल्यांकन मार्गदर्शिका जो बहु-आयामी मानदंडों पर स्पष्ट वर्णनात्मक स्तरों के साथ छात्र निष्पादन का पृथक-पृथक मूल्यांकन करती है", "दैनिक उपस्थिति जांच सूची", "वस्तुनिष्ठ प्रश्न उत्तर कुंजी"],
    1, "An analytic rubric identifies separate criteria for assessment and provides detailed descriptions of performance at each level for each criterion.",
    "विश्लेषणात्मक रूब्रिक विभिन्न कौशलों व मानदंडों पर विद्यार्थी के प्रदर्शन का स्पष्ट वर्णनात्मक पैमानों पर सटीक मूल्यांकन करता है।",
    "Medium", ["Rubrics", "Performance Assessment", "Evaluation"]))

questions.append(q(59, 4, t4, th4, "NEP 2020 Board Examination Reforms",
    "How does NEP 2020 recommend reforming Grade 10 and 12 Board Examinations to eliminate high-stakes coaching culture?",
    "एनईपी 2020 कोचिंग संस्कृति को समाप्त करने हेतु कक्षा 10 एवं 12 की बोर्ड परीक्षाओं में किस सुधार की अनुशंसा करती है?",
    ["Abolish all secondary schools", "Make board examinations test core competencies rather than rote memorization, and offer examinations on up to two occasions in a given school year", "Double the syllabus syllabus volume", "Rely entirely on physical sports"],
    ["सभी माध्यमिक विद्यालय बंद करना", "बोर्ड परीक्षाओं में रटंत प्रणाली के स्थान पर मूल दक्षताओं का परीक्षण करना और वर्ष में दो बार परीक्षा का अवसर प्रदान करना", "पाठ्यक्रम का आकार दोगुना करना", "केवल खेलों पर निर्भर रहना"],
    1, "NEP 2020 recommends that Board exams test core concepts and higher-order capacities, allowing students to take them on up to two occasions to reduce stress.",
    "एनईपी 2020 बोर्ड परीक्षाओं को रटने के बजाय मुख्य दक्षताओं पर केंद्रित करने तथा तनाव कम करने हेतु साल में दो बार अवसर देने का प्रस्ताव करती है।",
    "Medium", ["NEP 2020", "Board Examination Reforms"]))

questions.append(q(60, 4, t4, th4, "Standard Error of Measurement",
    "What does the 'Standard Error of Measurement' (SEM) reflect regarding a student's observed examination score?",
    "शैक्षिक मापन में 'मापन की मानक त्रुटि' (SEM) विद्यार्थी के प्राप्त अंक के संदर्भ में क्या दर्शाती है?",
    ["The student cheated in the exam", "The expected dispersion or band of error around the student's true score due to imperfect measurement reliability", "The cost of printing the exam paper", "The teacher's typing errors"],
    ["छात्र ने परीक्षा में अनुचित साधन का प्रयोग किया", "मापन की अपूर्ण विश्वसनीयता के कारण छात्र के वास्तविक अंक के आसपास संभावित विचलन या त्रुटि का दायरा", "प्रश्न-पत्र मुद्रण की लागत", "शिक्षक की टंकण त्रुटि"],
    1, "SEM estimates how much an individual's observed score is expected to vary from their true score across repeated test administrations.",
    "मापन की मानक त्रुटि (SEM) यह दर्शाती है कि परीक्षण की स्वाभाविक सीमाओं के कारण वास्तविक अंक में कितना संभावित विचलन हो सकता है।",
    "Hard", ["SEM", "Educational Measurement", "Psychometrics"]))

print(f"Area 3 & 4 generated: total questions now {len(questions)}.")

with open("scripts/temp_upsc_1_to_4.json", "w", encoding="utf-8") as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)
