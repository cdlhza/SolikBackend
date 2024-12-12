import Products from "../models/products.models.js";
import { unlink } from 'fs';
import path from "path";

//Funcion para obtener todos los productos
export const getProducts = async(req, res)=>{
  try {
    const products = await Products.find({user: req.user.id}).populate('user');
     res.json(products);
   } catch (error) {
     console.log(error);
     res.status(500).json({message: ['Error al obtener los productos']});
   };
};//fin de Obtener Product

//funcion para crear products
export const createProduct = async(req, res)=>{
    try {
        if(!req.file.filename){
            return res.status(500)
            .json({message: ['Error al crear un producto, no se encontro la imagen']})
        }
        const {name, price, year} =req.body;
        const newProduct = new Products({
            name,
            price,
            year,
            image: req.file.filename,
            user :req.user.id
        });
        const saveProduct = await newProduct.save();
        res.json(saveProduct);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: ['Error al crear los productos']});
                }
};

//Funcion parra obtener uun producto por id
export const getProductById = async (req, res)=>{
    try {
        const product = await Products.findById(req.params.id).populate('user');
        if(!product)
            return res.status(404).json({message: ['Producto no encontrado']});
    res.json(product);
    } catch (error) {
        console.log(error);
            return res.status(500)
            .json({message: ['Error al obtener los productos ']});
            }
};

//Funcion para eliminar prodcutos
// Función para eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    // Elimina el producto de la base de datos usando el ID
    const product = await Products.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Obtiene el nombre de la imagen del producto eliminado
    const image = product.image;

    // Genera la ruta completa del archivo de imagen a eliminar
    const ruta = path.resolve('./src/public/img', image);

    // Intenta eliminar el archivo físico de la imagen
    try {
      await fs.unlink(ruta); // Usa fs.promises.unlink
    } catch (err) {
      console.error('Error al eliminar la imagen:', err.message);
      // No terminamos la ejecución si falla, pero registramos el error
    }

    // Devuelve el producto eliminado como respuesta
    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al eliminar un producto' });
  }
};
//Funcion para actualizar un producto

export const editProduct = async (req,res)=>{
  try {
    // Obtiene la imagen actualizada del producto
    if (!req.file.filename) {
      console.log('No se encontró la imagen');
      return res.status(500).json({ message: 'Error al actualizar un producto, no se encontró la imagen' });
    }

    // Construye los datos actualizados del producto
    const data = {
      name: req.body.name,
      price: req.body.price,
      year: req.body.year,
      image: req.file.filename,
      user: req.user.id,
    };

    // Encuentra y actualiza el producto en la base de datos
    const product = await Products.findByIdAndUpdate(req.params.id, data);
    if (!product) 
      return res.status(404).json({ message: 'Producto no encontrado' });
    

    const image = product.image;

    // Genera la ruta para eliminar el archivo físico de la imagen anterior
    const ruta = path.resolve('./src/public/img') + '/' + image;

    // Intenta eliminar el archivo físico de la imagen anterior
    unlink(ruta, (err) => {
      if (err) 
        return res.status(404).json({ message: 'Error al eliminar la imagen del producto actualizado' });
      
    })

    // Retorna el producto actualizado
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error al actualizar un producto' });
  }
}

export const updateProductNoUpdateImage = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      price: req.body.price,
      year: req.body.year,
      image: req.body.image,
      user: req.user.id,
    };

    const product = await Products.findByIdAndUpdate(req.params.id, data);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al actualizar un producto" });
  }
};

// Fin de updateProduct
