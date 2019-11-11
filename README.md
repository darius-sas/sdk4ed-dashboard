# SDK4ED Dashboard

Welcome to the SDK4ED Dashboard repository. The dashboard is currently based on a free online template available at <https://mdbootstrap.com>.

The dashboard relies on [React](https://reactjs.org/) for building dynamic web pages with shareable elements among different pages.

Charts and plots will be visualized with [highcharts](https://www.highcharts.com/), which provides support for React.

Documentation for these frameworks can be found directly on their site. The components defined in the project are documented through JSDoc.

All of these libraries are provided under MIT License and thus free to use in the SDK4ED project.

# Repository organization
Directories and files:

- `.` contains the license, the README, and some project-level configuration files used by NodeJS.
- `node_modules` after installing them through `nvm`, it will contain the modules needed to deploy the application.
- `src` Contains the source code of the dashboard organized as follows:
    - `.` The root contains the main application files.
    - `components` contains the React components and pages of the dashboard.
    - `assets` contains artefacts like icons and images that are used within the components.
- `public` contains the files that are actually visible to everyone with access on the server.

# SDK4ED APIs
See [here](./api-design.md) for the API design.

# Installation instruction (For developers)
To deplot the application you have to first install all the dependencies used. Next you can start the server and a web page should open on your favorite browser.
```
npm install
npm start
```

To fully be able to test the application you will need to run the dummy data server:
```
nodejs ./src/DummyDataServer.js
```
Now you can navigate to the TD dashboard.


In case you are on Linux and you have issue with seeing the updates you make in your webpage, the run
```
./file-limit.sh
```
from the main project directory.

# LICENSE
TODO