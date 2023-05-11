import { Router, Request, Response } from "express"

const addresses = [{ id: 1, value: 'Street Lane' }, { id: 2, value: 'Lidgett Lane' }]

export const addressesRouter = Router()

addressesRouter.get('/', (req: Request, res: Response) => {
  res.send(addresses)
})

addressesRouter.get('/:id', (req: Request, res: Response) => {
  const address = addresses.find(p => p.id === +req.params.id)
  if (address) {
    res.send(address)
  } else {
    res.sendStatus(404)
  }

})
