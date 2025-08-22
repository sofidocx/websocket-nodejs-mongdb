import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

function autorizarUsuario(socket, next) {

    const tokenJwt = socket.handshake.auth.token;

    try {
        const payloadToken = jwt.verify(tokenJwt, process.env.SEGREDO_JWT);
        socket.emit("autorizacao_sucesso", payloadToken); //objeto com uma propriedade nome_usuario, que contem o nome do usuário 
        next();
    } catch (erro) {
        next(erro);
    }

};

export default autorizarUsuario; 