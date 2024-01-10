import {Request, Response} from 'express'

const routeNotFound = (_req: Request, res: Response) => res.sendStatus(404);

export default routeNotFound;