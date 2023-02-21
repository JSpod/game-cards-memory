class Output {
  constructor() {}

  determinePrefix(name) {
    if (name.includes('screen')) {
      return '#'
    } else if (name.includes('block')) {
      return '##'
    } else if (name.includes('template')) {
      return '###'
    } else {
      return '######'
    }
  }

  determineMessage(name, data) {
    if (name.includes('screen')) {
      return 'loaded'
    } else if (name.includes('block') || name.includes('template')) {
      return 'rendered'
    } else {
      return data
    }
  }

  log(name, data) {
    const prefix = this.determinePrefix(name)
    const msg = this.determineMessage(name, data)

    console.log(
      `%c${prefix} %c${name} %c${msg}`,
      'color: #080',
      'color: #0cf',
      'color: #0c0'
    )

    if (data && msg !== data) {
      console.log(data)
    }
  }

  logError(message) {
    console.log(`%c${message}`, 'color: #fc0; font-weight: bold')
  }
}

export default new Output()
