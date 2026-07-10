---
title: "🔍 Extracción de palabras importantes con Weirdness"
description: "Cómo extraer palabras significativas y poco frecuentes de un texto usando la métrica de weirdness en NLP."
date: 2025-06-06T00:00:00Z
image: "/images/image-placeholder.png"
categories: ["NLP"]
author: "Anderson Morillo"
tags: ["NLP", "text analysis", "Python"]
draft: false
---

Aprende a identificar y extraer palabras raras o significativas de un corpus aprovechando el concepto de "weirdness". Este enfoque enriquece aplicaciones de procesamiento de lenguaje y permite destacar vocabulario único y obtener nuevas perspectivas lingüísticas.

## ¿Qué es la weirdness de una palabra?

La "weirdness" mide cuán inusual o poco frecuente es una palabra en un contexto específico frente a un corpus general. Las palabras con puntuaciones altas suelen reflejar jerga de dominio, neologismos o valores atípicos, útiles para extracción de palabras clave, filtrado de contenido y glosarios especializados.

## El proyecto Extract-important-words-using-weirdness

La herramienta [Extract-important-words-using-weirdness](https://github.com/andersonmorillo/Extract-important-words-using-weirdness), disponible en GitHub, automatiza la extracción de estas palabras inusuales a partir de tus propios datos. Herramientas similares identifican rasgos clave en el texto mediante comparaciones estadísticas entre un corpus de dominio y uno de referencia.

Pasos habituales del pipeline:

- Recopilar texto (tu corpus de dominio)
- Comparar frecuencias de términos con las de un corpus general
- Puntuar palabras con weirdness (por ejemplo, dividiendo la frecuencia relativa en el dominio entre la del corpus de referencia)
- Extraer y exportar las palabras con las puntuaciones más altas

## ¿Por qué usar weirdness?

Extraer palabras poco comunes es útil cuando quieres:

- Construir diccionarios o léxicos especializados
- Identificar tendencias o conceptos emergentes
- Mejorar buscadores o modelos de NLP con conciencia de dominio
- Apoyar la exploración lingüística

### Cómo se calcula la weirdness

Para cada palabra:

    Weirdness = (ws/ts) / (wg/tg)

Donde:
- ws = frecuencia de la palabra en el corpus especializado
- ts = total de palabras en el corpus especializado
- wg = frecuencia en el corpus general (Google Unigrams)
- tg = total de palabras en el corpus general

Las palabras con alta weirdness se consideran importantes o distintivas del dominio especializado.


### Ejemplo de uso

Ejemplo práctico (pseudocódigo conceptual):

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

## Referencias

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
