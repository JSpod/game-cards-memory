class Output {
    constructor() { }

    log(name, data) {
        //console.log(`%c${name}`, 'color: #0cf; font-weight: bold');
        const prefix = name.includes('screen') ? '#' : name.includes('block') ? '##' : name.includes('template') ? '###' : '######';
        const msg = name.includes('screen') ? 'loaded' : name.includes('block') || name.includes('template') ? 'rendered' : data;
        console.log(`%c${prefix} %c${name} %c${msg}`, 'color: #080', 'color: #0cf', 'color: #0c0');
        if (data && msg !== data) {
            console.log(data);
        }
    }

    logError(message) {
        //console.warn(`Error: `);
        console.log(`%c${message}`, 'color: #fc0; font-weight: bold');
    }

}

export const output = new Output();