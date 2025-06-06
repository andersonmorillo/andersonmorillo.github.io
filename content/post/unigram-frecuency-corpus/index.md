---
title: 📊 Crea tu propio corpus de frecuencia de unigrama usando datos de Google
summary: Aprende a procesar un gran corpus de unigramas en inglés y obtener frecuencias relativas usando Python.
date: 2025-06-06
authors:
  - admin
tags:
  - Python
  - NLP
  - Corpus
  - Google Ngram
image:
  caption: 'Image credit: [**GitHub**](https://github.com/andersonmorillo/Create_google_unigram_frecuency_corpus)'
---

¿Te interesan los corpus lingüísticos y el procesamiento de lenguaje natural? Este post describe cómo crear tu propio corpus de frecuencia de palabras (unigrama) en inglés utilizando el proyecto [Create_google_unigram_frecuency_corpus](https://github.com/andersonmorillo/Create_google_unigram_frecuency_corpus).

## ¿Qué es un corpus de unigrama?
Un corpus de unigramas es simplemente una colección de palabras individuales (sin contexto adyacente) y su frecuencia en un gran conjunto de textos. Es vital para tareas como modelado de lenguaje, análisis estadístico y filtrado de palabras en NLP.

## El proyecto
El repositorio [Create_google_unigram_frecuency_corpus](https://github.com/andersonmorillo/Create_google_unigram_frecuency_corpus) facilita la descarga, procesamiento y extracción de frecuencias absolutas y relativas de palabras individuales desde el corpus de Google Books, todo de forma automática y optimizada para grandes volúmenes.

### Características principales
- Descarga y procesa el dataset de Google Ngram para unigramas en inglés.
- Procesamiento paralelo para aprovechar todos los núcleos de tu CPU.
- Calcula frecuencias relativas para cada palabra, exportando los resultados a un archivo CSV.
- Barras de progreso amigables y eficiente manejo de grandes cantidades de datos.

## Instalación y uso
1. Clona el repositorio:
   ```bash
   git clone https://github.com/andersonmorillo/Create_google_unigram_frecuency_corpus
   cd Create_google_unigram_frecuency_corpus
   ```
2. Instala las dependencias:
   ```bash
   pip install google-ngram-downloader tqdm
   ```
3. Ejecuta el script principal:
   ```bash
   python google_unigrams.py
   ```

El script procesa todas las letras de forma paralela, calcula las frecuencias y guarda el resultado en un archivo CSV delimitado por punto y coma (`;`).

## Salida esperada
El archivo resultante (`ENG1_GoogleUnigrams.csv`) contiene dos columnas:
- **Word**: palabra (en minúsculas)
- **Frequency**: frecuencia relativa calculada

## Aplicaciones
- Modelado básico del lenguaje y generación de texto
- Filtrado de palabras según frecuencia para tareas de análisis
- Construcción de listas de palabras clave

## Fuentes y recursos
- [Repositorio en GitHub](https://github.com/andersonmorillo/Create_google_unigram_frecuency_corpus)

¿Te resulta útil este recurso? ¡Explóralo, experimenta y contribuye!