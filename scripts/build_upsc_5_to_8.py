# -*- coding: utf-8 -*-
import json
import os

with open("scripts/temp_upsc_1_to_4.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

print(f"Loaded {len(questions)} questions from Areas 1 to 4.")

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
# AREA 5: Management and Financial Administration (61 to 75)
# ==========================================
t5 = "Management and Financial Administration"
th5 = "प्रबंधन एवं वित्तीय प्रशासन"

questions.append(q(61, 5, t5, th5, "GFR 2017 - General Standards of Financial Propriety",
    "Under Rule 21 of General Financial Rules (GFR) 2017, what fundamental principle must govern an officer incurring public expenditure?",
    "सामान्य वित्तीय नियम (GFR) 2017 के नियम 21 (वित्तीय औचित्य के मानक) के अनुसार, लोक धन का व्यय करने वाले अधिकारी को किस मूल सिद्धांत का पालन करना चाहिए?",
    ["Spend maximum allocated grant regardless of need", "Exercise the same vigilance as a person of ordinary prudence would exercise in respect of expenditure of his own money", "Approve bills without verifying vouchers", "Delegate all financial powers to subordinate clerks"],
    ["आवश्यकता की परवाह किए बिना पूरा अनुदान खर्च करना", "वही सतर्कता और सावधानी बरतना जैसी एक सामान्य बुद्धि वाला व्यक्ति अपने स्वयं के धन के व्यय में बरतता है", "बिना वाउचर जांचे बिल पास करना", "सभी वित्तीय अधिकार लिपिकों को सौंप देना"],
    1, "Rule 21 enshrines the Standards of Financial Propriety: every officer must exercise the same diligence as a person of ordinary prudence with his own money.",
    "नियम 21 वित्तीय औचित्य का मुख्य नियम है कि अधिकारी को सरकारी धन खर्च करते समय वही सावधानी बरतनी चाहिए जैसी वह अपने निजी धन के लिए बरतता है।",
    "Easy", ["GFR 2017", "Rule 21", "Financial Propriety"]))

questions.append(q(62, 5, t5, th5, "Government e-Marketplace (GeM) Direct Purchase",
    "As per Rule 149 of GFR 2017, up to what monetary limit may goods and services be purchased directly on the GeM portal from any available supplier meeting requisite quality and delivery specifications?",
    "जीएफआर 2017 के नियम 149 के अनुसार, GeM पोर्टल पर निर्धारित गुणवत्ता और समय सीमा पूरी करने वाले किसी भी विक्रेता से सीधे कितनी राशि तक की खरीद की जा सकती है?",
    ["Up to ₹10,000", "Up to ₹25,000", "Up to ₹50,000", "Up to ₹1,00,000"],
    ["₹10,000 तक", "₹25,000 तक", "₹50,000 तक", "₹1,00,000 तक"],
    1, "Rule 149 authorizes direct purchase on GeM up to ₹25,000 from any supplier whose product meets technical requirements.",
    "GeM पोर्टल पर ₹25,000 तक की सीधी ऑनलाइन खरीद बिना किसी तुलना के सीधे की जा सकती है।",
    "Medium", ["GeM", "Rule 149", "Procurement"]))

questions.append(q(63, 5, t5, th5, "Local Purchase Committee (LPC)",
    "Under Rule 155 of GFR 2017, purchase of goods between ₹25,000 and ₹2,50,000 outside GeM may be made on the recommendation of a Local Purchase Committee consisting of how many members?",
    "जीएफआर 2017 के नियम 155 के तहत, GeM के बाहर ₹25,000 से ₹2,50,000 के मध्य की खरीद किसकी संस्तुति पर की जाती है?",
    ["A single Section Officer", "A committee of three members appointed by the Head of Department", "A committee of five gazetted officers", "State Finance Minister directly"],
    ["केवल एक अनुभाग अधिकारी", "विभागाध्यक्ष द्वारा नामित तीन सदस्यों वाली स्थानीय क्रय समिति (LPC)", "पाँच राजपत्रित अधिकारियों की समिति", "सीधे राज्य वित्त मंत्री"],
    1, "Rule 155 stipulates procurement between ₹25,000 and ₹2,50,000 shall be made through a duly constituted three-member Local Purchase Committee (LPC).",
    "जीएफआर नियम 155 के तहत ₹25,000 से ₹2,50,000 की खरीद तीन सदस्यों वाली स्थानीय क्रय समिति (Local Purchase Committee) की संतुष्टि पर की जाती है।",
    "Medium", ["GFR 2017", "Rule 155", "Local Purchase Committee"]))

questions.append(q(64, 5, t5, th5, "Public Financial Management System (PFMS)",
    "What is the primary role of the Public Financial Management System (PFMS) in government educational institutions and centrally sponsored schemes?",
    "सरकारी शिक्षण संस्थानों और केंद्र प्रायोजित योजनाओं में सार्वजनिक वित्तीय प्रबंधन प्रणाली (PFMS) का मुख्य कार्य क्या है?",
    ["Preparing student report cards", "Facilitating real-time fund tracking, direct benefit transfers (DBT), transparent accounting, and just-in-time expenditure releases", "Conducting annual sports tournaments", "Maintaining library book issues"],
    ["छात्रों का रिपोर्ट कार्ड बनाना", "अनुदानों की वास्तविक समय में निगरानी, प्रत्यक्ष लाभ अंतरण (DBT), पारदर्शी लेखांकन और समय पर धनराशि जारी करना", "वार्षिक खेल प्रतियोगिताएं आयोजित करना", "पुस्तकालय की पुस्तकें जारी करना"],
    1, "PFMS is a web-based financial management application for tracking fund flow to implementing agencies and direct transfers to beneficiaries.",
    "पीएफएमएस सरकारी योजनाओं के धन के अंतरण, ट्रैकिंग और पारदर्शी डिजिटल भुगतान की केंद्रीय ऑनलाइन प्रणाली है।",
    "Medium", ["PFMS", "Digital Accounting", "Financial Management"]))

questions.append(q(65, 5, t5, th5, "Single Nodal Agency (SNA) Model",
    "Under the revised Central Sector and Centrally Sponsored Schemes fund release mechanism, what is the role of a 'Single Nodal Agency' (SNA)?",
    "संशोधित केंद्र प्रायोजित योजना दिशानिर्देशों के तहत 'सिंगल नोडल एजेंसी' (SNA) का क्या कार्य है?",
    ["Operating one designated bank account per state per scheme to eliminate unspent parked funds and ensure just-in-time liquidity tracking", "Replacing the State Education Board", "Issuing driving licences", "Constructing highways"],
    ["प्रत्येक राज्य में प्रत्येक योजना हेतु एक नोडल बैंक खाता संचालित कर बिना खर्च पड़ी धनराशि को रोकना और समय पर भुगतान सुनिश्चित करना", "राज्य शिक्षा बोर्ड का स्थान लेना", "ड्राइविंग लाइसेंस जारी करना", "राजमार्गों का निर्माण करना"],
    0, "Under SNA guidelines, each State designates a Single Nodal Agency with one Single Nodal Account in a scheduled commercial bank for each Centrally Sponsored Scheme.",
    "SNA व्यवस्था के तहत प्रत्येक केंद्र प्रायोजित योजना के लिए राज्य स्तर पर एक ही नोडल खाता होता है जिससे धन के दुरुपयोग या अनावश्यक जमा को रोका जा सके।",
    "Hard", ["SNA", "PFMS", "Financial Administration"]))

questions.append(q(66, 5, t5, th5, "Stock Verification & Inventory Management",
    "Under Rule 213 of GFR 2017, how frequently must physical verification of fixed assets, library books, and consumable stores be carried out in a government institution?",
    "जीएफआर 2017 के नियम 213 के अनुसार, किसी सरकारी संस्था में अचल संपत्तियों, पुस्तकालय पुस्तकों और उपभोज्य भंडारों का भौतिक सत्यापन कितनी अवधि में किया जाना अनिवार्य है?",
    ["Once every month", "At least once in a year (annual physical verification)", "Once in every five years", "Only when the Principal retires"],
    ["प्रत्येक माह में एक बार", "वर्ष में कम से कम एक बार (वार्षिक भौतिक सत्यापन)", "प्रत्येक पाँच वर्ष में एक बार", "केवल प्रधानाचार्य के सेवानिवृत्त होने पर"],
    1, "Rule 213 provides that physical verification of fixed assets and consumable stores should be conducted at least once in every year.",
    "जीएफआर नियम 213 के अनुसार सभी भंडार, उपकरण और संपत्तियों का भौतिक सत्यापन वर्ष में कम से कम एक बार किया जाना आवश्यक है।",
    "Medium", ["GFR 2017", "Stock Verification", "Inventory"]))

questions.append(q(67, 5, t5, th5, "Performance Security Norms",
    "Under Rule 171 of GFR 2017, what is the standard range of Performance Security required from a successful commercial bidder/contractor?",
    "जीएफआर 2017 के नियम 171 के अंतर्गत सफल बोलीदाता/ठेकेदार से अनुबंध के संतोषजनक निष्पादन हेतु कितने प्रतिशत परफॉर्मेंस सिक्योरिटी ली जाती है?",
    ["1% to 2% of the contract value", "5% to 10% of the value of the contract", "15% to 20% of contract value", "Fixed ₹5,000 flat"],
    ["अनुबंध मूल्य का 1% से 2%", "अनुबंध मूल्य का 5% से 10%", "अनुबंध मूल्य का 15% से 20%", "निश्चित ₹5,000"],
    1, "Rule 171 requires performance security ordinarily between 5% and 10% of the value of the contract, valid for 60 days beyond completion of all contractual obligations.",
    "नियम 171 के तहत परफॉर्मेंस सिक्योरिटी अनुबंध मूल्य की 5% से 10% ली जाती है और सभी दायित्व पूरे होने के 60 दिन बाद तक वैध रहती है।",
    "Medium", ["Performance Security", "Rule 171", "GFR 2017"]))

questions.append(q(68, 5, t5, th5, "Bid Security / Earnest Money Deposit (EMD)",
    "Under Rule 170 of GFR 2017, which category of domestic suppliers is legally exempt from depositing Bid Security (EMD) in public procurement?",
    "जीएफआर 2017 के नियम 170 के अनुसार सार्वजनिक खरीद में बयाना राशि (EMD / Bid Security) जमा करने से किस श्रेणी के आपूर्तिकर्ताओं को विधिक छूट प्राप्त है?",
    ["Foreign multinational corporations", "Micro and Small Enterprises (MSEs) registered with the designated authority / Udyam and startups", "All private limited companies", "Large contractor syndicates"],
    ["विदेशी बहुराष्ट्रीय कंपनियां", "सूक्ष्म एवं लघु उद्यम (MSEs/Udyam पंजीकृत) तथा मान्यता प्राप्त स्टार्टअप्स", "सभी प्राइवेट लिमिटेड कंपनियां", "बड़े ठेकेदार सिंडिकेट"],
    1, "Rule 170 exempts Micro and Small Enterprises (MSEs) as recognized by the Ministry of MSME and Department for Promotion of Industry and Internal Trade (DPIIT) startups from Bid Security.",
    "जीएफआर 170 के अनुसार एमएसई (MSEs) और मान्यता प्राप्त स्टार्टअप्स को बयाना राशि (EMD) जमा करने से पूर्ण छूट प्राप्त है।",
    "Medium", ["EMD Exemption", "MSEs", "Procurement"]))

questions.append(q(69, 5, t5, th5, "Internal Audit & Financial Controls",
    "What is the statutory objective of an 'Internal Audit' in a government school or educational establishment?",
    "सरकारी विद्यालय अथवा शैक्षिक संस्था में 'आंतरिक लेखा परीक्षा' (Internal Audit) का मुख्य उद्देश्य क्या होता है?",
    ["Finding fault to withhold teacher salaries", "Independently evaluating internal financial controls, checking compliance with rules, preventing irregularities, and assessing operational efficiency", "Preparing question papers for board examinations", "Sanctioning study leave to clerks"],
    ["शिक्षकों का वेतन रोकने हेतु गलतियां ढूंढना", "आंतरिक वित्तीय नियंत्रणों का स्वतंत्र मूल्यांकन करना, नियमों के अनुपालन की जांच करना, वित्तीय अनियमितताओं को रोकना व कार्यकुशलता बढ़ाना", "बोर्ड परीक्षा के प्रश्न पत्र तैयार करना", "लिपिकों को अध्ययन अवकाश स्वीकृत करना"],
    1, "Internal audit is an independent appraisal mechanism to examine whether financial transactions adhere to rules and internal accounting controls operate effectively.",
    "आंतरिक लेखा परीक्षा एक स्वतंत्र समीक्षा प्रक्रिया है जो वित्तीय नियमों का पालन, लेखा बहियों की शुद्धता और वित्तीय अनुशासन सुनिश्चित करती है।",
    "Easy", ["Internal Audit", "Financial Control"]))

questions.append(q(70, 5, t5, th5, "Budget Estimates - Revised Estimates (RE) and Budget Estimates (BE)",
    "In government budgetary administration, what do the terms 'BE' and 'RE' represent?",
    "सरकारी बजटीय प्रशासन में 'BE' और 'RE' शब्द क्या दर्शाते हैं?",
    ["Basic Expenditure and Royal Expenditure", "Budget Estimates (बजट अनुमान) and Revised Estimates (संशोधित अनुमान)", "Banking Entry and Reserve Entry", "Board Examination and Re-Examination"],
    ["मूल व्यय और शाही व्यय", "बजट अनुमान (Budget Estimates) और संशोधित अनुमान (Revised Estimates)", "बैंकिंग प्रविष्टि और आरक्षित प्रविष्टि", "बोर्ड परीक्षा और पुनरीक्षा"],
    1, "BE refers to Budget Estimates presented for the forthcoming financial year, while RE refers to Revised Estimates of expenditure for the current financial year based on actual trends.",
    "BE आगामी वित्तीय वर्ष के लिए 'बजट अनुमान' है तथा RE चालू वित्तीय वर्ष के व्यय की वास्तविक प्रवृत्ति पर आधारित 'संशोधित अनुमान' होता है।",
    "Easy", ["Budget Estimates", "BE and RE", "Budgeting"]))

questions.append(q(71, 5, t5, th5, "School Development and Management Committee (SMDC) Account",
    "Under Samagra Shiksha norms, how are annual composite school grants operated in a government secondary school?",
    "समग्र शिक्षा अभियान के अंतर्गत राजकीय माध्यमिक विद्यालय में वार्षिक कंपोजिट स्कूल ग्रांट का संचालन किस प्रकार किया जाता है?",
    ["Sole discretion of the senior-most student", "Jointly through the School Management and Development Committee (SMDC) account operated by the Principal and parent/member secretary", "Deposited in private personal account", "Transferred to local coaching institutes"],
    ["वरिष्ठतम छात्र के स्वविवेक से", "प्रधानाचार्य एवं नामित सदस्य/अभिभावक द्वारा संयुक्त रूप से विद्यालय प्रबंधन एवं विकास समिति (SMDC) के खाते के माध्यम से", "निजी व्यक्तिगत खाते में जमा करके", "स्थानीय कोचिंग संस्थानों को स्थानांतरित करके"],
    1, "Composite school grants under Samagra Shiksha are operated through the designated zero-balance SNA / SMDC bank account jointly signed by the Principal/Headmaster and SMDC secretary.",
    "कंपोजिट ग्रांट का संचालन SMDC के अधिकृत बैंक खाते से प्रधानाचार्य एवं समिति के संयुक्त हस्ताक्षर से वित्तीय नियमों के तहत किया जाता है।",
    "Medium", ["SMDC", "Composite School Grant", "Samagra Shiksha"]))

questions.append(q(72, 5, t5, th5, "Cash Book Maintenance Rules",
    "Under Central Government Account (Receipts and Payments) Rules, what is the mandatory daily duty of the Drawing and Disbursing Officer (DDO) regarding the Cash Book?",
    "केंद्रीय रसीद एवं भुगतान नियमावली के अंतर्गत आहरण एवं संवितरण अधिकारी (DDO) का रोकड़ बही (Cash Book) के संदर्भ में अनिवार्य दैनिक कर्तव्य क्या है?",
    ["Sign the Cash Book only once a year", "Verify and attest each daily entry of receipts and payments, verify the closing cash balance, and sign the cash book daily", "Leave the cash book completely blank", "Handover the cash book to commercial contractors"],
    ["वर्ष में केवल एक बार हस्ताक्षर करना", "प्रतिदिन के सभी प्राप्तियों और भुगतानों की प्रविष्टियों की जांच कर प्रमाणित करना, दैनिक अंतिम शेष का मिलान करना तथा हस्ताक्षर करना", "रोकड़ बही को पूरी तरह खाली रखना", "रोकड़ बही निजी ठेकेदारों को सौंपना"],
    1, "The DDO must verify each entry of receipt and payment in the Cash Book with supporting vouchers, attest each entry, and verify the closing cash balance daily.",
    "DDO का यह वैधानिक दायित्व है कि वह रोकड़ बही की प्रत्येक प्रविष्टि को वाउचर से मिलाए, दैनिक रोकड़ शेष का मिलान करे और प्रतिदिन हस्ताक्षर करे।",
    "Hard", ["Cash Book", "DDO Duties", "Financial Rules"]))

questions.append(q(73, 5, t5, th5, "Tax Deducted at Source (TDS) under Income Tax Act",
    "What is the statutory obligation of a school Principal acting as Drawing and Disbursing Officer (DDO) under Section 192 of the Income Tax Act, 1961?",
    "आयकर अधिनियम 1961 की धारा 192 के अंतर्गत आहरण एवं संवितरण अधिकारी (DDO) के रूप में विद्यालय प्रमुख का क्या विधिक दायित्व है?",
    ["Deduct Tax at Source (TDS) from employees' monthly salary based on estimated annual income and tax slabs, deposit it in the central exchequer, and issue Form 16", "Exempt all school employees from paying income tax", "Collect cash income tax in school lockers", "Refuse issuing PAN cards"],
    ["कर्मचारियों के वेतन से अनुमानित वार्षिक आय और कर स्लैब के आधार पर टीडीएस (TDS) की मासिक कटौती करना, सरकारी कोष में जमा करना और फॉर्म 16 जारी करना", "सभी कर्मचारियों को आयकर से छूट देना", "विद्यालय की तिजोरी में नकद आयकर रखना", "पैन कार्ड स्वीकार करने से मना करना"],
    0, "Section 192 mandates the employer/DDO to deduct income tax at source from salary payments at the average rate of income tax computed on estimated income of the employee.",
    "धारा 192 के अनुसार DDO को कर्मचारियों के वेतन से नियमानुसार स्रोत पर कर (TDS) काटना, चालान द्वारा जमा करना तथा फॉर्म 16 जारी करना अनिवार्य है।",
    "Medium", ["TDS", "Section 192", "Income Tax Act"]))

questions.append(q(74, 5, t5, th5, "Contingency Fund and Imprest Rules",
    "In government school financial management, what is a 'Permanent Advance' or 'Imprest' money sanctioned to a Principal?",
    "सरकारी विद्यालय के वित्तीय प्रबंधन में प्रधानाचार्य को स्वीकृत 'स्थायी अग्रिम' या 'इम्प्रेस्ट' (Permanent Advance) राशि का क्या उद्देश्य होता है?",
    ["A personal loan for the Principal", "A designated fixed sum placed at the disposal of an officer to meet urgent, petty day-to-day contingent office expenses before regular recoupment", "Money for organizing private feasts", "Unaccountable discretionary fund"],
    ["प्रधानाचार्य के लिए व्यक्तिगत ऋण", "दैनिक आवश्यक व फुटकर आकस्मिक कार्यालयी खर्चों को तत्काल पूरा करने के लिए अधिकारी को दी गई एक निश्चित अग्रिम राशि जिसे बिल प्रस्तुत कर पुनः पूरा किया जाता है", "निजी दावतों के लिए धन", "बिना हिसाब-किताब का फंड"],
    1, "An imprest or permanent advance is a standing amount given to an office head to defray petty contingent charges before bills can be drawn.",
    "इम्प्रेस्ट (Imprest) आकस्मिक छोटे-मोटे कार्यालयी खर्चों को तत्काल पूरा करने के लिए दी जाने वाली स्थायी अग्रिम धनराशि है।",
    "Easy", ["Permanent Advance", "Imprest", "Contingency"]))

questions.append(q(75, 5, t5, th5, "GeM Procurement Threshold for Bidding",
    "Under Rule 149(iii) of GFR 2017, for procurement of goods above ₹5,00,000 on GeM, which method of purchase is mandatory?",
    "जीएफआर 2017 के नियम 149(iii) के अंतर्गत GeM पोर्टल पर ₹5,00,000 से अधिक की वस्तुओं की खरीद हेतु कौन सी पद्धति अनिवार्य है?",
    ["Direct purchase without comparison", "Mandatory online competitive Bidding or Reverse Auction (RA) on the GeM portal", "Physical hand-delivery of sealed tenders outside GeM", "Direct nomination to local friends"],
    ["बिना किसी तुलना के सीधी खरीद", "GeM पोर्टल पर अनिवार्य ऑनलाइन प्रतिस्पर्धी बोली (Bidding) अथवा रिवर्स नीलामी (RA)", "GeM के बाहर हाथ से सीलबंद निविदाएं मंगाना", "स्थानीय मित्रों का सीधा नामांकन"],
    1, "For purchases above ₹5 lakh on GeM, conducting an online competitive Bid or Reverse Auction (RA) is mandatory to ensure public transparency and competitive pricing.",
    "GeM पर ₹5 लाख से अधिक की खरीद हेतु पोर्टल पर ऑनलाइन निविदा (Bid) अथवा रिवर्स ऑक्शन (RA) आयोजित करना अनिवार्य है।",
    "Medium", ["GeM Bidding", "Rule 149", "Procurement Thresholds"]))

# ==========================================
# AREA 6: Office Procedure (76 to 90)
# ==========================================
t6 = "Office Procedure"
th6 = "कार्यालय प्रक्रिया एवं सेवा नियमावली"

questions.append(q(76, 6, t6, th6, "Central Secretariat Manual of Office Procedure (CSMOP)",
    "In standard Government Office Procedure (CSMOP), what is 'Docketing'?",
    "केंद्रीय सचिवालय कार्यालय कार्यविधि मैनुअल (CSMOP) के अनुसार 'डाकेटिंग' (Docketing) का क्या अर्थ है?",
    ["Destroying old files", "The process of making entries in the notes portion of a file about the serial number assigned to every paper added for consideration", "Sealing office doors after work hours", "Typing question papers on stencils"],
    ["पुरानी फाइलों को नष्ट करना", "फाइल के 'नोट्स' भाग में विचारार्थ जोड़ी गई प्रत्येक पत्र या पावती के क्रमांक और पते की आधिकारिक प्रविष्टि करना", "काम के बाद कमरों को सील करना", "स्टेंसिल पर पेपर टाइप करना"],
    1, "Docketing is the process of recording serial numbers of communications received and despatched on the notes portion of the file.",
    "डाकेटिंग का अर्थ फाइल के 'टिप्पणी' भाग में पत्राचार के क्रम संख्या और विवरण को औपचारिक रूप से दर्ज करना है।",
    "Medium", ["CSMOP", "Docketing", "Office Procedure"]))

questions.append(q(77, 6, t6, th6, "CSMOP - Note for Cabinet vs Routine Office Note",
    "In official correspondence, what is a 'Demi-Official' (DO) letter primarily used for?",
    "सरकारी पत्राचार में 'अर्द्ध-शासकीय' (D.O. Letter) पत्र का मुख्य रूप से क्या उपयोग होता है?",
    ["Publishing gazette notifications to the public", "Drawing the immediate personal attention of an officer of equivalent or higher rank for urgent official disposal", "Sending formal dismissal orders to peons", "Inviting open public commercial tenders"],
    ["जनता के लिए गजट अधिसूचना जारी करना", "समान या वरिष्ठ अधिकारी का व्यक्तिगत ध्यान आकर्षित कर अविलंबनीय आधिकारिक कार्य का त्वरित निस्तारण कराना", "चतुर्थ श्रेणी कर्मचारियों को बर्खास्तगी पत्र भेजना", "खुली व्यावसायिक निविदाएं आमंत्रित करना"],
    1, "A Demi-Official (D.O.) letter is addressed personally by name to an officer to invite personal attention or expedite confidential official matters.",
    "अर्द्ध-शासकीय पत्र व्यक्तिगत रूप से नाम से लिखा जाता है ताकि किसी महत्वपूर्ण या गोपनीय मामले में त्वरित व्यक्तिगत ध्यान आकृष्ट किया जा सके।",
    "Easy", ["DO Letter", "CSMOP", "Official Correspondence"]))

questions.append(q(78, 6, t6, th6, "CCS (Conduct) Rules 1964 - Rule 3 General Standards",
    "Under Rule 3 of the Central Civil Services (Conduct) Rules, 1964, which of the following is NOT an explicitly mandated obligation for a government servant?",
    "केंद्रीय सिविल सेवा (आचरण) नियमावली 1964 के नियम 3 के अंतर्गत सरकारी सेवक के लिए निम्नलिखित में से कौन सा दायित्व स्पष्ट रूप से अनिवार्य नहीं है?",
    ["Maintain absolute integrity", "Maintain devotion to duty", "Participate actively in political campaigns and election rallies during personal leave", "Do nothing which is unbecoming of a government servant"],
    ["पूर्ण सत्यनिष्ठा बनाए रखना", "कर्तव्य के प्रति निष्ठा बनाए रखना", "व्यक्तिगत अवकाश के दौरान राजनीतिक अभियानों और चुनाव रैलियों में सक्रिय भाग लेना", "ऐसा कोई कार्य न करना जो सरकारी सेवक के अशोभनीय हो"],
    2, "Rule 5 of CCS (Conduct) Rules strictly prohibits government servants from participating in politics, standing for election, or taking part in political activities.",
    "आचरण नियमावली का नियम 5 सरकारी कर्मचारियों को किसी भी राजनीतिक दल या चुनावी गतिविधि में भाग लेने से पूर्णतः प्रतिबंधित करता है।",
    "Easy", ["CCS Conduct Rules", "Rule 3", "Rule 5"]))

questions.append(q(79, 6, t6, th6, "CCS (Leave) Rules 1972 - Maximum Continuous Leave",
    "Under Rule 14 of the CCS (Leave) Rules 1972, what is the maximum continuous period of leave of any kind that may be granted to a government servant, unless permitted by the President under extraordinary circumstances?",
    "सीसीएस (अवकाश) नियमावली 1972 के नियम 14 के अनुसार राष्ट्रपति की विशेष अनुमति के बिना किसी कर्मचारी को निरंतर अधिकतम कितने समय का अवकाश दिया जा सकता है?",
    ["3 years", "5 years", "7 years", "10 years"],
    ["3 वर्ष", "5 वर्ष", "7 वर्ष", "10 वर्ष"],
    1, "Rule 14 specifies that no government servant shall be granted leave of any kind for a continuous period exceeding five years.",
    "नियम 14 के अनुसार सक्षम स्तर की विशेष स्वीकृति के बिना निरंतर 5 वर्ष से अधिक की अवधि के लिए कोई अवकाश स्वीकृत नहीं किया जाएगा।",
    "Medium", ["CCS Leave Rules", "Rule 14", "Service Regulations"]))

questions.append(q(80, 6, t6, th6, "CCS (Leave) Rules 1972 - Maternity Leave",
    "Under Rule 43 of CCS (Leave) Rules, 1972, what is the maximum duration of Maternity Leave that may be granted to a female government servant with less than two surviving children?",
    "सीसीएस (अवकाश) नियम 1972 के नियम 43 के तहत दो से कम जीवित बच्चों वाली महिला कर्मचारी को अधिकतम कितने दिनों का प्रसूति अवकाश देय होता है?",
    ["90 days", "135 days", "180 days", "240 days"],
    ["90 दिन", "135 दिन", "180 दिन", "240 दिन"],
    2, "Rule 43 provides Maternity Leave of 180 days from the date of its commencement to female government servants.",
    "नियम 43 के अनुसार महिला कर्मचारी को 180 दिन (6 माह) का प्रसूति अवकाश प्रदान किया जाता है।",
    "Easy", ["Maternity Leave", "Rule 43", "Leave Rules"]))

questions.append(q(81, 6, t6, th6, "CCS (Leave) Rules 1972 - Child Care Leave (CCL)",
    "Under Rule 43-C of CCS (Leave) Rules, what is the maximum limit of Child Care Leave (CCL) admissible to a female government servant or single male parent during the entire service?",
    "सीसीएस (अवकाश) नियम 43-C के अंतर्गत पूरी सेवा अवधि में महिला कर्मचारी या एकल पुरुष अभिभावक को अधिकतम कितने दिनों का बाल देखभाल अवकाश (CCL) अनुमन्य है?",
    ["365 days", "540 days", "730 days", "900 days"],
    ["365 दिन", "540 दिन", "730 दिन", "900 दिन"],
    2, "Rule 43-C permits Child Care Leave for a maximum of 730 days during entire service for rearing or looking after any need of up to two eldest surviving children.",
    "नियम 43-C के अनुसार दो ज्येष्ठ जीवित बच्चों की देखभाल हेतु पूरी सेवा में अधिकतम 730 दिन (2 वर्ष) का बाल देखभाल अवकाश स्वीकृत किया जा सकता है।",
    "Easy", ["Child Care Leave", "Rule 43-C", "Leave Rules"]))

questions.append(q(82, 6, t6, th6, "CCS (CCA) Rules 1965 - Major vs Minor Penalties",
    "Under Rule 11 of the Central Civil Services (Classification, Control and Appeal) Rules, 1965, which of the following is classified as a 'Major Penalty'?",
    "सीसीएस (सीसीए) नियमावली 1965 के नियम 11 के अंतर्गत निम्नलिखित में से कौन सी शास्ति 'दीर्घ शास्ति' (Major Penalty) की श्रेणी में आती है?",
    ["Censure (परिनिंदा)", "Withholding of promotion for a specified period", "Reduction to a lower stage in the time-scale of pay with cumulative effect", "Recovery from pay of pecuniary loss caused by negligence"],
    ["परिनिंदा (Censure)", "निश्चित अवधि के लिए पदोन्नति रोकना", "संचयी प्रभाव (cumulative effect) के साथ वेतनमान के निचले स्तर पर पदावनति", "लापरवाही से हुई वित्तीय हानि की वेतन से वसूली"],
    2, "Under Rule 11, reduction to a lower stage/post, compulsory retirement, removal, and dismissal are Major Penalties requiring a formal inquiry under Rule 14.",
    "वेतनमान के निचले स्तर पर पदावनति, अनिवार्य सेवानिवृत्ति, सेवा से हटाया जाना और बर्खास्तगी दीर्घ शास्तियां हैं जिसके लिए नियम 14 की औपचारिक जांच आवश्यक है।",
    "Hard", ["CCS CCA Rules", "Rule 11", "Major Penalty"]))

questions.append(q(83, 6, t6, th6, "CCS (CCA) Rules 1965 - Suspension Rules",
    "Under Rule 10 of the CCS (CCA) Rules 1965, an order of suspension made or deemed to have been made must be reviewed by the competent authority before the expiry of how many days?",
    "सीसीएस (सीसीए) नियमावली 1965 के नियम 10 के अनुसार निलंबन आदेश की समीक्षा सक्षम प्राधिकारी द्वारा अधिकतम कितने दिनों की समाप्ति से पूर्व की जानी अनिवार्य है?",
    ["30 days", "60 days", "90 days", "180 days"],
    ["30 दिन", "60 दिन", "90 दिन", "180 दिन"],
    2, "An order of suspension expires after 90 days unless it is extended after review by the Review Committee before expiry of 90 days.",
    "नियम 10 के अनुसार 90 दिनों के भीतर समीक्षा समिति द्वारा समीक्षा न किए जाने पर निलंबन आदेश स्वतः निष्प्रभावी हो जाता है।",
    "Hard", ["Suspension", "Rule 10", "CCS CCA Rules"]))

questions.append(q(84, 6, t6, th6, "CCS (Conduct) Rules 1964 - Private Trade or Employment",
    "Under Rule 15 of CCS (Conduct) Rules 1964, can a government school Principal engage in private tuition or commercial coaching?",
    "सीसीएस (आचरण) नियम 15 के अनुसार क्या कोई सरकारी विद्यालय का प्रधानाचार्य निजी ट्यूशन या व्यावसायिक कोचिंग कर सकता है?",
    ["Yes, freely after school hours", "No, engaging directly or indirectly in private trade, commercial coaching, or business without prior government sanction is strictly prohibited", "Yes, if students are from other schools", "Yes, with permission from local student council"],
    ["हाँ, विद्यालय समय के बाद स्वतंत्रतापूर्वक", "नहीं, सक्षम प्राधिकारी की लिखित पूर्व अनुमति के बिना निजी ट्यूशन, कोचिंग या व्यापार करना पूर्णतः प्रतिबंधित है", "हाँ, यदि विद्यार्थी दूसरे स्कूलों के हों", "हाँ, स्थानीय छात्र परिषद की अनुमति से"],
    1, "Rule 15 prohibits any government servant from engaging in private trade or employment or private coaching without previous government sanction (reinforced by Section 28 of RTE Act 2009).",
    "आचरण नियमावली के नियम 15 तथा आरटीई की धारा 28 के तहत बिना सक्षम प्राधिकारी की लिखित पूर्व अनुमति के निजी ट्यूशन या व्यवसाय पूर्णतः प्रतिबंधित है।",
    "Easy", ["Private Tuition", "Rule 15", "Conduct Rules"]))

questions.append(q(85, 6, t6, th6, "Maintenance of Service Books",
    "Under Supplementary Rules (SR 196-203), when must an employee's Service Book be verified with pay bills and attested by the Head of Office?",
    "पूरक नियमों (SR) के अनुसार, कार्यालय प्रमुख द्वारा कर्मचारी की सेवा पुस्तिका (Service Book) का वेतन बिलों से वार्षिक मिलान व सत्यापन कब किया जाना चाहिए?",
    ["Every month", "Annually, in respect of each completed year of service", "Only once in 10 years", "Only at the time of voluntary retirement"],
    ["प्रत्येक माह में", "प्रतिवर्ष, सेवा के प्रत्येक पूर्ण वर्ष के संदर्भ में (वार्षिक सत्यापन)", "10 वर्ष में केवल एक बार", "केवल स्वैच्छिक सेवानिवृत्ति के समय"],
    1, "SR 199 mandates that the Service Book of every government servant must be verified annually with the pay bills and a certificate of verification recorded therein.",
    "सेवा पुस्तिका का प्रतिवर्ष वेतन बिलों से मिलान कर सक्षम अधिकारी द्वारा वार्षिक सत्यापन प्रमाण-पत्र अंकित किया जाना वैधानिक रूप से अनिवार्य है।",
    "Medium", ["Service Book", "SR 199", "Office Procedure"]))

questions.append(q(86, 6, t6, th6, "Right to Information (RTI) Act 2005 - Timelines",
    "Under Section 7(1) of the Right to Information (RTI) Act 2005, within what time period must information concerning the life or liberty of a person be provided by the Public Information Officer (PIO)?",
    "सूचना का अधिकार (RTI) अधिनियम 2005 की धारा 7(1) के तहत यदि मांगी गई सूचना किसी व्यक्ति के जीवन या स्वतंत्रता से संबंधित हो, तो जन सूचना अधिकारी (PIO) द्वारा कितने समय में सूचना देना अनिवार्य है?",
    ["Within 24 hours", "Within 48 hours", "Within 7 days", "Within 30 days"],
    ["24 घंटे के भीतर", "48 घंटे के भीतर", "7 दिन के भीतर", "30 दिन के भीतर"],
    1, "Section 7(1) mandates that where the information sought concerns the life or liberty of a person, it shall be provided within 48 hours of receipt of the request.",
    "आरटीई कानून की धारा 7(1) के अनुसार व्यक्ति के जीवन या स्वतंत्रता से जुड़े मामलों में सूचना 48 घंटे के भीतर प्रदान की जानी अनिवार्य है।",
    "Medium", ["RTI Act 2005", "Section 7", "Public Information"]))

questions.append(q(87, 6, t6, th6, "Sexual Harassment of Women at Workplace (POSH) Act 2013",
    "Under Section 4 of the POSH Act 2013, what is the mandatory composition of the Internal Complaints Committee (ICC) in an educational institution having 10 or more employees?",
    "कार्यस्थल पर महिलाओं का लैंगिक उत्पीड़न (निवारण, प्रतिषेध एवं प्रतितोष) अधिनियम 2013 की धारा 4 के अनुसार आंतरिक शिकायत समिति (ICC) का अनिवार्य गठन क्या होना चाहिए?",
    ["Presided by a senior female employee, not less than half members being women, and at least one member from an NGO/association committed to the cause of women", "Only male department heads", "All local police constables", "External commercial contractors"],
    ["संस्था की वरिष्ठ महिला कर्मचारी पीठासीन अधिकारी, कुल सदस्यों में कम से कम 50% महिलाएं तथा महिला कल्याण हेतु समर्पित एनजीओ से एक बाह्य सदस्य", "केवल पुरुष विभागाध्यक्ष", "केवल स्थानीय पुलिस कर्मी", "बाहरी व्यावसायिक ठेकेदार"],
    0, "Section 4 mandates that the ICC must be headed by a woman presiding officer, have at least 50% women members, and include an external NGO representative.",
    "पॉक्स (POSH) कानून के अनुसार समिति की अध्यक्ष वरिष्ठ महिला होगी, 50% महिला सदस्य होंगी तथा एक बाह्य गैर-सरकारी संगठन का प्रतिनिधि सदस्य होगा।",
    "Medium", ["POSH Act 2013", "Internal Complaints Committee", "Women Safety"]))

questions.append(q(88, 6, t6, th6, "CSMOP - Record Retention Schedules",
    "According to Government Record Retention Schedules, what is a 'Class A' file?",
    "सरकारी अभिलेख प्रतिधारण अनुसूची (Record Retention Schedule) के अनुसार 'श्रेणी ए' (Class A) फाइल कौन सी होती है?",
    ["Destroyed within 1 year", "Permanent retention with microfilming / permanent historical digitization value", "Retained for 5 years only", "Used for draft scrap paper"],
    ["1 वर्ष में नष्ट की जाने वाली", "स्थायी रूप से सुरक्षित रखी जाने वाली (माइक्रोफिल्मिंग/डिजिटल स्थायी अभिलेखीय महत्व की)", "केवल 5 वर्ष रखी जाने वाली", "रद्दी कागज के रूप में उपयोग की जाने वाली"],
    1, "Class A files are files of permanent value preserved permanently, requiring microfilming or digital archiving due to statutory, historical, or administrative importance.",
    "श्रेणी 'ए' की फाइलें ऐतिहासिक, नीतिगत या कानूनी महत्व की होती हैं जिन्हें स्थायी रूप से संरक्षित रखा जाता है।",
    "Hard", ["Record Retention", "CSMOP", "Class A Files"]))

questions.append(q(89, 6, t6, th6, "Leave Encashment on Superannuation",
    "What is the maximum limit of accumulated Earned Leave (EL) and Half Pay Leave (HPL) that can be encashed at the time of retirement under CCS Leave Rules?",
    "सीसीएस अवकाश नियमों के तहत सेवानिवृत्ति पर संचित अर्जित अवकाश (EL) और अर्द्ध-औसत वेतन अवकाश (HPL) के नकदीकरण की अधिकतम संयुक्त सीमा कितनी है?",
    ["180 days", "240 days", "300 days", "360 days"],
    ["180 दिन", "240 दिन", "300 दिन", "360 दिन"],
    2, "Rule 39 allows encashment of accumulated Earned Leave and Half Pay Leave standing at credit up to a maximum limit of 300 days upon superannuation.",
    "सेवानिवृत्ति पर अधिकतम 300 दिनों के संचित अवकाश का नकदीकरण अनुमन्य होता है।",
    "Easy", ["Leave Encashment", "Retirement", "Rule 39"]))

questions.append(q(90, 6, t6, th6, "CCS (Conduct) Rules 1964 - Gifts",
    "Under Rule 13 of CCS (Conduct) Rules 1964, what is the ceiling above which Group 'A' officers must report gifts received from near relatives on occasions like weddings?",
    "सीसीएस (आचरण) नियमावली 1964 के नियम 13 के अनुसार विवाह आदि अवसरों पर निकट संबंधियों से कितने मूल्य से अधिक का उपहार मिलने पर ग्रुप ए अधिकारी को सरकार को सूचित करना अनिवार्य है?",
    ["₹5,000", "₹10,000", "₹25,000", "₹50,000"],
    ["₹5,000", "₹10,000", "₹25,000", "₹50,000"],
    2, "As per the updated Rule 13, Group A government servants must report gifts exceeding ₹25,000 from near relatives on ceremonial occasions.",
    "संशोधित नियम 13 के तहत ग्रुप ए अधिकारियों को निकट संबंधियों से ₹25,000 से अधिक के उपहार प्राप्त होने पर सरकार को सूचित करना अनिवार्य है।",
    "Medium", ["Gifts", "Rule 13", "Conduct Rules"]))

# ==========================================
# AREA 7: Pedagogy in Education (91 to 105)
# ==========================================
t7 = "Pedagogy in Education"
th7 = "शिक्षा शास्त्र, शिक्षण पद्धतियां एवं समावेशी शिक्षा"

questions.append(q(91, 7, t7, th7, "Jean Piaget's Cognitive Development Stages",
    "According to Jean Piaget's theory of cognitive development, in which stage does a child develop the capacity for abstract logical thinking and systematic hypothesis testing?",
    "जीन पियाजे के संज्ञानात्मक विकास सिद्धांत के अनुसार बालक में अमूर्त तार्किक चिंतन और परिकल्पना निर्माण की क्षमता किस अवस्था में विकसित होती है?",
    ["Sensorimotor Stage (0-2 years)", "Pre-operational Stage (2-7 years)", "Concrete Operational Stage (7-11 years)", "Formal Operational Stage (11 years and above)"],
    ["संवेदी-गामक अवस्था (0-2 वर्ष)", "पूर्व-संक्रियात्मक अवस्था (2-7 वर्ष)", "मूर्त संक्रियात्मक अवस्था (7-11 वर्ष)", "औपचारिक / अमूर्त संक्रियात्मक अवस्था (11 वर्ष और उससे ऊपर)"],
    3, "The Formal Operational Stage (ages 11+) is characterized by hypothetical-deductive reasoning, abstract conceptual thought, and metacognition.",
    "औपचारिक संक्रियात्मक अवस्था (11 वर्ष से ऊपर) में किशोर अमूर्त, तार्किक और वैज्ञानिक रूप से सोचने की योग्यता प्राप्त करता है।",
    "Easy", ["Piaget", "Cognitive Development", "Pedagogy"]))

questions.append(q(92, 7, t7, th7, "Lev Vygotsky's Socio-Cultural Theory",
    "In Lev Vygotsky's socio-cultural theory of learning, what does the 'Zone of Proximal Development' (ZPD) represent?",
    "लेव वाइगोत्स्की के सामाजिक-सांस्कृतिक सिद्धांत में 'समीपस्थ विकास का क्षेत्र' (ZPD) क्या दर्शाता है?",
    ["The physical boundaries of a classroom", "The distance between what a learner can do independently and what they can achieve with guidance and collaboration from a More Knowledgeable Other (MKO)", "The biological age of a child", "The school playground size"],
    ["कक्षा की भौतिक सीमाएं", "बच्चे द्वारा स्वतंत्र रूप से किए जा सकने वाले कार्य तथा किसी अधिक ज्ञानी अन्य (MKO) के मार्गदर्शन में किए जा सकने वाले कार्य के बीच का अंतर", "बालक की जैविक आयु", "विद्यालय का खेल का मैदान"],
    1, "ZPD is the gap between actual developmental level achieved independently and the level of potential development under adult guidance or peer collaboration.",
    "ZPD वह दूरी है जो बालक के वास्तविक विकास स्तर और मार्गदर्शन द्वारा प्राप्त किए जा सकने वाले संभावित विकास स्तर के बीच होती है।",
    "Medium", ["Vygotsky", "ZPD", "Scaffolding"]))

questions.append(q(93, 7, t7, th7, "Jerome Bruner's Discovery Learning & Spiral Curriculum",
    "What pedagogical concept was introduced by Jerome Bruner proposing that complex ideas can be taught to any child at any stage of development if structured appropriately, revisiting concepts with increasing depth?",
    "जेरोम ब्रूनर द्वारा प्रतिपादित वह कौन सा पाठ्यचर्या सिद्धांत है जिसके अनुसार किसी भी जटिल संकल्पना को बालक की विकास अवस्था के अनुरूप उत्तरोत्तर गहराई के साथ पुनः पढ़ाया जा सकता है?",
    ["Linear Curriculum", "Spiral Curriculum (सर्पिलाकार पाठ्यचर्या)", "Dormant Curriculum", "Null Curriculum"],
    ["रैखिक पाठ्यचर्या", "सर्पिलाकार पाठ्यचर्या (Spiral Curriculum)", "सुप्त पाठ्यचर्या", "शून्य पाठ्यचर्या"],
    1, "Bruner's Spiral Curriculum posits that fundamental ideas should be presented early and revisited repeatedly at higher levels of sophistication.",
    "सर्पिलाकार पाठ्यचर्या (Spiral Curriculum) में मूल विषयों को प्राथमिक स्तर पर सरल रूप में सिखाया जाता है और उच्च कक्षाओं में उसी संकल्पना को गहराई से दोहराया जाता है।",
    "Medium", ["Bruner", "Spiral Curriculum", "Pedagogy"]))

questions.append(q(94, 7, t7, th7, "Experiential Learning Cycle - David Kolb",
    "What are the four sequential stages in David Kolb's Experiential Learning Cycle?",
    "डेविड कोल्ब के अनुभवात्मक अधिगम चक्र (Experiential Learning Cycle) के चार क्रमिक चरण कौन से हैं?",
    ["Concrete Experience -> Reflective Observation -> Abstract Conceptualization -> Active Experimentation", "Reading -> Memorizing -> Writing -> Grading", "Lecture -> Drill -> Test -> Punishment", "Observation -> Imitation -> Examination -> Certification"],
    ["मूर्त अनुभव -> चिंतनशील अवलोकन -> अमूर्त संकल्पना -> सक्रिय प्रयोग", "पढ़ना -> रटना -> लिखना -> अंक देना", "व्याख्यान -> अभ्यास -> परीक्षण -> दंड", "अवलोकन -> अनुकरण -> परीक्षा -> प्रमाण पत्र"],
    0, "Kolb's cycle consists of four continuous stages: Concrete Experience (feeling), Reflective Observation (watching), Abstract Conceptualization (thinking), and Active Experimentation (doing).",
    "कोल्ब का अधिगम चक्र: मूर्त अनुभव (Doing/Feeling), परावर्तक चिंतन (Reviewing), अमूर्त संकल्पना (Concluding) और सक्रिय प्रयोग (Planning)।",
    "Hard", ["Kolb", "Experiential Learning", "Pedagogy"]))

questions.append(q(95, 7, t7, th7, "Inclusive Education & RPwD Act 2016",
    "Under the Rights of Persons with Disabilities (RPwD) Act 2016, how many specified benchmark disabilities are recognized to ensure inclusive educational provisions in schools?",
    "दिव्यांगजन अधिकार अधिनियम (RPwD Act) 2016 के तहत विद्यालयों में समावेशी शिक्षा सुनिश्चित करने हेतु कितनी विशिष्ट दिव्यांगताओं को मान्यता दी गई है?",
    ["7 disabilities", "14 disabilities", "21 disabilities", "28 disabilities"],
    ["7 दिव्यांगताएं", "14 दिव्यांगताएं", "21 दिव्यांगताएं", "28 दिव्यांगताएं"],
    2, "The RPwD Act 2016 expanded the number of recognized disabilities from 7 to 21, including Specific Learning Disabilities, Autism Spectrum Disorder, and Locomotor Disabilities.",
    "2016 के कानून ने दिव्यांगताओं की संख्या 7 से बढ़ाकर 21 कर दी है जिसमें अधिगम अक्षमता (Dyslexia आदि) और ऑटिज्म भी शामिल हैं।",
    "Easy", ["RPwD Act 2016", "21 Disabilities", "Inclusive Education"]))

questions.append(q(96, 7, t7, th7, "Universal Design for Learning (UDL)",
    "What are the three core principles of the Universal Design for Learning (UDL) framework endorsed in inclusive school pedagogy?",
    "समावेशी विद्यालयी शिक्षण में मान्य 'यूनिवर्सल डिजाइन फॉर लर्निंग' (UDL) के तीन मूल सिद्धांत क्या हैं?",
    ["Multiple means of Engagement, Multiple means of Representation, and Multiple means of Action & Expression", "Fixed lectures, Single standard textbook, and Closed-book testing", "Segregated classes, Uniform speed, and Identical worksheets", "Only digital games, No books, and No teacher intervention"],
    ["संबद्धता के विविध साधन, प्रतिनिधित्व/प्रस्तुति के विविध साधन और क्रिया व अभिव्यक्ति के विविध साधन", "निश्चित व्याख्यान, एकल पाठ्यपुस्तक और बंद पुस्तक परीक्षा", "अलग कक्षाएं, एकसमान गति और समान वर्कशीट", "केवल डिजिटल खेल, कोई किताब नहीं"],
    0, "UDL provides a blueprint for creating flexible instructional goals, methods, materials, and assessments across Engagement (Why), Representation (What), and Action & Expression (How).",
    "यूडीएल (UDL) का सिद्धांत सीखने के प्रति रुचि (Engagement), विषयवस्तु की प्रस्तुति (Representation) और अभिव्यक्ति (Expression) के विविध अवसर देने पर बल देता है।",
    "Medium", ["UDL", "Inclusive Education", "Pedagogy"]))

questions.append(q(97, 7, t7, th7, "Classroom Management and Positive Discipline",
    "Under Section 17 of the Right to Free and Compulsory Education (RTE) Act 2009, what is the statutory stance on corporal punishment and mental harassment of children in schools?",
    "शिक्षा का अधिकार अधिनियम (RTE) 2009 की धारा 17 के अनुसार विद्यालयों में शारीरिक दंड और मानसिक उत्पीड़न पर क्या विधिक व्यवस्था है?",
    ["Permitted with Headmaster's prior written approval", "Allowed only during physical training classes", "Completely and strictly prohibited, with violators liable to disciplinary action under applicable service rules", "Permitted if parents consent in writing"],
    ["प्रधानाध्यापक के पूर्व लिखित अनुमोदन से मान्य", "केवल पीटी कक्षा में अनुमन्य", "पूर्णतः और सख्ती से प्रतिबंधित, उल्लंघनकर्ता सेवा नियमों के तहत अनुशासनात्मक कार्रवाई के भागी होंगे", "अभिभावकों की लिखित सहमति पर मान्य"],
    2, "Section 17(1) explicitly prohibits physical punishment and mental harassment, making it an offence under Section 17(2).",
    "आरटीई की धारा 17 के तहत किसी भी बच्चे को शारीरिक दंड या मानसिक प्रताड़ना देना पूरी तरह प्रतिबंधित और दंडनीय है।",
    "Easy", ["RTE Act 2009", "Section 17", "Corporal Punishment"]))

questions.append(q(98, 7, t7, th7, "Mental Health Support - Manodarpan Initiative",
    "What is the objective of the 'Manodarpan' initiative launched by the Ministry of Education under the Atmanirbhar Bharat Abhiyan?",
    "आत्मनिर्भर भारत अभियान के तहत शिक्षा मंत्रालय द्वारा शुरू की गई 'मनोदर्पण' (Manodarpan) पहल का मुख्य उद्देश्य क्या है?",
    ["Providing psychological and psychosocial support to students, teachers, and families for mental health and well-being", "Distributing laptops to top rankers", "Constructing modern hostel buildings", "Organizing state football tournaments"],
    ["छात्रों, शिक्षकों और परिवारों को मानसिक स्वास्थ्य और भावनात्मक तंदुरुस्ती के लिए मनोसामाजिक परामर्श व सहायता प्रदान करना", "शीर्ष छात्रों को लैपटॉप बांटना", "आधुनिक छात्रावास बनाना", "राज्य स्तरीय फुटबॉल प्रतियोगिता कराना"],
    0, "Manodarpan covers a wide range of activities to provide psychosocial support to students, teachers, and families during and post-pandemic for their mental well-being.",
    "मनोदर्पण पहल विद्यार्थियों के मानसिक स्वास्थ्य, भावनात्मक संतुलन और मनोवैज्ञानिक कल्याण के लिए टोल-फ्री परामर्श और मार्गदर्शन उपलब्ध कराती है।",
    "Easy", ["Manodarpan", "Mental Health", "Counseling"]))

questions.append(q(99, 7, t7, th7, "Howard Gardner's Theory of Multiple Intelligences",
    "According to Howard Gardner's Multiple Intelligences Theory, a student who shows exceptional sensitivity to the moods, feelings, temperaments, and motivations of other people possesses high:",
    "हॉवर्ड गार्डनर के बहु-बुद्धि सिद्धांत के अनुसार, जो विद्यार्थी दूसरों के भावों, मनोदशाओं, स्वभाव और अभिप्रेरणाओं के प्रति असाधारण संवेदनशीलता दिखाता है, उसमें कौन सी बुद्धि उच्च होती है?",
    ["Intrapersonal Intelligence (अंतःवैयक्तिक)", "Interpersonal Intelligence (अंतर-वैयक्तिक)", "Spatial Intelligence (स्थानिक)", "Bodily-Kinesthetic Intelligence (शारीरिक-गतिक)"],
    ["अंतःवैयक्तिक बुद्धि (Intrapersonal)", "अंतर-वैयक्तिक बुद्धि (Interpersonal)", "स्थानिक बुद्धि (Spatial)", "शारीरिक-गतिक बुद्धि (Kinesthetic)"],
    1, "Interpersonal intelligence is the ability to understand and interact effectively with others, empathizing with their temperaments and intentions.",
    "दूसरों की भावनाओं, विचारों और व्यवहारों को समझने तथा उनके साथ प्रभावी संवाद स्थापित करने की क्षमता 'अंतर-वैयक्तिक बुद्धि' (Interpersonal) कहलाती है।",
    "Easy", ["Gardner", "Multiple Intelligences", "Pedagogy"]))

questions.append(q(100, 7, t7, th7, "Differentiated Instruction",
    "In a heterogeneous classroom, how does a teacher implement 'Differentiated Instruction'?",
    "विविधतापूर्ण कक्षा में एक शिक्षक 'विभेदीकृत अनुदेशन' (Differentiated Instruction) को किस प्रकार लागू करता है?",
    ["Teaching at the pace of the fastest student only", "Adapting content, process, products, and learning environment to match students' diverse readiness levels, interests, and learning profiles", "Giving identical punishment to all students", "Conducting only lecture method for all subjects"],
    ["केवल सबसे तेज छात्र की गति से पढ़ाना", "विद्यार्थियों की सीखने की तत्परता, रुचियों और अधिगम शैलियों के अनुसार विषयवस्तु, शिक्षण प्रक्रिया और उत्पाद में लचीला बदलाव करना", "सभी को एक जैसा दंड देना", "सभी विषयों में केवल व्याख्यान देना"],
    1, "Differentiated instruction modifies content, process, products, or learning environment in response to student readiness, interest, and learning profile.",
    "विभेदीकृत शिक्षण छात्रों की व्यक्तिगत क्षमताओं, रुचियों और सीखने की गति के अनुरूप शिक्षण विधियों और सामग्रियों में समायोजन करता है।",
    "Medium", ["Differentiated Instruction", "Pedagogy", "Inclusive Learning"]))

questions.append(q(101, 7, t7, th7, "Constructivist Classroom Roles",
    "In a constructivist classroom guided by NCF 2005 and NEP 2020, what is the primary role of the teacher?",
    "एनसीएफ 2005 और एनईपी 2020 द्वारा निर्देशित रचनावादी (Constructivist) कक्षा-कक्ष में शिक्षक की प्राथमिक भूमिका क्या है?",
    ["Authoritarian dispenser of unalterable knowledge", "Facilitator and mediator who scaffolds students in actively constructing their own knowledge through inquiry and reflection", "Passive bystander who does not speak", "Strict disciplinarian who demands silent copying"],
    ["अपरिवर्तनीय ज्ञान का सत्तावादी वितरक", "सुविधादाता (Facilitator) जो खोज, संवाद और परावर्तन के माध्यम से विद्यार्थियों को स्वयं ज्ञान का निर्माण करने में सहायता करता है", "मूक दर्शक जो कुछ नहीं बोलता", "कठोर अनुशासक जो केवल नकल करवाता है"],
    1, "In constructivism, the teacher is a facilitator who creates an inquiry-driven environment supporting learners to actively construct meaning.",
    "रचनावाद में शिक्षक ज्ञान का भंडार न होकर एक सुगमकर्ता/सुविधादाता (Facilitator) होता है जो सीखने के अनुकूल अवसर बनाता है।",
    "Easy", ["Constructivism", "NCF 2005", "Teacher Role"]))

questions.append(q(102, 7, t7, th7, "Metacognition in Student Learning",
    "What does 'Metacognition' mean in the context of student cognitive development and pedagogy?",
    "विद्यार्थियों के संज्ञानात्मक विकास और शिक्षण के संदर्भ में 'मेटाकॉग्निशन' (Metacognition / परा-संज्ञान) का क्या अर्थ है?",
    ["Memorizing facts without thinking", "Awareness, monitoring, and regulation of one's own thinking and learning processes (thinking about thinking)", "Solving arithmetic problems on calculators", "Copying answers from blackboards"],
    ["बिना सोचे-समझे तथ्यों को रटना", "अपनी स्वयं की चिंतन और सीखने की प्रक्रियाओं की सजगता, निगरानी और नियंत्रण (चिंतन के बारे में चिंतन)", "कैलकुलेटर पर गणित के सवाल हल करना", "श्यामपट्ट से उत्तर की नकल करना"],
    1, "Metacognition is 'thinking about thinking' or awareness and management of one's own learning strategies, planning, monitoring, and self-evaluating.",
    "मेटाकॉग्निशन का अर्थ है अपनी स्वयं की विचार प्रक्रियाओं, समझ और सीखने की रणनीतियों को जानना और उनका नियमन करना।",
    "Medium", ["Metacognition", "Cognitive Psychology", "Pedagogy"]))

questions.append(q(103, 7, t7, th7, "Formative Assessment Techniques",
    "Which of the following is considered an authentic formative assessment tool rather than a formal summative examination?",
    "निम्नलिखित में से कौन सा उपकरण औपचारिक योगात्मक परीक्षा के बजाय एक प्रामाणिक रचनात्मक मूल्यांकन उपकरण माना जाता है?",
    ["Three-hour annual written examination", "Student Learning Portfolio documenting reflections, drafts, and self-assessments over time", "Rank list pinned on school gate", "Final board percentile mark sheet"],
    ["तीन घंटे की वार्षिक लिखित परीक्षा", "समय के साथ चिंतन, प्रारूप और आत्म-मूल्यांकन को संजोने वाला विद्यार्थी अधिगम पोर्टफोलियो (Portfolio)", "गेट पर चिपकाई गई रैंक सूची", "अंतिम बोर्ड मार्कशीट"],
    1, "A portfolio is an ongoing purposeful collection of student work that shows progress, self-reflection, and achievement over time, serving as an authentic formative tool.",
    "पोर्टफोलियो (Portfolio) विद्यार्थी द्वारा किए गए कार्यों का क्रमिक संग्रह है जो उसकी प्रगति, प्रयासों और सीखने के विकास को दर्शाता है।",
    "Easy", ["Portfolio", "Formative Assessment", "Pedagogy"]))

questions.append(q(104, 7, t7, th7, "Pedagogical Leadership of the Principal",
    "According to National Institute of Educational Planning and Administration (NIEPA) school leadership frameworks, how does a Principal act as an 'Instructional/Pedagogical Leader'?",
    "नीपा (NIEPA) के विद्यालय नेतृत्व ढांचे के अनुसार एक प्रधानाचार्य 'शैक्षणिक / निर्देशात्मक नेता' (Pedagogical Leader) के रूप में किस प्रकार कार्य करता है?",
    ["By delegating all academic decisions to external coaching agencies", "By focusing actively on classroom teaching-learning quality, mentoring teachers, observing classes, and using student assessment data to guide pedagogical improvements", "By spending all time exclusively on financial voucher audits", "By remaining seated in the office without visiting classrooms"],
    ["सभी शैक्षणिक निर्णय निजी कोचिंग एजेंसियों को सौंपकर", "कक्षा शिक्षण-अधिगम की गुणवत्ता पर सक्रिय ध्यान देकर, शिक्षकों का मार्गदर्शन कर, कक्षा अवलोकन कर तथा छात्र मूल्यांकन डेटा के आधार पर सुधार की योजना बनाकर", "पूरा समय केवल वित्तीय वाउचर जांचने में लगाकर", "कार्यालय में बैठे रहकर कक्षाओं का कभी दौरा न करके"],
    1, "Instructional leadership involves setting academic expectations, actively observing instruction, mentoring teachers, and driving collaborative professional growth.",
    "शैक्षणिक नेतृत्व में प्रधानाचार्य कक्षाओं का अवलोकन करता है, अध्यापकों को शिक्षण संबंधी मार्गदर्शन देता है और बच्चों के सीखने के स्तर में निरंतर सुधार सुनिश्चित करता है।",
    "Medium", ["Instructional Leadership", "NIEPA", "School Administration"]))

questions.append(q(105, 7, t7, th7, "Child-Centred Curriculum Planning",
    "What is the foundational premise of a child-centred curriculum as advocated by John Dewey and Maria Montessori?",
    "जॉन डीवी और मारिया मांटेसरी द्वारा समर्थित बाल-केंद्रित पाठ्यचर्या (Child-Centred Curriculum) की मूल मान्यता क्या है?",
    ["Curriculum must be strictly driven by adult professional convenience", "Learning experiences should be organized around the natural developmental needs, curiosity, active experiences, and interests of the child", "Children must be treated as empty vessels to be passively filled", "Rigid memorization of textbooks is supreme"],
    ["पाठ्यक्रम केवल वयस्कों की सुविधा के अनुसार होना चाहिए", "अधिगम अनुभव बालक की स्वाभाविक विकासात्मक आवश्यकताओं, जिज्ञासा, सक्रिय अनुभवों और रुचियों के इर्द-गिर्द आयोजित होने चाहिए", "बच्चों को खाली बर्तन मानकर उनमें ज्ञान उड़ेलना चाहिए", "पुस्तकों का कठोर रटन सर्वोपरि है"],
    1, "Child-centred pedagogy places the learner at the centre, organizing meaningful experiences based on their developmental stage, prior knowledge, and active agency.",
    "बाल-केंद्रित शिक्षा में बालक को शिक्षण प्रक्रिया का केंद्र बिंदु माना जाता है तथा उसके अनुभवों और स्वाभाविक रुचियों को प्राथमिकता दी जाती है।",
    "Easy", ["Child-Centred Pedagogy", "Dewey", "Montessori"]))

# ==========================================
# AREA 8: Digital Literacy (106 to 120)
# ==========================================
t8 = "Digital Literacy"
th8 = "डिजिटल साक्षरता एवं शैक्षिक प्रौद्योगिकी पहल"

questions.append(q(106, 8, t8, th8, "DIKSHA National Digital Infrastructure",
    "What is 'DIKSHA' (Digital Infrastructure for Knowledge Sharing) created by the Ministry of Education?",
    "शिक्षा मंत्रालय द्वारा विकसित 'दीक्षा' (DIKSHA) राष्ट्रीय डिजिटल मंच का प्राथमिक स्वरूप क्या है?",
    ["A private gaming website", "A national digital platform for school education providing high-quality, curriculum-linked e-content, QR-coded Energized Textbooks, and teacher training courses across India", "A commercial real-estate booking portal", "An airline reservation engine"],
    ["एक निजी गेमिंग वेबसाइट", "स्कूली शिक्षा का राष्ट्रीय डिजिटल मंच जो क्यूआर-कोडेड पाठ्यपुस्तकें, पाठ्यक्रम-आधारित ई-सामग्री और शिक्षक प्रशिक्षण पाठ्यक्रम उपलब्ध कराता है", "व्यावसायिक संपत्ति पोर्टल", "विमान टिकट बुकिंग प्रणाली"],
    1, "DIKSHA is the 'One Nation, One Digital Platform' for school education in India, providing QR-coded energized textbooks and digital resources in 30+ languages.",
    "दीक्षा (DIKSHA) देश भर के स्कूली छात्रों और शिक्षकों के लिए डिजिटल शिक्षण सामग्री, वीडियो और प्रशिक्षण मॉड्यूल प्रदान करने वाला राष्ट्रीय मंच है।",
    "Easy", ["DIKSHA", "Digital Literacy", "EdTech Initiatives"]))

questions.append(q(107, 8, t8, th8, "PM e-VIDYA Program",
    "What is the core feature of the 'PM e-VIDYA' comprehensive digital initiative launched under the Atmanirbhar Bharat Abhiyan?",
    "आत्मनिर्भर भारत अभियान के तहत शुरू की गई 'पीएम ई-विद्या' (PM e-VIDYA) पहल की प्रमुख विशेषता क्या है?",
    ["'One Class, One TV Channel' dedicated educational broadcasting, DIKSHA platform integration, and community radio broadcasts to reach every child", "Distributing petrol coupons to teachers", "Abolishing internet connections in rural schools", "Exclusive commercial satellite launches"],
    ["'एक कक्षा, एक टीवी चैनल' समर्पित शैक्षिक प्रसारण, दीक्षा मंच का एकीकरण और दूरदराज तक शिक्षा पहुंचाने हेतु सामुदायिक रेडियो", "शिक्षकों को पेट्रोल कूपन बांटना", "ग्रामीण स्कूलों में इंटरनेट बंद करना", "वाणिज्यिक उपग्रह प्रक्षेपण"],
    0, "PM e-VIDYA integrates digital/online/on-air access to education through DIKSHA, 200 dedicated DTH TV channels ('One Class, One TV Channel'), and radio.",
    "पीएम ई-विद्या डिजिटल, ऑनलाइन और टीवी चैनलों (एक कक्षा एक टीवी चैनल) के माध्यम से बिना किसी रुकावट के शिक्षा उपलब्ध कराने का राष्ट्रीय कार्यक्रम है।",
    "Medium", ["PM e-VIDYA", "Digital Learning", "EdTech"]))

questions.append(q(108, 8, t8, th8, "SWAYAM PRABHA DTH Channels",
    "How does the 'SWAYAM PRABHA' group of DTH channels deliver educational curriculum programs across India?",
    "'स्वयं प्रभा' (SWAYAM PRABHA) डीटीएच चैनल समूह भारत में शैक्षिक कार्यक्रमों का प्रसारण किस प्रकार करता है?",
    ["Through 34+ high-quality educational channels broadcasting 24x7 using GSAT-15 satellite transponders", "Through paid cable subscriptions only", "Through terrestrial analog antennas only in metropolitan cities", "By broadcasting sports events exclusively"],
    ["जीसैट-15 उपग्रह का उपयोग करके चौबीसों घंटे 34 से अधिक उच्च गुणवत्ता वाले शैक्षिक चैनलों के माध्यम से निःशुल्क प्रसारण", "केवल सशुल्क केबल कनेक्शन से", "केवल महानगरों में पुराने एंटीना से", "केवल खेल प्रसारण से"],
    0, "SWAYAM PRABHA is a group of DTH channels devoted to telecasting high-quality educational programmes on a 24X7 basis using GSAT-15 satellite.",
    "स्वयं प्रभा 24x7 निःशुल्क शैक्षिक कार्यक्रमों का प्रसारण करने वाला डीटीएच चैनलों का समूह है जो जीसैट-15 उपग्रह द्वारा संचालित होता है।",
    "Easy", ["SWAYAM PRABHA", "Educational Television", "Digital Education"]))

questions.append(q(109, 8, t8, th8, "Cyber Security in Schools - Phishing Attacks",
    "In institutional IT security, what is a 'Phishing' cyber attack that school administrators must protect their offices against?",
    "संस्थागत आईटी सुरक्षा में 'फिशिंग' (Phishing) साइबर हमला क्या होता है जिससे विद्यालय प्रमुख को अपने कार्यालय को सुरक्षित रखना चाहिए?",
    ["A hardware short circuit in computers", "A fraudulent attempt to steal sensitive data such as passwords, OTPs, and banking credentials by disguising as a trustworthy entity in electronic communications", "A printer running out of toner", "An official courier letter sent by post"],
    ["कंप्यूटर में हार्डवेयर का शार्ट सर्किट", "विश्वसनीय संस्था बनकर फर्जी ईमेल या संदेशों के माध्यम से पासवर्ड, ओटीपी और गोपनीय वित्तीय जानकारी चुराने का धोखाधड़ीपूर्ण प्रयास", "प्रिंटर की स्याही समाप्त होना", "डाक द्वारा भेजा गया आधिकारिक पत्र"],
    1, "Phishing is a social engineering attack where attackers deceive users into revealing sensitive information by mimicking authentic institutions or administrators.",
    "फिशिंग एक साइबर अपराध है जिसमें धोखेबाज असली दिखने वाले ईमेल या लिंक भेजकर पासवर्ड, बैंक विवरण या गोपनीय डेटा चुराते हैं।",
    "Easy", ["Cyber Security", "Phishing", "IT Safety"]))

questions.append(q(110, 8, t8, th8, "Information Technology Act, 2000 - Cyber Defamation & Data Privacy",
    "Under the Information Technology (IT) Act, 2000, which statutory section penalizes identity theft and fraudulent impersonation using computer resources?",
    "सूचना प्रौद्योगिकी (IT) अधिनियम 2000 के अंतर्गत कौन सी धारा कंप्यूटर संसाधनों द्वारा पहचान की चोरी (Identity Theft) और प्रतिरूपण को दंडनीय बनाती है?",
    ["Section 66C & 66D", "Section 10", "Section 21", "Section 45"],
    ["धारा 66C एवं 66D", "धारा 10", "धारा 21", "धारा 45"],
    0, "Section 66C prescribes punishment for identity theft (using electronic signature/password of another person), and Section 66D penalizes cheating by personation using computer resource.",
    "आईटी कानून की धारा 66C पहचान की चोरी (पासवर्ड आदि चुराना) और 66D कंप्यूटर द्वारा प्रतिरूपण कर धोखाधड़ी करने पर सजा का प्रावधान करती है।",
    "Hard", ["IT Act 2000", "Cyber Law", "Section 66C"]))

questions.append(q(111, 8, t8, th8, "Spreadsheets - Formulas and Functions",
    "In Microsoft Excel or Google Sheets used for school result processing, what does the formula '=AVERAGE(B2:B31)' compute?",
    "विद्यालय परीक्षा परिणाम तैयार करते समय एमएस एक्सेल या गूगल शीट्स में सूत्र '=AVERAGE(B2:B31)' क्या परिकलित करता है?",
    ["The sum of all values in row 2", "The arithmetic mean of all numeric values from cell B2 to cell B31", "The highest mark in cell B2", "The total count of empty cells"],
    ["पंक्ति 2 के सभी मानों का योग", "सेल B2 से सेल B31 तक के सभी संख्यात्मक मानों का अंकगणितीय औसत", "सेल B2 का सर्वोच्च अंक", "रिक्त सेलों की कुल संख्या"],
    1, "The AVERAGE function calculates the arithmetic mean of the specified range of cells (B2 through B31).",
    "यह सूत्र B2 से B31 तक के सभी सेलों में दर्ज अंकों का समांतर औसत (Mean) निकालता है।",
    "Easy", ["Spreadsheets", "Excel", "Data Processing"]))

questions.append(q(112, 8, t8, th8, "Operating Systems & File Extensions",
    "Which of the following file extensions signifies a portable, device-independent standardized document format commonly used for official government circulars?",
    "निम्नलिखित में से कौन सा फाइल एक्सटेंशन एक पोर्टेबल और सुरक्षित दस्तावेज प्रारूप दर्शाता है जिसका उपयोग सरकारी परिपत्रों हेतु किया जाता है?",
    [".pdf", ".exe", ".mp3", ".avi"],
    [".pdf", ".exe", ".mp3", ".avi"],
    0, "Portable Document Format (.pdf) is the global standard for electronic documents that preserves layout and fonts independently of hardware/OS.",
    "पीडीएफ (.pdf) पोर्टेबल डॉक्यूमेंट फॉर्मेट है जो किसी भी कंप्यूटर या मोबाइल पर बिना प्रारूप बदले दस्तावेज को सुरक्षित रखता है।",
    "Easy", ["File Extensions", "PDF", "Computer Literacy"]))

questions.append(q(113, 8, t8, th8, "Computer Networking - LAN vs WAN",
    "A computer network that connects computers within a single school campus or building over a localized geographical area is called:",
    "एक ही विद्यालय परिसर अथवा भवन के भीतर कंप्यूटरों को आपस में जोड़ने वाले स्थानीय नेटवर्क को क्या कहा जाता है?",
    ["Local Area Network (LAN)", "Wide Area Network (WAN)", "Global Area Network (GAN)", "Intergalactic Network"],
    ["लोकल एरिया नेटवर्क (LAN)", "वाइड एरिया नेटवर्क (WAN)", "ग्लोबल एरिया नेटवर्क (GAN)", "इंटरगैलेक्टिक नेटवर्क"],
    0, "A Local Area Network (LAN) interconnects computers within a limited area such as a school building or campus using high-speed network switches and Wi-Fi.",
    "लैन (LAN) एक सीमित क्षेत्र जैसे विद्यालय भवन या कंप्यूटर लैब के भीतर कंप्यूटरों को आपस में जोड़ने वाला नेटवर्क है।",
    "Easy", ["LAN", "Networking", "Computer Fundamentals"]))

questions.append(q(114, 8, t8, th8, "Assistive Technology for Inclusive Education",
    "Which assistive digital technology is specifically designed to convert on-screen text into synthesized speech or refreshable braille for visually impaired learners?",
    "दृष्टिबाधित विद्यार्थियों के लिए कंप्यूटर स्क्रीन पर लिखे पाठ को संश्लेषित ध्वनि अथवा ब्रेल लिपि में बदलने वाली सहायक तकनीक क्या कहलाती है?",
    ["Screen Reader (स्क्रीन रीडर, जैसे JAWS / NVDA)", "Graphic tablet", "Laser barcode scanner", "Dot matrix thermal plotter"],
    ["स्क्रीन रीडर (Screen Reader - जैसे NVDA/JAWS)", "ग्राफिक टैबलेट", "बारकोड स्कैनर", "थर्मल प्लॉटर"],
    0, "Screen readers (e.g., NVDA, JAWS) read aloud digital text on screen or output to refreshable Braille displays, enabling visually challenged learners to access computers.",
    "स्क्रीन रीडर एक सॉफ्टवेयर है जो कंप्यूटर स्क्रीन की सामग्री को बोलकर सुनाता है ताकि दृष्टिबाधित विद्यार्थी आसानी से अध्ययन कर सकें।",
    "Medium", ["Assistive Technology", "Inclusive EdTech", "Screen Reader"]))

questions.append(q(115, 8, t8, th8, "Cloud Storage and Collaboration Tools",
    "What is the primary operational advantage of using cloud-based collaborative productivity suites (such as Google Workspace or Microsoft 365) in school administration?",
    "विद्यालय प्रशासन में क्लाउड-आधारित सहयोगात्मक टूल्स (जैसे गूगल वर्कस्पेस या माइक्रोसॉफ्ट 365) का उपयोग करने का मुख्य लाभ क्या है?",
    ["Multiple users can collaborate and edit documents simultaneously in real-time from any device with automatic version history and cloud backup", "Requires heavy desktop installations on single computers without internet", "Deletes files permanently every Friday", "Prevents teachers from viewing timetables"],
    ["इंटरनेट से जुड़े किसी भी उपकरण से कई शिक्षक वास्तविक समय में एक साथ कार्य कर सकते हैं तथा डेटा स्वतः सुरक्षित रहता है", "बिना इंटरनेट के केवल एक कंप्यूटर पर भारी इंस्टालेशन मांगता है", "प्रत्येक शुक्रवार को फाइलें स्वतः नष्ट हो जाती हैं", "शिक्षकों को समय सारणी देखने से रोकता है"],
    0, "Cloud suites enable real-time co-authoring, automatic cloud backups, continuous version history, and device-independent access.",
    "क्लाउड टूल्स के द्वारा विभिन्न शिक्षक और प्रधानाचार्य कहीं से भी एक साथ दस्तावेजों और रिपोर्टों पर वास्तविक समय में कार्य कर सकते हैं।",
    "Easy", ["Cloud Storage", "Collaboration", "Productivity"]))

questions.append(q(116, 8, t8, th8, "Unified District Information System for Education (UDISE+)",
    "What is 'UDISE+' managed by the Department of School Education and Literacy, Ministry of Education?",
    "शिक्षा मंत्रालय के स्कूली शिक्षा और साक्षरता विभाग द्वारा प्रबंधित 'यूडाइस प्लस' (UDISE+) क्या है?",
    ["An online video streaming platform for movies", "The nation's largest centralized digital management information system collecting verified annual institutional data on school infrastructure, enrolments, teachers, and physical facilities", "A gaming app for high schoolers", "A bank loan application system"],
    ["फिल्मों के लिए ऑनलाइन वीडियो प्लेटफॉर्म", "देश का सबसे बड़ा केंद्रीकृत डिजिटल प्रबंधन सूचना तंत्र जो विद्यालयों के बुनियादी ढांचे, छात्र नामांकन, शिक्षकों और सुविधाओं का प्रमाणित डेटा संकलित करता है", "गेमिंग ऐप", "बैंक ऋण प्रणाली"],
    1, "UDISE+ is the official nation-wide digital repository of verified school data covering over 1.48 million schools, 265 million students, and 9.5 million teachers.",
    "यूडाइस प्लस (UDISE+) देश के सभी स्कूलों, विद्यार्थियों, शिक्षकों और भौतिक संसाधनों का प्रमाणित वार्षिक डेटा संकलित करने वाली राष्ट्रीय प्रणाली है।",
    "Medium", ["UDISE+", "School Management Information System", "EdTech"]))

questions.append(q(117, 8, t8, th8, "NDEAR - National Digital Education Architecture",
    "What is the vision of the 'National Digital Education Architecture' (NDEAR) introduced in alignment with NEP 2020?",
    "एनईपी 2020 के अनुरूप शुरू की गई 'राष्ट्रीय डिजिटल शिक्षा संरचना' (NDEAR) का मुख्य उद्देश्य क्या है?",
    ["Selling foreign software licenses to state governments", "Creating an interoperable, open-source digital public infrastructure (DPI) to unify education ecosystems, student registries, and digital credentials", "Abolishing all paper examinations immediately", "Replacing teachers with automated robots"],
    ["राज्य सरकारों को विदेशी सॉफ्टवेयर बेचना", "एक अंतर-संचालनीय ओपन डिजिटल सार्वजनिक अवसंरचना (DPI) बनाना जो शिक्षा तंत्र, छात्र रिकॉर्ड और डिजिटल प्रमाणपत्रों को एकीकृत करे", "सभी कागजी परीक्षाएं तुरंत बंद करना", "शिक्षकों की जगह रोबोट लगाना"],
    1, "NDEAR provides open digital architecture and federated building blocks enabling seamless, interoperable educational technology solutions across India.",
    "एनडीईएआर (NDEAR) भारत के संपूर्ण डिजिटल शिक्षा तंत्र को जोड़ने वाली खुली और सुरक्षित राष्ट्रीय डिजिटल सार्वजनिक अवसंरचना है।",
    "Hard", ["NDEAR", "Digital Public Infrastructure", "NEP 2020"]))

questions.append(q(118, 8, t8, th8, "Computer Hardware - Volatile vs Non-Volatile Memory",
    "Which component of a computer serves as its temporary, volatile working memory that loses its content immediately when the power supply is turned off?",
    "कंप्यूटर का कौन सा घटक अस्थायी (Volatile) कार्यशील मेमोरी के रूप में कार्य करता है जो बिजली बंद होते ही अपने डेटा को खो देता है?",
    ["Random Access Memory (RAM)", "Read Only Memory (ROM)", "Solid State Drive (SSD)", "Magnetic Hard Disk Drive (HDD)"],
    ["रैंडम एक्सेस मेमोरी (RAM)", "रीड ओनली मेमोरी (ROM)", "सॉलिड स्टेट ड्राइव (SSD)", "हार्ड डिस्क ड्राइव (HDD)"],
    0, "RAM is volatile memory used by the operating system and active programs for temporary rapid data access; uncommitted data is lost upon power loss.",
    "रैम (RAM) एक अस्थिर/परिवर्तनशील मेमोरी है जो कंप्यूटर के चालू रहने तक ही सक्रिय प्रोग्रामों का डेटा संभालती है।",
    "Easy", ["RAM", "Computer Hardware", "Memory"]))

questions.append(q(119, 8, t8, th8, "APAAR ID / Automated Permanent Academic Account Registry",
    "What is the 'APAAR ID' (One Nation, One Student ID) introduced by the Ministry of Education under NEP 2020?",
    "एनईपी 2020 के अंतर्गत शिक्षा मंत्रालय द्वारा शुरू की गई 'अपार आईडी' (APAAR ID - One Nation, One Student ID) क्या है?",
    ["A temporary paper pass for bus travel", "A unique 12-digit lifelong digital identity for every student in India linked to the Academic Bank of Credits (ABC) to seamlessly track academic progress and credentials", "A commercial credit card for students", "A sports uniform coupon"],
    ["बस यात्रा हेतु अस्थायी पास", "प्रत्येक विद्यार्थी की 12 अंकों की आजीवन विशिष्ट डिजिटल पहचान जो एकेडमिक बैंक ऑफ क्रेडिट्स (ABC) से जुड़कर शैक्षणिक यात्रा व प्रमाणपत्रों को डिजिटल रूप से ट्रैक करती है", "विद्यार्थी क्रेडिट कार्ड", "खेलकूद की पोशाक का कूपन"],
    1, "APAAR (Automated Permanent Academic Account Registry) provides every school student with a unique lifelong digital identity linked to ABC and DigiLocker.",
    "अपार आईडी 'वन नेशन, वन स्टूडेंट आईडी' है जो भारत के प्रत्येक विद्यार्थी को 12 अंकों की विशिष्ट आजीवन डिजिटल पहचान प्रदान करती है।",
    "Medium", ["APAAR ID", "One Nation One Student ID", "DigiLocker"]))

questions.append(q(120, 8, t8, th8, "Information Security - Strong Password Practices",
    "According to Government Cyber Security Guidelines for administrative offices, which practice best ensures a strong and secure institutional password?",
    "सरकारी साइबर सुरक्षा दिशानिर्देशों के अनुसार प्रशासनिक कार्यालयों के लिए सबसे मजबूत और सुरक्षित पासवर्ड का मानक क्या है?",
    ["Using the institution's name and pincode", "Using at least 12 characters combining uppercase letters, lowercase letters, numbers, and special symbols, changed periodically and not shared", "Writing the password on a sticky note pasted on the monitor", "Sharing the password via SMS to all visitors"],
    ["विद्यालय का नाम और पिनकोड उपयोग करना", "कम से कम 12 वर्णों का मिश्रण जिसमें बड़े अक्षर, छोटे अक्षर, अंक और विशेष चिह्न शामिल हों, जिसे समय-समय पर बदला जाए और साझा न किया जाए", "मॉनिटर पर कागज पर लिखकर चिपका देना", "सभी आगंतुकों को एसएमएस से पासवर्ड भेजना"],
    1, "Best cybersecurity hygiene mandates complex passwords of at least 12 characters combining multi-case alphabets, numbers, and special characters, coupled with multi-factor authentication (MFA).",
    "सुरक्षित पासवर्ड में कम से कम 12 वर्ण होने चाहिए जिसमें बड़े व छोटे अक्षर, संख्याएं और विशेष प्रतीक शामिल हों तथा दो-चरणीय प्रमाणीकरण (2FA) का उपयोग होना चाहिए।",
    "Easy", ["Cyber Hygiene", "Password Security", "Digital Literacy"]))

print(f"Total questions generated for UPSC Principal CRT: {len(questions)}")

# Write to src/data/upscPrincipalBank.ts
ts_content = f"""// UPSC Principal & Vice Principal Combined Recruitment Test (CRT)
// Exactly 120 Questions across all 8 Prescribed Syllabus Areas (15 Questions per Area)
// Total Marks: 300.0 (2.5 marks/Q) • Duration: 120 Minutes • Negative Marking: 1/3 (-0.8333333333333334)
import {{ Question }} from '../types/quiz';

export const UPSC_PRINCIPAL_QUESTIONS: Question[] = {json.dumps(questions, ensure_ascii=False, indent=2)};
"""

with open("src/data/upscPrincipalBank.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Successfully wrote src/data/upscPrincipalBank.ts with 120 questions!")
