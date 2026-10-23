# -*- coding: utf-8 -*-
import json
import os

print("Building UP Inter College Principal Sections I and II (60 Questions)...")

def q(id_num, sec_id, unit_num, topic, topic_hi, subtopic, q_en, q_hi, opts_en, opts_hi, correct, exp_en, exp_hi, diff, tags):
    return {
        "id": f"up-ic-{id_num}",
        "examType": "up-aided-principal",
        "sectionId": sec_id,
        "unitId": f"up-unit-{unit_num}",
        "topic": topic,
        "topicHi": topic_hi,
        "subtopic": subtopic,
        "officialReference": f"UP Principal Syllabus Unit {unit_num}",
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
# SECTION I: 30 Questions (Units 1, 2, 3: 10 Qs each)
# ==========================================
s1 = "up-sec-1"

# Unit 1: Current affairs, national & international events, personalities & sports (1 to 10)
u1 = "Unit 1: Current affairs, national & international events, personalities & sports"
u1_hi = "इकाई 1: समसामयिक घटनाएं, राष्ट्रीय व अंतर्राष्ट्रीय परिदृश्य, प्रमुख व्यक्तित्व एवं खेलकूद"

questions.append(q(1, s1, 1, u1, u1_hi, "UP State Events",
    "In which city of Uttar Pradesh was the state's first international semiconductor wafer manufacturing fab approved in 2024?",
    "2024 में उत्तर प्रदेश के किस शहर में राज्य के पहले अंतरराष्ट्रीय सेमीकंडक्टर वेफर विनिर्माण प्लांट की स्थापना को स्वीकृति दी गई?",
    ["Varanasi", "Noida / Greater Noida (Yamuna Expressway)", "Lucknow", "Gorakhpur"],
    ["वाराणसी", "नोएडा / ग्रेटर नोएडा (यमुना एक्सप्रेसवे)", "लखनऊ", "गोरखपुर"],
    1, "Greater Noida on Yamuna Expressway was chosen for UP's mega semiconductor fab investment under the Semiconductor Mission.",
    "यमुना एक्सप्रेसवे (ग्रेटर नोएडा) में उत्तर प्रदेश का पहला अत्याधुनिक सेमीकंडक्टर विनिर्माण प्लांट स्थापित किया जा रहा है।",
    "Medium", ["UP Current Affairs", "Semiconductor", "Unit 1"]))

questions.append(q(2, s1, 1, u1, u1_hi, "National Events",
    "Under the theme 'Viksit Bharat @ 2047', what is India's national milestone target year for becoming a fully developed nation?",
    "'विकसित भारत @ 2047' राष्ट्रीय संकल्पना के अंतर्गत भारत को पूर्ण विकसित राष्ट्र बनाने का लक्ष्य वर्ष क्या है?",
    ["2030", "2035", "2047", "2050"],
    ["2030", "2035", "2047", "2050"],
    2, "Viksit Bharat @ 2047 aims for India to become a developed nation by 2047, the centenary year of Indian independence.",
    "स्वतंत्रता के 100 वर्ष पूर्ण होने पर वर्ष 2047 तक भारत को विकसित राष्ट्र बनाने का राष्ट्रीय विजन निर्धारित है।",
    "Easy", ["Viksit Bharat", "Current Affairs", "Unit 1"]))

questions.append(q(3, s1, 1, u1, u1_hi, "International Summits",
    "Which country hosted the COP28 UN Climate Conference where the UAE Consensus was forged to transition away from fossil fuels in energy systems?",
    "किस देश ने COP28 संयुक्त राष्ट्र जलवायु सम्मेलन की मेजबानी की जहाँ जीवाश्म ईंधन से ऊर्जा संक्रमण का ऐतिहासिक 'यूएई आम सहमति' समझौता हुआ?",
    ["United Arab Emirates (Dubai)", "Egypt (Sharm El-Sheikh)", "United Kingdom (Glasgow)", "France (Paris)"],
    ["संयुक्त अरब अमीरात (दुबई)", "मिस्र (शर्म अल-शेख)", "यूनाइटेड किंगडम (ग्लासगो)", "फ्रांस (पेरिस)"],
    0, "COP28 was hosted in Dubai, United Arab Emirates, in December 2023, concluding with the UAE Consensus.",
    "दिसंबर 2023 में COP28 का आयोजन दुबई (संयुक्त अरब अमीरात) में हुआ था।",
    "Easy", ["COP28", "Climate Summit", "Unit 1"]))

questions.append(q(4, s1, 1, u1, u1_hi, "Eminent Personalities & Awards",
    "Which revered former Prime Minister of India, celebrated as the architect of economic liberalization of 1991, was conferred the Bharat Ratna posthumously in 2024?",
    "1991 के आर्थिक उदारीकरण के प्रणेता किस पूर्व प्रधानमंत्री को वर्ष 2024 में मरणोपरांत भारत रत्न से सम्मानित किया गया?",
    ["P. V. Narasimha Rao", "Atal Bihari Vajpayee", "Morarji Desai", "Lal Bahadur Shastri"],
    ["पी. वी. नरसिम्हा राव", "अटल बिहारी वाजपेयी", "मोरारजी देसाई", "लाल बहादुर शास्त्री"],
    0, "Former PM P. V. Narasimha Rao was conferred the Bharat Ratna in 2024 along with Chaudhary Charan Singh, Karpoori Thakur, M. S. Swaminathan, and L. K. Advani.",
    "2024 में पूर्व प्रधानमंत्री पी. वी. नरसिम्हा राव को देश के सर्वोच्च नागरिक सम्मान 'भारत रत्न' से सम्मानित किया गया।",
    "Medium", ["Bharat Ratna 2024", "Personalities", "Unit 1"]))

questions.append(q(5, s1, 1, u1, u1_hi, "Sports & Asian Games",
    "How many total medals did the Indian contingent win at the 19th Asian Games held in Hangzhou, China in 2023, crossing the historic century mark for the first time?",
    "हांगझोउ (चीन) में आयोजित 19वें एशियाई खेल 2023 में भारतीय दल ने पहली बार ऐतिहासिक शतक पार करते हुए कुल कितने पदक जीते?",
    ["85 medals", "107 medals (28 Gold, 38 Silver, 41 Bronze)", "125 medals", "150 medals"],
    ["85 पदक", "107 पदक (28 स्वर्ण, 38 रजत, 41 कांस्य)", "125 पदक", "150 पदक"],
    1, "India won a record 107 medals (28 gold, 38 silver, 41 bronze) at the 2023 Asian Games in Hangzhou.",
    "हांगझोउ एशियाई खेल 2023 में भारत ने 28 स्वर्ण, 38 रजत और 41 कांस्य सहित कुल 107 पदक जीतकर इतिहास रचा।",
    "Easy", ["Asian Games", "Sports", "Unit 1"]))

questions.append(q(6, s1, 1, u1, u1_hi, "UP Personalities & Heritage",
    "Maharishi Valmiki International Airport, inaugurated in December 2023, is located in which spiritual and historical city of Uttar Pradesh?",
    "दिसंबर 2023 में उद्घाटित 'महर्षि वाल्मीकि अंतरराष्ट्रीय हवाई अड्डा' उत्तर प्रदेश के किस धार्मिक व ऐतिहासिक शहर में स्थित है?",
    ["Ayodhya", "Prayagraj", "Varanasi", "Mathura"],
    ["अयोध्या", "प्रयागराज", "वाराणसी", "मथुरा"],
    0, "Maharishi Valmiki International Airport Ayodhya Dham was inaugurated by the Prime Minister on 30 December 2023.",
    "महर्षि वाल्मीकि अंतरराष्ट्रीय हवाई अड्डा अयोध्या धाम में स्थापित किया गया है।",
    "Easy", ["Ayodhya", "UP Infrastructure", "Unit 1"]))

questions.append(q(7, s1, 1, u1, u1_hi, "Science & Space Exploration",
    "What is the name of the lunar landing site where Chandrayaan-3's Vikram lander touched down on the Moon?",
    "चंद्रमा पर उस स्थान को क्या नाम दिया गया है जहाँ चंद्रयान-3 के विक्रम लैंडर ने सफल लैंडिंग की थी?",
    ["Tiranga Point", "Shiv Shakti Point", "Jawahar Point", "Atal Point"],
    ["तिरंगा पॉइंट", "शिव शक्ति पॉइंट (Shiv Shakti Point)", "जवाहर पॉइंट", "अटल पॉइंट"],
    1, "The landing site of Chandrayaan-3 on the lunar south pole was officially named 'Shiv Shakti Point', and August 23 was declared National Space Day.",
    "चंद्रयान-3 के लैंडिंग स्थल को 'शिव शक्ति पॉइंट' नाम दिया गया तथा 23 अगस्त को राष्ट्रीय अंतरिक्ष दिवस घोषित किया गया।",
    "Easy", ["Chandrayaan-3", "Shiv Shakti Point", "Unit 1"]))

questions.append(q(8, s1, 1, u1, u1_hi, "Sports Personalities",
    "Who won the Major Dhyan Chand Khel Ratna Award 2023 for their sensational historic world number 1 doubles ranking in Badminton?",
    "बैडमिंटन में विश्व की नंबर-1 जोड़ी बनने वाले किन खिलाड़ियों को वर्ष 2023 के मेजर ध्यानचंद खेल रत्न पुरस्कार से सम्मानित किया गया?",
    ["Chirag Shetty and Satwiksairaj Rankireddy", "Kidambi Srikanth and Lakshya Sen", "P. V. Sindhu and Saina Nehwal", "Pullela Gopichand and Prakash Padukone"],
    ["चिराग शेट्टी और सात्विकसाईराज रंकीरेड्डी", "किदांबी श्रीकांत और लक्ष्य सेन", "पी. वी. सिंधु और साइना नेहवाल", "पुलेला गोपीचंद और प्रकाश पादुकोण"],
    0, "Satwiksairaj Rankireddy and Chirag Shetty received the Khel Ratna Award 2023 for their gold medals at Asian Games and Asian Championships.",
    "सात्विकसाईराज रंकीरेड्डी और चिराग शेट्टी की युगल जोड़ी को 2023 का सर्वोच्च खेल सम्मान 'खेल रत्न' प्रदान किया गया।",
    "Easy", ["Khel Ratna", "Badminton", "Unit 1"]))

questions.append(q(9, s1, 1, u1, u1_hi, "National Initiatives & Days",
    "In India, National National Education Day (राष्ट्रीय शिक्षा दिवस) is celebrated every year on November 11 to commemorate the birth anniversary of:",
    "भारत में प्रत्येक वर्ष 11 नवंबर को 'राष्ट्रीय शिक्षा दिवस' किसकी जयंती के उपलक्ष्य में मनाया जाता है?",
    ["Dr. S. Radhakrishnan", "Maulana Abul Kalam Azad", "Dr. A. P. J. Abdul Kalam", "Swami Vivekananda"],
    ["डॉ. सर्वपल्ली राधाकृष्णन", "मौलाना अबुल कलाम आजाद", "डॉ. ए. पी. जे. अब्दुल कलाम", "स्वामी विवेकानंद"],
    1, "National Education Day is celebrated on November 11 to honour Maulana Abul Kalam Azad, independent India's first Minister of Education.",
    "स्वतंत्र भारत के प्रथम शिक्षा मंत्री मौलाना अबुल कलाम आजाद के जन्मदिवस को 11 नवंबर को 'राष्ट्रीय शिक्षा दिवस' के रूप में मनाया जाता है।",
    "Easy", ["National Education Day", "Maulana Azad", "Unit 1"]))

questions.append(q(10, s1, 1, u1, u1_hi, "UP State Environment & Sanctuaries",
    "Which bird sanctuary in Uttar Pradesh was designated as a Ramsar Site of international wetland importance, located in Mainpuri district?",
    "उत्तर प्रदेश के मैनपुरी जिले में स्थित किस पक्षी अभयारण्य को अंतरराष्ट्रीय महत्व का रामसर आर्द्रभूमि स्थल घोषित किया गया है?",
    ["Sarsai Nawar Wetland", "Saman Bird Sanctuary", "Sur Sarovar", "Bakhira Wildlife Sanctuary"],
    ["सरसई नावर आर्द्रभूमि", "समन पक्षी अभयारण्य (Saman Bird Sanctuary)", "सूर सरोवर", "बखीरा वन्यजीव अभयारण्य"],
    1, "Saman Bird Sanctuary in Mainpuri district, UP, is an officially designated Ramsar wetland sanctuary supporting rich migratory waterfowl populations.",
    "मैनपुरी जिले का समन पक्षी अभयारण्य अंतरराष्ट्रीय महत्व की रामसर साइट है।",
    "Medium", ["Ramsar Site", "UP Wetlands", "Unit 1"]))

# Unit 2: Indian history, freedom movement, Constitution, polity, economy, geography & population (11 to 20)
u2 = "Unit 2: Indian history, freedom movement, Constitution, polity, economy, geography & population"
u2_hi = "इकाई 2: भारतीय इतिहास, स्वतंत्रता आंदोलन, भारतीय संविधान, राजव्यवस्था, अर्थव्यवस्था, भूगोल व जनसंख्या"

questions.append(q(11, s1, 2, u2, u2_hi, "Indian Freedom Movement 1857",
    "From which historic garrison town of Uttar Pradesh did the Great Revolt of 1857 break out on 10 May 1857?",
    "10 मई 1857 को 1857 का प्रथम स्वतंत्रता संग्राम उत्तर प्रदेश की किस ऐतिहासिक छावनी से प्रारंभ हुआ था?",
    ["Jhansi", "Meerut", "Kanpur", "Bareilly"],
    ["झांसी", "मेरठ", "कानपुर", "बरेली"],
    1, "The Revolt of 1857 began at Meerut on May 10, 1857, when Indian sepoys mutinied against British officers and marched towards Delhi.",
    "1857 का स्वाधीनता संग्राम 10 मई 1857 को मेरठ छावनी से सैनिकों द्वारा विद्रोह के साथ शुरू हुआ।",
    "Easy", ["1857 Revolt", "Meerut", "Indian History", "Unit 2"]))

questions.append(q(12, s1, 2, u2, u2_hi, "Freedom Movement Milestones",
    "In which Indian National Congress session of 1929 was the historic resolution for 'Purna Swaraj' (Complete Independence) passed under the presidency of Jawaharlal Nehru?",
    "1929 के किस भारतीय राष्ट्रीय कांग्रेस अधिवेशन में जवाहरलाल नेहरू की अध्यक्षता में ऐतिहासिक 'पूर्ण स्वराज' का प्रस्ताव पारित किया गया था?",
    ["Calcutta Session", "Lahore Session", "Karachi Session", "Lucknow Session"],
    ["कलकत्ता अधिवेशन", "लाहौर अधिवेशन", "कराची अधिवेशन", "लखनऊ अधिवेशन"],
    1, "The Lahore Session of the INC in December 1929 adopted the Purna Swaraj declaration, resolving to celebrate January 26, 1930 as Independence Day.",
    "दिसंबर 1929 के लाहौर अधिवेशन में रावी नदी के तट पर पूर्ण स्वराज का ऐतिहासिक संकल्प लिया गया।",
    "Easy", ["Purna Swaraj", "Lahore Session 1929", "Freedom Movement", "Unit 2"]))

questions.append(q(13, s1, 2, u2, u2_hi, "Indian Constitution - Preamble",
    "By which Constitutional Amendment Act were the words 'SOCIALIST', 'SECULAR', and 'INTEGRITY' inserted into the Preamble of the Constitution of India?",
    "किस संविधान संशोधन अधिनियम द्वारा भारतीय संविधान की प्रस्तावना में 'समाजवादी', 'पंथनिरपेक्ष' और 'अखंडता' शब्द जोड़े गए थे?",
    ["24th Amendment Act", "42nd Amendment Act 1976", "44th Amendment Act 1978", "52nd Amendment Act"],
    ["24वां संशोधन अधिनियम", "42वां संशोधन अधिनियम 1976", "44वां संशोधन अधिनियम 1978", "52वां संशोधन अधिनियम"],
    1, "The 42nd Constitutional Amendment Act of 1976 amended the Preamble to add 'Socialist', 'Secular', and 'Integrity'.",
    "42वें संविधान संशोधन 1976 द्वारा प्रस्तावना में समाजवादी, पंथनिरपेक्ष और अखंडता शब्द शामिल किए गए।",
    "Easy", ["Preamble", "42nd Amendment", "Constitution", "Unit 2"]))

questions.append(q(14, s1, 2, u2, u2_hi, "Directive Principles of State Policy",
    "Under Article 45 of the Directive Principles of State Policy (as amended by the 86th Amendment), the State is directed to provide early childhood care and education for children until they complete what age?",
    "नीति-निदेशक तत्वों के अनुच्छेद 45 (86वें संशोधन के बाद) के तहत राज्य किस आयु तक के बालकों के लिए प्रारंभिक बाल्यावस्था देखरेख और शिक्षा (ECCE) प्रदान करने का प्रयास करेगा?",
    ["Three years", "Six years", "Eight years", "Twelve years"],
    ["तीन वर्ष", "छह वर्ष", "आठ वर्ष", "बारह वर्ष"],
    1, "The amended Article 45 directs the State to endeavor to provide early childhood care and education for all children until they complete the age of six years.",
    "संशोधित अनुच्छेद 45 के अनुसार राज्य 6 वर्ष की आयु पूरी करने तक सभी बालकों के लिए प्रारंभिक बाल्यावस्था देखरेख और शिक्षा (ECCE) की व्यवस्था करेगा।",
    "Medium", ["Article 45", "DPSP", "ECCE", "Unit 2"]))

questions.append(q(15, s1, 2, u2, u2_hi, "UP Geography & Agro-Climatic Zones",
    "How many agro-climatic zones (कृषि जलवायु क्षेत्र) are formally classified in the state of Uttar Pradesh based on soil, rainfall, and climate characteristics?",
    "मृदा, वर्षा और जलवायु विशेषताओं के आधार पर उत्तर प्रदेश को कितने कृषि जलवायु क्षेत्रों में वर्गीकृत किया गया है?",
    ["5 zones", "7 zones", "9 zones", "12 zones"],
    ["5 क्षेत्र", "7 क्षेत्र", "9 क्षेत्र", "12 क्षेत्र"],
    2, "Uttar Pradesh is divided into 9 distinct Agro-Climatic Zones (e.g. Bhabhar & Tarai, Western Plain, Bundelkhand, Vindhyan, etc.).",
    "उत्तर प्रदेश को 9 प्रमुख कृषि जलवायु क्षेत्रों (Agro-Climatic Zones) में बांटा गया है।",
    "Medium", ["UP Geography", "Agro-Climatic Zones", "Unit 2"]))

questions.append(q(16, s1, 2, u2, u2_hi, "Indian Geography - Physical Divisions",
    "Which is the highest mountain peak situated entirely within the political territory of India?",
    "भारत के राजनीतिक भूभाग में स्थित भारत की सर्वोच्च पर्वत चोटी कौन सी है?",
    ["K2 (Godwin-Austen)", "Kangchenjunga", "Nanda Devi", "Kamet"],
    ["K2 (गॉडविन ऑस्टिन)", "कंचनजंगा (Kangchenjunga)", "नंदा देवी", "कामेत"],
    1, "Kangchenjunga (8,586 m), located on the Sikkim-Nepal border in India, is the highest mountain peak in India (since K2 lies in PoK).",
    "कंचनजंगा (8,586 मीटर) सिक्किम में स्थित भारत की सर्वोच्च पर्वत चोटी है।",
    "Easy", ["Kangchenjunga", "Physical Geography", "Unit 2"]))

questions.append(q(17, s1, 2, u2, u2_hi, "Census & Population - UP Demographics",
    "According to Census 2011, what is the approximate percentage of Uttar Pradesh's population to India's total national population?",
    "जनगणना 2011 के अनुसार उत्तर प्रदेश की जनसंख्या भारत की कुल राष्ट्रीय जनसंख्या का लगभग कितने प्रतिशत है?",
    ["12.5%", "16.5% (approx 16.51%)", "19.8%", "22.2%"],
    ["12.5%", "16.5% (लगभग 16.51%)", "19.8%", "22.2%"],
    1, "With a population of 19.98 crore in Census 2011, Uttar Pradesh accounted for approximately 16.51% of India's total population.",
    "2011 की जनगणना में 19.98 करोड़ आबादी के साथ उत्तर प्रदेश देश की कुल जनसंख्या का 16.51% था।",
    "Medium", ["Census 2011", "UP Population", "Demographics", "Unit 2"]))

questions.append(q(18, s1, 2, u2, u2_hi, "Indian Polity - Constitutional Bodies",
    "Under Article 324 of the Constitution of India, which autonomous constitutional authority is vested with superintendence, direction, and control of elections to Parliament and State Legislatures?",
    "भारतीय संविधान के अनुच्छेद 324 के अंतर्गत संसद और राज्य विधानमंडलों के चुनावों के अधीक्षण, निर्देशन और नियंत्रण की शक्ति किस स्वतंत्र संवैधानिक प्राधिकारी में निहित है?",
    ["Union Public Service Commission", "Election Commission of India (ECI)", "Supreme Court Collegium", "Law Commission of India"],
    ["संघ लोक सेवा आयोग", "भारत निर्वाचन आयोग (ECI)", "उच्चतम न्यायालय कॉलेजियम", "भारत का विधि आयोग"],
    1, "Article 324 establishes the Election Commission of India with superintendence, direction, and control of elections.",
    "अनुच्छेद 324 भारत निर्वाचन आयोग (ECI) की स्थापना करता है जो लोकसभा, राज्यसभा व विधानसभा चुनावों का संचालन करता है।",
    "Easy", ["Election Commission", "Article 324", "Polity", "Unit 2"]))

questions.append(q(19, s1, 2, u2, u2_hi, "Indian Economy - Planning & NITI Aayog",
    "In which year was the First Five-Year Plan of India launched with primary emphasis on agriculture, irrigation, and power projects?",
    "कृषि, सिंचाई और ऊर्जा परियोजनाओं पर मुख्य बल देने वाली भारत की प्रथम पंचवर्षीय योजना किस वर्ष प्रारंभ की गई थी?",
    ["1947", "1950", "1951", "1956"],
    ["1947", "1950", "1951", "1956"],
    2, "India's First Five-Year Plan was launched for 1951-1956, based on the Harrod-Domar growth model focusing on agriculture and irrigation.",
    "प्रथम पंचवर्षीय योजना (1951-1956) हैरोड-डोमर मॉडल पर आधारित थी जिसने कृषि व सिंचाई को सर्वोच्च प्राथमिकता दी।",
    "Easy", ["First Five Year Plan", "Planning", "Economy", "Unit 2"]))

questions.append(q(20, s1, 2, u2, u2_hi, "Ancient & Medieval UP History",
    "Sarnath, where Lord Buddha preached his first sermon (Dharmachakra Pravartana), is situated near which city of Uttar Pradesh?",
    "भगवान बुद्ध ने जहाँ अपना प्रथम उपदेश (धर्मचक्रप्रवर्तन) दिया था, वह 'सारनाथ' उत्तर प्रदेश के किस नगर के निकट स्थित है?",
    ["Varanasi", "Kushinagar", "Shravasti", "Ayodhya"],
    ["वाराणसी", "कुशीनगर", "श्रावस्ती", "अयोध्या"],
    0, "Sarnath is located 10 km north-east of Varanasi near the confluence of the Ganges and the Varuna rivers in Uttar Pradesh.",
    "सारनाथ वाराणसी से 10 किमी की दूरी पर स्थित है जहाँ भगवान बुद्ध ने धम्मचक्र प्रवर्तन का पहला उपदेश दिया था।",
    "Easy", ["Sarnath", "Buddhism", "UP History", "Unit 2"]))

# Unit 3: General science, environment, human health, computer & internet technology, ICT applications, educational technology (21 to 30)
u3 = "Unit 3: General science, environment, human health, computer, internet & educational technology"
u3_hi = "इकाई 3: सामान्य विज्ञान, पर्यावरण, मानव स्वास्थ्य, कंप्यूटर व इंटरनेट प्रौद्योगिकी एवं शैक्षिक तकनीकी"

questions.append(q(21, s1, 3, u3, u3_hi, "General Science - Physics & Everyday Phenomena",
    "Why does clear sky appear blue during daytime?",
    "दिन के समय स्वच्छ आकाश का रंग नीला क्यों दिखाई देता है?",
    ["Refraction of light in clouds", "Rayleigh scattering of shorter wavelength blue light by microscopic atmospheric air molecules", "Absorption of red light by ocean water", "Total internal reflection in air"],
    ["बादलों में प्रकाश का अपवर्तन", "वायुमंडल के सूक्ष्म कणों द्वारा कम तरंगदैर्ध्य वाले नीले प्रकाश का रैले प्रकीर्णन (Rayleigh Scattering)", "समुद्र द्वारा लाल रंग का अवशोषण", "वायु में पूर्ण आंतरिक परावर्तन"],
    1, "Rayleigh scattering explains that light with shorter wavelengths (blue and violet) is scattered much more by nitrogen and oxygen molecules than longer red wavelengths.",
    "रैले के प्रकीर्णन नियम के अनुसार कम तरंगदैर्ध्य वाले नीले प्रकाश का प्रकीर्णन सबसे अधिक होता है जिससे आकाश नीला दिखता है।",
    "Easy", ["Rayleigh Scattering", "Physics", "Science", "Unit 3"]))

questions.append(q(22, s1, 3, u3, u3_hi, "Human Health & Nutrition",
    "Deficiency of which water-soluble vitamin causes Scurvy, characterized by bleeding gums and delayed wound healing?",
    "किस जल-घुलनशील विटामिन की कमी से स्कर्वी (Scurvy) रोग होता है, जिसके लक्षणों में मसूड़ों से खून आना और घाव देर से भरना शामिल है?",
    ["Vitamin A", "Vitamin B1 (Thiamine)", "Vitamin C (Ascorbic Acid)", "Vitamin D"],
    ["विटामिन A", "विटामिन B1", "विटामिन C (एस्कॉर्बिक एसिड)", "विटामिन D"],
    2, "Scurvy is caused by Vitamin C (ascorbic acid) deficiency, impairing collagen synthesis and capillary fragility.",
    "विटामिन C (एस्कॉर्बिक एसिड) की कमी से स्कर्वी रोग होता है। खट्टे फल इसके प्रमुख स्रोत हैं।",
    "Easy", ["Vitamin C", "Scurvy", "Nutrition", "Unit 3"]))

questions.append(q(23, s1, 3, u3, u3_hi, "Ecology & Food Webs",
    "In a terrestrial ecosystem, what is the '10% Law' of energy transfer formulated by Raymond Lindeman in 1942?",
    "पारिस्थितिक तंत्र में 1942 में रेमंड लिंडेमैन द्वारा प्रतिपादित ऊर्जा स्थानांतरण का '10 प्रतिशत नियम' क्या कहता है?",
    ["Only 10% of total rainfall penetrates the soil", "Only about 10% of the energy stored as biomass in one trophic level is transferred to the next higher trophic level", "10% of animals become extinct every decade", "Forests cover 10% of land"],
    ["केवल 10% वर्षा जल भूमि में जाता है", "एक पोषण स्तर (Trophic Level) से अगले उच्च पोषण स्तर तक केवल लगभग 10% ऊर्जा ही स्थानांतरित होती है", "प्रत्येक दशक में 10% जीव विलुप्त होते हैं", "वन 10% भूमि घेरते हैं"],
    1, "Lindeman's 10% law states that during transfer of energy from organic food from one trophic level to the next, only about 10% of energy is turned into flesh.",
    "लिंडेमैन के नियम के अनुसार प्रत्येक पोषण स्तर पर केवल 10% ऊर्जा ही अगले स्तर को प्राप्त होती है, शेष 90% जैविक क्रियाओं में नष्ट हो जाती है।",
    "Medium", ["10% Law", "Lindeman", "Ecology", "Unit 3"]))

questions.append(q(24, s1, 3, u3, u3_hi, "General Science - Chemistry in Daily Life",
    "What is the chemical name and formula of common baking soda used in kitchens and laboratory fire safety demonstrations?",
    "रसोईघर एवं प्रयोगशाला अग्नि सुरक्षा प्रदर्शनों में प्रयुक्त होने वाले बेकिंग सोडा (मीठा सोडा) का रासायनिक नाम क्या है?",
    ["Sodium Carbonate (Na2CO3)", "Sodium Hydrogen Carbonate / Bicarbonate (NaHCO3)", "Sodium Hydroxide (NaOH)", "Calcium Oxychloride (CaOCl2)"],
    ["सोडियम कार्बोनेट", "सोडियम हाइड्रोजन कार्बोनेट / बाईकार्बोनेट (NaHCO3)", "सोडियम हाइड्रॉक्साइड", "कैल्शियम ऑक्सीक्लोराइड"],
    1, "Baking soda is Sodium Bicarbonate (NaHCO3), which releases carbon dioxide gas upon heating or reaction with mild acid.",
    "बेकिंग सोडा का रासायनिक नाम सोडियम बाईकार्बोनेट (NaHCO3) है।",
    "Easy", ["Baking Soda", "Chemistry", "Unit 3"]))

questions.append(q(25, s1, 3, u3, u3_hi, "Environmental Pollution & Greenhouse Gases",
    "Which greenhouse gas produced from flooded rice paddy fields and ruminant livestock digestion has a global warming potential 28 times greater than carbon dioxide over 100 years?",
    "धान के जलमग्न खेतों और मवेशियों की जुगाली से उत्पन्न होने वाली कौन सी ग्रीनहाउस गैस 100 वर्षों के पैमाने पर कार्बन डाइऑक्साइड से 28 गुना अधिक ग्लोबल वार्मिंग क्षमता रखती है?",
    ["Methane (CH4)", "Nitrous Oxide (N2O)", "Sulfur Dioxide (SO2)", "Chlorofluorocarbon (CFC)"],
    ["मीथेन (CH4)", "नाइट्रस ऑक्साइड", "सल्फर डाइऑक्साइड", "सीएफसी"],
    0, "Methane (CH4) is a potent short-lived climate pollutant emitted significantly from agricultural rice paddies and enteric fermentation.",
    "धान के खेतों और पशुधन से उत्सर्जित होने वाली मुख्य ग्रीनहाउस गैस मीथेन (CH4) है।",
    "Medium", ["Methane", "Greenhouse Gases", "Environment", "Unit 3"]))

questions.append(q(26, s1, 3, u3, u3_hi, "Computer & Internet Technology",
    "In computer networking, what does the protocol 'HTTP' and its secure encrypted counterpart 'HTTPS' stand for?",
    "कंप्यूटर नेटवर्किंग में वेब संचार प्रोटोकॉल 'HTTP' और उसके सुरक्षित एन्क्रिप्टेड प्रारूप 'HTTPS' का पूर्ण रूप क्या है?",
    ["HyperText Transfer Protocol and HyperText Transfer Protocol Secure", "High Transmission Text Protocol and System", "Hyperlink Telecommunication Transfer Program", "Hosted Technical Terminal Protocol"],
    ["HyperText Transfer Protocol एवं HyperText Transfer Protocol Secure", "High Transmission Text Protocol and System", "Hyperlink Telecommunication Transfer Program", "Hosted Technical Terminal Protocol"],
    0, "HTTP stands for HyperText Transfer Protocol. HTTPS adds SSL/TLS cryptographic encryption over port 443 for secure transactions.",
    "HTTP का पूर्ण रूप 'हाइपरटेक्स्ट ट्रांसफर प्रोटोकॉल' है तथा HTTPS इसमें सुरक्षा की दृष्टि से एसएसएल एन्क्रिप्शन जोड़ता है।",
    "Easy", ["HTTP", "HTTPS", "Internet Protocols", "Unit 3"]))

questions.append(q(27, s1, 3, u3, u3_hi, "ICT Applications in Educational Technology",
    "What is a 'Learning Management System' (LMS) such as Moodle or Google Classroom widely used in modern hybrid school education?",
    "आधुनिक हाइब्रिड विद्यालयी शिक्षा में प्रयुक्त होने वाले 'लर्निंग मैनेजमेंट सिस्टम' (LMS - जैसे मूक या गूगल क्लासरूम) का क्या कार्य है?",
    ["A hardware electricity transformer", "A web-based software application for administration, documentation, tracking, reporting, automation, and delivery of educational courses and digital learning materials", "A digital sound speaker in stadiums", "A biometric staff clock"],
    ["बिजली का ट्रांसफार्मर", "डिजिटल पाठ्यक्रमों, पाठ्य सामग्री, असाइनमेंट वितरण, मूल्यांकन और प्रगति रिपोर्टिंग का प्रबंधन करने वाला वेब-आधारित सॉफ्टवेयर अनुप्रयोग", "लाउडस्पीकर", "स्टाफ क्लॉक"],
    1, "An LMS facilitates the creation, distribution, management, and tracking of learning resources, tests, and student submissions.",
    "लर्निंग मैनेजमेंट सिस्टम (LMS) ऑनलाइन कक्षाओं, शिक्षण सामग्री के वितरण और छात्र मूल्यांकन को व्यवस्थित करने वाला सॉफ्टवेयर प्लेटफॉर्म है।",
    "Easy", ["LMS", "Educational Technology", "Unit 3"]))

questions.append(q(28, s1, 3, u3, u3_hi, "Human Health & Communicable Diseases",
    "Tuberculosis (TB) is an infectious bacterial disease primarily affecting the human lungs, caused by which causative organism?",
    "तपेदिक / क्षयरोग (TB) मुख्य रूप से फेफड़ों को प्रभावित करने वाला संक्रामक रोग है, जो किस जीवाणु के संक्रमण से होता है?",
    ["Mycobacterium tuberculosis", "Vibrio cholerae", "Salmonella typhi", "Plasmodium vivax"],
    ["माइकोबैक्टीरियम ट्यूबरकुलोसिस (Mycobacterium tuberculosis)", "विब्रियो कोलेरी", "साल्मोनेला टाइफी", "प्लाज्मोडियम विवैक्स"],
    0, "TB is caused by the bacterium Mycobacterium tuberculosis, transmitted through airborne respiratory droplets.",
    "टीबी (क्षयरोग) माइकोबैक्टीरियम ट्यूबरकुलोसिस नामक जीवाणु के कारण होता है।",
    "Easy", ["Tuberculosis", "Communicable Diseases", "Health", "Unit 3"]))

questions.append(q(29, s1, 3, u3, u3_hi, "Cyber Security & Malware",
    "What type of malicious software (malware) encrypts the school's administrative files and demands monetary extortion for the decryption key?",
    "किस प्रकार का दुर्भावनापूर्ण सॉफ्टवेयर (Malware) विद्यालय की प्रशासनिक फाइलों को एन्क्रिप्ट (लॉक) कर देता है और उन्हें खोलने हेतु फिरौती की मांग करता है?",
    ["Spyware", "Ransomware (रैंसमवेयर)", "Adware", "Cookie"],
    ["स्पाइवेयर", "रैंसमवेयर (Ransomware)", "एडवेयर", "कुकी"],
    1, "Ransomware locks or encrypts the victim's data and demands ransom payment (typically in cryptocurrency) to restore access.",
    "रैंसमवेयर एक ऐसा दुर्भावनापूर्ण प्रोग्राम है जो फाइलों को बंधक बनाकर फिरौती (Ransom) वसूलने का प्रयास करता है।",
    "Easy", ["Ransomware", "Cyber Security", "Unit 3"]))

questions.append(q(30, s1, 3, u3, u3_hi, "Educational Technology & Smart Classrooms",
    "In smart classrooms, what does an 'Interactive Flat Panel' (IFP) replace in traditional pedagogical infrastructure?",
    "स्मार्ट कक्षाओं में 'इंटरएक्टिव फ्लैट पैनल' (IFP) पारंपरिक शिक्षण अवसंरचना में किसका स्थान लेता है?",
    ["The student benches and desks", "Traditional blackboards/whiteboards by integrating touch-enabled digital display, multimedia whiteboard software, and internet connectivity", "School water taps", "Playground goalposts"],
    ["छात्रों की बेंच और मेज", "पारंपरिक ब्लैकबोर्ड/व्हाइटबोर्ड का स्थान लेकर टच-सक्षम डिजिटल डिस्प्ले, मल्टीमीडिया और इंटरनेट आधारित इंटरएक्टिव स्क्रीन उपलब्ध कराना", "पानी के नल", "खेल के मैदान के खंभे"],
    1, "Interactive Flat Panels (IFPs) provide high-resolution interactive touch displays running digital whiteboards, annotating tools, and internet learning assets.",
    "आईएफपी (IFP) टच स्क्रीन वाली डिजिटल स्मार्ट स्क्रीन है जो ब्लैकबोर्ड का स्थान लेकर मल्टीमीडिया और डिजिटल अध्यापन संभव बनाती है।",
    "Easy", ["Smart Classrooms", "IFP", "EdTech", "Unit 3"]))

print(f"Section I generated: {len(questions)} questions.")

# ==========================================
# SECTION II: 30 Questions (Units 4 & 5: 15 Qs each)
# Language Competence: Unit 4 General Hindi (31 to 45) & Unit 5 General English (46 to 60)
# ==========================================
s2 = "up-sec-2"

# Unit 4: General Hindi (सामान्य हिन्दी) (31 to 45)
u4 = "Unit 4: General Hindi (सामान्य हिन्दी)"
u4_hi = "इकाई 4: सामान्य हिन्दी (व्याकरण, वाक्य रचना, उपसर्ग, प्रत्यय, विलोम, पर्यायवाची, मुहावरे, लोकोक्तियाँ व पत्र लेखन)"

questions.append(q(31, s2, 4, u4, u4_hi, "हिन्दी व्याकरण - वर्णमाला",
    "हिन्दी वर्णमाला में 'क्ष, त्र, ज्ञ, श्र' किस प्रकार के वर्ण माने जाते हैं?",
    "हिन्दी वर्णमाला में 'क्ष, त्र, ज्ञ, श्र' किस प्रकार के वर्ण माने जाते हैं?",
    ["मूल स्वर", "संयुक्त व्यंजन", "अंतःस्थ व्यंजन", "ऊष्म व्यंजन"],
    ["मूल स्वर", "संयुक्त व्यंजन", "अंतःस्थ व्यंजन", "ऊष्म व्यंजन"],
    1, "क्ष (क्+ष्), त्र (त्+र्), ज्ञ (ज्+ञ) और श्र (श्+र्) दो व्यंजनों के मेल से बनने के कारण 'संयुक्त व्यंजन' कहलाते हैं।",
    "दो व्यंजनों के परस्पर मेल से बनने वाले व्यंजनों को संयुक्त व्यंजन कहा जाता है।",
    "Easy", ["वर्णमाला", "संयुक्त व्यंजन", "हिन्दी व्याकरण", "Unit 4"]))

questions.append(q(32, s2, 4, u4, u4_hi, "हिन्दी व्याकरण - संधि",
    "'इत्यादि' शब्द का शुद्ध संधि-विच्छेद क्या होगा तथा इसमें कौन सी संधि है?",
    "'इत्यादि' शब्द का शुद्ध संधि-विच्छेद क्या होगा तथा इसमें कौन सी संधि है?",
    ["इति + आदि (यण स्वर संधि)", "इत्य + आदि (दीर्घ संधि)", "इती + आदि (गुण संधि)", "इत + यदि (व्यंजन संधि)"],
    ["इति + आदि (यण स्वर संधि)", "इत्य + आदि (दीर्घ संधि)", "इती + आदि (गुण संधि)", "इत + यदि (व्यंजन संधि)"],
    0, "इति + आदि = इत्यादि। यहाँ 'इ' का 'य्' में परिवर्तन होता है, जो यण स्वर संधि का मानक नियम है।",
    "इ/ई के बाद कोई असमान स्वर आने पर 'इ' का 'य्' हो जाता है, जो यण संधि है।",
    "Easy", ["यण संधि", "संधि विच्छेद", "Unit 4"]))

questions.append(q(33, s2, 4, u4, u4_hi, "हिन्दी व्याकरण - समास",
    "'नीलकंठ' में कौन सा समास है यदि इसका विग्रह 'नीला है कंठ जिसका अर्थात् भगवान शिव' किया जाए?",
    "'नीलकंठ' में कौन सा समास है यदि इसका विग्रह 'नीला है कंठ जिसका अर्थात् भगवान शिव' किया जाए?",
    ["द्वंद्व समास", "बहुव्रीहि समास", "द्विगु समास", "तत्पुरुष समास"],
    ["द्वंद्व समास", "बहुव्रीहि समास", "द्विगु समास", "तत्पुरुष समास"],
    1, "जहाँ दोनों पद मिलकर किसी तीसरे अन्य पद (भगवान शिव) की ओर संकेत करते हैं, वहाँ बहुव्रीहि समास होता है।",
    "अन्य पद प्रधान होने पर बहुव्रीहि समास होता है।",
    "Easy", ["बहुव्रीहि समास", "समास", "Unit 4"]))

questions.append(q(34, s2, 4, u4, u4_hi, "हिन्दी व्याकरण - उपसर्ग",
    "'अनुरागी' और 'अनुशासन' शब्दों में किस उपसर्ग का प्रयोग हुआ है?",
    "'अनुरागी' और 'अनुशासन' शब्दों में किस उपसर्ग का प्रयोग हुआ है?",
    ["अ", "अन", "अनु", "अप"],
    ["अ", "अन", "अनु", "अप"],
    2, "दोनों शब्दों में 'अनु' (पीछे या समान) संस्कृत उपसर्ग का प्रयोग हुआ है। अनु + राग + ई = अनुरागी, अनु + शासन = अनुशासन।",
    "'अनु' उपसर्ग का अर्थ पीछे या अनुसार होता है।",
    "Easy", ["उपसर्ग", "हिन्दी", "Unit 4"]))

questions.append(q(35, s2, 4, u4, u4_hi, "हिन्दी व्याकरण - प्रत्यय",
    "'लिखावट' और 'सजावट' शब्दों में किस प्रकार का प्रत्यय प्रयुक्त हुआ है?",
    "'लिखावट' और 'सजावट' शब्दों में किस प्रकार का प्रत्यय प्रयुक्त हुआ है?",
    ["तद्धित प्रत्यय", "कृत् / कृदंत प्रत्यय (-आवट)", "स्त्री प्रत्यय", "उर्दू प्रत्यय"],
    ["तद्धित प्रत्यय", "कृत् / कृदंत प्रत्यय (-आवट)", "स्त्री प्रत्यय", "उर्दू प्रत्यय"],
    1, "लिखना और सजाना धातुओं (क्रिया) के अंत में '-आवट' प्रत्यय लगने से भाववाचक संज्ञा बनती है, अतः यह कृत् प्रत्यय है।",
    "क्रिया की धातु के साथ जुड़ने वाले प्रत्यय को कृत् प्रत्यय (कृदंत) कहते हैं।",
    "Medium", ["कृत् प्रत्यय", "प्रत्यय", "Unit 4"]))

questions.append(q(36, s2, 4, u4, u4_hi, "हिन्दी शब्द संपदा - विलोम शब्द",
    "'उत्कर्ष' शब्द का सटीक विलोम शब्द निम्नलिखित में से कौन सा है?",
    "'उत्कर्ष' शब्द का सटीक विलोम शब्द निम्नलिखित में से कौन सा है?",
    ["अपकर्ष", "निष्कर्ष", "आकर्ष", "पतनशील"],
    ["अपकर्ष", "निष्कर्ष", "आकर्ष", "पतनशील"],
    0, "'उत्कर्ष' (उन्नति/उत्थान) का सही विलोम 'अपकर्ष' (अवनति/गिरावट) होता है।",
    "उत्कर्ष का विपरीतार्थक शब्द अपकर्ष है।",
    "Easy", ["विलोम शब्द", "Unit 4"]))

questions.append(q(37, s2, 4, u4, u4_hi, "हिन्दी शब्द संपदा - पर्यायवाची शब्द",
    "निम्नलिखित में से कौन सा शब्द 'कमल' का पर्यायवाची शब्द नहीं है?",
    "निम्नलिखित में से कौन सा शब्द 'कमल' का पर्यायवाची शब्द नहीं है?",
    ["जलज", "पंकज", "सरोज", "जलद"],
    ["जलज", "पंकज", "सरोज", "जलद"],
    3, "'जलद' (जल देने वाला) बादल का पर्यायवाची है, जबकि जलज, पंकज और सरोज कमल के पर्यायवाची हैं।",
    "जलद बादल का पर्याय है, कमल का नहीं।",
    "Easy", ["पर्यायवाची शब्द", "Unit 4"]))

questions.append(q(38, s2, 4, u4, u4_hi, "तत्सम एवं तद्भव",
    "निम्नलिखित में से कौन सा शब्द 'तत्सम' (संस्कृत का मूल रूप) है?",
    "निम्नलिखित में से कौन सा शब्द 'तत्सम' (संस्कृत का मूल रूप) है?",
    ["अग्नि", "आग", "सूरज", "खेत"],
    ["अग्नि", "आग", "सूरज", "खेत"],
    0, "'अग्नि' तत्सम शब्द है, जिसका तद्भव 'आग' होता है। (सूर्य का सूरज, क्षेत्र का खेत)।",
    "अग्नि मूल संस्कृत शब्द (तत्सम) है।",
    "Easy", ["तत्सम तद्भव", "Unit 4"]))

questions.append(q(39, s2, 4, u4, u4_hi, "वाक्यांश के लिए एक शब्द",
    "'जो सब कुछ जानता हो' - इस वाक्यांश के लिए एक उपयुक्त शब्द क्या है?",
    "'जो सब कुछ जानता हो' - इस वाक्यांश के लिए एक उपयुक्त शब्द क्या है?",
    ["अल्पज्ञ", "सर्वज्ञ", "विद्वान", "बहुज्ञ"],
    ["अल्पज्ञ", "सर्वज्ञ", "विद्वान", "बहुज्ञ"],
    1, "जो सब कुछ जानता हो उसे 'सर्वज्ञ' कहते हैं। (कम जानने वाला = अल्पज्ञ, बहुत जानने वाला = बहुज्ञ)।",
    "सर्वज्ञ = सब कुछ जानने वाला।",
    "Easy", ["अनेक शब्दों के लिए एक शब्द", "Unit 4"]))

questions.append(q(40, s2, 4, u4, u4_hi, "मुहावरे",
    "मुहावरे 'अंगूठा दिखाना' का सटीक व्यवहारिक अर्थ क्या है?",
    "मुहावरे 'अंगूठा दिखाना' का सटीक व्यवहारिक अर्थ क्या है?",
    ["सहमति देना", "ऐन वक्त पर किसी कार्य हेतु साफ मना कर देना या इनकार करना", "अंगूठे का निशान लगाना", "स्वागत करना"],
    ["सहमति देना", "ऐन वक्त पर किसी कार्य हेतु साफ मना कर देना या इनकार करना", "अंगूठे का निशान लगाना", "स्वागत करना"],
    1, "'अंगूठा दिखाना' का अर्थ ऐन मौके पर किसी काम को करने से साफ इनकार कर देना होता है।",
    "वक्त पर सहायता से मना कर देना 'अंगूठा दिखाना' कहलाता है।",
    "Easy", ["मुहावरे", "Unit 4"]))

questions.append(q(41, s2, 4, u4, u4_hi, "लोकोक्तियाँ",
    "लोकोक्ति 'अधजल गगरी छलकत जाए' का क्या भावार्थ है?",
    "लोकोक्ति 'अधजल गगरी छलकत जाए' का क्या भावार्थ है?",
    ["पानी से भरी मटकी ढोना", "अल्प ज्ञान या कम योग्यता वाला व्यक्ति अधिक दिखावा और घमंड करता है", "मटके में पानी कम होना", "विद्वान व्यक्ति का शांत रहना"],
    ["पानी से भरी मटकी ढोना", "अल्प ज्ञान या कम योग्यता वाला व्यक्ति अधिक दिखावा और घमंड करता है", "मटके में पानी कम होना", "विद्वान व्यक्ति का शांत रहना"],
    1, "यह लोकोक्ति इंगित करती है कि जिस व्यक्ति के पास ज्ञान या धन कम होता है, वह उसका बहुत ज्यादा दिखावा करता है।",
    "अधूरे ज्ञान वाला व्यक्ति ही अधिक डींगें हांकता है।",
    "Easy", ["लोकोक्तियाँ", "Unit 4"]))

questions.append(q(42, s2, 4, u4, u4_hi, "संक्षेपण (Précis Writing)",
    "कार्यालयी संक्षेपण (Précis) तैयार करते समय मूल गद्यांश के कितने विस्तार तक संक्षेपण तैयार करना मानक माना जाता है?",
    "कार्यालयी संक्षेपण (Précis) तैयार करते समय मूल गद्यांश के कितने विस्तार तक संक्षेपण तैयार करना मानक माना जाता है?",
    ["मूल पाठ का आधा (1/2)", "मूल पाठ का लगभग एक-तिहाई (1/3)", "मूल पाठ का एक-चौथाई (1/4)", "मूल पाठ के बराबर"],
    ["मूल पाठ का आधा (1/2)", "मूल पाठ का लगभग एक-तिहाई (1/3)", "मूल पाठ का एक-चौथाई (1/4)", "मूल पाठ के बराबर"],
    1, "मानक संक्षेपण (Précis) मूल पाठ के लगभग एक-तिहाई (One-third) शब्दों में अपने शब्दों में सार रूप में लिखा जाता है।",
    "संक्षेपण मूल अवतरण का लगभग एक-तिहाई (1/3) भाग होता है।",
    "Medium", ["संक्षेपण", "कार्यालयी हिन्दी", "Unit 4"]))

questions.append(q(43, s2, 4, u4, u4_hi, "शासकीय पत्राचार",
    "एक विभाग से दूसरे विभाग को नीतिगत परामर्श, अभिमत अथवा सूचना आदान-प्रदान हेतु भेजे जाने वाले पत्र को सामान्यतः क्या कहा जाता है?",
    "एक विभाग से दूसरे विभाग को नीतिगत परामर्श, अभिमत अथवा सूचना आदान-प्रदान हेतु भेजे जाने वाले पत्र को सामान्यतः क्या कहा जाता है?",
    ["अशासकीय पत्र / अंतर्विभागीय टिप्पणी (U.O. Note / Office Memorandum)", "आज्ञा पत्र", "व्यक्तिगत पत्र", "विज्ञप्ति"],
    ["अशासकीय पत्र / अंतर्विभागीय टिप्पणी (U.O. Note / Office Memorandum)", "आज्ञा पत्र", "व्यक्तिगत पत्र", "विज्ञप्ति"],
    0, "दो मंत्रालयों या विभागों के बीच परामर्श हेतु कार्यालय ज्ञापन (Office Memorandum) या अशासकीय पत्र (U.O. Note) भेजा जाता है।",
    "विभागों के मध्य संवाद हेतु अंतर्विभागीय टिप्पणी या कार्यालय ज्ञापन प्रयुक्त होता है।",
    "Medium", ["शासकीय पत्राचार", "कार्यालयी हिन्दी", "Unit 4"]))

questions.append(q(44, s2, 4, u4, u4_hi, "वर्तनी शुद्धि",
    "निम्नलिखित में से शुद्ध वर्तनी वाले शब्द का चयन कीजिए:",
    "निम्नलिखित में से शुद्ध वर्तनी वाले शब्द का चयन कीजिए:",
    ["उज्जवल", "उज्ज्वल", "उज्वल", "उजज्वल"],
    ["उज्जवल", "उज्ज्वल", "उज्वल", "उजज्वल"],
    1, "'उज्ज्वल' में दो बार आधा 'ज' (उत् + ज्वल = उज्ज्वल) आता है, जो शुद्ध वर्तनी है।",
    "उज्ज्वल में दोनों 'ज' अर्ध वर्ण होते हैं।",
    "Easy", ["वर्तनी शुद्धि", "Unit 4"]))

questions.append(q(45, s2, 4, u4, u4_hi, "वाक्य शुद्धि",
    "निम्नलिखित में से व्याकरण की दृष्टि से शुद्ध वाक्य कौन सा है?",
    "निम्नलिखित में से व्याकरण की दृष्टि से शुद्ध वाक्य कौन सा है?",
    ["मेरे को घर जाना है।", "साहित्य और जीवन का घोर संबंध है।", "साहित्य और जीवन का अभिन्न / घनिष्ठ संबंध है।", "यहाँ शुद्ध गाय का दूध मिलता है।"],
    ["मेरे को घर जाना है।", "साहित्य और जीवन का घोर संबंध है।", "साहित्य और जीवन का अभिन्न / घनिष्ठ संबंध है।", "यहाँ शुद्ध गाय का दूध मिलता है।"],
    2, "'घोर' नकारात्मक अर्थ में आता है। संबंध के लिए 'घनिष्ठ' या 'अभिन्न' शुद्ध प्रयोग है।",
    "साहित्य और जीवन के संबंध के लिए 'घनिष्ठ' शब्द शुद्ध है।",
    "Medium", ["वाक्य शुद्धि", "Unit 4"]))

# Unit 5: General English (46 to 60)
u5 = "Unit 5: General English"
u5_hi = "इकाई 5: सामान्य अंग्रेजी (व्याकरण, शब्दावली, मुहावरे, वाक्य रूपांतरण व त्रुटि संशोधन)"

questions.append(q(46, s2, 5, u5, u5_hi, "English Prepositions",
    "Fill in the blank with the correct preposition: 'The Principal abstained _____ making any hasty administrative remarks during the inquiry.'",
    "Fill in the blank with the correct preposition: 'The Principal abstained _____ making any hasty administrative remarks during the inquiry.'",
    ["to", "from", "with", "against"],
    ["to", "from", "with", "against"],
    1, "The verb 'abstain' is regularly followed by the preposition 'from' (abstain from something/doing something).",
    "The standard grammatical construction is 'abstain from'.",
    "Easy", ["Prepositions", "English Grammar", "Unit 5"]))

questions.append(q(47, s2, 5, u5, u5_hi, "One-Word Substitution",
    "Choose the correct one-word substitution for: 'An official agreement between conflicting parties to cease fighting temporarily.'",
    "Choose the correct one-word substitution for: 'An official agreement between conflicting parties to cease fighting temporarily.'",
    ["Armistice / Truce", "Annexation", "Insurrection", "Belligerence"],
    ["Armistice / Truce", "Annexation", "Insurrection", "Belligerence"],
    0, "An 'armistice' or 'truce' is a formal agreement of warring parties to stop fighting temporarily.",
    "A temporary cessation of hostilities is an armistice.",
    "Easy", ["One Word Substitution", "Unit 5"]))

questions.append(q(48, s2, 5, u5, u5_hi, "Synonyms",
    "What is the most appropriate SYNONYM of the word 'PRUDENT'?",
    "What is the most appropriate SYNONYM of the word 'PRUDENT'?",
    ["Reckless", "Judicious / Wise", "Impetuous", "Extravagant"],
    ["Reckless", "Judicious / Wise", "Impetuous", "Extravagant"],
    1, "'Prudent' means acting with or showing care, wisdom, and thought for the future (judicious, wise).",
    "'Prudent' means careful and sensible; its synonym is 'judicious'.",
    "Easy", ["Synonyms", "Vocabulary", "Unit 5"]))

questions.append(q(49, s2, 5, u5, u5_hi, "Antonyms",
    "What is the exact ANTONYM of the word 'METICULOUS'?",
    "What is the exact ANTONYM of the word 'METICULOUS'?",
    ["Careless / Sloppy", "Thorough", "Scrupulous", "Painstaking"],
    ["Careless / Sloppy", "Thorough", "Scrupulous", "Painstaking"],
    0, "'Meticulous' means showing great attention to detail. Its antonym is 'careless' or 'sloppy'.",
    "The antonym of 'meticulous' (very careful) is 'careless'.",
    "Easy", ["Antonyms", "Unit 5"]))

questions.append(q(50, s2, 5, u5, u5_hi, "Idioms and Phrases",
    "What does the idiom 'to throw in the towel' mean?",
    "What does the idiom 'to throw in the towel' mean?",
    ["To begin a new washing business", "To admit defeat or surrender and abandon an effort", "To dry one's hands after work", "To challenge an opponent"],
    ["To begin a new washing business", "To admit defeat or surrender and abandon an effort", "To dry one's hands after work", "To challenge an opponent"],
    1, "'To throw in the towel' originated in boxing and means to admit defeat or give up.",
    "It means to surrender or acknowledge failure.",
    "Easy", ["Idioms", "Unit 5"]))

questions.append(q(51, s2, 5, u5, u5_hi, "Active and Passive Voice",
    "Transform the sentence into Passive Voice: 'The invigilator distributed the bilingual question booklets.'",
    "Transform the sentence into Passive Voice: 'The invigilator distributed the bilingual question booklets.'",
    ["The bilingual question booklets were distributed by the invigilator.", "The bilingual question booklets are distributed by the invigilator.", "The bilingual question booklets had been distributed by the invigilator.", "The invigilator was distributed by the question booklets."],
    ["The bilingual question booklets were distributed by the invigilator.", "The bilingual question booklets are distributed by the invigilator.", "The bilingual question booklets had been distributed by the invigilator.", "The invigilator was distributed by the question booklets."],
    0, "Simple Past Active ('distributed') converts to 'were distributed' with plural subject 'booklets' in passive voice.",
    "Past indefinite passive form is was/were + V3.",
    "Easy", ["Passive Voice", "Unit 5"]))

questions.append(q(52, s2, 5, u5, u5_hi, "Direct and Indirect Speech",
    "Change into Indirect Speech: The Director said to the Principal, 'Please submit the expenditure audit report by Friday.'",
    "Change into Indirect Speech: The Director said to the Principal, 'Please submit the expenditure audit report by Friday.'",
    ["The Director requested the Principal to submit the expenditure audit report by Friday.", "The Director ordered the Principal that he will submit the report.", "The Director said that please submit the report by Friday.", "The Director asked the Principal submitting the report Friday."],
    ["The Director requested the Principal to submit the expenditure audit report by Friday.", "The Director ordered the Principal that he will submit the report.", "The Director said that please submit the report by Friday.", "The Director asked the Principal submitting the report Friday."],
    0, "Imperative sentences with 'please' convert to reporting verb 'requested' followed by the to-infinitive clause ('to submit').",
    "Requests in imperative sentences use 'requested + object + to-infinitive'.",
    "Easy", ["Indirect Speech", "Unit 5"]))

questions.append(q(53, s2, 5, u5, u5_hi, "Punctuation Rules",
    "Which of the following sentences is correctly punctuated?",
    "Which of the following sentences is correctly punctuated?",
    ["The teacher asked, 'Where are your science assignments?'", "The teacher asked 'Where are your science assignments'?", "The teacher, asked where are your science assignments.", "The teacher asked; where are your science assignments?"],
    ["The teacher asked, 'Where are your science assignments?'", "The teacher asked 'Where are your science assignments'?", "The teacher, asked where are your science assignments.", "The teacher asked; where are your science assignments?"],
    0, "Direct speech requires a comma before the opening quotation mark and the question mark inside the quotation marks.",
    "In direct quotations, the closing punctuation stays inside the quotation marks.",
    "Easy", ["Punctuation", "Unit 5"]))

questions.append(q(54, s2, 5, u5, u5_hi, "Spelling Rules",
    "Identify the correctly spelt word:",
    "Identify the correctly spelt word:",
    ["Bureaucracy", "Beurocracy", "Bureaucrasy", "Burocracy"],
    ["Bureaucracy", "Beurocracy", "Bureaucrasy", "Burocracy"],
    0, "'Bureaucracy' is correctly spelt: B-U-R-E-A-U-C-R-A-C-Y.",
    "Correct spelling is 'Bureaucracy'.",
    "Easy", ["Spelling", "Unit 5"]))

questions.append(q(55, s2, 5, u5, u5_hi, "Sentence Sequencing (Para-Jumbles)",
    "Arrange the following parts to form a coherent, grammatically correct sentence: (P) in institutional administration / (Q) effective communication / (R) plays a pivotal role / (S) among all stakeholders.",
    "Arrange the following parts to form a coherent, grammatically correct sentence: (P) in institutional administration / (Q) effective communication / (R) plays a pivotal role / (S) among all stakeholders.",
    ["Q - R - P - S", "P - S - Q - R", "R - Q - P - S", "S - P - R - Q"],
    ["Q - R - P - S", "P - S - Q - R", "R - Q - P - S", "S - P - R - Q"],
    0, "Subject (Q: 'effective communication') + Verb phrase (R: 'plays a pivotal role') + Prepositional phrase (P: 'in institutional administration') + Context (S: 'among all stakeholders') = Q-R-P-S.",
    "The logical flow is 'Effective communication plays a pivotal role in institutional administration among all stakeholders'.",
    "Medium", ["Sentence Sequencing", "Unit 5"]))

questions.append(q(56, s2, 5, u5, u5_hi, "Error Correction",
    "Find the error in the sentence: 'Each of the classroom computers (A) / are equipped with (B) / high-speed internet (C) / and educational software (D).'",
    "Find the error in the sentence: 'Each of the classroom computers (A) / are equipped with (B) / high-speed internet (C) / and educational software (D).'",
    ["Each of the classroom computers (A)", "are equipped with (B)", "high-speed internet (C)", "and educational software (D)"],
    ["Each of the classroom computers (A)", "are equipped with (B)", "high-speed internet (C)", "and educational software (D)"],
    1, "'Each' is a singular distributive pronoun that takes a singular verb. Therefore, 'is equipped with' is correct, not 'are equipped with'.",
    "'Each' takes a singular verb; it should be 'is equipped'.",
    "Medium", ["Subject-Verb Agreement", "Error Correction", "Unit 5"]))

questions.append(q(57, s2, 5, u5, u5_hi, "Phrasal Verbs",
    "What does the phrasal verb 'call off' mean in an official administrative notice: 'The staff meeting was called off due to heavy rains'?",
    "What does the phrasal verb 'call off' mean in an official administrative notice: 'The staff meeting was called off due to heavy rains'?",
    ["Postponed indefinitely", "Cancelled", "Conducted outdoors", "Telephoned"],
    ["Postponed indefinitely", "Cancelled", "Conducted outdoors", "Telephoned"],
    1, "'Call off' means to cancel an event or arrangement that was previously planned.",
    "'Call off' means to cancel.",
    "Easy", ["Phrasal Verbs", "Unit 5"]))

questions.append(q(58, s2, 5, u5, u5_hi, "Conditional Sentences",
    "Complete the conditional sentence correctly: 'If the school budget _____ approved on time, the science laboratory equipment would have been procured earlier.'",
    "Complete the conditional sentence correctly: 'If the school budget _____ approved on time, the science laboratory equipment would have been procured earlier.'",
    ["was", "is", "had been", "would be"],
    ["was", "is", "had been", "would be"],
    2, "In Third Conditional (past unreal conditions: 'would have been procured'), the if-clause takes the past perfect tense ('had been approved').",
    "Third conditional structure requires 'had + past participle' in the if-clause.",
    "Medium", ["Conditionals", "Grammar", "Unit 5"]))

questions.append(q(59, s2, 5, u5, u5_hi, "Articles",
    "Fill in the blank with the appropriate article: 'Dr. Sharma is _____ honest and dedicated educator.'",
    "Fill in the blank with the appropriate article: 'Dr. Sharma is _____ honest and dedicated educator.'",
    ["a", "an", "the", "no article needed"],
    ["a", "an", "the", "no article needed"],
    1, "'Honest' begins with a silent 'h' and a vowel sound /ɒ/, requiring the indefinite article 'an'.",
    "Words beginning with a vowel sound take 'an'.",
    "Easy", ["Articles", "Unit 5"]))

questions.append(q(60, s2, 5, u5, u5_hi, "Conjunctions",
    "Choose the correct correlative pair: 'The school offers _____ free textbooks _____ midday nutritional meals to all enrolled pupils.'",
    "Choose the correct correlative pair: 'The school offers _____ free textbooks _____ midday nutritional meals to all enrolled pupils.'",
    ["neither ... and", "not only ... but also", "either ... and", "both ... or"],
    ["neither ... and", "not only ... but also", "either ... and", "both ... or"],
    1, "The correlative conjunction pair 'not only ... but also' connects parallel noun phrases.",
    "The standard correlative conjunction is 'not only ... but also'.",
    "Easy", ["Conjunctions", "Unit 5"]))

print(f"Total questions generated for Sections I and II: {len(questions)}")

with open("scripts/temp_up_sec_1_2.json", "w", encoding="utf-8") as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)
