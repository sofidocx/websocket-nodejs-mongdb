import io from "./servidor.js";

io.on("connection", (socket) => {
    console.log("Um cliente se conectou! ID: ", socket.id); //id do cliente que esta se conectando 
//para cada cliente, iremos escutar os eventos 
    socket.on("texto_editor", (texto) => {
        //enviar esse evento para todos os clientes menos para o já conectado nesse socket 
        socket.broadcast.emit("texto_editor_clientes", texto);
    }); 
});  //escutar evento - on 