import { Router, Request, Response } from "express"
import { productsRepository } from '../Repositories/productsRepository'


export const productRouter = Router()

productRouter.get('/', (req: Request, res: Response) => {
  const title = req.query.title?.toString();
  const products = productsRepository.getProducts(title)
  res.send(products)
})

productRouter.post('/', (req: Request, res: Response) => {
  const newProduct = productsRepository.addProduct(Number(new Date()), req.body.title)
  res.status(201).json(newProduct)
})

productRouter.get('/:id', (req: Request, res: Response) => {
  const product = productsRepository.getProductById(+req.params.id)
  !!product ? res.send(product) : res.sendStatus(404)
})

productRouter.put('/:id', (req: Request, res: Response) => {
  const isUpdated = productsRepository.updateProduct(+req.params.id, req.body.title)
  if (isUpdated) {
    const product = productsRepository.getProductById(+req.params.id)
    res.send(product)
  } else {
    res.sendStatus(404)
  }
})

productRouter.delete('/:id', (req: Request, res: Response) => {
  const isDeleted = productsRepository.deleteProduct(+req.params.id)
  isDeleted ? res.sendStatus(204) : res.sendStatus(404)
})