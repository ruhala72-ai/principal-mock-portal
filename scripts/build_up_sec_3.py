# -*- coding: utf-8 -*-
import json
import os

with open("scripts/temp_up_sec_1_2.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

print(f"Loaded {len(questions)} questions from Sections I and II.")

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

s3 = "up-sec-3"

# ==========================================
# Unit 6: Development of Education in Pre & Post-Independence India, Thinkers & National Policies (61 to 70: 10 Qs)
# ==========================================
u6 = "Unit 6: Development of Education in Pre & Post-Independence India, Educational Thinkers & National Policies"
u6_hi = "इकाई 6: स्वतंत्रता पूर्व व पश्चात भारत में शिक्षा का विकास, शैक्षिक विचारक एवं राष्ट्रीय शिक्षा नीतियां"

questions.append(q(61, s3, 6, u6, u6_hi, "Charter Act 1813 & Macaulay Minute 1835",
    "Under the Charter Act of 1813, what annual financial allocation was earmarked for the first time by the British East India Company for the revival and promotion of literature and encouragement of learned natives in India?",
    "1813 के चार्टर एक्ट के अंतर्गत ब्रिटिश ईस्ट इंडिया कंपनी द्वारा भारत में साहित्य के पुनरुद्धार और विद्वान भारतीयों के प्रोत्साहन हेतु पहली बार कितनी वार्षिक धनराशि निर्धारित की गई थी?",
    ["₹10,000", "₹50,000", "₹1,00,000 (One Lakh Rupees)", "₹5,00,000"],
    ["₹10,000", "₹50,000", "₹1,00,000 (एक लाख रुपये)", "₹5,00,000"],
    2, "Section 43 of the Charter Act 1813 sanctioned a sum of not less than one lakh of rupees each year for the revival and improvement of literature in India.",
    "1813 के चार्टर एक्ट की धारा 43 में प्रतिवर्ष कम से कम ₹1 लाख की धनराशि शिक्षा और साहित्य के संवर्धन के लिए आवंटित करने का ऐतिहासिक प्रावधान किया गया।",
    "Easy", ["Charter Act 1813", "Educational History", "Unit 6"]))

questions.append(q(62, s3, 6, u6, u6_hi, "Wood's Despatch 1854",
    "Which historic educational document of 1854 is universally hailed as the 'Magna Carta of English Education in India', recommending the establishment of Departments of Public Instruction and universities in Calcutta, Bombay, and Madras?",
    "1854 के किस ऐतिहासिक शैक्षिक दस्तावेज को 'भारत में अंग्रेजी शिक्षा का मैग्ना कार्टा' कहा जाता है, जिसने लोक शिक्षा विभागों और कलकत्ता, बंबई व मद्रास में विश्वविद्यालयों की स्थापना की संस्तुति की थी?",
    ["Macaulay's Minute 1835", "Wood's Despatch 1854 (वुड्स डिस्पैच)", "Hunter Commission Report 1882", "Sadler Commission Report 1917"],
    ["मैकाले मिनट 1835", "वुड्स डिस्पैच 1854 (Wood's Despatch)", "हंटर आयोग रिपोर्ट 1882", "सैडलर आयोग रिपोर्ट 1917"],
    1, "Charles Wood's Education Despatch of 1854 articulated a comprehensive educational hierarchy from primary vernacular schools to universities, earning the title 'Magna Carta'.",
    "1854 का वुड्स डिस्पैच भारत में आधुनिक शिक्षा व्यवस्था की नींव माना जाता है और इसे भारतीय शिक्षा का मैग्ना कार्टा कहा जाता है।",
    "Easy", ["Wood's Despatch", "Magna Carta", "Educational History", "Unit 6"]))

questions.append(q(63, s3, 6, u6, u6_hi, "Hunter Commission 1882",
    "The Hunter Commission (Indian Education Commission 1882) appointed by Lord Ripon was specifically instructed to review the progress of which sector of Indian education?",
    "लॉर्ड रिपन द्वारा नियुक्त हंटर आयोग (भारतीय शिक्षा आयोग 1882) को विशेष रूप से भारतीय शिक्षा के किस क्षेत्र की प्रगति की समीक्षा करने का दायित्व सौंपा गया था?",
    ["Primary Education (प्राथमिक शिक्षा) and its expansion", "Military technical training colleges", "Medical research institutes exclusively", "Overseas naval academies"],
    ["प्राथमिक शिक्षा (Primary Education) और उसका प्रसार", "सैन्य तकनीकी प्रशिक्षण कॉलेज", "केवल चिकित्सा अनुसंधान संस्थान", "विदेशी नौसेना अकादमियां"],
    0, "The 1882 Hunter Commission presided by William Wilson Hunter focused on the state of primary education and recommended that it be entrusted to local self-governing bodies.",
    "हंटर आयोग 1882 ने प्राथमिक शिक्षा के विस्तार, स्थानीय भाषाओं में शिक्षण तथा स्थानीय निकायों को प्राथमिक शिक्षा सौंपने की सिफारिश की थी।",
    "Medium", ["Hunter Commission 1882", "Primary Education", "Unit 6"]))

questions.append(q(64, s3, 6, u6, u6_hi, "Sadler Commission 1917",
    "Which commission appointed in 1917 recommended the separation of the Intermediate stage from University control and led to the creation of the Board of High School and Intermediate Education in UP?",
    "1917 में नियुक्त किस आयोग ने इंटरमीडिएट स्तर को विश्वविद्यालय नियंत्रण से अलग करने की सिफारिश की जिसके परिणामस्वरूप उत्तर प्रदेश में हाईस्कूल एवं इंटरमीडिएट शिक्षा बोर्ड की स्थापना हुई?",
    ["Calcutta University Commission / Sadler Commission (सैडलर आयोग)", "Hartog Committee", "Raleigh Commission", "Sargent Scheme"],
    ["कलकत्ता विश्वविद्यालय आयोग / सैडलर आयोग (Sadler Commission)", "हार्टोग समिति", "रैले आयोग", "सार्जेंट योजना"],
    0, "The Sadler Commission (1917-19) recommended creating separate Secondary and Intermediate Education Boards, leading directly to the UP Intermediate Education Act 1921.",
    "सैडलर आयोग (1917) की सिफारिश पर ही उत्तर प्रदेश में 1921 में हाईस्कूल और इंटरमीडिएट शिक्षा बोर्ड का गठन हुआ।",
    "Hard", ["Sadler Commission 1917", "UP Board Origin", "Unit 6"]))

questions.append(q(65, s3, 6, u6, u6_hi, "Hartog Committee 1929 & Wardha Scheme 1937",
    "In 1937, Mahatma Gandhi formulated the 'Nai Talim' or Wardha Scheme of Basic Education at the All India National Education Conference. What was its fundamental principle?",
    "1937 में महात्मा गांधी ने अखिल भारतीय राष्ट्रीय शिक्षा सम्मेलन में 'नई तालीम' या वर्धा बुनियादी शिक्षा योजना प्रस्तुत की। इसका मूल सिद्धांत क्या था?",
    ["Rote memorization of classical foreign literature", "Learning through productive, socially useful, craft-centred work (शिल्प-केंद्रित बुनियादी शिक्षा) and mother tongue medium", "Expensive boarding schools for elite classes only", "Total abolition of village schools"],
    ["विदेशी शास्त्रीय साहित्य का रटन", "उत्पादक, सामाजिक रूप से उपयोगी हस्तशिल्प-केंद्रित कार्य (Craft-Centred Education) और मातृभाषा के माध्यम से शिक्षा", "केवल संभ्रांत वर्ग हेतु महंगे आवासीय स्कूल", "ग्रामीण स्कूलों को बंद करना"],
    1, "Gandhiji's Wardha Scheme (Basic Education) proposed free, compulsory education from age 7 to 14 centred around productive handicrafts, self-reliance, and mother tongue.",
    "गांधीजी की वर्धा बुनियादी शिक्षा योजना हस्तशिल्प और उत्पादक कार्यों के माध्यम से आत्मनिर्भर और स्वावलंबी शिक्षा देने का दर्शन है।",
    "Easy", ["Wardha Scheme", "Mahatma Gandhi", "Basic Education", "Unit 6"]))

questions.append(q(66, s3, 6, u6, u6_hi, "Educational Philosophies of Thinkers",
    "Which visionary Indian thinker established 'Visva-Bharati' at Santiniketan to harmonize the spiritual heritage of the East with the scientific knowledge of the West in natural open-air surroundings?",
    "किस महान भारतीय विचारक ने प्रकृति के खुले वातावरण में प्राच्य आध्यात्मिक चिंतन और पाश्चात्य वैज्ञानिक ज्ञान के समन्वय हेतु शांतिनिकेतन में 'विश्व-भारती' की स्थापना की?",
    ["Rabindranath Tagore (रवीन्द्रनाथ टैगोर)", "Swami Vivekananda", "Jawaharlal Nehru", "Dr. B. R. Ambedkar"],
    ["रवीन्द्रनाथ टैगोर (Rabindranath Tagore)", "स्वामी विवेकानंद", "जवाहरलाल नेहरू", "डॉ. भीमराव आंबेडकर"],
    0, "Rabindranath Tagore founded Visva-Bharati at Santiniketan in 1921 based on his philosophy of naturalism, freedom, and universal humanism.",
    "रवीन्द्रनाथ टैगोर ने प्रकृति के सान्निध्य में स्वतंत्रता और विश्व बंधुत्व के सिद्धांतों पर शांतिनिकेतन (विश्व-भारती) की स्थापना की।",
    "Easy", ["Rabindranath Tagore", "Visva-Bharati", "Thinkers", "Unit 6"]))

questions.append(q(67, s3, 6, u6, u6_hi, "Educational Philosophy of Swami Vivekananda",
    "Swami Vivekananda defined education as which profound realization?",
    "स्वामी विवेकानंद ने शिक्षा को किस रूप में परिभाषित किया था?",
    ["'Education is the accumulation of encyclopedic data'", "'Education is the manifestation of the perfection already in man' (मनुष्य में अंतर्निहित पूर्णता की अभिव्यक्ति ही शिक्षा है)", "'Education is preparing clerks for administrative offices'", "'Education is passing written examinations with high marks'"],
    ["'शिक्षा मात्र सूचनाओं का संग्रह है'", "'मनुष्य में पूर्व से अंतर्निहित पूर्णता की अभिव्यक्ति ही शिक्षा है' (Manifestation of perfection already in man)", "'कार्यालयों हेतु लिपिक तैयार करना शिक्षा है'", "'परीक्षा में अधिक अंक प्राप्त करना ही शिक्षा है'"],
    1, "Swami Vivekananda proclaimed: 'Education is the manifestation of the perfection already in man.' He advocated character-building and life-building education.",
    "स्वामी विवेकानंद के अनुसार 'मनुष्य में अंतर्निहित पूर्णता को अभिव्यक्त करना ही शिक्षा है।' उन्होंने चरित्र-निर्माणकारी शिक्षा पर बल दिया।",
    "Easy", ["Swami Vivekananda", "Philosophy of Education", "Unit 6"]))

questions.append(q(68, s3, 6, u6, u6_hi, "Educational Philosophy of Dr. B. R. Ambedkar",
    "What was the immortal three-fold clarion call given by Dr. B. R. Ambedkar for social emancipation through the Bahishkrit Hitakarini Sabha?",
    "डॉ. भीमराव आंबेडकर ने बहिष्कृत हितकारिणी सभा के माध्यम से सामाजिक मुक्ति हेतु कौन सा अमर त्रिसूत्रीय संदेश दिया था?",
    ["'Pray, Wait, and Compromise'", "'Educate, Agitate, and Organize' (शिक्षित बनो, संघर्ष करो और संगठित रहो)", "'Earn, Spend, and Relax'", "'Observe, Obey, and Surrender'"],
    ["'प्रार्थना करो, प्रतीक्षा करो और समझौता करो'", "'शिक्षित बनो, संघर्ष करो और संगठित रहो' (Educate, Agitate, Organize)", "'कमाओ, खर्च करो और आराम करो'", "'आज्ञा मानो और आत्मसमर्पण करो'"],
    1, "Dr. B. R. Ambedkar gave the clarion motto: 'Educate, Agitate, Organize', viewing education as the foremost weapon for social justice and equality.",
    "डॉ. आंबेडकर का प्रसिद्ध नारा था: 'शिक्षित बनो, संघर्ष करो, संगठित रहो।' उन्होंने शिक्षा को सामाजिक समानता का मूल आधार माना।",
    "Easy", ["Dr. Ambedkar", "Educate Agitate Organize", "Unit 6"]))

questions.append(q(69, s3, 6, u6, u6_hi, "Kothari Commission (1964-66)",
    "Which landmark commission began its report with the iconic sentence: 'The destiny of India is now being shaped in her classrooms' and recommended allocating 6% of GNP to education?",
    "किस ऐतिहासिक शिक्षा आयोग ने अपनी रिपोर्ट का प्रारंभ इस प्रसिद्ध वाक्य से किया था कि 'भारत के भविष्य का निर्माण उसकी कक्षाओं में हो रहा है' और शिक्षा पर सकल राष्ट्रीय उत्पाद (GNP) का 6% व्यय करने की सिफारिश की थी?",
    ["Radhakrishnan Commission 1948", "Mudaliar Commission 1952", "Education Commission 1964-66 / Kothari Commission (कोठारी आयोग)", "National Knowledge Commission"],
    ["राधाकृष्णन आयोग 1948", "मुदालियर आयोग 1952", "शिक्षा आयोग 1964-66 / कोठारी आयोग (Kothari Commission)", "राष्ट्रीय ज्ञान आयोग"],
    2, "The Education Commission (1964-66) chaired by Dr. D. S. Kothari comprehensively covered all levels of education and recommended the common school system and 6% of GNP on education.",
    "डॉ. डी. एस. कोठारी की अध्यक्षता वाले शिक्षा आयोग (1964-66) ने शिक्षा पर 6% व्यय और 10+2+3 संरचना की ऐतिहासिक संस्तुति की थी।",
    "Easy", ["Kothari Commission", "Destiny of India", "Unit 6"]))

questions.append(q(70, s3, 6, u6, u6_hi, "National Education Policy 2020 Paradigm",
    "According to National Education Policy 2020, what is the new academic curricular structure replacing the 10+2 model in Indian schools?",
    "राष्ट्रीय शिक्षा नीति 2020 के अनुसार भारतीय विद्यालयों में 10+2 के स्थान पर लागू की गई नई शैक्षणिक संरचना कौन सी है?",
    ["5+3+3+4 (बुनियादी, प्रारंभिक, मध्य और माध्यमिक)", "4+4+4+4", "3+3+4+6", "5+4+3+2"],
    ["5+3+3+4 (Foundational, Preparatory, Middle, Secondary)", "4+4+4+4", "3+3+4+6", "5+4+3+2"],
    0, "NEP 2020 restructures school education into 5+3+3+4 covering ages 3 to 18: Foundational (5 yrs), Preparatory (3 yrs), Middle (3 yrs), and Secondary (4 yrs).",
    "एनईपी 2020 ने 10+2 व्यवस्था को समाप्त कर 5+3+3+4 (3-8, 8-11, 11-14 और 14-18 वर्ष) की नई संरचना लागू की है।",
    "Easy", ["NEP 2020", "5+3+3+4 Structure", "Unit 6"]))

# ==========================================
# Unit 7: Uttar Pradesh Intermediate Education Act 1921 & Associated Acts (71 to 78: 8 Qs)
# ==========================================
u7 = "Unit 7: Uttar Pradesh Intermediate Education Act 1921, Associated Acts, UP Board (UPMSP) & Directorates"
u7_hi = "इकाई 7: उत्तर प्रदेश इंटरमीडिएट शिक्षा अधिनियम 1921, संबद्ध अधिनियम, माध्यमिक शिक्षा परिषद (UPMSP) व निदेशालय"

questions.append(q(71, s3, 7, u7, u7_hi, "UP Intermediate Education Act 1921 - Statutory Establishment",
    "Under Section 3 of the UP Intermediate Education Act, 1921, which constitutional statutory board was established for regulating and conducting High School and Intermediate examinations in Uttar Pradesh?",
    "उत्तर प्रदेश इंटरमीडिएट शिक्षा अधिनियम 1921 की धारा 3 के अंतर्गत उत्तर प्रदेश में हाईस्कूल और इंटरमीडिएट परीक्षाओं के संचालन एवं विनियमन हेतु किस वैधानिक बोर्ड की स्थापना की गई थी?",
    ["Board of High School and Intermediate Education, Uttar Pradesh (UPMSP Prayagraj)", "Central Board of Secondary Education", "UP State Open School Board", "Council for Indian School Certificate Examinations"],
    ["माध्यमिक शिक्षा परिषद, उत्तर प्रदेश (UPMSP प्रयागराज)", "केंद्रीय माध्यमिक शिक्षा बोर्ड", "उप्र राज्य मुक्त विद्यालय बोर्ड", "सीआईएससीई"],
    0, "Section 3 established the Board of High School and Intermediate Education, Uttar Pradesh, with headquarters at Prayagraj (Allahabad).",
    "धारा 3 के तहत प्रयागराज में माध्यमिक शिक्षा परिषद, उत्तर प्रदेश की स्थापना हुई जो एशिया के सबसे बड़े परीक्षा बोर्डों में से एक है।",
    "Easy", ["UP Board", "UPMSP", "Section 3", "Unit 7"]))

questions.append(q(72, s3, 7, u7, u7_hi, "Chapter III Regulation 31 - Subsistence Allowance",
    "Under Regulation 31 of Chapter III of the Regulations framed under the UP Intermediate Education Act 1921, what is the initial subsistence allowance payable to a suspended teacher or Principal?",
    "उत्तर प्रदेश इंटरमीडिएट शिक्षा अधिनियम 1921 के अध्याय III के विनियम 31 के अनुसार निलंबित शिक्षक या प्रधानाचार्य को प्रारंभिक अवधि में कितना जीवन निर्वाह भत्ता (Subsistence Allowance) देय होता है?",
    ["Full 100% pay plus allowances", "Half (50%) of the pay which they would have drawn if on leave on half average pay, plus admissible DA", "25% of basic salary only", "Zero salary till conclusion of inquiry"],
    ["100% पूरा वेतन तथा भत्ते", "अर्द्ध-औसत वेतन पर अवकाश वेतन के बराबर (अर्थात मूल वेतन का 50%) तथा अनुमन्य महंगाई भत्ता", "केवल 25% मूल वेतन", "जांच समाप्त होने तक शून्य वेतन"],
    1, "Under Regulation 31, a suspended employee is paid subsistence allowance equal to half average pay leave salary (50%) plus applicable DA for the initial suspension period.",
    "विनियम 31 के अनुसार निलंबन अवधि के दौरान कर्मचारी को प्रारंभिक रूप से 50% जीवन निर्वाह भत्ता और उस पर महंगाई भत्ता देय होता है।",
    "Medium", ["Regulation 31", "Subsistence Allowance", "Suspension Rules", "Unit 7"]))

questions.append(q(73, s3, 7, u7, u7_hi, "Section 16G - Approval of Disciplinary Action",
    "Under Section 16G(3) of the UP Intermediate Education Act 1921, what prior approval is mandatory before the Committee of Management can dismiss, remove, or reduce in rank any teacher or Principal of a recognized aided institution?",
    "उप्र इंटरमीडिएट शिक्षा अधिनियम 1921 की धारा 16G(3) के अनुसार किसी सहायता प्राप्त विद्यालय के शिक्षक या प्रधानाचार्य को पदच्युत करने, हटाने या पदावनत करने से पूर्व किसकी लिखित पूर्व अनुमति अनिवार्य है?",
    ["Approval of District Magistrate", "Written approval of the District Inspector of Schools (DIOS) / Competent Commission Authority", "Village Gram Pradhan", "State Police Superintendent"],
    ["जिलाधिकारी का अनुमोदन", "जिला विद्यालय निरीक्षक (DIOS) / सक्षम आयोग प्राधिकारी का लिखित पूर्व अनुमोदन", "ग्राम प्रधान", "जिला पुलिस अधीक्षक"],
    1, "Section 16G(3)(a) mandates that no order of dismissal, removal or reduction in rank passed against any teacher or principal shall take effect unless approved by the DIOS/Commission.",
    "धारा 16G(3) के अनुसार प्रबंध समिति द्वारा किसी शिक्षक या प्रधानाचार्य को हटाने का आदेश तब तक प्रभावी नहीं हो सकता जब तक जिला विद्यालय निरीक्षक/आयोग का अनुमोदन न मिल जाए।",
    "Hard", ["Section 16G", "DIOS Approval", "Teacher Protection", "Unit 7"]))

questions.append(q(74, s3, 7, u7, u7_hi, "Scheme of Administration (प्रबंध योजना)",
    "Under Section 16D and 16E of the UP Intermediate Education Act 1921, what is the 'Scheme of Administration' (प्रबंध योजना) of an aided inter college?",
    "उप्र इंटरमीडिएट शिक्षा अधिनियम 1921 की धारा 16D व 16E के अंतर्गत सहायता प्राप्त इंटर कॉलेज की 'प्रबंध योजना' (Scheme of Administration) क्या होती है?",
    ["A private daily timetable of peons", "A legally sanctioned statutory charter approved by the Director of Education regulating the constitution, powers, duties, and election of the Committee of Management", "A commercial lease contract", "A sports match schedule"],
    ["चतुर्थ श्रेणी कर्मचारियों का दैनिक कार्यक्रम", "शिक्षा निदेशक द्वारा अनुमोदित वह वैधानिक संविधि जो प्रबंध समिति के गठन, चुनाव, शक्तियों और कर्तव्यों को नियंत्रित करती है", "व्यावसायिक पट्टा अनुबंध", "खेल प्रतियोगिता का कार्यक्रम"],
    1, "The Scheme of Administration is the constitution of the non-government recognized school, approved by the Joint Director/Director, laying down rules for management elections and institutional control.",
    "प्रबंध योजना संस्था का अनुमोदित संविधान है जिसके अनुसार प्रबंध समिति का गठन, चुनाव और विद्यालय का संचालन वैधानिक रूप से किया जाता है।",
    "Medium", ["Scheme of Administration", "Section 16D", "Management", "Unit 7"]))

questions.append(q(75, s3, 7, u7, u7_hi, "Section 18 of UPSESSB Act 1982 - Ad-hoc Appointments",
    "Under Section 18 of the UP Secondary Education Services Selection Board Act 1982 (UP Act No. 5 of 1982), how is an ad-hoc appointment to a substantive vacancy of Principal in an aided inter college filled pending regular selection?",
    "उप्र माध्यमिक शिक्षा सेवा चयन बोर्ड अधिनियम 1982 की धारा 18 के अनुसार चयन बोर्ड से नियमित चयन होने तक प्रधानाचार्य के पद पर तदर्थ नियुक्ति किस प्रकार की जाती है?",
    ["By open direct recruitment advertisement in local newspapers", "By promoting the senior-most approved teacher in the lecturer grade possessing the prescribed qualifications", "By direct nomination of any family member of the manager", "By appointing an external contractual accountant"],
    ["स्थानीय समाचार पत्रों में सीधी भर्ती का विज्ञापन निकालकर", "संस्था के प्रवक्ता संवर्ग में वरिष्ठतम अनुमोदित शिक्षक (Senior-most approved Lecturer) की पदोन्नति द्वारा", "प्रबंधक के परिवार के किसी सदस्य के मनोनयन द्वारा", "बाहरी संविदा कर्मचारी को नियुक्त करके"],
    1, "Section 18 mandates that an ad-hoc vacancy of Principal shall be filled by promoting the senior-most qualified teacher in the Lecturer grade of the college.",
    "धारा 18 के तहत चयन बोर्ड से चयनित नियमित अभ्यर्थी के कार्यभार ग्रहण करने तक विद्यालय के वरिष्ठतम अनुमोदित प्रवक्ता को ही कार्यवाहक प्रधानाचार्य बनाया जाता है।",
    "Hard", ["Section 18", "UPSESSB Act 1982", "Ad-hoc Principal", "Unit 7"]))

questions.append(q(76, s3, 7, u7, u7_hi, "Role of DIOS (जिला विद्यालय निरीक्षक)",
    "What is the statutory role and administrative position of the District Inspector of Schools (DIOS) in the secondary education system of Uttar Pradesh?",
    "उत्तर प्रदेश की माध्यमिक शिक्षा प्रणाली में जिला विद्यालय निरीक्षक (DIOS) की वैधानिक और प्रशासनिक स्थिति क्या है?",
    ["Head of Primary Anganwadis only", "Apex district-level administrative officer representing the state education department for secondary schools, controlling grants, approvals, examinations, and disciplinary oversight", "Municipal sanitation officer", "Treasury revenue tehsildar"],
    ["केवल प्राथमिक आंगनबाड़ियों के प्रमुख", "माध्यमिक शिक्षा हेतु जिले का सर्वोच्च प्रशासनिक अधिकारी जो विद्यालयों के वित्तीय अनुदान, नियुक्तियों के अनुमोदन, बोर्ड परीक्षाओं और प्रशासनिक निगरानी का दायित्व संभालता है", "नगर निगम स्वच्छता अधिकारी", "तहसीलदार"],
    1, "The DIOS is the chief district authority for secondary education in UP under the Intermediate Education Act and Payment of Salaries Act.",
    "डीआईओएस (DIOS) जिले में माध्यमिक शिक्षा का प्रमुख राज्य अधिकारी होता है जो शिक्षकों के वेतन, परीक्षा और सेवा मामलों का नियंत्रण करता है।",
    "Easy", ["DIOS", "District Administration", "Secondary Education", "Unit 7"]))

questions.append(q(77, s3, 7, u7, u7_hi, "Regional Joint Director of Education (JDA)",
    "In the educational administrative hierarchy of Uttar Pradesh, who acts as the appellate authority over the orders and decisions passed by the DIOS regarding secondary school administration?",
    "उत्तर प्रदेश के शैक्षिक प्रशासनिक ढांचे में जिला विद्यालय निरीक्षक (DIOS) के आदेशों और निर्णयों के विरुद्ध प्रथम अपीलीय प्राधिकारी कौन होता है?",
    ["Regional Joint Director of Education (संयुक्त शिक्षा निदेशक - JDA) of the Division / Mandal", "District Sub-Divisional Magistrate", "Gram Panchayat Adhikari", "Chief Medical Officer"],
    ["मंडल का क्षेत्रीय संयुक्त शिक्षा निदेशक (JDA / Joint Director of Education)", "उप-जिलाधिकारी (SDM)", "ग्राम पंचायत अधिकारी", "मुख्य चिकित्सा अधिकारी"],
    0, "The Regional Joint Director of Education (JDA) heads the educational division (Mandal) and serves as the immediate higher supervisory and appellate authority above DIOS.",
    "मंडलीय संयुक्त शिक्षा निदेशक (JDA) मंडल स्तर पर माध्यमिक शिक्षा का शीर्ष अधिकारी और डीआईओएस के निर्णयों के विरुद्ध अपीलीय अधिकारी होता है।",
    "Medium", ["JDA", "Appellate Authority", "Administrative Hierarchy", "Unit 7"]))

questions.append(q(78, s3, 7, u7, u7_hi, "Chapter I of UPMSP Regulations - Minimum Working Days",
    "According to the Regulations of the Board of High School and Intermediate Education UP, what is the minimum number of actual teaching/working days prescribed for recognized secondary schools in an academic session?",
    "माध्यमिक शिक्षा परिषद उत्तर प्रदेश के विनियमों के अनुसार किसी शैक्षणिक सत्र में सहायता प्राप्त माध्यमिक विद्यालयों के लिए कम से कम कितने वास्तविक शिक्षण/कार्य दिवस निर्धारित हैं?",
    ["180 days", "200 days", "220 days", "260 days"],
    ["180 दिन", "200 दिन", "220 दिन", "260 दिन"],
    2, "The UPMSP calendar mandates a minimum of 220 instructional days in a standard academic calendar year.",
    "यूपी बोर्ड के नियमों के तहत शैक्षणिक सत्र में कम से कम 220 कार्य दिवस (शिक्षण दिवस) होना अनिवार्य है।",
    "Easy", ["Working Days", "UPMSP Regulations", "School Calendar", "Unit 7"]))

# ==========================================
# Unit 8: Role and Responsibilities of the Principal, Leadership & Resource Management (79 to 84: 6 Qs)
# ==========================================
u8 = "Unit 8: Role and Responsibilities of the Principal, Leadership & Resource Management"
u8_hi = "इकाई 8: प्रधानाचार्य की भूमिका एवं दायित्व, शैक्षिक नेतृत्व, पर्यवेक्षण व संसाधन प्रबंधन"

questions.append(q(79, s3, 8, u8, u8_hi, "Principal as Head of the Institution",
    "As Head of the Institution under UP State Regulations, which statutory responsibility rests personally upon the Principal regarding school finances and student fee funds?",
    "उप्र राज्य विनियमों के अंतर्गत संस्था प्रमुख होने के नाते विद्यालय की निधियों, छात्र शुल्कों और वित्तीय अभिलेखों के संदर्भ में प्रधानाचार्य का क्या व्यक्तिगत दायित्व होता है?",
    ["Delegating all financial signatures to students", "Personal custody, accurate maintenance of accounts, proper voucher documentation, and lawful expenditure under the Financial Handbook", "Investing school funds in private stock markets", "Withholding scholarship money indefinitely"],
    ["छात्रों को वित्तीय हस्ताक्षर सौंपना", "विद्यालय के अभिलेखों की सुरक्षा, खातों का सही संधारण, वाउचरों की पुष्टि तथा वित्तीय हस्तपुस्तिका के अनुसार वैध व्यय सुनिश्चित करना", "निजी शेयर बाजार में स्कूल फंड लगाना", "छात्रवृत्ति रोक कर रखना"],
    1, "The Principal as institutional head is personally responsible for the custody, lawful disbursement, and accounting of all institutional and pupil funds.",
    "संस्था प्रधान होने के नाते प्रधानाचार्य विद्यालय के वित्तीय अभिलेखों, शुल्कों और बैंक खातों के सही उपयोग और सुरक्षा के लिए व्यक्तिगत रूप से उत्तरदायी होता है।",
    "Easy", ["Role of Principal", "Financial Accountability", "Leadership", "Unit 8"]))

questions.append(q(80, s3, 8, u8, u8_hi, "Instructional Supervision & Mentoring",
    "What is the most effective approach for a Principal conducting 'Instructional Supervision' of classroom teaching?",
    "कक्षा शिक्षण का 'शैक्षणिक पर्यवेक्षण' (Instructional Supervision) करते समय प्रधानाचार्य का सबसे प्रभावी दृष्टिकोण क्या होना चाहिए?",
    ["Surprise fault-finding solely to issue punitive reprimands", "Colleague-oriented observation focusing on pedagogical support, constructive mentoring, identifying student learning difficulties, and professional growth", "Sitting outside without entering classrooms", "Inspecting only the chalk quality"],
    ["केवल दंड देने के उद्देश्य से कमियां निकालना", "सहयोगात्मक कक्षा अवलोकन, रचनात्मक मार्गदर्शन, छात्रों की अधिगम कठिनाइयों की पहचान और शिक्षक का व्यावसायिक विकास", "कक्षा में जाए बिना बाहर बैठना", "केवल चाक की गुणवत्ता देखना"],
    1, "Modern instructional supervision is developmental and supportive, aiming to enhance pedagogical quality and student learning through collaborative reflection.",
    "प्रभावी शैक्षणिक पर्यवेक्षण का उद्देश्य कमियां निकालना नहीं बल्कि शिक्षक को शिक्षण विधि सुधारने और बच्चों की समझ बढ़ाने में रचनात्मक सहायता देना है।",
    "Easy", ["Instructional Supervision", "Mentoring", "Pedagogical Leadership", "Unit 8"]))

questions.append(q(81, s3, 8, u8, u8_hi, "Decision Making and Conflict Resolution",
    "When a grievance or conflict arises between department teachers regarding timetable periods, which leadership style should the Principal adopt?",
    "समय सारणी के कालांशों को लेकर जब शिक्षकों के बीच विवाद या असंतोष उत्पन्न होता है, तो प्रधानाचार्य को किस नेतृत्व शैली को अपनाना चाहिए?",
    ["Autocratic dictatorial orders without listening", "Consultative and collaborative problem-solving based on transparent objective academic criteria, workload fairness, and student welfare", "Ignoring the issue completely", "Locking the teachers' common room"],
    ["बिना सुने तानाशाही आदेश देना", "पारदर्शी शैक्षणिक मानदंडों, कार्यभार की समानता और छात्रहित पर आधारित परामर्शी और सहयोगात्मक समाधान", "विवाद की पूरी तरह अनदेखी करना", "स्टाफ रूम बंद कर देना"],
    1, "Collaborative and consultative leadership fosters institutional trust and ensures transparent, fair allocation of responsibilities.",
    "सहयोगात्मक नेतृत्व द्वारा निष्पक्ष, पारदर्शी और तर्कसंगत नियमों के आधार पर विवादों का सर्वमान्य समाधान किया जाता है।",
    "Easy", ["Conflict Resolution", "Leadership Styles", "Unit 8"]))

questions.append(q(82, s3, 8, u8, u8_hi, "Staff Management and Professional Development",
    "Under NEP 2020 guidelines, how many hours of Continuous Professional Development (CPD) are recommended annually for every school teacher and Principal?",
    "एनईपी 2020 के अनुसार प्रत्येक शिक्षक और प्रधानाचार्य के लिए प्रतिवर्ष कितने घंटे का सतत व्यावसायिक विकास (CPD) प्रशिक्षण अनिवार्य रूप से अनुशंसित है?",
    ["10 hours", "25 hours", "50 hours", "100 hours"],
    ["10 घंटे", "25 घंटे", "50 घंटे (Fifty Hours)", "100 घंटे"],
    2, "NEP 2020 Section 5.15 mandates that every teacher and school leader will be expected to participate in at least 50 hours of Continuous Professional Development (CPD) every year.",
    "एनईपी 2020 के अनुसार प्रत्येक शिक्षक और संस्था प्रमुख को प्रतिवर्ष कम से कम 50 घंटे के सतत व्यावसायिक विकास (CPD) कार्यक्रमों में भाग लेना होगा।",
    "Medium", ["CPD", "NEP 2020", "Teacher Training", "Unit 8"]))

questions.append(q(83, s3, 8, u8, u8_hi, "Resource Mobilization and School Infrastructure",
    "How should a Principal effectively mobilize community and alumni resources for secondary school infrastructure development?",
    "एक प्रधानाचार्य को विद्यालय की भौतिक अवसंरचना के विकास हेतु समुदाय और पूर्व छात्रों (Alumni) के संसाधनों का किस प्रकार प्रभावी उपयोग करना चाहिए?",
    ["By forcing parents to pay illegal capitation fees", "By forming an active Alumni Association and engaging community stakeholders transparently through CSR, SMDC, and alumni development projects", "By selling school land to private developers", "By shutting down the science laboratory"],
    ["अभिभावकों पर अवैध चंदा थोपकर", "पूर्व छात्र परिषद (Alumni Association) का गठन कर, सीएसआर (CSR), एसएमडीसी और पारदर्शी विकास परियोजनाओं के माध्यम से समुदाय को जोड़ना", "विद्यालय की जमीन बेचना", "प्रयोगशाला बंद करना"],
    1, "Institutional leadership mobilizes alumni and community support through transparent consultative platforms, CSR partnerships, and recognized school development committees.",
    "पूर्व छात्र परिषद और समुदाय के साथ पारदर्शी संवाद स्थापित कर विद्यालय के विकास हेतु सामाजिक व भौतिक संसाधनों का प्रभावी उपयोग किया जाता है।",
    "Easy", ["Resource Mobilization", "Alumni Association", "School Leadership", "Unit 8"]))

questions.append(q(84, s3, 8, u8, u8_hi, "Disaster Management & Campus Safety",
    "Under National Disaster Management Authority (NDMA) School Safety Guidelines, what is the mandatory responsibility of the School Principal?",
    "राष्ट्रीय आपदा प्रबंधन प्राधिकरण (NDMA) के विद्यालय सुरक्षा दिशानिर्देशों के अनुसार विद्यालय प्रधानाचार्य का क्या अनिवार्य दायित्व है?",
    ["Conducting mock evacuation drills periodically and formulating a comprehensive School Disaster Management Plan (SDMP)", "Locking all emergency exit doors permanently", "Storing flammable fuels inside classrooms", "Banning fire extinguishers on campus"],
    ["समय-समय पर आपदा मॉक ड्रिल आयोजित करना तथा विस्तृत विद्यालय आपदा प्रबंधन योजना (SDMP) तैयार करना", "आपातकालीन निकास द्वार बंद रखना", "कक्षाओं में ज्वलनशील पदार्थ रखना", "अग्निशामक यंत्रों पर रोक लगाना"],
    0, "NDMA guidelines require every school head to prepare a School Disaster Management Plan (SDMP), conduct regular fire/earthquake mock drills, and ensure child safety.",
    "एनडीएमए दिशानिर्देशों के तहत स्कूल आपदा प्रबंधन योजना बनाना, नियमित मॉक ड्रिल कराना और परिसर को सुरक्षित रखना प्रधानाचार्य का दायित्व है।",
    "Easy", ["School Safety", "NDMA Guidelines", "Disaster Management", "Unit 8"]))

# ==========================================
# Unit 9: Educational Administration, Academic Planning, School Calendar, Clubs & Quality Assurance (85 to 90: 6 Qs)
# ==========================================
u9 = "Unit 9: Educational Administration, Academic Planning, School Calendar, Clubs & Quality Assurance"
u9_hi = "इकाई 9: शैक्षिक प्रशासन, अकादमिक नियोजन, विद्यालय कैलेंडर, क्लब, समय सारिणी व गुणवत्ता संवर्धन"

questions.append(q(85, s3, 9, u9, u9_hi, "Academic Calendar & Curriculum Planning",
    "Why is the preparation of an Annual Academic Calendar before the commencement of the school session essential for educational administration?",
    "सत्र प्रारंभ होने से पूर्व वार्षिक अकादमिक कैलेंडर तैयार करना शैक्षिक प्रशासन के लिए क्यों आवश्यक है?",
    ["To plan all private family holidays of the manager", "To provide a structured timeline for curriculum coverage, unit tests, vacations, co-curricular club events, and exam schedules, ensuring 220 working days", "To abolish practical science classes", "To cancel all sports competitions"],
    ["प्रबंधक की पारिवारिक छुट्टियों की योजना बनाना", "पाठ्यक्रम पूर्ण करने, इकाई परीक्षाओं, अवकाशों, सह-पाठ्यचर्या क्लब गतिविधियों और बोर्ड परीक्षाओं हेतु एक संरचित समय सारणी देना", "विज्ञान प्रयोगात्मक कक्षाएं समाप्त करना", "खेलकूद बंद करना"],
    1, "An academic calendar plans teaching units, assessment schedules, and co-curricular programs systematically across the prescribed 220 instructional days.",
    "वार्षिक कैलेंडर पूरे सत्र में पाठ्यचर्या, परीक्षाओं और पाठ्येतर गतिविधियों का सुचारू और समयबद्ध संचालन सुनिश्चित करता है।",
    "Easy", ["Academic Calendar", "Curriculum Planning", "Unit 9"]))

questions.append(q(86, s3, 9, u9, u9_hi, "Principles of Timetable Construction",
    "In pedagogical timetable construction for secondary schools, why are intellectually demanding subjects (like Mathematics and Science) typically scheduled during morning periods?",
    "माध्यमिक विद्यालयों में समय सारणी (Timetable) निर्माण के मनोवैज्ञानिक सिद्धांत के अनुसार गणित और विज्ञान जैसे कठिन विषय सामान्यतः प्रातःकालीन सत्र में क्यों रखे जाते हैं?",
    ["Because afternoon periods are reserved for teacher naps", "Because students' mental energy, alertness, and cognitive retention are highest during early morning periods before cognitive fatigue sets in", "Because classrooms are darker in the morning", "Because teachers refuse to teach before noon"],
    ["क्योंकि दोपहर में शिक्षक आराम करते हैं", "क्योंकि मानसिक थकान होने से पहले प्रातःकाल में छात्रों की मानसिक सतर्कता, ध्यान और अधिगम क्षमता उच्चतम स्तर पर होती है", "क्योंकि सुबह कक्षा में अंधेरा होता है", "क्योंकि शिक्षक दोपहर से पहले नहीं पढ़ाना चाहते"],
    1, "The psychology of timetable construction dictates placing cognitively strenuous subjects in the 2nd to 4th morning periods when fatigue is lowest.",
    "मनोवैज्ञानिक सिद्धांत के अनुसार सुबह के समय बालकों की मानसिक स्फूर्ति और ग्रहणशीलता अधिक होती है, अतः गणित-विज्ञान जैसे विषय पहले रखे जाते हैं।",
    "Easy", ["Timetable Construction", "Educational Psychology", "Unit 9"]))

questions.append(q(87, s3, 9, u9, u9_hi, "Co-Curricular Clubs - Science and Eco Clubs",
    "Under UP Secondary Education Quality Directives, what is the prime objective of organizing 'Eco Clubs' and 'Science Clubs' in schools?",
    "उप्र माध्यमिक शिक्षा गुणवत्ता निर्देशों के तहत विद्यालयों में 'इको क्लब' और 'विज्ञान क्लब' गठित करने का मुख्य उद्देश्य क्या है?",
    ["Commercial sale of plastic bottles", "Fostering hands-on scientific curiosity, experimental thinking, environmental consciousness, and experiential problem-solving beyond textbook theory", "Preventing students from using science labs", "Collecting extra tuition fees"],
    ["प्लास्टिक की बोतलें बेचना", "पाठ्यपुस्तकों से परे प्रयोगात्मक वैज्ञानिक सोच, पर्यावरण संरक्षण, नवाचार और व्यावहारिक समस्या समाधान की प्रवृत्ति का विकास करना", "बच्चों को प्रयोगशाला जाने से रोकना", "अतिरिक्त ट्यूशन फीस लेना"],
    1, "Science and Eco Clubs nurture scientific inquiry, eco-friendly habits, tree plantation, energy conservation, and project-based learning.",
    "विज्ञान एवं पर्यावरण क्लब विद्यार्थियों में करके सीखने, नवाचार करने और प्रकृति संरक्षण के प्रति जागरूकता बढ़ाने के महत्वपूर्ण मंच हैं।",
    "Easy", ["Eco Clubs", "Science Clubs", "Co-Curricular", "Unit 9"]))

questions.append(q(88, s3, 9, u9, u9_hi, "Morning Assembly Pedagogy",
    "What educational purpose does a well-organized Daily Morning Assembly serve in a secondary school?",
    "माध्यमिक विद्यालय में एक सुव्यवस्थित दैनिक प्रार्थना सभा (Morning Assembly) का क्या शैक्षिक उद्देश्य होता है?",
    ["Just wasting forty minutes of classroom time", "Inculcating moral values, civic consciousness, community belonging, sharing news and student presentations, and setting the institutional tone for the day", "Publicly humiliating weak students", "Selling school stationery"],
    ["केवल समय नष्ट करना", "नैतिक मूल्यों का विकास, नागरिक चेतना, सामुदायिक भावना, समाचार वाचन, प्रेरक विचार और विद्यालय में अनुशासित वातावरण का निर्माण", "कमजोर छात्रों का अपमान करना", "स्टेशनरी बेचना"],
    1, "The morning assembly is an integral pedagogical ritual fostering national unity, moral values, public speaking, physical fitness, and institutional identity.",
    "प्रार्थना सभा बच्चों में राष्ट्रीय चेतना, नैतिक मूल्य, सामूहिक अनुशासन और मंच पर अभिव्यक्ति का आत्मविश्वास विकसित करने का सशक्त माध्यम है।",
    "Easy", ["Morning Assembly", "Value Education", "School Culture", "Unit 9"]))

questions.append(q(89, s3, 9, u9, u9_hi, "Teacher Lesson Plans and Diaries",
    "Why is the maintenance of a 'Teacher's Diary' and structured Lesson Plan mandatory under school inspection guidelines?",
    "विद्यालय निरीक्षण नियमावली के अंतर्गत 'शिक्षक दैनंदिनी' (Teacher's Diary) और पाठ योजना का संधारण क्यों अनिवार्य है?",
    ["To record personal family expenses", "To ensure structured pedagogical preparation, clear statement of learning objectives, teaching-learning materials (TLM) alignment, and post-class reflective self-evaluation", "To replace all annual examinations", "To avoid coming to school"],
    ["व्यक्तिगत पारिवारिक खर्च लिखना", "शिक्षण की पूर्व योजना, स्पष्ट अधिगम प्रतिफल, शिक्षण सहायक सामग्री का चयन और कक्षा के बाद आत्म-चिंतन सुनिश्चित करना", "वार्षिक परीक्षाएं समाप्त करना", "स्कूल आने से बचना"],
    1, "Teacher diaries ensure systematic curriculum delivery, intentional lesson planning aligned to competencies, and pedagogical self-reflection.",
    "शिक्षक डायरी से शिक्षण व्यवस्थित और उद्देश्यपूर्ण बनता है तथा यह सुनिश्चित होता है कि निर्धारित पाठ्यचर्या समय पर और गुणवत्ता के साथ पूरी हो।",
    "Medium", ["Lesson Plan", "Teacher Diary", "Pedagogy", "Unit 9"]))

questions.append(q(90, s3, 9, u9, u9_hi, "SCERT and DIET In-Service Training",
    "What is the statutory role of DIETs (District Institutes of Education and Training) and SCERT Uttar Pradesh in school education?",
    "उत्तर प्रदेश में जिला शिक्षा एवं प्रशिक्षण संस्थान (DIET) और राज्य शैक्षिक अनुसंधान एवं प्रशिक्षण परिषद (SCERT) का क्या मुख्य दायित्व है?",
    ["Printing foreign railway timetables", "Designing state school curriculum, developing textbooks, conducting teacher pre-service and in-service professional training, and driving academic quality research", "Issuing driving licences", "Collecting excise taxes"],
    ["रेलवे समय सारणी छापना", "राज्य की पाठ्यचर्या का निर्माण, पाठ्यपुस्तक विकास, शिक्षकों का सेवापूर्व व सेवारत प्रशिक्षण तथा शैक्षणिक गुणवत्ता का संवर्धन करना", "ड्राइविंग लाइसेंस जारी करना", "आबकारी कर वसूलना"],
    1, "SCERT UP and DIETs serve as the academic backbone for curriculum formulation, textbook development, and continuous teacher professional training in the state.",
    "एससीईआरटी और डायट राज्य में शैक्षिक शोध, पाठ्यक्रम निर्माण, पाठ्यपुस्तक लेखन और शिक्षक प्रशिक्षण की शीर्ष संस्थाएं हैं।",
    "Easy", ["SCERT UP", "DIET", "Teacher Training", "Unit 9"]))

# ==========================================
# Unit 10: Office Administration, Record Management, RTI Act 2005 & Minority Rights (91 to 98: 8 Qs)
# ==========================================
u10 = "Unit 10: Office Administration, Records, RTI Act 2005, Workplace Safety & Minority Rights"
u10_hi = "इकाई 10: कार्यालय प्रशासन, अभिलेख प्रबंधन, सूचना का अधिकार 2005, कार्यस्थल सुरक्षा व अल्पसंख्यक अधिकार"

questions.append(q(91, s3, 10, u10, u10_hi, "Scholar Register (SR) - Permanent Record",
    "Why is the 'Scholar Register' (SR / छात्र पंजिका) classified as a permanent school record that must NEVER be destroyed?",
    "विद्यालय की 'छात्र पंजिका' (Scholar Register / SR) को एक स्थायी अभिलेख क्यों माना जाता है जिसे कभी नष्ट नहीं किया जा सकता?",
    ["It contains commercial profit data", "It is the primary conclusive legal evidence of a student's date of birth, parentage, admission, caste, and academic exit, required for lifetime official verifications", "It is used for scrap paper recycling", "It contains teacher holiday leave balances"],
    ["इसमें व्यावसायिक लाभ होता है", "यह विद्यार्थी की जन्म तिथि, माता-पिता के नाम, प्रवेश और विद्यालय छोड़ने का प्राथमिक और विधिक साक्ष्य है जो जीवन भर सत्यापन हेतु आवश्यक होता है", "यह रद्दी कागज है", "इसमें शिक्षकों की छुट्टियां होती हैं"],
    1, "The Scholar Register is a permanent institutional document of evidentiary value in law courts and government service verifications for proving authentic date of birth and identity.",
    "छात्र पंजिका (SR) जन्म तिथि और पहचान का सर्वमान्य कानूनी अभिलेख है जिसे न्यायालयों और सरकारी सेवाओं में प्रमाण माना जाता है।",
    "Medium", ["Scholar Register", "Permanent Records", "School Administration", "Unit 10"]))

questions.append(q(92, s3, 10, u10, u10_hi, "Right to Information (RTI) Act 2005 - Normal Timelines",
    "Under Section 7(1) of the RTI Act 2005, within how many days must a Public Information Officer (PIO) provide requested information to an applicant in ordinary cases?",
    "सूचना का अधिकार (RTI) अधिनियम 2005 की धारा 7(1) के तहत सामान्य मामलों में जन सूचना अधिकारी (PIO) को आवेदन प्राप्ति के कितने दिनों के भीतर सूचना देना अनिवार्य है?",
    ["15 days", "30 days", "45 days", "60 days"],
    ["15 दिन", "30 दिन (Thirty Days)", "45 दिन", "60 दिन"],
    1, "Section 7(1) mandates that the PIO shall provide information or reject the request within 30 days of the receipt of the application.",
    "धारा 7(1) के अनुसार सामान्य मामलों में आवेदन मिलने के 30 दिनों के भीतर सूचना प्रदान करना या कारण सहित अस्वीकार करना अनिवार्य है।",
    "Easy", ["RTI Act 2005", "30 Days", "PIO Duties", "Unit 10"]))

questions.append(q(93, s3, 10, u10, u10_hi, "Transfer Certificate (TC) Issuance Rules",
    "Under UP Intermediate Education Board Regulations, within what time period must a Transfer Certificate (TC) be issued when a parent lawfully applies after clearing all dues?",
    "माध्यमिक शिक्षा परिषद उत्तर प्रदेश के विनियमों के अनुसार सभी देयकों के चुकता होने पर अभिभावक के आवेदन करने के कितने समय के भीतर स्थानांतरण प्रमाण पत्र (TC) जारी किया जाना अनिवार्य है?",
    ["Within 3 to 7 working days", "After one full year", "Only after securing court orders", "Never, TC is optional"],
    ["3 से 7 कार्य दिवसों के भीतर", "एक वर्ष बाद", "केवल न्यायालय के आदेश पर", "टीसी देना ऐच्छिक है"],
    0, "Regulations require that upon lawful application and settlement of dues, the institutional head must issue the Transfer Certificate expeditiously without causing loss of an academic year.",
    "छात्र के हित को ध्यान में रखते हुए वैध आवेदन और देयकों के निपटारे पर 3-7 कार्य दिवसों के भीतर टीसी जारी करना अनिवार्य है।",
    "Medium", ["Transfer Certificate", "UPMSP Regulations", "Student Records", "Unit 10"]))

questions.append(q(94, s3, 10, u10, u10_hi, "Article 30 of Constitution - Minority Educational Institutions",
    "Under Article 30(1) of the Constitution of India, what fundamental right is guaranteed to religious and linguistic minorities regarding education?",
    "भारतीय संविधान के अनुच्छेद 30(1) के अंतर्गत धार्मिक और भाषाई अल्पसंख्यकों को शिक्षा के संदर्भ में कौन सा मौलिक अधिकार प्राप्त है?",
    ["Right to establish and administer educational institutions of their choice", "Exemption from paying any student fees", "Right to print their own national currency", "Right to ban state syllabus inspection"],
    ["अपनी पसंद के शिक्षण संस्थानों की स्थापना और उनका प्रशासन करने का अधिकार (Establish and administer)", "छात्र शुल्क से पूर्ण छूट", "अपनी मुद्रा छापने का अधिकार", "निरीक्षण पर रोक का अधिकार"],
    0, "Article 30(1) guarantees all minorities, whether based on religion or language, the right to establish and administer educational institutions of their choice.",
    "अनुच्छेद 30(1) सभी धार्मिक व भाषाई अल्पसंख्यकों को अपनी रुचि की शिक्षण संस्थाओं की स्थापना और उनके प्रशासन का मौलिक अधिकार देता है।",
    "Easy", ["Article 30", "Minority Institutions", "Constitution", "Unit 10"]))

questions.append(q(95, s3, 10, u10, u10_hi, "RPwD Act 2016 - Barrier-Free Access",
    "Under Section 16 of the Rights of Persons with Disabilities (RPwD) Act 2016, what infrastructure must every school mandatorily provide on campus?",
    "दिव्यांगजन अधिकार अधिनियम 2016 की धारा 16 के अनुसार प्रत्येक विद्यालय को अपने परिसर में अनिवार्य रूप से कौन सी अवसंरचना उपलब्ध करानी होगी?",
    ["Helipads", "Barrier-free access, ramps with handrails, and accessible toilets for students with disabilities", "Swimming pools for all classes", "Elevated boundary watch towers"],
    ["हेलीपैड", "बाधा-मुक्त पहुंच (Barrier-Free Access), रेलिंग युक्त रैंप और दिव्यांग-अनुकूल शौचालय", "कक्षाओं के लिए तरणताल", "वॉच टावर"],
    1, "Section 16 mandates that recognized educational institutions must provide barrier-free access, accessible infrastructure, and reasonable accommodation to children with disabilities.",
    "धारा 16 के तहत दिव्यांग बच्चों की सुगम पहुंच के लिए रैंप, रेलिंग, सुलभ शौचालय और बाधा-मुक्त वातावरण तैयार करना कानूनी रूप से अनिवार्य है।",
    "Easy", ["RPwD Act 2016", "Barrier Free Access", "Inclusive Infrastructure", "Unit 10"]))

questions.append(q(96, s3, 10, u10, u10_hi, "UP Right to Public Services Act",
    "Under the Uttar Pradesh Janhit Guarantee Adhiniyam (Right to Public Services Act), what happens if a designated school authority fails to deliver notified student services (like marksheets/certificates) within the stipulated time limit?",
    "उत्तर प्रदेश जनहित गारंटी अधिनियम के अंतर्गत यदि कोई प्राधिकारी निर्धारित समय सीमा में अधिसूचित सेवाएं (जैसे अंकपत्र/प्रमाण पत्र) देने में विफल रहता है, तो क्या प्रावधान है?",
    ["The officer is given a monetary prize", "The applicant can file an appeal before the First Appellate Authority and a monetary penalty can be imposed on the defaulting official", "The school is shut down immediately", "No remedy exists"],
    ["अधिकारी को पुरस्कार मिलता है", "आवेदक प्रथम अपीलीय अधिकारी के समक्ष अपील कर सकता है और दोषी अधिकारी पर दैनिक वित्तीय जुर्माना लगाया जा सकता है", "स्कूल तुरंत बंद हो जाता है", "कोई उपाय नहीं है"],
    1, "The Act guarantees time-bound delivery of notified public services, imposing penalties on officers who fail to provide services without reasonable cause.",
    "जनहित गारंटी कानून समयबद्ध सेवा की गारंटी देता है और कार्य में अकारण विलंब करने वाले अधिकारी पर जुर्माना लगाने का प्रावधान करता है।",
    "Medium", ["Janhit Guarantee", "Right to Services", "UP Administration", "Unit 10"]))

questions.append(q(97, s3, 10, u10, u10_hi, "Service Book Maintenance in Aided Schools",
    "In UP government-aided secondary schools, what is the legal status of the Teacher's Service Book and who maintains its safe custody?",
    "उत्तर प्रदेश के अशासकीय सहायता प्राप्त माध्यमिक विद्यालयों में शिक्षक की सेवा पुस्तिका (Service Book) की वैधानिक स्थिति क्या है और इसकी सुरक्षित अभिरक्षा किसके पास होती है?",
    ["Maintained in duplicate; one copy in institutional safe custody of the Principal and one copy with the employee, with annual verification by DIOS", "Kept at local stationary shops", "Thrown away upon completion of probation", "Retained by private student union"],
    ["दो प्रतियों में रखी जाती है; एक प्रति प्रधानाचार्य की सुरक्षित अभिरक्षा में तथा दूसरी कर्मचारी के पास, जिसका वार्षिक सत्यापन किया जाता है", "स्टेशनरी दुकान पर रखी जाती है", "परिवीक्षा पूरी होने पर नष्ट की जाती है", "छात्र संघ के पास रहती है"],
    0, "The Service Book is an official record of the teacher's service career, leaves, promotions, and pay fixations, kept in safe custody of the Principal and verified regularly.",
    "सेवा पुस्तिका शिक्षक के पूरे सेवाकाल, वेतन निर्धारण और अवकाशों का प्रामाणिक सरकारी अभिलेख है जिसकी सुरक्षित अभिरक्षा संस्था प्रमुख के पास होती है।",
    "Medium", ["Service Book", "Safe Custody", "Records Management", "Unit 10"]))

questions.append(q(98, s3, 10, u10, u10_hi, "UP State Education Directorate Structure",
    "Where is the Directorate of Secondary Education (माध्यमिक शिक्षा निदेशालय) of Uttar Pradesh primarily headquartered?",
    "उत्तर प्रदेश माध्यमिक शिक्षा निदेशालय का मुख्य प्रशासनिक मुख्यालय कहाँ स्थित है?",
    ["Prayagraj (प्रयागराज)", "Agra", "Meerut", "Jhansi"],
    ["प्रयागराज (Prayagraj / Allahabad)", "आगरा", "मेरठ", "झांसी"],
    0, "The Directorate of Secondary Education, Uttar Pradesh, is headquartered in Prayagraj (with secondary camp office in Lucknow).",
    "उप्र माध्यमिक शिक्षा निदेशालय का मुख्य मुख्यालय प्रयागराज (इलाहाबाद) में स्थित है।",
    "Easy", ["Education Directorate", "Prayagraj", "UP Education", "Unit 10"]))

# ==========================================
# Unit 11: School Financial Administration, Budgeting, PFMS, GeM, Salaries Act 1971 & Accounts (99 to 106: 8 Qs)
# ==========================================
u11 = "Unit 11: School Financial Administration, Budgeting, PFMS, GeM, Salaries Act 1971 & Accounts"
u11_hi = "इकाई 11: विद्यालय वित्तीय प्रशासन, बजट, पीएफएमएस, जेम, उप्र वेतन भुगतान अधिनियम 1971 व लेखा प्रणाली"

questions.append(q(99, s3, 11, u11, u11_hi, "UP Payment of Salaries Act 1971 - Section 5 Joint Account",
    "Under Section 5 of the UP High Schools and Intermediate Colleges (Payment of Salaries of Teachers and Other Employees) Act 1971 (UP Act No. 24 of 1971), how is the salary payment account operated?",
    "उत्तर प्रदेश हाईस्कूल तथा इंटरमीडिएट कॉलेज (अध्यापकों और अन्य कर्मचारियों के वेतन का भुगतान) अधिनियम 1971 की धारा 5 के अनुसार वेतन भुगतान खाता किस प्रकार संचालित होता है?",
    ["Operated solely by the Manager of the Committee of Management", "Operated jointly by the Manager (or authorized signatory) and the District Inspector of Schools (DIOS) in a scheduled bank", "Operated by the school peon in cash", "Operated by the Gram Pradhan"],
    ["केवल प्रबंधक के हस्ताक्षर से", "प्रबंधक (या प्राधिकृत हस्ताक्षरी) तथा जिला विद्यालय निरीक्षक (DIOS) के संयुक्त हस्ताक्षर से (Joint Account)", "विद्यालय चपरासी द्वारा नकद", "ग्राम प्रधान द्वारा"],
    1, "Section 5 of the 1971 Act mandates opening a separate Salary Account in a scheduled bank operated jointly by the representative of management and the DIOS to guarantee timely salary payments.",
    "वेतन अधिनियम 1971 की धारा 5 के अनुसार शिक्षकों के वेतन का भुगतान प्रबंधक और DIOS के संयुक्त बैंक खाते से सुरक्षित व समयबद्ध रूप से किया जाता है।",
    "Hard", ["Salaries Act 1971", "Joint Account", "DIOS", "Unit 11"]))

questions.append(q(100, s3, 11, u11, u11_hi, "Maintenance Grant and Pupil Development Fund",
    "In recognized aided institutions, under which accounting head are student development fees deposited, and who jointly operates this institutional account?",
    "सहायता प्राप्त माध्यमिक विद्यालयों में छात्र विकास निधि (Vidyalaya Vikas Nidhi) किस खाते में जमा की जाती है और इसका संचालन कौन करता है?",
    ["Deposited in Vidyalaya Nidhi / Pupil Development Fund, operated jointly by the Principal and Management authorized signatory / student welfare representative", "Deposited in private personal account of the Manager", "Transferred to commercial advertising agencies", "Distributed in cash among clerks"],
    ["विद्यालय निधि खाते में, जिसका संचालन प्रधानाचार्य द्वारा वित्तीय नियमों के अधीन संस्था हित में किया जाता है", "प्रबंधक के निजी खाते में", "विज्ञापन एजेंसियों को दिया जाता है", "लिपिकों में बांटा जाता है"],
    0, "Pupil development fees and institutional funds are deposited in the designated Vidyalaya Nidhi bank account and operated for legitimate school improvement according to the Financial Handbook.",
    "विद्यालय निधि का संचालन संस्था प्रधान (प्रधानाचार्य) द्वारा वित्तीय नियमों के तहत छात्र कल्याण और विद्यालय विकास कार्यों के लिए किया जाता है।",
    "Medium", ["Vidyalaya Nidhi", "School Accounts", "Financial Handbook", "Unit 11"]))

questions.append(q(101, s3, 11, u11, u11_hi, "GeM Portal Procurement for School Supplies",
    "Why has procurement through the Government e-Marketplace (GeM) been made mandatory for government and aided educational institutions in Uttar Pradesh?",
    "उत्तर प्रदेश में सरकारी एवं सहायता प्राप्त शिक्षण संस्थानों हेतु गवर्नमेंट ई-मार्केटप्लेस (GeM) से खरीद अनिवार्य क्यों की गई है?",
    ["To promote local black market trading", "To ensure complete transparency, competitive market pricing, speed, accountability, and online auditable public procurement", "To eliminate computerized accounts", "To purchase goods without bills"],
    ["स्थानीय कालाबाजारी को बढ़ावा देने के लिए", "सार्वजनिक खरीद में पूर्ण पारदर्शिता, प्रतिस्पर्धी दरें, गति, जवाबदेही और ऑनलाइन ऑडिट योग्य व्यवस्था सुनिश्चित करने हेतु", "कंप्यूटरीकृत खातों को बंद करने के लिए", "बिना बिल के सामान खरीदने के लिए"],
    1, "GeM provides an open, transparent, and rule-governed procurement portal that checks inflated prices and eliminates corrupt offline cartels.",
    "GeM पोर्टल सरकारी खरीद में बिचौलियों को समाप्त कर पूर्ण पारदर्शिता, उचित मूल्य और डिजिटल ऑडिट सुनिश्चित करता है।",
    "Easy", ["GeM", "Public Procurement", "Transparency", "Unit 11"]))

questions.append(q(102, s3, 11, u11, u11_hi, "Cash Book and Vouching Discipline",
    "According to the Financial Handbook (वित्तीय हस्तपुस्तिका), what is the inviolable rule regarding payment vouchers supporting entries in the school Cash Book?",
    "वित्तीय हस्तपुस्तिका (Financial Handbook) के अनुसार विद्यालय रोकड़ बही में दर्ज भुगतानों के समर्थक वाउचरों (Vouchers) के संबंध में क्या अनिवार्य नियम है?",
    ["No vouchers are needed if payment is under ₹50,000", "Every financial entry must be supported by a stamped, dated, serial-numbered payee voucher duly passed for payment by the Principal", "Vouchers may be made verbally without paper receipts", "Vouchers should be discarded every week"],
    ["₹50,000 से कम के भुगतान पर वाउचर की जरूरत नहीं", "रोकड़ बही की प्रत्येक प्रविष्टि के समर्थन में रसीदी टिकट युक्त, दिनांकित, क्रमबद्ध और प्रधानाचार्य द्वारा पास किया गया वाउचर संलग्न होना अनिवार्य है", "वाउचर मौखिक हो सकते हैं", "वाउचर हर हफ्ते फेंक दिए जाने चाहिए"],
    1, "The Financial Handbook strictly mandates that no payment can be entered in the Cash Book without a valid, certified voucher showing the purpose and payee acknowledgment.",
    "रोकड़ बही में बिना प्रमाणित और सक्षम अधिकारी द्वारा पास किए गए वाउचर के कोई भी प्रविष्टि मान्य नहीं होती।",
    "Medium", ["Cash Book", "Vouchers", "Financial Handbook", "Unit 11"]))

questions.append(q(103, s3, 11, u11, u11_hi, "National Pension System (NPS) vs GPF",
    "For teachers and employees appointed in UP aided secondary schools on or after 1 April 2005, which pension architecture is applicable?",
    "1 अप्रैल 2005 या उसके पश्चात उत्तर प्रदेश के सहायता प्राप्त माध्यमिक विद्यालयों में नियुक्त शिक्षकों व कर्मचारियों पर कौन सी पेंशन योजना लागू है?",
    ["Old Pension Scheme (OPS) with GPF", "National Pension System (NPS / परिभाषित अंशदायी पेंशन योजना)", "No pension of any kind", "Private mutual fund scheme exclusively"],
    ["पुरानी पेंशन योजना (OPS/GPF)", "राष्ट्रीय पेंशन प्रणाली (NPS - National Pension System / परिभाषित अंशदायी पेंशन)", "किसी भी प्रकार की कोई पेंशन नहीं", "निजी म्यूचुअल फंड"],
    1, "Employees recruited on or after 1 April 2005 are covered under the National Pension System (NPS), with regular monthly contributions from employee and matching state share through PRAN.",
    "1 अप्रैल 2005 से नियुक्त कर्मियों हेतु एनपीएस (NPS) लागू है जिसमें प्रान (PRAN) खाते के माध्यम से अंशदान जमा होता है।",
    "Easy", ["NPS", "Pension Rules", "PRAN", "Unit 11"]))

questions.append(q(104, s3, 11, u11, u11_hi, "Goods and Services Tax (GST) & TDS under GST",
    "Under Section 51 of the GST Act, what is the mandatory rate of Tax Deducted at Source (TDS) on payments made to suppliers for contracts exceeding ₹2,50,000 by government departments?",
    "जीएसटी अधिनियम की धारा 51 के अंतर्गत सरकारी विभागों द्वारा ₹2,50,000 से अधिक के अनुबंधों पर आपूर्तिकर्ताओं को भुगतान करते समय कितने प्रतिशत स्रोत पर कर (GST-TDS) काटा जाना अनिवार्य है?",
    ["1% CGST + 1% SGST (Total 2%)", "5% total", "12% total", "18% total"],
    ["1% CGST + 1% SGST (कुल 2%)", "कुल 5%", "कुल 12%", "कुल 18%"],
    0, "Section 51 of the CGST/SGST Act requires specified government entities to deduct TDS at the rate of 2% (1% CGST + 1% SGST) on taxable contract payments exceeding ₹2.5 lakh.",
    "जीएसटी कानून के तहत ₹2.5 लाख से अधिक के अनुबंध भुगतानों पर 2% (1% केंद्रीय + 1% राज्य) की दर से जीएसटी-टीडीएस काटा जाता है।",
    "Hard", ["GST TDS", "Section 51", "Financial Administration", "Unit 11"]))

questions.append(q(105, s3, 11, u11, u11_hi, "Travel Allowance (TA) Rules in UP Government",
    "Under UP State Travelling Allowance Rules, what is the fundamental condition for claiming daily allowance (DA) and mileage on official tour duty?",
    "उत्तर प्रदेश यात्रा भत्ता (TA) नियमावली के अंतर्गत आधिकारिक दौरे (Tour Duty) पर दैनिक भत्ता और माइलेज दावा करने की मूल शर्त क्या है?",
    ["Tour must be performed for private recreation", "Tour must be approved in advance by the competent sanctioning authority, strictly performed for public duty beyond headquarters radius, and supported by valid tickets/bills", "No tour diary is required", "Tours can be claimed for travelling to local markets"],
    ["दौरा निजी मनोरंजन हेतु होना चाहिए", "दौरा सक्षम प्राधिकारी द्वारा पूर्व-स्वीकृत होना चाहिए, मुख्यालय के दायरे से बाहर केवल शासकीय कार्य हेतु किया गया हो और टिकटों से समर्थित हो", "टूर डायरी की आवश्यकता नहीं", "स्थानीय बाजार जाने पर भी क्लेम हो सकता है"],
    1, "TA rules stipulate that tours must have prior administrative approval and be in the interest of public service, with accurate tour diaries and travel proofs submitted.",
    "यात्रा भत्ता नियमों के तहत शासकीय कार्य हेतु किया गया पूर्व-स्वीकृत दौरा ही वैध माना जाता है और इसके लिए यात्रा प्रमाण प्रस्तुत करना अनिवार्य है।",
    "Medium", ["TA Rules", "Travelling Allowance", "Financial Rules", "Unit 11"]))

questions.append(q(106, s3, 11, u11, u11_hi, "Audit Objections and Settlement",
    "When the State Local Fund Accounts Audit (स्थानीय निधि लेखा परीक्षा) raises an audit objection against an expenditure incurred by a school, what is the Principal's immediate administrative duty?",
    "जब स्थानीय निधि लेखा परीक्षा (Audit) द्वारा विद्यालय के किसी व्यय पर लेखा परीक्षा आपत्ति (Audit Objection) दर्ज की जाती है, तो प्रधानाचार्य का तत्काल प्रशासनिक कर्तव्य क्या होता है?",
    ["Ignore the audit report completely", "Examine the grounds of objection, prepare a detailed factual reply along with supporting vouchers/records, and submit compliance to the audit officer for dropping the objection", "Destroy the relevant Cash Book pages", "File a police complaint against the auditors"],
    ["ऑडिट रिपोर्ट की पूरी तरह अनदेखी करना", "आपत्ति के कारणों की जांच करना, समर्थक वाउचरों और साक्ष्यों के साथ विस्तृत तथ्यात्मक उत्तर तैयार करना और आपत्ति के निस्तारण हेतु अनुपालन आख्या प्रस्तुत करना", "रोकड़ बही के पन्ने फाड़ देना", "ऑडिटरों के खिलाफ शिकायत करना"],
    1, "Audit objections must be addressed expeditiously through detailed parawise comments supported by documentary evidence to achieve formal audit settlement.",
    "लेखा परीक्षा आपत्तियों का निस्तारण अभिलेखों और वाउचरों के आधार पर विस्तृत अनुपालन आख्या (Compliance Report) प्रस्तुत करके किया जाता है।",
    "Medium", ["Audit Objections", "Local Fund Accounts", "Financial Discipline", "Unit 11"]))

# ==========================================
# Unit 12: Education Schemes & Flagship Programmes in UP & Centre (107 to 120: 14 Qs)
# ==========================================
u12 = "Unit 12: Education Schemes & Flagship Programmes in Uttar Pradesh & Centre"
u12_hi = "इकाई 12: उत्तर प्रदेश एवं केंद्र सरकार की प्रमुख शैक्षिक योजनाएं, कार्यक्रम व प्रोत्साहन"

questions.append(q(107, s3, 12, u12, u12_hi, "Project Alankar (प्रोजेक्ट अलंकार)",
    "What is the core objective of 'Project Alankar' launched by the Government of Uttar Pradesh for secondary education?",
    "उत्तर प्रदेश सरकार द्वारा माध्यमिक शिक्षा के क्षेत्र में संचालित 'प्रोजेक्ट अलंकार' (Project Alankar) का मुख्य उद्देश्य क्या है?",
    ["Distributing uniforms to primary students", "Revitalizing, upgrading, and transforming the infrastructure, laboratories, libraries, and classrooms of old government and aided secondary schools", "Buying luxury cars for school managers", "Closing down rural schools"],
    ["प्राथमिक बच्चों को यूनिफॉर्म देना", "पुराने राजकीय एवं अशासकीय सहायता प्राप्त माध्यमिक विद्यालयों के जर्जर भवनों का जीर्णोद्धार, आधुनिक प्रयोगशालाओं, पुस्तकालयों और अवसंरचना का सुदृढ़ीकरण", "प्रबंधकों को लक्जरी कारें देना", "ग्रामीण स्कूल बंद करना"],
    1, "Project Alankar provides substantial financial grants to renovate, modernize, and augment facilities in aging government and non-government aided inter colleges in UP.",
    "प्रोजेक्ट अलंकार के तहत उत्तर प्रदेश के सहायता प्राप्त और राजकीय माध्यमिक विद्यालयों के भवनों का पुनरोद्धार, स्मार्ट क्लास, लैब और लाइब्रेरी का आधुनिकीकरण किया जा रहा है।",
    "Easy", ["Project Alankar", "UP Secondary Schemes", "Infrastructure", "Unit 12"]))

questions.append(q(108, s3, 12, u12, u12_hi, "Operation Kayakalp (ऑपरेशन कायाकल्प)",
    "How many mandatory core infrastructural and saturation benchmarks (such as clean drinking water, separate toilets, electrification, tiled classrooms) are evaluated under 'Operation Kayakalp' in UP schools?",
    "उत्तर प्रदेश के विद्यालयों में 'ऑपरेशन कायाकल्प' के अंतर्गत शुद्ध पेयजल, पृथक शौचालय, विद्युतीकरण, टाइलीकरण सहित कितने अनिवार्य बुनियादी अवस्थापना मानकों का संतृप्तीकरण किया जा रहा है?",
    ["10 benchmarks", "14 benchmarks", "19 infrastructure benchmarks (19 पैरामीटर)", "25 benchmarks"],
    ["10 मानक", "14 मानक", "19 बुनियादी अवस्थापना मानक (19 Parameters)", "25 मानक"],
    2, "Operation Kayakalp targets transforming school infrastructure across 19 defined infrastructural parameters including safe water, handwash, child-friendly toilets, electrification, and tiled floors.",
    "ऑपरेशन कायाकल्प में 19 बुनियादी अवस्थापना सुविधाओं (पैरामीटर्स) का संतृप्तीकरण किया जा रहा है जिससे विद्यालयों की भौतिक दशा में क्रांतिकारी सुधार हुआ है।",
    "Medium", ["Operation Kayakalp", "19 Parameters", "UP Infrastructure", "Unit 12"]))

questions.append(q(109, s3, 12, u12, u12_hi, "PM POSHAN - Nutritional Norms",
    "Under the statutory PM POSHAN Scheme norms, what is the minimum caloric and protein intake prescribed for students in Upper Primary classes (Classes 6 to 8)?",
    "वैधानिक पीएम पोषण योजना के मानकों के अनुसार उच्च प्राथमिक स्तर (कक्षा 6 से 8) के विद्यार्थियों हेतु मध्याह्न भोजन में प्रतिदिन न्यूनतम कितनी कैलोरी और प्रोटीन निर्धारित है?",
    ["450 calories and 12 grams of protein", "700 calories and 20 grams of protein", "900 calories and 30 grams of protein", "350 calories and 8 grams of protein"],
    ["450 कैलोरी तथा 12 ग्राम प्रोटीन", "700 कैलोरी तथा 20 ग्राम प्रोटीन (700 kcal & 20g Protein)", "900 कैलोरी तथा 30 ग्राम प्रोटीन", "350 कैलोरी तथा 8 ग्राम प्रोटीन"],
    1, "PM POSHAN norms mandate 450 calories and 12g protein for Primary (Classes 1-5), and 700 calories and 20g protein for Upper Primary (Classes 6-8).",
    "उच्च प्राथमिक स्तर (कक्षा 6-8) पर पीएम पोषण में प्रतिदिन 700 कैलोरी ऊर्जा और 20 ग्राम प्रोटीन युक्त पौष्टिक गर्म पका भोजन दिया जाना अनिवार्य है।",
    "Easy", ["PM POSHAN", "Nutrition Norms", "Mid-Day Meal", "Unit 12"]))

questions.append(q(110, s3, 12, u12, u12_hi, "Tithi Bhojan Initiative",
    "What is the concept of 'Tithi Bhojan' encouraged under PM POSHAN guidelines in schools?",
    "पीएम पोषण योजना के अंतर्गत विद्यालयों में प्रोत्साहित की जाने वाली 'तिथि भोजन' (Tithi Bhojan) संकल्पना क्या है?",
    ["A commercial buffet system for teachers", "Community participation where local citizens celebrate birthdays, festivals, or family milestones by contributing special nutritious meals, fruits, or sweets to school children", "A fast observed without food", "An examination fee deduction"],
    ["शिक्षकों के लिए बुफे", "सामुदायिक सहभागिता जिसके तहत नागरिक अपने जन्मदिन, वर्षगांठ या त्योहारों पर स्कूली बच्चों को विशेष पौष्टिक भोजन, फल या मिष्ठान उपलब्ध कराते हैं", "बिना भोजन का उपवास", "परीक्षा शुल्क कटौती"],
    1, "Tithi Bhojan encourages community members to voluntarily provide nutritious food, sweets, and fruits to students on special family or festive occasions.",
    "तिथि भोजन समुदाय आधारित पहल है जिसमें स्थानीय लोग अपने पारिवारिक उत्सवों पर विद्यालय के बच्चों को पौष्टिक भोजन या फल खिलाते हैं।",
    "Easy", ["Tithi Bhojan", "Community Participation", "PM POSHAN", "Unit 12"]))

questions.append(q(111, s3, 12, u12, u12_hi, "NIPUN Bharat Mission - Lakshya in UP",
    "Under NIPUN Bharat Mission in Uttar Pradesh, what is the 'NIPUN Lakshya' for reading fluency at the end of Grade 2?",
    "उत्तर प्रदेश में निपुण भारत मिशन (NIPUN Bharat) के अंतर्गत कक्षा 2 के अंत में धाराप्रवाह पठन हेतु क्या 'निपुण लक्ष्य' निर्धारित किया गया है?",
    ["15 words per minute", "45 words per minute with meaning (45 शब्द प्रति मिनट अर्थ सहित)", "90 words per minute", "120 words per minute"],
    ["15 शब्द प्रति मिनट", "45 शब्द प्रति मिनट अर्थ सहित (45 WPM with Comprehension)", "90 शब्द प्रति मिनट", "120 शब्द प्रति मिनट"],
    1, "NIPUN Lakshya for Grade 2 in UP specifies reading an unfamiliar age-appropriate text at 45 words per minute accurately with comprehension.",
    "कक्षा 2 के लिए निपुण लक्ष्य 45 शब्द प्रति मिनट की गति से अर्थ के साथ पढ़ना तथा 75% प्रश्नों के सही उत्तर देना है।",
    "Medium", ["NIPUN Bharat", "NIPUN Lakshya", "FLN", "Unit 12"]))

questions.append(q(112, s3, 12, u12, u12_hi, "NISHTHA Integrated Teacher Training",
    "What is 'NISHTHA' (National Initiative for School Heads' and Teachers' Holistic Advancement) implemented across Uttar Pradesh?",
    "उत्तर प्रदेश सहित देश भर में संचालित 'निष्ठा' (NISHTHA) का मुख्य उद्देश्य क्या है?",
    ["A sports coaching academy for cricket", "The world's largest integrated capacity-building training program for school heads and elementary/secondary teachers to improve foundational teaching competencies and holistic pedagogy", "An automated bus ticketing system", "A private coaching syndicate"],
    ["क्रिकेट कोचिंग अकादमी", "विद्यालय प्रमुखों और शिक्षकों की क्षमताओं का संवर्धन करने वाला विश्व का सबसे बड़ा एकीकृत शिक्षक प्रशिक्षण कार्यक्रम ताकि शिक्षण-अधिगम की गुणवत्ता बढ़े", "बस टिकटिंग प्रणाली", "निजी कोचिंग सिंडिकेट"],
    1, "NISHTHA trains elementary and secondary teachers and school heads in learner-centred pedagogy, experiential learning, and inclusive education.",
    "निष्ठा (NISHTHA) शिक्षकों और प्रधानाचार्यों के समग्र विकास का राष्ट्रीय प्रशिक्षण कार्यक्रम है जो दीक्षा मंच और ऑफलाइन दोनों माध्यमों से संचालित है।",
    "Easy", ["NISHTHA", "Teacher Training", "Capacity Building", "Unit 12"]))

questions.append(q(113, s3, 12, u12, u12_hi, "School Chalo Abhiyan in UP",
    "What is the primary mission objective of the annual 'School Chalo Abhiyan' organized at the beginning of each academic session in Uttar Pradesh?",
    "उत्तर प्रदेश में प्रत्येक शैक्षणिक सत्र के प्रारंभ में आयोजित होने वाले 'स्कूल चलो अभियान' का प्राथमिक उद्देश्य क्या है?",
    ["To conduct summer vacation picnics for principals", "To achieve 100% saturation in school enrolment, tracking dropouts, and ensuring that no child between 6 to 14 years remains out of school", "To construct commercial market complexes", "To distribute cinema tickets"],
    ["प्रधानाचार्यों के लिए पिकनिक आयोजित करना", "6 से 14 वर्ष के शत-प्रतिशत बच्चों का स्कूलों में नामांकन सुनिश्चित करना तथा ड्रॉपआउट बच्चों को शिक्षा की मुख्यधारा से जोड़ना", "व्यावसायिक बाजार बनाना", "सिनेमा टिकट बांटना"],
    1, "School Chalo Abhiyan is UP's massive statewide mobilization campaign to achieve universal enrolment and re-integrate out-of-school children.",
    "स्कूल चलो अभियान का लक्ष्य उत्तर प्रदेश के प्रत्येक बच्चे का विद्यालय में शत-प्रतिशत नामांकन और ठहराव सुनिश्चित करना है।",
    "Easy", ["School Chalo Abhiyan", "Universal Enrolment", "UP Initiatives", "Unit 12"]))

questions.append(q(114, s3, 12, u12, u12_hi, "Project Sharda (शारदा)",
    "What is 'Project Sharda' (स्कूल हर दिन आएं) operated under Samagra Shiksha in Uttar Pradesh?",
    "उत्तर प्रदेश में समग्र शिक्षा के अंतर्गत संचालित 'शारदा' (Sharda / स्कूल हर दिन आएं) परियोजना का मुख्य फोकस क्या है?",
    ["Digital music production in schools", "Identification, enrolment, tracking, and bridge-course remedial learning for Out-of-School Children (OoSC)", "A private scholarship for foreign travel", "Teacher vehicle loans"],
    ["डिजिटल संगीत निर्माण", "आउट-ऑफ-स्कूल बच्चों (Out of School Children / OoSC) का चिन्हांकन, नामांकन, ट्रैकिंग और उन्हें विशेष ब्रिज कोर्स के माध्यम से आयु-संगत कक्षा में जोड़ना", "विदेश यात्रा छात्रवृत्ति", "वाहन ऋण"],
    1, "Project Sharda identifies out-of-school children across UP, enrolls them in age-appropriate classes, and provides special bridge training for mainstreaming.",
    "शारदा (SHARDA) परियोजना ड्रापआउट और कभी स्कूल न गए बच्चों को चिन्हित कर विशेष उपचारात्मक प्रशिक्षण द्वारा मुख्यधारा में लाने का अभियान है।",
    "Medium", ["Project Sharda", "Out of School Children", "Samagra Shiksha", "Unit 12"]))

questions.append(q(115, s3, 12, u12, u12_hi, "National Cadet Corps (NCC) in Secondary Schools",
    "What is the foundational motto of the National Cadet Corps (NCC) functioning in secondary and senior secondary schools?",
    "माध्यमिक एवं उच्चतर माध्यमिक विद्यालयों में संचालित राष्ट्रीय कैडेट कोर (NCC) का मूल ध्येय वाक्य (Motto) क्या है?",
    ["Service and Sacrifice", "Unity and Discipline (एकता और अनुशासन)", "Courage and Truth", "Faith and Knowledge"],
    ["सेवा और त्याग", "एकता और अनुशासन (Unity and Discipline)", "साहस और सत्य", "निष्ठा और ज्ञान"],
    1, "The motto of NCC is 'Unity and Discipline' (एकता और अनुशासन), adopted in December 1957.",
    "एनसीसी (NCC) का आदर्श वाक्य 'एकता और अनुशासन' (Unity and Discipline) है।",
    "Easy", ["NCC", "Unity and Discipline", "Youth Programs", "Unit 12"]))

questions.append(q(116, s3, 12, u12, u12_hi, "National Service Scheme (NSS)",
    "What is the official motto of the National Service Scheme (NSS) functioning in higher secondary schools and colleges?",
    "हायर सेकेंडरी स्कूलों और कॉलेजों में संचालित राष्ट्रीय सेवा योजना (NSS) का आधिकारिक आदर्श वाक्य क्या है?",
    ["'Not Me But You' (मैं नहीं, आप)", "'Only Me and Mine'", "'Knowledge is Power'", "'Truth Alone Triumphs'"],
    ["'मैं नहीं, आप' (Not Me But You)", "'केवल मैं और मेरा'", "'ज्ञान ही शक्ति है'", "'सत्यमेव जयते'"],
    0, "The motto of the National Service Scheme (NSS) is 'NOT ME BUT YOU', reflecting democratic living and self-less service.",
    "राष्ट्रीय सेवा योजना (NSS) का ध्येय वाक्य 'मैं नहीं, आप' (Not Me But You) है, जो निःस्वार्थ समाज सेवा पर बल देता है।",
    "Easy", ["NSS", "Not Me But You", "Youth Welfare", "Unit 12"]))

questions.append(q(117, s3, 12, u12, u12_hi, "Bharat Scouts and Guides",
    "Who is honoured as the founder of the worldwide Scouting movement commemorated in the Scout Guide activities in secondary schools?",
    "माध्यमिक विद्यालयों में संचालित स्काउट गाइड गतिविधियों के जन्मदाता के रूप में विश्वभर में किन्हें सम्मानित किया जाता है?",
    ["Lord Baden-Powell (लॉर्ड बेडेन पॉवेल)", "Henry Dunant", "William Smith", "Alexander Graham Bell"],
    ["लॉर्ड बेडेन पॉवेल (Lord Baden-Powell)", "हेनरी ड्यूनेंट", "विलियम स्मिथ", "ग्राहम बेल"],
    0, "Robert Baden-Powell founded the Boy Scouts movement in 1907 in Britain, forming the foundation of the Bharat Scouts and Guides in India.",
    "लॉर्ड बेडेन पॉवेल ने स्काउटिंग आंदोलन की स्थापना की थी। भारत में भारत स्काउट्स एवं गाइड्स इसी का अधिकृत राष्ट्रीय संगठन है।",
    "Easy", ["Scouts and Guides", "Baden Powell", "Unit 12"]))

questions.append(q(118, s3, 12, u12, u12_hi, "Swami Vivekananda Youth Empowerment Scheme in UP",
    "Under the 'Swami Vivekananda Youth Empowerment Scheme' (स्वामी विवेकानंद युवा सशक्तिकरण योजना) in Uttar Pradesh, what free digital resource is distributed to eligible students?",
    "उत्तर प्रदेश में 'स्वामी विवेकानंद युवा सशक्तिकरण योजना' के अंतर्गत पात्र विद्यार्थियों को कौन सा निःशुल्क डिजिटल उपकरण वितरित किया जा रहा है?",
    ["Free smart bicycles", "Free Tablets and Smartphones for digital learning and access to educational portals", "Free television sets", "Free radio receivers"],
    ["स्मार्ट साइकिलें", "डिजिटल अध्ययन व शैक्षिक मंचों से जुड़ने हेतु निःशुल्क टैबलेट और स्मार्टफोन (Free Tablets & Smartphones)", "टेलीविजन सेट", "रेडियो"],
    1, "The Swami Vivekananda Youth Empowerment Scheme provides free smartphones and tablets to youth enrolled in higher and secondary technical institutions in UP.",
    "इस योजना के तहत उत्तर प्रदेश के विद्यार्थियों को डिजिटल शिक्षा से जोड़ने हेतु निःशुल्क स्मार्टफोन और टैबलेट वितरित किए जाते हैं।",
    "Easy", ["Swami Vivekananda Youth Scheme", "Free Tablet Smartphone", "UP Schemes", "Unit 12"]))

questions.append(q(119, s3, 12, u12, u12_hi, "State Teacher Awards in Uttar Pradesh",
    "On which date are the prestigious State Teacher Awards (राज्य शिक्षक पुरस्कार) officially conferred annually in Uttar Pradesh to outstanding educators?",
    "उत्तर प्रदेश में उत्कृष्ट शिक्षकों को प्रतिवर्ष प्रतिष्ठित 'राज्य शिक्षक पुरस्कार' किस तिथि को औपचारिक रूप से प्रदान किया जाता है?",
    ["August 15 (Independence Day)", "September 5 (Teachers' Day - शिक्षक दिवस)", "October 2 (Gandhi Jayanti)", "January 26 (Republic Day)"],
    ["15 अगस्त", "5 सितंबर (शिक्षक दिवस / Teachers' Day)", "2 अक्टूबर", "26 जनवरी"],
    1, "State Teacher Awards are presented every year on 5th September (Teachers' Day), commemorating the birth anniversary of Dr. Sarvepalli Radhakrishnan.",
    "डॉ. सर्वपल्ली राधाकृष्णन के जन्मदिवस (5 सितंबर) को शिक्षक दिवस के अवसर पर राज्य शिक्षक पुरस्कार प्रदान किए जाते हैं।",
    "Easy", ["State Teacher Award", "5 September", "Teacher Honours", "Unit 12"]))

questions.append(q(120, s3, 12, u12, u12_hi, "Kasturba Gandhi Balika Vidyalaya (KGBV) Scheme",
    "Under Samagra Shiksha, Kasturba Gandhi Balika Vidyalayas (KGBVs) provide residential schooling up to Class 12 primarily targeted at which demographic group in educational backward blocks (EBBs)?",
    "समग्र शिक्षा के तहत शैक्षिक रूप से पिछड़े ब्लॉकों (EBBs) में कस्तूरबा गांधी बालिका विद्यालय (KGBV) मुख्य रूप से किस वर्ग की बालिकाओं हेतु कक्षा 12 तक आवासीय शिक्षा प्रदान करते हैं?",
    ["Only children of affluent corporate businessmen", "Girls belonging predominantly to SC, ST, OBC, minority communities, and BPL families", "Boys in urban metropolitan cities only", "Foreign exchange students"],
    ["केवल धनी परिवारों की बच्चियां", "अनुसूचित जाति (SC), अनुसूचित जनजाति (ST), अन्य पिछड़ा वर्ग (OBC), अल्पसंख्यक समुदाय और बीपीएल परिवारों की वंचित बालिकाएं", "केवल शहरी बालक", "विदेशी छात्र"],
    1, "KGBVs provide residential education with 75% reservation for girls from SC, ST, OBC, and minority categories and 25% for BPL families in educationally backward areas.",
    "कस्तूरबा गांधी बालिका विद्यालय (KGBV) वंचित वर्ग (SC, ST, OBC, अल्पसंख्यक व BPL) की बालिकाओं को निःशुल्क आवासीय गुणवत्तापूर्ण शिक्षा उपलब्ध कराते हैं।",
    "Medium", ["KGBV", "Girl Child Education", "Samagra Shiksha", "Unit 12"]))

print(f"Total questions generated for UP Inter College Principal: {len(questions)}")

# Write to src/data/upInterCollegeBank.ts
ts_content = f"""// Uttar Pradesh Inter College Principal Written Examination Question Bank
// Exactly 120 Questions divided into Prescribed Section Distribution:
// Section I: 30 Questions (Units 1, 2, 3: 10 Qs each)
// Section II: 30 Questions (Units 4: 15 Qs General Hindi + Unit 5: 15 Qs General English)
// Section III: 60 Questions (Units 6 to 12: Educational Leadership, UP Acts, Finance & Schemes)
// Total: 30 + 30 + 60 = 120 Questions • Duration: 120 Minutes • Max Marks: 300.0 (2.5 marks/Q)
import {{ Question }} from '../types/quiz';

export const UP_INTER_COLLEGE_QUESTIONS: Question[] = {json.dumps(questions, ensure_ascii=False, indent=2)};
"""

with open("src/data/upInterCollegeBank.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Successfully wrote src/data/upInterCollegeBank.ts with 120 questions!")
