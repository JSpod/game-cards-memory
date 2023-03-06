class GameBlock {
  constructor(container, cb) {
    this.container = container
    this.cb = cb || (() => {})
    this.gameLevel = null
    this.cardsContainer = null
    this.difficultyLevels = {
      easy: 6,
      medium: 12,
      hard: 18,
    }
  }

  render() {
    tmp.renderTemplate(this.container, 'game-template', '#game-block', () => {
      this.gameLevel = this.container.querySelector('.gameBlock__level')
      this.cardsContainer = this.container.querySelector('.gameBlock__cards')
      const gameLevelText = app['data-difficulty']
      this.setGameLevelText(gameLevelText)
      this.styleGameLevel(gameLevelText)
      this.cloneCards(gameLevelText)
      this.addCardClickListeners()
    })
  }

  setGameLevelText(gameLevelText) {
    const gameLevelSpan = this.gameLevel.querySelector('span')
    gameLevelSpan.textContent = gameLevelText
  }

  styleGameLevel(gameLevelText) {
    this.gameLevel.className = 'gameBlock__level'
    this.gameLevel.classList.add(`gameBlock__level--${gameLevelText}`)
  }

  cloneCards(gameLevelText) {
    const numberOfCards = this.difficultyLevels[gameLevelText]
    const card = this.cardsContainer.querySelector('.gameBlock__cards__item')
    while (this.cardsContainer.children.length < numberOfCards) {
      this.cardsContainer.appendChild(card.cloneNode(true))
    }
    while (this.cardsContainer.children.length > numberOfCards) {
      this.cardsContainer.removeChild(this.cardsContainer.lastChild)
    }
  }

  addCardClickListeners() {
    const cards = this.cardsContainer.querySelectorAll(
      '.gameBlock__cards__item'
    )
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        card.classList.toggle('flip')
      })
    })
  }
}

const renderGameBlock = (container, cb) => {
  const game = new GameBlock(container, cb)
  game.render()
}

export default renderGameBlock
