import express, { Request, Response } from 'express'

const app = express()
const port = process.env.PORT || 5000

const products = [{ id: 1, title: 'tomato' }, { id: 2, title: 'orange' }]
const addresses = [{ id: 1, value: 'Street Lane' }, { id: 2, value: 'Lidgett Lane' }]

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

app.get('/products', (req: Request, res: Response) => {
  if (req.query.title) {
    const title = req.query.title.toString();
    res.send(products.filter(p => p.title.indexOf(title) > -1))
  } else {
    res.send(products)
  }
})

app.post('/products', (req: Request, res: Response) => {
  const newProduct = { id: +new Date(), title: req.body.title }
  products.push(newProduct)
  res.status(201).json(newProduct)
})

app.get('/products/:id', (req: Request, res: Response) => {
  const product = products.find(p => p.id === +req.params.id)
  if (product) {
    res.send(product)
  } else {
    res.sendStatus(404)
  }
})

app.put('/products/:id', (req: Request, res: Response) => {
  const product = products.find(p => p.id === +req.params.id)
  if (product) {
    product.title = req.body.title
    res.send(product)
  } else {
    res.sendStatus(404)
  }
})

app.delete('/products/:id', (req: Request, res: Response) => {
  products.forEach((p, index) => {
    if (p.id === +req.params.id) {
      products.splice(index, 1)
      res.sendStatus(204)
      return
    }
    res.sendStatus(404)
  })
})

app.get('/addresses', (req: Request, res: Response) => {
  res.send(addresses)
})

app.get('/addresses/:id', (req: Request, res: Response) => {
  const address = addresses.find(p => p.id === +req.params.id)
  if (address) {
    res.send(address)
  } else {
    res.sendStatus(404)
  }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 