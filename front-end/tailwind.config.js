/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#021740',     // Azul Escuro Principal (Headers, Hero, Ranking Cards)
        secondary: '#084677',   // Azul Médio (Dropzone, Cards de Parcerias)
        darkBlue: '#083b6c',    // Azul Profundo
        accent: '#08c5c8',      // Ciano / Turquesa Destaque
        cardBg: '#D9D9D9',      // Cinza neutro para elementos secundários
        bodyBg: '#f8f9fa',      // Fundo claro padrão das páginas
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}