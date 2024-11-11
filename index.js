import express from 'express';
import fs from 'fs';
import path from 'path';


const app = express();
const PORT = 3000;

app.use(express.json());

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