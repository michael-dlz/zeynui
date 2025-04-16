# 🎨 ZeynUI - Guía de Instalación Completa

## 📋 Requisitos previos

- Tailwind CSS 4.1+ instalado
- React 18+ o Next.js 13+

## 🛠️ Configuración Completa (Copiar y Pegar)

### 1. Instala la librería:

npm install @zeynui/react@latest

### 2. Configura tailwind.config.js

// tailwind.config.js
module.exports = {
content: [
"./src/**/*.{js,ts,jsx,tsx}",
"./node_modules/@zeynui/react/dist/**/*.{js,ts,jsx,tsx}"
],
plugins: [] // Opcional: añade plugins aquí si necesitas
}

### 3. Configura tu archivo CSS principal (globals.css o similar):

@import "tailwindcss";
@config "../../tailwind.config.js";

@theme {
/_ COLORS _/
--color-primary: #714fd3;
--color-secondary: #71717a;
--color-danger: #f31260;
--color-warning: #f5a524;
--color-success: #17c964;
--color-info: #7ee7fc;
--color-black: #141414;
--color-whatsapp: #128c7e;

/_ KEYFRAMES _/
@keyframes ripple {
0% {
opacity: 1;
transform: translate(-50%, -50%) scale(0);
}
100% {
opacity: 0;
transform: translate(-50%, -50%) scale(1);
}
}

/_ ANIMATION _/
--animate-ripple: ripple 0.5s ease-out forwards;

/_ SHADOWS _/
--shadow-none: 0 0 0 0 rgba(0, 0, 0, 0);
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04);

/_ BORDER RADIUS _/
--rounded-none: 0;
--rounded-sm: 0.125rem;
--rounded-md: 0.375rem;
--rounded-lg: 0.75rem;
--rounded-xl: 1.5rem;
--rounded-full: 9999px;
}

@tailwind base;
@tailwind components;
@tailwind utilities;

### 🔄 ¿Cómo personalizar?

### Edita las variables dentro del bloque @theme en tu CSS

@theme {
--color-primary: #8b5cf6; /_ Cambia el color primario _/
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.2); /_ Ajusta sombras _/
}

⚠️ Notas importantes

1. El orden de las directivas (@import, @config, @theme) es CRUCIAL
2. Asegúrate que la ruta en @config apunte correctamente a tu tailwind.config.js
3. Todos los componentes deben importarse DESPUÉS de la configuración del tema

🏗️ Estructura de proyecto recomendada

tu-proyecto/
├── tailwind.config.js
├── src/
│ ├── globals.css (con la configuración anterior)
│ ├── App.jsx
│ └── main.jsx

### ¡Listo! Ahora todos los componentes de ZeynUI funcionarán con sus estilos y animaciones completas.
