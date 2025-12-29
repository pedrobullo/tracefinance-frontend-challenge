## 🔭 Observabilidade de Infraestrutura

Mostrar alguns exemplos de observabilidade ligadas ao frontend, que seria de facil implementação e custo zero.

### OpenTelemetry (OTel)

**OpenTelemetry** é o padrão open-source para instrumentação de aplicações, permitindo coletar **traces**, **métricas** e **logs** de forma unificada.

#### Vantagens

- **Vendor-agnostic**: não há lock-in com nenhum provedor
- **Custo zero de licenciamento**: 100% open-source
- **Ecossistema rico**: SDKs para Node.js, Python, Go, Java, etc.

#### Arquitetura Proposta

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Next.js App   │────▶│  OTel Collector │────▶│     Grafana     │
│  (Instrumented) │     │   (self-hosted) │     │   Loki / Tempo  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
        │                       │                       │
   Traces/Logs             Exporters              Dashboards
   Métricas                                       Alertas
```

#### Fluxo no Contexto da Aplicação

1. **Instrumentação**: SDK OpenTelemetry no Next.js captura:
   - Traces de requisições HTTP (API Routes)
   - Spans de operações (database, external APIs)
   - Logs estruturados com context propagation

2. **Collector**: OpenTelemetry Collector (container leve) recebe os dados e:
   - Processa e enriquece com metadata
   - Exporta para backends de armazenamento

3. **Armazenamento & Visualização** (Grafana Stack - custo zero):
   - **Loki**: logs (alternativa ao Elasticsearch)
   - **Tempo**: traces distribuídos
   - **Prometheus**: métricas
   - **Grafana**: dashboards unificados

#### Custo Zero

| Componente        | Licença    | Custo |
| ----------------- | ---------- | ----- |
| OpenTelemetry SDK | Apache 2.0 | $0    |
| OTel Collector    | Apache 2.0 | $0    |
| Grafana OSS       | AGPL-3.0   | $0    |
| Loki              | AGPL-3.0   | $0    |
| Tempo             | AGPL-3.0   | $0    |
| Prometheus        | Apache 2.0 | $0    |

> **Nota**: Custo de infraestrutura (VMs, storage) depende do provedor cloud, mas a stack de software é 100% gratuita.

#### Exemplo de Instrumentação (Next.js)

```typescript
// instrumentation.ts (Next.js 13+)
import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_COLLECTOR_URL,
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
```

---

## 👁️ Observabilidade de UX

### Session Replay & Heatmaps

Ferramentas de replay e mapas de calor permitem entender o comportamento real dos usuários, identificar problemas de UX e otimizar conversões.

#### Opções Pagas

| Ferramenta      | Recursos                                          | Preço                         |
| --------------- | ------------------------------------------------- | ----------------------------- |
| **Datadog RUM** | Replay, heatmaps, error tracking, APM integration | A partir de $15/1000 sessions |
| **Hotjar**      | Heatmaps, recordings, surveys                     | A partir de $32/mês           |

#### Alternativas Gratuitas / Open-Source

| Ferramenta              | Recursos                                | Custo                      |
| ----------------------- | --------------------------------------- | -------------------------- |
| **OpenReplay**          | Session replay open-source, self-hosted | 100% gratuito              |
| **Clarity (Microsoft)** | Heatmaps, recordings, insights          | 100% gratuito, sem limites |

#### Recomendação para o Projeto

Para **custo zero** com funcionalidades completas:

1. **Microsoft Clarity** (gratuito, ilimitado):
   - Heatmaps de cliques, scroll e movimento
   - Session recordings
   - Insights automáticos de UX
   - Fácil integração (script tag)

2. **OpenReplay** (self-hosted, open-source):
   - Session replay completo
   - Co-browsing para suporte
   - DevTools integration
   - Privacidade (dados ficam no seu servidor)

#### Exemplo de Integração (Clarity)

```typescript
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script id="clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "YOUR_PROJECT_ID");
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

#### Exemplo de Integração (OpenReplay)

```typescript
// lib/openreplay.ts
import Tracker from "@openreplay/tracker";

const tracker = new Tracker({
  projectKey: process.env.NEXT_PUBLIC_OPENREPLAY_KEY,
  ingestPoint: "https://your-openreplay-instance.com/ingest",
});

export function startTracking(userId?: string) {
  tracker.start();
  if (userId) {
    tracker.setUserID(userId);
  }
}
```

---

## 📚 Referências

- [OpenTelemetry Documentation](https://opentelemetry.io/docs/)
- [Grafana Loki](https://grafana.com/oss/loki/)
- [Grafana Tempo](https://grafana.com/oss/tempo/)
- [Microsoft Clarity](https://clarity.microsoft.com/)
- [OpenReplay](https://openreplay.com/)
