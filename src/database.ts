import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/universidad',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then( db => {
    console.log('conexion establecida.')
})
.catch(err => {
    console.log(err);
})