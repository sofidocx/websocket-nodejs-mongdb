import { emitirTextoEditor } from "./socket-front-documento.js";


//trecho do html do qual a função quer localizar, no caso, o campo de texto do documento 
const textoEditor = document.getElementById("editor-texto"); 

textoEditor.addEventListener("keyup", () => {
    emitirTextoEditor(textoEditor.value)
    //esse texto irá aparecer no devtools, o console do navegador 
}); 

function atualizaTextoEditor(texto) {
    textoEditor.value = texto; 
}; 

export { atualizaTextoEditor }; 
