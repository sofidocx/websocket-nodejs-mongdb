import { atualizaDocumento, encontrarDocumento, excluirDocumento } from "../db/documentosDb.js";
function registrarEventosDocumento (socket, io) {
    socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
        socket.join(nomeDocumento); //pega o socket conectado agora e coloca em uma "sala" com o nome do documento, onde podemos agrupar conexões 
        const documento = await encontrarDocumento(nomeDocumento);
        if (documento) {
            //socket.emit("texto_documento", documento.texto); 
            devolverTexto(documento.texto);
        };
    });


    //para cada cliente, iremos escutar os eventos 
    socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
        const atualizacao = await atualizaDocumento(nomeDocumento, texto);
        if (atualizacao.modifiedCount) {
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
        };
        //enviar esse evento para todos os clientes menos para o já conectado nesse socket 
        //socket.broadcast.emit("texto_editor_clientes", texto);
    });

    socket.on("excluir_documento", async (nome) => {
        const resultado = await excluirDocumento(nome);
        // se o deletedCount não for zero, entramos no if 
        if(resultado.deletedCount) {
            io.emit("excluir_documento_sucesso", nome);
        };
    });
}

export default registrarEventosDocumento; 