---
title: "PubMed API and LLM-Driven Hybrid Retrieval System for Biomedical Question Answering"
description: "QA biomédico eficiente en recursos: extracción de términos con LLM, weirdness, PubMed API y RAG con Qwen3-30B-A3B sobre BioASQ."
date: 2025-01-01T00:00:00Z
categories: ["Research"]
venue_short: "IEEE C3 2025"
author: "Anderson Morillo"
tags: ["Biomedical Question Answering", "Information Retrieval", "Large Language Models", "PubMed API", "Hybrid Retrieval", "RAG"]
image: "/images/og-image.png"
draft: false
---

**Autores:** Anderson Morillo, Carlos Agamez, Edwin Puertas, Juan Carlos Martinez-Santos, Jairo Serrano

**Venue:** 2025 IEEE Colombian Caribbean Conference (C3)

**DOI:** [10.1109/C366505.2025.11340582](https://doi.org/10.1109/c366505.2025.11340582)

**Enlaces:** [IEEE Xplore](https://ieeexplore.ieee.org/document/11340582)

> El PDF completo no estuvo disponible para extracción automática (acceso IEEE). El resumen siguiente se basa en el abstract oficial publicado y en los metadatos del artículo.

## Resumen

Este artículo de conferencia presenta una arquitectura de respuesta a preguntas biomédicas **eficiente en recursos**. En lugar de depender solo de stacks densos de alto coste, combina extracción de términos clave con LLM y puntuación estadística de **weirdness** con recuperación de documentos vía la **API de PubMed**, y genera respuestas con ingeniería de prompts y RAG usando **Qwen3-30B-A3B**.

## Problema

Los sistemas de QA biomédico suelen intercambiar precisión por grandes presupuestos de cómputo en recuperación y generación. Los autores buscan un pipeline más ligero que siga usando acceso estructurado a literatura (PubMed) y LLMs modernos, orientado a despliegues donde el coste computacional importa.

## Método

Según el abstract oficial, el sistema:

- Extrae términos clave con modelos de lenguaje grandes  
- Puntúa términos con weirdness estadística respecto a un corpus general  
- Recupera literatura mediante la API de PubMed  
- Genera respuestas con prompting few-shot e instruccional más **Retrieval-Augmented Generation (RAG)** con el modelo **Qwen3-30B-A3B**  

La evaluación se reporta sobre el benchmark **BioASQ**.

## Resultados

El abstract indica **desempeño competitivo en tipos Factoid y Summary** en BioASQ. Aquí no se reiteran cifras exactas porque el PDF completo no pudo verificarse; consulta el registro IEEE para tablas y detalle experimental.

## Por qué importa

- Conecta la línea de trabajo previa en **weirdness** del laboratorio con recuperación biomédica  
- Enfatiza un diseño **híbrido ligero** (API + RAG con LLM) frente a solo búsqueda densa de alto cómputo  
- Sitúa el stack en QA biomédico práctico donde PubMed sigue siendo la fuente de literatura de referencia
