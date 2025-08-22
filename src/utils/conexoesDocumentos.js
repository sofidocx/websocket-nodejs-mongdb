
//lista = varios registros que possuem as propriedades nomeDocumento e nomeUsuario
const conexoesDocumentos = []; 

function adicionarConexao(conexao) {
    conexoesDocumentos.push(conexao);
};

function obterUsuariosDocumento(nomeDocumento) {
    return conexoesDocumentos
        .filter((conexao) => conexao.nomeDocumento === nomeDocumento)
        .map((conexao) => conexao.nomeUsuario);
};

export { adicionarConexao, obterUsuariosDocumento}; 