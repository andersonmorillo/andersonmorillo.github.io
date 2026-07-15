---
title: "UTB-NLP at SemEval-2023 Task 3: Weirdness, Lexical Features for Detecting Categorical Framings, and Persuasion in Online News"
description: "Weirdness léxica y rasgos lingüísticos para detectar género y framing en noticias (SemEval-2023 Task 3, inglés)."
date: 2023-07-01T00:00:00Z
categories: ["Research"]
venue_short: "SemEval-2023"
author: "Anderson Morillo"
tags: ["Natural Language Processing", "Persuasion Detection", "Lexical Features", "News Classification", "Weirdness"]
image: "/images/og-image.png"
draft: false
---

**Autores:** Juan Cuadrado, Elizabeth Martinez, Anderson Morillo, Daniel Peña, Kevin Sossa, Juan Martinez-Santos, Edwin Puertas

**Venue:** Proceedings of the 17th International Workshop on Semantic Evaluation (SemEval-2023), páginas 1551–1557

**DOI:** [10.18653/v1/2023.semeval-1.214](https://doi.org/10.18653/v1/2023.semeval-1.214)

**Enlaces:** [PDF](https://aclanthology.org/2023.semeval-1.214.pdf)

## Resumen

Este artículo describe el sistema UTB-NLP para SemEval-2023 Task 3 sobre detección de género, framing y señales de persuasión en noticias en línea. El equipo se centró en inglés y propuso un pipeline basado en extracción de rasgos lingüísticos, representaciones TF–IDF de sintagmas nominales y léxicos de **weirdness** léxica construidos a partir de corpus de dominio comparados con frecuencias de unigramas de Google.

## Problema

Los mensajes persuasivos son frecuentes en redes y medios. SemEval-2023 Task 3 pide identificar:

- **Subtarea 1:** género periodístico — opinión, reportaje factual o sátira  
- **Subtarea 2:** etiquetas de framing categórico usadas en el artículo  

Mejorar estas detecciones ayuda al análisis de sesgo, al monitoreo de noticias y a distinguir opinión de reportaje.

## Método

El pipeline compartido incluye preprocesado (minúsculas, limpieza, tokenización, stopwords, lematización con NLTK), extracción de rasgos, balanceo con SMOTE y un ensamble por votación de clasificadores seleccionados con LazyPredict.

Para **género**, se combinan indicios lingüísticos a nivel de documento (longitud de oraciones/tokens, negación, polaridad con TextBlob) con sintagmas nominales vectorizados por TF–IDF.

Para **framing**, se scrapearon páginas de Wikipedia por categoría, se extrajeron unigramas nominales, se puntuaron con el índice de weirdness frente a un corpus general de inglés y se usaron esos léxicos en una representación bag-of-words.

## Resultados

En la evaluación oficial en inglés:

- **Categorización de género:** F1-micro 0.57407, F1-macro 0.24314 — puesto **21 / 23**. El artículo señala el desbalance extremo (solo 10 artículos de sátira y 41 de reportaje antes del oversampling) como limitación principal.  
- **Detección de framing:** F1-micro 0.34112, F1-macro 0.30908 — puesto **19**. Los F1 por categoría en desarrollo variaron mucho (p. ej., Cultural identity 94.38; Crime and punishment 67.72).

Los autores concluyen que se necesitan datos más balanceados y modelos NLP más fuertes (incluido deep learning) para ganar robustez.

## Por qué importa

- Introduce un pipeline práctico de **léxicos por weirdness** para categorías de framing  
- Combina rasgos lingüísticos clásicos con votación de clasificadores  
- Documenta fallos bajo desbalance extremo, contexto útil para trabajos posteriores del mismo laboratorio
