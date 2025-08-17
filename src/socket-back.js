import { adicionarDocumento, atualizaDocumento, encontrarDocumento, obterDocumentos } from "./documentosDb.js";
import io from "./servidor.js";

io.on("connection", (socket) => {
    console.log("Um cliente se conectou! ID: ", socket.id); //id do cliente que esta se conectando 

    socket.on("obter_documento", async (devolverDocumentos) => {
        //operação do banco de dados para retornar todos os documentos 
        const documentos = await obterDocumentos();

        devolverDocumentos(documentos);
    });

    socket.on("adicionar_documento", async (nome) => {
        //findOne = null -> vai retornar o valor nulo, se for nulo, o documento não existe, diferente disso, ele vai ser diferente de nulo 
        const documentoExiste = (await encontrarDocumento(nome)) !== null;

        if (documentoExiste) {
            socket.emit("documento_existente", nome);

        } else {
            const resultado = await adicionarDocumento(nome);
            if (resultado.acknowledged) {
                io.emit("adicionar_documento_interface", nome);
            };
        };
    });

    socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
        socket.join(nomeDocumento); //pega o socket conectado agora e coloca em uma "sala" com o nome do documento, onde podemos agrupar conexões 
        const documento = await encontrarDocumento(nomeDocumento);
        if (documento) {
            //socket.emit("texto_documento", documento.texto); 
            devolverTexto(documento.texto);
        }
    });


    //para cada cliente, iremos escutar os eventos 
    socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
        const atualizacao = await atualizaDocumento(nomeDocumento, texto);
        if (atualizacao.modifiedCount) {
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
        }
        //enviar esse evento para todos os clientes menos para o já conectado nesse socket 
        //socket.broadcast.emit("texto_editor_clientes", texto);
    });

});  //escutar evento - on 
