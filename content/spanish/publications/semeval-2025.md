---
title: "VerbaNexAI at SemEval-2025 Task 3: Fact Retrieval with Google Snippets for LLM Context Filtering to identify Hallucinations"
description: "Prompting chain-of-thought con snippets de Google frente a detección clásica de spans para SemEval-2025 Task 3 (Mu-SHROOM, inglés)."
date: 2025-07-01T00:00:00Z
categories: ["Research"]
venue_short: "SemEval-2025"
author: "Anderson Morillo"
tags: ["Natural Language Processing", "Large Language Models", "Hallucination Detection", "RAG", "Google Snippets"]
image: "/images/og-image.png"
draft: false
---

**Autores:** Anderson Morillo, Edwin Puertas, Juan Carlos Martinez Santos

**Venue:** Proceedings of the 19th International Workshop on Semantic Evaluation (SemEval-2025), Viena, Austria. Association for Computational Linguistics. Páginas 1534–1541.

**Anthology ID:** [2025.semeval-1.202](https://aclanthology.org/2025.semeval-1.202/) (sin DOI separado en el registro de ACL Anthology)

**Enlaces:** [PDF](https://aclanthology.org/2025.semeval-1.202.pdf) · [ACL Anthology](https://aclanthology.org/2025.semeval-1.202/) · [Código](https://github.com/VerbaNexAI)

## Resumen

Este artículo describe dos sistemas complementarios de VerbaNexAI para SemEval-2025 Task 3 (Mu-SHROOM): detectar **spans de alucinación** en texto generado por LLMs en inglés. El sistema más fuerte recupera snippets de Google como evidencia externa, los ordena semánticamente y guía un LLM con instrucciones one-shot chain-of-thought. Un segundo sistema reutiliza la misma recuperación pero sustituye el prompting por comparación léxica clásica y filtrado POS.

## Problema

Los LLM ajustados por instrucciones suelen producir texto fluido pero no factual. SemEval-2025 Task 3 exige marcar spans de alucinación (no solo una etiqueta sí/no) en muchos idiomas. El equipo participó en inglés, buscando anclar la detección en evidencia web recuperada y no solo en el conocimiento interno del modelo.

## Método

**Recuperación compartida.** Para cada entrada del modelo se scrapean snippets de Google (con rotación de proxies), se embeben con `deepset/roberta-base-squad2`, se conservan los de similitud coseno por encima de **0.45** y se eligen los tres mejores.

**Detector basado en LLM.** Un prompt estructurado incluye un ejemplo one-shot, los snippets ordenados y la salida tokenizada del modelo. El one-shot chain-of-thought superó a variantes few-shot en sus pruebas. El postprocesado descarta spans inválidos (tokens fuera de rango, probabilidad por encima de 1 o por debajo de 0.3). El mejor modelo en fase de evaluación reportado fue **DeepSeek-R1-Distill-Llama-70B**.

**Detector basado en NLP.** Tras el mismo ranking de snippets, un left outer join de tokens de la respuesta contra el vocabulario de los snippets marca candidatos; spaCy filtra por POS (NOUN, PROPN, VERB, NUM, X) con alta confianza (≥ 90%).

## Resultados

En el ranking oficial en inglés (sistema LLM):

- **Intersection over Union (IoU):** **0.380997** — puesto **25 / 41**  
- **Correlación de Spearman:** **0.364264** — puesto **28 / 41**  

El sistema NLP obtuvo IoU ≈ 0.3655 y Spearman ≈ 0.367 en la tabla comparativa del artículo. Los autores señalan límites de scraping: faltaron snippets en **31 de 154** puntos de validación, y el ritmo de peticiones exigió proxies.

## Por qué importa

- Trata la detección de alucinaciones como **localización de spans con evidencia externa**, no solo clasificación binaria  
- Reutiliza ideas de relatedness semántica del SemEval-2024 del laboratorio para rankear snippets  
- Documenta restricciones prácticas de recuperación web en vivo (disponibilidad, bloqueos de IP) que afectan pipelines tipo RAG
