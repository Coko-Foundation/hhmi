## Development

To bring the application up for development, simply run `docker-compose up` and everything should be running.

You can override the default environment variables by declaring them in a `.env` file at the root of the project.

## Production

### Server
##### Preparation

* Make sure [these dependencies](https://gitlab.coko.foundation/hhmi/hhmi/-/blob/master/packages/server/Dockerfile-server-deploy#L6-9) exist in your OS, so that node modules can build successfully 
* Make sure [these environment variables](https://gitlab.coko.foundation/hhmi/hhmi/-/blob/master/docker-compose.deploy.yml#L16-34) are set in a `.env` file in the root of the repo
* I am assuming you already have a postgres db and an S3 instance set up, so you'd only need the credentials at this point

##### Running the server
This script should suffice I believe
```sh
source .env
cd packages/server
yarn install --frozen-lockfile --production
sh scripts/setupDevServer.sh
node startServer.js
```

##### Check that the server is running
You should see output from the above, telling you that the migrations that haven't run yet did run now, the seed scripts completely successfully and that the server is running.  

You can also try making a call to the `/healthcheck` endpoint, which should return a 200 response.

### Client

##### Preparation
* Set [these environment variables](https://gitlab.coko.foundation/hhmi/hhmi/-/blob/master/packages/client/Dockerfile-client-deploy#L17-20), as well as the `SERVER_URL`

##### Build the client
```sh
source .env
yarn install --frozen-lockfile --production
cd packages/client
yarn coko-client-build
```

##### Run the client
After the build has finished, you should have a `_build` folder.  
You can serve that with eg. `npx serve -p 8080 --single ./_build`, or by setting up nginx, or whatever other server you prefer.  
It's just a static bundle at this point, how it's served shouldn't make a difference.

## Testing a production build locally

First run `docker-compose -f docker-compose.production-local.yml up`. This will bring up the db and minio server that the production compose file takes for granted. Wait until the bucket has been successfully created, and then you can follow the instructions from the "Production" section.

## Deploying without docker / docker compose

You can simply use our server and client `Dockerfile-production` files in combination with the `docker-compose.production.yml` file as an instruction manual for how to bring the app up.

For the client specifically, we use the `serve` library to bring the app up, but there's no reason why you shouldn't use your favourite server (eg. nginx) to serve the static build.
