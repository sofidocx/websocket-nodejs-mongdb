
import registrarEventosCadastro from "./registrarEventos/registrarEventosCadastro.js";
import registrarEventosDocumento from "./registrarEventos/registrarEventosDocumento.js";
import registrarEventosInicio from "./registrarEventos/registrarEventosInicio.js";
import io from "./servidor.js";

io.on("connection", (socket) => {
    console.log("Um cliente se conectou! ID: ", socket.id); //id do cliente que esta se conectando 

    registrarEventosInicio(socket, io);
    registrarEventosDocumento(socket,io); 
    registrarEventosCadastro(socket,io); 

});  //escutar evento - on 
