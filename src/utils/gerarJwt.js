import jwt from "jsonwebtoken"; 
import dotenv from 'dotenv';

function gerarJwt(payload) {

    const tokenJwt = jwt.sign(payload, process.env.SEGREDO_JWT, {
        expiresIn: "1h"
    }); 

    return tokenJwt; 

}

export default gerarJwt; 