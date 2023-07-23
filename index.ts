'use strict'
import express from 'express'
import cors from 'cors'
import { client } from './getDbClient'
import fileUpload from 'express-fileupload'
import asyncHandler from "express-async-handler"
import { getAssetById, postAsset } from './controllers/assets'

const PORT = 3001
const HOST = '0.0.0.0'

const app = express()
app.use(cors())
app.use(fileUpload())

app.get('/', (req, res) => {
  res.json({ info: 'App is running!' })
})

app.post('/assets', asyncHandler(postAsset));

app.get('/assets/:id', asyncHandler(getAssetById))

if (process.env.NODE_ENV !== "test") {
  client.connect().then(() => {
    console.log(`Connected to database "${client.database}"`)

    app.listen(PORT, HOST, () => {
      console.log(`Running on http://${HOST}:${PORT}`)
    })
  }).catch((err) => {
    console.error(`Could not connect to database "${client.database}"`)
    console.error(err)
    process.exit(1)
  })
}

export default app