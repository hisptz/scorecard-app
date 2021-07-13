import {DataStoreProvider} from "@dhis2/app-service-datastore";
import React, {Suspense} from 'react'
import {RecoilRoot,} from "recoil";
import './App.css'
import Router from "./modules/Router";
import {FullPageLoader} from "./shared/Components/Loaders";
import './locales'


const MyApp = () => (
    <DataStoreProvider namespace={'hisptz-scorecard'} loadingComponent={<FullPageLoader/>}>
        <RecoilRoot>
            <Suspense fallback={<FullPageLoader/>}>
                <div className='main-container'>
                    <Router/>
                </div>
            </Suspense>
        </RecoilRoot>
    </DataStoreProvider>
)

export default MyApp
