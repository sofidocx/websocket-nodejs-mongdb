
function regitsrarEventosCadastro (socket, io) {
    socket.on("cadastrar_usuario", (dados) => {
        console.log(dados); 
    });
}

export default regitsrarEventosCadastro; 