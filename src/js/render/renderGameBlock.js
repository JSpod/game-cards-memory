export function renderGameBlock(container) {
  const difficulty = {
    easy: 9,
    medium: 18,
    hard: 36
  }

  tmp.renderTemplate(container, 'game-template', '#game-block', () => {
    // get game level
    const gameLevelText = app['data-difficulty']
    document.querySelector('.gameBlock__level span').textContent = gameLevelText

    const gameLevel = document.querySelector('.gameBlock__level')
    gameLevel.classList.add(`gameBlock__level--${gameLevelText}`)

    // clone more cards
    const gameLevelNum = difficulty[gameLevelText]
    addCards(gameLevelNum)

    const cards = document.querySelectorAll('.gameBlock__cards__item')
    for (let card of cards) {
      card.addEventListener('click', (e) => {
        card.classList.toggle('flip')
      })
    }
  })
}

//* clone cards
async function addCards(number = 8) {
  const card = document.querySelector('.gameBlock__cards__item')
  for (let i = 0; i < number - 1; i++) {
    card.parentNode.insertBefore(card.cloneNode(true), card.nextSibling)
  }
}
