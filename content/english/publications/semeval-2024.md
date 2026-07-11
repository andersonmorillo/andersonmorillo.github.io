---
title: "VerbaNexAI Lab at SemEval-2024 Task 1: A Multilayer Artificial Intelligence Model for Semantic Relationship Detection"
description: "Four-layer feature extraction with LSTM embeddings and ensemble regressors for semantic textual relatedness (SemEval-2024 Task 1, English)."
date: 2024-06-01T00:00:00Z
categories: ["Research"]
venue_short: "SemEval-2024"
author: "Anderson Morillo"
tags: ["Natural Language Processing", "Semantic Textual Relatedness", "Deep Learning", "LSTM", "Multilingual NLP"]
draft: false
---

**Authors:** Anderson Morillo, Daniel Peña, Juan Carlos Martinez Santos, Edwin Puertas

**Venue:** Proceedings of the 18th International Workshop on Semantic Evaluation (SemEval-2024), pages 1344–1350

**DOI:** [10.18653/v1/2024.semeval-1.194](https://doi.org/10.18653/v1/2024.semeval-1.194)

**Links:** [PDF](https://aclanthology.org/2024.semeval-1.194.pdf) · [Video](https://aclanthology.org/2024.semeval-1.194.mp4) · [Code](https://github.com/VerbaNexAI/SemEval2024)

## Overview

This paper presents the VerbaNexAI Lab system for SemEval-2024 Task 1 (Semantic Textual Relatedness) on English. The model combines a four-layer feature stack — string similarity, corpus topics, knowledge/sentiment signals, and sentence embeddings — with LSTM training and classical regressors in an ensemble.

## Problem

Semantic Textual Relatedness (STR) asks how related two sentences are, beyond surface word overlap. SemEval-2024 Task 1 requires predicting relatedness scores for sentence pairs. Strong STR models support paraphrase detection, retrieval, and broader contextual language understanding.

## Method

Training used the **STR-2022** English set of **5,500** sentence pairs with continuous relatedness scores. Preprocessing separated pairs and removed capitalization, special characters, and numbers; the best reported setup kept sentences **without** lemmatization or stopword removal.

Feature layers (inspired by multi-layer relatedness systems):

1. **String-oriented:** cosine, Jaccard, Dice, bigrams, trigrams  
2. **Corpus-oriented:** Latent Semantic Indexing (LSI) topic similarity via Gensim  
3. **Knowledge-oriented:** sentence polarity averages from SenticNet  
4. **Embeddings:** sentence-transformer representations, an LSTM trained for relatedness, and phoneme embeddings  

Classifiers compared included Random Forest, Gradient Boosting, MLP, AdaBoost, SVR, and a voting ensemble (scikit-learn), evaluated with ShuffleSplit cross-validation.

## Results

On the English track the system reached a **Spearman correlation of 0.8192**, placing **24th of 36** teams — slightly below the reported baseline of **0.83**. Ablation-style preprocessing comparisons in the paper show AdaBoost/Gradient Boosting/MLP around 0.82 Spearman without stopword removal, with lower scores when stopwords were removed.

The authors list limitations around dataset language coverage, preprocessing sensitivity, and hyperparameter choices, and suggest future ablation and error analysis.

## Why it matters

- Shows a transparent, multi-signal alternative to a single black-box encoder for STR  
- Releases code for reproducibility ([VerbaNexAI/SemEval2024](https://github.com/VerbaNexAI/SemEval2024))  
- Connects lexical, topical, affective, and phonetic cues in one pipeline used in later lab work on hallucination context filtering
