import {atom} from "recoil";


const HelpState = atom({
    key: 'help-state',
    default: false
})

const HelpStepsState = atom({
    key: "help-steps-state",
})


export default HelpState;
