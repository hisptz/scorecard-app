import {Provider} from '@dhis2/app-runtime'
import {App} from './App'
import ReactDOM from 'react-dom'
import React from 'react'
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
                baseUrl: process.env.REACT_APP_BASE_URL ?? "http://localhost:8080",
                apiVersion: process.env.REACT_APP_API_VERSION ?? 34,
                serverVersion: {
                    major: process.env.REACT_APP_SERVER_VERSION_MAJOR ?? 2,
                    minor: process.env.REACT_APP_SERVER_VERSION_MINOR ?? 34,
                    patch: process.env.REACT_APP_SERVER_VERSION_PATCH ?? 3
                }
            }}
        >
            <App/>
        </Provider>,
        rootElement
    )
}





