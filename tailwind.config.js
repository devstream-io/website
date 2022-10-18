/** @type {import('tailwindcss').Config} */

const {tailwindConfig} = require('dev-website-tailwind-config');
module.exports = tailwindConfig;


// pre config
// module.exports = {
//   content: ['./src/**/*.{js,jsx,ts,tsx}'],
//   corePlugins: {
//     preflight: false,
//   },
//   darkMode: ['class', '[data-theme="dark"]'],
//   theme: {
//     spacing: {
//       1: '8px',
//       2: '12px',
//       3: '16px',
//       4: '24px',
//       5: '32px',
//       6: '48px',
//       7: '64px',
//       8: '80px',
//       9: '96px',
//       10: '112px',
//       11: '128px',
//     },
//     extend: {
//       colors: {
//         primary: '#7497F7',
//         'primary-light': '#99B3F9',
//         'primary-100': '#F0F4FE',
//         'primary-300': '#BDCEFB',
//         'primary-500': '#7497F7',
//         'primary-dark-light': '#2b3137',
//         'primary-dark': '#20232a',
//         neutral: {
//           invert: '#FFFFFF',
//           300: '#d4d4d8',
//           400: '#70727F',
//           600: '#292B3F',
//         },
//       },
//       fontSize: {
//         heading1: ['32px', { lineHeight: 1.25 }],
//         heading2: ['24px', { lineHeight: 1.25 }],
//         heading3: ['20px', { lineHeight: 1.25 }],
//         heading4: ['16px', { lineHeight: 1.25 }],
//         label14: ['14px', { lineHeight: 1.43 }],
//         label18: ['18px', { lineHeight: 1.56 }],
//         body: ['14px', { lineHeight: 1.214 }],
//         "body-sm": ['12px', { lineHeight: 1.25 }]
//       },
//       dropShadow: {
//         xl: ['0px 3.2px 16px rgba(153, 179, 249, 0.1)'],
//       },
//       boxShadow: {
//         sm: '0px 2.4px 4.8px -0.8px rgba(0, 0, 0, 0.2), 0px 1.6px 8px rgba(0, 0, 0, 0.2)',
//         lg: '0px 4.8px 9.6px -0.8px rgba(0, 0, 0, 0.2), 0px 3.2px 16px rgba(0, 0, 0, 0.2)',
//         lower: '0px 1.2px 2.4px -0.8px rgba(0, 0, 0, 0.1), 0px 0.8px 4px rgba(0, 0, 0, 0.07)',
//         high: '0px 9.6px 19.2px -0.8px rgba(0, 0, 0, 0.1), 0px 6.4px 32px rgba(0, 0, 0, 0.07)'
//       },
//     },
//   },
//   plugins: [],
// };
