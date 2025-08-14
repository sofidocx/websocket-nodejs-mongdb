import io from "./servidor.js";

const documentos = [
    {
        nome: "JavaScript", 
        texto: "texto de javascript..."
    }, 
    {
        nome: "Node", 
        texto: "texto de Node..."
    }, 
    {
        nome: "Socket.io", 
        texto: "texto de Socket.io..."
    }
]

io.on("connection", (socket) => {
    console.log("Um cliente se conectou! ID: ", socket.id); //id do cliente que esta se conectando 
    
    socket.on("selecionar_documento", (nomeDocumento, devolverTexto) => {
        socket.join(nomeDocumento); //pega o socket conectado agora e coloca em uma "sala" com o nome do documento, onde podemos agrupar conexões 
        const documento = encontrarDocumento(nomeDocumento);
        if (documento) {
            //socket.emit("texto_documento", documento.texto); 
            devolverTexto(documento.texto);
        } 
    });


    //para cada cliente, iremos escutar os eventos 
    socket.on("texto_editor", ({ texto, nomeDocumento }) => {
        const documento = encontrarDocumento(nomeDocumento); 

        if(documento) {
            documento.texto = texto; 
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto); 
        }
        //enviar esse evento para todos os clientes menos para o já conectado nesse socket 
        //socket.broadcast.emit("texto_editor_clientes", texto);
    });

});  //escutar evento - on 

function encontrarDocumento(nome) {
    const documento = documentos.find((documento) => {
        return documento.nome === nome; 
    }); 

    return documento; 
}