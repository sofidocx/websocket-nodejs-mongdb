const socket = io(); 

//trecho do html do qual a função quer localizar, no caso, o campo de texto do documento 
const textoEditor = document.getElementById("editor-texto"); 

textoEditor.addEventListener("keyup", () => {
    socket.emit("texto_editor", textoEditor.value); 
    //esse texto irá aparecer no devtools, o console do navegador 
}); 

socket.on("texto_editor_clientes", (texto) => {
    textoEditor.value = texto; //atualiza o valor do campo de texto no campo do documento 
}); 