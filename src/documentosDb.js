import { documentosColecao } from "./dbConnect.js";

function encontrarDocumento(nome) {
    const documento = documentosColecao.findOne({
        nome
    }); 

    return documento; 
}

export { encontrarDocumento }; 