---
title: "VerbaNexAI Lab at SemEval-2024 Task 1: A Multilayer Artificial Intelligence Model for Semantic Relationship Detection"
description: "Extracción de rasgos en cuatro capas con embeddings LSTM y regresores en ensamble para relatedness textual semántica (SemEval-2024 Task 1, inglés)."
date: 2024-06-01T00:00:00Z
categories: ["Research"]
venue_short: "SemEval-2024"
author: "Anderson Morillo"
tags: ["Natural Language Processing", "Semantic Textual Relatedness", "Deep Learning", "LSTM", "Multilingual NLP"]
draft: false
---

**Autores:** Anderson Morillo, Daniel Peña, Juan Carlos Martinez Santos, Edwin Puertas

**Venue:** Proceedings of the 18th International Workshop on Semantic Evaluation (SemEval-2024), páginas 1344–1350

**DOI:** [10.18653/v1/2024.semeval-1.194](https://doi.org/10.18653/v1/2024.semeval-1.194)

**Enlaces:** [PDF](https://aclanthology.org/2024.semeval-1.194.pdf) · [Video](https://aclanthology.org/2024.semeval-1.194.mp4) · [Código](https://github.com/VerbaNexAI/SemEval2024)

## Resumen

Este artículo presenta el sistema del VerbaNexAI Lab para SemEval-2024 Task 1 (Semantic Textual Relatedness) en inglés. El modelo combina un apilado de cuatro capas de rasgos — similitud de cadenas, temas de corpus, señales de conocimiento/sentimiento y embeddings de oración — con entrenamiento LSTM y regresores clásicos en ensamble.

## Problema

La relatedness textual semántica (STR) mide cuán relacionadas están dos oraciones más allá del solapamiento léxico superficial. SemEval-2024 Task 1 pide predecir puntuaciones de relatedness entre pares. Buenos modelos STR apoyan detección de paráfrasis, recuperación y comprensión contextual del lenguaje.

## Método

El entrenamiento usó el conjunto inglés **STR-2022** de **5.500** pares de oraciones con puntuaciones continuas. El preprocesado separó pares y eliminó mayúsculas, caracteres especiales y números; la mejor configuración reportada mantuvo las oraciones **sin** lematización ni eliminación de stopwords.

Capas de rasgos:

1. **Orientada a cadenas:** coseno, Jaccard, Dice, bigramas, trigramas  
2. **Orientada a corpus:** similitud temática con LSI (Gensim)  
3. **Orientada a conocimiento:** polaridad media con SenticNet  
4. **Embeddings:** sentence transformers, un LSTM entrenado para relatedness y embeddings de fonemas  

Se compararon Random Forest, Gradient Boosting, MLP, AdaBoost, SVR y un ensamble por votación (scikit-learn), con validación cruzada ShuffleSplit.

## Resultados

En la pista de inglés el sistema alcanzó una **correlación de Spearman de 0.8192**, ocupando el puesto **24 de 36** equipos — ligeramente por debajo de la baseline reportada de **0.83**. Comparaciones de preprocesado en el artículo muestran AdaBoost/Gradient Boosting/MLP alrededor de 0.82 Spearman sin quitar stopwords, con peores resultados al eliminarlas.

Los autores señalan limitaciones de cobertura lingüística del dataset, sensibilidad al preprocesado y a hiperparámetros, y proponen ablaciones y análisis de error futuros.

## Por qué importa

- Ofrece una alternativa multi-señal transparente frente a un único encoder opaco para STR  
- Publica código para reproducibilidad ([VerbaNexAI/SemEval2024](https://github.com/VerbaNexAI/SemEval2024))  
- Conecta indicios léxicos, tópicos, afectivos y fonéticos en un pipeline reutilizado después en filtrado de contexto para alucinaciones
