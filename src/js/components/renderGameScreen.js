function renderGameScreen(cb) {
  const base = document.querySelector('.base') // Get the base element
  base.textContent = '' // Clear the base element
  app.renderBlock('game-block', base) // Render the block in the base element
  if (cb) cb() // Call the callback function if it exists
}

export default renderGameScreen
