// tailwind-extra.js
// save this text in a file named 'tailwind-extra.js'
// import this plugin in your tailwind configuration
// plugins: [
//   require('./tailwind-extra'),
// ]
const svgToDataUri = require('mini-svg-data-uri')
const plugin = require('tailwindcss/plugin')
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')

module.exports = plugin.withOptions(
  function (options) {
    return function ({ matchUtilities, theme }) {
      // be aware you generate an svg image for each color
      // you can always use the white image only, then colorize the background
      matchUtilities(
        {
          'check-mark-indeterminate': (value) => ({
            'background-size': `100% 100%`,
            'background-position': `center`,
            'background-repeat': `no-repeat`,
            'background-image': `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path stroke="${value}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h8"/></svg>`
            )}")`,
          }),

          'check-mark': (value) => ({
            'background-size': `100% 100%`,
            'background-position': `center`,
            'background-repeat': `no-repeat`,
            'background-image': `url("${svgToDataUri(
              `<svg viewBox="0 0 16 16" fill="${value}" xmlns="http://www.w3.org/2000/svg"><path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"/></svg>`
            )}")`,
          }),

          'radio-mark': (value) => ({
            'background-size': `100% 100%`,
            'background-position': `center`,
            'background-repeat': `no-repeat`,
            'background-image': `url("${svgToDataUri(
              `<svg viewBox="0 0 16 16" fill="${value}" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="3"/></svg>`
            )}")`,
          }),

          'toggle-mark': (value) => ({
            'background-size': `contain`,
            'background-position': `left`, // `0 center`,
            'background-repeat': `no-repeat`,
            'background-image': `url("${svgToDataUri(
              `<svg viewBox="0 0 16 16" fill="${value}" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7"/></svg>`
            )}")`,
          }),
        },
        {
          values: flattenColorPalette(theme('backgroundColor')),
          type: 'color',
        }
      )

      matchUtilities(
        {
          highlight: (value) => ({ boxShadow: `inset 0 1px 0 0 ${value}` }),
        },
        {
          values: flattenColorPalette(theme('backgroundColor')),
          type: 'color',
        }
      )
    }
  },
  function (options) {
    return {
      theme: {
        extend: {
          animation: {
            checkmark: 'checkmark 0.2s ease-in-out',
            'togglemark-left': 'togglemark-left 0.2s ease-in-out',
            'togglemark-right': 'togglemark-right 0.2s ease-in-out',
          },

          keyframes: {
            checkmark: {
              '0%': {
                'background-position-y': `5px`,
              },
              '50%': {
                'background-position-y': `-2px`,
              },
              '100%': {
                'background-position-y': `0`,
              },
            },

            'togglemark-left': {
              '0%': {
                'background-position-x': `100%`,
              },
              '50%': {
                'background-position-x': `-10%`,
              },
              '100%': {
                'background-position-x': `0%`,
              },
            },

            'togglemark-right': {
              '0%': {
                'background-position-x': `0`,
              },
              '50%': {
                'background-position-x': `110%`,
              },
              '100%': {
                'background-position-x': `100%`,
              },
            },
          },
        },
      },
    }
  }
)
