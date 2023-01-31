const daisyui = require('daisyui')

const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {}
  },

  plugins: [daisyui],

  daisyui: {
    themes: [
      'night',
      'valentine',
      'dracula',
      'synthwave',
      'luxury',
      'coffee',
      'cyberpunk',
      'aqua',
      'retro',
      'autumn',
      'forest',
      'fantasy',
      'black'
    ]
  }
}

module.exports = config
