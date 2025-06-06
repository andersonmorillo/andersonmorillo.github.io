---
title: 🔍 Extracting Important Words Using Weirdness
summary: Discover how to extract meaningful and rare words from text using the 'weirdness' metric pioneered in NLP.
date: 2025-06-06
authors:
  - admin
tags:
  - NLP
  - text analysis
  - Python
image:
  caption: 'Image credit: [**Unsplash**](https://unsplash.com)'
---

Learn how to identify and extract rare or meaningful words from a corpus by leveraging the concept of "weirdness." This approach enriches language processing applications, enabling you to highlight unique vocabulary and gain new linguistic insights.

## What Is Word Weirdness?

"Weirdness" measures how unusual or infrequently a word appears in a specific context compared to a general corpus. Words with high weirdness scores often reflect domain-specific jargon, neologisms, or outliers—useful for tasks such as keyword extraction, content filtering, and building rich glossaries.

## The Extract-important-words-using-weirdness Project

The [Extract-important-words-using-weirdness](https://github.com/andersonmorillo/Extract-important-words-using-weirdness) tool, available on GitHub, helps you automate the process of extracting these unusual words from your own datasets. Although the README is currently limited, similar tools identify key features in text, often using statistical comparisons between domain and reference corpora.

Common pipeline steps include:

- Collecting text data (your domain corpus)
- Comparing term frequencies with those in a general corpus
- Scoring words using weirdness (e.g., by dividing relative frequency in the domain by that in the reference)
- Extracting and exporting the words with the highest scores

## Why Use Weirdness?

Extracting uncommon words is valuable when you want to:

- Build specialized dictionaries or lexicons
- Identify emerging trends or concepts
- Enhance search engines or NLP models with domain-specific awareness
- Support linguistic exploration

### How Weirdness is Calculated

For each word:

    Weirdness = (ws/ts) / (wg/tg)

Where:
- ws = frequency of the word in the specialist corpus
- ts = total words in the specialist corpus
- wg = frequency in the general corpus (Google Unigrams)
- tg = total words in the general corpus

Words with high weirdness are considered important or distinctive for the specialist domain.


### Example Usage

Here is a practical example (conceptual pseudocode):

```python
from extract_words import calculate_word_frequencies_from_text, extract_important_words_by_weirdness

specialist_text = """
The investors were excited about the supercritical fluid technology. 
Dollars and cents were discussed, and the pressurization of the fluid was achieved. 
Supercritical fluids are important in modern finance and chemistry. 
The investors agreed that the dollars invested in supercritical fluid research would yield returns.
"""

specialist_corpus_freqs = calculate_word_frequencies_from_text(specialist_text)
general_corpus_file = "Eng_GoogleUnigrams.csv"

important_words = extract_important_words_by_weirdness(
    specialist_corpus_freqs, general_corpus_file, top_n=10, min_weirdness=1.0
)

for word, score in important_words:
    print(f"{word}: {score:.2f}")
```

## References

Ahmad, K., Gillam, L., & Tostevin, L. (1999). University of Surrey Participation in TREC8: Weirdness Indexing for Logical Document Extrapolation and Retrieval (WILDER). In E. M. Voorhees & D. K. Harman (Eds.), Proceedings of The Eighth Text REtrieval Conference, TREC 1999, Gaithersburg, Maryland, USA, November 17-19, 1999 (NIST Special Publication, Vol. 500-246). National Institute of Standards and Technology (NIST). [PDF](http://trec.nist.gov/pubs/trec8/papers/surrey2.pdf)

BibTeX:

```bibtex
@inproceedings{weirdness_org,
  author    = {Khurshid Ahmad and
               Lee Gillam and
               Lena Tostevin},
  editor    = {Ellen M. Voorhees and
               Donna K. Harman},
  title     = {University of Surrey Participation in {TREC8:} Weirdness Indexing
               for Logical Document Extrapolation and Retrieval {(WILDER)}},
  booktitle = {Proceedings of The Eighth Text REtrieval Conference, {TREC} 1999,
               Gaithersburg, Maryland, USA, November 17-19, 1999},
  series    = {{NIST} Special Publication},
  volume    = {500-246},
  publisher = {National Institute of Standards and Technology {(NIST)}},
  year      = {1999},
  url       = {http://trec.nist.gov/pubs/trec8/papers/surrey2.pdf},
  timestamp = {Tue, 30 Jun 2020 17:23:13 +0200},
  biburl    = {https://dblp.org/rec/conf/trec/AhmadGT99.bib},
  bibsource = {dblp computer science bibliography, https://dblp.org}
}
```

## Did you find this page helpful? Consider sharing it 🙌
