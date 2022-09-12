# Solar CRM Server

A CRM tool to manage Leads, Installs, Services and Stock for a solar retailer.

This repository is for the **Server** component. All components can be found at:

- [Server](https://github.com/overthemil/solar-crm-server)

## How to start developing

We use VSCode and Docker to allow development of the server without requiring everyone to install node and set up a proper environmet.
Make sure you have Docker installed on your machine as well as the VSCode extension called 'Docker' then run the following command in the VSCode Terminal:

```
docker compose up
```

Go to the 'Run and Debug' tab on the left hand side (`Ctrl`+`Shift`+`D`) and click on the green Run button. The configuration name should be "Docker: Attach to Node". The server will then be running under [http://localhost:3000](http://localhost:3000).

You should see a new terminal under "DEBUG CONSOLE". When you change something in the code, the server should automatically restart.
