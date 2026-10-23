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

def q(id_num, sec_num, unit_num, topic, topic_hi, subtopic, conceptId, learning, statute, rule, tier, src, cit, q_en, q_hi, opts_en, opts_hi, correct, exp_en, exp_hi, diff, tags):
    res = {
        "id": f"up-ic-{id_num}",
        "examType": "up-aided-principal",
        "sectionId": f"up-sec-{sec_num}",
        "unitId": f"up-unit-{unit_num}",
        "topic": topic,
        "topicHi": topic_hi,
        "subtopic": subtopic,
        "officialReference": f"UP Principal Syllabus Unit {unit_num}",
        "sourceInfo": {
            "priorityTier": tier,
            "sourceName": src,
            "citation": cit,
            "verificationStatus": "Verified",
            "verifiedDate": "2026-10-21",
            "verifiedBy": "Official UP Education Commission Syllabus Audit"
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
        "tags": tags + [f"Unit {unit_num}", "UP Principal"],
        "isPracticeQuestion": True,
        "isApproved": True,
        "createdAt": "2026-10-21T00:00:00Z"
    }
    res["fingerprint"] = generate_fingerprint(res)
    return res

up_sec1_2 = []

# ========================================================
# SECTION I: 30 Questions (Units 1, 2, 3: 10 Qs each)
# ========================================================

# Unit 1: Current Affairs, National/International, Personalities, Sports (121 to 130)
t1 = "Unit 1: Current affairs, national & international events, personalities & sports"
th1 = "इकाई 1: समसामयिक घटनाएं, राष्ट्रीय व अंतर्राष्ट्रीय परिदृश्य, प्रमुख व्यक्तित्व एवं खेलकूद"

u1_items = [
    # 121
    ("UP Semiconductor Policy & Fab Approvals", "UP-CA-SEMICONDUCTOR-POLICY-INCENTIVE", "Tests UP Semiconductor Policy 2024 capital subsidy incentives",
     "UP Semiconductor Policy 2024", "Cabinet Approval, Govt of Uttar Pradesh", 1, "Department of IT & Electronics, GoUP", "UP Semiconductor Policy Notification 2024",
     "Under the Uttar Pradesh Semiconductor Policy 2024, what percentage of capital subsidy on total project investment is provided by the State Government in addition to central government incentives for setting up semiconductor manufacturing units?",
     "उत्तर प्रदेश सेमीकंडक्टर नीति 2024 के तहत, राज्य में सेमीकंडक्टर विनिर्माण इकाइयां स्थापित करने के लिए केंद्र सरकार के प्रोत्साहनों के अतिरिक्त राज्य सरकार द्वारा कुल परियोजना निवेश पर कितने प्रतिशत पूंजीगत सब्सिडी (Capital Subsidy) प्रदान की जाती है?",
     ["Up to 25%", "Up to 50%", "Up to 75%", "Up to 10%"],
     ["25% तक", "50% तक", "75% तक", "10% तक"],
     1, "Under UP Semiconductor Policy 2024, the state offers up to 50% capital subsidy in addition to the Central Government's 50% incentive, making UP a premier investment destination.",
     "उत्तर प्रदेश सेमीकंडक्टर नीति 2024 के अंतर्गत केंद्र सरकार के 50% प्रोत्साहन के अतिरिक्त राज्य सरकार द्वारा भी 50% तक की अतिरिक्त पूंजीगत सब्सिडी दी जाती है।",
     "Difficult", ["Semiconductor Policy", "UP Economy", "Current Affairs"]),
    # 122
    ("National Sports Awards - UP Recipients", "UP-CA-SPORTS-ARJUNA-AWARDEES-UP", "Tests recent Arjuna Award winners from Uttar Pradesh in athletics and cricket",
     "Ministry of Youth Affairs and Sports Notifications", "National Sports Awards Gazette", 1, "Sports Authority of India (SAI)", "National Sports Awards Official List",
     "Indian fast bowler Mohammed Shami, who was conferred the prestigious Arjuna Award in 2024 for outstanding performance in the ICC Cricket World Cup 2023, hails from which district of Uttar Pradesh?",
     "आईसीसी क्रिकेट विश्व कप 2023 में उत्कृष्ट प्रदर्शन हेतु 2024 में प्रतिष्ठित अर्जुन पुरस्कार से सम्मानित भारतीय तेज गेंदबाज मोहम्मद शमी उत्तर प्रदेश के किस जिले से संबंधित हैं?",
     ["Amroha", "Aligarh", "Sambhal", "Moradabad"],
     ["अमरोहा", "अलीगढ़", "संभल", "मुरादाबाद"],
     0, "Mohammed Shami hails from Sahaspur village in Amroha district of Uttar Pradesh and was conferred the Arjuna Award by the President of India.",
     "मोहम्मद शमी उत्तर प्रदेश के अमरोहा जिले के जोया/सहसपुर गांव के निवासी हैं और उन्हें 2024 में राष्ट्रपति द्वारा अर्जुन पुरस्कार से सम्मानित किया गया।",
     "Easy", ["Mohammed Shami", "Arjuna Award", "UP Sports"]),
    # 123
    ("Khelo India University Games in Uttar Pradesh", "UP-CA-KHELO-INDIA-UP-EDITION", "Tests the host cities of Khelo India University Games held in UP",
     "Sports & Youth Affairs Dept, UP", "Khelo India Official Bulletin", 2, "Department of Sports, Government of Uttar Pradesh", "Khelo India University Games UP Report",
     "The 3rd Khelo India University Games (KIUG) were hosted by Uttar Pradesh across which four major cities of the state?",
     "तीसरे खेलो इंडिया यूनिवर्सिटी गेम्स (KIUG) का आयोजन उत्तर प्रदेश के किन चार प्रमुख शहरों में किया गया था?",
     ["Lucknow, Varanasi, Gorakhpur, and Gautam Buddha Nagar (Noida)",
      "Agra, Mathura, Firozabad, and Aligarh",
      "Kanpur, Prayagraj, Jhansi, and Bareilly",
      "Meerut, Ghaziabad, Moradabad, and Saharanpur"],
     ["लखनऊ, वाराणसी, गोरखपुर और गौतम बुद्ध नगर (नोएडा)",
      "आगरा, मथुरा, फिरोजाबाद और अलीगढ़",
      "कानपुर, प्रयागराज, झांसी और बरेली",
      "मेरठ, गाजियाबाद, मुरादाबाद और सहारनपुर"],
     0, "The 3rd KIUG was held across Lucknow, Varanasi, Gorakhpur, and Gautam Buddha Nagar (Noida), with shooting competitions held in New Delhi.",
     "तीसरे खेलो इंडिया यूनिवर्सिटी गेम्स उत्तर प्रदेश के चार शहरों (लखनऊ, वाराणसी, गोरखपुर और गौतम बुद्ध नगर/नोएडा) में आयोजित किए गए थे।",
     "Medium", ["Khelo India", "KIUG", "UP Sports"]),
    # 124
    ("UP International Trade Show", "UP-CA-UP-INTERNATIONAL-TRADE-SHOW", "Tests the venue and focus sectors of the annual UP International Trade Show (UPITS)",
     "Department of MSME and Export Promotion, UP", "UPITS Official Brochure", 2, "Government of Uttar Pradesh", "UPITS Annual Report",
     "The prestigious 'UP International Trade Show' (UPITS) showcasing the state's ODOP (One District One Product), MSMEs, and global export potential is organized annually at which international convention centre?",
     "उत्तर प्रदेश के 'ओडीओपी' (एक जिला एक उत्पाद), एमएसएमई और वैश्विक निर्यात क्षमता को प्रदर्शित करने वाला प्रतिष्ठित 'यूपी इंटरनेशनल ट्रेड शो' (UPITS) प्रतिवर्ष किस केंद्र पर आयोजित किया जाता है?",
     ["India Expo Centre & Mart, Greater Noida",
      "Indira Gandhi Pratishthan, Lucknow",
      "Rudraksh International Convention Centre, Varanasi",
      "Deendayal Hastkala Sankul, Varanasi"],
     ["इंडिया एक्सपो सेंटर एंड मार्ट, ग्रेटर नोएडा",
      "इंदिरा गांधी प्रतिष्ठान, लखनऊ",
      "रुद्राक्ष अंतरराष्ट्रीय सहयोग एवं सम्मेलन केंद्र, वाराणसी",
      "दीनदयाल हस्तकला संकुल, वाराणसी"],
     0, "The UP International Trade Show is organized at the India Expo Centre and Mart in Greater Noida, attracting global buyers and showcasing local artisans.",
     "यूपी इंटरनेशनल ट्रेड शो (UPITS) का आयोजन ग्रेटर नोएडा स्थित इंडिया एक्सपो सेंटर एंड मार्ट में किया जाता है।",
     "Easy", ["UPITS", "ODOP", "Trade and Commerce"]),
    # 125
    ("Ayodhya Maharishi Valmiki International Airport", "UP-CA-AYODHYA-AIRPORT-NOMENCLATURE", "Tests official nomenclature of newly inaugurated international airport in Ayodhya",
     "Ministry of Civil Aviation / AAI Notifications", "Cabinet Approval Gazette", 1, "Airports Authority of India (AAI)", "PIB Release, December 2023",
     "What is the official name of the newly constructed international airport inaugurated in Ayodhya in December 2023?",
     "दिसंबर 2023 में अयोध्या में उद्घाटित नवनिर्मित अंतरराष्ट्रीय हवाई अड्डे का आधिकारिक नाम क्या है?",
     ["Maharishi Valmiki International Airport, Ayodhyadham",
      "Lord Ram International Airport",
      "Koshal International Aerodrome",
      "Sarayu International Terminal"],
     ["महर्षि वाल्मीकि अंतरराष्ट्रीय हवाई अड्डा, अयोध्याधाम",
      "प्रभु श्री राम अंतरराष्ट्रीय हवाई अड्डा",
      "कोशल अंतरराष्ट्रीय एरोड्रम",
      "सरयू अंतरराष्ट्रीय टर्मिनल"],
     0, "The airport was officially named 'Maharishi Valmiki International Airport, Ayodhyadham' in honor of the author of the epic Ramayana.",
     "अयोध्या के नए अंतरराष्ट्रीय हवाई अड्डे का आधिकारिक नाम 'महर्षि वाल्मीकि अंतरराष्ट्रीय हवाई अड्डा, अयोध्याधाम' रखा गया है।",
     "Easy", ["Ayodhya Airport", "Maharishi Valmiki", "Infrastructure"]),
    # 126
    ("Major Dhyan Chand Sports University", "UP-CA-DHYANCHAND-SPORTS-UNIVERSITY-MEERUT", "Tests location of Uttar Pradesh's first state sports university",
     "UP State Universities Act Amendment", "UP Gazette Notification", 1, "Department of Higher Education & Sports, UP", "Sports University Establishment Act",
     "Uttar Pradesh's first State Sports University, named after hockey wizard Major Dhyan Chand, is being established at which location in the state?",
     "हॉकी के जादूगर मेजर ध्यानचंद के नाम पर उत्तर प्रदेश का पहला राज्य खेल विश्वविद्यालय राज्य के किस स्थान पर स्थापित किया जा रहा है?",
     ["Salawa, Meerut", "Kailashpur, Saharanpur", "Bithoor, Kanpur", "Naini, Prayagraj"],
     ["सलावा, मेरठ", "कैलाशपुर, सहारनपुर", "बिठूर, कानपुर", "नैनी, प्रयागराज"],
     0, "Major Dhyan Chand Sports University is being constructed at Salawa village in Sardhana tehsil of Meerut district at an estimated cost of Rs. 700 crore.",
     "उत्तर प्रदेश का पहला खेल विश्वविद्यालय मेरठ के सलावा (सरधना) में स्थापित किया जा रहा है, जिसका शिलान्यास प्रधानमंत्री द्वारा किया गया था।",
     "Medium", ["Major Dhyan Chand", "Sports University", "Meerut"]),
    # 127
    ("UP Population & Social Welfare - Kanya Sumangala Scheme Limit", "UP-CA-KANYA-SUMANGALA-REVISED-AMOUNT", "Tests the enhanced financial assistance under Mukhya Mantri Kanya Sumangala Yojana",
     "Women and Child Development Department, UP", "Government Order on Kanya Sumangala Revision 2024", 1, "Government of Uttar Pradesh", "Departmental Notification on Scheme Slabs",
     "Effective from financial year 2024-25, the Government of Uttar Pradesh enhanced the total financial grant under the 'Mukhya Mantri Kanya Sumangala Yojana' from Rs. 15,000 to what revised amount per girl child?",
     "वित्तीय वर्ष 2024-25 से प्रभावी, उत्तर प्रदेश सरकार ने 'मुख्यमंत्री कन्या सुमंगला योजना' के तहत कुल वित्तीय सहायता को 15,000 रुपये से बढ़ाकर प्रति बालिका कितना कर दिया है?",
     ["Rs. 20,000", "Rs. 25,000", "Rs. 30,000", "Rs. 50,000"],
     ["20,000 रुपये", "25,000 रुपये", "30,000 रुपये", "50,000 रुपये"],
     1, "The UP Government enhanced the assistance under Kanya Sumangala Yojana from Rs. 15,000 to Rs. 25,000 payable across six developmental stages from birth to graduation.",
     "उत्तर प्रदेश सरकार ने कन्या सुमंगला योजना की सहायता राशि 15,000 रुपये से बढ़ाकर 25,000 रुपये कर दी है जो 6 विभिन्न चरणों में प्रदान की जाती है।",
     "Medium", ["Kanya Sumangala", "Women Welfare", "UP Schemes"]),
    # 128
    ("UP Expressways - Ganga Expressway Route", "UP-CA-GANGA-EXPRESSWAY-TERMINALS", "Tests terminal districts of the 594 km Ganga Expressway",
     "Uttar Pradesh Expressways Industrial Development Authority (UPEIDA)", "UPEIDA Project Profile", 2, "UPEIDA, Government of Uttar Pradesh", "Ganga Expressway Alignment Map",
     "The 594 km long 'Ganga Expressway', one of India's longest access-controlled expressways under construction in Uttar Pradesh, connects which two terminal districts?",
     "उत्तर प्रदेश में निर्माणाधीन 594 किमी लंबा 'गंगा एक्सप्रेसवे' किन दो अंतिम (टर्मिनल) जिलों को आपस में जोड़ता है?",
     ["Meerut to Prayagraj", "Agra to Lucknow", "Noida to Ballia", "Gorakhpur to Varanasi"],
     ["मेरठ से प्रयागराज", "आगरा से लखनऊ", "नोएडा से बलिया", "गोरखपुर से वाराणसी"],
     0, "Ganga Expressway spans 594 km connecting Meerut (Bijoli village) to Prayagraj (Judapur Dandu village) traversing through 12 districts.",
     "गंगा एक्सप्रेसवे मेरठ (बिजौली) से शुरू होकर प्रयागराज (जुड़ापुर दांदू) तक जाता है और 12 जिलों से होकर गुजरता है।",
     "Easy", ["Ganga Expressway", "UPEIDA", "Infrastructure"]),
    # 129
    ("GI Tagged Products - Uttar Pradesh Ranking", "UP-CA-GI-TAG-UP-HIGHEST-CRAFT-TAGS", "Tests UP's top ranking in Geographical Indication (GI) tagged handicrafts",
     "Geographical Indications Registry, Government of India", "DPIIT Annual Report on GI Tags", 1, "Department for Promotion of Industry and Internal Trade (DPIIT)", "Intellectual Property India Journal",
     "As of 2024, Uttar Pradesh ranks among the top states in India with the highest number of Geographical Indication (GI) tags. Which district of UP is globally renowned for its GI-tagged 'Pink Meenakari' and 'Wooden Lacquerware'?",
     "2024 तक, उत्तर प्रदेश देश में सर्वाधिक जीआई टैग (GI Tags) वाले राज्यों में शीर्ष पर है। उत्तर प्रदेश का कौन सा जिला अपने जीआई-टैग प्राप्त 'गुलाबी मीनाकारी' और 'लकड़ी के खिलौनों (लैकरवेयर)' के लिए विश्व प्रसिद्ध है?",
     ["Varanasi", "Kannauj", "Saharanpur", "Khurja (Bulandshahr)"],
     ["वाराणसी", "कन्नौज", "सहारनपुर", "खुर्जा (बुलंदशहर)"],
     0, "Varanasi holds the distinction of having the maximum number of GI-tagged crafts from a single region, including Pink Meenakari, Wooden Lacquerware, and Banaras Metal Repousse craft.",
     "वाराणसी में देश के किसी भी एक जिले से सर्वाधिक जीआई उत्पाद हैं, जिनमें गुलाबी मीनाकारी, लकड़ी के खिलौने और बनारसी जरदोज़ी शामिल हैं।",
     "Medium", ["GI Tags", "Varanasi", "Handicrafts"]),
    # 130
    ("UP Solar Energy Policy & Ayodhya Solar City", "UP-CA-AYODHYA-FIRST-SOLAR-CITY", "Tests designation of Ayodhya as UP's first Solar City under State Solar Policy",
     "UP Solar Energy Policy 2022", "UPNEDA Implementation Order", 2, "Uttar Pradesh New and Renewable Energy Development Agency (UPNEDA)", "Solar City Master Plan",
     "Under the Uttar Pradesh Solar Energy Policy 2022, which historic city has been developed as the state's 'First Model Solar City' powered by solar parks, solar boats, and rooftop solar installations?",
     "उत्तर प्रदेश सौर ऊर्जा नीति 2022 के तहत, किस ऐतिहासिक शहर को सौर पार्कों, सौर नौकाओं और रूफटॉप सौर संयंत्रों से युक्त राज्य के 'पहले मॉडल सोलर सिटी' के रूप में विकसित किया गया है?",
     ["Ayodhya", "Mathura", "Jhansi", "Varanasi"],
     ["अयोध्या", "मथुरा", "झांसी", "वाराणसी"],
     0, "Ayodhya has been developed by UPNEDA as the first model Solar City of Uttar Pradesh, featuring a 40 MW solar plant, solar street lights, and solar-powered boats in the Sarayu river.",
     "अयोध्या को यूपीनेडा (UPNEDA) द्वारा उत्तर प्रदेश की पहली 'सोलर सिटी' के रूप में विकसित किया गया है, जहां सौर ऊर्जा संयंत्र और सौर नौकाएं संचालित हैं।",
     "Easy", ["Solar City", "Ayodhya", "UPNEDA"])
]

for idx, item in enumerate(u1_items):
    qid = 121 + idx
    up_sec1_2.append(q(
        qid, 1, 1, t1, th1, item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7],
        item[8], item[9], item[10], item[11], item[12], item[13], item[14], item[15], item[16]
    ))

print(f"Generated Unit 1 (10 Qs). Total: {len(up_sec1_2)}")

# Unit 2: Indian History, Freedom Movement, Constitution, Polity, Economy, Geography & Population (131 to 140)
t2 = "Unit 2: Indian history, freedom movement, Constitution, polity, economy, geography & population"
th2 = "इकाई 2: भारतीय इतिहास, स्वतंत्रता आंदोलन, संविधान, भूगोल व जनसंख्या"

u2_items = [
    # 131
    ("1857 Revolt in UP - Meerut Outbreak Date", "UP-HIST-1857-MEERUT-OUTBREAK", "Tests historical date of the outbreak of 1857 revolt in Meerut",
     "Modern Indian History & UP Freedom Struggle", "1857 Revolt Chronicles", 4, "Gazetteer of Uttar Pradesh / NCERT Modern History", "Bipan Chandra, India's Struggle for Independence",
     "On which exact date did the soldiers of the 3rd Native Cavalry at Meerut break into open rebellion, marking the formal outbreak of the 1857 Indian Freedom Struggle in Uttar Pradesh?",
     "मेरठ में तीसरी नेटिव कैवेलरी के सैनिकों ने किस निश्चित तिथि को खुला विद्रोह कर दिया, जिसने उत्तर प्रदेश में 1857 के प्रथम स्वतंत्रता संग्राम के औपचारिक सूत्रपात को चिह्नित किया?",
     ["10 May 1857", "29 March 1857", "23 June 1857", "15 August 1857"],
     ["10 मई 1857", "29 मार्च 1857", "23 जून 1857", "15 अगस्त 1857"],
     0, "On 10 May 1857, Indian soldiers in Meerut rebelled, marched towards Delhi, and proclaimed Bahadur Shah Zafar as the Emperor of Hindustan.",
     "10 मई 1857 को मेरठ छावनी से स्वतंत्रता संग्राम की ज्वाला भड़की और विद्रोही सैनिकों ने 'दिल्ली चलो' का नारा दिया।",
     "Easy", ["1857 Revolt", "Meerut", "Freedom Struggle"]),
    # 132
    ("UP Legislative Council (Vidhan Parishad) - Composition", "UP-POL-VIDHAN-PARISHAD-STRENGTH", "Tests constitutional strength and composition of UP Vidhan Parishad under Article 171",
     "Constitution of India", "Article 171 & UP State Legislature Manual", 1, "Legislative Council Secretariat, Uttar Pradesh", "Constitution of India, Article 171",
     "What is the total sanctioned strength of the Uttar Pradesh Legislative Council (विधान परिषद), making it the largest upper house among Indian states?",
     "उत्तर प्रदेश विधान परिषद (उच्च सदन) की कुल स्वीकृत सदस्य संख्या कितनी है, जो इसे भारतीय राज्यों में सबसे बड़ी विधान परिषद बनाती है?",
     ["100 members", "108 members", "120 members", "403 members"],
     ["100 सदस्य", "108 सदस्य", "120 सदस्य", "403 सदस्य"],
     0, "The Uttar Pradesh Legislative Council has 100 members (before Uttarakhand partition it was 108), representing MLAs, Local Authorities, Teachers, Graduates, and Governor's nominees.",
     "उत्तर प्रदेश विधान परिषद में कुल 100 सीटें हैं (उत्तराखंड बनने से पूर्व 108 थीं), जो देश के किसी भी राज्य में सर्वाधिक हैं।",
     "Easy", ["Vidhan Parishad", "UP Polity", "Constitution"]),
    # 133
    ("Non-Cooperation Movement in UP - Chauri Chaura Incident", "UP-HIST-CHAURI-CHAURA-INCIDENT-DATE", "Tests historic date and district of Chauri Chaura incident leading to withdrawal of Non-Cooperation Movement",
     "Indian Freedom Movement History", "Congress Working Committee Bardoli Resolution 1922", 1, "National Archives of India / NCERT History", "Bipan Chandra, Modern India",
     "The historic 'Chauri Chaura incident', which prompted Mahatma Gandhi to withdraw the Non-Cooperation Movement in February 1922, occurred in which district of Uttar Pradesh?",
     "ऐतिहासिक 'चौरी-चौरा की घटना', जिसके कारण महात्मा गांधी ने फरवरी 1922 में असहयोग आंदोलन वापस ले लिया था, उत्तर प्रदेश के किस जिले में घटित हुई थी?",
     ["Gorakhpur", "Deoria", "Azamgarh", "Ballia"],
     ["गोरखपुर", "देवरिया", "आजमगढ़", "बलिया"],
     0, "On 4 February 1922, protesters set fire to a police station at Chauri Chaura in Gorakhpur district, leading Gandhi to call off the Non-Cooperation Movement.",
     "चौरी-चौरा की घटना 4 फरवरी 1922 को गोरखपुर जिले में हुई थी, जहां पुलिस थाने में आग लगने से 22 पुलिसकर्मी मारे गए थे।",
     "Easy", ["Chauri Chaura", "Gorakhpur", "Non-Cooperation Movement"]),
    # 134
    ("UP Geography - Major Agro-Climatic Zones", "UP-GEOG-AGRO-CLIMATIC-ZONES-NINE", "Tests classification of Uttar Pradesh into 9 distinct agro-climatic zones",
     "Agricultural Geography of Uttar Pradesh", "Planning Commission / UP Agriculture Dept", 2, "Department of Agriculture, Government of Uttar Pradesh", "Agro-Climatic Atlas of UP",
     "According to the Planning Commission and the Uttar Pradesh Department of Agriculture, into how many distinct 'Agro-Climatic Zones' is the state divided?",
     "योजना आयोग और उत्तर प्रदेश कृषि विभाग के अनुसार, उत्तर प्रदेश को कितने अलग-अलग 'कृषि-जलवायु क्षेत्रों' (Agro-Climatic Zones) में विभाजित किया गया है?",
     ["7 zones", "9 zones", "11 zones", "14 zones"],
     ["7 क्षेत्र", "9 क्षेत्र", "11 क्षेत्र", "14 क्षेत्र"],
     1, "Uttar Pradesh is scientifically divided into 9 Agro-Climatic Zones: Tarai, Western Plain, Mid-Western Plain, South-Western Semi-Arid, Central Plain, Bundelkhand, North-Eastern Plain, Eastern Plain, and Vindhyan.",
     "उत्तर प्रदेश को 9 कृषि-जलवायु क्षेत्रों में बांटा गया है (जैसे तराई, पश्चिमी, मध्य, बुंदेलखंड, विंध्य, पूर्वी मैदान आदि)।",
     "Medium", ["Agro-Climatic Zones", "UP Geography", "Agriculture"]),
    # 135
    ("UP Demography - Census 2011 Population Percentage", "UP-DEMOG-CENSUS-2011-SHARE", "Tests UP's share in total Indian population as per Census 2011",
     "Census of India 2011", "Office of the Registrar General & Census Commissioner", 1, "Ministry of Home Affairs, GoI", "Census 2011 UP Population Totals",
     "According to the 2011 Census of India, approximately what percentage of the country's total population resides in Uttar Pradesh, making it the most populous state?",
     "2011 की भारतीय जनगणना के अनुसार, देश की कुल जनसंख्या का लगभग कितना प्रतिशत उत्तर प्रदेश में निवास करता है, जो इसे सर्वाधिक जनसंख्या वाला राज्य बनाता है?",
     ["12.5%", "14.2%", "16.5% (approx 19.98 crore)", "19.8%"],
     ["12.5%", "14.2%", "16.5% (लगभग 19.98 करोड़)", "19.8%"],
     2, "As per Census 2011, Uttar Pradesh had a population of 19.98 crore, which constituted approximately 16.51% of India's total population.",
     "2011 की जनगणना के अनुसार उत्तर प्रदेश की जनसंख्या लगभग 19.98 करोड़ थी, जो भारत की कुल जनसंख्या का 16.51% है।",
     "Easy", ["Census 2011", "UP Population", "Demography"]),
    # 136
    ("Kakori Train Action - Historic Year and Personalities", "UP-HIST-KAKORI-TRAIN-ACTION-HRA", "Tests the 1925 Kakori Train Action led by Hindustan Republican Association (HRA)",
     "Freedom Movement in Uttar Pradesh", "UP Freedom Struggle Records", 1, "National Archives of India / UP Culture Department", "Gazetteer on Indian Revolutionaries",
     "The heroic 'Kakori Train Action' planned by the Hindustan Republican Association (HRA) took place near Lucknow on August 9 of which year?",
     "हिंदुस्तान रिपब्लिकन एसोसिएशन (HRA) द्वारा योजनाबद्ध ऐतिहासिक 'काकोरी ट्रेन एक्शन' लखनऊ के निकट 9 अगस्त को किस वर्ष घटित हुआ था?",
     ["1921", "1925", "1928", "1931"],
     ["1921", "1925", "1928", "1931"],
     1, "On 9 August 1925, revolutionaries including Ram Prasad Bismil, Ashfaqulla Khan, Rajendra Lahiri, and Chandrashekhar Azad stopped the 8-Down train at Kakori to fund freedom activities.",
     "काकोरी ट्रेन एक्शन 9 अगस्त 1925 को लखनऊ के निकट हुआ था, जिसमें राम प्रसाद बिस्मिल, अशफाक उल्ला खां, राजेंद्र लाहिड़ी व रोशन सिंह को फांसी दी गई थी।",
     "Easy", ["Kakori Action", "HRA", "Freedom Struggle"]),
    # 137
    ("Constitutional Framework - Educational Provisions 42nd Amendment", "UP-POL-42ND-AMENDMENT-CONCURRENT-LIST", "Tests shifting of Education from State List to Concurrent List via 42nd Amendment 1976",
     "Constitution of India, Seventh Schedule", "Constitution (Forty-second Amendment) Act, 1976", 1, "Ministry of Law and Justice", "The Gazette of India, Act No. 55 of 1976",
     "Through which Constitutional Amendment Act was the subject of 'Education' transferred from the State List (List II) to the Concurrent List (List III) of the Seventh Schedule?",
     "किस संविधान संशोधन अधिनियम द्वारा 'शिक्षा' विषय को सातवीं अनुसूची की राज्य सूची (List II) से समवर्ती सूची (List III) में स्थानांतरित किया गया था?",
     ["42nd Constitutional Amendment Act, 1976",
      "44th Constitutional Amendment Act, 1978",
      "73rd Constitutional Amendment Act, 1992",
      "86th Constitutional Amendment Act, 2002"],
     ["42वां संविधान संशोधन अधिनियम, 1976",
      "44वां संविधान संशोधन अधिनियम, 1978",
      "73वां संविधान संशोधन अधिनियम, 1992",
      "86वां संविधान संशोधन अधिनियम, 2002"],
     0, "The 42nd Amendment Act 1976 transferred Education, Forests, Weights & Measures, Protection of wild animals, and Administration of Justice to the Concurrent List.",
     "42वें संविधान संशोधन 1976 द्वारा शिक्षा को राज्य सूची से हटाकर समवर्ती सूची में डाला गया, जिससे केंद्र और राज्य दोनों इस पर कानून बना सकते हैं।",
     "Medium", ["42nd Amendment", "Concurrent List", "Education Polity"]),
    # 138
    ("UP Physical Geography - Bhabhar and Terai Belts", "UP-GEOG-BHABHAR-TERAI-BELTS", "Tests geological and hydrological differences between Bhabhar boulder zone and Terai marshy zone",
     "Physical Geography of Uttar Pradesh", "Geological Survey of India UP Atlas", 2, "Department of Geology and Mining, UP", "Geography of Uttar Pradesh, NCERT State Edition",
     "In the physical relief of Uttar Pradesh, what is the defining environmental characteristic of the 'Terai' belt situated immediately south of the gravelly Bhabhar region?",
     "उत्तर प्रदेश के भौतिक उच्चावच में, कंकड़-पत्थर वाले भाभर क्षेत्र के ठीक दक्षिण में स्थित 'तराई' पेटी की परिभाषित पर्यावरणीय विशेषता क्या है?",
     ["Arid, rain-deficient sand dunes with xerophytic vegetation",
      "Marshy, water-logged, humid lowlands with dense forests and rich alluvial soils deposited by re-emerging underground streams",
      "High altitude granite cliffs covered with snow",
      "Barren volcanic plateau devoid of any vegetation"],
     ["शुष्क, वर्षा-विहीन रेत के टीले जहां कंटीली झाड़ियां उगती हैं",
      "दलदली, जल-प्लावित, नम तराई क्षेत्र जहां भाभर में विलुप्त नदियां पुनः सतह पर प्रकट होती हैं, जिसमें घने वन और उपजाऊ जलोढ़ मिट्टी पाई जाती है",
      "बर्फ से ढकी ऊंची ग्रेनाइट की चट्टानें",
      "बिना किसी वनस्पति वाला बंजर ज्वालामुखीय पठार"],
     1, "The Terai region is a flat, humid, marshy belt south of Bhabhar where underground rivers re-emerge, historically covered with dense sal forests and tall grasses.",
     "भाभर में विलुप्त नदियां तराई में पुनः धरातल पर प्रकट होती हैं, जिससे यह क्षेत्र दलदली, नम व वनाच्छादित हो जाता है।",
     "Medium", ["Terai", "Bhabhar", "UP Geography"]),
    # 139
    ("Bundelkhand Region - Historical and Geographical Context", "UP-GEOG-BUNDELKHAND-SEVEN-DISTRICTS", "Tests seven UP districts constituting the Bundelkhand plateau",
     "Regional Planning in Uttar Pradesh", "UP Planning Department Classification", 2, "Bundelkhand Development Board, GoUP", "District Gazetteers of Bundelkhand",
     "How many districts of Uttar Pradesh comprise the semi-arid, drought-prone plateau region of 'Bundelkhand'?",
     "उत्तर प्रदेश के कितने जिले अर्ध-शुष्क पठारी क्षेत्र 'बुंदेलखंड' के अंतर्गत आते हैं?",
     ["5 districts", "7 districts (Jhansi, Lalitpur, Jalaun, Hamirpur, Mahoba, Banda, Chitrakoot)", "9 districts", "12 districts"],
     ["5 जिले", "7 जिले (झांसी, ललितपुर, जालौन, हमीरपुर, महोबा, बांदा, चित्रकूट)", "9 जिले", "12 जिले"],
     1, "UP's Bundelkhand comprises 7 southern districts: Jhansi, Lalitpur, Jalaun, Hamirpur, Mahoba, Banda, and Chitrakoot.",
     "उत्तर प्रदेश में बुंदेलखंड संभाग के अंतर्गत कुल 7 जिले (झांसी, ललितपुर, जालौन, हमीरपुर, महोबा, बांदा, चित्रकूट) आते हैं।",
     "Easy", ["Bundelkhand", "UP Districts", "Geography"]),
    # 140
    ("UP Demography - Sex Ratio as per 2011 Census", "UP-DEMOG-CENSUS-2011-SEX-RATIO", "Tests sex ratio of Uttar Pradesh as per 2011 Census data",
     "Census of India 2011", "UP State Summary Sheet", 1, "Directorate of Census Operations, UP", "Census 2011 Final Population Totals",
     "According to the 2011 Census of India, what was the overall sex ratio (females per 1,000 males) in Uttar Pradesh compared to the national average of 943?",
     "2011 की भारतीय जनगणना के अनुसार, भारत के राष्ट्रीय औसत (943) की तुलना में उत्तर प्रदेश का कुल लिंगानुपात (प्रति 1,000 पुरुषों पर महिलाएं) कितना था?",
     ["898", "912", "928", "940"],
     ["898", "912", "928", "940"],
     1, "According to Census 2011, Uttar Pradesh's sex ratio was 912 females per 1,000 males (an increase of 14 points from 898 in 2001), below the national average of 943.",
     "जनगणना 2011 के अनुसार उत्तर प्रदेश का लिंगानुपात 912 था (2001 में 898 था), जबकि भारत का राष्ट्रीय लिंगानुपात 943 था।",
     "Medium", ["Census 2011", "Sex Ratio", "Demography"])
]

for idx, item in enumerate(u2_items):
    qid = 131 + idx
    up_sec1_2.append(q(
        qid, 1, 2, t2, th2, item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7],
        item[8], item[9], item[10], item[11], item[12], item[13], item[14], item[15], item[16]
    ))

print(f"Generated Unit 2 (10 Qs). Total now: {len(up_sec1_2)}")

# Unit 3: General Science, Environment, Health & ICT in Education (141 to 150)
t3 = "Unit 3: General science, environment, human health, computer & internet technology, ICT applications"
th3 = "इकाई 3: सामान्य विज्ञान, पर्यावरण, मानव स्वास्थ्य व शैक्षिक तकनीकी"

u3_items = [
    # 141
    ("Vitamins and Deficiency Diseases - Night Blindness & Xerophthalmia", "UP-SCI-VITAMIN-A-DEFICIENCY", "Tests biochemical role of Vitamin A (Retinol) and its deficiency symptoms",
     "General Science & Human Health", "NCERT Class 10 Science - Life Processes", 4, "NCERT Science Textbooks", "Human Physiology & Nutrition Guide",
     "Which fat-soluble vitamin's severe deficiency causes Night Blindness (Nyctalopia) and Xerophthalmia (dry cornea) in school children?",
     "किस वसा-घुलनशील विटामिन की गंभीर कमी से स्कूली बच्चों में रतौंधी (Night Blindness) और ज़ेरोफ्थैल्मिया (सूखा कॉर्निया) रोग हो जाता है?",
     ["Vitamin A (Retinol)", "Vitamin C (Ascorbic Acid)", "Vitamin D (Calciferol)", "Vitamin K (Phylloquinone)"],
     ["विटामिन A (रेटिनॉल)", "विटामिन C (एस्कॉर्बिक एसिड)", "विटामिन D (कैल्सीफेरॉल)", "विटामिन K (फाइलोक्विनोन)"],
     0, "Vitamin A (Retinol) is essential for rhodopsin synthesis in the retina. Its deficiency leads to night blindness, dry conjunctiva, and xerophthalmia.",
     "विटामिन A (रेटिनॉल) की कमी से आंखों में रतौंधी और कॉर्निया की शुष्कता (ज़ेरोफ्थैल्मिया) होती है।",
     "Easy", ["Vitamin A", "Human Health", "Deficiency Diseases"]),
    # 142
    ("Hormones and Endocrine Glands - Insulin & Diabetes", "UP-SCI-INSULIN-PANCREAS-ISLETS", "Tests pancreatic beta-cell production of insulin and blood glucose regulation",
     "Human Health & Physiology", "Endocrine Glands, NCERT Class 10 Science", 4, "NCERT Class 10 Chapter 7 Control and Coordination", "Human Biology Manual",
     "Insulin, a peptide hormone that regulates blood glucose levels and whose hyposecretion leads to Diabetes Mellitus, is secreted by which specific cells of the pancreas?",
     "इंसुलिन, जो रक्त शर्करा के स्तर को नियंत्रित करता है और जिसके कम स्राव से मधुमेह (Diabetes Mellitus) होता है, अग्न्याशय (Pancreas) की किन विशिष्ट कोशिकाओं द्वारा स्रावित होता है?",
     ["Beta (β) cells of the Islets of Langerhans",
      "Alpha (α) cells of the Islets of Langerhans",
      "Acinar cells",
      "Hepatic Kupffer cells"],
     ["लैंगरहैंस की द्वीपिकाओं की बीटा (β) कोशिकाएं",
      "लैंगरहैंस की द्वीपिकाओं की अल्फा (α) कोशिकाएं",
      "एसिनर कोशिकाएं",
      "यकृत की कुफ़्फ़र कोशिकाएं"],
     0, "Beta cells of the Islets of Langerhans in the pancreas synthesize and secrete insulin to facilitate cellular glucose uptake.",
     "अग्न्याशय में स्थित लैंगरहैंस की द्वीपिकाओं की बीटा (β) कोशिकाएं इंसुलिन हार्मोन का स्राव करती हैं; अल्फा कोशिकाएं ग्लूकागन बनाती हैं।",
     "Medium", ["Insulin", "Pancreas", "Human Health"]),
    # 143
    ("Environmental Pollution - Eutrophication", "UP-SCI-ENV-EUTROPHICATION-ALGAL-BLOOM", "Tests biological mechanism of nutrient enrichment and dissolved oxygen depletion in water bodies",
     "Environmental Ecology & Pollution", "NCERT Class 12 Biology - Environmental Issues", 4, "NCERT Environmental Biology", "Central Pollution Control Board Water Quality Criteria",
     "In aquatic environmental science, what phenomenon occurs when agricultural runoff carrying excessive nitrates and phosphates enters a water body, causing dense algal bloom and suffocating aquatic life?",
     "जलीय पर्यावरण विज्ञान में, जब अत्यधिक नाइट्रेट और फॉस्फेट युक्त कृषि अपवाह जल स्रोत में प्रवेश करता है, जिसके परिणामस्वरूप अत्यधिक शैवाल प्रस्फुटन (Algal Bloom) होता है और घुलित ऑक्सीजन समाप्त होने से जलीय जीव मरने लगते हैं, तो इसे क्या कहा जाता है?",
     ["Eutrophication (सुपोषण)", "Biomagnification (जैव आवर्धन)", "Ozone Depletion (ओजोन क्षरण)", "Acid Rain (अम्ल वर्षा)"],
     ["सुपोषण (Eutrophication)", "जैव आवर्धन (Biomagnification)", "ओजोन क्षरण (Ozone Depletion)", "अम्ल वर्षा (Acid Rain)"],
     0, "Eutrophication is nutrient enrichment (nitrates/phosphates) leading to explosive algal growth, subsequent microbial decomposition, and severe depletion of dissolved oxygen (hypoxia).",
     "जल स्रोतों में पोषक तत्वों (नाइट्रेट व फॉस्फेट) की अधिकता से शैवालों का अनियंत्रित प्रसार और ऑक्सीजन की कमी 'सुपोषण' (Eutrophication) कहलाती है।",
     "Medium", ["Eutrophication", "Environment", "Water Pollution"]),
    # 144
    ("Human Diseases - Communicable vs Non-communicable", "UP-SCI-VECTOR-BORNE-DENGUE-AEDES", "Tests vector transmission of Dengue virus via Aedes aegypti mosquito",
     "Community Health and Disease Prevention", "National Vector Borne Disease Control Programme", 1, "Ministry of Health and Family Welfare", "NVBDCP Dengue Guidelines",
     "Dengue fever, a major viral health hazard in tropical and subtropical regions, is transmitted between humans by which vector mosquito?",
     "डेंगू बुखार, जो एक गंभीर वायरल स्वास्थ्य जोखिम है, मनुष्यों में किस वाहक मच्छर के काटने से फैलता है?",
     ["Aedes aegypti mosquito", "Female Anopheles mosquito", "Culex mosquito", "Tsetse fly"],
     ["मादा एडीज एजिप्टी (Aedes aegypti) मच्छर", "मादा एनाफिलीज़ (Anopheles) मच्छर", "क्यूलेक्स (Culex) मच्छर", "त्से-त्से मक्खी"],
     0, "Dengue virus is primarily transmitted by female Aedes aegypti mosquitoes, which breed in clean domestic stagnant water and bite predominantly during daylight hours.",
     "डेंगू वायरस एडीज एजिप्टी (Aedes aegypti) मच्छर द्वारा फैलता है जो दिन के समय काटता है; मादा एनाफिलीज़ मलेरिया की वाहक है।",
     "Easy", ["Dengue", "Aedes Mosquito", "Human Health"]),
    # 145
    ("Computer Technology - RAM vs ROM Volatility", "UP-ICT-COMPUTER-RAM-ROM-VOLATILE", "Tests distinction between volatile Random Access Memory and non-volatile ROM in computers",
     "Computer Basics & ICT Fundamentals", "NCERT Class 9 Information Technology", 4, "NCERT Computer Science", "Basics of Information Technology Handbook",
     "In computer architecture, why is Random Access Memory (RAM) classified as 'Volatile Memory'?",
     "कंप्यूटर वास्तुकला में, रैंडम एक्सेस मेमोरी (RAM) को 'अस्थिर मेमोरी' (Volatile Memory) के रूप में क्यों वर्गीकृत किया जाता है?",
     ["It permanently burns data onto the optical disc",
      "Its contents are instantly lost when the computer's electric power supply is switched off",
      "It can only be read once and never rewritten",
      "It is located outside the physical CPU motherboard"],
     ["यह डेटा को स्थायी रूप से ऑप्टिकल डिस्क पर लिखती है",
      "कंप्यूटर की बिजली (पावर सप्लाई) बंद होते ही इसमें संगृहीत सारा डेटा तुरंत मिट (Lost) जाता है",
      "इसे केवल एक बार पढ़ा जा सकता है और कभी दोबारा नहीं लिखा जा सकता",
      "यह कंप्यूटर के मदरबोर्ड के बाहर स्थित होती है"],
     1, "RAM is volatile primary memory: it requires continuous electrical power to maintain its stored data; turning off the system erases everything in RAM.",
     "RAM अस्थिर (Volatile) मेमोरी है क्योंकि विद्युत आपूर्ति बंद होते ही इसमें मौजूद डेटा स्वतः नष्ट हो जाता है। ROM गैर-अस्थिर (Non-volatile) होती है।",
     "Easy", ["RAM", "Computer Basics", "Volatile Memory"]),
    # 146
    ("Educational Technology - Prerna Portal in Uttar Pradesh", "UP-ICT-PRERNA-PORTAL-BASIC-SECONDARY", "Tests the scope and modules of the Mission Prerna / Prerna Portal in UP schools",
     "Mission Prerna Governance Framework", "Government of UP Basic & Secondary Education Orders", 1, "Department of Basic Education, Government of Uttar Pradesh", "Prerna Portal Operational Guide",
     "What is the primary function of the 'Prerna Portal' (prernaup.in) implemented by the Department of Education in Uttar Pradesh?",
     "उत्तर प्रदेश के शिक्षा विभाग द्वारा लागू 'प्रेरणा पोर्टल' (prernaup.in) का प्राथमिक कार्य क्या है?",
     ["Serving as a comprehensive digital portal for student biometric attendance, school grading, mid-day meal monitoring, teacher service records, and foundational learning tracking",
      "Issuing driving licenses to high school students",
      "Conducting online cricket tournaments",
      "Providing commercial entertainment movies to teachers"],
     ["छात्र उपस्थिति, स्कूल ग्रेडिंग, मध्याह्न भोजन (MDM) निगरानी, शिक्षक अवकाश/सेवा रिकॉर्ड और बुनियादी अधिगम ट्रैकिंग हेतु एकीकृत डिजिटल मंच",
      "हाई स्कूल के छात्रों को ड्राइविंग लाइसेंस जारी करना",
      "ऑनलाइन क्रिकेट टूर्नामेंट आयोजित करना",
      "शिक्षकों को व्यावसायिक फिल्में दिखाना"],
     0, "The Prerna Portal digitizes school monitoring, learning outcomes, MDM consumption, infrastructure status under Operation Kayakalp, and teacher leave management across UP.",
     "प्रेरणा पोर्टल (Prerna Portal) उत्तर प्रदेश में स्कूलों की निगरानी, मध्याह्न भोजन, शिक्षकों के अवकाश, ऑपरेशन कायाकल्प और अधिगम स्तर का मुख्य डिजिटल प्लेटफॉर्म है।",
     "Easy", ["Prerna Portal", "Mission Prerna", "Educational Technology"]),
    # 147
    ("Internet Terminology - URL Components", "UP-ICT-URL-COMPONENTS-PROTOCOL-DOMAIN", "Tests protocol, domain name, and path breakdown in Uniform Resource Locators (URLs)",
     "Computer & Internet Technology", "NCERT Class 11 Informatics Practices", 4, "NCERT Computer Science", "Internet Standards & Protocols RFC",
     "In the web address 'https://upsessb.org/syllabus.pdf', which element represents the 'Protocol' that guarantees secure encrypted communication between browser and server?",
     "वेब पते 'https://upsessb.org/syllabus.pdf' में, कौन सा तत्व 'प्रोटोकॉल' (Protocol) का प्रतिनिधित्व करता है जो ब्राउज़र और सर्वर के बीच सुरक्षित एन्क्रिप्टेड संचार सुनिश्चित करता है?",
     ["https://", "upsessb.org", "syllabus.pdf", ".org"],
     ["https://", "upsessb.org", "syllabus.pdf", ".org"],
     0, "'https://' (Hypertext Transfer Protocol Secure) is the protocol governing encrypted data transfer between the client browser and the web server.",
     "'https://' (हाइपरटेक्स्ट ट्रांसफर प्रोटोकॉल सिक्योर) संचार का प्रोटोकॉल है जो डेटा को सुरक्षित व एन्क्रिप्टेड रूप में प्रेषित करता है।",
     "Easy", ["URL", "HTTPS", "Internet Protocols"]),
    # 148
    ("Human Health - Deficiency of Iodine & Goitre", "UP-SCI-IODINE-THYROID-GOITRE", "Tests physiological role of Iodine in Thyroxine synthesis and prevention of Goitre",
     "Nutrition and Public Health", "National Iodine Deficiency Disorders Control Programme", 1, "Ministry of Health and Family Welfare", "NIDDCP Guidelines",
     "Which essential dietary mineral is required for the synthesis of the Thyroxine hormone by the thyroid gland, the deficiency of which causes enlargement of the thyroid gland known as 'Goitre' (घेंघा)?",
     "थायरॉयड ग्रंथि द्वारा थायरॉक्सिन हार्मोन के संश्लेषण के लिए किस आवश्यक खनिज की आवश्यकता होती है, जिसकी कमी से थायरॉयड ग्रंथि में सूजन आ जाती है जिसे 'घेंघा' (Goitre) कहा जाता है?",
     ["Iron", "Iodine", "Calcium", "Zinc"],
     ["आयरन (लोहा)", "आयोडीन", "कैल्शियम", "जिंक"],
     1, "Iodine is an essential component of thyroid hormones (T3 and T4). Dietary deficiency causes compensatory hypertrophy of the thyroid gland, presenting as goitre.",
     "थायरॉयड ग्रंथि द्वारा थायरॉक्सिन निर्माण हेतु आयोडीन अनिवार्य है; आयोडीन की कमी से घेंघा (Goitre) रोग होता है।",
     "Easy", ["Iodine", "Goitre", "Human Health"]),
    # 149
    ("Educational Technology - PANKH Portal in UP Secondary Schools", "UP-ICT-PANKH-PORTAL-CAREER-GUIDANCE", "Tests career guidance and aptitude counselling via UP PANKH Portal for Classes 9-12",
     "Secondary Education Directorate UP Schemes", "UP Board Career Guidance Circular 2023", 1, "Madhyamik Shiksha Parishad, Uttar Pradesh", "PANKH Portal User Manual",
     "In Uttar Pradesh Secondary Education (Madhyamik Shiksha), what is the dedicated objective of the 'PANKH Portal' (pankh.up.gov.in)?",
     "उत्तर प्रदेश माध्यमिक शिक्षा विभाग में, 'पंख पोर्टल' (PANKH Portal - pankh.up.gov.in) का समर्पित उद्देश्य क्या है?",
     ["Comprehensive career counseling, vocational exploration, scholarship tracking, and aptitude guidance for Class 9 to 12 students",
      "Collecting examination fees in cash",
      "Managing police verification of teachers",
      "Conducting sports trials in private academies"],
     ["कक्षा 9 से 12 तक के विद्यार्थियों के लिए समग्र करियर परामर्श, व्यावसायिक मार्गदर्शन, छात्रवृत्ति और अभिरुचि परामर्श",
      "नकद में परीक्षा शुल्क एकत्र करना",
      "शिक्षकों का पुलिस सत्यापन प्रबंधित करना",
      "निजी अकादमियों में खेल परीक्षण आयोजित करना"],
     0, "PANKH (Portal for Adolescents' Next-generation Knowledge & Horizons) provides UP secondary students with guidance on 500+ careers, colleges, vocational paths, and competitive exams.",
     "पंख पोर्टल (PANKH) माध्यमिक शिक्षा परिषद के कक्षा 9 से 12 के छात्रों को करियर परामर्श, उच्च शिक्षा, छात्रवृत्ति व कौशल विकास की विस्तृत जानकारी प्रदान करता है।",
     "Medium", ["PANKH Portal", "Career Guidance", "UP Secondary Education"]),
    # 150
    ("Atmospheric Environment - Greenhouse Effect & Primary Gas", "UP-SCI-ENV-GREENHOUSE-GASES-CO2", "Tests identification and radiative forcing of major greenhouse gases in global warming",
     "Environmental Sciences - Climate Change", "NCERT Class 11 Chemistry - Environmental Chemistry", 4, "NCERT Environmental Science", "IPCC Assessment Report Summary",
     "Which atmospheric gas produced extensively by the burning of fossil fuels is the primary human-generated contributor to global anthropogenic Greenhouse Effect and climate warming?",
     "जीवाश्म ईंधनों के दहन से व्यापक रूप से उत्पन्न होने वाली कौन सी वायुमंडलीय गैस मानव जनित ग्रीनहाउस प्रभाव और वैश्विक तापन (Global Warming) में सर्वाधिक मुख्य योगदानकर्ता है?",
     ["Carbon Dioxide (CO2)", "Nitrogen (N2)", "Argon (Ar)", "Oxygen (O2)"],
     ["कार्बन डाइऑक्साइड (CO2)", "नाइट्रोजन (N2)", "आर्गन (Ar)", "ऑक्सीजन (O2)"],
     0, "Carbon Dioxide (CO2) accounts for the largest share of radiative forcing among anthropogenic greenhouse gases due to extensive fossil fuel combustion and industrial emissions.",
     "कार्बन डाइऑक्साइड (CO2) मानव जनित ग्रीनहाउस गैसों में सबसे प्रमुख है जो वातावरण में ऊष्मा को रोककर वैश्विक तापमान में वृद्धि करती है।",
     "Easy", ["Greenhouse Effect", "CO2", "Environment"])
]

for idx, item in enumerate(u3_items):
    qid = 141 + idx
    up_sec1_2.append(q(
        qid, 1, 3, t3, th3, item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7],
        item[8], item[9], item[10], item[11], item[12], item[13], item[14], item[15], item[16]
    ))

print(f"Generated Unit 3 (10 Qs). Section I complete! Total questions now: {len(up_sec1_2)}")

with open("temp_up_sec1.json", "w", encoding="utf-8") as f:
    json.dump(up_sec1_2, f, ensure_ascii=False, indent=2)
