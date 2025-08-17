import { inserirLinkDocumento } from "./index.js";

const socket = io(); 

//pedir todos os documentos do banco de dados 
socket.emit("obter_documento", (documentos) => {
    documentos.forEach((documento) => {
        inserirLinkDocumento(documento.nome); 
    });
}); 

