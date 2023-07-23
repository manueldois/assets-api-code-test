# Node Express Backend Boilerplate

This is the practical part of an assignment.

## Task

Build an api to store images and videos

## Setup

- have node, npm and docker installed
- copy `.env.sample` to `.env`
- start db with `docker-compose up -d`
- initialize schema with `npm run init-schema`

## Run

- `npm run start`

## Test

- `npm run test`

## Endpoints

- `POST /assets`
  - `Body: multipart form data file(s)`
  - `Response: ({id, name} | {error})[]`
- `GET /asset/:id`
  - `Response: application/octet-stream`

## Approach

Allow user to upload multiple files at once.
Use postgres bytea format to store them.