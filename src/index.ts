import express, { Request, Response } from 'express'
import { productRouter } from './Routers/productsRouter'
import { addressesRouter } from './Routers/addressesRouter'

const app = express()
const port = process.env.PORT || 5000

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())
app.use('/products', productRouter)
app.use('/addresses', addressesRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 