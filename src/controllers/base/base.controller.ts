import { NextFunction, Request, Response } from 'express'

import * as BaseService from '../../services/base/base.service'

//Base: create base controller

class BaseController {
  service = BaseService

  protected getIdFromRequest = (req: Request) => Number(req.params.id)

  protected sendNoIdResponse = (res) =>
    res.status(404).send({ message: 'No item with such id' })

  create = async (req: Request, res: Response) => {
    try {
      const data = req.body
      const Base = await BaseService.addBase(data)

      res.json(Base)
    } catch (e) {
      res.status(404).send({ message: e.message })
    }
  }

  getSingle = async (req: Request, res: Response) => {
    try {
      const id = this.getIdFromRequest(req)
      const Base = await BaseService.getSingleBase(id)

      if (!Base) this.sendNoIdResponse(res)

      res.json(Base)
    } catch (e) {
      res.status(404).send({ message: "Couldn't find a Base" })
    }
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const Bases = await BaseService.getAllBases()

      res.json(Bases)
    } catch (e) {
      res.status(404).send({ message: "Couldn't get Bases" })
    }
  }

  put = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body
      const id = this.getIdFromRequest(req)

      const Base = await BaseService.putBase(id, data)
      if (!Base) this.sendNoIdResponse(res)

      res.status(200).send(Base)
    } catch (e) {
      res.status(404).send({ message: e.message })
    }
  }

  patch = async (req: Request, res: Response) => {
    try {
      const data = req.body
      const id = this.getIdFromRequest(req)

      const Base = await BaseService.patchBase(id, data)
      if (!Base) this.sendNoIdResponse(res)

      res.status(200).send(Base)
    } catch (e) {
      res.status(404).send({ message: "Couldn't patch a Base" })
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const id = this.getIdFromRequest(req)
      const result = await BaseService.deleteBase(id)

      if (!result.affected) this.sendNoIdResponse(res)

      res.status(200).send({ message: 'deleted successfully' })
    } catch (e) {
      res.status(404).send({ message: "Couldn't delete a Base" })
    }
  }
}

export default new BaseController()
