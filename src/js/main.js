import { output } from './utils/output.js'
import { templateManager } from './utils/templateManager.js'
import { application } from './render/application.js'
import { renderStartScreen } from './render/renderStartScreen.js'
import { renderStartBlock } from './render/renderStartBlock.js'
import { renderGameScreen } from './render/renderGameScreen.js'
import { renderGameBlock } from './render/renderGameBlock.js'

document.addEventListener('DOMContentLoaded', () => {
  // make these objects available to all scripts
  window.app = application
  window.out = output
  window.tmp = templateManager

  // Add the render functions to the app object
  app.screens['start-screen'] = renderStartScreen
  app.blocks['start-block'] = renderStartBlock
  app.blocks['game-block'] = renderGameBlock
  app.screens['game-screen'] = renderGameScreen

  app.renderScreen('start-screen') // Render the start screen
})
