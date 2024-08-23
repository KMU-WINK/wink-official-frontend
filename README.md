# Wink Official Frontend

## Tech Stack

**Runtime:**
- ![nodejs](https://img.shields.io/badge/node.js-5FA04E?style=for-the-badge&logo=node.js&logoColor=white)
- ![typescript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

**Frontend:**
- ![nextjs](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)


## Related
[Wink Official Backend](https://github.com/kmu-wink/wink-official-backend)

[Wink Official Deploy](https://github.com/kmu-wink/wink-official-deploy)


## Run Locally

Clone the project

```bash
git clone https://github.com/kmu-wink/wink-official-frontend
```

Go to the project directory

```bash
cd wink-official-frontend
```

Install dependencies

```bash
yarn install
```

Copy the config file

```bash
cp .env.template .env
```

Edit the config file

```bash
vim .env
```

Start the server

```bash
yarn start:dev
```


## Run Locally with Docker

Build the Docker image

```bash
docker build -t wink-official-frontend:local .
```

Or pull the Docker image from Docker Hub

```bash
# master branch
docker pull kmuwink/wink-official-frontend:master

# develop branch
docker pull kmuwink/wink-official-frontend:develop
```

Run the Docker container

```bash
docker run --name (CONTAINER_NAME) -p 3000:3000 -d (IMAGE_NAME)
```


## Authors

- [@daun-up](https://www.github.com/daun-up)
- [@pkm021118](https://www.github.com/pkm021118)
- [@jen454](https://www.github.com/jen454)

