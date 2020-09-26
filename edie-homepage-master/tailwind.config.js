module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    fontFamily: {
      'heebo': ['Heebo'],
      'pop': ['Poppins'],
    },
    extend: {
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem'
      },
      backgroundColor:  theme =>  ({
        'dark-blue' : '#100E1D'
      }),
    },
  },
  variants: {},
  plugins: [],
}