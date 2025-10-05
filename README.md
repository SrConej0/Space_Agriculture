# 🌱 Plant Growing Game - Juego de Cultivo de Plantas

Un juego educativo interactivo sobre agricultura sostenible donde los jugadores aprenden a cultivar plantas desde semillas hasta la cosecha, gestionando factores como pH del suelo, nutrientes, agua y condiciones ambientales.

## 🎮 Descripción del Proyecto

Este es un juego web desarrollado en **React + TypeScript** que simula el proceso de cultivo de plantas de manera realista y educativa. Los jugadores deben tomar decisiones sobre el cuidado de sus plantas, aprendiendo sobre:

- **Gestión del suelo**: pH, nutrientes (N-P-K), materia orgánica
- **Riego**: Niveles de agua y humedad
- **Condiciones ambientales**: Temperatura y efectos climáticos
- **Etapas de crecimiento**: Desde semilla hasta cosecha con papas y flores

## ✨ Características Principales

### 🎯 Mecánicas de Juego
- **5 etapas de crecimiento** progresivas
- **Sistema de puntuación** basado en salud de la planta
- **Efectos ambientales** dinámicos (lluvia, sol, viento)
- **Retroalimentación educativa** detallada al final del juego

### 🎨 Visualización
- **Animaciones fluidas** con CSS y JavaScript
- **Representación visual realista** de plantas, papas y flores
- **Efectos de partículas** y elementos ambientales
- **Interfaz responsive** adaptable a diferentes pantallas

### 📊 Sistema de Gestión
- **Panel de acciones** para riego, fertilización y ajustes
- **Indicadores en tiempo real** de salud y condiciones
- **Progreso visual** con barras y métricas
- **Análisis de rendimiento** al completar el juego

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Iconos**: Lucide React
- **Build Tool**: Vite
- **Linting**: ESLint

## 🚀 Instalación y Ejecución

### Prerrequisitos
- **Node.js** (versión 16 o superior)
- **npm** o **yarn**
- **Git**

### Pasos para ejecutar el proyecto

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/plant-growing-game.git
   cd plant-growing-game
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   - El juego estará disponible en: `http://localhost:5173/`

### Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye para producción
npm run preview      # Vista previa de build de producción

# Calidad de código
npm run lint         # Ejecuta ESLint
npm run typecheck    # Verifica tipos de TypeScript
```

## 🎯 Cómo Jugar

1. **Inicio**: Comienza con una semilla en etapa 1
2. **Gestión**: Usa el panel de acciones para:
   - 💧 Regar la planta
   - 🧪 Añadir fertilizantes (N-P-K)
   - 🌿 Agregar compost
   - ⚖️ Ajustar pH del suelo
   - 🌡️ Controlar temperatura
3. **Monitoreo**: Observa los indicadores de salud y condiciones
4. **Progreso**: Avanza a través de 5 etapas de crecimiento
5. **Cosecha**: Completa el ciclo y recibe retroalimentación detallada

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── PlantVisualization.tsx    # Visualización principal de la planta
│   ├── ActionPanel.tsx           # Panel de acciones del jugador
│   ├── IndicatorPanel.tsx        # Indicadores de estado
│   ├── ScorePanel.tsx            # Panel de puntuación
│   └── ...
├── hooks/              # Custom hooks
│   └── useGameLogic.ts           # Lógica principal del juego
├── types/              # Definiciones de tipos TypeScript
│   └── game.ts                   # Tipos del juego
├── data/               # Datos del juego
│   └── growthStages.ts           # Configuración de etapas
└── ...
```

## 🎓 Valor Educativo

Este juego enseña conceptos importantes de agricultura sostenible:
- **Química del suelo** y balance de nutrientes
- **Gestión del agua** y conservación
- **Ciclos de crecimiento** de las plantas
- **Factores ambientales** que afectan los cultivos
- **Toma de decisiones** en agricultura

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si quieres mejorar el juego:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**¡Disfruta aprendiendo sobre agricultura sostenible! 🌱🎮**