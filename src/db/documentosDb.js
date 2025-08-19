import { documentosColecao } from "./dbConnect.js";

function obterDocumentos () {

    //retorna cursor - queremos transformar em uma array
    const documentos = documentosColecao.find().toArray(); 
    return documentos; 
}; 

function adicionarDocumento(nome) {

    const resultado = documentosColecao.insertOne({
        nome, 
        texto : ""
    }); 

    return resultado; 

}

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

function excluirDocumento (nome) {
    const resultado = documentosColecao.deleteOne({
        nome
    }); 

    return resultado; 
}

export { encontrarDocumento, atualizaDocumento, obterDocumentos, adicionarDocumento, excluirDocumento }; 