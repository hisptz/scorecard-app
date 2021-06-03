import React from 'react'
import classes from './App.module.css'
import {DataStoreProvider} from "@dhis2/app-service-datastore";
import {RecoilRoot} from "recoil";

const MyApp = () => (
    <DataStoreProvider namespace={'Scorecard_App_Hisptz'} loadingComponent={<div>Loading...</div>}>
        <RecoilRoot>
           <div className={classes.container}>
               <h1>Welcome to Scorecard!</h1>
           </div>
        </RecoilRoot>
    </DataStoreProvider>
)

export default MyApp
