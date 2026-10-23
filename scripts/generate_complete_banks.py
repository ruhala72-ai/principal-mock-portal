# -*- coding: utf-8 -*-
import json
import os

def create_question(
    qid, exam_type, section_id, unit_id, topic, topic_hi, subtopic, official_ref,
    q_en, q_hi, opts_en, opts_hi, correct_idx, exp_en, exp_hi, diff, tags
):
    return {
        "id": qid,
        "examType": exam_type,
        "sectionId": section_id,
        "unitId": unit_id,
        "topic": topic,
        "topicHi": topic_hi,
        "subtopic": subtopic,
        "officialReference": official_ref,
        "questionTextEn": q_en,
        "questionTextHi": q_hi,
        "optionsEn": opts_en,
        "optionsHi": opts_hi,
        "correctOptionIndex": correct_idx,
        "explanationEn": exp_en,
        "explanationHi": exp_hi,
        "difficulty": diff,
        "tags": tags,
        "isPracticeQuestion": True,
        "isApproved": True
    }

print("Loading generator helper...")
