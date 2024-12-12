import mongoose from  'mongoose';

export const connectDB = async ()=>{
  
        const url = process.env.MONGODB_URL;
          // await mongoose.connect('mongodb://127.0.0.1/sistema');
       await mongoose.connect(url)
       .then(()=>{
        console.log('Base de datos conetada hola')
       })
    .catch ((err)=>{
        console.log(error);
    })
}