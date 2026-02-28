# DS_QUALITY_REQUIREMENTS.md  
## FlightOnTime – Data Science Quality & Integration Requirements

Este documento define los **requisitos mínimos de calidad, reproducibilidad e integración**
que debe cumplir el trabajo del equipo de **Data Science** para el proyecto **FlightOnTime**.

Su objetivo es asegurar que el modelo sea **usable, estable, interpretable e integrable**
por el Back-End sin fricción.

---

## 1. Alcance del Modelo
El modelo debe resolver un **problema de clasificación binaria**:

- `0` → Puntual  
- `1` → Retrasado  

Y devolver una **probabilidad asociada** a la clase positiva (`Retrasado`).

---

## 2. Dataset

### Requisitos
- Dataset limpio, consistente y documentado
- Variables mínimas recomendadas:
  - Aerolínea
  - Aeropuerto de origen
  - Aeropuerto de destino
  - Fecha y hora del vuelo
  - Distancia (km)
- Sin datos personales o sensibles

### Documentación obligatoria
- Fuente del dataset (link o descripción)
- Tamaño del dataset (filas / columnas)
- Periodo temporal cubierto
- Principales columnas utilizadas

---

## 3. Exploración y Preparación de Datos (EDA)

El notebook debe incluir:
- Análisis de valores faltantes
- Distribución de clases (puntual vs retrasado)
- Análisis básico de correlaciones o importancia preliminar
- Justificación de limpieza aplicada

### Feature Engineering mínimo
- Extracción de:
  - Hora del día
  - Día de la semana
- Transformaciones categóricas documentadas
- Normalización/encoding coherente con producción

---

## 4. Modelo

### Requisitos técnicos
- Modelo supervisado de clasificación:
  - Logistic Regression **o**
  - Random Forest Classifier
- Separación clara de:
  - Entrenamiento
  - Evaluación (train/test split)

### Métricas obligatorias
Reportar en el notebook:
- Accuracy
- Precision
- Recall
- F1-score

> ⚠️ No se exige alta performance, pero sí **consistencia y explicación**

---

## 5. Umbral de Decisión (CRÍTICO)

El equipo de DS debe definir explícitamente:

```text
probabilidad ≥ 0.5 → Retrasado
probabilidad < 0.5 → Puntual
