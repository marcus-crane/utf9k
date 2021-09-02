const colors = require('tailwindcss/colors')

module.exports = {
  mode: "jit",
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        bluegray: colors.blueGray,
        gray: colors.coolGray,
        red: colors.red,
        yellow: colors.amber,
        lime: colors.lime,
        green: colors.emerald,
        teal: colors.teal,
        sky: colors.sky,
        blue: colors.blue,
        indigo: colors.indigo,
        purple: colors.violet,
        pink: colors.pink,
        rose: colors.rose,
      },
      typography(theme) {
        return {
          dark: {
            css: {
              color: theme("colors.gray.300"),
              '[class~="lead"]': { color: theme("colors.gray.400") },
              a: { color: theme("colors.gray.100") },
              strong: { color: theme("colors.gray.100") },
              "ul > li::before": { backgroundColor: theme("colors.gray.700") },
              hr: { borderColor: theme("colors.gray.800") },
              blockquote: {
                color: theme("colors.gray.100"),
                borderLeftColor: theme("colors.gray.800"),
              },
              h1: { color: theme("colors.gray.100") },
              h2: { color: theme("colors.gray.100") },
              h3: { color: theme("colors.gray.100") },
              h4: { color: theme("colors.gray.100") },
              code: { color: theme("colors.gray.100") },
              "a code": { color: theme("colors.gray.100") },
              pre: {
                color: theme("colors.gray.200"),
                backgroundColor: theme("colors.gray.800"),
              },
              thead: {
                color: theme("colors.gray.100"),
                borderBottomColor: theme("colors.gray.700"),
              },
              "tbody tr": { borderBottomColor: theme("colors.gray.800") },
            },
          },
        };
      },
    },
  },
  variants: {
    extend: {
      typography: ["dark"]
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ],
  purge: { // Had no luck with using PurgeCSS regexes so bruteforce instead
    safelist: [
      'bg-red-200',
      'bg-red-300',
      'bg-red-400',
      'bg-red-700',
      'bg-red-800',
      'bg-red-900',
      'bg-yellow-200',
      'bg-yellow-300',
      'bg-yellow-400',
      'bg-yellow-700',
      'bg-yellow-800',
      'bg-yellow-900',
      'bg-green-200',
      'bg-green-300',
      'bg-green-400',
      'bg-green-700',
      'bg-green-800',
      'bg-green-900',
      'bg-blue-200',
      'bg-blue-300',
      'bg-blue-400',
      'bg-blue-700',
      'bg-blue-800',
      'bg-blue-900',
      'bg-indigo-200',
      'bg-indigo-300',
      'bg-indigo-400',
      'bg-indigo-700',
      'bg-indigo-800',
      'bg-indigo-900',
      'bg-purple-200',
      'bg-purple-300',
      'bg-purple-400',
      'bg-purple-700',
      'bg-purple-800',
      'bg-purple-900',
      'bg-pink-200',
      'bg-pink-300',
      'bg-pink-400',
      'bg-pink-700',
      'bg-pink-800',
      'bg-pink-900'
    ],
    content: ['content/**/*.md', 'content/**/*.html', 'layouts/**/*.html'],
  }
}
