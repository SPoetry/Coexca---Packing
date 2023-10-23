const library = require('../library');
const service = require('./service');
const jwt = require("jwt-simple");
const moment = require("moment");
const config = require("../config");
const njwt = require('njwt')


exports.login = async function(req, res){
    const {user, password} = req.body;
    
    const sqlQuery = "SELECT * FROM usuario WHERE usuid = '" + user + "' LIMIT 1;";
    const resultQuery = await library.stringifyAndParseQuery(await library.queryPersonalizated(sqlQuery));

    if(resultQuery.length != 0){
        const passwordInDataBase = resultQuery[0].pws;

        if (password.localeCompare(passwordInDataBase) == 0){
            
            res.send({ status: "200", token: service.createToken(user), userName: resultQuery[0].usunom });
        }else{            
            res.send({ status: "401", msg: "Al parecer las credenciales no coinciden"});
        }
    }else{
        res.send({ status: "401",  msg: "Al parecer las credenciales no existen"});
    }
}

exports.ensureAuthenticated = function (req, res) {
    if (!req.headers.authorization) {
        return res
        .status(403)
        .send({ message: "Tu petición no tiene cabecera de autorización" });
    }

    const token = req.headers.authorization.split(" ")[1];
    let itsVerify = false;
    
    try {
        njwt.verify(token, config.TOKEN_SECRET);
        itsVerify = true;
    }catch(e){
        itsVerify = false;
    }
    
    if(itsVerify){
        const payload = jwt.decode(token, config.TOKEN_SECRET);
    
        if (payload.exp <= moment().unix()) {
            itsVerify = false;
        }
    }

    return itsVerify;
};

exports.getUserName = function (req, res){
    const token = req.headers.authorization.split(" ")[1];

    const payload = jwt.decode(token, config.TOKEN_SECRET)

    return payload.sub;
}