export const PRIORITY = {
    l: 'low',
    m: 'moderate',
    h: 'high'
}

export class item {
    static idCounter = 0;
    constructor(name, priority, tags) {
        this.id = item.idCounter++;
        this.name = name    /* string */
        this.priority = priority    /* PRIORITY OBJECT */
    }
}


export default class list {
    static idCounter = 0;
    constructor(name, items) {
        this.id = list.idCounter++;
        this.name = name;   /* string */
        this.items = items; /* array of item object */
    }

    getName() { return this.name }
}