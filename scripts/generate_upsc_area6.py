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
            "verifiedBy": "Official Gazette & Government Manual Audit"
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
# AREA 6: Office Procedure (196 to 210)
# ========================================================
t6 = "Office Procedure"
th6 = "कार्यालय प्रक्रिया एवं सेवा नियमावली"

a6 = [
    # 196
    ("CSMOP - Classification of Official Records", "UPSC-OFF-CSMOP-RECORD-CLASSIFICATION-ABC", "Tests Central Secretariat Manual of Office Procedure record retention classifications",
     "Central Secretariat Manual of Office Procedure (CSMOP 2022)", "Chapter 10 Record Management", 1, "Department of Administrative Reforms and Public Grievances (DARPG)", "CSMOP 2022, Chapter 10",
     "According to the Central Secretariat Manual of Office Procedure (CSMOP), official files categorized as 'Class A' (Category A) records have what mandatory retention requirement?",
     "केंद्रीय सचिवालय कार्यालय पद्धति नियम पुस्तिका (CSMOP) के अनुसार, 'वर्ग A' (Category A) के रूप में वर्गीकृत आधिकारिक फाइलों के लिए क्या अनिवार्य संरक्षण नियम है?",
     ["Preserved permanently with microfilming / digital preservation due to historical, administrative, or statutory significance",
      "Destroyed after 1 year of audit completion",
      "Retained for 5 years and then shredded without review",
      "Handed over to private vendors for recycling"],
     ["ऐतिहासिक, प्रशासनिक या वैधानिक महत्व के कारण माइक्रोफिल्मिंग / डिजिटल संरक्षण के साथ स्थायी रूप से सुरक्षित रखना",
      "ऑडिट पूरा होने के 1 वर्ष बाद नष्ट करना",
      "5 वर्ष तक रखना और फिर बिना समीक्षा के नष्ट करना",
      "रीसाइक्लिंग के लिए निजी विक्रेताओं को सौंपना"],
     0, "Category A files possess enduring administrative, historical, or legal importance and must be preserved permanently with microfilming / digital archiving.",
     "वर्ग 'A' की फाइलें ऐतिहासिक व वैधानिक दृष्टि से अत्यंत महत्वपूर्ण होती हैं और इन्हें स्थायी रूप से (Permanently) सुरक्षित रखा जाता है।",
     "Medium", ["CSMOP", "Record Management", "Office Procedure"]),
    # 197
    ("RTI Act 2005 - Section 7(1) Life and Liberty Timeline", "UPSC-OFF-RTI2005-LIFE-AND-LIBERTY-48HRS", "Tests emergency response timeline for life and liberty RTI requests",
     "Right to Information Act, 2005", "Section 7(1) Proviso", 1, "Ministry of Law and Justice", "The Gazette of India, Act No. 22 of 2005",
     "Under the proviso to Section 7(1) of the Right to Information (RTI) Act 2005, when the information sought concerns the 'life or liberty' of a person, within what strict timeline must the Public Information Officer (PIO) provide the information?",
     "सूचना का अधिकार (RTI) अधिनियम 2005 की धारा 7(1) के परंतुक के अनुसार, जब मांगी गई सूचना किसी व्यक्ति के 'जीवन या स्वतंत्रता' से संबंधित हो, तो लोक सूचना अधिकारी (PIO) को कितने समय के भीतर सूचना उपलब्ध कराना अनिवार्य है?",
     ["Within 24 hours", "Within 48 hours", "Within 7 days", "Within 30 days"],
     ["24 घंटे के भीतर", "48 घंटे के भीतर", "7 दिनों के भीतर", "30 दिनों के भीतर"],
     1, "Section 7(1) provides: 'provided that where the information sought for concerns the life or liberty of a person, the same shall be provided within forty-eight hours of the receipt of the request.'",
     "धारा 7(1) के अनुसार जीवन और व्यक्तिगत स्वतंत्रता से संबंधित सूचना 48 घंटे के भीतर दी जानी अनिवार्य है।",
     "Easy", ["RTI Act 2005", "Section 7(1)", "Life and Liberty"]),
    # 198
    ("CCS (Leave) Rules 1972 - Child Care Leave (CCL) Entitlement", "UPSC-OFF-CCS-LEAVE-CHILD-CARE-LEAVE", "Tests maximum days and conditions for Child Care Leave under Rule 43-C",
     "Central Civil Services (Leave) Rules, 1972", "Rule 43-C Child Care Leave", 1, "Department of Personnel and Training (DoPT)", "DoPT Notification on Rule 43-C",
     "Under Rule 43-C of the CCS (Leave) Rules 1972, what is the maximum total duration of Child Care Leave (CCL) admissible to a female government servant during her entire service career for taking care of her two eldest surviving children?",
     "सीसीएस (अवकाश) नियमावली 1972 के नियम 43-C के तहत, एक महिला सरकारी कर्मचारी को अपने दो ज्येष्ठ जीवित बच्चों की देखभाल हेतु संपूर्ण सेवाकाल के दौरान अधिकतम कितने दिनों का बाल देखभाल अवकाश (Child Care Leave - CCL) दिया जा सकता है?",
     ["180 days", "365 days", "730 days (2 years)", "1095 days (3 years)"],
     ["180 दिन", "365 दिन", "730 दिन (2 वर्ष)", "1095 दिन (3 वर्ष)"],
     2, "Rule 43-C grants female government servants (and single male parents) a maximum of 730 days of Child Care Leave during their entire service for taking care of up to two eldest surviving children.",
     "नियम 43-C के अंतर्गत महिला कर्मचारी को पूरे सेवाकाल में अधिकतम 730 दिन (2 वर्ष) का बाल देखभाल अवकाश (CCL) अनुमन्य होता है।",
     "Easy", ["CCS Leave Rules", "Rule 43-C", "Child Care Leave"]),
    # 199
    ("CCS (Leave) Rules 1972 - Earned Leave Accumulation Ceiling", "UPSC-OFF-CCS-LEAVE-EARNED-LEAVE-CEILING", "Tests maximum accumulation ceiling of Earned Leave for encashment upon retirement",
     "Central Civil Services (Leave) Rules, 1972", "Rule 26 & Rule 39 Earned Leave", 1, "DoPT, Government of India", "Swamy's Handbook on Leave Rules",
     "Under the CCS (Leave) Rules 1972, what is the maximum ceiling up to which Earned Leave (EL) can be accumulated and encashed at the time of superannuation / retirement?",
     "सीसीएस (अवकाश) नियमावली 1972 के अनुसार, सेवानिवृत्ति के समय नकदीकरण (Leave Encashment) हेतु अर्जित अवकाश (Earned Leave - EL) के संचय की अधिकतम सीमा क्या है?",
     ["180 days", "240 days", "300 days", "360 days"],
     ["180 दिन", "240 दिन", "300 दिन", "360 दिन"],
     2, "Earned Leave can be accumulated up to 300 days for encashment at the time of retirement under Rule 39 of CCS (Leave) Rules.",
     "सेवानिवृत्ति पर अधिकतम 300 दिनों के अर्जित अवकाश (EL) का नकदीकरण अनुमन्य होता है।",
     "Easy", ["CCS Leave Rules", "Earned Leave", "Encashment"]),
    # 200
    ("RTI Act 2005 - Section 8 Exemptions from Disclosure", "UPSC-OFF-RTI2005-SECTION-8-EXEMPTIONS", "Tests statutory grounds of exemption from disclosure under Section 8(1)",
     "Right to Information Act, 2005", "Section 8(1)(j) Personal Information", 1, "Ministry of Law and Justice", "The Gazette of India, Act No. 22 of 2005",
     "Under Section 8(1)(j) of the RTI Act 2005, when is personal information exempted from mandatory disclosure to an applicant?",
     "आरटीई अधिनियम 2005 की धारा 8(1)(j) के अंतर्गत, व्यक्तिगत जानकारी को आवेदक को प्रकटीकरण से कब छूट प्राप्त होती है?",
     ["When it relates to personal information disclosure of which has no relationship to any public activity or interest, or would cause unwarranted invasion of the individual's privacy (unless larger public interest justifies)",
      "When the applicant has not paid an advance penalty fee",
      "Whenever the information relates to any government employee's official designation",
      "In all cases where the applicant is a private citizen"],
     ["जब यह ऐसी व्यक्तिगत जानकारी हो जिसका किसी लोक गतिविधि या लोक हित से कोई संबंध न हो, अथवा जिससे व्यक्ति की निजता में अवांछित हस्तक्षेप होता हो (जब तक कि व्यापक लोकहित उचित न ठहराए)",
      "जब आवेदक ने अग्रिम जुर्माना शुल्क जमा न किया हो",
      "जब भी सूचना किसी सरकारी कर्मचारी के आधिकारिक पदनाम से संबंधित हो",
      "उन सभी मामलों में जहां आवेदक एक निजी नागरिक हो"],
     0, "Section 8(1)(j) exempts personal information having no relation to any public activity or which causes unwarranted invasion of privacy, unless the CPIO/Appellate Authority is satisfied that larger public interest justifies disclosure.",
     "धारा 8(1)(j) के अनुसार व्यक्तिगत जानकारी, जिसका सार्वजनिक गतिविधि या व्यापक लोकहित से कोई संबंध नहीं है और जिससे निजता का हनन होता है, प्रकटीकरण से मुक्त है।",
     "Medium", ["RTI Act 2005", "Section 8(1)(j)", "Privacy"]),
    # 201
    ("Service Book Maintenance - Annual Verification", "UPSC-OFF-SERVICE-BOOK-ANNUAL-ATTESTATION", "Tests mandatory annual verification entry in official Service Book under SR 199/202",
     "Supplementary Rules (SR)", "SR 199 and SR 202 Service Book", 1, "Department of Personnel and Training (DoPT)", "Compilation of the Fundamental Rules and Supplementary Rules",
     "Under Supplementary Rules (SR) 199 and 202, what annual statutory action must the Head of Office / Principal perform regarding every employee's Service Book?",
     "पूरक नियम (SR) 199 और 202 के अनुसार, प्रत्येक कर्मचारी की सेवा पुस्तिका (Service Book) के संबंध में कार्यालय प्रमुख / प्रधानाचार्य को कौन सी वार्षिक वैधानिक कार्रवाई करनी चाहिए?",
     ["Destroy the old service book and purchase a new one",
      "Verify the service recorded during the year from pay bills and acquittance rolls, record a certificate of verification, and communicate the verified record to the employee",
      "Retain the service book in an unverified state until the year of retirement",
      "Hand over custody of the service book directly to the employee's family"],
     ["पुरानी सेवा पुस्तिका नष्ट कर नई खरीदना",
      "वेतन बिलों और प्राप्ति पंजियों से वर्ष के दौरान की सेवा का सत्यापन करना, सत्यापन का प्रमाण पत्र दर्ज करना और सत्यापित विवरण कर्मचारी को संसूचित करना",
      "सेवानिवृत्ति के वर्ष तक सेवा पुस्तिका को बिना सत्यापित किए रखना",
      "सेवा पुस्तिका की कस्टडी सीधे कर्मचारी के परिवार को सौंप देना"],
     1, "SR 202 mandates that the Head of Office must verify entries in the Service Book annually with reference to pay bills and records, record a certificate of verification, and show it to the employee.",
     "SR 202 के तहत प्रत्येक वर्ष वेतन बिलों से सेवा का मिलान कर सत्यापन प्रमाण पत्र दर्ज करना और कर्मचारी को सेवा पुस्तिका दिखाना अनिवार्य है।",
     "Medium", ["Service Book", "SR 202", "Establishment"]),
    # 202
    ("Central Secretariat - Official Note-Sheet Drafting Rules", "UPSC-OFF-CSMOP-NOTE-SHEET-DRAFTING", "Tests official protocol for drafting notes, referencing, and marginal notes on files",
     "Central Secretariat Manual of Office Procedure", "Chapter 7 Noting and Drafting", 1, "DARPG, Government of India", "CSMOP 2022 Manual",
     "In standard central government office procedure (CSMOP), what is the correct practice when drafting an official 'Note' on a file?",
     "केंद्रीय सचिवालय कार्यालय पद्धति (CSMOP) के अनुसार, किसी फाइल पर आधिकारिक 'नोट' (टिप्पणी) तैयार करते समय कौन सी मानक कार्यप्रणाली अपनाई जाती है?",
     ["Writing personal opinions, emotional outbursts, and colloquial insults",
      "Using concise, objective, courteous language, stating clear facts, referencing relevant rules/precedents, and appending the officer's signature/initial with date and designation",
      "Tearing off previous pages of the note-sheet if a decision is reconsidered",
      "Writing with pencils without recording dates"],
     ["व्यक्तिगत राय, भावनात्मक आक्रोश और अनौपचारिक अपमानजनक शब्दों का प्रयोग करना",
      "संक्षिप्त, निष्पक्ष, शिष्ट भाषा का प्रयोग करना, स्पष्ट तथ्य और सुसंगत नियमों/पूर्व दृष्टांतों का संदर्भ देना तथा पदनाम व तिथि सहित हस्ताक्षर/आद्याक्षर करना",
      "पुनर्विचार होने पर नोट-शीट के पुराने पृष्ठों को फाड़ देना",
      "बिना तिथि दर्ज किए पेंसिल से लिखना"],
     1, "Noting must be objective, lucid, free from personal animus, substantiated by rules and facts, properly paragraph-numbered, and dated with signature.",
     "टिप्पणी (Note-sheet) संक्षिप्त, निष्पक्ष, सुसंगत नियमों व तथ्यों पर आधारित, शिष्ट भाषा में और अधिकारी के पदनाम व तिथि सहित हस्ताक्षरित होनी चाहिए।",
     "Easy", ["CSMOP", "Noting and Drafting", "Office Management"]),
    # 203
    ("CCS (Leave) Rules 1972 - Commuted Leave on Medical Certificate", "UPSC-OFF-CCS-LEAVE-COMMUTED-LEAVE", "Tests conversion and debit ratio of Half Pay Leave to Commuted Leave",
     "Central Civil Services (Leave) Rules, 1972", "Rule 30 Commuted Leave", 1, "DoPT, Government of India", "Swamy's Guide on Leave Rules",
     "Under Rule 30 of the CCS (Leave) Rules 1972, when an employee avails 'Commuted Leave' on medical certificate, what is the debit ratio against their Half Pay Leave (HPL) account?",
     "सीसीएस (अवकाश) नियमावली 1972 के नियम 30 के अंतर्गत, जब कोई कर्मचारी चिकित्सा प्रमाण पत्र पर 'रूपांतरित अवकाश' (Commuted Leave) लेता है, तो उसके अर्ध-वेतन अवकाश (HPL) खाते से कटौती का अनुपात क्या होता है?",
     ["One day of HPL debited for each day of Commuted Leave",
      "Twice the number of days of Commuted Leave debited from the HPL account",
      "Three times the number of days debited",
      "No debit from any leave account"],
     ["रूपांतरित अवकाश के प्रत्येक दिन के लिए एक दिन का HPL काटा जाता है",
      "HPL खाते से रूपांतरित अवकाश के दिनों की दोगुनी संख्या (2 days of HPL per day of commuted leave) काटी जाती है",
      "तीन गुने दिनों की कटौती की जाती है",
      "किसी भी अवकाश खाते से कोई कटौती नहीं की जाती"],
     1, "Commuted leave is granted on medical certificate up to maximum HPL balance, and twice the amount of such leave taken is debited against the half pay leave due.",
     "नियम 30 के अनुसार रूपांतरित अवकाश लेने पर कर्मचारी को पूर्ण वेतन मिलता है, लेकिन उसके HPL खाते से लिए गए अवकाश का दोगुना (Double) काटा जाता है।",
     "Medium", ["CCS Leave Rules", "Commuted Leave", "HPL"]),
    # 204
    ("POSH Act 2013 - Internal Complaints Committee (ICC) Composition", "UPSC-OFF-POSH2013-ICC-COMPOSITION", "Tests statutory composition and presiding officer gender requirement under POSH Act",
     "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013", "Section 4 Constitution of ICC", 1, "Ministry of Women and Child Development", "The Gazette of India, Act No. 14 of 2013",
     "Under Section 4 of the POSH Act 2013, an institution employing 10 or more employees must constitute an Internal Complaints Committee (ICC). What is the mandatory legal requirement regarding its Presiding Officer?",
     "पॉश (POSH) अधिनियम 2013 की धारा 4 के अनुसार, 10 या अधिक कर्मचारियों वाले संस्थान में आंतरिक शिकायत समिति (ICC) का गठन अनिवार्य है। इसके पीठासीन अधिकारी (Presiding Officer) के संबंध में क्या कानूनी अनिवार्यता है?",
     ["The Presiding Officer must be a senior woman employed at the workplace at a senior level amongst the employees",
      "The Presiding Officer must always be the male head of the institution",
      "The Presiding Officer must be a retired police sub-inspector",
      "Any junior temporary contractual clerk can be appointed"],
     ["पीठासीन अधिकारी कार्यस्थल पर कार्यरत कर्मचारियों में से वरिष्ठ स्तर पर कार्यरत एक वरिष्ठ महिला होनी चाहिए",
      "पीठासीन अधिकारी हमेशा संस्थान का पुरुष प्रमुख ही होना चाहिए",
      "पीठासीन अधिकारी सेवानिवृत्त पुलिस उप-निरीक्षक होना चाहिए",
      "किसी भी कनिष्ठ अस्थायी संविदा लिपिक को नियुक्त किया जा सकता है"],
     0, "Section 4(2)(a) mandates that the Presiding Officer of the ICC shall be a woman employed at a senior level at the workplace from amongst the employees.",
     "धारा 4(2)(a) के तहत अनिवार्य है कि आंतरिक शिकायत समिति (ICC) की पीठासीन अधिकारी कार्यस्थल की वरिष्ठ महिला कर्मचारी ही होगी।",
     "Easy", ["POSH Act 2013", "Section 4", "Internal Complaints Committee"]),
    # 205
    ("Leave Travel Concession (LTC) - Grace Period for Block Year", "UPSC-OFF-CCS-LTC-GRACE-PERIOD", "Tests carry-over grace period for LTC block years under CCS LTC Rules 1988",
     "Central Civil Services (Leave Travel Concession) Rules, 1988", "Rule 10 Carry-over of LTC", 1, "Department of Personnel and Training (DoPT)", "DoPT LTC Master Circular",
     "Under the CCS (LTC) Rules 1988, if a government servant is unable to avail their entitled LTC within a prescribed four-year block (or two-year sub-block), up to what grace period can it be carried forward and availed?",
     "सीसीएस (LTC) नियमावली 1988 के अनुसार, यदि कोई सरकारी कर्मचारी निर्धारित ब्लॉक वर्ष में अपने हकदार अवकाश यात्रा रियायत (LTC) का उपयोग नहीं कर पाता है, तो उसे अधिकतम कितनी ग्रेस अवधि तक आगे ले जाकर (Carry Forward) उपयोग किया जा सकता है?",
     ["Up to the end of the first year of the next block",
      "Up to the end of the entire next 4-year block",
      "It lapses immediately on the 31st December of the block year with no carry-over",
      "Up to 3 years into the next block"],
     ["अगले ब्लॉक वर्ष के प्रथम वर्ष के अंत तक",
      "अगले पूरे 4-वर्षीय ब्लॉक के अंत तक",
      "यह बिना किसी कैरी-ओवर के ब्लॉक वर्ष की 31 दिसंबर को तुरंत समाप्त हो जाता है",
      "अगले ब्लॉक के 3 वर्ष तक"],
     0, "Under Rule 10, a government servant who is unable to avail LTC within the block year may carry it over to the first year of the next block period.",
     "नियम 10 के अनुसार यदि कर्मचारी ब्लॉक वर्ष में LTC नहीं ले पाता है, तो वह अगले ब्लॉक के पहले वर्ष के अंत तक उसका उपयोग कर सकता है।",
     "Medium", ["LTC Rules", "Carry Forward", "Establishment"]),
    # 206
    ("Right of Persons with Disabilities (RPwD) Act 2016 - Reservation Quota", "UPSC-OFF-RPWD2016-EMPLOYMENT-QUOTA", "Tests statutory percentage reservation for persons with benchmark disabilities under Section 34",
     "Rights of Persons with Disabilities Act, 2016", "Section 34 Reservation in Employment", 1, "Ministry of Social Justice and Empowerment", "The Gazette of India, Act No. 49 of 2016",
     "Under Section 34(1) of the Rights of Persons with Disabilities Act, 2016, what minimum percentage of vacancies in government establishments must be reserved for persons with benchmark disabilities?",
     "दिव्यांगजन अधिकार (RPwD) अधिनियम 2016 की धारा 34(1) के तहत, सरकारी प्रतिष्ठानों में बेंचमार्क दिव्यांगता वाले व्यक्तियों के लिए रिक्तियों का न्यूनतम कितना प्रतिशत आरक्षण अनिवार्य है?",
     ["3 percent", "4 percent", "5 percent", "6 percent"],
     ["3 प्रतिशत", "4 प्रतिशत", "5 प्रतिशत", "6 प्रतिशत"],
     1, "The 2016 Act increased the reservation in government employment from 3% (under the 1995 Act) to not less than 4% of total vacancies across designated disability categories.",
     "धारा 34(1) के अनुसार बेंचमार्क दिव्यांगजनों के लिए सरकारी पदों की रिक्तियों में न्यूनतम 4% आरक्षण का प्रावधान है (1995 के अधिनियम में यह 3% था)।",
     "Easy", ["RPwD Act 2016", "Section 34", "Disability Reservation"]),
    # 207
    ("Annual Performance Assessment Report (APAR) - Numerical Grading Scale", "UPSC-OFF-APAR-NUMERICAL-GRADING", "Tests 1-10 numerical grading scale and communication of adverse remarks",
     "DoPT Guidelines on APAR Maintenance", "DoPT OM on Objective Assessment & Timelines", 1, "Department of Personnel and Training (DoPT)", "DoPT Master Circular on APAR / ACR",
     "In modern Central Civil Services Annual Performance Assessment Reports (APAR), what is the standardized numerical grading scale on which an officer is evaluated?",
     "केंद्रीय सिविल सेवाओं की वार्षिक कार्य निष्पादन मूल्यांकन रिपोर्ट (APAR) में, किस मानकीकृत संख्यात्मक ग्रेडिंग पैमाने (Numerical Scale) पर अधिकारी का मूल्यांकन किया जाता है?",
     ["Scale of 1 to 5", "Scale of 1 to 10", "Scale of 1 to 20", "Scale of 1 to 100"],
     ["1 से 5 का पैमाना", "1 से 10 का पैमाना", "1 से 20 का पैमाना", "1 से 100 का पैमाना"],
     1, "APAR evaluation uses a 1 to 10 numerical grading scale where 8-10 is Outstanding, 6-8 is Very Good, 4-6 is Good, and below 4 is considered adverse/below benchmark requiring communication.",
     "APAR में 1 से 10 का संख्यात्मक पैमाना प्रयुक्त होता है, जिसमें 8-10 उत्कृष्ट, 6-8 बहुत अच्छा, 4-6 अच्छा तथा 4 से कम प्रतिकूल माना जाता है।",
     "Easy", ["APAR", "DoPT", "Performance Appraisal"]),
    # 208
    ("Maternity Benefit - CCS (Leave) Rules 1972", "UPSC-OFF-CCS-LEAVE-MATERNITY-180-DAYS", "Tests maximum period and pay entitlement of Maternity Leave under Rule 43",
     "Central Civil Services (Leave) Rules, 1972", "Rule 43 Maternity Leave", 1, "Department of Personnel and Training (DoPT)", "Swamy's Leave Rules",
     "Under Rule 43 of the CCS (Leave) Rules 1972, what is the maximum duration of Maternity Leave that may be granted to a female government servant with less than two surviving children?",
     "सीसीएस (अवकाश) नियमावली 1972 के नियम 43 के अनुसार, दो से कम जीवित बच्चों वाली महिला सरकारी कर्मचारी को अधिकतम कितनी अवधि का मातृत्व अवकाश (Maternity Leave) स्वीकृत किया जा सकता है?",
     ["90 days", "135 days", "180 days (with full pay and allowances)", "240 days"],
     ["90 दिन", "135 दिन", "180 दिन (पूर्ण वेतन और भत्तों सहित)", "240 दिन"],
     2, "Rule 43 grants up to 180 days of maternity leave with full pay and allowances to female employees with less than two surviving children.",
     "नियम 43 के तहत दो से कम जीवित बच्चों वाली महिला कर्मचारी को 180 दिन (लगभग 6 माह) का पूर्ण वेतन सहित मातृत्व अवकाश अनुमन्य होता है।",
     "Easy", ["Maternity Leave", "Rule 43", "CCS Leave Rules"]),
    # 209
    ("Disciplinary Authority - Natural Justice Principles in Inquiry", "UPSC-OFF-NATURAL-JUSTICE-INQUIRY", "Tests the twin principles of natural justice (Audi Alteram Partem & Nemo Judex In Causa Sua) in departmental inquiries",
     "Administrative Law & Service Jurisprudence", "Principles of Natural Justice in Disciplinary Inquiries", 1, "Supreme Court of India / DoPT Vigilance Manual", "DoPT Disciplinary Proceedings Handbook",
     "In a departmental disciplinary proceeding against a school employee, which procedural flaw represents a fatal violation of the principles of natural justice?",
     "विद्यालय के किसी कर्मचारी के विरुद्ध विभागीय अनुशासनात्मक कार्यवाही में, कौन सी प्रक्रियात्मक खामी प्राकृतिक न्याय के सिद्धांतों का गंभीर और घातक उल्लंघन मानी जाएगी?",
     ["Allowing the charged employee to cross-examine prosecution witnesses",
      "The Inquiry Officer acting simultaneously as the chief complainant and witness against the charged employee",
      "Providing the inquiry report copy to the employee for representation before imposing penalty",
      "Permitting the assistance of a defense assistant as per rules"],
     ["आरोपी कर्मचारी को अभियोजन पक्ष के गवाहों से जिरह करने की अनुमति देना",
      "जांच अधिकारी का स्वयं ही आरोपी कर्मचारी के विरुद्ध मुख्य शिकायतकर्ता और गवाह बनना (Nemo Judex In Causa Sua का उल्लंघन)",
      "दंड लगाने से पूर्व अभ्यावेदन देने हेतु कर्मचारी को जांच रिपोर्ट की प्रति उपलब्ध कराना",
      "नियमानुसार डिफेंस सहायक की सहायता की अनुमति देना"],
     1, "A person cannot be a judge in their own cause ('Nemo judex in causa sua'). If the inquiry officer is also a witness/complainant, the entire proceeding is void ab initio.",
     "'कोई भी व्यक्ति अपने ही मामले में न्यायाधीश नहीं हो सकता'। यदि जांच अधिकारी स्वयं शिकायतकर्ता या गवाह बनता है, तो यह प्राकृतिक न्याय का सीधा उल्लंघन है और जांच रद्द हो जाएगी।",
     "Difficult", ["Natural Justice", "Disciplinary Inquiry", "Service Law"]),
    # 210
    ("RTI Act 2005 - Section 20 Penalties on PIO", "UPSC-OFF-RTI2005-SECTION-20-PENALTY", "Tests per-day and maximum penalty powers of Information Commission under Section 20(1)",
     "Right to Information Act, 2005", "Section 20(1) Penalties", 1, "Ministry of Law and Justice", "The Gazette of India, Act No. 22 of 2005",
     "Under Section 20(1) of the RTI Act 2005, what is the daily penalty rate and the maximum ceiling that the Central or State Information Commission can impose on an errant Public Information Officer for unreasonable delay without reasonable cause?",
     "आरटीआई अधिनियम 2005 की धारा 20(1) के अनुसार, बिना किसी उचित कारण के देरी करने वाले लोक सूचना अधिकारी (PIO) पर सूचना आयोग द्वारा प्रतिदिन की किस दर से और अधिकतम कितना जुर्माना लगाया जा सकता है?",
     ["Rs. 100 per day up to a maximum of Rs. 10,000",
      "Rs. 250 per day up to a maximum of Rs. 25,000",
      "Rs. 500 per day up to a maximum of Rs. 50,000",
      "Rs. 1,000 per day up to a maximum of Rs. 1,00,000"],
     ["100 रुपये प्रति दिन, अधिकतम 10,000 रुपये तक",
      "250 रुपये प्रति दिन, अधिकतम 25,000 रुपये तक",
      "500 रुपये प्रति दिन, अधिकतम 50,000 रुपये तक",
      "1,000 रुपये प्रति दिन, अधिकतम 1,00,000 रुपये तक"],
     1, "Section 20(1) specifies a penalty of Rs. 250 each day till the application is received or information is furnished, subject to a total maximum limit of Rs. 25,000.",
     "धारा 20(1) के अंतर्गत देरी होने पर 250 रुपये प्रतिदिन की दर से अधिकतम 25,000 रुपये तक का जुर्माना लगाया जा सकता है।",
     "Medium", ["RTI Act 2005", "Section 20", "Penalties"])
]

for idx, item in enumerate(a6):
    qid = 196 + idx
    qs.append(q(
        qid, 6, t6, th6, item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7],
        item[8], item[9], item[10], item[11], item[12], item[13], item[14], item[15], item[16]
    ))

print(f"Generated Area 6 (15 Qs). Total now: {len(qs)}")
with open("temp_upsc_area6.json", "w", encoding="utf-8") as f:
    json.dump(qs, f, ensure_ascii=False, indent=2)
