export default class uuid {
    static id = 0;
    static get = () => {
        return uuid.id++;
    }
}