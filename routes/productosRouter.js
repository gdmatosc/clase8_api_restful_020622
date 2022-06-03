const { Router }=require('express');
const Container=require('../container');
const productos= new Container('productos.txt');

productos.init();

const router=Router();

router.get('/',(req,res)=>{
    res.send(productos.data)
})

router.get('/:id', async (req,res)=>{
    const{id}=req.params;
    const idNumber=Number(id)

    if(isNaN(idNumber)){
        return res.status(400).send({error: 'El parámetro debe ser un número'});
    }
    if(idNumber>productos.data.length){
        return res.status(400).send({error: 'El parámetro debe estar fuera de rango'});
    }

    const producto= await productos.getById(idNumber);

    if(!producto){
        return res.status(400).send({error: `EL producto con el id ${id} no existe`});
    }
    
    return res.send(producto)
})

router.post('/',async(req,res)=>{
    const {titulo,rutaFoto,precio}=req.body;
    if(!titulo || !rutaFoto || !precio){
        return res.status(400).send({error: 'Los datos están incompletos'});
    }
    await productos.save({titulo,rutaFoto,precio});
    await productos.init();

    return res.send({message:'Producto agregado existosamente'})
})

router.put('/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        console.log(id)
        const {field,value}=req.body;
        await productos.editById(Number(id),field,value);
        res.send({message:`El producto con id ${id} se modificó exitosamente`})

    }catch(error){
        throw error
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        console.log(id)
        await productos.deleteById(Number(id));
        res.send({message:`El producto con id ${id} se borró exitosamente`})

    }catch(error){
        throw error
    }
})



module.exports=router;