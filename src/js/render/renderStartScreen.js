export function renderStartScreen(cb) {
  const base = document.querySelector('.base') // Get the base element
  base.textContent = '' // clear the base element
  app.renderBlock('start-block', base) // render the start block in the base element
  cb()
}
