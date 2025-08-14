import { atualizaTextoEditor } from "./documento.js";

const socket = io(); 

function selecionarDocumento(nome) {
    socket.emit("selecionar_documento", nome); 
}


function emitirTextoEditor (dados) {
     socket.emit("texto_editor", dados); 
}; 

socket.on("texto_editor_clientes", (texto) => {
    atualizaTextoEditor(texto); 
     //atualiza o valor do campo de texto no campo do documento 
}); 

export { emitirTextoEditor, selecionarDocumento }; 