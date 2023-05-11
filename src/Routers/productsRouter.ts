import { Router, Request, Response } from "express"

const products = [{ id: 1, title: 'tomato' }, { id: 2, title: 'orange' }]

export const productRouter = Router()

productRouter.get('/', (req: Request, res: Response) => {
  if (req.query.title) {
    const title = req.query.title.toString();
    res.send(products.filter(p => p.title.indexOf(title) > -1))
  } else {
    res.send(products)
  }
})

productRouter.post('/', (req: Request, res: Response) => {
  const newProduct = { id: +new Date(), title: req.body.title }
  products.push(newProduct)
  res.status(201).json(newProduct)
})

productRouter.get('/:id', (req: Request, res: Response) => {
  const product = products.find(p => p.id === +req.params.id)
  if (product) {
    res.send(product)
  } else {
    res.sendStatus(404)
  }
})

productRouter.put('/:id', (req: Request, res: Response) => {
  const product = products.find(p => p.id === +req.params.id)
  if (product) {
    product.title = req.body.title
    res.send(product)
  } else {
    res.sendStatus(404)
  }
})

productRouter.delete('/:id', (req: Request, res: Response) => {
  products.forEach((p, index) => {
    if (p.id === +req.params.id) {
      products.splice(index, 1)
      res.sendStatus(204)
      return
    }
    res.sendStatus(404)
  })
})