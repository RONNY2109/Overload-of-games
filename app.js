const path = require('path');
const express = require('express');
const app = express();
// Eliminamos: const API_URL = '...'; 
// Eliminamos: la función async obtenerImagenDeApi() { ... } y su llamada final.

// Middleware, Rutas Estáticas, y Rutas de API... (Todo esto se mantiene)
app.use(express.json()); 
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

// --- RUTAS DE ARCHIVOS ESTÁTICOS (FRONTEND) ---
app.use('/', express.static(path.resolve(__dirname, 'views', 'inicio')));
// ... el resto de tus rutas estáticas...
app.use('/img', express.static(path.resolve(__dirname, 'img'))); 

// --- RUTAS DE API (BACKEND) ---
app.post('/api/users', (req, res) => {
    const { name, email, password } = req.body;
    console.log('Nuevo usuario recibido:', { name, email });
    res.status(201).json(`Usuario ${name} creado exitosamente.`);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

// Eliminamos la llamada final a obtenerImagenDeApi();
