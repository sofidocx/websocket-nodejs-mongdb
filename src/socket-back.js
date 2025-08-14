import io from "./servidor.js";

io.on("connection", (socket) => {
    console.log("Um cliente se conectou! ID: ", socket.id); //id do cliente que esta se conectando 

    socket.on("selecionar_documento", (nomeDocumento) => {
        socket.join(nomeDocumento); //pega o socket conectado agora e coloca em uma "sala" com o nome do documento, onde podemos agrupar conexões 
    });


    //para cada cliente, iremos escutar os eventos 
    socket.on("texto_editor", ({ texto, nomeDocumento }) => {
        //enviar esse evento para todos os clientes menos para o já conectado nesse socket 
        //socket.broadcast.emit("texto_editor_clientes", texto);
        socket.to(nomeDocumento).emit("texto_editor_clientes", texto); 
    });

});  //escutar evento - on 