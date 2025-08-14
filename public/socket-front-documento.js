import { atualizaTextoEditor } from "./documento.js";

const socket = io(); 

function emitirTextoEditor (texto) {
     socket.emit("texto_editor", texto ); 
}; 

socket.on("texto_editor_clientes", (texto) => {
    atualizaTextoEditor(texto); 
     //atualiza o valor do campo de texto no campo do documento 
}); 

export { emitirTextoEditor }; 