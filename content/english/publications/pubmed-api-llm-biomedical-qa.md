---
title: "PubMed API and LLM-Driven Hybrid Retrieval System for Biomedical Question Answering"
description: "Resource-efficient biomedical QA combining LLM key-term extraction, weirdness scoring, PubMed API retrieval, and RAG with Qwen3-30B-A3B on BioASQ."
date: 2025-01-01T00:00:00Z
categories: ["Research"]
venue_short: "IEEE C3 2025"
author: "Anderson Morillo"
tags: ["Biomedical Question Answering", "Information Retrieval", "Large Language Models", "PubMed API", "Hybrid Retrieval", "RAG"]
draft: false
---

**Authors:** Anderson Morillo, Carlos Agamez, Edwin Puertas, Juan Carlos Martinez-Santos, Jairo Serrano

**Venue:** 2025 IEEE Colombian Caribbean Conference (C3)

**DOI:** [10.1109/C366505.2025.11340582](https://doi.org/10.1109/c366505.2025.11340582)

**Links:** [IEEE Xplore](https://ieeexplore.ieee.org/document/11340582)

> Full PDF text was not available for automated extraction (IEEE access). The summary below is grounded in the official published abstract and metadata.

## Overview

This conference paper presents a **resource-efficient** biomedical question-answering architecture. Instead of relying on heavyweight dense retrieval stacks alone, it combines LLM-based key-term extraction and statistical **weirdness** scoring with document retrieval through the **PubMed API**, then generates answers with prompt engineering and RAG using **Qwen3-30B-A3B**.

## Problem

Biomedical QA systems often trade accuracy for large compute budgets in retrieval and generation. The authors target a lighter pipeline that still uses structured literature access (PubMed) and modern LLMs, aiming at deployments where computational cost matters.

## Method

According to the official abstract, the system:

- Extracts key terms with large language models  
- Scores terms with statistical weirdness relative to a general corpus  
- Retrieves literature via the PubMed API  
- Generates answers with few-shot and instructional prompting plus **Retrieval-Augmented Generation (RAG)** using the **Qwen3-30B-A3B** model  

Evaluation is reported on the **BioASQ** benchmark.

## Results

The abstract states **competitive performance on Factoid and Summary** question types on BioASQ. Exact numeric scores are not restated here because the full PDF was not accessible for verification; see the IEEE record for tables and experimental detail.

## Why it matters

- Connects the lab’s earlier **weirdness** line of work to biomedical retrieval  
- Emphasizes a **lightweight hybrid** design (API retrieval + LLM RAG) rather than only high-compute dense search  
- Positions the stack for practical biomedical QA where PubMed remains the literature source of truth
