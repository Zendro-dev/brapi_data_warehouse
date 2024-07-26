# Ready to use BrAPI-Zendro instance

In this repo you can find a way to quickly set up a Zendro instance using the BrAPI schema V2.1.


## Project Requirements:
 * [NodeJS](https://nodejs.org/en/) version 18+ is required.
 * [docker](https://docs.docker.com/get-docker/)
 * [docker compose plugin](https://docs.docker.com/compose/install/#install-compose) if not already included in docker installation

 We strongly recommend to follow [this guide](https://docs.docker.com/engine/install/linux-postinstall/) to use docker without sudo.
 <br/><br/>

* * *
## Recommendations:
  * We strongly recommend you to use Zendro in Linux with or without docker.
  * If you prefer to use Zendro in Windows, we recommend you to use it with Windows Subsystem for Linux (WSL).
  * If you prefer to use Zendro in Mac, we recommend you to use it without docker.

 <br/>

* * *
### Setup

Execute this commands to set up BrAPI-Zendro:

```
$ git clone https://github.com/Zendro-dev/brapi_data_warehouse.git
$ cd brapi_data_warehouse
```

### Start up

Build and start the docker containers via:

```
$ docker compose -f docker-compose-prod.yml up -d --force-recreate --remove-orphans 
```

This command will create docker containers for each Zendro component:
* [Keycloak](https://zendro-dev.github.io/oauth.html): manage users and roles
* [Single Page App (SPA)](https://github.com/Zendro-dev/single-page-app): graphical interface to send CRUD requests to a Zendro GraphQL endpoint
* [API](https://github.com/Zendro-dev/graphql-server): CRUD API that can be accessed through a GraphQL query language


You can check docker containers by:
```
$ docker ps
```

You can check docker logs by:
```
$ docker logs -f <container name>
```

> ***Please wait until logs indicate the app is running on XXXX port to access Zendro services.***

In default config, the running containers will be:

* Keycloak: 
    * http://localhost:8081/auth
    
      * The default keycloak username is *admin* and the password is *admin*.

  ![Keycloak example](images/auth1.png)
  ![Keycloak example](images/auth2.png)

* SPA: 
    * http://localhost:8080

      * The default zendro username is *zendro-admin* and the password is *admin*.

  ![spa example](images/spa1.png)
  ![spa example](images/auth2.png)

* GraphQL API: 
    * http://localhost:3000/graphql

  ![api example](images/graphql.png)


### Configuration (optional)

You can change the configuration via `.env` files:

* **SPA in development mode:** ./single-page-app/.env.development
* **SPA in production mode:** ./single-page-app/.env.production


In case you want Zendro to talk to other databases, you can configure that in `config/data_models_storage_config.json`. Currently a default local database is used.

### Shut down

Execute this command to stop Zendro

```
$ docker compose -f docker-compose-prod.yml down
```

If you want to remove all volumes, execute:

```
$ docker-compose -f docker-compose-prod.yml down -v
```


## Learn more 

Please for more details and documentation about Zendro go to [this link](https://zendro-dev.github.io/).