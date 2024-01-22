# INTERACTIVE SCORECARD
[![@scorecard/app](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/count/9ps7gr/develop&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/9ps7gr/runs)
[![@scorecard/app](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/9ps7gr/develop&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/9ps7gr/runs)
[![dhis2: tests](https://github.com/hisptz/action-tracker-standalone/actions/workflows/tests.yml/badge.svg?branch=develop)](https://github.com/hisptz/action-tracker-standalone/actions/workflows/tests.yml)

1.  [Introduction](#Introduction)

2.  [Admin Guide](#Admin)
3.  [Developer Guide](#Developer)
    - [Project Structure](#project-structure)
    - [Pre-requisites](#pre-requisites)
    - [Getting started](#started)
    - [Running the app](#running)
    - [Building](#building)
    - [Testing](#testing)
    - [Deployment](#deployment)

## 1. <a name='Introduction'></a>Introduction

The scorecard app is a performance monitoring tool that allows users to track the comparative performance of indicators over time and against different organization units and/or levels. With easy to use colour coded outputs, the scorecard is meant to allow users to make data-driven decisions using the performance outlined on via the scorecard app’s outputs.
The Scorecard is an application developed to operate and installed in DHIS 2 instance taking advantage of existing indicators for configurations to track. The Scorecard app must be installed in the DHIS 2 system by the user with administrative privilege and configure data entry and report based on in-country needs. Once installed, any user who has access to that particular instance of DHIS 2 will be able to create scorecards, view existing scorecards or edit scorecards developed by other users provided that they have shared that scorecard (privilege to read and write) with the logged-on user.

## 2. <a name='Admin'></a>Admin Guide

### <a name='Installations'></a>Installations

Download the latest version of the App via

```
https://github.com/hisptz/@scorecard/app/releases
```

Go to your DHIS2 instance with the organisation units already in place,then install the downloaded app via App Management

## 3. <a name='Developer'></a>Developer Guide
## <a name="project-structure">Project Structure<a/>

The project is a yarn monorepo consisting of 2 workspaces: 
 - Shared workspace: contains all reusable implementations
 - Apps workspace: contains the scorecard and scorecard widget apps

### Shared
Contains the sub-modules:
 - Components: Shared React components
 - Constants: Shared constants
 - Hooks: Shared React hooks
 - Models: Shared class models
 - Services: Shared services 
 - State: Shared state
 - Utils: Shared utility functions

### Apps
#### Scorecard App
Contains the actual scorecard app implementation. It is divided into 3 modules:
 - Scorecard list: Lists all accessible scorecards
 - Scorecard view: Displays the scorecard itself and contains organisation and period filters as well as other viewing options
 - Scorecard configuration: Allows configuration of the scorecard. Divided into 5 steps

        

## <a name="pre-requisites" >Pre-requisites</a>

This project was bootstrapped with [DHIS2 Application Platform](https://github.com/dhis2/app-platform). To start
development you require:

- Node - 16.x or later
- Yarn - 1.22.19 or later

## <a name="started" >Getting started</a>

To get started with the project, clone the project into your local environment

```shell
git clone https://github.com/hisptz/bottleneck-analysis-app
```

Then open your project and run:

```shell
 yarn install
```

## <a name="running" >Running the app</a>

To start the main app in development mode run:

### `yarn start:app`
or 
### `yarn start:app-proxy` 
To start the app in proxy mode.

To start the widget in development mode run:
### `yarn start:widget`

##

These commands run the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `.env` file Usage

To avoid having to specify the server URL everytime you start the app, you can duplicate the `.env.example` file and
rename it to `.env`. Then change the `REACT_APP_DHIS2_BASE_URL` variable to the URL of your DHIS2 instances

#### CORS issues

When running in development mode, you may encounter CORS error. To fix this issue, proxy your DHIS2 instance by
appending `--proxy http://link-to-dhis2-instance` to the start command. This will start a local proxy server
at `http://localhost:8080` (It may change ports if 8080 is busy)
. You can then point your app to `http://localhost:8080`

## <a name="building" >Building</a>

To build your main app ready for production run:

### `yarn build:app`
and to build your widget run: 

### `yarn build:widget`

These commands build the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
A deployable `.zip` file can be found in `build/bundle`!

See the section about [building](https://platform.dhis2.nu/#/scripts/build) for more information.

## <a name="testing" >Testing</a>

In the project directory, you can run:

### `yarn workspace app test`

Launches the test runner and runs all available tests found in the main app's `/src`.<br />

See the section about [running tests](https://platform.dhis2.nu/#/scripts/test) for more information.

To run end-to-end testing, use:

### `yarn e2e:open:app`

To open the cypress test runner or use:

### `yarn e2e:stub`

To run the tests without opening the runner in stub mode

or 
### `yarn e2e:capture`

To run the tests in capture mode.

## <a name="deployment">Deployment</a>

### `yarn deploy:app`

Deploys the built app in the `build` folder to a running DHIS2 instance.<br />
This command will prompt you to enter a server URL as well as the username and password of a DHIS2 user with the App
Management authority.<br/>
You must run `yarn build:app` before running `yarn deploy`.<br />

See the section about [deploying](https://platform.dhis2.nu/#/scripts/deploy) for more information.
