import {DataStoreProvider} from "@dhis2/app-service-datastore";
import React from 'react'
import {RecoilRoot} from "recoil";
import classes from './App.module.css'
import ExampleForms from "./modules/test/Forms";

const MyApp = () => (
    <DataStoreProvider namespace={'Scorecard_App_Hisptz'} loadingComponent={<div>Loading...</div>}>
        <RecoilRoot>
           <div className={classes.container}>
               <ExampleForms/>
           </div>
        </RecoilRoot>
    </DataStoreProvider>
)

export default MyApp
