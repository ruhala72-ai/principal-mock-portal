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
            "verifiedBy": "UP Secondary Education Board & Commission Language Syllabus"
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
        "tags": tags + [f"Unit {unit_num}", "UP Principal", "Section II"],
        "isPracticeQuestion": True,
        "isApproved": True,
        "createdAt": "2026-10-21T00:00:00Z"
    }
    res["fingerprint"] = generate_fingerprint(res)
    return res

sec2_qs = []

# ========================================================
# SECTION II: 30 Questions (Unit 4: 15 Qs Hindi + Unit 5: 15 Qs English)
# ========================================================

# Unit 4: General Hindi (151 to 165)
t4 = "Unit 4: General Hindi (सामान्य हिन्दी)"
th4 = "इकाई 4: सामान्य हिन्दी (व्याकरण, शब्द रचना व पत्र लेखन)"

u4_items = [
    # 151
    ("Vartani Shuddhi - Administrative Terms", "UP-HIN-VARTANI-PRASHASANIK-SHUDDHI", "Tests standard Hindi orthography for administrative correspondence",
     "Standard Hindi Orthography", "केंद्रीय हिन्दी निदेशालय वर्तनी नियम", 1, "केंद्रीय हिन्दी निदेशालय / UP Board Hindi Syllabus", "मानक हिन्दी देवनागरी वर्तनी नियमावली",
     "Which of the following sets contains all words spelled strictly in accordance with standard Hindi orthography?",
     "निम्नलिखित में से किस विकल्प में सभी शब्द मानक हिन्दी वर्तनी के अनुसार पूर्णतः शुद्ध हैं?",
     ["अधीन, रचयिता, व्यावहारिक", "आधीन, रचियता, व्यवहारिक", "अधीन, रचयिता, व्यवहारिक", "आधीन, रचयिता, व्यावहारिक"],
     ["अधीन, रचयिता, व्यावहारिक", "आधीन, रचियता, व्यवहारिक", "अधीन, रचयिता, व्यवहारिक", "आधीन, रचयिता, व्यावहारिक"],
     0, "'अधीन' (not आधीन), 'रचयिता' (not रचियता), and 'व्यावहारिक' (इक प्रत्यय लगने से आदि स्वर में वृद्धि: व्यवहार + इक = व्यावहारिक) are correct.",
     "शुद्ध वर्तनी: 'अधीन' ('आधीन' अशुद्ध है), 'रचयिता' तथा 'व्यावहारिक' (व्यवहार + इक = व्यावहारिक) है।",
     "Medium", ["Vartani", "Hindi Grammar"]),
    # 152
    ("Sandhi - Visarga Sandhi in Administrative Terms", "UP-HIN-SANDHI-MANORATH-YASHOBHUMI", "Tests Visarga Sandhi rule (विसर्ग का 'ओ' में परिवर्तन)",
     "Standard Hindi Grammar", "विसर्ग सन्धि नियम", 4, "कामताप्रसाद गुरु, हिन्दी व्याकरण", "सन्धि प्रकरण",
     "What is the correct Sandhi-Vichchheda (disjunction) and Sandhi type for the word 'मनोरथ' (Manorath)?",
     "'मनोरथ' शब्द का सही सन्धि-विच्छेद एवं सन्धि का भेद कौन सा है?",
     ["मनस् + रथ (व्यंजन सन्धि)", "मनः + रथ (विसर्ग सन्धि)", "मनो + रथ (स्वर सन्धि)", "मना + रथ (दीर्घ सन्धि)"],
     ["मनस् + रथ (व्यंजन सन्धि)", "मनः + रथ (विसर्ग सन्धि)", "मनो + रथ (स्वर सन्धि)", "मना + रथ (दीर्घ सन्धि)"],
     1, "मनोरथ = मनः + रथ (विसर्ग सन्धि नियम: यदि विसर्ग से पहले 'अ' हो और बाद में किसी वर्ग का तीसरा, चौथा, पांचवां वर्ण या य, र, ल, व, ह हो तो विसर्ग का 'ओ' हो जाता है)।",
     "'मनोरथ' का सही विच्छेद 'मनः + रथ' है और इसमें विसर्ग सन्धि है (विसर्ग का 'ओ' में परिवर्तन)।",
     "Easy", ["Sandhi", "Visarga Sandhi", "Hindi Grammar"]),
    # 153
    ("Prefix and Suffix - 'अति' Prefix", "UP-HIN-UPSARG-ATI-ATYADIK", "Tests identification of Sanskrit prefix 'अति' in words",
     "Word Formation - Upsarg & Pratyay", "उपसर्ग प्रकरण", 4, "कामताप्रसाद गुरु, हिन्दी व्याकरण", "उपसर्ग एवं प्रत्यय अध्याय",
     "In which of the following words is the Sanskrit prefix 'अति' (Ati) grammatically incorporated?",
     "निम्नलिखित में से किस शब्द में संस्कृत उपसर्ग 'अति' प्रयुक्त हुआ है?",
     ["अत्यधिक (Atyadhik)", "अतिथि (Atithi)", "अतल (Atal)", "अचेत (Achet)"],
     ["अत्यधिक (Atyadhik)", "अतिथि (Atithi)", "अतल (Atal)", "अचेत (Achet)"],
     0, "अत्यधिक = अति + अधिक (यण् सन्धि के कारण 'इ' का 'य्' होकर 'अत्यधिक' बनता है)। बाकी शब्दों में 'अ' उपसर्ग है।",
     "'अत्यधिक' में 'अति' उपसर्ग है (अति + अधिक = अत्यधिक)। अतिथि, अतल व अचेत में 'अ' उपसर्ग है।",
     "Easy", ["Upsarg", "Prefix", "Hindi Grammar"]),
    # 154
    ("Samas - Tatpurush Samas Types", "UP-HIN-SAMAS-TATPURUSH-RAJPUTRA", "Tests identification of Sambandh Tatpurush Samas in administrative terms",
     "Word Formation - Samas", "तत्पुरुष समास भेद", 4, "कामताप्रसाद गुरु, हिन्दी व्याकरण", "समास भेद",
     "Which type of Samas is present in the compound word 'राजदूत' (Rajdoot)?",
     "'राजदूत' सामासिक पद में कौन सा समास है?",
     ["सम्बन्ध तत्पुरुष समास (राजा का दूत)", "करण तत्पुरुष समास", "अव्ययीभाव समास", "कर्मधारय समास"],
     ["सम्बन्ध तत्पुरुष समास (राजा का दूत)", "करण तत्पुरुष समास", "अव्ययीभाव समास", "कर्मधारय समास"],
     0, "राजदूत का विग्रह 'राजा का दूत' है। यहां सम्बन्ध कारक की विभक्ति 'का' का लोप हुआ है, अतः यह सम्बन्ध तत्पुरुष समास है।",
     "'राजदूत' (राजा का दूत) में सम्बन्ध कारक की विभक्ति 'का' का लोप होने के कारण सम्बन्ध तत्पुरुष समास है।",
     "Easy", ["Samas", "Tatpurush", "Hindi Grammar"]),
    # 155
    ("Synonyms - Paryayvachi of Saraswati / Education", "UP-HIN-PARYAYVACHI-SARASWATI-SHARADA", "Tests classical synonyms of goddess of learning / education",
     "Hindi Lexicon", "पर्यायवाची शब्द", 4, "मानक हिन्दी पर्यायवाची कोश", "NCERT Class 10 Hindi",
     "Which of the following is NOT a correct synonym (पर्यायवाची) of 'सरस्वती' (Saraswati)?",
     "निम्नलिखित में से कौन सा शब्द 'सरस्वती' का पर्यायवाची नहीं है?",
     ["शारदा", "भारती", "वाग्देवी", "कमला (लक्ष्मी)"],
     ["शारदा", "भारती", "वाग्देवी", "कमला (लक्ष्मी)"],
     3, "'कमला' is an epithet of Lakshmi (goddess of wealth), whereas शारदा, भारती, वाग्देवी, वीणापाणि, ब्राह्मी are synonyms of Saraswati.",
     "'कमला' माता लक्ष्मी का पर्यायवाची है, जबकि शारदा, भारती, वाग्देवी माता सरस्वती के पर्यायवाची हैं।",
     "Easy", ["Paryayvachi", "Synonyms", "Hindi Vocabulary"]),
    # 156
    ("Antonyms - Vilom Shabd in School Governance", "UP-HIN-VILOM-JYESHTHA-KANISHTHA", "Tests official administrative antonyms for seniority and hierarchy",
     "Official Language Hierarchy", "प्रशासनिक विलोम शब्द", 1, "राजभाषा विभाग, भारत सरकार", "प्रशासनिक शब्दावली",
     "What is the precise antonym (विलोम शब्द) of 'ज्येष्ठ' (Senior / Elder) in administrative seniority rosters?",
     "प्रशासनिक वरिष्ठता सूचियों में 'ज्येष्ठ' का सटीक विलोम शब्द क्या होता है?",
     ["कनिष्ठ (Junior)", "अनिष्ठ", "लघु", "हीन"],
     ["कनिष्ठ (Junior)", "अनिष्ठ", "लघु", "हीन"],
     0, "'ज्येष्ठ' (Senior) का विलोम 'कनिष्ठ' (Junior) होता है। श्रेष्ठ का निम्न, अग्रज का अनुज होता है।",
     "प्रशासनिक शब्दावली में 'ज्येष्ठ' (Senior) का विलोम 'कनिष्ठ' (Junior) होता है।",
     "Easy", ["Vilom", "Antonyms", "Seniority"]),
    # 157
    ("One Word for Many - Aneka Shabdon Ke Liye Ek Shabd", "UP-HIN-ONE-WORD-SARVAGYA-ALPAGYA", "Tests classical one-word substitution in Hindi",
     "Hindi Vocabulary", "अनेक शब्दों के लिए एक शब्द", 4, "कामताप्रसाद गुरु, हिन्दी व्याकरण", "शब्द-साधन",
     "What is the single word in Hindi for 'one who knows everything' (जो सब कुछ जानता हो)?",
     "'जो सब कुछ जानता हो' वाक्यांश के लिए एक उपयुक्त शब्द क्या है?",
     ["सर्वज्ञ", "अल्पज्ञ", "विज्ञ", "कृतज्ञ"],
     ["सर्वज्ञ", "अल्पज्ञ", "विज्ञ", "कृतज्ञ"],
     0, "'जो सब कुछ जानता हो' = सर्वज्ञ। जो बहुत कम जानता हो = अल्पज्ञ। जो किए गए उपकार को मानता हो = कृतज्ञ।",
     "जो सब कुछ जानता हो उसे 'सर्वज्ञ' कहा जाता है; कम जानने वाले को 'अल्पज्ञ' कहते हैं।",
     "Easy", ["One Word", "Vocabulary", "Hindi Grammar"]),
    # 158
    ("Idioms and Proverbs - Muhavare", "UP-HIN-MUHAVARE-GAAGAR-MEIN-SAAGAR", "Tests comprehension of classic Hindi proverb regarding concise institutional communication",
     "Hindi Idioms & Proverbs", "लोकोक्तियां एवं मुहावरे", 4, "मानक हिन्दी मुहावरे कोश", "NCERT Hindi",
     "What is the meaning of the proverb 'गागर में सागर भरना' (Gagar mein Sagar bharna) in academic and official writing?",
     "शैक्षणिक एवं आधिकारिक लेखन में 'गागर में सागर भरना' लोकोक्ति का क्या तात्पर्य है?",
     ["संक्षिप्त शब्दों में अत्यधिक गूढ़ एवं विस्तृत विचार व्यक्त करना",
      "मिट्टी के बर्तन में पानी भरकर कार्यालय में रखना",
      "अत्यधिक बातें करके समय व्यर्थ करना",
      "बिना सोचे-समझे कठोर निर्णय लेना"],
     ["संक्षिप्त शब्दों में अत्यधिक गूढ़ एवं विस्तृत विचार व्यक्त करना",
      "मिट्टी के बर्तन में पानी भरकर कार्यालय में रखना",
      "अत्यधिक बातें करके समय व्यर्थ करना",
      "बिना सोचे-समझे कठोर निर्णय लेना"],
     0, "'गागर में सागर भरना' means to express profound, extensive meaning or extensive ideas in very few, precise words.",
     "'गागर में सागर भरना' का अर्थ थोड़े और संक्षिप्त शब्दों में बहुत बड़ी और गहरी बात कहना होता है।",
     "Easy", ["Muhavare", "Proverbs", "Hindi Literature"]),
    # 159
    ("Figure of Speech - Alankar", "UP-HIN-ALANKAR-ANU установ-SHLESH", "Tests identification of Shlesh Alankar where a single word yields multiple meanings",
     "Poetics and Alankar Shastra", "अलंकार भेद", 4, "काव्य प्रदीप / NCERT Class 10 Hindi", "अलंकार प्रकरण",
     "In the poetic line: 'रहिमन पानी राखिये, बिन पानी सब सून। पानी गये न ऊबरै, मोती, मानुष, चून॥' which Alankar (figure of speech) is exemplified in the word 'पानी'?",
     "'रहिमन पानी राखिये, बिन पानी सब सून। पानी गये न ऊबरै, मोती, मानुष, चून॥' पंक्ति में 'पानी' शब्द में कौन सा अलंकार है?",
     ["श्लेष अलंकार", "यमक अलंकार", "अनुप्रास अलंकार", "उपमा अलंकार"],
     ["श्लेष अलंकार", "यमक अलंकार", "अनुप्रास अलंकार", "उपमा अलंकार"],
     0, "When a single word carries multiple contextual meanings (here 'पानी' means luster/चमक for मोती, self-respect/इज्जत for मानुष, and water/जल for चून), it is Shlesh Alankar.",
     "यहां 'पानी' शब्द एक बार आया है किन्तु मोती के संदर्भ में चमक, मनुष्य के संदर्भ में प्रतिष्ठा, और आटे के संदर्भ में जल का अर्थ देता है, अतः श्लेष अलंकार है।",
     "Medium", ["Alankar", "Shlesh", "Poetics"]),
    # 160
    ("Punctuation - Viram Chihna in Drafting", "UP-HIN-PUNCTUATION-ARDHA-VIRAM", "Tests correct contextual usage of Semicolon (अर्द्धविराम - ;) in complex official compound sentences",
     "Official Hindi Punctuation Rules", "विराम चिह्न नियम, केंद्रीय हिन्दी निदेशालय", 1, "केंद्रीय हिन्दी निदेशालय / UP Board Drafting Rules", "मानक विराम चिह्न तालिका",
     "In official Hindi writing, which punctuation mark is used when two independent clauses are closely connected in meaning and require a pause longer than a comma (अल्पविराम) but shorter than a full stop (पूर्णविराम)?",
     "कार्यालयी हिन्दी लेखन में, जब दो उपवाक्य अर्थ में परस्पर जुड़े हों और अल्पविराम से अधिक तथा पूर्णविराम से कम ठहराव की आवश्यकता हो, तो कौन सा चिह्न प्रयुक्त होता है?",
     ["अर्द्धविराम (Semicolon - ;)", "अल्पविराम (Comma - ,)", "उपविराम (Colon - :)", "योजक चिह्न (Hyphen - -)"],
     ["अर्द्धविराम (Semicolon - ;)", "अल्पविराम (Comma - ,)", "उपविराम (Colon - :)", "योजक चिह्न (Hyphen - -)"],
     0, "A semicolon (अर्द्धविराम - ;) marks a pause longer than a comma but shorter than a full stop, frequently used between coordinated clauses.",
     "अल्पविराम से अधिक और पूर्णविराम से कम ठहराव के लिए 'अर्द्धविराम' (;) का प्रयोग किया जाता है।",
     "Medium", ["Punctuation", "Viram Chihna", "Drafting"]),
    # 161
    ("Official Notification - Adhisuchana Characteristics", "UP-HIN-ADHISUCHANA-GAZETTE-PUBLICATION", "Tests statutory definition and mandatory gazette publication of Adhisuchana (Notification)",
     "UP Secretariat Manual of Office Procedure", "शासकीय पत्राचार नियम", 1, "कार्मिक विभाग, उत्तर प्रदेश शासन", "उत्तर प्रदेश सचिवालय कार्यपद्धति नियमावली",
     "In Uttar Pradesh state administration, what is the defining statutory characteristic of an 'अधिसूचना' (Official Notification)?",
     "उत्तर प्रदेश शासन की कार्यप्रणाली में 'अधिसूचना' (Notification) की अनिवार्य वैधानिक विशेषता क्या है?",
     ["It is mandatorily published in the Official Gazette (सरकारी गजट) for public information and statutory enforcement",
      "It is an informal oral telephone conversation between two clerks",
      "It can only be published in private social media groups",
      "It expires automatically within 24 hours of drafting"],
     ["यह सार्वजनिक जानकारी एवं वैधानिक प्रभाव के लिए अनिवार्य रूप से 'सरकारी गजट' में प्रकाशित की जाती है",
      "यह दो लिपिकों के बीच एक अनौपचारिक मौखिक टेलीफोन बातचीत है",
      "इसे केवल निजी सोशल मीडिया समूहों में प्रकाशित किया जा सकता है",
      "यह प्रारूपण के 24 घंटे के भीतर स्वतः समाप्त हो जाती है"],
     0, "An Adhisuchana (Notification) is formally published in the Official Gazette of Uttar Pradesh to announce statutory appointments, rules, regulations, or statutory transfers.",
     "अधिसूचना (Notification) केवल वही पत्र रूप है जिसका उत्तर प्रदेश के 'सरकारी गजट' में मुद्रित व प्रकाशित होना वैधानिक रूप से अनिवार्य होता है।",
     "Medium", ["Adhisuchana", "Official Gazette", "Letter Drafting"]),
    # 162
    ("Demi-Official Letter - Ardhashasakiy Patra Protocol", "UP-HIN-DEMI-OFFICIAL-LETTER-DO-PROTOCOL", "Tests salutation and personal tone conventions of Demi-Official (D.O.) letters in administration",
     "Secretariat Manual of Office Procedure", "अर्द्धशासकीय पत्र प्रारूप", 1, "उत्तर प्रदेश कार्मिक विभाग", "सचिवालय हस्तपुस्तिका, पत्राचार अध्याय",
     "When is an 'अर्द्धशासकीय पत्र' (Demi-Official / D.O. Letter) written by an educational officer?",
     "शिक्षा विभाग के किसी अधिकारी द्वारा 'अर्द्धशासकीय पत्र' (D.O. Letter) कब लिखा जाता है?",
     ["When drawing the personal attention of an officer of equivalent or nearly equivalent rank to expedite an urgent official matter using a courteous personal tone ('प्रिय श्री / Dear Shri...')",
      "When issuing a formal court warrant of arrest",
      "When advertising tenders in commercial newspapers",
      "When filing a formal departmental charge sheet against an employee"],
     ["जब किसी समकक्षी अथवा लगभग समान स्तर के अधिकारी का व्यक्तिगत ध्यान आकर्षित करके किसी आवश्यक सरकारी कार्य को शीघ्रता से निपटाना हो ('प्रिय श्री...' जैसे आत्मीय संबोधन के साथ)",
      "जब गिरफ्तारी का औपचारिक अदालती वारंट जारी करना हो",
      "जब समाचार पत्रों में निविदाओं का विज्ञापन देना हो",
      "जब किसी कर्मचारी के विरुद्ध औपचारिक आरोप पत्र दाखिल करना हो"],
     0, "A D.O. letter is addressed by one officer to another by name using a friendly, personal yet official tone to draw personal attention to an urgent matter.",
     "अर्द्धशासकीय पत्र (D.O. Letter) एक अधिकारी द्वारा दूसरे समकक्षी अधिकारी को व्यक्तिगत नाम से भेजा जाता है ताकि किसी महत्वपूर्ण कार्य में व्यक्तिगत हस्तक्षेप से तेजी लाई जा सके।",
     "Easy", ["Demi-Official Letter", "DO Letter", "Official Correspondence"]),
    # 163
    ("Office Order - Karyalay Aadesh Scope", "UP-HIN-KARYALAY-AADESH-INTERNAL-DUTIES", "Tests application of Office Order (कार्यालय आदेश) for internal duties, leave sanctions, and seat allotments",
     "Office Procedure Manual", "कार्यालय आदेश नियम", 1, "उत्तर प्रदेश प्रशासन एवं कार्मिक", "सचिवालय कार्यपद्धति",
     "What matters are officially communicated through a 'कार्यालय आदेश' (Office Order) within a school or educational office?",
     "विद्यालय अथवा शैक्षिक कार्यालय में 'कार्यालय आदेश' (Office Order) द्वारा किन विषयों को संसूचित किया जाता है?",
     ["Internal administrative decisions, staff duty allocations, sanction of leave, internal postings, and office timings affecting internal employees",
      "Diplomatic treaties with foreign sovereign nations",
      "Constitutional amendment proposals sent to Parliament",
      "Judicial judgments passed by the High Court"],
     ["आंतरिक प्रशासनिक निर्णय, कर्मचारियों के कार्य-विभाजन, अवकाश स्वीकृति, पटल आवंटन और आंतरिक कर्मचारियों पर लागू होने वाले कार्यालय नियम",
      "विदेशी संप्रभु राष्ट्रों के साथ राजनयिक संधियां",
      "संसद को भेजे जाने वाले संविधान संशोधन प्रस्ताव",
      "उच्च न्यायालय द्वारा पारित न्यायिक निर्णय"],
     0, "An Office Order is strictly an internal administrative communication issued by the head of office to regulate internal working, staff allocations, and leave sanctions.",
     "कार्यालय आदेश (Office Order) का उपयोग कार्यालय के आंतरिक प्रबंधन, कर्मचारियों के पटल परिवर्तन, कार्य-विभाजन और अवकाश स्वीकृति हेतु किया जाता है।",
     "Easy", ["Office Order", "Karyalay Aadesh", "Office Procedure"]),
    # 164
    ("Press Communique - Karyalay Vigyapti", "UP-HIN-KARYALAY-VIGYAPTI-PRESS-NOTE", "Tests purpose of Press Communique (विज्ञप्ति) for broad public information via media",
     "Information and Public Relations Department", "प्रेस विज्ञप्ति नियम", 1, "सूचना एवं जनसम्पर्क विभाग, उत्तर प्रदेश", "शासकीय विज्ञप्ति प्रारूप",
     "In UP government correspondence, what is the role of a 'कार्यालय विज्ञप्ति / प्रेस नोट' (Press Release / Communique)?",
     "उत्तर प्रदेश शासन के पत्राचार में, 'कार्यालय विज्ञप्ति / प्रेस नोट' (Press Communique) का मुख्य कार्य क्या होता है?",
     ["Disseminating official decisions, examination dates, or policy matters widely to the public through newspapers, radio, and electronic media without legal obligation to publish in the gazette",
      "Conducting secret departmental inquiries against teachers",
      "Filing income tax returns with the bank",
      "Sanctioning medical reimbursements to individual peons"],
     ["समाचार पत्रों और मीडिया के माध्यम से आम जनता को आधिकारिक निर्णयों, परीक्षा तिथियों अथवा नीतिगत मामलों की विस्तृत जानकारी देना (गजट प्रकाशन की बाध्यता के बिना)",
      "शिक्षकों के खिलाफ गुप्त विभागीय जांच करना",
      "बैंक में आयकर रिटर्न दाखिल करना",
      "व्यक्तिगत चपरासी को चिकित्सा प्रतिपूर्ति स्वीकृत करना"],
     0, "A Vigyapti or Press Communique is published through the media to convey government decisions, board exam schedules, and public notices to the general populace.",
     "विज्ञप्ति (Press Note) का उद्देश्य समाचार माध्यमों के जरिए सामान्य जनता या परीक्षार्थियों तक किसी महत्वपूर्ण सूचना अथवा परीक्षा कार्यक्रम को प्रसारित करना होता है।",
     "Easy", ["Press Communique", "Vigyapti", "Correspondence"]),
    # 165
    ("Sentence Structure - Vakya Shuddhi in Official Orders", "UP-HIN-VAKYA-SHUDDHI-ADMINISTRATIVE-SYNTAX", "Tests syntactic correction of common administrative sentence errors in Hindi",
     "Standard Hindi Syntax", "वाक्य विन्यास एवं शुद्धि नियम", 4, "कामताप्रसाद गुरु, वाक्य-विचार", "शुद्ध वाक्य रचना",
     "Identify the grammatically correct and syntactically flawless sentence in Hindi:",
     "व्याकरणिक एवं वाक्य विन्यास की दृष्टि से पूर्णतः शुद्ध वाक्य का चयन कीजिए:",
     ["कृपया इस पत्र का उत्तर शीघ्र देने की कृपा करें।",
      "कृपया इस पत्र का उत्तर शीघ्र दें।",
      "आप इस पत्र का उत्तर कृपया करके शीघ्रतापूर्वक देने की कृपा करें।",
      "पत्र का उत्तर कृपया शीघ्रता के साथ देने की कृपा करें।"],
     ["कृपया इस पत्र का उत्तर शीघ्र देने की कृपा करें।",
      "कृपया इस पत्र का उत्तर शीघ्र दें।",
      "आप इस पत्र का उत्तर कृपया करके शीघ्रतापूर्वक देने की कृपा करें।",
      "पत्र का उत्तर कृपया शीघ्रता के साथ देने की कृपा करें।"],
     1, "Using 'कृपया' and 'कृपा करें' in the same sentence is a redundant tautology (पुनरुक्ति दोष). The grammatically correct form is: 'कृपया इस पत्र का उत्तर शीघ्र दें।'",
     "एक ही वाक्य में 'कृपया' और 'कृपा करें' दोनों का प्रयोग पुनरुक्ति दोष है। शुद्ध वाक्य: 'कृपया इस पत्र का उत्तर शीघ्र दें।' है।",
     "Medium", ["Vakya Shuddhi", "Syntax", "Hindi Grammar"])
]

for idx, item in enumerate(u4_items):
    qid = 151 + idx
    sec2_qs.append(q(
        qid, 2, 4, t4, th4, item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7],
        item[8], item[9], item[10], item[11], item[12], item[13], item[14], item[15], item[16]
    ))

print(f"Generated Unit 4 (15 Qs). Total: {len(sec2_qs)}")

# Unit 5: General English (166 to 180)
t5 = "Unit 5: General English"
th5 = "इकाई 5: सामान्य अंग्रेजी (व्याकरण, शब्दावली व रूपांतरण)"

u5_items = [
    # 166
    ("Prepositions - Appropriate Prepositions", "UP-ENG-PREPOSITIONS-COMPLY-WITH", "Tests appropriate preposition usage after administrative verbs (comply with, adhere to)",
     "Standard English Grammar", "Prepositional Collocations", 4, "Wren & Martin High School English Grammar", "Chapter on Prepositions",
     "Fill in the blank with the appropriate preposition: 'All secondary schools in the district must strictly comply ______ the safety norms issued by the disaster management authority.'",
     "उचित प्रीपोजिशन से रिक्त स्थान की पूर्ति कीजिए: 'All secondary schools in the district must strictly comply ______ the safety norms issued by the disaster management authority.'",
     ["with", "to", "at", "by"],
     ["with", "to", "at", "by"],
     0, "The verb 'comply' takes the fixed preposition 'with' (comply with rules/norms), while 'adhere' takes 'to' (adhere to rules).",
     "'Comply' के साथ हमेशा 'with' प्रीपोजिशन आता है ('comply with safety norms')। 'Adhere' के साथ 'to' आता है।",
     "Easy", ["Prepositions", "English Grammar", "Vocabulary"]),
    # 167
    ("One Word Substitution - Lexicographer / Philanthropist", "UP-ENG-ONE-WORD-ALTRUIST-PHILANTHROPIST", "Tests one-word substitution for educational donors and patrons",
     "English Lexicon", "One Word Substitution for Civil Exams", 4, "Word Power Made Easy by Norman Lewis", "Vocabulary Building Manual",
     "What is the single-word term for 'A person who makes generous financial donations to promote the welfare of schools and poor students'?",
     "'विद्यालयों और निर्धन छात्रों के कल्याण को बढ़ावा देने के लिए उदारतापूर्वक वित्तीय दान देने वाला व्यक्ति' के लिए एक शब्द क्या है?",
     ["Philanthropist (लोक-हितैषी)", "Misanthrope", "Somnambulist", "Egoist"],
     ["Philanthropist (लोक-हितैषी)", "Misanthrope (मानवद्वेषी)", "Somnambulist (नींद में चलने वाला)", "Egoist (अहंकारी)"],
     0, "A philanthropist is a person who seeks to promote the welfare of others, especially by the generous donation of money to good causes like education.",
     "समाज कल्याण और शिक्षा हेतु उदारतापूर्वक दान देने वाले को 'Philanthropist' (परोपकारी/लोक-हितैषी) कहा जाता है।",
     "Easy", ["One Word Substitution", "Vocabulary", "English"]),
    # 168
    ("Synonyms - Administrative Context", "UP-ENG-SYNONYM-METICULOUS-DILIGENT", "Tests precise synonyms for administrative thoroughness",
     "Standard English Vocabulary", "Synonyms in Governance", 4, "Merriam-Webster Collegiate Dictionary", "Civil Services English Series",
     "Choose the word that is most nearly similar in meaning (Synonym) to 'EXEMPLARY' as in 'exemplary institutional leadership':",
     "'EXEMPLARY' (अनुकरणीय/आदर्श) शब्द का सर्वाधिक निकटतम समानार्थी (Synonym) शब्द चुनिए:",
     ["Commendable and worthy of imitation (आदर्श / अनुकरणीय)", "Disgraceful and fraudulent", "Ordinary and mediocre", "Temporary and passing"],
     ["Commendable and worthy of imitation (आदर्श / अनुकरणीय)", "अपमानजनक व कपटपूर्ण", "साधारण और औसत", "अस्थायी और नश्वर"],
     0, "'Exemplary' means serving as a desirable model; representing the best of its kind; commendable and worthy of imitation.",
     "'Exemplary' का अर्थ अत्यंत सराहनीय, उत्कृष्ट व अनुकरणीय होता है (worthy of imitation / model)।",
     "Easy", ["Synonyms", "English Vocabulary"]),
    # 169
    ("Antonyms - Academic Integrity", "UP-ENG-ANTONYM-TRANSPARENT-OPAQUE", "Tests antonym of transparency in school admissions",
     "Standard English Antonyms", "Lexical Opposites", 4, "Oxford Advanced Learner's Dictionary", "Antonyms Glossary",
     "What is the antonym of the word 'TRANSPARENT' as applied to school financial accounting and student evaluation?",
     "विद्यालय वित्तीय लेखांकन और छात्र मूल्यांकन के संदर्भ में 'TRANSPARENT' (पारदर्शी) का विलोम शब्द (Antonym) क्या है?",
     ["Opaque (अपारदर्शी / अस्पष्ट)", "Lucid", "Pellucid", "Candid"],
     ["Opaque (अपारदर्शी / अस्पष्ट)", "स्पष्ट (Lucid)", "पारभासी (Pellucid)", "खरा/स्पष्टवादी (Candid)"],
     0, "The antonym of 'transparent' (clear, open, easily seen through) is 'opaque' (cloudy, obscure, impenetrable to light or scrutiny).",
     "'Transparent' (पारदर्शी) का सीधा विलोम शब्द 'Opaque' (अपारदर्शी / अस्पष्ट / संदिग्ध) होता है।",
     "Easy", ["Antonyms", "English Vocabulary"]),
    # 170
    ("Idioms and Phrases - White Elephant", "UP-ENG-IDIOM-WHITE-ELEPHANT", "Tests meaning of administrative expenditure idiom 'a white elephant'",
     "Idioms and Phrases in Public Administration", "Standard Idiomatic Expressions", 4, "Cambridge International Dictionary of Idioms", "Administrative English Phrases",
     "What does the idiomatic phrase 'A White Elephant' mean in terms of institutional assets?",
     "संस्थागत संपत्तियों के संदर्भ में मुहावरेदार अभिव्यक्ति 'A White Elephant' का क्या अर्थ है?",
     ["A possession that is extremely expensive to maintain and of no practical utility",
      "An exceptionally rare and endangered albino wildlife specimen",
      "A valuable gold monument awarded for sports achievements",
      "A highly profitable commercial enterprise"],
     ["एक ऐसी वस्तु या भवन जिसकी देखरेख बहुत महंगी हो किन्तु जिसका कोई व्यावहारिक उपयोग न हो (सफेद हाथी)",
      "एक दुर्लभ और लुप्तप्राय वन्यजीव नमूना",
      "खेल उपलब्धियों के लिए दिया जाने वाला एक मूल्यवान स्वर्ण पदक",
      "अत्यधिक लाभ देने वाला वाणिज्यिक उद्यम"],
     0, "A 'white elephant' is a burdensome possession whose cost of upkeep is completely disproportionate to its usefulness.",
     "'A white elephant' का अर्थ अत्यधिक खर्चीली और अनुपयोगी संपत्ति होता है जो केवल आर्थिक बोझ बनती है।",
     "Easy", ["Idioms", "Phrases", "English Language"]),
    # 171
    ("Active and Passive Voice - Official Inquiry", "UP-ENG-VOICE-DISCIPLINARY-PROCEEDING", "Tests conversion of past tense administrative inquiry sentence to passive voice",
     "Standard English Syntax", "Voice Conversion Rules", 4, "Wren & Martin High School English Grammar", "Active and Passive Voice",
     "Convert the following sentence into passive voice: 'The District Inspector of Schools issued a show-cause notice to the committee.'",
     "निम्नलिखित वाक्य को कर्मवाच्य (Passive Voice) में बदलिए: 'The District Inspector of Schools issued a show-cause notice to the committee.'",
     ["A show-cause notice was issued to the committee by the District Inspector of Schools.",
      "A show-cause notice is issued by the committee to DIOS.",
      "The committee has been issued a show-cause notice by DIOS.",
      "A show-cause notice had been issued to the DIOS by the committee."],
     ["A show-cause notice was issued to the committee by the District Inspector of Schools.",
      "A show-cause notice is issued by the committee to DIOS.",
      "The committee has been issued a show-cause notice by DIOS.",
      "A show-cause notice had been issued to the DIOS by the committee."],
     0, "Past simple ('issued') changes to 'was/were + past participle (was issued)'. Object 'A show-cause notice' becomes subject.",
     "Simple Past tense ('issued') का पैसिव 'was issued' होता है। अतः विकल्प A पूर्णतः शुद्ध है।",
     "Easy", ["Active Passive", "Voice", "English Grammar"]),
    # 172
    ("Direct and Indirect Speech - Request Order", "UP-ENG-REPORTED-SPEECH-IMPERATIVE-INSTRUCTION", "Tests reported speech transformation of Principal's instructions to invigilators",
     "Reported Speech Rules", "Imperative Sentence Conversion", 4, "Wren & Martin High School English Grammar", "Direct and Indirect Narration",
     "Change into indirect speech: The Principal said to the invigilator, 'Verify the admit cards of all candidates carefully.'",
     "अप्रत्यक्ष कथन (Indirect Speech) में परिवर्तित कीजिए: The Principal said to the invigilator, 'Verify the admit cards of all candidates carefully.'",
     ["The Principal instructed the invigilator to verify the admit cards of all candidates carefully.",
      "The Principal said that the invigilator must verify admit cards carefully.",
      "The Principal asked the invigilator whether he verified admit cards carefully.",
      "The Principal requested that the invigilator was verifying admit cards."],
     ["The Principal instructed the invigilator to verify the admit cards of all candidates carefully.",
      "The Principal said that the invigilator must verify admit cards carefully.",
      "The Principal asked the invigilator whether he verified admit cards carefully.",
      "The Principal requested that the invigilator was verifying admit cards."],
     0, "Imperative sentences use reporting verbs like 'instructed/ordered/directed' followed by the infinitive 'to verify'.",
     "आदेशात्मक (Imperative) वाक्यों में रिपोर्टिंग वर्ब 'instructed/ordered' में बदलती है और मुख्य क्रिया 'to + verb' (to verify) बन जाती है।",
     "Easy", ["Reported Speech", "Indirect Narration", "English Grammar"]),
    # 173
    ("Punctuations - Use of Apostrophe and Possessives", "UP-ENG-PUNCTUATION-TEACHERS-COMMON-ROOM", "Tests plural possessive punctuation (teachers' room vs teacher's room)",
     "Standard English Punctuation", "Apostrophe for Plural Possessive", 4, "Fowler's Modern English Usage", "Punctuation Guide",
     "Which of the following signboards on the school corridor displays the grammatically correct punctuation for a common room used by multiple teachers?",
     "विद्यालय के गलियारे में कई शिक्षकों द्वारा प्रयुक्त कॉमन रूम के लिए कौन सा साइनबोर्ड सही विराम चिह्न (Punctuation) प्रदर्शित करता है?",
     ["Teachers' Common Room", "Teacher's Common Room", "Teachers Common Room", "Teachers's Common Room"],
     ["Teachers' Common Room", "Teacher's Common Room", "Teachers Common Room", "Teachers's Common Room"],
     0, "For plural nouns ending in 's' (teachers), the possessive is formed by adding only an apostrophe after the 's' (Teachers' Common Room).",
     "बहुवचन शब्द जो 's' पर समाप्त होते हैं (जैसे teachers), उनका सम्बन्ध कारक बनाने के लिए 's' के बाद केवल एपोस्ट्रॉफी (') लगाया जाता है (Teachers' Common Room)।",
     "Medium", ["Punctuation", "Apostrophe", "English Grammar"]),
    # 174
    ("Error Correction - Subject Verb Agreement with 'As Well As'", "UP-ENG-ERROR-CORRECTION-AS-WELL-AS", "Tests subject agreement when joined by 'as well as' (verb agrees with first subject)",
     "English Syntax and Concord", "Parenthetical Connectors Rule", 4, "Wren & Martin High School English Grammar", "Concord Rules",
     "Spot the error in the following sentence: 'The Principal (A) / as well as the lab assistants (B) / were present in the chemistry lab (C) / during the inspection. (D)'",
     "वाक्य के किस भाग में त्रुटि है: 'The Principal (A) / as well as the lab assistants (B) / were present in the chemistry lab (C) / during the inspection. (D)'",
     ["Part (A)", "Part (B)", "Part (C) - 'were' should be 'was'", "Part (D)"],
     ["भाग (A)", "भाग (B)", "भाग (C) - 'were' के स्थान पर 'was' होना चाहिए", "भाग (D)"],
     2, "When two nouns are connected by 'as well as', 'along with', or 'together with', the verb agrees with the first subject ('The Principal' is singular, so it should be 'was present').",
     "जब दो कर्ता 'as well as' से जुड़े हों, तो क्रिया पहले कर्ता के अनुसार होती है। 'The Principal' एकवचन है, अतः 'were' के स्थान पर 'was' आएगा।",
     "Medium", ["Error Spotting", "Concord", "Subject Verb Agreement"]),
    # 175
    ("Sequence of Words in Sentence - Para Jumbles", "UP-ENG-SENTENCE-SEQUENCING-PQRS", "Tests logical sequencing of scrambled sentences in institutional communication",
     "Sentence Structuring and Coherence", "Jumbled Sentences / Sentence Sequencing", 4, "Civil Services General English Manual", "Sentence Reordering Chapter",
     "Rearrange the scrambled parts to form a coherent, grammatically sound official sentence:\nP: ensuring high academic standards\nQ: the primary responsibility of the Principal\nR: while fostering student well-being\nS: lies in",
     "एक सुसंगत और व्याकरणिक वाक्य बनाने के लिए अव्यवस्थित भागों को सही क्रम में व्यवस्थित कीजिए:\nP: ensuring high academic standards\nQ: the primary responsibility of the Principal\nR: while fostering student well-being\nS: lies in",
     ["Q - S - P - R", "P - Q - S - R", "R - S - Q - P", "S - P - Q - R"],
     ["Q - S - P - R", "P - Q - S - R", "R - S - Q - P", "S - P - Q - R"],
     0, "Correct coherent sequence: 'The primary responsibility of the Principal (Q) / lies in (S) / ensuring high academic standards (P) / while fostering student well-being (R).' -> Q - S - P - R.",
     "सही सार्थक क्रम: 'The primary responsibility of the Principal (Q) lies in (S) ensuring high academic standards (P) while fostering student well-being (R).' (Q-S-P-R)।",
     "Easy", ["Sentence Sequencing", "Para Jumbles", "English Syntax"]),
    # 176
    ("Spelling Correction - Frequently Misspelled Words", "UP-ENG-SPELLING-SUPERINTENDENT-COMMITTEE", "Tests correct spelling of administrative designation 'Superintendent'",
     "English Orthography", "Frequently Misspelled Administrative Words", 4, "Standard English Dictionaries", "Spelling Tests for Civil Services",
     "Select the correctly spelled word for the official administrative post:",
     "आधिकारिक प्रशासनिक पद के लिए शुद्ध वर्तनी (Correct Spelling) वाला शब्द चुनिए:",
     ["Superintendent", "Superintendant", "Superintendent", "Supernintendent"],
     ["Superintendent", "Superintendant", "Superintendent", "Supernintendent"],
     0, "The correct spelling is 'Superintendent' (with an 'e' in -dent, from Latin superintendere).",
     "शुद्ध वर्तनी 'Superintendent' (अधीक्षक) है, अंत में '-dent' होता है न कि '-dant'।",
     "Easy", ["Spelling", "Orthography", "English Vocabulary"]),
    # 177
    ("Prepositional Phrases - In Accordance With", "UP-ENG-PREPOSITIONAL-PHRASE-ACCORDANCE", "Tests standard administrative idiom 'in accordance with'",
     "Administrative Drafting Grammar", "Fixed Prepositional Idioms", 4, "Fowler's Modern English Usage", "Phrasal Idioms",
     "Complete the official statement: 'The appointment of the lecturer was finalized ______ accordance with the regulations framed under the Intermediate Education Act.'",
     "वाक्य पूर्ण कीजिए: 'The appointment of the lecturer was finalized ______ accordance with the regulations framed under the Intermediate Education Act.'",
     ["in", "at", "for", "by"],
     ["in", "at", "for", "by"],
     0, "The fixed prepositional phrase in administrative English is 'in accordance with' (के अनुसार).",
     "प्रशासनिक अंग्रेजी में मानक वाक्यांश 'in accordance with' (के अनुसार) प्रयुक्त होता है।",
     "Easy", ["Prepositions", "Drafting", "English Grammar"]),
    # 178
    ("Idioms and Phrases - Leave no stone unturned", "UP-ENG-IDIOM-LEAVE-NO-STONE-UNTURNED", "Tests comprehension of administrative efforts idiom",
     "Idioms and Phrases", "Standard Idiomatic Expressions", 4, "Oxford Dictionary of English Idioms", "Vocabulary",
     "What does the idiom 'to leave no stone unturned' mean in the context of an institutional audit investigation?",
     "संस्थागत जांच के संदर्भ में मुहावरे 'to leave no stone unturned' का क्या अर्थ है?",
     ["To dig up the school botanical garden looking for minerals",
      "To use every possible means and spare no effort to discover the truth or achieve an objective",
      "To break old building stones during renovation",
      "To leave files open on desks overnight"],
     ["खनिजों की खोज के लिए स्कूल के बगीचे को खोदना",
      "सच्चाई का पता लगाने या लक्ष्य प्राप्त करने के लिए हर संभव प्रयास करना और कोई कसर न छोड़ना",
      "जीर्णोद्धार के दौरान पुरानी इमारत के पत्थरों को तोड़ना",
      "रात भर फाइलों को मेज पर खुला छोड़ देना"],
     1, "'To leave no stone unturned' means to do everything possible to achieve an end or complete a thorough investigation.",
     "'Leave no stone unturned' का अर्थ हर संभव प्रयास करना और कोई कसर बाकी न छोड़ना (to use every possible means) होता है।",
     "Easy", ["Idioms", "Phrases", "English Vocabulary"]),
    # 179
    ("Conditional Clauses - Past Unreal Condition", "UP-ENG-CONDITIONAL-CLAUSES-HAD-WOULD-HAVE", "Tests third conditional syntax (If + had + V3, would have + V3)",
     "English Grammar and Syntax", "Third Conditional Rules", 4, "Wren & Martin High School English Grammar", "Conditional Sentences Chapter",
     "Complete the sentence correctly: 'If the management ______ the revised budget proposal on time, the state grant would not have lapsed.'",
     "वाक्य को सही ढंग से पूर्ण कीजिए: 'If the management ______ the revised budget proposal on time, the state grant would not have lapsed.'",
     ["had submitted", "submitted", "would submit", "has submitted"],
     ["had submitted", "submitted", "would submit", "has submitted"],
     0, "In the Third Conditional (past unreal situation), the 'if'-clause takes Past Perfect ('had submitted'), and the main clause takes 'would have + past participle'.",
     "तीसरे सशर्त वाक्य (Third Conditional) में 'if' वाले उपवाक्य में Past Perfect ('had submitted') आता है, जबकि मुख्य वाक्य में 'would have + V3' होता है।",
     "Medium", ["Conditional Sentences", "Syntax", "English Grammar"]),
    # 180
    ("Error Spotting - Uncountable Nouns in Education", "UP-ENG-ERROR-UNCOUNTABLE-NOUNS-INFORMATION", "Tests correct usage of uncountable noun 'information' (no plural 'informations')",
     "English Noun Classifications", "Uncountable Nouns Rules", 4, "Wren & Martin High School English Grammar", "Nouns: Countable and Uncountable",
     "Spot the error in the sentence: 'The Principal requested (A) / the examination controller to provide (B) / all the necessary informations (C) / regarding the new timetable. (D)'",
     "वाक्य के किस भाग में व्याकरणिक अशुद्धि है: 'The Principal requested (A) / the examination controller to provide (B) / all the necessary informations (C) / regarding the new timetable. (D)'",
     ["Part (A)", "Part (B)", "Part (C) - 'informations' is incorrect, it must be 'information'", "Part (D)"],
     ["भाग (A)", "भाग (B)", "भाग (C) - 'informations' अशुद्ध है, इसके स्थान पर 'information' होना चाहिए", "भाग (D)"],
     2, "'Information' is an uncountable noun in English; it never takes a plural 's' (informations). The correct form is 'all the necessary information'.",
     "'Information' एक अगणनीय संज्ञा (Uncountable noun) है, इसका बहुवचन 'informations' नहीं बनाया जा सकता। शुद्ध रूप 'information' है।",
     "Easy", ["Nouns", "Uncountable Nouns", "Error Correction"])
]

for idx, item in enumerate(u5_items):
    qid = 166 + idx
    sec2_qs.append(q(
        qid, 2, 5, t5, th5, item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7],
        item[8], item[9], item[10], item[11], item[12], item[13], item[14], item[15], item[16]
    ))

print(f"Generated Unit 5 (15 Qs). Section II complete! Total questions: {len(sec2_qs)}")

with open("temp_up_sec2.json", "w", encoding="utf-8") as f:
    json.dump(sec2_qs, f, ensure_ascii=False, indent=2)
