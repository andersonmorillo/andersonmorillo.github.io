---
title: "Construir sistemas RAG sobre documentación técnica"
description: "Cómo diseñar generación aumentada por recuperación para docs de ingeniería: chunking, embeddings, LLMs privados, APIs FastAPI y evaluación — con enlaces a los servicios de IA aplicada y la investigación en NLP de Anderson Morillo."
date: 2026-07-15T00:00:00Z
image: "/images/nlp.png"
categories: ["AI", "NLP"]
author: "Anderson Morillo"
tags: ["RAG", "Generación aumentada por recuperación", "LLM", "FastAPI", "Documentación técnica", "IA on-premise"]
draft: false
---

Los equipos técnicos acumulan grandes corpus: manuales, SOPs, especificaciones de API, runbooks. La **generación aumentada por recuperación (RAG)** permite que un modelo de lenguaje responda con evidencia tomada de esos documentos, reduciendo alucinaciones frente al prompting puro.

Esta nota resume un patrón práctico para asistentes sobre **documentación técnica u operativa**, incluyendo opciones de **LLM locales o privados**. Si necesitas implementar esto de extremo a extremo, consulta [Servicios]({{< ref "/services" >}}). Investigación relacionada sobre recuperación y filtrado de alucinaciones está en [Publicaciones]({{< ref "/publications" >}}).

## Por qué RAG en docs técnicas

- **Anclaje:** las respuestas citan pasajes de tu corpus, no solo la memoria del modelo.
- **Actualización:** reindexas cuando cambian los docs; no hace falta reentrenar el modelo completo.
- **Privacidad:** embeddings y generación pueden quedarse on-prem o en una VPC privada.

## Pipeline básico

1. **Ingesta** de Markdown/PDF/HTML a texto limpio; normalizar encabezados y bloques de código.
2. **Chunking** por estructura (secciones) además de ventanas fijas de caracteres.
3. **Embeddings** con un modelo adecuado al dominio; vector DB o FAISS para corpus pequeños.
4. **Recuperación** top-k (opcional híbrida: keywords + denso).
5. **Generación** con prompt de sistema que prohíbe responder sin contexto recuperado; devolver citas.
6. **Servicio** con **FastAPI** (u similar) y UI o automatización (p. ej. flujos n8n).

## LLMs privados / on-premise

Cuando los datos no pueden salir de la organización:

- Ejecutar modelos open weights (o licenciados) en servidores GPU.
- Mantener el almacén vectorial en la misma red.
- Registrar prompts y chunks recuperados para auditoría sin enviarlos a APIs públicas.

Esto alinea con la oferta de [IA conversacional y sistemas RAG]({{< ref "/services" >}}) en este sitio.

## Evaluación (no saltársela)

- Conjunto dorado de preguntas reales de operadores.
- **Fidelidad de citas** (la respuesta está soportada por el texto recuperado).
- Calidad de rechazo cuando el corpus no tiene respuesta.
- Para trabajo de investigación sobre spans de alucinación, ver el artículo SemEval-2025 en [Publicaciones]({{< ref "/publications" >}}).

## Qué publicar primero

Empieza con un corpus de alto valor (un manual o carpeta de SOPs), un set pequeño de evaluación y un endpoint FastAPI. Amplía índices y automatización (ETL, n8n) cuando el primer vertical funcione.

**Siguiente paso:** revisa [Servicios]({{< ref "/services" >}}) o [Contacto]({{< ref "/contact" >}}) si quieres ayuda diseñando un stack RAG para tu documentación.
