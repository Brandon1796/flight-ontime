# FlightOnTime

Sistema predictivo de Machine Learning para estimar la probabilidad de retraso de vuelos.

FlightOnTime es una solución completa compuesta por:

- Data Science & Machine Learning
- API de predicción
- Backend (Spring Boot)
- Frontend

---

## Descripción General

FlightOnTime predice si un vuelo llegará a tiempo o con retraso utilizando variables operativas y temporales.

El sistema está diseñado para:

- Mejorar la toma de decisiones operativas  
- Reducir incertidumbre en planificación  
- Exponer una predicción probabilística lista para producción  

---

## Arquitectura del Proyecto

```
flightOnTime/
├── flightOnTime-frontend/     # Interfaz de usuario
├── flightOnTime-backend/      # API principal (Spring Boot)
├── flightOnTime-dataScience/  # Análisis, limpieza y entrenamiento
└── flightOnTime-ml-api/       # API de Machine Learning (Python)
```

### Flujo del Sistema

1. El usuario ingresa datos del vuelo en el Frontend  
2. El Frontend envía la solicitud al Backend  
3. El Backend consume la ML API  
4. La ML API devuelve una probabilidad de retraso  
5. El resultado se muestra al usuario  

---

## Modelo de Machine Learning

- Tipo de problema: Clasificación binaria  
- Variable objetivo: Retraso (Sí / No)  
- Métrica priorizada: Recall de la clase "Retrasado"  
- Enfoque: Modelo robusto e interpretable para entorno productivo  

---

## Tecnologías Utilizadas

### Data Science
- Python  
- Pandas  
- Scikit-Learn  
- Jupyter Notebook  

### Backend
- Java  
- Spring Boot  

### ML API
- FastAPI / Flask  
- Modelo serializado (.pkl)  

### Frontend
- (Indicar framework utilizado: React, Angular, Vue, etc.)  

---

## Cómo Ejecutar el Proyecto

### 1. ML API
```bash
cd flightOnTime-ml-api
pip install -r requirements.txt
python main.py
```

### 2. Backend
```bash
cd flightOnTime-backend
./mvnw spring-boot:run
```

### 3. Frontend
```bash
cd flightOnTime-frontend
npm install
npm start
```

---

## Objetivo del Modelo

Predecir la probabilidad de retraso de un vuelo priorizando:

- Alta detección de vuelos retrasados  
- Buen balance entre precisión y estabilidad  
- Interpretabilidad para entorno de producción  

---

## Estado del Proyecto

En desarrollo y mejora continua.

---

## Autor

Brandon Calderón  
Proyecto desarrollado como sistema integral de Data Science y ML Engineering.
