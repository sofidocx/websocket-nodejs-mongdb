import { emitirTextoEditor, selecionarDocumento } from "./socket-front-documento.js";

const parametros = new URLSearchParams(window.location.search); 
const nomeDocumento = parametros.get("nome"); 

//trecho do html do qual a função quer localizar, no caso, o campo de texto do documento 
const textoEditor = document.getElementById("editor-texto"); 
const tituloDocumento = document.getElementById("titulo-documento"); 

tituloDocumento.textContent = nomeDocumento || "Documento sem título"; 

selecionarDocumento(nomeDocumento); 

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

export { atualizaTextoEditor }; 
