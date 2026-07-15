---
title: "VerbaNexAI at SemEval-2025 Task 3: Fact Retrieval with Google Snippets for LLM Context Filtering to identify Hallucinations"
description: "LLM chain-of-thought prompting with Google snippet retrieval versus classical NLP span detection for SemEval-2025 Task 3 (Mu-SHROOM, English)."
date: 2025-07-01T00:00:00Z
categories: ["Research"]
venue_short: "SemEval-2025"
author: "Anderson Morillo"
tags: ["Natural Language Processing", "Large Language Models", "Hallucination Detection", "RAG", "Google Snippets"]
image: "/images/og-image.png"
draft: false
---

**Authors:** Anderson Morillo, Edwin Puertas, Juan Carlos Martinez Santos

**Venue:** Proceedings of the 19th International Workshop on Semantic Evaluation (SemEval-2025), Vienna, Austria. Association for Computational Linguistics. Pages 1534–1541.

**Anthology ID:** [2025.semeval-1.202](https://aclanthology.org/2025.semeval-1.202/) (no separate DOI in the ACL Anthology record)

**Links:** [PDF](https://aclanthology.org/2025.semeval-1.202.pdf) · [ACL Anthology](https://aclanthology.org/2025.semeval-1.202/) · [Code](https://github.com/VerbaNexAI)

## Overview

This paper describes two complementary systems from VerbaNexAI for SemEval-2025 Task 3 (Mu-SHROOM): detecting **hallucination spans** in LLM-generated text for English. The stronger system retrieves Google snippets as external evidence, ranks them semantically, and prompts an LLM with one-shot chain-of-thought instructions. A second system reuses the same retrieval stack but replaces prompting with classical lexical comparison and POS filtering.

## Problem

Instruction-tuned LLMs often produce fluent but non-factual content. SemEval-2025 Task 3 requires marking hallucination spans (not only a yes/no label) across many languages. The team participated on English, aiming to ground detection in retrieved web evidence rather than the model’s internal knowledge alone.

## Method

**Shared retrieval.** For each model input, the system scrapes Google snippets (with proxy rotation), embeds them with `deepset/roberta-base-squad2`, keeps snippets above cosine similarity **0.45**, and selects the top three.

**LLM-based detector.** A structured prompt includes a one-shot example, the ranked snippets, and a tokenized model output. One-shot chain-of-thought outperformed few-shot variants in their tests. Post-processing drops invalid spans (out-of-range tokens, probability above 1 or below 0.3). The best evaluation-phase model reported was **DeepSeek-R1-Distill-Llama-70B**.

**NLP-based detector.** After the same snippet ranking, a left outer join of response tokens against snippet vocabularies flags candidates; spaCy POS filters keep NOUN, PROPN, VERB, NUM, and X with high confidence (≥ 90%).

## Results

On the English official ranking (LLM system):

- **Intersection over Union (IoU):** **0.380997** — rank **25 / 41**  
- **Spearman correlation:** **0.364264** — rank **28 / 41**  

The NLP system scored IoU ≈ 0.3655 and Spearman ≈ 0.367 in the paper’s comparison table (below the LLM system on IoU). The authors note scraping limits: snippets were missing for **31 of 154** validation points, and aggressive request rates required proxies.

## Why it matters

- Treats hallucination detection as **span localization with external evidence**, not only binary classification  
- Reuses semantic relatedness ideas from the lab’s SemEval-2024 STR system for snippet ranking  
- Documents practical constraints of live web retrieval (availability, IP bans) that affect RAG-style pipelines
