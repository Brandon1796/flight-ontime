Este repositorio contiene exclusivamente los **datasets utilizados en el proyecto del hackatón**.  
Su propósito es centralizar, documentar y mantener organizados los datos empleados durante las distintas etapas del desarrollo del modelo predictivo.

No incluye código, modelos ni lógica de negocio.  
Únicamente almacena los archivos de datos necesarios para el análisis y entrenamiento.

## 📁 Contenido del repositorio

### `dataset_limpio.csv`
Este archivo corresponde al dataset utilizado durante la **fase inicial de análisis y experimentación**.

- Datos previamente limpiados y preparados.
- Usado para:
  - Entrenar modelos base.
  - Comparar distintos algoritmos.
  - Analizar correlaciones y relevancia de variables.
- Permitió identificar el modelo más adecuado y los features más importantes para la predicción.

### `dataset.csv`
Este archivo corresponde al **dataset final** utilizado por el **modelo predictivo definitivo**.

- Contiene únicamente los **features seleccionados** tras el análisis previo.
- Optimizado para su uso directo en el modelo de predicción.
- Es el dataset que se consume en la etapa final del proyecto (entrenamiento y API).

## 🧩 Organización del proyecto

La separación de este repositorio responde a buenas prácticas de ingeniería de datos:

- Mantener los datasets aislados del código.
- Facilitar el versionado y la trazabilidad de los datos.
- Permitir que otros equipos o servicios consuman la data sin dependencias adicionales.

## 📌 Nota
Cualquier cambio en los datasets debe reflejarse manteniendo esta documentación actualizada para asegurar la correcta comprensión del flujo de datos del proyecto
