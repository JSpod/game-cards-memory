class Application {
    constructor() {
        this.screens = {};
        this.blocks = {};
        this.templates = {}
    }

    renderScreen(screenName) {
        this.screens[screenName]($ => out.log(screenName, $));
    }

    renderBlock(blockName, container) {
        this.blocks[blockName](container, $ => out.log(blockName, $));
    }

}

export const application = new Application();

