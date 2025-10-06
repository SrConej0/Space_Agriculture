# 🌌 Simulador de Agricultura Espacial

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/) [![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Aprende agricultura sostenible de forma divertida: gestiona pH del suelo, nutrientes (N-P-K), riego, temperatura y clima para llevar un cultivo de papa desde la preparación del suelo hasta la cosecha en un entorno espacial futurista.

---

## 🧭 Índice
- Resumen
- Capturas
- Características
- Mecánica del juego
- Acciones y efectos
- Indicadores y rangos óptimos
- Efectos ambientales
- Instalación
- Scripts
- Cómo jugar (tips)
- Arquitectura
- Valor educativo
- Roadmap
- FAQ
- Contribuir
- Licencia

---

## ✨ Resumen
Este proyecto es un juego web desarrollado con React + TypeScript. El objetivo es mantener la salud de la planta por encima del 80% equilibrando las condiciones del suelo y el ambiente, avanzando por etapas de crecimiento hasta completar la misión.

## 📸 Capturas
Puedes ejecutar el proyecto y tomar tus propias capturas. Sugerencia: añade GIFs del ciclo de crecimiento y el panel de acciones para ilustrar la dinámica.

## 🚀 Características
- Panel de acciones: regar, fertilizar (N-P-K), compost, ajustar pH, enfriar/templar suelo
- Indicadores en tiempo real: pH, humedad, temperatura, salud, balance de nutrientes
- Etapas de crecimiento con barra de progreso y análisis final del desempeño
- Efectos ambientales: ciclo día/noche y lluvia ocasional
- Visuales suaves, partículas sutiles y feedback de audio en acciones

## 🎮 Mecánica del juego
Flujo principal:
1) Observar indicadores → 2) Ejecutar acciones → 3) Evaluar cambios → 4) Mantener rangos → 5) Avanzar etapas → 6) Analizar resultados

Diagrama simplificado:
```
[Indicadores] → [Acciones] → [Ajustes del suelo] → [Estado de la planta]
        ↑                                      ↓
        └──────────── Ciclo de feedback ───────┘
```

## 🧪 Acciones y efectos
- Regar: aumenta humedad, puede enfriar el suelo ligeramente
- Añadir Nitrógeno (N): mejora crecimiento vegetativo; exceso puede bajar pH
- Añadir Fósforo (P): apoya desarrollo de raíces y floración
- Añadir Potasio (K): mejora resistencia y salud general
- Añadir Compost: incrementa materia orgánica y estabiliza pH
- Ajustar pH: corrige acidez/alcalinidad del suelo
- Enfriar/Templar suelo: modifica temperatura para estar en rango óptimo

## 📊 Indicadores y rangos óptimos
- pH: 5.5 – 6.5
- Humedad: 60% – 80%
- Temperatura: 15°C – 22°C
- Salud de la planta: procura mantenerla ≥ 80%
- Balance de nutrientes: evitar extremos; buscar equilibrio N-P-K

## 🌦️ Efectos ambientales
- Día/Noche: cambia la iluminación y el ambiente de forma cíclica
- Lluvia: aumenta humedad durante intervalos aleatorios y afecta la temperatura

## 🛠️ Instalación
Requisitos: Node.js 16+, npm y Git

1. Clonar el repositorio
```bash
git clone https://github.com/SrConej0/Space_Agriculture.git
cd Space_Agriculture
```
2. Instalar dependencias
```bash
npm install
```
3. Ejecutar en desarrollo
```bash
npm run dev
```
4. Abrir en el navegador
- Visita la URL mostrada en la terminal (p. ej. http://localhost:5173/)

## 📜 Scripts
```bash
npm run dev       # Servidor de desarrollo
npm run build     # Compilación para producción
npm run preview   # Previsualizar la build de producción
npm run lint      # Analizar con ESLint
npm run typecheck # Verificación de tipos con TypeScript
```

## 🧠 Cómo jugar (tips)
- Mantén la salud alta ajustando pH, humedad y temperatura
- Usa las acciones con moderación; cada una tiene efectos secundarios
- Observa tendencias: si la humedad sube demasiado, evita regar
- Avanza etapas solo cuando los indicadores estén estables
- Revisa el análisis final para aprender y mejorar

## 🧩 Arquitectura
```
src/
├── components/      # UI (acciones, indicadores, visualización)
├── hooks/           # Lógica del juego (useGameLogic)
├── data/            # Etapas de crecimiento y datos de suelo
├── types/           # Tipos TypeScript
└── App.tsx          # Entrada principal
```

## 🎓 Valor educativo
- Química del suelo y equilibrio de nutrientes
- Gestión del agua y conservación
- Fases de crecimiento vegetal en cultivo de papa
- Factores ambientales y su impacto en la agricultura
- Toma de decisiones informadas para sostenibilidad

## 🗺️ Roadmap
- Modo historia expandido con más cultivos (quinoa, maíz)
- Eventos climáticos adicionales (viento, tormenta)
- Sistema de logros y misiones
- Localización multilenguaje (ES/EN) con selector en la UI
- Modo accesibilidad (alto contraste, descripciones)

## ❓ FAQ
- ¿El juego guarda progreso? Por ahora, el estado es temporal en sesión.
- ¿Puedo añadir nuevos cultivos? Sí, ampliando `src/data/growthStages.ts` y la lógica en `useGameLogic`.
- ¿Funciona en móvil? La UI es responsive y se adapta a pantallas pequeñas.

## 🤝 Contribuir
1. Haz un fork
2. Crea una rama: `git checkout -b feature/tu-feature`
3. Commit: `git commit -m "feat: tu cambio"`
4. Push: `git push origin feature/tu-feature`
5. Abre un Pull Request

## 📄 Licencia
MIT. Consulta `LICENSE` para más detalles.
