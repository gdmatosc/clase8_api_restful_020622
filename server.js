const express=require('express');
const productosRouter=require('./routes/productosRouter');

const app=express();
const PORT=8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/static',express.static(__dirname+'/public'))

app.use('/productos',productosRouter);

app.get('/',(req,res)=>{
    res.send({message: 'Server running ok'})
})

app.listen(PORT,()=>{
    console.log('Listening on port: '+PORT);
})