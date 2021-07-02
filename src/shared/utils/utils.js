import {capitalize, snakeCase} from "lodash";


export function getDataSourceShortName(name = '') {
    return snakeCase(name).split('_').map(s => capitalize(s)[0]).join('')

}

export function uid() {
    const letters = 'abcdefghijklmnopqrstuvwxyz' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const allowedChars = '0123456789' + letters;
    const NUMBER_OF_CODEPOINTS = allowedChars.length;
    const CODESIZE = 11;
    let uid;
    uid = letters.charAt(Math.random() * letters.length);
    for (let i = 1; i < CODESIZE; ++i) {
        uid += allowedChars.charAt(Math.random() * NUMBER_OF_CODEPOINTS);
    }
    return uid;
}


export function generateRandomValues(max) {
    const maxNo = max || 100
    return Math.floor(Math.random() * maxNo)
}
