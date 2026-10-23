# Generates all 120 questions for UPSC Principal CRT Batch 2 (upsc-crt-121 to 240)
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

# Read Area 1 questions already generated
with open("temp_upsc_batch2.json", "r", encoding="utf-8") as f:
    upsc_batch2 = json.load(f)

print(f"Loaded {len(upsc_batch2)} questions from Area 1.")

# Now define Areas 2 through 8 (15 questions each = 105 questions)
areas_data = [
    # Area 2: Hindi and English Language Skills (15 Qs: upsc-crt-136 to 150)
    {
        "unitId": "upsc-area-2",
        "topic": "Hindi and English Language Skills",
        "topicHi": "हिन्दी एवं अंग्रेजी भाषा दक्षता",
        "ref": "UPSC CRT Syllabus Area 2",
        "items": [
            {
                "sub": "English Grammar - Subject-Verb Agreement",
                "conceptId": "UPSC-LANG-ENG-SUB-VERB-NEITHER-NOR",
                "learning": "Tests subject-verb concord when compound subjects are joined by neither...nor",
                "statute": "Standard English Grammar for Civil Services",
                "rule": "Proximity Rule in Subject-Verb Agreement",
                "tier": 4,
                "src": "Standard Administrative English Handbook / UPSC CRT Pattern",
                "cit": "Wren & Martin High School English Grammar, Chapter on Concord",
                "qEn": "Select the grammatically correct sentence adhering to standard administrative English usage:",
                "qHi": "मानक प्रशासनिक अंग्रेजी प्रयोग के अनुसार व्याकरणिक दृष्टि से शुद्ध वाक्य का चयन कीजिए:",
                "oEn": [
                    "Neither the principal nor the teachers was present in the meeting.",
                    "Neither the principal nor the teachers were present in the meeting.",
                    "Neither the teachers nor the principal were present in the meeting.",
                    "Neither of the teachers have submitted their annual appraisal report."
                ],
                "oHi": [
                    "Neither the principal nor the teachers was present in the meeting.",
                    "Neither the principal nor the teachers were present in the meeting.",
                    "Neither the teachers nor the principal were present in the meeting.",
                    "Neither of the teachers have submitted their annual appraisal report."
                ],
                "ans": 1,
                "expEn": "When two subjects are connected by 'neither...nor', the verb agrees in number and person with the nearer subject ('teachers' is plural, so 'were' is correct).",
                "expHi": "जब दो कर्ता 'neither...nor' से जुड़े हों, तो क्रिया निकटतम कर्ता के अनुसार होती है ('teachers' बहुवचन है, अतः 'were' सही है)।",
                "diff": "Medium",
                "tags": ["Subject-Verb Concord", "English Grammar", "Language Skills"]
            },
            {
                "sub": "Hindi Grammar - Sandhi Rules",
                "conceptId": "UPSC-LANG-HI-SANDHI-YAN-SVAR",
                "learning": "Tests Yan Svar Sandhi rule involving 'इ/ई' followed by dissimilar vowel",
                "statute": "Standard Hindi Grammar",
                "rule": "यण् स्वर सन्धि (इ/ई + भिन्न स्वर = य्)",
                "tier": 4,
                "src": "केंद्रीय हिन्दी निदेशालय एवं मानक हिन्दी व्याकरण",
                "cit": "कामताप्रसाद गुरु, हिन्दी व्याकरण - स्वर सन्धि प्रकरण",
                "qEn": "Which of the following is the correct Sandhi-Vichchheda (disjunction) and type for the word 'इत्यादि' (Ityadi)?",
                "qHi": "निम्नलिखित में से 'इत्यादि' शब्द का सही सन्धि-विच्छेद एवं सन्धि का भेद कौन सा है?",
                "oEn": [
                    "इत + आदि (दीर्घ सन्धि)",
                    "इति + आदि (यण् सन्धि)",
                    "इती + आदि (गुण सन्धि)",
                    "इत्य + आदि (अयादि सन्धि)"
                ],
                "oHi": [
                    "इत + आदि (दीर्घ सन्धि)",
                    "इति + आदि (यण् सन्धि)",
                    "इती + आदि (गुण सन्धि)",
                    "इत्य + आदि (अयादि सन्धि)"
                ],
                "ans": 1,
                "expEn": "इत्यादि = इति + आदि। Here 'इ' + 'आ' becomes 'या' (यण् स्वर सन्धि नियम: यदि इ, ई के बाद कोई अन्य स्वर आए तो उसका 'य्' हो जाता है)।",
                "expHi": "'इत्यादि' का विच्छेद 'इति + आदि' है। इसमें यण् स्वर सन्धि है क्योंकि ह्रस्व 'इ' के बाद भिन्न स्वर 'आ' आने पर 'य्' बनता है।",
                "diff": "Easy",
                "tags": ["Hindi Sandhi", "Yan Sandhi", "Hindi Grammar"]
            },
            {
                "sub": "English Vocabulary - Administrative Idiom",
                "conceptId": "UPSC-LANG-ENG-IDIOM-RED-TAPE",
                "learning": "Tests comprehension of public administration idiom 'red tape'",
                "statute": "Standard Administrative Glossary",
                "rule": "Idiomatic Usage in Bureaucracy",
                "tier": 4,
                "src": "Oxford Advanced Learner's Dictionary / UPSC English Skills",
                "cit": "Administrative Phrases and Idiomatic Expressions in Governance",
                "qEn": "In administrative correspondence, what does the idiom 'to cut through the red tape' mean?",
                "qHi": "प्रशासनिक पत्राचार में मुहावरे 'to cut through the red tape' (लालफीताशाही को चीरना) का क्या तात्पर्य है?",
                "oEn": [
                    "To strictly bind all office files with red ribbons",
                    "To eliminate bureaucratic obstacles, delays, and excessive formal paperwork to expedite action",
                    "To terminate non-performing contractual employees",
                    "To reject financial bids exceeding budgetary limits"
                ],
                "oHi": [
                    "सभी कार्यालय फाइलों को लाल फीते से बांधना",
                    "त्वरित कार्रवाई के लिए नौकरशाही की अनावश्यक औपचारिकताओं और अनावश्यक कागजी बाधाओं को समाप्त करना",
                    "अनुबंध कर्मचारियों को सेवामुक्त करना",
                    "बजट सीमा से अधिक वित्तीय बोलियों को अस्वीकार करना"
                ],
                "ans": 1,
                "expEn": "'To cut through red tape' means to bypass or eliminate excessive official regulations, bureaucracy, and paperwork to achieve prompt administrative decisions.",
                "expHi": "'Cut through the red tape' का अर्थ प्रशासनिक बाधाओं, जटिल अनावश्यक औपचारिकताओं को समाप्त कर शीघ्रता से निर्णय लेना है।",
                "diff": "Easy",
                "tags": ["Idioms", "Administrative English", "Vocabulary"]
            },
            {
                "sub": "Hindi Administrative Terminology",
                "conceptId": "UPSC-LANG-HI-TERMINOLOGY-LOCUS-STANDI",
                "learning": "Tests Hindi translation of legal/administrative concept 'Locus Standi'",
                "statute": "Official Language Commission Glossary",
                "rule": "Commission for Scientific and Technical Terminology (CSTT)",
                "tier": 1,
                "src": "राजभाषा विभाग, गृह मंत्रालय / CSTT शब्दावली",
                "cit": "विधि एवं प्रशासनिक पारिभाषिक शब्दावली, भारत सरकार",
                "qEn": "What is the standard authorized Hindi administrative equivalent for the legal/administrative term 'Locus Standi'?",
                "qHi": "विधिक एवं प्रशासनिक शब्द 'Locus Standi' का प्राधिकृत हिन्दी पारिभाषिक शब्द क्या है?",
                "oEn": ["कार्यकाल", "सुनवाई का अधिकार (वाद-हेतुक / सुने जाने की पात्रता)", "स्थगन प्रस्ताव", "शपथ पत्र"],
                "oHi": ["कार्यकाल", "सुनवाई का अधिकार (वाद-हेतुक / सुने जाने की पात्रता)", "स्थगन प्रस्ताव", "शपथ पत्र"],
                "ans": 1,
                "expEn": "'Locus Standi' legally translates to 'सुनवाई का अधिकार' or 'वाद-हेतुक/अदालत में प्रस्तुत होने की पात्रता' (the right or capacity to bring an action or to appear in a court/tribunal).",
                "expHi": "'Locus Standi' का मानक पारिभाषिक अर्थ 'सुनवाई का अधिकार' अथवा 'न्यायालय में पक्ष प्रस्तुत करने की वैधानिक पात्रता' होता है।",
                "diff": "Medium",
                "tags": ["Administrative Terminology", "Hindi Translation", "Official Language"]
            },
            {
                "sub": "English Grammar - Active and Passive Voice",
                "conceptId": "UPSC-LANG-ENG-VOICE-IMPERATIVE-NOTICE",
                "learning": "Tests conversion of imperative administrative directives into formal passive voice",
                "statute": "Administrative Drafting Conventions",
                "rule": "Passive Construction for Impersonal Official Notices",
                "tier": 4,
                "src": "Central Secretariat Manual of Office Procedure Drafting Guidelines",
                "cit": "Wren & Martin, Chapter on Active and Passive Voice",
                "qEn": "Change the following official directive into passive voice: 'The committee must submit the audit report before Friday.'",
                "qHi": "निम्नलिखित आधिकारिक निर्देश को कर्मवाच्य (Passive Voice) में परिवर्तित कीजिए: 'The committee must submit the audit report before Friday.'",
                "oEn": [
                    "The audit report must be submitted by the committee before Friday.",
                    "The audit report has been submitted before Friday by the committee.",
                    "The audit report had to be submitted by the committee before Friday.",
                    "Before Friday the committee was submitting the audit report."
                ],
                "oHi": [
                    "The audit report must be submitted by the committee before Friday.",
                    "The audit report has been submitted before Friday by the committee.",
                    "The audit report had to be submitted by the committee before Friday.",
                    "Before Friday the committee was submitting the audit report."
                ],
                "ans": 0,
                "expEn": "The modal 'must + verb' becomes 'must + be + past participle (submitted)'. Hence, 'The audit report must be submitted by the committee before Friday.'",
                "expHi": "मॉडल 'must submit' का कर्मवाच्य 'must be submitted' होता है। अतः विकल्प A पूर्णतः सही है।",
                "diff": "Easy",
                "tags": ["Voice Change", "Active Passive", "English Grammar"]
            },
            {
                "sub": "Hindi Grammar - Vartani Shuddhi",
                "conceptId": "UPSC-LANG-HI-VARTANI-UJJVAL-ANADHIKRIT",
                "learning": "Tests correct standard orthography of frequently misspelled administrative words in Hindi",
                "statute": "Standard Hindi Orthography Rules",
                "rule": "वर्तनी मानकीकरण, केंद्रीय हिन्दी निदेशालय",
                "tier": 1,
                "src": "मानक देवनागरी वर्तनी, केंद्रीय हिन्दी निदेशालय, भारत सरकार",
                "cit": "मानक हिन्दी वर्तनी नियम, शिक्षा मंत्रालय",
                "qEn": "Identify the option in which all words are spelled correctly according to standard Hindi orthography:",
                "qHi": "किस विकल्प में मानक देवनागरी वर्तनी के अनुसार सभी शब्द पूर्णतः शुद्ध हैं?",
                "oEn": [
                    "उज्ज्वल, अनाधिकृत, कवयित्री",
                    "उज्ज्वल, अनधिकृत, कवयित्री",
                    "उज्वल, अनधिकृत, कवियत्री",
                    "उज्जवल, अनाधिकृत, कवियित्री"
                ],
                "oHi": [
                    "उज्ज्वल, अनाधिकृत, कवयित्री",
                    "उज्ज्वल, अनधिकृत, कवयित्री",
                    "उज्वल, अनधिकृत, कवियत्री",
                    "उज्जवल, अनाधिकृत, कवियित्री"
                ],
                "ans": 1,
                "expEn": "In standard Hindi: 'उज्ज्वल' (two half 'ज्'), 'अनधिकृत' (not अनाधिकृत, since अन् + अधिकृत = अनधिकृत), and 'कवयित्री' are the correct standard spellings.",
                "expHi": "शुद्ध वर्तनी 'उज्ज्वल' (दोनों 'ज्' आधे), 'अनधिकृत' (अन् + अधिकृत = अनधिकृत, 'अना' अशुद्ध है) तथा 'कवयित्री' है।",
                "diff": "Medium",
                "tags": ["Vartani Shuddhi", "Spelling", "Hindi Grammar"]
            },
            {
                "sub": "English Vocabulary - One Word Substitution",
                "conceptId": "UPSC-LANG-ENG-ONE-WORD-PEDAGOGUE",
                "learning": "Tests vocabulary for specialized educational leadership terms",
                "statute": "English Lexicon for Educationists",
                "rule": "Etymology and One-Word Substitution",
                "tier": 4,
                "src": "Standard Lexicon / UPSC Language Skills",
                "cit": "Norman Lewis, Word Power Made Easy",
                "qEn": "What is the single-word term for 'A person who studies the methods, principles, and theory of teaching and education'?",
                "qHi": "'शिक्षण और शिक्षा की विधियों, सिद्धांतों और प्रतिमानों का अध्ययन करने वाला व्यक्ति' के लिए एक शब्द क्या है?",
                "oEn": ["Pedagogue / Educational Theorist", "Philologist", "Numismatist", "Anthropologist"],
                "oHi": ["शिक्षाशास्त्री (Pedagogue)", "भाषाशास्त्री (Philologist)", "मुद्राशास्त्री (Numismatist)", "मानवशास्त्री (Anthropologist)"],
                "ans": 0,
                "expEn": "A pedagogue or educational theorist is an expert who studies and applies pedagogical principles and teaching methodologies.",
                "expHi": "शिक्षण विधियों और सिद्धांतों के विशेषज्ञ को शिक्षाशास्त्री (Pedagogue) कहा जाता है।",
                "diff": "Easy",
                "tags": ["One Word Substitution", "Vocabulary", "Pedagogy"]
            },
            {
                "sub": "Hindi Grammar - Samas",
                "conceptId": "UPSC-LANG-HI-SAMAS-YATHASHAKTI-PRADHANACHARYA",
                "learning": "Tests identification of Avyayibhav and Karmadharaya Samas",
                "statute": "Hindi Grammar Rules",
                "rule": "समास भेद एवं विग्रह",
                "tier": 4,
                "src": "कामताप्रसाद गुरु, हिन्दी व्याकरण",
                "cit": "समास रचना एवं भेद प्रकरण",
                "qEn": "Which type of Samas (compound) is exemplified in the administrative word 'यथासमय' (Yathasamay)?",
                "qHi": "'यथासमय' शब्द में कौन सा समास प्रयुक्त हुआ है?",
                "oEn": ["तत्पुरुष समास", "अव्ययीभाव समास", "द्विगु समास", "बहुव्रीहि समास"],
                "oHi": ["तत्पुरुष समास", "अव्ययीभाव समास", "द्विगु समास", "बहुव्रीहि समास"],
                "ans": 1,
                "expEn": "In 'यथासमय', the prefix 'यथा' is an indeclinable (अव्यय). A compound where the first word is an Avyaya and retains primary significance is Avyayibhav Samas (समय के अनुसार).",
                "expHi": "'यथासमय' (समय के अनुसार) में पूर्व पद 'यथा' अव्यय है, अतः यह अव्ययीभाव समास का उदाहरण है।",
                "diff": "Easy",
                "tags": ["Samas", "Avyayibhav", "Hindi Grammar"]
            },
            {
                "sub": "English Grammar - Direct and Indirect Speech",
                "conceptId": "UPSC-LANG-ENG-INDIRECT-SPEECH-TENSE-SHIFT",
                "learning": "Tests backshift of tenses and reporting verbs in formal administrative orders",
                "statute": "Grammar for Administrative Documentation",
                "rule": "Reported Speech Conventions",
                "tier": 4,
                "src": "Wren & Martin High School English Grammar",
                "cit": "Reported Speech and Indirect Narration Chapter",
                "qEn": "Convert the following statement into indirect speech: The Director said, 'The inspection team has completed the institutional audit today.'",
                "qHi": "निम्नलिखित कथन को अप्रत्यक्ष कथन (Indirect Speech) में बदलिए: The Director said, 'The inspection team has completed the institutional audit today.'",
                "oEn": [
                    "The Director said that the inspection team had completed the institutional audit that day.",
                    "The Director says that the inspection team has completed the institutional audit today.",
                    "The Director told that the inspection team completed the institutional audit that day.",
                    "The Director asked if the inspection team had completed the institutional audit today."
                ],
                "oHi": [
                    "The Director said that the inspection team had completed the institutional audit that day.",
                    "The Director says that the inspection team has completed the institutional audit today.",
                    "The Director told that the inspection team completed the institutional audit that day.",
                    "The Director asked if the inspection team had completed the institutional audit today."
                ],
                "ans": 0,
                "expEn": "Present perfect ('has completed') changes to past perfect ('had completed'), and 'today' changes to 'that day'.",
                "expHi": "रिपोर्टिंग वर्ब Past tense में होने पर Present Perfect ('has completed') का Past Perfect ('had completed') हो जाता है तथा 'today' बदलकर 'that day' बनता है।",
                "diff": "Medium",
                "tags": ["Reported Speech", "Indirect Narration", "English Grammar"]
            },
            {
                "sub": "Hindi Antonyms - Administrative Domain",
                "conceptId": "UPSC-LANG-HI-VILOM-ANUGRAH-KOP",
                "learning": "Tests precise administrative and literary antonyms in Hindi",
                "statute": "Standard Hindi Lexicon",
                "rule": "विलोम शब्द युग्म",
                "tier": 4,
                "src": "केंद्रीय हिन्दी निदेशालय / UPSC हिन्दी प्रश्न पत्र प्रारूप",
                "cit": "मानक हिन्दी विलोम शब्द संग्रह",
                "qEn": "Which of the following is the correct antonym (विलोम शब्द) of 'अनुग्रह' (Anugrah) in administrative and statutory contexts?",
                "qHi": "प्रशासनिक एवं विधिक भाषा में 'अनुग्रह' का सही विलोम शब्द क्या है?",
                "oEn": ["आग्रह", "विग्रह (अथवा कोप)", "परिग्रह", "संग्रह"],
                "oHi": ["आग्रह", "विग्रह (अथवा कोप)", "परिग्रह", "संग्रह"],
                "ans": 1,
                "expEn": "'अनुग्रह' का विलोम 'विग्रह' अथवा 'कोप' होता है (अनुग्रह = कृपा/प्रसन्नता, विग्रह/कोप = दंड/नाराजगी)।",
                "expHi": "'अनुग्रह' का सही विलोम 'विग्रह' (या कोप) होता है। आग्रह का दुराग्रह, परिग्रह का अपरिग्रह होता है।",
                "diff": "Medium",
                "tags": ["Vilom Shabd", "Antonyms", "Hindi Vocabulary"]
            },
            {
                "sub": "English Reading Comprehension & Inference",
                "conceptId": "UPSC-LANG-ENG-COMPREHENSION-LEADERSHIP-AUTONOMY",
                "learning": "Tests critical reading comprehension on institutional leadership",
                "statute": "Pedagogical Leadership Philosophy",
                "rule": "Reading Comprehension Analysis",
                "tier": 4,
                "src": "UPSC CRT Language Skills Assessment Framework",
                "cit": "Advanced Comprehension and Textual Inference",
                "qEn": "Read the statement: 'True institutional autonomy does not denote absence of accountability; rather, it empowers the school head to innovate curricular delivery while holding the leadership strictly answerable to equity and learning outcomes.' What is the primary inference of this passage?",
                "qHi": "कथन को ध्यानपूर्वक पढ़िए: 'वास्तविक संस्थागत स्वायत्तता का अर्थ उत्तरदायित्व का अभाव नहीं है; बल्कि यह संस्था प्रमुख को समता और सीखने के प्रतिफलों के प्रति कठोरता से उत्तरदायी रखते हुए पाठ्यचर्या नवाचार के लिए सशक्त बनाती है।' इस गद्यांश का प्राथमिक निष्कर्ष क्या है?",
                "oEn": [
                    "Autonomy and accountability are mutually exclusive concepts.",
                    "Autonomy functions as a vehicle for innovation that operates within a strict framework of outcome accountability.",
                    "Schools should not be subjected to any government assessments.",
                    "Equity can only be achieved when school leaders have no administrative powers."
                ],
                "oHi": [
                    "स्वायत्तता और उत्तरदायित्व परस्पर विरोधी अवधारणाएं हैं।",
                    "स्वायत्तता नवाचार के एक साधन के रूप में कार्य करती है जो सीखने के प्रतिफलों के प्रति कठोर जवाबदेही के दायरे में संचालित होती है।",
                    "विद्यालयों पर किसी भी प्रकार का सरकारी मूल्यांकन लागू नहीं होना चाहिए।",
                    "समता तभी प्राप्त हो सकती है जब विद्यालय प्रमुख के पास कोई प्रशासनिक अधिकार न हों।"
                ],
                "ans": 1,
                "expEn": "The passage clearly establishes that autonomy and accountability complement each other—autonomy provides freedom to innovate while holding leaders accountable for equity and student learning.",
                "expHi": "गद्यांश स्पष्ट करता है कि स्वायत्तता का उद्देश्य नवाचार को बढ़ावा देना है, लेकिन यह परिणामों और समता के प्रति दृढ़ उत्तरदायित्व के साथ बंधी होती है।",
                "diff": "Difficult",
                "tags": ["Reading Comprehension", "Inference", "Educational Leadership"]
            },
            {
                "sub": "Hindi Idioms & Proverbs",
                "conceptId": "UPSC-LANG-HI-MUHAVARE-BAP-NA-MARI-MEDHAKI",
                "learning": "Tests comprehension and accurate contextual application of classic Hindi idioms",
                "statute": "Standard Hindi Idioms and Proverbs",
                "rule": "मुहावरे एवं लोकोक्तियां",
                "tier": 4,
                "src": "कामताप्रसाद गुरु, लोकोक्ति प्रकरण / NCERT",
                "cit": "हिन्दी मुहावरे एवं लोकोक्तियां कोश",
                "qEn": "What is the meaning of the Hindi idiom 'अंगूठा दिखाना' (Angootha Dikhana) in administrative dialogue?",
                "qHi": "प्रशासनिक एवं व्यावहारिक संदर्भ में मुहावरे 'अंगूठा दिखाना' का वास्तविक अर्थ क्या है?",
                "oEn": [
                    "समर्थन व्यक्त करना",
                    "समय पर ऐन मौके पर साफ मना कर देना (धोखा देना)",
                    "अंगूठे का निशान लगाना",
                    "विजय की घोषणा करना"
                ],
                "oHi": [
                    "समर्थन व्यक्त करना",
                    "समय पर ऐन मौके पर साफ मना कर देना (धोखा देना)",
                    "अंगूठे का निशान लगाना",
                    "विजय की घोषणा करना"
                ],
                "ans": 1,
                "expEn": "'अंगूठा दिखाना' means to bluntly refuse assistance at the critical hour or to deny help.",
                "expHi": "'अंगूठा दिखाना' का अर्थ ऐन वक्त पर किसी कार्य के लिए साफ मना कर देना या इनकार कर देना होता है।",
                "diff": "Easy",
                "tags": ["Muhavare", "Hindi Idioms", "Hindi Grammar"]
            },
            {
                "sub": "English Error Spotting - Prepositional Use",
                "conceptId": "UPSC-LANG-ENG-PREPOSITION-COPE-WITH",
                "learning": "Tests correction of redundant prepositional errors such as 'cope up with'",
                "statute": "Standard English Grammar",
                "rule": "Standard Prepositional Phrasal Verbs",
                "tier": 4,
                "src": "Oxford English Grammar / UPSC CRT Error Detection",
                "cit": "Common Errors in English, Fowler's Modern English Usage",
                "qEn": "Identify the incorrect part of the sentence: 'The Principal was unable (A) / to cope up with (B) / the excessive administrative workload (C) / during the board examinations. (D)'",
                "qHi": "वाक्य के किस भाग में व्याकरणिक अशुद्धि है: 'The Principal was unable (A) / to cope up with (B) / the excessive administrative workload (C) / during the board examinations. (D)'",
                "oEn": ["Part (A)", "Part (B)", "Part (C)", "Part (D)"],
                "oHi": ["भाग (A)", "भाग (B)", "भाग (C)", "भाग (D)"],
                "ans": 1,
                "expEn": "The correct phrasal verb is 'to cope with', not 'to cope up with'. The word 'up' is superfluous and grammatically incorrect.",
                "expHi": "सही प्रयोग 'cope with' होता है, 'cope up with' अशुद्ध है। अतः भाग (B) में त्रुटि है।",
                "diff": "Medium",
                "tags": ["Error Spotting", "Prepositions", "English Grammar"]
            },
            {
                "sub": "Hindi Official Correspondence Terminology",
                "conceptId": "UPSC-LANG-HI-CORRESPONDENCE-PARIPATRA",
                "learning": "Tests distinction between Circular (Paripatra), Notification (Adhisuchana), and Office Order",
                "statute": "Official Correspondence Manual",
                "rule": "केंद्रीय सचिवालय कार्यालय पद्धति नियम",
                "tier": 1,
                "src": "प्रशासनिक सुधार और लोक शिकायत विभाग (DARPG)",
                "cit": "कार्यालय पद्धति नियम पुस्तिका, पत्र-प्रारूप अध्याय",
                "qEn": "Which form of official communication is issued by a competent authority when the same instructions or orders are to be communicated simultaneously to multiple subordinate offices or officers?",
                "qHi": "जब सक्षम प्राधिकारी द्वारा एक ही निर्देश या आदेश एक साथ कई अधीनस्थ कार्यालयों अथवा अधिकारियों को प्रेषित किया जाना हो, तो कौन सा पत्राचार रूप प्रयुक्त होता है?",
                "oEn": ["परिपत्र (Circular)", "अधिसूचना (Notification)", "कार्यालय ज्ञाप (Office Memorandum)", "अर्द्धशासकीय पत्र (Demi-Official Letter)"],
                "oHi": ["परिपत्र (Circular)", "अधिसूचना (Notification)", "कार्यालय ज्ञाप (Office Memorandum)", "अर्द्धशासकीय पत्र (Demi-Official Letter)"],
                "ans": 0,
                "expEn": "A Circular (परिपत्र) is an official communication intended for simultaneous dissemination to a large number of subordinate offices, branches, or officials.",
                "expHi": "जब एक ही सूचना या निर्देश कई अधिकारियों/कार्यालयों को एक साथ भेजा जाता है तो उसे 'परिपत्र' (Circular) कहा जाता है।",
                "diff": "Easy",
                "tags": ["Official Correspondence", "Circular", "Paripatra"]
            },
            {
                "sub": "English Vocabulary - Synonyms",
                "conceptId": "UPSC-LANG-ENG-SYNONYM-METICULOUS",
                "learning": "Tests synonym recognition for words describing administrative rigor",
                "statute": "English Vocabulary in Public Administration",
                "rule": "Lexical Precision",
                "tier": 4,
                "src": "Standard Lexicon / UPSC Language Section",
                "cit": "Merriam-Webster Collegiate Dictionary",
                "qEn": "Select the most appropriate synonym for the word 'METICULOUS' as expected in school audit and records maintenance:",
                "qHi": "विद्यालय लेखा परीक्षा एवं अभिलेख संधारण में अपेक्षित शब्द 'METICULOUS' (सटीक/सूक्ष्म) का सर्वाधिक उपयुक्त पर्यायवाची शब्द कौन सा है?",
                "oEn": ["Careless and perfunctory", "Painstaking and scrupulously careful", "Superficial and hurried", "Ambiguous and casual"],
                "oHi": ["लापरवाह और औपचारिक", "अत्यंत सतर्क और सूक्ष्म रूप से सावधान (Painstaking)", "सतही और जल्दबाज", "अस्पष्ट और अनौपचारिक"],
                "ans": 1,
                "expEn": "'Meticulous' means showing great attention to detail; very careful and precise; painstaking.",
                "expHi": "'Meticulous' का अर्थ है किसी कार्य या अभिलेख में अत्यंत सावधानी, विस्तार और सूक्ष्मता बरतने वाला (Painstaking / Scrupulously careful)।",
                "diff": "Easy",
                "tags": ["Synonyms", "Vocabulary", "English Language"]
            }
        ]
    }
]

# We will write python scripts for Areas 3 to 8 as well
print("Area 2 items defined:", len(areas_data[0]["items"]))
