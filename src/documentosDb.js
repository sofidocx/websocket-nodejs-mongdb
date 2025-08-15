import { documentosColecao } from "./dbConnect.js";

function encontrarDocumento(nome) {
    const documento = documentosColecao.findOne({
        nome
    });

    return documento;
};

function atualizaDocumento(nome, texto) {
    //metodo especifico de coleção do mongodb para atualizar um documento 
    const atualizacao = documentosColecao.updateOne({
        nome
    }, {
        //redefini o texto que também recebemos como parametro, passamos nome, e passamos uma propriedade como texto, que é o que estamos alterando 
        $set: {
            texto
        }
    });

    return atualizacao;

};

export { encontrarDocumento, atualizaDocumento }; 