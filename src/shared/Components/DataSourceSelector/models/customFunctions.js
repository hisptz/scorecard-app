import DataSource from "./dataSource";


export default class CustomFunctions extends DataSource {

    constructor({label}) {
        super({label, type: 'customFunction'});
    }

}
