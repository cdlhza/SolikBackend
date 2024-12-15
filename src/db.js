import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const url =
      "mongodb+srv://Daniel:36442812@solik.7tdvw.mongodb.net/?retryWrites=true&w=majority&appName=Solik";
    //await mongoose.connect('mongodb://127.0.0.1/sistema');
    await mongoose.connect(url);
    console.log("Base de datos conetada con exito");
  } catch (error) {
    console.log(error);
  }
};
