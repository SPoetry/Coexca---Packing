const mysql = require("mysql");
const util = require('util');
const oracledb = require("oracledb");

//Mysql
const connection = mysql.createConnection({
    host: '192.168.0.4',
    user: 'produccion',
    password: '8472',
    database: 'produccion'
});

//Check connect
connection.connect(error =>{
    if(error) throw(error);
    console.log("DataBase running Coexca!");
});

//Functions exports
module.exports = {
    queryPersonalizatedTest: async function(sqlQuery){
        const querySql = await util.promisify(connectionTest.query).bind(connectionTest);

        try {
            var rows = await querySql(sqlQuery);
        } finally {
            return rows;
        }
    },
    queryPersonalizated: async function(sqlQuery){
        const querySql = await util.promisify(connection.query).bind(connection);

        try {
            var rows = await querySql(sqlQuery);
        } finally {
            return rows;
        }
    },
    stringifyAndParseQuery: function(resultQuery){
        const stringifyQuery = JSON.stringify(resultQuery, null, '\t');

        const jsonQueryResult = JSON.parse(stringifyQuery);

        return jsonQueryResult;
    }
};