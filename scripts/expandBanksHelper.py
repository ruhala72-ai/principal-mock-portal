import json
import re

def tokenize(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', ' ', text)
    tokens = [t for t in text.split() if len(t) > 2]
    return tokens

def generate_fingerprint(q):
    en_toks = "_".join(tokenize(q.get("questionTextEn", ""))[:12])
    hi_toks = "_".join(tokenize(q.get("questionTextHi", ""))[:12])
    concept = re.sub(r'[^a-z0-9]', '', (q.get("conceptId") or "").lower())
    statute = re.sub(r'[^a-z0-9]', '', (q.get("statuteOrScheme") or "").lower())
    return f"{concept}|{statute}|{en_toks}|{hi_toks}"

print("Building expandBanks script...")
