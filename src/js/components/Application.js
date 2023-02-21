class Application {
  constructor() {
    this.screens = {}
    this.blocks = {}
    this.templates = {}
  }

  // Registers a new screen with a given name and rendering function
  registerScreen(screenName, renderFunction) {
    this.screens[screenName] = renderFunction
  }

  // Registers a new block with a given name and rendering function
  registerBlock(blockName, renderFunction) {
    this.blocks[blockName] = renderFunction
  }

  // Renders a screen by calling its associated rendering function
  renderScreen(screenName) {
    const screen = this.screens[screenName]

    if (!screen) {
      console.error(`Screen "${screenName}" not found.`)
      return
    }

    screen(($) => out.log(screenName, $))
  }

  // Renders a block by calling its associated rendering function
  renderBlock(blockName, container) {
    const block = this.blocks[blockName]

    if (!block) {
      console.error(`Block "${blockName}" not found.`)
      return
    }

    block(container, ($) => out.log(blockName, $))
  }
}

export default new Application()
