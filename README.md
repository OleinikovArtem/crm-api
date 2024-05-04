## Contents of the documentation

1. [Install dependencies](#install-dependencies)
2. [Database](#database)
3. [Docker](#docker)
4. [Errors and Solutions](#errors-and-solions)

---

## Install dependencies

```cmd
npm install
```

## Docker

Run docker container (Don't forget to run the docker application first)

for create bucket for minio files:

```cmd
docker volume create minio-volume 
```

everything will be cleaned up as first start:

```cmd
docker-compose up --build -V 
```

for develop mode:

```cmd
docker-compose up
```

### First start locale (Manual way to init the database)

Open docer container

```cmd
  docker exec -it <container_name_or_id> /bin/sh
```

How to get containers ID or name:

```cmd
  docker ps
```

Run migration for creation database (inside docker container):

```cmd
  prisma migrate dev --schema=./src/database/schema.prisma
```

Then open <http://localhost:9001> - there is admin panel for local file-bucket
`MINIO_ROOT_USER="minioadmin"
MINIO_ROOT_PASSWORD="minioadmin"`

**Then** choose the AccessKeys => create Access keys and save it to `.env` file
then restart your app `docker-compose down` -> `docker-compose up`

And now you will be able to see the image that you uploaded to the bucket.

---

## Database

To create a database migration, you need to run the database and then change this:

```
POSTGRES_HOST="postgres"
POSTGRES_PORT="5432"
```

to this:

```
POSTGRES_HOST="localhost"
POSTGRES_PORT="5433" - it should be (left value) from postgers.ports in the docker-compose.yml file
```

then

```
npx prisma migration --name MIGRATION-NAME
```

---

## ERRORS AND SOLUTIONS

### Docker

run DEV:

```cmd
docker-compose up
```

run PROD:

```cmd
docker-compose -f docker-compose.prod.yml up
```

If you see this ERROR message when you're trying to start the project:

```
Error response from daemon: Ports are not available: exposing port TCP 0.0.0.0:5432 -> 0.0.0.0:0: listen tcp 0.0.0.0:5432: bind: address already in use
```

you need increase the port number in `docker-compose.yml`, at the postgres service section

```yaml
  postgres:
    image: postgres
    restart: always
    # ... something ...
    ports:
      - '5432:5432' # HERE examples (5433:5432' | 5434:5432' | 5435:5432')
    # ... something ...

```

---
