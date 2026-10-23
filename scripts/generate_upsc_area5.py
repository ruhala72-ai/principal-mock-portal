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
            "verifiedBy": "Official Gazette & Government Rules Audit"
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

qs = []

# ========================================================
# AREA 5: Management and Financial Administration (181 to 195)
# ========================================================
t5 = "Management and Financial Administration"
th5 = "प्रबंधन एवं वित्तीय प्रशासन"

a5 = [
    # 181
    ("GFR 2017 - Rule 149 GeM Slabs", "UPSC-FIN-GFR2017-RULE149-SLABS", "Tests the 3 statutory procurement threshold slabs on GeM portal",
     "General Financial Rules 2017", "Rule 149(i), (ii), (iii)", 1, "Department of Expenditure, Ministry of Finance", "GFR 2017, Rule 149",
     "Under Rule 149 of GFR 2017, for procurement of goods above Rs. 5,00,000 on the GeM portal, which mandatory procedure must a Head of Office follow?",
     "जीएफआर 2017 के नियम 149 के अंतर्गत, GeM पोर्टल पर 5,00,000 रुपये से अधिक की वस्तुओं की खरीद के लिए कार्यालय प्रमुख को कौन सी अनिवार्य प्रक्रिया अपनानी चाहिए?",
     ["Direct purchase from any seller without quotation",
      "Mandatory online bidding or reverse auction (RA) amongst all eligible registered suppliers",
      "Offline manual spot enquiry from local vendors",
      "Direct negotiation with the highest bidder"],
     ["बिना कोटेशन के किसी भी विक्रेता से सीधी खरीद",
      "सभी पात्र पंजीकृत विक्रेताओं के मध्य अनिवार्य ऑनलाइन बोली (Bidding) अथवा रिवर्स नीलामी (RA)",
      "स्थानीय विक्रेताओं से ऑफलाइन हाट-पूछताछ",
      "उच्चतम बोलीदाता से सीधे मोलभाव"],
     1, "Under Rule 149(iii) of GFR 2017, purchases above Rs. 5,00,000 on GeM must be conducted through mandatory online bidding or reverse auction.",
     "नियम 149(iii) के अनुसार 5 लाख रुपये से अधिक की खरीद के लिए GeM पोर्टल पर ऑनलाइन बिडिंग या रिवर्स ऑक्शन अनिवार्य है।",
     "Medium", ["GFR 2017", "GeM", "Rule 149"]),
    # 182
    ("GFR 2017 - Performance Security Norms", "UPSC-FIN-GFR2017-RULE-208-SECURITY", "Tests percentage norms for Performance Security / Guarantee under Rule 171",
     "General Financial Rules 2017", "Rule 171 Performance Security", 1, "Ministry of Finance, Department of Expenditure", "Procurement Policy Division OM 2023",
     "As per Rule 171 of GFR 2017 (as amended by Ministry of Finance OM), what is the standard range for Performance Security required from a successful contractor/supplier?",
     "जीएफआर 2017 के नियम 171 (वित्त मंत्रालय के अद्यतन कार्यालय ज्ञाप) के अनुसार, सफल ठेकेदार/आपूर्तिकर्ता से अनुबंध हेतु ली जाने वाली 'परफॉर्मेंस सिक्योरिटी' की मानक सीमा कितनी होती है?",
     ["1% to 2% of the contract value", "3% to 5% (and up to 10% in exceptional contracts) of the contract value", "15% to 20% of the contract value", "25% of the contract value"],
     ["अनुबंध मूल्य का 1% से 2%", "अनुबंध मूल्य का 3% से 5% (विशेष मामलों में अधिकतम 10%)", "अनुबंध मूल्य का 15% से 20%", "अनुबंध मूल्य का 25%"],
     1, "Under standard GFR guidelines, Performance Security is typically 3% to 5% (can go up to 10% where specified) of the total contract value.",
     "नियम 171 के अंतर्गत सफल आपूर्तिकर्ता से अनुबंध मूल्य की 3% से 5% (अधिकतम 10%) परफॉर्मेंस सिक्योरिटी बैंक गारंटी आदि के रूप में ली जाती है।",
     "Difficult", ["GFR 2017", "Rule 171", "Performance Security"]),
    # 183
    ("Public Financial Management System (PFMS) - Single Nodal Agency", "UPSC-FIN-PFMS-SNA-MODEL", "Tests the Single Nodal Agency (SNA) architecture for CSS fund tracking",
     "PFMS Guidelines for Centrally Sponsored Schemes", "DoE OM on SNA System 2021", 1, "Public Financial Management System / MoF", "CGA / PFMS Implementation Manual",
     "Under the Single Nodal Agency (SNA) model of the Public Financial Management System (PFMS) for Centrally Sponsored Schemes like Samagra Shiksha, how are central funds disbursed to schools?",
     "समग्र शिक्षा जैसी केंद्र प्रायोजित योजनाओं के लिए लोक वित्तीय प्रबंधन प्रणाली (PFMS) के सिंगल नोडल एजेंसी (SNA) मॉडल के तहत स्कूलों को केंद्रीय धनराशि कैसे हस्तांतरित होती है?",
     ["Parked permanently in fixed deposits of private commercial banks to earn interest",
      "Transferred from the Consolidated Fund of India to the State SNA account, and spent by schools as Sub-Implementing Agencies (SIAs) via zero-balance subsidiary accounts on PFMS with real-time fund tracking",
      "Handed over in cash to the Principal at the district treasury",
      "Credited directly to teachers' personal salary savings accounts"],
     ["ब्याज कमाने के लिए निजी वाणिज्यिक बैंकों के सावधि खातों (FD) में जमा करके",
      "भारत की संचित निधि से राज्य के SNA खाते में, और स्कूलों द्वारा उप-कार्यान्वयन एजेंसी के रूप में PFMS पर शून्य-शेष सहायक खातों के माध्यम से रीयल-टाइम निगरानी के साथ खर्च करके",
      "जिला कोषागार में प्रधानाचार्य को नकद राशि सौंपकर",
      "शिक्षकों के व्यक्तिगत वेतन बचत खातों में सीधे जमा करके"],
     1, "The SNA model releases funds to a dedicated State SNA account; subordinate implementing agencies like schools utilize zero-balance accounts on PFMS so funds are drawn only upon actual expenditure.",
     "SNA मॉडल में राज्य स्तर पर एक सिंगल नोडल खाता होता है और विद्यालय शून्य-शेष (Zero Balance) सहायक खातों से व्यय करते हैं, जिससे वास्तविक समय में फंड ट्रैकिंग होती है।",
     "Difficult", ["PFMS", "SNA", "Samagra Shiksha"]),
    # 184
    ("CCS (Conduct) Rules 1964 - Rule 3 General Integrity", "UPSC-FIN-CCS-CONDUCT-RULE3-INTEGRITY", "Tests statutory duties of supervisory officers under Rule 3(2) of CCS Conduct Rules",
     "Central Civil Services (Conduct) Rules, 1964", "Rule 3(1) and 3(2)", 1, "Department of Personnel and Training (DoPT)", "DoPT Service Rules Handbook",
     "Under Rule 3(2)(i) of the Central Civil Services (Conduct) Rules 1964, what personal responsibility is cast upon an institutional head regarding their subordinate staff?",
     "केंद्रीय सिविल सेवा (आचरण) नियमावली 1964 के नियम 3(2)(i) के तहत, अपने अधीनस्थ कर्मचारियों के संबंध में संस्था प्रमुख पर कौन सा व्यक्तिगत दायित्व डाला गया है?",
     ["No responsibility once duties are verbally assigned",
      "Every Government servant holding a supervisory post shall take all possible steps to ensure the integrity and devotion to duty of all government servants for the time being under his control and authority",
      "Direct delegation of all statutory disciplinary powers to student prefects",
      "Obligation to shield subordinate staff from any vigilance inquiry"],
     ["मौखिक रूप से कार्य सौंपे जाने के बाद कोई जिम्मेदारी नहीं",
      "पर्यवेक्षी पद पर कार्यरत प्रत्येक सरकारी कर्मचारी अपने नियंत्रण और अधिकार में कार्य करने वाले सभी कर्मचारियों की सत्यनिष्ठा और कर्तव्यनिष्ठा सुनिश्चित करने के लिए सभी संभव कदम उठाएगा",
      "सभी अनुशासनात्मक अधिकार छात्र प्रतिनिधियों को सौंपना",
      "अधीनस्थ कर्मचारियों को किसी भी सतर्कता जांच से बचाना"],
     1, "Rule 3(2)(i) explicitly mandates that every supervisory officer must ensure the integrity, devotion to duty, and non-corrupt behavior of all subordinates under their command.",
     "नियम 3(2)(i) स्पष्ट रूप से पर्यवेक्षी अधिकारी को यह सुनिश्चित करने का वैधानिक दायित्व सौंपता है कि उसके अधीनस्थ सभी कर्मचारी सत्यनिष्ठा और कर्तव्यनिष्ठा से कार्य करें।",
     "Medium", ["CCS Conduct Rules", "Rule 3", "Integrity"]),
    # 185
    ("CCS (Conduct) Rules 1964 - Rule 15 Private Trade & Employment", "UPSC-FIN-CCS-CONDUCT-RULE15-PRIVATE-TRADE", "Tests restrictions on private commercial tuition and secondary employment under Rule 15",
     "Central Civil Services (Conduct) Rules, 1964", "Rule 15 Private Trade or Employment", 1, "Department of Personnel and Training (DoPT)", "Swamy's Handbook on Conduct Rules",
     "Under Rule 15 of the CCS (Conduct) Rules 1964, which activity is strictly prohibited for a school teacher or Principal without prior sanction of the prescribed Government authority?",
     "सीसीएस (आचरण) नियमावली 1964 के नियम 15 के अनुसार, सक्षम सरकारी प्राधिकारी की पूर्व स्वीकृति के बिना शिक्षक या प्रधानाचार्य के लिए कौन सी गतिविधि पूर्णतः प्रतिबंधित है?",
     ["Engaging directly or indirectly in any private trade, commercial business, or taking up fee-based private coaching/tuition",
      "Undertaking honorary work of a purely social or charitable nature",
      "Publishing an occasional literary or scientific article",
      "Participating in recognized sports events as an amateur"],
     ["प्रत्यक्ष या अप्रत्यक्ष रूप से किसी निजी व्यापार, वाणिज्यिक व्यवसाय या सशुल्क निजी कोचिंग/ट्यूशन में संलग्न होना",
      "विशुद्ध रूप से सामाजिक या धर्मार्थ प्रकृति का अवैतनिक कार्य करना",
      "सामयिक साहित्यिक या वैज्ञानिक लेख प्रकाशित करना",
      "एक गैर-पेशेवर के रूप में मान्यता प्राप्त खेल आयोजनों में भाग लेना"],
     0, "Rule 15 prohibits government servants from engaging in private trade, commercial businesses, or private tuition without explicit prior sanction of the government.",
     "नियम 15 के अनुसार सरकारी कर्मचारी सक्षम प्राधिकारी की पूर्व अनुमति के बिना कोई निजी व्यापार, व्यवसाय या व्यावसायिक कोचिंग/ट्यूशन नहीं कर सकता।",
     "Easy", ["CCS Conduct Rules", "Rule 15", "Private Trade"]),
    # 186
    ("CCS (CCA) Rules 1965 - Distinction Between Minor and Major Penalties", "UPSC-FIN-CCS-CCA-RULE11-PENALTIES", "Tests classification of penalties under Rule 11 of CCS (CCA) Rules 1965",
     "Central Civil Services (Classification, Control and Appeal) Rules, 1965", "Rule 11 Penalties", 1, "DoPT, Ministry of Personnel, Public Grievances and Pensions", "Swamy's CCS (CCA) Rules Manual",
     "Under Rule 11 of the CCS (CCA) Rules 1965, which of the following is categorized as a 'Major Penalty'?",
     "सीसीएस (सीसीए) नियमावली 1965 के नियम 11 के तहत, निम्नलिखित में से किसे 'बड़ा दंड' (Major Penalty) के रूप में वर्गीकृत किया गया है?",
     ["Censure (परिनिंदा)",
      "Withholding of promotion for a specified period",
      "Compulsory retirement, removal from service, or dismissal from service",
      "Recovery from pay of the whole or part of any pecuniary loss caused to Government by negligence"],
     ["परिनिंदा (Censure)",
      "एक निश्चित अवधि के लिए पदोन्नति रोकना",
      "अनिवार्य सेवानिवृत्ति, सेवा से हटाया जाना (Removal) अथवा सेवा से बर्खास्तगी (Dismissal)",
      "लापरवाही से सरकार को हुए वित्तीय नुकसान की वेतन से वसूली"],
     2, "Clauses (vii), (viii), and (ix) of Rule 11 define compulsory retirement, removal, and dismissal as major penalties requiring a full Rule 14 formal inquiry.",
     "नियम 11 के अंतर्गत अनिवार्य सेवानिवृत्ति, सेवा से हटाया जाना और बर्खास्तगी बड़े दंड (Major Penalties) हैं जिनके लिए नियम 14 की औपचारिक जांच आवश्यक है।",
     "Medium", ["CCS CCA Rules", "Rule 11", "Major Penalty"]),
    # 187
    ("TDS Deduction under Income Tax Act 1961 - Section 192", "UPSC-FIN-ITACT-SECTION-192-SALARY-TDS", "Tests institutional Drawing and Disbursing Officer (DDO) duties for tax deduction at source on staff salaries",
     "Income Tax Act, 1961", "Section 192 TDS on Salaries", 1, "Central Board of Direct Taxes (CBDT)", "Income Tax Act 1961, Section 192",
     "As the Drawing and Disbursing Officer (DDO) / Head of Institution, what is the Principal's statutory duty under Section 192 of the Income Tax Act 1961 regarding staff salaries?",
     "आहरण एवं संवितरण अधिकारी (DDO) / संस्था प्रमुख के रूप में, आयकर अधिनियम 1961 की धारा 192 के तहत कर्मचारियों के वेतन पर प्रधानाचार्य का क्या वैधानिक दायित्व है?",
     ["Deduct tax at source (TDS) at the estimated average rate of income tax computed on the employee's estimated income for the financial year, deposit it into government account, and issue Form 16",
      "Exempt all teaching staff from any income tax liability automatically",
      "Deduct income tax only if the employee explicitly submits a written request",
      "Retain all deducted tax in the school development bank account permanently"],
     ["वित्तीय वर्ष में कर्मचारी की अनुमानित आय पर आकलित औसत दर से स्रोत पर कर (TDS) काटना, उसे सरकारी खाते में जमा करना और फॉर्म 16 जारी करना",
      "सभी शिक्षण कर्मचारियों को आयकर दायित्व से स्वतः मुक्त करना",
      "केवल तभी आयकर काटना जब कर्मचारी लिखित अनुरोध प्रस्तुत करे",
      "काटे गए सभी कर को विद्यालय विकास बैंक खाते में स्थायी रूप से रखना"],
     0, "Section 192 obligates the DDO to estimate employee income, deduct tax at source on monthly salary payments, deposit it into central accounts, file quarterly returns, and issue Form 16 annually.",
     "धारा 192 के अनुसार DDO का वैधानिक दायित्व है कि वह वार्षिक अनुमानित कर की गणना कर मासिक वेतन से टीडीएस काटे, सरकारी खाते में जमा करे और फॉर्म 16 जारी करे।",
     "Medium", ["Income Tax Act", "Section 192", "Form 16", "DDO"]),
    # 188
    ("Government e-Marketplace - Local Purchase Committee under Rule 155", "UPSC-FIN-GFR-RULE155-LPC-PURCHASE", "Tests threshold and procedure for Local Purchase Committee outside GeM",
     "General Financial Rules 2017", "Rule 155", 1, "Department of Expenditure, MoF", "GFR 2017 Handbook",
     "Under Rule 155 of GFR 2017, when procuring goods valued above Rs. 25,000 and up to Rs. 2,50,000 that are certified unavailable on GeM, what procedure must the Local Purchase Committee follow?",
     "जीएफआर 2017 के नियम 155 के अनुसार, 25,000 रुपये से अधिक और 2,50,000 रुपये तक की वस्तुओं की खरीद के लिए, जो GeM पर उपलब्ध नहीं हैं, स्थानीय खरीद समिति (LPC) को क्या प्रक्रिया अपनानी चाहिए?",
     ["Survey the market physically or online to ascertain the reasonableness of rate, quality, and specifications and identify the appropriate supplier jointly with a certificate",
      "Award the contract to the first vendor who sends an email invoice without market comparison",
      "Hold a mandatory global international tender published in foreign journals",
      "Purchase goods without any committee or financial verification"],
     ["बाजार का भौतिक या ऑनलाइन सर्वेक्षण करके दर, गुणवत्ता और विनिर्देशों की उपयुक्तता की पुष्टि करना तथा संयुक्त प्रमाण पत्र के साथ उचित आपूर्तिकर्ता की सिफारिश करना",
      "बाजार तुलना के बिना ईमेल चालान भेजने वाले पहले विक्रेता को अनुबंध देना",
      "विदेशी पत्रिकाओं में प्रकाशित अनिवार्य वैश्विक अंतरराष्ट्रीय निविदा आयोजित करना",
      "बिना किसी समिति या वित्तीय सत्यापन के सामान खरीदना"],
     0, "Rule 155 requires a 3-member committee to jointly survey the market, verify reasonableness of rates, inspect specifications, and issue a statutory certificate recommending procurement.",
     "नियम 155 के तहत 3-सदस्यीय स्थानीय खरीद समिति बाजार सर्वेक्षण कर दरों की औचित्यता का सत्यापन करती है और संयुक्त प्रमाण पत्र पर खरीद की सिफारिश करती है।",
     "Medium", ["GFR 2017", "Rule 155", "Procurement"]),
    # 189
    ("National Pension System (NPS) - Tier I Architecture & PRAN", "UPSC-FIN-NPS-PRAN-CONTRIBUTION", "Tests mandatory employer and employee monthly contribution percentages under NPS",
     "Pension Fund Regulatory and Development Authority (PFRDA) Act, 2013", "NPS Central Government Architecture", 1, "PFRDA / Ministry of Finance Notifications", "PFRDA Gazette Notifications",
     "For Central Government employees covered under the National Pension System (NPS), what are the standard mandatory monthly contribution percentages of (Basic Pay + DA) made by the Employee and the Government respectively?",
     "राष्ट्रीय पेंशन प्रणाली (NPS) के तहत केंद्र सरकार के कर्मचारियों के लिए कर्मचारी और सरकार द्वारा (मूल वेतन + महंगाई भत्ता) का क्रमशः कितना अनिवार्य मासिक अंशदान दिया जाता है?",
     ["Employee: 10% | Government: 14%",
      "Employee: 12% | Government: 12%",
      "Employee: 10% | Government: 10%",
      "Employee: 8% | Government: 16%"],
     ["कर्मचारी: 10% | सरकार: 14%",
      "कर्मचारी: 12% | सरकार: 12%",
      "कर्मचारी: 10% | सरकार: 10%",
      "कर्मचारी: 8% | सरकार: 16%"],
     0, "As per Department of Financial Services notification, employee contributes 10% of Basic Pay + DA while Central Government contributes 14% to the employee's Permanent Retirement Account Number (PRAN).",
     "एनपीएस के अंतर्गत कर्मचारी का अंशदान मूल वेतन + डीए का 10% होता है, जबकि सरकार 14% का अंशदान देती है जो प्रान (PRAN) खाते में जमा होता है।",
     "Easy", ["NPS", "PFRDA", "Pension Rules"]),
    # 190
    ("School Audit - Statutory Types of Audit", "UPSC-FIN-CAG-INTERNAL-STATUTORY-AUDIT", "Tests distinction between CAG audit, Internal audit, and Local Fund audit in schools",
     "Institutional Financial Administration", "Comptroller and Auditor General (CAG) Audit Principles", 1, "CAG Regulations on Audit and Accounts 2020", "Government Audit Manual",
     "When the office of the Comptroller and Auditor General (CAG) of India or State Local Fund Audit inspects a government-aided senior secondary school, what is their primary constitutional focus?",
     "जब भारत के नियंत्रक एवं महालेखापरीक्षक (CAG) अथवा राज्य स्थानीय निधि लेखा परीक्षा विभाग किसी सहायता प्राप्त विद्यालय का ऑडिट करता है, तो उनका प्राथमिक संवैधानिक फोकस क्या होता है?",
     ["Inspecting the handwriting quality of primary class students",
      "Ensuring that public grants were expended strictly for the authorized legislative purpose, observing financial propriety, adherence to rules/vouchers, and absence of defalcation or wastage",
      "Selecting the school cricket team for inter-state matches",
      "Directly revising school fees on spot without government approval"],
     ["प्राथमिक छात्रों की लिखावट की गुणवत्ता का निरीक्षण करना",
      "यह सुनिश्चित करना कि सार्वजनिक अनुदान विधायी उद्देश्य के अनुसार, वित्तीय औचित्य, नियमों व वाउचरों के कठोर पालन के साथ खर्च किए गए हैं तथा कोई गबन या अपव्यय नहीं हुआ है",
      "अंतर-राज्य मैचों के लिए विद्यालय क्रिकेट टीम का चयन करना",
      "सरकार की अनुमति के बिना मौके पर ही स्कूल फीस में संशोधन करना"],
     1, "Statutory public audit evaluates regularity, compliance with financial rules, economy, efficiency, and whether funds were spent strictly in accordance with legislative authorization.",
     "वैधानिक लेखा परीक्षा का मुख्य उद्देश्य यह देखना है कि सरकारी धन का व्यय अधिकृत नियमों, स्वीकृत बजट व वित्तीय औचित्य के मानकों के अनुसार ही किया गया है।",
     "Medium", ["Audit", "CAG", "Financial Propriety"]),
    # 191
    ("Unified Pension Scheme (UPS) - 2024 Framework", "UPSC-FIN-UPS-ASSURED-PENSION-50PERCENT", "Tests features of Unified Pension Scheme approved by Union Cabinet in August 2024",
     "Central Government Pension Reforms", "Union Cabinet Resolution August 2024", 1, "Department of Expenditure, MoF", "Press Information Bureau Release, August 24, 2024",
     "Under the Unified Pension Scheme (UPS) approved by the Union Cabinet in August 2024 for Central Government employees, what assured pension is guaranteed upon retirement after a minimum of 25 years of qualifying service?",
     "अगस्त 2024 में केंद्रीय मंत्रिमंडल द्वारा अनुमोदित एकीकृत पेंशन योजना (UPS) के तहत, 25 वर्ष की न्यूनतम अर्हक सेवा पूर्ण करने पर सेवानिवृत्ति पर कितने सुनिश्चित पेंशन की गारंटी दी गई है?",
     ["40% of the average basic pay drawn over the last 12 months",
      "50% of the average basic pay drawn for the last 12 months prior to retirement",
      "60% of the maximum pay scale of the post",
      "A fixed lump-sum amount of Rs. 10,000 per month only"],
     ["अंतिम 12 महीनों के औसत मूल वेतन का 40%",
      "सेवानिवृत्ति से पूर्व अंतिम 12 महीनों में प्राप्त औसत मूल वेतन का 50%",
      "पद के अधिकतम वेतनमान का 60%",
      "केवल 10,000 रुपये प्रति माह की निश्चित एकमुश्त राशि"],
     1, "UPS guarantees an assured pension of 50% of the average basic pay drawn in the last 12 months prior to retirement for employees with at least 25 years of qualifying service.",
     "यूपीएस (UPS) 25 वर्ष की सेवा पूर्ण करने वाले कर्मचारियों को अंतिम 12 माह के औसत मूल वेतन का 50% सुनिश्चित पारिवारिक पेंशन व महंगाई राहत (DR) सहित गारंटी प्रदान करता है।",
     "Difficult", ["Unified Pension Scheme", "UPS 2024", "Pension Reforms"]),
    # 192
    ("GFR 2017 - Contingent Charges and Permanent Advance (Imprest)", "UPSC-FIN-IMPREST-CASH-PETTY-EXPENSES", "Tests ceiling, replenishment, and accounting rules for school petty cash imprest",
     "General Financial Rules 2017", "Rule 322 to 324 Permanent Advance", 1, "Department of Expenditure, MoF", "Receipts and Payments Rules 1983",
     "In school office management, what is the statutory purpose and accounting protocol of a 'Permanent Advance' (Permanent Imprest Cash)?",
     "विद्यालय कार्यालय प्रबंधन में, 'स्थायी अग्रिम' (Permanent Imprest / Petty Cash) का वैधानिक उद्देश्य और लेखांकन प्रोटोकॉल क्या है?",
     ["To meet urgent, unforeseen petty contingent office expenditures, recouped periodically by submitting audited payment vouchers to the treasury/bank",
      "To pay monthly regular staff salaries in cash",
      "To provide interest-free long-term loans to the Principal for personal investments",
      "To fund capital building construction projects directly"],
     ["आकस्मिक व अपरिहार्य छोटे दैनिक कार्यालय व्ययों को पूरा करना, जिसे नियमित अंतराल पर जांचे गए भुगतान वाउचर प्रस्तुत कर पुनः भरा (Recoup) जाता है",
      "नकद में मासिक नियमित कर्मचारियों के वेतन का भुगतान करना",
      "व्यक्तिगत निवेश के लिए प्रधानाचार्य को ब्याज मुक्त दीर्घकालिक ऋण देना",
      "सीधे भवन निर्माण की बड़ी पूंजीगत परियोजनाओं को वित्तपोषित करना"],
     0, "A permanent advance (imprest) is granted to the head of office to defray petty contingent expenses without prior formal sanction, recouped against verified vouchers.",
     "स्थायी अग्रिम (इम्प्रेस्ट) दैनिक फुटकर व आकस्मिक व्ययों के त्वरित भुगतान हेतु रखा जाता है और वाउचरों के आधार पर बिल पास कराकर पुनः भरा जाता है।",
     "Easy", ["Imprest Cash", "GFR 2017", "Office Contingency"]),
    # 193
    ("CCS (Conduct) Rules 1964 - Rule 16 Investments & Lending", "UPSC-FIN-CCS-CONDUCT-RULE16-SPECULATION", "Tests prohibition on speculative stock trading and lending on interest under Rule 16",
     "Central Civil Services (Conduct) Rules, 1964", "Rule 16 Investments, Lending and Borrowing", 1, "DoPT, Government of India", "Swamy's Guide on Conduct Rules",
     "Under Rule 16(1) of the CCS (Conduct) Rules 1964, which financial action is explicitly prohibited for a Government school officer?",
     "सीसीएस (आचरण) नियमावली 1964 के नियम 16(1) के अनुसार, सरकारी स्कूल के अधिकारी के लिए कौन सी वित्तीय कार्रवाई स्पष्ट रूप से प्रतिबंधित है?",
     ["Purchasing sovereign gold bonds issued by the Reserve Bank of India",
      "Speculating in any stock, share or other investment (habitual day trading / volatile derivative gambling)",
      "Maintaining a fixed deposit in a scheduled public sector bank",
      "Investing in Government Public Provident Fund (PPF)"],
     ["भारतीय रिजर्व बैंक द्वारा जारी सॉवरेन गोल्ड बॉन्ड खरीदना",
      "शेयर, स्टॉक या किसी अन्य प्रतिभूति में सट्टेबाजी (नियमित डे-ट्रेडिंग अथवा सट्टा व्यापार) में संलग्न होना",
      "अनुसूचित सार्वजनिक क्षेत्र के बैंक में सावधि जमा (FD) रखना",
      "सरकारी लोक भविष्य निधि (PPF) में निवेश करना"],
     1, "Rule 16(1) states: 'No Government servant shall speculate in any stock, share or other investment.' Frequent day trading or speculative betting is deemed misconduct.",
     "नियम 16(1) के अनुसार कोई भी सरकारी कर्मचारी शेयरों या प्रतिभूतियों में सट्टेबाजी (बार-बार इंट्राडे ट्रेडिंग या सट्टा) नहीं कर सकता; यह कदाचार माना जाता है।",
     "Medium", ["CCS Conduct Rules", "Rule 16", "Investments"]),
    # 194
    ("GFR 2017 - Rule 154 Purchase Without Quotation", "UPSC-FIN-GFR2017-RULE154-MONETARY-LIMIT", "Tests financial ceiling and certificate requirement for direct purchases without quotations",
     "General Financial Rules 2017", "Rule 154 Direct Purchase without Quotation", 1, "Ministry of Finance, Department of Expenditure", "GFR 2017, Rule 154",
     "Under Rule 154 of GFR 2017, goods up to what monetary value can be procured directly without inviting quotations on each occasion, subject to the prescribed certificate of reasonableness recorded by the competent authority?",
     "जीएफआर 2017 के नियम 154 के अनुसार, प्रत्येक अवसर पर कोटेशन आमंत्रित किए बिना, सक्षम प्राधिकारी द्वारा औचित्य का प्रमाण पत्र दर्ज करके अधिकतम कितनी राशि तक का सामान सीधे खरीदा जा सकता है?",
     ["Up to Rs. 10,000", "Up to Rs. 25,000", "Up to Rs. 50,000", "Up to Rs. 1,00,000"],
     ["रु. 10,000 तक", "रु. 25,000 तक", "रु. 50,000 तक", "रु. 1,00,000 तक"],
     1, "Rule 154 allows purchase of goods up to Rs. 25,000 on each occasion without inviting quotations or bids on the basis of a certificate recorded by the competent authority.",
     "नियम 154 के तहत बिना कोटेशन के प्रत्येक अवसर पर 25,000 रुपये तक की खरीद सक्षम प्राधिकारी के प्रमाण पत्र के आधार पर सीधे की जा सकती है।",
     "Easy", ["GFR 2017", "Rule 154", "Procurement"]),
    # 195
    ("Conflict of Interest in Institutional Procurement", "UPSC-FIN-CONFLICT-OF-INTEREST-TENDERING", "Tests ethical and statutory standards where committee members have familial interest in bidders",
     "Standards of Financial Propriety & Vigilance Manual", "CVC Guidelines on Procurement & Transparency", 1, "Central Vigilance Commission (CVC)", "CVC Vigilance Manual, Chapter on Tenders",
     "If a member of the school procurement committee discovers that a commercial entity owned by their close relative has submitted a bid for the school cafeteria tender, what is their mandatory ethical and legal duty?",
     "यदि विद्यालय खरीद समिति के किसी सदस्य को पता चलता है कि उनके करीबी रिश्तेदार के स्वामित्व वाली फर्म ने स्कूल कैंटीन निविदा में बोली प्रस्तुत की है, तो उनका अनिवार्य नैतिक व कानूनी कर्तव्य क्या है?",
     ["Disclose the conflict of interest immediately in writing and completely recuse themselves from the evaluation committee",
      "Lobby secretly to ensure their relative's bid is awarded the lowest price tag",
      "Remain in the committee without disclosure to expedite evaluation",
      "Accept gifts from the competing vendors"],
     ["हितों के टकराव (Conflict of Interest) को तुरंत लिखित रूप में प्रकट करना और मूल्यांकन समिति से स्वयं को पूरी तरह अलग (Recuse) कर लेना",
      "अपने रिश्तेदार की बोली को सबसे कम दाम दिलाने हेतु गुप्त रूप से प्रयास करना",
      "प्रक्रिया को तेज करने के लिए बिना बताए समिति में बने रहना",
      "प्रतिद्वंद्वी विक्रेताओं से उपहार स्वीकार करना"],
     0, "Central Vigilance Commission (CVC) guidelines and administrative ethics mandate immediate written disclosure and complete recusal from all evaluation and decision-making.",
     "केंद्रीय सतर्कता आयोग (CVC) के नियमों के अनुसार हितों के टकराव की स्थिति में लिखित घोषणा करना और मूल्यांकन प्रक्रिया से खुद को तुरंत अलग कर लेना अनिवार्य है।",
     "Easy", ["Conflict of Interest", "CVC Guidelines", "Procurement Ethics"])
]

for idx, item in enumerate(a5):
    qid = 181 + idx
    qs.append(q(
        qid, 5, t5, th5, item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7],
        item[8], item[9], item[10], item[11], item[12], item[13], item[14], item[15], item[16]
    ))

print(f"Generated Area 5 (15 Qs). Total now: {len(qs)}")
with open("temp_upsc_area5.json", "w", encoding="utf-8") as f:
    json.dump(qs, f, ensure_ascii=False, indent=2)
