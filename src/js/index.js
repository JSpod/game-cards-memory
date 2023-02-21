import Application from './components/Application.js'
import RenderGameBlock from './components/GameBlock.js'
import RenderStartBlock from './components/StartBlock.js'
import RenderGameScreen from './components/renderGameScreen.js'
import RenderStartScreen from './components/renderStartScreen.js'
import Output from './utils/Output.js'
import TemplateManager from './utils/TemplateManager.js'

document.addEventListener('DOMContentLoaded', () => {
  // make these objects available to all scripts
  window.app = Application // application object
  window.out = Output // output manager (console.log)
  window.tmp = TemplateManager // template manager (render templates)

  /* register the screens and blocks with the application object
    so they can be rendered later on by name (see below)
    f.e. app.renderScreen('start-screen')
   */
  app.registerScreen('start-screen', RenderStartScreen)
  app.registerBlock('start-block', RenderStartBlock)
  app.registerScreen('game-screen', RenderGameScreen)
  app.registerBlock('game-block', RenderGameBlock)

  // render the start screen
  app.renderScreen('start-screen')
})
