// eslint-disable-next-line import/named
import i18n from "@dhis2/d2-i18n";
import {accessTypes} from "../Models";


export function displayAccessPermission(access){


    if(access===accessTypes.READ_WRITE){
        return i18n.t("read and write")
    }
    if(access===accessTypes.READ_ONLY){
        return i18n.t("read only")
    }
    if(access===accessTypes.NO_ACCESS){
        return i18n.t("none")
    }







}