import {App} from './App'
import ReactDOM from 'react-dom'
import React from 'react'
import {Provider} from '@dhis2/app-runtime'
import "./locales"

const rootElement = document.getElementById('root')

if (process.env.NODE_ENV === 'production') {
    const productionRender = async () => {
        try {
            const manifest = await (await fetch('./manifest.webapp')).json()
            const [major, minor, patch] = (await fetch(`${manifest.activities.dhis.href}/api/system/info.json`)
                .then(res => res.json())
                .then((systemInfo) => systemInfo.version)).split('.') ?? []
            render(manifest.activities.dhis.href, minor, {
                major,
                minor,
                patch
            })
        } catch (error) {
            console.error('Could not read manifest:', error)
            ReactDOM.render(<code>No manifest found</code>, rootElement)
        }
    }

    const render = (baseUrl, apiVersion, serverVersion) =>
        ReactDOM.render(
            <Provider
                config={{
                    baseUrl,
                    apiVersion,
                    serverVersion
                }}
            >
                <App/>
            </Provider>,
            rootElement
        )

    productionRender()
} else {
    ReactDOM.render(
        <Provider
            config={{
                baseUrl: "http://localhost:8081",
                apiVersion: 34,
            }}
        >
            <App/>
        </Provider>,
        rootElement
    )
}





