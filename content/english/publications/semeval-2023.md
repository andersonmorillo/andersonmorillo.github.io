---
title: "UTB-NLP at SemEval-2023 Task 3: Weirdness, Lexical Features for Detecting Categorical Framings, and Persuasion in Online News"
description: "Lexical weirdness and linguistic features for news genre and framing detection in SemEval-2023 Task 3 (English)."
date: 2023-07-01T00:00:00Z
categories: ["Research"]
venue_short: "SemEval-2023"
author: "Anderson Morillo"
tags: ["Natural Language Processing", "Persuasion Detection", "Lexical Features", "News Classification", "Weirdness"]
draft: false
---

**Authors:** Juan Cuadrado, Elizabeth Martinez, Anderson Morillo, Daniel Peña, Kevin Sossa, Juan Martinez-Santos, Edwin Puertas

**Venue:** Proceedings of the 17th International Workshop on Semantic Evaluation (SemEval-2023), pages 1551–1557

**DOI:** [10.18653/v1/2023.semeval-1.214](https://doi.org/10.18653/v1/2023.semeval-1.214)

**Links:** [PDF](https://aclanthology.org/2023.semeval-1.214.pdf)

## Overview

This paper describes the UTB-NLP system for SemEval-2023 Task 3 on detecting genre, framing, and persuasion cues in online news. The team focused on English and proposed a pipeline based on linguistic feature extraction, noun-phrase TF–IDF representations, and **lexical weirdness** lexicons built from domain corpora compared against Google unigram frequencies.

## Problem

Persuasive messaging is common on social networks and in news media. SemEval-2023 Task 3 asks systems to identify:

- **Sub-task 1:** news genre — opinion, factual reportage, or satire
- **Sub-task 2:** categorical framing labels used in an article

Better genre and framing detection supports bias analysis, news monitoring, and more reliable classification of opinion versus reportage.

## Method

The shared pipeline covers preprocessing (lowercasing, noise removal, tokenization, stopword filtering, lemmatization with NLTK), feature extraction, class balancing with SMOTE, and a voting ensemble of classifiers selected with LazyPredict.

For **genre classification**, the system combines document-level linguistic cues (sentence/token length, negation patterns, sentiment/polarity via TextBlob) with noun phrases vectorized by TF–IDF.

For **framing detection**, the team scraped Wikipedia pages per framing category, extracted nominal unigrams, scored them with the weirdness index against a general English unigram corpus, and used the resulting domain lexicons in a bag-of-words representation.

## Results

On the official English evaluation:

- **Genre categorization:** F1-micro 0.57407, F1-macro 0.24314 — rank **21 / 23**. The paper notes severe class imbalance (only 10 satire and 41 reportage articles before oversampling) as a main limitation.
- **Framing detection:** F1-micro 0.34112, F1-macro 0.30908 — rank **19**. Per-category development scores varied widely (e.g., Cultural identity F1 94.38; Crime and punishment F1 67.72).

The authors conclude that more balanced data and stronger NLP models (including deep learning) would be needed to improve robustness.

## Why it matters

- Introduces a practical **weirdness-based lexicon** pipeline for framing categories
- Combines classical linguistic features with ensemble voting rather than a single end-to-end model
- Documents failure modes under extreme class imbalance — useful context for later SemEval work from the same lab
