import { Router, Request, Response } from "express"
import { addressRepository } from '../Repositories/addressRepository'

export const addressesRouter = Router()

addressesRouter.get('/', (req: Request, res: Response) => {
  const addresses = addressRepository.getAddresses()
  res.send(addresses)
})

addressesRouter.get('/:id', (req: Request, res: Response) => {
  const address = addressRepository.getAddressById(+req.params.id)
  !!address ? res.send(address) : res.sendStatus(404)
})
