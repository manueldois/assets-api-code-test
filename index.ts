'use strict'
import express from 'express'
import cors from 'cors'
import { client } from './getDbClient'

const PORT = 3001
const HOST = '0.0.0.0'

const app = express()
app.use(cors())

app.get('/', (req, res) => {
  res.json({ info: 'App is running!' })
})

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`)
    console.log(`Connected to database "${client.database}"`)
  })
}

export default app