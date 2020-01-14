import express, {Application} from 'express';
import morgan from 'morgan';
import IndexRoutes from './routes/index.routes';
import UsuariosRoutes from './routes/usuario.routes';
export class App {
    private app: Application;
    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set('port', this.port || process.env.port || 3000);

    }
    public routes() {
        this.app.use(IndexRoutes);
        this.app.use('/usuarios',UsuariosRoutes);
    }
    private middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json())
    }
    public async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Servidor inicializado 2');
    }
}

/*
$gt >
$gte >=
$lt <
$lte <=
*/