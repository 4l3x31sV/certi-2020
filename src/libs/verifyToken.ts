import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
export interface Ipayload {
    _id: string;
    iat: number;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('token');
    if(!token) return res.status(401).json("Acceso denegado");

    const payload = jwt.verify(token, 'TEST') as Ipayload;
    console.log(payload);
    next();
}