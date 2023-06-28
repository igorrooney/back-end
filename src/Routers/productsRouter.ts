import { Router, Request, Response } from "express"
import { body } from 'express-validator';
import { productsRepository } from '../Repositories/productsRepository'
import { inputValidationMiddleware } from "../middlewares/input-validation";


export const productRouter = Router()

const titleValidation = body('title').trim().isLength({ min: 3, max: 30 }).withMessage('Title should be from 3 to 30 symbols');

productRouter.get('/', (req: Request, res: Response) => {
  const title = req.query.title?.toString();
  const products = productsRepository.getProducts(title)
  res.send(products)
})

productRouter.post('/', titleValidation, inputValidationMiddleware, (req: Request, res: Response) => {
  const newProduct = productsRepository.addProduct(Number(new Date()), req.body.title)
  res.status(201).json(newProduct)
})

productRouter.get('/:id', (req: Request, res: Response) => {
  const product = productsRepository.getProductById(+req.params.id)
  !!product ? res.send(product) : res.sendStatus(404)
})

productRouter.put('/:id', titleValidation, inputValidationMiddleware, (req: Request, res: Response) => {
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