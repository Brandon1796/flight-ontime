# FlightOnTime – Backend

## Descripción del Proyecto

**FlightOnTime** es una aplicación Back-End que predice si un vuelo viene atrasado o no. El sistema expone una API REST capaz de recibir información de un vuelo (aerolínea, origen, destino, fecha de partida y distancia) y devolver una predicción de puntualidad basada en un modelo de Data Science integrado con una API externa de Machine Learning.

## Alcance del Back-End

El Back-End expone una API REST capaz de recibir información de un vuelo y devolver una predicción de puntualidad basada en un modelo de Data Science. El sistema se integra con la API externa `https://flightdelaypredictor-api.onrender.com` para realizar las predicciones utilizando modelos de Machine Learning.

## Tecnologías y Frameworks

Este proyecto está construido con las siguientes tecnologías:

- **Java 17** - Lenguaje de programación
- **Spring Boot 4.0.0** - Framework principal
- **Spring Web** - Para la construcción de la API REST
- **Spring Validation** - Para validación de datos de entrada
- **Spring Data JPA** - Para persistencia de datos
- **PostgreSQL** - Base de datos relacional
- **Lombok** - Para reducir código boilerplate
- **JUnit 5** - Framework de testing (incluido en spring-boot-starter-test)
- **Maven** - Gestor de dependencias y construcción del proyecto
- **SpringDoc OpenAPI (Swagger)** - Para documentación interactiva de la API

##  Dependencias Principales

El proyecto utiliza las siguientes dependencias Maven:

```xml

        spring-boot-starter-web
        spring-boot-starter-validation
        spring-boot-starter-data-jpa
        spring-boot-starter-test    
    <!-- Base de datos -->    
        postgresql
    <!-- Utilidades -->    
        lombok    
    <!-- Documentación API (Swagger) -->    
        springdoc-openapi-starter-webmvc-ui
```

##  Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Java JDK 17** o superior
- **Maven 3.6+** (o usar el wrapper incluido `mvnw`)
- **PostgreSQL** (para base de datos, opcional en desarrollo local)
- **Git** (para clonar el repositorio)

### Verificar Instalación

```bash
java -version    # Debe mostrar Java 17 o superior
mvn -version     # Debe mostrar Maven 3.6+ o usar ./mvnw -version
```

##  Instalación y Ejecución

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd Vuelos-base-main
```

### 2. Compilar el Proyecto

Usando Maven wrapper (recomendado):
```bash
# En Windows
.\mvnw.cmd clean install

# En Linux/Mac
./mvnw clean install
```

O usando Maven instalado globalmente:
```bash
mvn clean install
```

### 3. Ejecutar la Aplicación

**Opción 1: Usando Maven wrapper**
```bash
# Windows
.\mvnw.cmd spring-boot:run

# Linux/Mac
./mvnw spring-boot:run
```

**Opción 2: Usando Maven**
```bash
mvn spring-boot:run
```

**Opción 3: Ejecutar el JAR compilado**
```bash
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

### 4. Verificar que la Aplicación Está Corriendo

La aplicación se ejecutará por defecto en: **http://localhost:8080**

Puedes verificar el estado con:
```bash
curl http://localhost:8080/predict/ping
```

Deberías recibir: `OK`

## 📖 Swagger UI - Documentación Interactiva de la API

El proyecto incluye Swagger UI para documentación interactiva de la API. Una vez que la aplicación esté corriendo, puedes acceder a la documentación de la siguiente manera:

### Acceder a Swagger UI

1. **Abrir en el navegador:**
   ```
   http://localhost:8080/swagger-ui.html
   ```
   o
   ```
   http://localhost:8080/swagger-ui/index.html
   ```

2. **Documentación OpenAPI (JSON):**
   ```
   http://localhost:8080/v3/api-docs
   ```

### Características de Swagger UI

- **Interfaz interactiva**: Puedes probar los endpoints directamente desde la interfaz web
- **Documentación completa**: Incluye descripciones, ejemplos y códigos de respuesta
- **Validación en tiempo real**: Muestra los esquemas de validación para cada endpoint
- **Ejemplos de request/response**: Incluye ejemplos de solicitudes y respuestas

### Configuración de Swagger

Swagger está configurado para ejecutarse solo en el ambiente local (según `application-local.properties`). Para producción, Swagger está deshabilitado por defecto.

##  Estructura del Proyecto

```
src/
├── main/
│   ├── java/com/flightontime/backend/
│   │   ├── controller/          # Controladores REST
│   │   │   └── PredictionController.java
│   │   ├── service/             # Lógica de negocio
│   │   │   └── PredictionService.java
│   │   ├── repository/          # Repositorios JPA
│   │   │   └── PredictionRepository.java
│   │   ├── client/              # Cliente para API de Data Science
│   │   │   └── DataScienceClient.java
│   │   ├── dto/                 # Data Transfer Objects
│   │   │   ├── request/
│   │   │   │   └── PredictionRequest.java
│   │   │   └── response/
│   │   │       └── PredictionResponse.java
│   │   ├── exception/           # Manejo de excepciones
│   │   │   ├── ApiError.java
│   │   │   └── GlobalExceptionHandler.java
│   │   ├── validation/          # Validadores personalizados
│   │   │   └── PredictValidator.java
│   │   ├── config/              # Configuraciones
│   │   │   ├── RestTemplateConfig.java
│   │   │   └── SwaggerConfig.java
│   │   ├── persistence/         # Entidades JPA
│   │   │   └── entity/
│   │   └── FlightOnTimeApplication.java  # Clase principal
│   └── resources/
│       ├── application.properties
│       ├── application-local.properties
│       ├── application-prod.properties
│       └── catalog/             # Catálogos de datos
│           ├── airlines.csv
│           └── airports.csv
└── test/
    └── java/com/flightontime/backend/
        └── validation/
            └── PredictValidatorTest.java
```

## 🔌 Endpoints Disponibles

### POST /predict

Endpoint principal para predecir si un vuelo sufrirá retraso o llegará a tiempo.

**Descripción:**
Este endpoint recibe los datos de un vuelo (aerolínea, origen, destino, fecha de partida y distancia) y devuelve una predicción basada en modelos de Machine Learning. El sistema valida todos los campos de entrada y luego consulta la API externa de Data Science (`https://flightdelaypredictor-api.onrender.com`) para obtener la predicción.

**URL Base:** `http://localhost:8080/predict`

**Método:** `POST`

**Content-Type:** `application/json`

**Request Body:**
```json
{
  "aerolinea": "AA",
  "origen": "JFK",
  "destino": "LAX",
  "fechaPartida": "2024-01-15 14:30:00",
  "distanciaKm": 350.0
}
```

**Campos del Request:**
- `aerolinea` (String, requerido): Código IATA de la aerolínea (2 letras). Ejemplo: "AA", "UA", "DL"
- `origen` (String, requerido): Código IATA del aeropuerto de origen (3 letras). Ejemplo: "JFK", "LAX", "SFO"
- `destino` (String, requerido): Código IATA del aeropuerto de destino (3 letras). Ejemplo: "JFK", "LAX", "MIA"
- `fechaPartida` (String, requerido): Fecha y hora de partida en formato `yyyy-MM-dd HH:mm:ss`. Ejemplo: "2024-01-15 14:30:00"
- `distanciaKm` (Double, requerido): Distancia del vuelo en kilómetros. Máximo 7 dígitos enteros y 2 decimales. Debe ser mayor a 0.

**Response Exitoso (200 OK):**
```json
{
  "prevision": "A TIEMPO",
  "probabilidad": 0.85
}
```

**Campos del Response:**
- `prevision` (String): Resultado de la predicción. Valores posibles: "A TIEMPO" o "RETRASADO"
- `probabilidad` (Double): Nivel de confianza del modelo (0.0 a 1.0). 1.0 representa 100% de confianza

**Códigos de Error:**
- `400 Bad Request`: Error de validación en los datos de entrada
- `500 Internal Server Error`: Error interno del servidor o error al comunicarse con la API de Data Science

### GET /predict/ping

Endpoint de healthcheck para verificar que el servicio está funcionando.

**URL:** `http://localhost:8080/predict/ping`

**Método:** `GET`

**Response (200 OK):**
```
OK
```

## 📝 Ejemplos de Uso con Postman

### Ejemplo 1: Vuelo Predicho a Tiempo

**Request:**
```
POST http://localhost:8080/predict
Content-Type: application/json
```

**Body:**
```json
{
  "aerolinea": "AA",
  "origen": "SFO",
  "destino": "LAX",
  "fechaPartida": "2024-01-15 14:30:00",
  "distanciaKm": 559.23
}
```

**Response Esperado (200 OK):**
```json
{
  "prevision": "A TIEMPO",
  "probabilidad": 0.85
}
```

### Ejemplo 2: Vuelo Predicho con Retraso

**Request:**
```
POST http://localhost:8080/predict
Content-Type: application/json
```

**Body:**
```json
{
  "aerolinea": "UA",
  "origen": "JFK",
  "destino": "MIA",
  "fechaPartida": "2024-01-20 08:15:00",
  "distanciaKm": 1762.50
}
```

**Response Esperado (200 OK):**
```json
{
  "prevision": "RETRASADO",
  "probabilidad": 0.78
}
```

### Ejemplo 3: Vuelo de Larga Distancia

**Request:**
```
POST http://localhost:8080/predict
Content-Type: application/json
```

**Body:**
```json
{
  "aerolinea": "DL",
  "origen": "ATL",
  "destino": "LAX",
  "fechaPartida": "2024-02-10 16:45:00",
  "distanciaKm": 3234.75
}
```

**Response Esperado (200 OK):**
```json
{
  "prevision": "A TIEMPO",
  "probabilidad": 0.92
}
```

### Ejemplo de Error: Validación Falla

**Request:**
```
POST http://localhost:8080/predict
Content-Type: application/json
```

**Body (con error):**
```json
{
  "aerolinea": "ABC",
  "origen": "JFK",
  "destino": "JFK",
  "fechaPartida": "2024-01-15",
  "distanciaKm": -100
}
```

**Response Esperado (400 Bad Request):**
```json
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "La aerolínea debe tener exactamente 2 caracteres",
  "path": "/predict"
}
```

##  Ejecutar Tests

Para ejecutar los tests unitarios:

```bash
# Usando Maven wrapper
.\mvnw.cmd test

# O usando Maven
mvn test
```

Los tests se encuentran en: `src/test/java/com/flightontime/backend/validation/`

##  Validaciones Implementadas

El sistema incluye las siguientes validaciones:

1. **Validación de Aerolínea**: 
   - Debe tener exactamente 2 caracteres
   - Solo letras (mayúsculas o minúsculas)
   - Debe existir en el catálogo `catalog/airlines.csv`

2. **Validación de Formato**: 
   - Origen/Destino: 3 caracteres, solo letras (códigos IATA)
   - Fecha: Formato `yyyy-MM-dd HH:mm:ss`
   - Distancia: Número positivo con máximo 7 dígitos enteros y 2 decimales

3. **Validación de Origen y Destino**: 
   - Verifica que el aeropuerto de origen y destino no sean iguales (comparación case-insensitive)
   - Mensaje de error: `"El origen y el destino no pueden ser iguales"`

## ⚙️ Configuración

### application.properties

El archivo de configuración principal se encuentra en `src/main/resources/application.properties`:

```properties
# Configuracion comun para todos los ambientes
spring.application.name=Prototipo

# Data Science API
datascience.api.url=https://flightdelaypredictor-api.onrender.com
```

### Configuración de API de Data Science

La API está configurada para conectarse con el servicio externo de Machine Learning:

```properties
datascience.api.url=https://flightdelaypredictor-api.onrender.com
```

**Nota:** Esta URL apunta a la API externa que realiza las predicciones usando modelos de Machine Learning. Puedes acceder a la documentación de la API externa en: `https://flightdelaypredictor-api.onrender.com/docs`

Si no se configura esta URL, el sistema devolverá una respuesta mock por defecto (útil para desarrollo y pruebas).

### Configuración por Ambiente

El proyecto incluye configuraciones específicas por ambiente:

- **application-local.properties**: Configuración para desarrollo local (incluye Swagger habilitado)
- **application-prod.properties**: Configuración para producción (Swagger deshabilitado)

##  Catálogos de Datos

El proyecto incluye catálogos en formato CSV en `src/main/resources/catalog/`:

- **airlines.csv**: Lista de códigos de aerolíneas válidas
- **airports.csv**: Lista de códigos de aeropuertos válidos

Estos archivos son utilizados por el validador para verificar que los datos de entrada sean correctos.

##  Notas Adicionales

- **Lombok**: Asegúrate de tener habilitado el procesamiento de anotaciones en tu IDE para que Lombok funcione correctamente.
- **Puerto**: Por defecto la aplicación corre en el puerto 8080. Puedes cambiarlo en `application.properties` con `server.port=8081`
- **Base de Datos**: El proyecto utiliza PostgreSQL. Asegúrate de tener la base de datos configurada según el ambiente que estés usando.
- **Swagger**: La documentación interactiva de Swagger está habilitada solo en el ambiente local por defecto.




[Especificar licencia si aplica]
