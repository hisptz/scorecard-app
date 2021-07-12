import {DataStoreProvider} from "@dhis2/app-service-datastore";
import React from 'react'
import {RecoilRoot} from "recoil";
import './App.css'
import Router from "./modules/Router";
import {FullPageLoader} from "./shared/Components/Loaders";
import './locales'


const MyApp = () => (
    <DataStoreProvider namespace={'hisptz-scorecard'} loadingComponent={<FullPageLoader/>}>
        <RecoilRoot>
           <div className='main-container'>
               <Router/>
           </div>
        </RecoilRoot>
    </DataStoreProvider>
)

export default MyApp
