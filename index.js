import express from 'express';
import fs from 'fs';
import path from 'path';


const app = express();
const PORT = 3000;

app.use(express.json());
const dbPath = path.join(process.cwd(), 'db.json');

//FUNCION LEER

function readData() {
    try {                                         
        const data = fs.readFileSync(dbPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error al leer la base de datos:", error);
        return { clientes: [], productos: [], carrito: [] };
    }
}
//FUNCION ESCRIBIR

function writeData(data) {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error al escribir en la base de datos:", error);
    }
}
// ENDPOINT PARA MOSTRAR CLIENTES
app.get('/clientes', (req, res) => {
    const data = readData();
    res.json(data.clientes);
});

// ENDPOINT PARA MOSTRAR CARRITO

app.get('/carrito', (req, res) => {
    const data = readData();
    res.json(data.carrito);
});

// ENDPOINT PARA MOSTRAR PRODUCTOS

app.get('/productos', (req, res) => {
    const data = readData();
    res.json(data.productos);
});

app.get('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = readData();
    const cliente = data.clientes.find(c => c.id_cliente === id);
    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).json("Cliente no encontrado");
    }
});

// Endpoint para mostrar un producto por id
app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = readData();
    const producto = data.productos.find(p => p.id === id);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json("Producto no encontrado");
    }
});

// Endpoint para mostrar el carrito de un cliente por id
app.get('/carrito/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = readData();
    const carrito = data.carrito.find(c => c.id_cliente === id);
    if (carrito) {
        res.json(carrito);
    } else {
        res.status(404).json("Carrito no encontrado para este cliente");
    }
});

// Métodos POST 

//endpoint para agregar con post clientes

app.post('/clientes', (req, res) => {
    
    const newCliente = req.body;

    const data = readData();
    const ClienteExistente = data.clientes.find(c => c.id ===newCliente.id_cliente);
    if (ClienteExistente) {
        return res.status(409).json({ error: 'Ya existe un cliente con este ID' });
    }
    data.clientes.push(newCliente);
    writeData(data);

    res.status(201).json(newCliente);  
});


//endpoint para agregar con post productos
 
app.post('/productos', (req, res) => {    
const nuevoProducto = req.body;
const data = readData();
const productoExistente = data.productos.find(p => p.id === nuevoProducto.id);
if (productoExistente) {
    return res.status(409).json({ error: 'Ya existe un producto con este ID' });
}

data.productos.push(nuevoProducto);
writeData(data);

res.status(201).json(nuevoProducto);  
});

//endpoint para agregar con post carrito de compras

app.post('/carrito', (req, res) => {    
const nuevoCarrito = req.body;
const data = readData();
const CarritoExistente = data.carrito.find(p => p.id === nuevoCarrito.id);
const carritoExistente = data.carrito.find(c => c.id === nuevoCarrito.id);
if (carritoExistente) {
    return res.status(409).json({ error: 'Ya existe un carrito con este ID' });
}

data.carrito.push(nuevoCarrito);
writeData(data);

res.status(201).json(nuevoCarrito);  
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});