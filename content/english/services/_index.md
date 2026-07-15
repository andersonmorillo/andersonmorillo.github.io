---
title: "Services"
meta_title: "Anderson Morillo — Applied AI & RAG Services"
description: "Applied AI services — conversational RAG systems, dataset research and creation, monitoring-platform architecture, and meteorological IoT data platforms."
layout: "services"
draft: false

headline: "Applied AI systems your team can run in production"
intro: "I help engineering and research teams ship document-grounded assistants, evaluation pipelines, and monitoring platforms—backed by SemEval research and real deployments."

proof:
  - "SemEval 2023–2025"
  - "IEEE C3 2025"
  - "VerbaNexAI Lab · UTB"
  - "Live SGM dashboards"

labels:
  services: What I offer
  featured: Featured project
  process: How we work
  faq: Common questions
  cta_title: Ready to scope a RAG or monitoring project?
  cta_body: Tell me about your use case—NLP assistants, datasets, or IoT monitoring. I usually reply within 1–2 business days.
  problem: Problem
  approach: Approach
  result: Result
  for: For
  includes: What's included

hero_cta:
  label: "Start a conversation"
  link: "/contact"
hero_cta_secondary:
  label: "See featured project"
  link: "#featured"

services:
  - title: "Conversational AI & RAG systems"
    icon: "comments"
    for: "Teams drowning in technical or operational documentation"
    summary: "Document-grounded assistants with private or on-prem LLM options and production APIs—so answers stay tied to your corpus."
    bullets:
      - "RAG over manuals, SOPs, and internal docs"
      - "Private / on-premise LLM setups when data cannot leave"
      - "FastAPI backends and workflow automation (e.g. n8n)"

  - title: "Dataset research, evaluation & creation"
    icon: "database"
    for: "Research and product teams that need reliable data, not only models"
    summary: "Corpus design, curation, and evaluation pipelines so datasets are fit for shared tasks, training, or quality gates."
    bullets:
      - "Corpus design for research or shared tasks"
      - "Data quality and suitability analysis"
      - "Evaluation pipelines (hallucination / labeling consistency)"

  - title: "AI architecture for monitoring platforms"
    icon: "project-diagram"
    for: "Organizations running multi-site sensors and early-warning flows"
    summary: "End-to-end AI/data architecture for ingestion, analytics hooks, and alerting—designed to scale across sites."
    bullets:
      - "Environmental or hydraulic monitoring architectures"
      - "Real-time ingestion and alert design"
      - "Requirements and design for multi-city deployments"

  - title: "IoT & meteorological data platforms"
    icon: "cloud-sun-rain"
    for: "Operators who need station-level boards they can trust daily"
    summary: "Collect, store, and visualize high-frequency meteorological and IoT data with APIs and operator dashboards."
    bullets:
      - "TimescaleDB / time-series storage and ETL"
      - "REST APIs and operational dashboards"
      - "Station networks and board-style operator views"

featured_project:
  title: "SGM — Meteorological dashboards (San Andrés Island)"
  location: "San Andrés Island, Colombia"
  org: "Corporación Del Laboratorio al Campo · EEDAS"
  role: "Software Engineer"
  stack: "TimescaleDB · REST APIs · Streamlit / web dashboards · IoT ETL"
  problem: "Operators needed clear, station-level weather boards for day-to-day monitoring across the island."
  approach: "Time-series ingestion, REST APIs, and web dashboards so each station can be selected and reviewed quickly."
  result: "Live boards in use for stations such as Brooks Hill, RSU, and Interaseo."
  description: "Meteorological monitoring system to track weather variables across stations on San Andrés Island."
  link: "https://iotga-eedas.com"
  link_label: "Open live dashboards"
  secondary_link: "/contact"
  secondary_label: "Start a similar project"

process:
  - title: "Discover"
    body: "Clarify goals, data sources, constraints (privacy, latency, on-prem), and success criteria."
  - title: "Design"
    body: "Agree on architecture, evaluation approach, and a thin vertical that can ship first."
  - title: "Build"
    body: "Implement APIs, pipelines, and UIs with iterative demos—not a big-bang handoff."
  - title: "Handoff"
    body: "Document, deploy, and transfer ownership so your team can operate and extend the system."

faq:
  - q: "Do you work remotely?"
    a: "Yes. Most engagements are remote with clear async updates; on-site is possible in Colombia when needed."
  - q: "Can you work with private or on-premise LLMs?"
    a: "Yes. RAG and assistant work can stay on your network when documents or models cannot leave the organization."
  - q: "How do projects usually start?"
    a: "A short conversation to scope the problem, then a focused first milestone (often a working vertical in weeks, not months)."
  - q: "Is this only research, or production too?"
    a: "Both. Shared-task research informs the methods; production work (APIs, dashboards, monitoring) is what I ship for teams."

cta:
  label: "Email Anderson"
  link: "/contact"
---
