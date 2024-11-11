import express from 'express';
import fs from 'fs';
import path from 'path';


const app = express();
const PORT = 3000;

app.use(express.json());

function readData() {
    try {                                         
        const data = fs.readFileSync(dbPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error al leer la base de datos:", error);
        return { clientes: [], productos: [], carrito: [] };
    }
}
function writeData(data) {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error al escribir en la base de datos:", error);
    }
}
app.get('/clientes', (req, res) => {
    const data = readData();
    res.json(data.clientes);
});



app.get('/carrito', (req, res) => {
    const data = readData();
    res.json(data.carrito);
});


app.get('/productos', (req, res) => {
    const data = readData();
    res.json(data.productos);
});