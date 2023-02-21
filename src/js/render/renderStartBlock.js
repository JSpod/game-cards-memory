export function renderStartBlock(container, cb) {
  tmp.renderTemplate(container, 'start-template', '#start-block', () => {
    const gameLevel = document.querySelector('#start-difficulty')
    const tooltip = document.querySelector('#start-difficulty-tip')
    const startButton = document.querySelector('#start-btn')

    gameLevel.childNodes.forEach((levelChild) => {
      levelChild.addEventListener('click', () => {
        if (levelChild.nodeType === 1) {
          // only process element nodes (not text nodes)
          const dataLevel = levelChild.getAttribute('data-difficulty')
          app['data-difficulty'] = dataLevel // save game level to app object
          startButton.removeAttribute('disabled')

          // remove class 'selected' from all elements
          gameLevel.childNodes.forEach((child) => {
            // only process element nodes
            if (child.nodeType === 1) {
              child.classList.remove('selected')
            }
          })

          // add class 'selected' to clicked element
          levelChild.classList.add('selected')

          // show tooltip
          tooltip.textContent = `${dataLevel} level`

          out.log('Difficulty', app['data-difficulty'])
        }
      })
    })

    startButton.addEventListener('click', () => {
      app.renderScreen('game-screen')
    })

    cb(container)
  }) // end of tmp.renderTemplate
}
