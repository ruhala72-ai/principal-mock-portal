# -*- coding: utf-8 -*-
import json

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

questions = []

# AREA 1: General Knowledge & Contemporary Issues (1 to 15)
t1 = "General Knowledge, including contemporary social, economic and cultural issues"
th1 = "सामान्य ज्ञान एवं समसामयिक सामाजिक, आर्थिक व सांस्कृतिक मुद्दे"

questions.append(q(1, 1, t1, th1, "National & International Events",
    "Which international forum hosted the 2023 G20 Leaders' Summit under India's presidency under the theme 'Vasudhaiva Kutumbakam'?",
    "भारत की अध्यक्षता में 'वसुधैव कुटुंबकम' विषय के साथ 2023 के जी20 शिखर सम्मेलन की मेजबानी किस अंतरराष्ट्रीय स्थल पर की गई?",
    ["Bharat Mandapam, New Delhi", "Yashobhoomi, Dwarka", "Vigyan Bhawan, New Delhi", "Statue of Unity, Gujarat"],
    ["भारत मंडपम, नई दिल्ली", "यशोभूमि, द्वारका", "विज्ञान भवन, नई दिल्ली", "स्टैच्यू ऑफ यूनिटी, गुजरात"],
    0, "The 18th G20 Summit in September 2023 was held at Bharat Mandapam, Pragati Maidan, New Delhi.",
    "18वां जी20 शिखर सम्मेलन सितंबर 2023 में प्रगति मैदान, नई दिल्ली स्थित भारत मंडपम में आयोजित किया गया था।",
    "Easy", ["G20", "Current Affairs"]))

questions.append(q(2, 1, t1, th1, "Indian Constitution & Democratic Institutions",
    "Under Article 21A of the Constitution of India, free and compulsory education is guaranteed as a Fundamental Right to children of which age group?",
    "भारतीय संविधान के अनुच्छेद 21A के अंतर्गत किस आयु वर्ग के बच्चों के लिए निःशुल्क एवं अनिवार्य शिक्षा को मौलिक अधिकार घोषित किया गया है?",
    ["3 to 6 years", "6 to 14 years", "6 to 18 years", "5 to 15 years"],
    ["3 से 6 वर्ष", "6 से 14 वर्ष", "6 से 18 वर्ष", "5 से 15 वर्ष"],
    1, "Article 21A, inserted by the 86th Constitutional Amendment Act 2002, mandates free and compulsory education for children aged 6 to 14.",
    "86वें संविधान संशोधन अधिनियम 2002 द्वारा जोड़े गए अनुच्छेद 21A के अनुसार 6 से 14 वर्ष के बच्चों के लिए निःशुल्क व अनिवार्य शिक्षा मौलिक अधिकार है।",
    "Easy", ["Article 21A", "Constitution"]))

questions.append(q(3, 1, t1, th1, "Socio-Economic Development & Census Data",
    "According to the 2011 Census of India, which state recorded the highest female literacy rate in the country?",
    "2011 की भारतीय जनगणना के अनुसार, देश में सर्वाधिक महिला साक्षरता दर किस राज्य में दर्ज की गई थी?",
    ["Kerala (92.1%)", "Mizoram (89.3%)", "Goa (84.7%)", "Tripura (82.7%)"],
    ["केरल (92.1%)", "मिजोरम (89.3%)", "गोवा (84.7%)", "त्रिपुरा (82.7%)"],
    0, "Kerala recorded the highest female literacy rate at 92.07% in Census 2011.",
    "2011 की जनगणना के अनुसार केरल में सर्वाधिक महिला साक्षरता (92.1%) दर्ज की गई थी।",
    "Medium", ["Census 2011", "Literacy"]))

questions.append(q(4, 1, t1, th1, "Sustainable Development Goals",
    "Which United Nations Sustainable Development Goal (SDG) specifically targets 'Quality Education' for all?",
    "संयुक्त राष्ट्र का कौन सा सतत विकास लक्ष्य (SDG) सभी के लिए 'गुणवत्तापूर्ण शिक्षा' (Quality Education) पर केंद्रित है?",
    ["SDG 1", "SDG 3", "SDG 4", "SDG 8"],
    ["एसडीजी 1", "एसडीजी 3", "एसडीजी 4", "एसडीजी 8"],
    2, "SDG 4 aims to ensure inclusive and equitable quality education and promote lifelong learning opportunities for all by 2030.",
    "एसडीजी 4 का उद्देश्य 2030 तक सभी के लिए समावेशी व गुणवत्तापूर्ण शिक्षा तथा आजीवन सीखने के अवसर सुनिश्चित करना है।",
    "Easy", ["SDG 4", "Quality Education"]))

questions.append(q(5, 1, t1, th1, "Indian Cultural Heritage & Science",
    "Which lunar mission made India the first country to land a spacecraft near the Moon's South Pole in August 2023?",
    "किस चंद्र मिशन ने अगस्त 2023 में चंद्रमा के दक्षिणी ध्रुव के निकट उतरने वाला पहला देश बनाकर भारत को ऐतिहासिक सफलता दिलाई?",
    ["Chandrayaan-1", "Chandrayaan-2", "Chandrayaan-3", "Aditya-L1"],
    ["चंद्रयान-1", "चंद्रयान-2", "चंद्रयान-3", "आदित्य-एल1"],
    2, "ISRO's Chandrayaan-3 successfully soft-landed its Vikram lander on 23 August 2023.",
    "इसरो के चंद्रयान-3 ने 23 अगस्त 2023 को चंद्रमा के दक्षिणी ध्रुव पर सफल लैंडिंग की।",
    "Easy", ["Chandrayaan-3", "Space"]))

questions.append(q(6, 1, t1, th1, "Contemporary Economic Issues",
    "What is the statutory role of NITI Aayog, which replaced the Planning Commission of India in 2015?",
    "2015 में योजना आयोग के स्थान पर गठित नीति आयोग (NITI Aayog) का मुख्य वैधानिक स्वरूप क्या है?",
    ["Constitutional body with taxing power", "Think tank providing strategic and technical policy advice to Central and State Governments", "Commercial lending bank", "Industrial licensing tribunal"],
    ["कर लगाने की शक्ति वाला संवैधानिक निकाय", "केंद्र और राज्य सरकारों को रणनीतिक व तकनीकी नीतिगत सलाह देने वाला थिंक टैंक", "वाणिज्यिक ऋण बैंक", "औद्योगिक लाइसेंसिंग अधिकरण"],
    1, "NITI Aayog acts as the apex policy think tank of the Government of India fostering cooperative federalism.",
    "नीति आयोग भारत सरकार का शीर्ष नीतिगत थिंक टैंक है जो सहकारी संघवाद को बढ़ावा देता है।",
    "Medium", ["NITI Aayog", "Economy"]))

questions.append(q(7, 1, t1, th1, "Indian Constitution & Governance",
    "Who presides over the joint sitting of both Houses of Parliament in India under Article 108 of the Constitution?",
    "भारतीय संविधान के अनुच्छेद 108 के तहत दोनों सदनों की संयुक्त बैठक की अध्यक्षता कौन करता है?",
    ["The President of India", "The Chairman of Rajya Sabha", "The Speaker of Lok Sabha", "The Prime Minister"],
    ["भारत का राष्ट्रपति", "राज्यसभा का सभापति", "लोकसभा का अध्यक्ष (Speaker)", "प्रधानमंत्री"],
    2, "Under Article 118(4), the joint sitting of both Houses of Parliament is presided over by the Speaker of the Lok Sabha.",
    "अनुच्छेद 118(4) के अनुसार संसद के दोनों सदनों की संयुक्त बैठक की अध्यक्षता लोकसभा अध्यक्ष करता है।",
    "Medium", ["Constitution", "Speaker", "Parliament"]))

questions.append(q(8, 1, t1, th1, "Contemporary Social Issues & Protection",
    "Under Section 19 of the Protection of Children from Sexual Offences (POCSO) Act 2012, what is the duty of any person who has apprehension or knowledge of an offence?",
    "पॉक्सो (POCSO) अधिनियम 2012 की धारा 19 के अंतर्गत किसी भी व्यक्ति को अपराध की आशंका या जानकारी होने पर क्या विधिक दायित्व है?",
    ["Conduct personal mediation", "Mandatorily report to the Special Juvenile Police Unit (SJPU) or local police immediately", "Seek School Management Committee permission", "Wait for parents' written consent"],
    ["व्यक्तिगत मध्यस्थता करना", "विशेष किशोर पुलिस इकाई (SJPU) या स्थानीय पुलिस को तत्काल अनिवार्य सूचना देना", "विद्यालय प्रबंधन समिति से अनुमति लेना", "अभिभावकों की लिखित सहमति की प्रतीक्षा करना"],
    1, "Section 19 mandates immediate reporting of offences to the Special Juvenile Police Unit or local police, with failure punishable under Section 21.",
    "धारा 19 के तहत बाल उत्पीड़न की सूचना पुलिस या विशेष किशोर पुलिस इकाई को तत्काल देना अनिवार्य है।",
    "Medium", ["POCSO Act", "Child Protection"]))

questions.append(q(9, 1, t1, th1, "Indian Polity & Panchayati Raj",
    "Which Constitutional Amendment Act added the Eleventh Schedule containing 29 functional items for Panchayats?",
    "किस संविधान संशोधन अधिनियम द्वारा पंचायतों के लिए 29 कार्यात्मक विषयों वाली 11वीं अनुसूची संविधान में जोड़ी गई?",
    ["42nd Amendment Act", "44th Amendment Act", "73rd Amendment Act 1992", "86th Amendment Act"],
    ["42वां संशोधन अधिनियम", "44वां संशोधन अधिनियम", "73वां संशोधन अधिनियम 1992", "86वां संशोधन अधिनियम"],
    2, "The 73rd Constitutional Amendment Act 1992 added the 11th Schedule providing 29 subjects under Article 243G.",
    "73वें संविधान संशोधन 1992 द्वारा 11वीं अनुसूची जोड़कर पंचायतों को 29 विषय सौंपे गए।",
    "Easy", ["73rd Amendment", "Panchayati Raj"]))

questions.append(q(10, 1, t1, th1, "Environmental Conservation",
    "Which international environmental treaty adopted in 1987 is celebrated as World Ozone Day every year on September 16?",
    "1987 में अपनाई गई कौन सी अंतरराष्ट्रीय पर्यावरण संधि ओजोन परत के संरक्षण हेतु समर्पित है और 16 सितंबर को विश्व ओजोन दिवस के रूप में मनाई जाती है?",
    ["Kyoto Protocol", "Montreal Protocol", "Paris Agreement", "Basel Convention"],
    ["क्योटो प्रोटोकॉल", "मॉन्ट्रियल प्रोटोकॉल", "पेरिस समझौता", "बेसल कन्वेंशन"],
    1, "The Montreal Protocol on Substances that Deplete the Ozone Layer was signed on 16 September 1987.",
    "मॉन्ट्रियल प्रोटोकॉल ओजोन क्षयकारी पदार्थों पर ऐतिहासिक अंतरराष्ट्रीय समझौता है जो 16 सितंबर 1987 को हस्ताक्षरित हुआ।",
    "Easy", ["Montreal Protocol", "Environment"]))

questions.append(q(11, 1, t1, th1, "Social Welfare Schemes",
    "The 'PM POSHAN' scheme (formerly Mid-Day Meal) is implemented under which statutory enactment in India?",
    "'पीएम पोषण' योजना (पूर्व में मध्याह्न भोजन योजना) भारत के किस वैधानिक अधिनियम के अंतर्गत संचालित की जाती है?",
    ["National Food Security Act (NFSA) 2013", "Essential Commodities Act", "Consumer Protection Act", "Factories Act"],
    ["राष्ट्रीय खाद्य सुरक्षा अधिनियम (NFSA) 2013", "आवश्यक वस्तु अधिनियम", "उपभोक्ता संरक्षण अधिनियम", "कारखाना अधिनियम"],
    0, "Section 5 of the National Food Security Act, 2013 provides the statutory basis for nutritional meals to school children under PM POSHAN.",
    "राष्ट्रीय खाद्य सुरक्षा अधिनियम 2013 की धारा 5 के अंतर्गत स्कूली बच्चों को पौष्टिक भोजन उपलब्ध कराने की वैधानिक गारंटी दी गई है।",
    "Medium", ["PM POSHAN", "NFSA 2013", "Nutrition"]))

questions.append(q(12, 1, t1, th1, "Indian Heritage & Ancient Knowledge",
    "Which ancient Indian university situated in modern Bihar was revived as an international university under an Act of Parliament in 2010?",
    "प्राचीन भारत का कौन सा विश्वविद्यालय, जो आधुनिक बिहार में स्थित था, 2010 में संसद के अधिनियम द्वारा अंतरराष्ट्रीय विश्वविद्यालय के रूप में पुनर्जीवित किया गया?",
    ["Takshashila", "Nalanda University", "Vikramashila", "Vallabhi"],
    ["तक्षशिला", "नालंदा विश्वविद्यालय", "विक्रमशिला", "वल्लभी"],
    1, "Nalanda University was established in Rajgir, Bihar, under the Nalanda University Act 2010, celebrating India's ancient seat of learning.",
    "प्राचीन नालंदा महाविहार की स्मृति में 2010 में राजगीर (बिहार) में नालंदा विश्वविद्यालय की पुनर्स्थापना की गई।",
    "Easy", ["Nalanda", "Heritage", "Higher Education"]))

questions.append(q(13, 1, t1, th1, "Indian Economy & Taxation",
    "The Goods and Services Tax (GST) in India was introduced through which Constitutional Amendment Act?",
    "भारत में वस्तु एवं सेवा कर (GST) किस संविधान संशोधन अधिनियम के माध्यम से लागू किया गया था?",
    ["99th Amendment Act", "100th Amendment Act", "101st Amendment Act 2016", "103rd Amendment Act"],
    ["99वां संशोधन अधिनियम", "100वां संशोधन अधिनियम", "101वां संशोधन अधिनियम 2016", "103वां संशोधन अधिनियम"],
    2, "The 101st Constitutional Amendment Act 2016 introduced the nationwide unified Goods and Services Tax (GST) effective from 1 July 2017.",
    "101वें संविधान संशोधन 2016 के द्वारा 1 जुलाई 2017 से देश में एकीकृत वस्तु एवं सेवा कर (GST) व्यवस्था लागू की गई।",
    "Medium", ["GST", "101st Amendment", "Economy"]))

questions.append(q(14, 1, t1, th1, "Fundamental Rights & Judicial Writs",
    "Which prerogative writ literally means 'We Command' and is issued by the Supreme Court or High Courts to enforce a public legal duty upon an authority?",
    "किस न्यायादेश (Writ) का शाब्दिक अर्थ 'हम आदेश देते हैं' होता है और यह किसी लोक प्राधिकारी को उसके विधिक कर्तव्य के पालन हेतु जारी किया जाता है?",
    ["Habeas Corpus", "Mandamus (परमादेश)", "Quo-Warranto", "Certiorari"],
    ["बंदी प्रत्यक्षीकरण", "परमादेश (Mandamus)", "अधिकार पृच्छा", "उत्प्रेषण"],
    1, "Mandamus is a judicial writ issued as a command to an inferior court or public official to perform a specified public duty correctly.",
    "परमादेश (Mandamus) का शाब्दिक अर्थ 'हम आज्ञा देते हैं' है, जो किसी सार्वजनिक अधिकारी को उसके विधिक कर्तव्य पालन हेतु दिया जाता है।",
    "Medium", ["Writs", "Mandamus", "Article 32"]))

questions.append(q(15, 1, t1, th1, "National Literacy & Mission Goals",
    "The 'ULLAS' (Nav Bharat Saksharta Karyakram) initiative launched by the Ministry of Education covers non-literate citizens of which age group?",
    "शिक्षा मंत्रालय द्वारा शुरू की गई 'उल्लास' (नव भारत साक्षरता कार्यक्रम) पहल किस आयु वर्ग के गैर-साक्षर नागरिकों के लिए संचालित है?",
    ["Ages 15 years and above", "Ages 6 to 14 years only", "Ages 18 to 35 years exclusively", "Senior citizens aged 60+ only"],
    ["15 वर्ष और उससे अधिक आयु के नागरिक", "केवल 6 से 14 वर्ष", "विशेष रूप से 18 से 35 वर्ष", "केवल 60 वर्ष से अधिक के वरिष्ठ नागरिक"],
    0, "ULLAS: New India Literacy Programme (NILP) targets non-literate persons aged 15 years and above to provide foundational literacy and life skills.",
    "उल्लास (ULLAS) योजना 15 वर्ष और उससे अधिक आयु के गैर-साक्षर व्यक्तियों को बुनियादी साक्षरता, संख्याज्ञान और जीवन कौशल सिखाने के लिए है।",
    "Medium", ["ULLAS", "Adult Education", "Literacy"]))

# AREA 2: Hindi and English Language Skills (16 to 30)
t2 = "Hindi and English Language Skills"
th2 = "हिन्दी एवं अंग्रेजी भाषा दक्षता"

# 8 English Questions (16 to 23)
questions.append(q(16, 2, t2, th2, "English Grammar & Prepositions",
    "Choose the correct preposition to complete the official notice: 'The Principal congratulated the academic staff _____ securing first position in the state ranking.'",
    "वाक्य को पूरा करने के लिए सही Preposition चुनें: 'The Principal congratulated the academic staff _____ securing first position in the state ranking.'",
    ["for", "on", "with", "at"],
    ["for", "on", "with", "at"],
    1, "The verb 'congratulate' takes the preposition 'on' followed by the achievement or occasion (e.g. congratulated on winning).",
    "अंग्रेजी व्याकरण के अनुसार 'congratulate' के बाद 'on' का प्रयोग किया जाता है।",
    "Easy", ["English Grammar", "Prepositions"]))

questions.append(q(17, 2, t2, th2, "English Vocabulary - One Word Substitution",
    "What is the one-word substitution for: 'A leader or educator who inspires and directs educational innovation and reform'?",
    "वाक्यांश के लिए एक शब्द चुनें: 'A leader or educator who inspires and directs educational innovation and reform'?",
    ["Visionary", "Pedagogue", "Bureaucrat", "Sycophant"],
    ["Visionary (दूरदर्शी)", "Pedagogue", "Bureaucrat", "Sycophant"],
    0, "A 'visionary' is a person who has clear and forward-looking ideas about how something should be planned and innovated.",
    "भविष्योन्मुखी विचारों से नवोन्मेष और सुधार का नेतृत्व करने वाले को 'Visionary' (दूरदर्शी) कहा जाता है।",
    "Easy", ["One Word Substitution", "Vocabulary"]))

questions.append(q(18, 2, t2, th2, "English Idioms & Phrases",
    "In administrative communication, what does the idiom 'to leave no stone unturned' mean?",
    "प्रशासनिक संदर्भ में मुहावरे 'to leave no stone unturned' का क्या अर्थ है?",
    ["To avoid doing any physical work", "To make every possible effort and explore every available means to accomplish a goal", "To conceal government records", "To demolish old school buildings"],
    ["कोई काम न करना", "लक्ष्य प्राप्ति हेतु हर संभव प्रयास करना और कोई कसर न छोड़ना", "सरकारी अभिलेख छिपाना", "पुराने भवन गिराना"],
    1, "'To leave no stone unturned' means to use every possible method or resource to achieve a desired outcome.",
    "इसका अर्थ है किसी कार्य को सिद्ध करने के लिए आकाश-पाताल एक कर देना या कोई कसर बाकी न रखना।",
    "Easy", ["Idioms", "English"]))

questions.append(q(19, 2, t2, th2, "English Syntax & Voice Transformation",
    "Convert the following sentence into Passive Voice: 'The committee has evaluated all examination papers diligently.'",
    "वाक्य को कर्मवाच्य (Passive Voice) में बदलें: 'The committee has evaluated all examination papers diligently.'",
    ["All examination papers were evaluated diligently by the committee.", "All examination papers have been evaluated diligently by the committee.", "All examination papers had been evaluated by the committee.", "All examination papers will be evaluated by the committee."],
    ["All examination papers were evaluated diligently by the committee.", "All examination papers have been evaluated diligently by the committee.", "All examination papers had been evaluated by the committee.", "All examination papers will be evaluated by the committee."],
    1, "Present Perfect Active ('has evaluated') changes to 'have been evaluated' in the passive voice with plural subject 'papers'.",
    "Present Perfect में passive voice की संरचना 'have/has + been + V3' होती है।",
    "Medium", ["Active Passive Voice", "Grammar"]))

questions.append(q(20, 2, t2, th2, "English Direct & Indirect Speech",
    "Change into Indirect Speech: The Principal said, 'Teachers must submit the annual academic reports tomorrow.'",
    "अप्रत्यक्ष कथन (Indirect Speech) में बदलें: The Principal said, 'Teachers must submit the annual academic reports tomorrow.'",
    ["The Principal said that teachers must submit the annual academic reports tomorrow.", "The Principal said that teachers had to submit the annual academic reports the following day.", "The Principal says that teachers must submit reports tomorrow.", "The Principal ordered teachers submitting reports tomorrow."],
    ["The Principal said that teachers must submit the annual academic reports tomorrow.", "The Principal said that teachers had to submit the annual academic reports the following day.", "The Principal says that teachers must submit reports tomorrow.", "The Principal ordered teachers submitting reports tomorrow."],
    1, "In indirect speech, the reporting verb in past tense changes 'must' to 'had to' (for obligation) and 'tomorrow' to 'the following day' or 'the next day'.",
    "इनडायरेक्ट स्पीच में 'said' के साथ 'must' को 'had to' तथा 'tomorrow' को 'the following day' में बदला जाता है।",
    "Medium", ["Direct Indirect Speech", "Narration"]))

questions.append(q(21, 2, t2, th2, "English Error Detection",
    "Identify the segment containing an error in the sentence: 'Neither the school supervisor (A) / nor the teachers (B) / was present in (C) / the morning staff meeting (D).'",
    "वाक्य के किस भाग में व्याकरण संबंधी त्रुटि है: 'Neither the school supervisor (A) / nor the teachers (B) / was present in (C) / the morning staff meeting (D).'",
    ["Neither the school supervisor (A)", "nor the teachers (B)", "was present in (C)", "the morning staff meeting (D)"],
    ["Neither the school supervisor (A)", "nor the teachers (B)", "was present in (C)", "the morning staff meeting (D)"],
    2, "With correlative conjunction 'neither... nor', the verb agrees with the nearer subject. Since 'teachers' is plural, the verb must be 'were present', not 'was'.",
    "'Neither... nor' में क्रिया निकटतम कर्ता के अनुसार आती है। 'teachers' बहुवचन है अतः 'was' के स्थान पर 'were' होगा।",
    "Medium", ["Subject-Verb Agreement", "Error Detection"]))

questions.append(q(22, 2, t2, th2, "English Vocabulary - Antonyms",
    "Select the word that is most nearly OPPOSITE in meaning to the word 'EQUIVOCAL' used in administrative directives:",
    "प्रशासनिक संदर्भ में प्रयुक्त शब्द 'EQUIVOCAL' का सबसे उपयुक्त विलोम (Antonym) शब्द चुनें:",
    ["Ambiguous", "Unequivocal (स्पष्ट / असंदिग्ध)", "Obscure", "Evasive"],
    ["Ambiguous (अस्पष्ट)", "Unequivocal (स्पष्ट / असंदिग्ध)", "Obscure (धुंधला)", "Evasive (टालमटोल)"],
    1, "'Equivocal' means ambiguous or open to more than one interpretation. Its direct antonym is 'unequivocal' (clear, unambiguous).",
    "'Equivocal' का अर्थ संदिग्ध या अस्पष्ट होता है, जिसका विलोम 'unequivocal' (असंदिग्ध/स्पष्ट) है।",
    "Easy", ["Antonyms", "Vocabulary"]))

questions.append(q(23, 2, t2, th2, "English Punctuation & Spelling",
    "Which of the following words is spelt correctly according to standard British/Indian English orthography?",
    "मानक अंग्रेजी वर्तनी के अनुसार निम्नलिखित में से किस शब्द की वर्तनी (Spelling) शुद्ध है?",
    ["Accomodation", "Accommodation", "Acommodation", "Accomadation"],
    ["Accomodation", "Accommodation", "Acommodation", "Accomadation"],
    1, "'Accommodation' is spelt with double 'c' and double 'm'.",
    "'Accommodation' की सही स्पेलिंग में दोहरा 'c' और दोहरा 'm' आता है।",
    "Easy", ["Spelling", "English"]))

# 7 Hindi Questions (24 to 30)
questions.append(q(24, 2, t2, th2, "सामान्य हिन्दी - संधि",
    "'सूर्योदय' शब्द में कौन सी संधि है तथा इसका सही संधि-विच्छेद क्या है?",
    "'सूर्योदय' शब्द में कौन सी संधि है तथा इसका सही संधि-विच्छेद क्या है?",
    ["दीर्घ संधि: सूर्य + उदय", "गुण संधि: सूर्य + उदय", "वृद्धि संधि: सूर्या + उदय", "यण संधि: सूरी + उदय"],
    ["दीर्घ संधि: सूर्य + उदय", "गुण संधि: सूर्य + उदय", "वृद्धि संधि: सूर्या + उदय", "यण संधि: सूरी + उदय"],
    1, "सूर्य + उदय = सूर्योदय। यहाँ 'अ' + 'उ' मिलकर 'ओ' बन जाता है, जो गुण स्वर संधि का उदाहरण है।",
    "अ/आ के बाद उ/ऊ आने पर दोनों मिलकर 'ओ' बनते हैं, जो गुण संधि है।",
    "Easy", ["संधि", "गुण संधि", "हिन्दी व्याकरण"]))

questions.append(q(25, 2, t2, th2, "सामान्य हिन्दी - समास",
    "'यथाशक्ति' शब्द में कौन सा समास प्रयुक्त हुआ है?",
    "'यथाशक्ति' शब्द में कौन सा समास प्रयुक्त हुआ है?",
    ["तत्पुरुष समास", "द्विगु समास", "अव्ययीभाव समास", "कर्मधारय समास"],
    ["तत्पुरुष समास", "द्विगु समास", "अव्ययीभाव समास", "कर्मधारय समास"],
    2, "'यथाशक्ति' का विग्रह 'शक्ति के अनुसार' होता है। इसमें प्रथम पद 'यथा' अव्यय है, अतः यह अव्ययीभाव समास है।",
    "जिस समास में पूर्व पद प्रधान और अव्यय हो, उसे अव्ययीभाव समास कहते हैं।",
    "Easy", ["समास", "अव्ययीभाव", "हिन्दी व्याकरण"]))

questions.append(q(26, 2, t2, th2, "सामान्य हिन्दी - उपसर्ग एवं प्रत्यय",
    "'प्राचार्य' शब्द में किस उपसर्ग का प्रयोग हुआ है?",
    "'प्राचार्य' शब्द में किस उपसर्ग का प्रयोग हुआ है?",
    ["प्रा", "प्र", "पर", "प्राच"],
    ["प्रा", "प्र", "पर", "प्राच"],
    1, "प्र + आचार्य = प्राचार्य। यहाँ 'प्र' संस्कृत का उपसर्ग है तथा दीर्घ संधि होकर 'प्राचार्य' बनता है।",
    "'प्र' उपसर्ग का अर्थ प्रकृष्ट या श्रेष्ठ होता है, प्र + आचार्य = प्राचार्य।",
    "Easy", ["उपसर्ग", "हिन्दी व्याकरण"]))

questions.append(q(27, 2, t2, th2, "सामान्य हिन्दी - विलोम शब्द",
    "'स्थावर' शब्द का सही विलोम शब्द निम्नलिखित में से कौन सा है?",
    "'स्थावर' शब्द का सही विलोम शब्द निम्नलिखित में से कौन सा है?",
    ["सचल", "जंगम", "चंचल", "चेतन"],
    ["सचल", "जंगम", "चंचल", "चेतन"],
    1, "'स्थावर' (स्थिर रहने वाला) का मानक विलोम 'जंगम' (जो चल सके) होता है।",
    "स्थावर का अर्थ अचल है और इसका सही विपरीतार्थक शब्द 'जंगम' है।",
    "Medium", ["विलोम शब्द", "हिन्दी"]))

questions.append(q(28, 2, t2, th2, "सामान्य हिन्दी - मुहावरे व लोकोक्तियाँ",
    "मुहावरे 'आस्तीन का सांप' का सटीक प्रशासनिक व व्यवहारिक अर्थ क्या है?",
    "मुहावरे 'आस्तीन का सांप' का सटीक प्रशासनिक व व्यवहारिक अर्थ क्या है?",
    ["विषैला जीव पालना", "कपटी अथवा विश्वासघाती मित्र/सहयोगी", "अत्यंत परिश्रमी व्यक्ति", "साहसी कर्मचारी"],
    ["विषैला जीव पालना", "कपटी अथवा विश्वासघाती मित्र/सहयोगी", "अत्यंत परिश्रमी व्यक्ति", "साहसी कर्मचारी"],
    1, "'आस्तीन का सांप' का अर्थ निकट रहकर छल या विश्वासघात करने वाला व्यक्ति होता है।",
    "साथ रहकर विश्वासघात करने वाले कपटी मित्र को 'आस्तीन का सांप' कहा जाता है।",
    "Easy", ["मुहावरे", "हिन्दी"]))

questions.append(q(29, 2, t2, th2, "सामान्य हिन्दी - वर्तनी शुद्धि",
    "निम्नलिखित में से किस शब्द की वर्तनी पूर्णतः शुद्ध है?",
    "निम्नलिखित में से किस शब्द की वर्तनी पूर्णतः शुद्ध है?",
    ["कवयित्री", "कविइत्री", "कवयत्री", "कविअयित्री"],
    ["कवयित्री", "कविइत्री", "कवयत्री", "कविअयित्री"],
    0, "'कवि' का स्त्रीलिंग रूप 'कवयित्री' शुद्ध वर्तनी है।",
    "हिन्दी वर्तनी के नियमों के अनुसार 'कवयित्री' शुद्ध रूप है।",
    "Easy", ["वर्तनी शुद्धि", "हिन्दी"]))

questions.append(q(30, 2, t2, th2, "सामान्य हिन्दी - प्रशासनिक शब्दावली",
    "सरकारी कार्यालयों में प्रयुक्त होने वाले अंग्रेजी शब्द 'SANCTION' का मानक हिन्दी पारिभाषिक शब्द क्या है?",
    "सरकारी कार्यालयों में प्रयुक्त होने वाले अंग्रेजी शब्द 'SANCTION' का मानक हिन्दी पारिभाषिक शब्द क्या है?",
    ["स्वीकृति / संस्वीकृति", "निलंबन", "अधिग्रहण", "आदेशिका"],
    ["स्वीकृति / संस्वीकृति", "निलंबन", "अधिग्रहण", "आदेशिका"],
    0, "प्रशासनिक शब्दावली आयोग के अनुसार 'Sanction' का मानक अर्थ 'स्वीकृति' या 'संस्वीकृति' होता है।",
    "कार्यालयी शब्दावली में 'Sanction' का अर्थ आधिकारिक संस्वीकृति (अनुमोदन) है।",
    "Easy", ["प्रशासनिक शब्दावली", "कार्यालयी हिन्दी"]))

print(f"Area 1 & 2 generated: {len(questions)} questions.")

# Let's write progress to temp file
with open("scripts/temp_upsc_1_2.json", "w", encoding="utf-8") as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)
