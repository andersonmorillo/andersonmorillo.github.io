---
title: "📊 Build your own unigram frequency corpus with Google data"
description: "Learn how to process a large English unigram corpus and compute relative frequencies with Python."
date: 2025-06-06T00:00:00Z
image: "/images/code.jpg"
categories: ["NLP"]
author: "Anderson Morillo"
tags: ["Python", "NLP", "Corpus", "Google Ngram"]
draft: false
---

Interested in linguistic corpora and natural language processing? This post describes how to build your own English word-frequency (unigram) corpus using the [Create_google_unigram_frecuency_corpus](https://github.com/andersonmorillo/Create_google_unigram_frecuency_corpus) project.

## What is a unigram corpus?
A unigram corpus is a collection of individual words (without adjacent context) and their frequencies in a large text collection. It is useful for language modeling, statistical analysis, and word filtering in NLP.

## The project
The [Create_google_unigram_frecuency_corpus](https://github.com/andersonmorillo/Create_google_unigram_frecuency_corpus) repository helps you download, process, and extract absolute and relative frequencies of individual words from the Google Books corpus, automatically and optimized for large volumes.

### Main features
- Downloads and processes the Google Ngram dataset for English unigrams.
- Parallel processing to use all CPU cores.
- Computes relative frequencies for each word and exports results to a CSV file.
- Friendly progress bars and efficient handling of large datasets.

## Installation and usage
1. Clone the repository:
   ```bash
   git clone https://github.com/andersonmorillo/Create_google_unigram_frecuency_corpus
   cd Create_google_unigram_frecuency_corpus
   ```
2. Install dependencies:
   ```bash
   pip install google-ngram-downloader tqdm
   ```
3. Run the main script:
   ```bash
   python google_unigrams.py
   ```

The script processes all letters in parallel, computes frequencies, and saves the result to a semicolon-delimited (`;`) CSV file.

## Expected output
The resulting file (`ENG1_GoogleUnigrams.csv`) has two columns:
- **Word**: word (lowercase)
- **Frequency**: computed relative frequency

## Applications
- Basic language modeling and text generation
- Frequency-based word filtering for analysis tasks
- Building keyword lists

## Sources and resources
- [GitHub repository](https://github.com/andersonmorillo/Create_google_unigram_frecuency_corpus)

If you find this useful, explore it, experiment, and contribute.
