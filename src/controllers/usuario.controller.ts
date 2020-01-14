import { Request, Response } from 'express';
import Usuario, { IUsuario } from './../models/usuario.model';
import jwt from 'jsonwebtoken';
export async function crearUsuario(req: Request, res: Response) {
    console.log(req.body);
    let usuario: IUsuario = Object.assign(req.body);
    let usuarioG: IUsuario = new Usuario({
        nombre: usuario.nombre,
        edad: usuario.edad,
        ci: usuario.ci,
        pass: usuario.pass
    });
    usuarioG.pass = await usuarioG.encryptPassword(usuario.pass);
    const saveUsuario = await usuarioG.save();
    return res.json(saveUsuario);

}
export async function login(req: Request, res: Response) {
    let  user: IUsuario = Object.assign(req.body);
    const usuarioEncontrado = await Usuario.findOne({nombre:user.nombre});
    if(!usuarioEncontrado) return res.status(404).json("Usuario no encontrado");
    const correctPass: boolean = await usuarioEncontrado.validatePassword(user.pass);
    if(!correctPass) return res.status(404).json("Password incorrecto");

    let token: string = jwt.sign(
        {
            id: usuarioEncontrado._id
        }, "TEST", {
            expiresIn: 60*60*24
        }
    )

    
    return res.header('token', token).json(usuarioEncontrado);
}
export function listUsuarios(req: Request, res: Response) {
    Usuario.find().exec()
    .then(datos => {
        res.json(datos);
    }).catch(err => {
        res.status(404).json(err);
    })
}
export function updateUser(req: Request, res: Response) {
    Usuario.findByIdAndUpdate({ _id : req.body._id},{
        nombre: req.body.nombre,
        edad: req.body.edad,
        ci: req.body.ci,
        pass:req.body.pass
    }).then( () => {
        res.json("Actualziacion Correcta")
    }).catch(err => {
        res.status(400).json(err);
    })
}