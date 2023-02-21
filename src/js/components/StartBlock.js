class StartBlock {
  constructor(container, cb) {
    this.container = container
    this.cb = cb || (() => {})
    this.gameLevel = null
    this.tooltip = null
    this.startButton = null
    this.onDifficultyLevelClick = this.onDifficultyLevelClick.bind(this)
    this.onStartButtonClick = this.onStartButtonClick.bind(this)
  }

  render() {
    tmp.renderTemplate(
      this.container,
      'start-template',
      '#start-block',
      this.onRender.bind(this)
    )
  }

  onRender() {
    this.gameLevel = document.querySelector('#start-difficulty')
    this.tooltip = document.querySelector('#start-difficulty-tip')
    this.startButton = document.querySelector('#start-btn')

    if (!this.gameLevel || !this.tooltip || !this.startButton) {
      console.error('Unable to find one or more required elements')
      return
    }

    this.gameLevel.addEventListener('click', this.onDifficultyLevelClick)
    this.startButton.addEventListener('click', this.onStartButtonClick)
    this.cb(this.container)
  }

  onDifficultyLevelClick(event) {
    const target = event.target.closest('[data-difficulty]')

    if (!target) return

    const dataLevel = target.getAttribute('data-difficulty')
    app['data-difficulty'] = dataLevel
    this.startButton.removeAttribute('disabled')

    this.gameLevel.querySelectorAll('.selected').forEach((el) => {
      el.classList.remove('selected')
    })

    target.classList.add('selected')
    this.tooltip.textContent = `${dataLevel} level`

    out.log('Difficulty', app['data-difficulty'])
  }

  onStartButtonClick() {
    app.renderScreen('game-screen')
  }
}

const renderStartBlock = (container, cb) => {
  const startBlock = new StartBlock(container, cb)
  startBlock.render()
}

export default renderStartBlock
