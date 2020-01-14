import {Response, Request} from 'express';
export function indexInicio(req: Request, res: Response) {
    return res.json('Inicio servicio');
}