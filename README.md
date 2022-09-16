# Solar CRM Server

A CRM tool to manage Leads, Installs, Services and Stock for a solar retailer.

This repository is for the **Server** and **Database** components. All components can be found at:

- [Server and Database](https://github.com/overthemil/solar-crm-server)
- [Postman API Collection](https://www.postman.com/overthemil/workspace/solar-crm/overview)

## How to start developing

We use VSCode and Docker to allow development of the server without requiring everyone to install node and set up a proper environmet.
Make sure you have Docker installed on your machine as well as the VSCode extension called 'Docker' then run the following command in the VSCode Terminal:

```
docker compose up
```

Go to the 'Run and Debug' tab on the left hand side (`Ctrl`+`Shift`+`D`) and click on the green Run button. The configuration name should be "Docker: Attach to Node". The server will then be running under [http://localhost:3000](http://localhost:3000).

You should see a new terminal under "DEBUG CONSOLE". When you change something in the code, the server should automatically restart.

If you would like to attach a SQL client to the database, you can use the details found in the Dockerfile. Currently the default values are:

- Database name: crm
- User: postgres
- Password: postgres
- Host: localhost
- Port: 9000

## FAQ

> I have changed something in the SQL files under database/sql but Postgres wasn't updated when I run docker compose up

You will need to stop the container and destroy the volume with `docker compose down -v`. If there are only minimal changes, an easier method would be to directly execute the SQL commands by using a client like DataGrip by connecting using the instructions under _How to start developing_.
