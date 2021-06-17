import {DataStoreProvider} from "@dhis2/app-service-datastore";
import React from 'react'
import {RecoilRoot} from "recoil";
import './App.css'
import Router from "./modules/Router";
import {FullPageLoader} from "./shared/Loaders";



const MyApp = () => (
    <DataStoreProvider namespace={'Scorecard_App_Hisptz'} loadingComponent={<FullPageLoader/>}>
        <RecoilRoot>
           <div className='main-container'>
               <Router/>
           </div>
        </RecoilRoot>
    </DataStoreProvider>
)

export default MyApp
