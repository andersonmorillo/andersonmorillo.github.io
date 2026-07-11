---
title: "🚦 Guía rápida: cómo funciona el Model Context Protocol (MCP)"
description: "Introducción al Model Context Protocol (MCP): capa de transporte, uso con Fast Agent y ejemplos de integración."
date: 2025-06-23T00:00:00Z
image: "/images/mcp.png"
categories: ["AI", "NLP"]
author: "Anderson Morillo"
tags: ["MCP", "Model Context Protocol", "Fast Agent", "AI Agents"]
draft: false
---

# ¿Qué es el Model Context Protocol (MCP)?

El **Model Context Protocol (MCP)** es una especificación abierta para comunicación segura y en streaming, e integración de herramientas, entre clientes y servidores de modelos de lenguaje. Permite que los modelos y sus agentes auxiliares compartan contexto y recursos de forma eficiente, entre plataformas, herramientas y flujos de trabajo distintos.

MCP define convenciones para compartir prompts, recursos y flujos de agentes, y es una pieza clave para construir sistemas de agentes de IA modulares y composables.

### Características de diseño
- **Intercambio de contexto estandarizado:** comunicación estructurada entre modelos, agentes y herramientas.
- **Herramientas extensibles:** integrar sistemas de archivos, fetchers y herramientas personalizadas con agentes LLM.
- **Flexibilidad de transporte:** funciona sobre HTTP streamable y *stdio* (entrada/salida estándar), lo que simplifica las integraciones.
- **Ciclo de vida y seguridad claros:** autenticación basada en políticas y gestión flexible de sesiones.

Para arquitectura y documentación de desarrollo, consulta:
- [Introducción a MCP](https://modelcontextprotocol.io/introduction.md)
- [Arquitectura central](https://modelcontextprotocol.io/docs/concepts/architecture.md)
- [Transportes](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports.md)

## Capa de transporte de MCP

MCP es intencionalmente simple pero potente. El protocolo define cómo se comunican agentes y servidores, con dos mecanismos principales de transporte:

- **HTTP streamable:** envía y recibe contexto y eventos como un flujo de datos en tiempo real sobre HTTP.
- **Stdio (entrada/salida estándar):** permite que agentes y herramientas se comuniquen por pipes de terminal, útil para prototipos locales o scripts composables en cualquier lenguaje.

Ver: [Documentación de transportes](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports.md)

## Ejemplos de servidores y clientes MCP

Puedes explorar listas y ejemplos de código abierto de clientes y servidores compatibles con MCP aquí:
- [Clientes de ejemplo](https://modelcontextprotocol.io/clients.md)  
- [Servidores de ejemplo](https://modelcontextprotocol.io/examples.md)
- [Para desarrolladores de clientes](https://modelcontextprotocol.io/quickstart/client.md)  
- [Para desarrolladores de servidores](https://modelcontextprotocol.io/quickstart/server.md)
- [Preguntas frecuentes](https://modelcontextprotocol.io/faqs.md)


# Paso a paso: usar Fast Agent con MCP

Así puedes configurar un agente MCP (Fast Agent) desde cero:

## 1. Crear y activar un entorno virtual e instalar dependencias
```bash
uv venv
.venv\Scripts\activate
uv pip install fast-agent-mcp
fast-agent setup
```

## 2. Configurar tu API key
Edita `fastagent.secrets.yaml` y añade la clave de tu proveedor de LLM. Para OpenAI, ver: [Obtener API key](https://platform.openai.com/docs/quickstart)
```yaml
api_key: sk-... # Tu clave de OpenAI
```

## 3. Configurar el proveedor de LLM
Define el proveedor y el modelo en tu configuración (ver [documentación de Fast Agent](https://fast-agent.ai/docs)).

## 4. Registrar servidores (herramientas) con el cliente
Actualiza la configuración para añadir servidores MCP: ¡esas son las herramientas de tu agente!
```python
servers = ["filesystem", "fetch"]
```

## 5. Ejecutar el agente
```bash
uv run agent.py
```

# Ejemplo de uso y flujos de trabajo

Puedes definir agentes y flujos con Fast Agent así:

```python
from mcp_agent.core.fastagent import FastAgent

fast = FastAgent("Agent Example")

@fast.agent(
    instruction="Given an object, respond only with an estimate of its size.",
    servers=["filesystem", "fetch"]
)
async def main():
    async with fast.run() as agent:
        await agent()

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
```

Para ejecutar:
```bash
uv run agent.py --model sonnet
```

Los agentes y flujos pueden encadenarse, ejecutarse en paralelo o incluir entrada humana. Consulta los [ejemplos oficiales de Fast Agent](https://fast-agent.ai/examples/) y las [listas de clientes/servidores MCP](https://modelcontextprotocol.io/clients.md).

# Video de inicio rápido

Mira el recorrido en [YouTube](https://www.youtube.com/watch?v=PrpxdFvR3a0).

# Referencias
- [Sitio oficial de Model Context Protocol](https://modelcontextprotocol.io/)
- [Fast Agent AI](https://fast-agent.ai/)
- [Especificación y docs de MCP](https://modelcontextprotocol.io/specification/2025-06-18/index.md)
