# -*- coding: utf-8 -*-
import json
import os

print("Building UPSC Principal CRT 120 Questions across 8 Prescribed Areas...")

def make_q(qid, area_num, topic, topic_hi, subtopic, q_en, q_hi, opts_en, opts_hi, correct, exp_en, exp_hi, diff, tags):
    return {
        "id": qid,
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

questions = []

# ==========================================
# AREA 1: General Knowledge & Contemporary Issues (15 Questions: upsc-crt-1 to upsc-crt-15)
# ==========================================
area1_topic = "General Knowledge, including contemporary social, economic and cultural issues"
area1_topic_hi = "सामान्य ज्ञान एवं समसामयिक सामाजिक, आर्थिक व सांस्कृतिक मुद्दे"

questions.append(make_q(
    "upsc-crt-1", 1, area1_topic, area1_topic_hi,
    "National & International Current Affairs",
    "Which international summit was hosted in New Delhi in September 2023 under India's presidency under the theme 'Vasudhaiva Kutumbakam' (One Earth, One Family, One Future)?",
    "भारत की अध्यक्षता में 'वसुधैव कुटुंबकम' (एक पृथ्वी, एक परिवार, एक भविष्य) विषय के तहत सितंबर 2023 में किस अंतरराष्ट्रीय शिखर सम्मेलन का आयोजन नई दिल्ली में हुआ?",
    ["G20 Leaders' Summit", "BRICS Summit", "SCO Heads of State Summit", "COP28 Climate Summit"],
    ["जी20 लीडर्स समिट", "ब्रिक्स शिखर सम्मेलन", "एससीओ राष्ट्राध्यक्ष शिखर सम्मेलन", "सीओपी28 जलवायु सम्मेलन"],
    0,
    "The 18th G20 Leaders' Summit was held at Bharat Mandapam, New Delhi in September 2023 under India's presidency, which also formally inducted the African Union as a permanent member.",
    "18वां जी20 शिखर सम्मेलन सितंबर 2023 में नई दिल्ली के भारत मंडपम में आयोजित हुआ जिसमें अफ्रीकी संघ को स्थायी सदस्य का दर्जा दिया गया।",
    "Easy", ["G20", "Current Affairs", "Summit"]
))

questions.append(make_q(
    "upsc-crt-2", 1, area1_topic, area1_topic_hi,
    "Indian Constitution & Democratic Institutions",
    "Under Article 21A of the Indian Constitution, the State is mandated to provide free and compulsory education to all children of which age group as a Fundamental Right?",
    "भारतीय संविधान के अनुच्छेद 21A के अंतर्गत राज्य द्वारा किस आयु वर्ग के सभी बच्चों को मौलिक अधिकार के रूप में निःशुल्क व अनिवार्य शिक्षा उपलब्ध कराना अनिवार्य है?",
    ["3 to 6 years", "6 to 14 years", "6 to 18 years", "5 to 15 years"],
    ["3 से 6 वर्ष", "6 से 14 वर्ष", "6 से 18 वर्ष", "5 से 15 वर्ष"],
    1,
    "Article 21A, enacted via the 86th Constitutional Amendment Act 2002, guarantees free and compulsory education for children between the ages of 6 and 14 years.",
    "86वें संविधान संशोधन अधिनियम 2002 द्वारा शामिल अनुच्छेद 21A 6 से 14 वर्ष के बच्चों को मौलिक अधिकार के रूप में निःशुल्क व अनिवार्य शिक्षा की गारंटी देता है।",
    "Easy", ["Constitution", "Article 21A", "Fundamental Rights"]
))

questions.append(make_q(
    "upsc-crt-3", 1, area1_topic, area1_topic_hi,
    "Socio-Economic Development & Census Data",
    "According to the Census of India 2011, what was the national effective literacy rate of India?",
    "2011 की भारतीय जनगणना के अनुसार, भारत की राष्ट्रीय प्रभावी साक्षरता दर कितनी थी?",
    ["64.84%", "70.04%", "74.04%", "78.20%"],
    ["64.84%", "70.04%", "74.04%", "78.20%"],
    2,
    "According to Census 2011, the literacy rate in India was 74.04% (82.14% for males and 65.46% for females).",
    "जनगणना 2011 के अनुसार भारत में साक्षरता दर 74.04% (पुरुष: 82.14%, महिला: 65.46%) दर्ज की गई थी।",
    "Medium", ["Census 2011", "Literacy", "Demographics"]
))

questions.append(make_q(
    "upsc-crt-4", 1, area1_topic, area1_topic_hi,
    "Sustainable Development Goals & Education",
    "Which United Nations Sustainable Development Goal (SDG) explicitly focuses on ensuring inclusive and equitable quality education and promoting lifelong learning opportunities for all?",
    "संयुक्त राष्ट्र का कौन सा सतत विकास लक्ष्य (SDG) सभी के लिए समावेशी व समान गुणवत्तापूर्ण शिक्षा और आजीवन सीखने के अवसरों को बढ़ावा देने पर केंद्रित है?",
    ["SDG 1 (No Poverty)", "SDG 3 (Good Health)", "SDG 4 (Quality Education)", "SDG 5 (Gender Equality)"],
    ["एसडीजी 1 (गरीबी उन्मूलन)", "एसडीजी 3 (अच्छा स्वास्थ्य)", "एसडीजी 4 (गुणवत्तापूर्ण शिक्षा)", "एसडीजी 5 (लैंगिक समानता)"],
    2,
    "SDG 4 is dedicated to Quality Education, aiming to ensure universal completion of free, equitable, and quality primary and secondary education by 2030.",
    "एसडीजी 4 का उद्देश्य 2030 तक सभी बालकों के लिए समावेशी, न्यायसंगत और गुणवत्तापूर्ण प्राथमिक व माध्यमिक शिक्षा सुनिश्चित करना है।",
    "Easy", ["SDG 4", "Quality Education", "Global Goals"]
))

questions.append(make_q(
    "upsc-crt-5", 1, area1_topic, area1_topic_hi,
    "Contemporary Social Issues & Initiatives",
    "What is the statutory role of the National Commission for Protection of Child Rights (NCPCR) established under the CPCR Act, 2005?",
    "बाल अधिकार संरक्षण आयोग अधिनियम, 2005 के अंतर्गत गठित राष्ट्रीय बाल अधिकार संरक्षण आयोग (NCPCR) का वैधानिक दायित्व क्या है?",
    ["Conduct university examinations only", "Protect, monitor, and safeguard constitutional and statutory rights of children, including RTE Act implementation", "Collect municipal property taxes", "Manage international school sports"],
    ["केवल विश्वविद्यालय स्तर की परीक्षाएं कराना", "बच्चों के संवैधानिक व कानूनी अधिकारों की रक्षा, निगरानी तथा आरटीई अधिनियम के क्रियान्वयन की जांच करना", "नगर निगम संपत्ति कर वसूलना", "अंतरराष्ट्रीय स्कूल खेल आयोजित करना"],
    1,
    "The NCPCR is mandated under Section 13 of CPCR Act 2005 and Section 31 of RTE Act 2009 to protect and monitor child rights throughout India.",
    "एनसीपीसीआर बाल अधिकार संरक्षण कानून और आरटीई की धारा 31 के तहत बच्चों के अधिकारों और हितों की रक्षा करने वाली सर्वोच्च वैधानिक संस्था है।",
    "Medium", ["NCPCR", "Child Rights", "RTE Act"]
))

questions.append(make_q(
    "upsc-crt-6", 1, area1_topic, area1_topic_hi,
    "Indian Cultural Heritage & Philosophy",
    "The motto of India 'Satyameva Jayate' inscribed below the National Emblem of India is taken from which classical Upanishad?",
    "भारत के राष्ट्रीय प्रतीक के नीचे उत्कीर्ण आदर्श वाक्य 'सत्यमेव जयते' किस प्राचीन उपनिषद से उद्धृत है?",
    ["Katha Upanishad", "Mundaka Upanishad", "Chandogya Upanishad", "Brihadaranyaka Upanishad"],
    ["कठोपनिषद", "मुण्डकोपनिषद", "छांदोग्य उपनिषद", "बृहदारण्यक उपनिषद"],
    1,
    "'Satyameva Jayate' (Truth alone triumphs) is a mantra from the ancient Hindu scripture Mundaka Upanishad (3.1.6).",
    "'सत्यमेव जयते' मुण्डकोपनिषद से लिया गया है जिसका अर्थ है 'सत्य की ही जीत होती है'।",
    "Easy", ["Cultural Heritage", "Satyameva Jayate", "Upanishads"]
))

questions.append(make_q(
    "upsc-crt-7", 1, area1_topic, area1_topic_hi,
    "Indian Economy & Banking Reforms",
    "Which institutional apex body in India formulates monetary policy, regulates banking reserves, and issues currency notes under the RBI Act, 1934?",
    "आरबीआई अधिनियम 1934 के अंतर्गत भारत में मौद्रिक नीति का निर्धारण, बैंकिंग आरक्षित अनुपात का नियमन और मुद्रा जारी करने वाला शीर्ष निकाय कौन सा है?",
    ["NITI Aayog", "Reserve Bank of India (RBI)", "Securities and Exchange Board of India (SEBI)", "State Bank of India"],
    ["नीति आयोग", "भारतीय रिज़र्व बैंक (RBI)", "भारतीय प्रतिभूति और विनिमय बोर्ड (SEBI)", "भारतीय स्टेट बैंक"],
    1,
    "The Reserve Bank of India (RBI) is India's central bank and regulatory body responsible for the issue and supply of the Indian rupee and the regulation of the Indian banking system.",
    "भारतीय रिज़र्व बैंक (RBI) भारत का केंद्रीय बैंक है जो मौद्रिक नीति, मुद्रा निर्गमन और वाणिज्यिक बैंकों के नियमन के लिए उत्तरदायी है।",
    "Easy", ["RBI", "Economy", "Monetary Policy"]
))

questions.append(make_q(
    "upsc-crt-8", 1, area1_topic, area1_topic_hi,
    "Science, Technology & Space",
    "Which solar space observatory was launched by the Indian Space Research Organisation (ISRO) in September 2023 to study the Sun from the Lagrange point L1?",
    "सूर्य का अध्ययन करने हेतु सितंबर 2023 में भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) द्वारा लैग्रेंज बिंदु L1 पर कौन सी सौर वेधशाला स्थापित की गई?",
    ["Aditya-L1", "Surya-Kiran", "Mangalyaan-2", "AstroSat-2"],
    ["आदित्य-एल1", "सूर्य-किरण", "मंगलयान-2", "एस्ट्रोसैट-2"],
    0,
    "Aditya-L1 is India's first dedicated space observatory placed at the Sun-Earth Lagrange point L1, approximately 1.5 million km from Earth, to study the solar corona, chromosphere, and solar emissions.",
    "आदित्य-एल1 भारत की पहली समर्पित सौर वेधशाला है जिसे सूर्य-पृथ्वी लैग्रेंजियन बिंदु L1 पर सूर्य के बाह्य वायुमंडल के अध्ययन के लिए स्थापित किया गया है।",
    "Easy", ["Aditya-L1", "ISRO", "Space Science"]
))

questions.append(make_q(
    "upsc-crt-9", 1, area1_topic, area1_topic_hi,
    "Indian Constitution & Parliamentary Procedures",
    "In the Indian Parliament, what is the term used for the period immediately following Question Hour where members can raise matters of urgent public importance without prior notice?",
    "भारतीय संसद में प्रश्नकाल के ठीक बाद के उस समय को क्या कहा जाता है जिसमें सदस्य बिना पूर्व सूचना के अविलंबनीय लोक महत्व के मामले उठा सकते हैं?",
    ["Zero Hour (शून्य काल)", "Calling Attention Motion", "Adjournment Hour", "Guillotine Hour"],
    ["शून्य काल (Zero Hour)", "ध्यानाकर्षण प्रस्ताव", "स्थगन काल", "गिलोटिन काल"],
    0,
    "Zero Hour is an Indian parliamentary innovation starting around 12:00 noon immediately following Question Hour, allowing MPs to raise urgent matters without prior notice.",
    "शून्य काल (Zero Hour) भारतीय संसदीय नवाचार है जो प्रश्नकाल के तुरंत बाद शुरू होता है और इसमें जनहित के महत्वपूर्ण मुद्दे उठाए जाते हैं।",
    "Medium", ["Parliament", "Zero Hour", "Constitution"]
))

questions.append(make_q(
    "upsc-crt-10", 1, area1_topic, area1_topic_hi,
    "Contemporary Social & Welfare Policies",
    "The Pradhan Mantri Jan Dhan Yojana (PMJDY) primarily aims at achieving which fundamental economic objective?",
    "प्रधानमंत्री जन धन योजना (PMJDY) का मुख्य उद्देश्य किस आर्थिक लक्ष्य को प्राप्त करना है?",
    ["Universal Financial Inclusion through universal banking access", "Distributing agricultural tractors", "Funding private international universities", "Providing commercial export subsidies"],
    ["सार्वभौमिक बैंकिंग पहुंच के माध्यम से वित्तीय समावेशन (Financial Inclusion)", "कृषि ट्रैक्टरों का वितरण करना", "निजी विदेशी विश्वविद्यालयों को निधि देना", "वाणिज्यिक निर्यात सब्सिडी प्रदान करना"],
    0,
    "PMJDY is a national mission for financial inclusion to ensure access to financial services, namely basic savings accounts, remittance, credit, insurance, and pension in an affordable manner.",
    "पीएमजेडीवाई देश के सभी परिवारों तक बुनियादी बैंकिंग, प्रेषण, ऋण, बीमा व पेंशन जैसी वित्तीय सेवाएं पहुंचाकर वित्तीय समावेशन सुनिश्चित करने का राष्ट्रीय मिशन है।",
    "Easy", ["Financial Inclusion", "PMJDY", "Economic Issues"]
))

questions.append(make_q(
    "upsc-crt-11", 1, area1_topic, area1_topic_hi,
    "Environmental Ecology & Climate Agreements",
    "Under the Paris Agreement on Climate Change (COP21), what is the long-term temperature goal agreed upon by signatory nations?",
    "जलवायु परिवर्तन पर पेरिस समझौते (COP21) के तहत हस्ताक्षरकर्ता देशों द्वारा दीर्घकालिक तापमान वृद्धि को किस सीमा तक सीमित रखने का लक्ष्य रखा गया है?",
    ["Limit global average temperature increase to well below 2°C above pre-industrial levels, pursuing efforts to limit to 1.5°C", "Allow up to 4°C increase by 2050", "Maintain constant global ice cover without emissions reduction", "Ban all fossil fuel use overnight"],
    ["औद्योगिक पूर्व स्तरों से वैश्विक औसत तापमान वृद्धि को 2°C से काफी नीचे रखना और 1.5°C तक सीमित करने के प्रयास जारी रखना", "2050 तक 4°C तक की वृद्धि की अनुमति देना", "उत्सर्जन घटाए बिना केवल बर्फ बनाए रखना", "सभी जीवाश्म ईंधनों पर रातों-रात रोक"],
    0,
    "The Paris Agreement aims to keep global temperature rise this century well below 2 degrees Celsius above pre-industrial levels and pursue efforts to limit the increase to 1.5 degrees Celsius.",
    "पेरिस समझौते का मुख्य लक्ष्य वैश्विक तापमान में वृद्धि को पूर्व-औद्योगिक स्तर से 2°C से कम रखना और इसे 1.5°C तक सीमित रखने का भरसक प्रयास करना है।",
    "Medium", ["Environment", "Paris Agreement", "Climate Change"]
))

questions.append(make_q(
    "upsc-crt-12", 1, area1_topic, area1_topic_hi,
    "Indian Polity & Local Self-Government",
    "Which Constitutional Amendment Act accorded constitutional status to Panchayati Raj Institutions (Rural Local Self-Government) in India?",
    "भारत में किस संविधान संशोधन अधिनियम द्वारा पंचायती राज संस्थाओं (ग्रामीण स्थानीय स्वशासन) को संवैधानिक दर्जा प्रदान किया गया?",
    ["42nd Amendment Act", "44th Amendment Act", "73rd Amendment Act 1992", "86th Amendment Act"],
    ["42वां संशोधन अधिनियम", "44वां संशोधन अधिनियम", "73वां संशोधन अधिनियम 1992", "86वां संशोधन अधिनियम"],
    2,
    "The 73rd Constitutional Amendment Act of 1992 inserted Part IX and the 11th Schedule to the Constitution, giving constitutional backing to Panchayati Raj Institutions.",
    "73वें संविधान संशोधन 1992 के द्वारा संविधान में भाग IX और 11वीं अनुसूची जोड़ी गई, जिसने पंचायती राज को संवैधानिक स्वरूप प्रदान किया।",
    "Easy", ["73rd Amendment", "Panchayati Raj", "Local Governance"]
))

questions.append(make_q(
    "upsc-crt-13", 1, area1_topic, area1_topic_hi,
    "Indian Geography & Agriculture",
    "Which is the longest national river of India, having the largest drainage basin covering about one-fourth of the country's geographical area?",
    "भारत की सबसे लंबी राष्ट्रीय नदी कौन सी है जिसका जल निकासी बेसिन देश के लगभग एक-चौथाई भौगोलिक क्षेत्र को कवर करता है?",
    ["Godavari", "Ganga", "Brahmaputra", "Narmada"],
    ["गोदावरी", "गंगा", "ब्रह्मपुत्र", "नर्मदा"],
    1,
    "The Ganga is India's longest river (2,525 km) within India and has the largest basin covering approximately 861,452 sq km across 11 states.",
    "गंगा भारत की सबसे लंबी नदी (2,525 किमी) है और इसका जल संग्रहण क्षेत्र देश में सबसे बड़ा है।",
    "Easy", ["Geography", "Ganga River", "Rivers of India"]
))

questions.append(make_q(
    "upsc-crt-14", 1, area1_topic, area1_topic_hi,
    "Contemporary Social Issues & Health",
    "What is the target age group of children covered under the statutory Poshan Abhiyan (National Nutrition Mission) for holistic nutrition interventions?",
    "पोषण अभियान (राष्ट्रीय पोषण मिशन) के तहत समग्र पोषण हस्तक्षेप के लिए लक्षित बच्चों का मुख्य आयु वर्ग क्या है?",
    ["0 to 6 years (along with pregnant women and lactating mothers)", "6 to 12 years only", "10 to 18 years exclusively", "18 to 25 years"],
    ["0 से 6 वर्ष के बच्चे (तथा गर्भवती व धात्री माताएं)", "केवल 6 से 12 वर्ष", "विशेष रूप से 10 से 18 वर्ष", "18 से 25 वर्ष"],
    0,
    "POSHAN Abhiyaan focuses on improving nutritional outcomes for children from 0 to 6 years of age, pregnant women, and lactating mothers to reduce stunting, wasting, and anemia.",
    "पोषण अभियान 0 से 6 वर्ष के बच्चों, गर्भवती महिलाओं और स्तनपान कराने वाली माताओं में कुपोषण, बौनापन और एनीमिया को कम करने का प्रमुख कार्यक्रम है।",
    "Medium", ["POSHAN Abhiyaan", "Health", "Social Schemes"]
))

questions.append(make_q(
    "upsc-crt-15", 1, area1_topic, area1_topic_hi,
    "Sports & Cultural Honours",
    "Which highest sporting honour of the Republic of India is awarded annually by the Ministry of Youth Affairs and Sports for spectacular performance over four years?",
    "चार वर्षों की अवधि में खेल के क्षेत्र में शानदार और उत्कृष्ट प्रदर्शन के लिए युवा मामले एवं खेल मंत्रालय द्वारा दिया जाने वाला भारत का सर्वोच्च खेल सम्मान कौन सा है?",
    ["Major Dhyan Chand Khel Ratna Award", "Arjuna Award", "Dronacharya Award", "Rashtriya Khel Protsahan Puruskar"],
    ["मेजर ध्यानचंद खेल रत्न पुरस्कार", "अर्जुन पुरस्कार", "द्रोणाचार्य पुरस्कार", "राष्ट्रीय खेल प्रोत्साहन पुरस्कार"],
    0,
    "The Major Dhyan Chand Khel Ratna Award (formerly Rajiv Gandhi Khel Ratna) is the highest sporting honour of India.",
    "मेजर ध्यानचंद खेल रत्न पुरस्कार भारत का सर्वोच्च खेल सम्मान है जो विगत चार वर्षों के उत्कृष्ट खेल प्रदर्शन हेतु प्रदान किया जाता है।",
    "Easy", ["Khel Ratna", "Sports Awards", "General Knowledge"]
))

print(f"Area 1 generated: {len(questions)} questions.")

# Write intermediate check to file
with open("scripts/temp_upsc.json", "w", encoding="utf-8") as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)
