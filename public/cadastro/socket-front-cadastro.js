const socket = io(); 

function emitirCadastrarUsuario (dados) {
    socket.emit("cadastrar_usuario", dados);
};

socket.on("cadastro_sucesso", () => alert ("Cadastro realizado com sucesso")); 
socket.on("cadastro_erro", () => alert ("Erro no cadastro. Tente novamente")); 
socket.on("usuario_ja_existente", () => alaert ("Erro no cadastro. Usuário já existente!")); 
export { emitirCadastrarUsuario };