import { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento } from "./socket-front-documento.js";

const parametros = new URLSearchParams(window.location.search); 
const nomeDocumento = parametros.get("nome"); 

//trecho do html do qual a função quer localizar, no caso, o campo de texto do documento 
const textoEditor = document.getElementById("editor-texto"); 
const tituloDocumento = document.getElementById("titulo-documento");
const botaoExcluir = document.getElementById("excluir-documento"); 
const listaUsuariosConectados = document.getElementById("usuarios-conectados");

tituloDocumento.textContent = nomeDocumento || "Documento sem título"; 

function tratarAutorizacaoSucesso(payloadToken) {
    selecionarDocumento({ nomeDocumento, nomeUsuario: payloadToken.nomeUsuario }); 
};

//manipular o html para exportar a lista de usuários conectados no documento 
function atualizarInterfaceUsuarios(usuariosNoDocumento) {
    //recebe string vazia para facilitar o desenvolvimento 
    listaUsuariosConectados.innerHTML = ""; 
    usuariosNoDocumento.forEach((usuario) => {
        listaUsuariosConectados.innerHTML += `
            <li class="list-group-item">${usuario}</li>
        `;
    })
};



textoEditor.addEventListener("keyup", () => {
        emitirTextoEditor({
            texto: textoEditor.value, 
            nomeDocumento, 
        });
    //esse texto irá aparecer no devtools, o console do navegador 
}); 

function atualizaTextoEditor(texto) {
    textoEditor.value = texto; 
}; 

botaoExcluir.addEventListener("click", () => {
    emitirExcluirDocumento(nomeDocumento); 
});

function alertarERedirecionar (nome) {
    if(nome === nomeDocumento) {
        alert(`Documento ${nome} excluído!`);
        window.location.href = "/";
    };         
};

export { atualizaTextoEditor, alertarERedirecionar, tratarAutorizacaoSucesso, atualizarInterfaceUsuarios }; 
