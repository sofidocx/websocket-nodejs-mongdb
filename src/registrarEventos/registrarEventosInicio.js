import { adicionarDocumento, encontrarDocumento, obterDocumentos } from "../db/documentosDb.js";

function registrarEventosInicio (socket, io) {
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

}

export default registrarEventosInicio; 