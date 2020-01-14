import { Document, model, Schema } from "mongoose";
import bcrypt from 'bcryptjs';
export interface IUsuario extends Document {
    nombre: string;
    edad: number;
    ci: string;
    pass: string;
    encryptPassword(pass: string): Promise<string>;
    validatePassword(pass: string): Promise<boolean>;
}

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        min: 2,
        uppercase: true
    },
    edad: {
        type: Number,
        required: true
    },
    ci: {
        type: String,
        unique: true,
        required: true,
        min: 5
    },
    pass: {
        type: String,
        required: true
    }
});
usuarioSchema.methods.encryptPassword = async ( pass: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(pass,salt);
}
usuarioSchema.methods.validatePassword = async function (pass: string): Promise<boolean> {
    return await bcrypt.compare(pass, this.pass);
}
export default model<IUsuario>('Usiario', usuarioSchema);