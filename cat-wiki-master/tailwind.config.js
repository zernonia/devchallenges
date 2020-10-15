module.exports = {
  theme: {
    extend: {
      borderRadius: {
        '4xl': '1.5rem',
        '5xl': '1.75rem',
        '6xl': '2rem',
      },
      fontFamily: {
        // eslint-disable-next-line prettier/prettier
        'mont': 'Montserrat',
      },
    },
  },
  variants: {},
  plugins: [],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
      // TypeScript
      'plugins/**/*.ts',
      'nuxt.config.ts',
    ],
  },
}
