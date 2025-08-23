import { atualizaDocumento, encontrarDocumento, excluirDocumento } from "../db/documentosDb.js";
import { adicionarConexao, encontrarConexao, obterUsuariosDocumento, removerConexao } from "../utils/conexoesDocumentos.js";


function registrarEventosDocumento(socket, io) {
    socket.on("selecionar_documento", async ({ nomeDocumento, nomeUsuario }, devolverTexto) => {

        //pega o socket conectado agora e coloca em uma "sala" com o nome do documento, onde podemos agrupar conexões 
        const documento = await encontrarDocumento(nomeDocumento);
        if (documento) {

            const conexaoEncontrada = encontrarConexao(nomeDocumento, nomeUsuario);
            // irei adicionar conexao apenas se a conexao nao for encontrada, adicionamos a conexao apenas se a pessoa já não estiver no documento 
            if (!conexaoEncontrada) {
                socket.join(nomeDocumento);


                adicionarConexao({ nomeDocumento, nomeUsuario });

                const usuariosNoDocumento = obterUsuariosDocumento(nomeDocumento);

                //usando io.to pois queremos enviar para todos os clientes conectados, inclusive o que esta conectado no momento 
                io.to(nomeDocumento).emit("usuarios_no_documento", usuariosNoDocumento);

                //socket.emit("texto_documento", documento.texto); 
                devolverTexto(documento.texto);
            }else{
               socket.emit("usuario_ja_no_documento");
            }
        };

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
            if (resultado.deletedCount) {
                io.emit("excluir_documento_sucesso", nome);
            };
        });
        //colocando o ouvinte do disconnect apenas para clientes que entraram em uma página específica 
        socket.on("disconnect", () => {
            removerConexao(nomeDocumento, nomeUsuario);
            const usuariosNoDocumento = obterUsuariosDocumento(nomeDocumento);

            //usando io.to pois queremos enviar para todos os clientes conectados, inclusive o que esta conectado no momento 
            io.to(nomeDocumento).emit("usuarios_no_documento", usuariosNoDocumento);
        });

    }
    );




}

export default registrarEventosDocumento; 