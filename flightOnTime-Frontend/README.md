# FlightOnTime

FlightOnTime es una aplicación Angular moderna para consultar información sobre vuelos y predicciones de puntualidad. Construida con Angular 19.2, TypeScript y Tailwind CSS.

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior): [Descargar Node.js](https://nodejs.org/)
- **npm** (gestor de paquetes, incluido con Node.js)

Para verificar que están instalados, ejecuta:

```bash
node --version
npm --version
```

## Instalación

1. **Clona o descarga el proyecto** (si no lo has hecho ya)

2. **Instala las dependencias del proyecto**:

```bash
npm install
```

Esto descargará todas las dependencias necesarias incluidas en el archivo `package.json`.

## Ejecución del proyecto

### Modo desarrollo

Para iniciar el servidor de desarrollo local, ejecuta:

```bash
npm start
```

O alternativamente:

```bash
ng serve
```

Luego, abre tu navegador y navega a `http://localhost:4200/`. La aplicación se recargará automáticamente cuando modifiques cualquiera de los archivos fuente.

### Modo producción

Para compilar y ejecutar la aplicación en modo producción:

```bash
npm run build
ng serve --configuration production
```

La aplicación optimizada estará disponible en `http://localhost:4200/`

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Compilación

Para compilar el proyecto, ejecuta:

```bash
npm run build
```

Esto compilará tu proyecto y almacenará los artefactos de compilación en el directorio `dist/`. Por defecto, la compilación de producción optimiza tu aplicación para mejor rendimiento y velocidad.

## Pruebas unitarias

Para ejecutar las pruebas unitarias con el ejecutor de pruebas [Karma](https://karma-runner.github.io), usa el siguiente comando:

```bash
npm test
```

O directamente:

```bash
ng test
```

## Scripts disponibles

En el archivo `package.json` encontrarás los siguientes scripts útiles:

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Compila el proyecto para producción
- `npm run watch` - Compila en modo watch (desarrollo)
- `npm test` - Ejecuta las pruebas unitarias

## Estructura del proyecto

```
src/
├── app/
│   ├── components/         # Componentes de la aplicación
│   │   ├── home/
│   │   ├── company/
│   │   ├── history/
│   │   ├── global-stats/
│   │   ├── prediction-result/
│   │   └── api-documentation/
│   ├── services/           # Servicios (API)
│   │   └── flight-api.service.ts
│   ├── app.component.*
│   ├── app.config.ts       # Configuración de la app
│   └── app.routes.ts       # Rutas de la aplicación
├── environments/           # Configuraciones por entorno
├── main.ts                 # Punto de entrada
└── styles.css              # Estilos globales
```

## Características principales

- **Consulta de vuelos**: Busca información sobre vuelos
- **Predicción de puntualidad**: Obtén predicciones sobre la puntualidad de los vuelos
- **Estadísticas globales**: Visualiza estadísticas generales
- **Historial**: Consulta el historial de búsquedas
- **Documentación API**: Información sobre los endpoints disponibles

## Solución de problemas

### "command not found: ng"
Si obtienes este error, instala Angular CLI globalmente:
```bash
npm install -g @angular/cli
```

### Puerto 4200 ya está en uso
Si el puerto 4200 está ocupado, puedes especificar otro:
```bash
ng serve --port 4300
```

### Problemas con las dependencias
Si experimentas problemas con las dependencias, intenta:
```bash
npm cache clean --force
rm -r node_modules
npm install
```

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Desarrollado por

- **Natalia Muñoz** - GitHub: [@Natams7526](https://github.com/Natams7526)
