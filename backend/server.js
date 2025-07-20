const http = require("http"); //importa el modulo HTTP nativo de nodejs

const server = http.createServer((req, res) => {
    //Obtiene el método (GET, POST, etc.) y la URL solicitada
    const method = req.method;
    const url = req.url;

    //imprime metodo y url para debug
    console.log("metodo: ", method);
    console.log("url: ", url);

    //  Maneja solicitudes OPTIONS (CORS preflight)
    if(method === 'OPTIONS'){
        res.writeHead(204, {
            'access-control-allow-origin' : '*',
            'access-control-allow-methods' : 'POST, GET, PUT, PATCH, DELETE, OPTIONS',
            'access-control-allow-headers' : 'content-type',
        });
        res.end(); //finaliza la respuesta
        return; //evita seguir procesando

    }

    // GET
    if(req.method === 'GET' && req.url === "/"){
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        });

        //objeto de respuesta
        const data = {
        "saludo" : "Hola desde mi servidor te envio un JSON",
        "Ciudad" : "La paz"
    }
    res.end(JSON.stringify(data)); // Envia JSON

    // POST : resgistro
    } else if(req.method === 'POST' && req.url === "/registro") {
        let body = "";
        // Escucha datos del cuerpo (body)
        req.on('data', chunk => {
            body = chunk.toString();
        })
        
        //cuando termina de recibir datos
        req.on('end', () => {
            try {
                const data = JSON.parse(body); // Intenta parsear JSON
                console.log("Datos recibidos [post] ", data);
                res.writeHead(201, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                });
                res.end(JSON.stringify({mensaje: "Se creo correctamente"}))
            } catch (error) {
                console.error("JSON inválido:", err);
                res.writeHead(400, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                });
                res.end(JSON.stringify({ error: "JSON inválido" }));
            }
        });
        return; // evita seguir procesando
    
    // PUT /actualizar
    } else if(req.method === 'PUT' && req.url === "/actualizar"){
        let body = "";
        req.on('data', chunk => {
            body = chunk.toString();
        })
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                console.log("Datos recibidos [put] ", data);
                res.writeHead(201, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                });
                res.end(JSON.stringify({mensaje: "Se actualizo correctamente la data"}))
            } catch (error) {
                console.error("JSON inválido:", err);
                res.writeHead(400, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                });
                res.end(JSON.stringify({ error: "JSON inválido" }));
            }
        });
    

    // eliminar, DELETE
    }else if (req.method === 'DELETE' && req.url === "/eliminar"){
        //si se puede eliminar algo
        console.log("Solicitud DELETE recibida");
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        });
        res.end(JSON.stringify({mensaje: "se elimino correctamente"}));
    
    // actualiza , PATCH
    }else if (req.method === 'PATCH' && req.url === "/actualiza"){
        //actualizar un dato, una variable
        let body = "";
        req.on('data', chunk => {
            body = chunk.toString();
        })
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                console.log("Datos recibidos [PATCH] ", data);
                res.writeHead(201, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                });
                res.end(JSON.stringify({mensaje: "Se actualizo el dato correctamente"}))
            } catch (error) {
                console.error("JSON inválido:", err);
                res.writeHead(400, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                });
                res.end(JSON.stringify({ error: "JSON inválido" }));
            }
        });
    }else {
        // Si ninguna ruta coincide: error 404
        console.warn("Error de metodo u URL");
        res.writeHead(404, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        });
        res.end(JSON.stringify({ error: "Método o URL no válido" }));
    }
});

server.listen(3000, () => { //  Arranca el servidor en puerto 3000
    console.log("Servidor conectado en el puerto 3000");
});
