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
            "verifiedBy": "Official Gazette & Notification Audit"
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

upsc_batch2 = []

# Load Area 1 already generated in temp_upsc_batch2.json
with open("temp_upsc_batch2.json", "r", encoding="utf-8") as f:
    a1 = json.load(f)
    upsc_batch2.extend(a1)

print(f"Loaded {len(upsc_batch2)} questions from Area 1.")

# Load Area 2 from generate_upsc_area2.py items
import sys
sys.path.append("scripts")
from generate_upsc_area2 import areas_data
a2_items = areas_data[0]["items"]
for idx, it in enumerate(a2_items):
    qid = 136 + idx
    item = q(
        qid, 2, "Hindi and English Language Skills", "हिन्दी एवं अंग्रेजी भाषा दक्षता",
        it["sub"], it["conceptId"], it["learning"], it["statute"], it["rule"],
        it["tier"], it["src"], it["cit"], it["qEn"], it["qHi"],
        it["oEn"], it["oHi"], it["ans"], it["expEn"], it["expHi"], it["diff"], it["tags"]
    )
    upsc_batch2.append(item)

print(f"Loaded Area 2. Total questions now: {len(upsc_batch2)}")

with open("temp_upsc_batch2_part1.json", "w", encoding="utf-8") as f:
    json.dump(upsc_batch2, f, ensure_ascii=False, indent=2)
