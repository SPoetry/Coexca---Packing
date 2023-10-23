const { response } = require("express");
const res = require("express/lib/response");
const library = require('../library');

/* ----------------- START FUNCTIONS -------------------*/
    /* ------------- AUXILIAR FUNCTIONS ----------------*/
    async function standarizatedQuery (sqlQuery, res){
        const resultQuery = await library.queryPersonalizated(sqlQuery);    
        const jsonQuery = await library.stringifyAndParseQuery(resultQuery);
        
        res.send(jsonQuery);
    }
    
    function verifyCaracters(req, res){
        var includes = true;
        Object.values(req.body).forEach(elem => {
            if(elem.toString().includes('"') || elem.toString().includes("'") ){
                res.status(401).send({"msg": "Ups! Parece que hay caracteres extraños, intenta re ingresar"});
                includes =  false;
            }
        });
        return includes;
    }

    async function itsSecure (req, res){
        const itsSecure  = await auth.ensureAuthenticated(req, res);
        
        if(!itsSecure){
            res.status(401).send({"msg": "Ups! Parece que has tocado algo que no debias, intenta re ingresar"});
            return false
        }
        return true;
    }
    /*------------- END AUXILIAR FUNCTIONS ------------*/

    /*--------------------PACKING----------------------*/
    exports.UpdateClave = async function (req, res){
        if(req.body.newPass == null || req.body.user == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "update cx_usuario set clave ='" + req.body.newPass + "' where id_usuario = '" + req.body.user + "'";
        standarizatedQuery(sqlQuery, res);
    }

    exports.UpdateEstadoLote = async function (req, res){
        if(req.body.tipo_lote == null || req.body.lote == null || req.body.accion == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "";
        if(req.body.tipo_lote == "LOTE"){
            sqlQuery = "update cx_desposte set estado_lote ='" + req.body.accion + "' where id_despacho = '" + req.body.lote + "'";
        }else{
            if(req.body.tipo_lote == "OP")
                sqlQuery = "update cx_va_orden_proceso set estado_lote ='" + req.body.accion + "' where id_orden_fabricacion = '" + req.body.lote + "'";
        }

        standarizatedQuery(sqlQuery, res);
    }

    exports.UpdateArticuloImpreso = async function (req, res){
        if(req.body.subInventario == null || req.body.lot_number == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "";
        if(req.body.subInventario != "CAM1PARC"){
            sqlQuery = "update cx_prod_desp_tmp set sp_sali = 'P'  where lot_number='" + lot_number + "'";
        }else{
            sqlQuery = "update cx_prod_desp_parciales set sp_sali = 'P'  where lot_number='" + lot_number + "'";
        }
        
        standarizatedQuery(req, res);
    }

    exports.UpdateArticuloImpresoB = async function (req, res){
        if(req.body.subInventario == null || req.body.lot_number == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "";
        if(req.body.subInventario != "CAM1PARC"){
            sqlQuery = "update cx_prod_desp set sp_sali = 'P'  where lot_number='" + lot_number + "'";
        }else{
            sqlQuery = "update cx_prod_desp_parciales set sp_sali = 'P'  where lot_number='" + lot_number + "'";
        }
        
        standarizatedQuery(req, res);
    }

    exports.UpdateSelectKilosParc = async function (req, res){
        if(req.body.lot_number == null || req.body.peso_bruto == null || 
            req.body.peso_neto == null || req.body.Program_lot_number == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "update cx_prod_desp_tmp set sp_brut = '" + peso_bruto + "', sp_neto='" + peso_neto + "'  where lot_number='" + lot_number + "'";

        //crear standarizatedQuery para continuar con consultas

        if(req.body.subInventario != "CAM1PARC"){
            sqlQuery = "SELECT lot_number, id_prod,sec, tipo_caja, sp_empr, sp_fecp, sp_lote, sp_cria, sp_hora, sp_oper, sp_cant, sp_brut,";
             + " sp_tara, sp_neto, sp_sali, sp_docs, sp_fecs, sp_docr, sp_fefa, sp_maor, sp_loca, sp_fecv, sp_idfa, id_recepcion,";
             + " faja, fec_emp, rec_ini, bodega, id_despacho, sub_inventario, cod_art, inventariable, id_equipo_pesaje";
             + " FROM cx_prod_desp_tmp where lot_number= '" + req.body.Program_lot_number + "'";

            standarizatedQuery(sqlQuery, res);
        }
        res.status(401).send({"msg": "NO DATA"});
        //CONTROLAR VALORES POR APP
    }

    exports.UpdateParcial = async function (req, res){
        if(req.body.nro_doc_parcial == null || req.body.lot_number == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "update cx_prod_desp_parciales set sp_docs='" + req.body.nro_doc_parcial + "', sp_sali='I' where lot_number='" + req.body.lot_number + "' and sp_sali='P'";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectConsultaParcial = async function (req, res){
        if(req.body.lot_number == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "SELECT lot_number, id_prod,sec, tipo_caja, sp_empr, sp_fecp, sp_lote, sp_cria, sp_hora, sp_oper, sp_cant, sp_brut,"
        + " sp_tara, sp_neto, sp_sali, sp_docs, sp_fecs, sp_docr, sp_fefa, sp_maor, sp_loca, sp_fecv, sp_idfa, id_recepcion,"
        + " faja, fec_emp, rec_ini, bodega, id_despacho, sub_inventario, cod_art, inventariable, id_equipo_pesaje"
        + " FROM cx_prod_desp_parciales where lot_number= '" + req.body.lot_number + "'";

        standarizatedQuery(sqlQuery, res);
        //Controlar datos desde App
    }

    exports.InsertProductoTmp = async function (req, res){
        if(req.body.lot_number == null || req.body.lote == null || req.body.sp_cria == null || req.body.id_usr == null ||
            req.body.peso_bruto == null || req.body.tara == null || req.body.peso_neto == null || req.body.fecha_faena == null ||
            req.body.subinv_insert == null || req.body.vencimiento == null || req.body.id_faena == null || req.body.idrecepcion == null ||
            req.body.iddespacho == null || req.body.subinventario == null || req.body.art_cod_art == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "INSERT INTO cx_prod_desp_tmp (lot_number, sec, tipo_caja, sp_empr,sp_fecp, sp_lote,"
        + " sp_cria, sp_hora, sp_oper, sp_cant, sp_brut, sp_tara, sp_neto, sp_sali, "
        + " sp_fefa, sp_maor, sp_loca, sp_fecv, sp_idfa, id_recepcion,fec_emp,rec_ini,"
        + " bodega,id_despacho,sub_inventario,cod_art, inventariable,id_equipo_pesaje,tipo_pesaje, "
        + " codbarrgs1, nro_op, tipo_alta, spc, mp_va, faja) VALUES"
        + " ('" + req.body.lot_number + "','" + req.body.str_secuencia + "','" + req.body.tipo_caja_insert + "', 1,"
        + " '" + req.body.fecha_sel + "'," + req.body.lote + "," + req.body.id_plantel + ", curTime(),"
        + " '" + req.body.id_usr + "'," + req.body.nro_piezas + "," + req.body.peso_bruto + "," + req.body.tara + ","
        + "" + req.body.peso_neto + ", 'T','" + req.body.fecha_faena + "', '','" + req.body.subinv_insert + "',"
        + "'" + req.body.vencimiento + "','" + req.body.id_faena + "','" + req.body.id_recepcion + "','" + req.body.fecha_elaboracion + "','','" + req.body.organizacion_inventario + "',"
        + "" + req.body.id_despacho + ",'" + req.body.subinv_insert + "','" + req.body.art_cod_art + "'," + req.body.sub_inventariable + ",'"
        + "" + req.body.id_equipo_pesaje + "'," + req.body.tipo_pesaje_caja + ",'" + req.body.codbarrgs1 + "',"
        + "" + req.body.nro_op + ",'" + req.body.tipo_alta + "',1," + req.body.cambio_subinv_ingreso_va + "," + req.body.faja_insertada + ")";

        standarizatedQuery(sqlQuery, res);
    }
    
    exports.InsertProductoParcial = async function(req, res){
        if(req.body.lot_number == null || req.body.lote == null || req.body.sp_cria == null || req.body.id_usr == null ||
            req.body.peso_bruto == null || req.body.tara == null || req.body.peso_neto == null || req.body.fecha_faena == null ||
            req.body.subinv_insert == null || req.body.vencimiento == null || req.body.id_faena == null || req.body.idrecepcion == null ||
            req.body.iddespacho == null || req.body.subinventario == null || req.body.art_cod_art == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "INSERT INTO cx_prod_desp_parciales (lot_number, sec, tipo_caja, sp_empr,sp_fecp, sp_lote,"
        + " sp_cria, sp_hora, sp_oper, sp_cant, sp_brut, sp_tara, sp_neto, sp_sali, "
        + " sp_fefa, sp_maor, sp_loca, sp_fecv, sp_idfa, id_recepcion,fec_emp,rec_ini,"
        + " bodega,id_despacho,sub_inventario,cod_art, inventariable,id_equipo_pesaje) VALUES"
        + " ('" + req.body.lot_number + "','" + req.body.str_secuencia + "', 'C',1,"
        + " '" + req.body.fecha_sel + "'," + req.body.lote + "," + req.body.id_plantel + ", curTime(),"
        + " '" + req.body.id_us_autenticado + "',  " + nro_piezas + "," + req.body.peso_bruto_formateado + "," + req.body.tara + ","
        + "" + req.body.peso_neto_formateado + ", 'I','" + req.body.fecha_faena + "', '','" + req.body.sub_inventario + "',"
        + "'" + req.body.vencimiento + "','" + req.body.id_faena + "','" + req.body.id_recepcion + "','" + req.body.fecha_elaboracion + "','','" + Program.organizacion_inventario + "',"
        + "" + req.body.id_despacho + ",'" + req.body.sub_inventario + "','" + req.body.art_cod_art + "',"
        + "" + req.body.sub_inventariable + ",'" + req.body.id_equipo_pesaje + "')";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectCamTmp = async function(req, res){
        if(req.body.lot_number == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery="SELECT lot_number, id_prod,sec, tipo_caja, sp_empr, sp_fecp, sp_lote, sp_cria, sp_hora, sp_oper, sp_cant, sp_brut,"+
                    " sp_tara, sp_neto, sp_sali, sp_docs, sp_fecs, sp_docr, sp_fefa, sp_maor, sp_loca, sp_fecv, sp_idfa, id_recepcion,"+
                    " faja, fec_emp, rec_ini, bodega, id_despacho, sub_inventario, cod_art, inventariable, id_equipo_pesaje, tipo_pesaje, codbarrgs1,"+
                    " nro_op, tipo_alta, spc, mp_va, faja"+
                    " FROM cx_prod_desp_tmp where lot_number= '" + req.body.lot_number + "'";

        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectCamParc = async function(req, res){
        if(req.body.lot_number == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "SELECT lot_number, id_prod,sec, tipo_caja, sp_empr, sp_fecp, sp_lote, sp_cria, sp_hora, sp_oper, sp_cant, sp_brut,"+
                    " sp_tara, sp_neto, sp_sali, sp_docs, sp_fecs, sp_docr, sp_fefa, sp_maor, sp_loca, sp_fecv, sp_idfa, id_recepcion,"+
                    " faja, fec_emp, rec_ini, bodega, id_despacho, sub_inventario, cod_art, inventariable, id_equipo_pesaje,'' tipo_pesaje,'' codbarrgs1,"+
                    " '' nro_op, '' tipo_alta, '' spc, '' mp_va, '' faja"+
                    " FROM cx_prod_desp_parciales where lot_number= '" + req.body.lot_number + "'";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.InsertProductoTest = async function (req, res){
        if(req.body.lot_number == null || req.body.str_secuencia == null || req.body.fecha_sel == null || req.body.lote == null || req.body.id_plantel == null ||
            req.body.id_us_autenticado == null || req.body.nro_piezas == null || req.body.peso_bruto_formateado == null || req.body.tara == null ||
            req.body.peso_neto_formateado == null || req.body.fecha_faena == null || req.body.sub_inventario == null || req.body.vencimiento == null ||
            req.body.id_faena == null || req.body.id_recepcion || req.body.fecha_elaboracion == null || req.body.organizacion_inventario == null ||
            req.body.id_despacho == null || req.body.sub_inventario == null || req.body.art_cod_art == null || req.body.sub_inventariable == null ||
            req.body.id_equipo_pesaje == null || req.body.tipo_pesaje_caja == null || req.body.codbarrgs1 == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "INSERT INTO cx_prod_desp_test (lot_number, sec, tipo_caja, sp_empr,sp_fecp, sp_lote,"+
                " sp_cria, sp_hora, sp_oper, sp_cant, sp_brut, sp_tara, sp_neto, sp_sali, "+
                " sp_fefa, sp_maor, sp_loca, sp_fecv, sp_idfa, id_recepcion,fec_emp,rec_ini,"+
                " bodega,id_despacho,sub_inventario,cod_art, inventariable,id_equipo_pesaje,tipo_pesaje, codbarrgs1) VALUES"+
                " ('" + req.body.lot_number + "','" + req.body.str_secuencia + "', '', 1,"+
                " '" + req.body.fecha_sel + "'," + req.body.lote + "," + req.body.id_plantel + ", curTime(),"+
                " '" + req.body.id_us_autenticado + "'," + req.body.nro_piezas + "," + req.body.peso_bruto_formateado + "," + req.body.tara + ","+
                "" + req.body.peso_neto_formateado + ", 'I','" + req.body.fecha_faena + "', '','" + req.body.sub_inventario + "',"+
                "'" + req.body.vencimiento + "','" + req.body.id_faena + "','" + req.body.id_recepcion + "','" + req.body.fecha_elaboracion + "','','" + req.body.organizacion_inventario + "',"+
                "" + req.body.id_despacho + ",'" + req.body.sub_inventario + "','" + req.body.art_cod_art + "'," + req.body.sub_inventariable + ",'"+
                "" + req.body.id_equipo_pesaje + "'," + req.body.tipo_pesaje_caja + ",'" + req.body.codbarrgs1 + "')";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectProductoTest = async function (req, res){
        if (req.body.lot_number == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "SELECT lot_number, id_prod,sec, tipo_caja, sp_empr, sp_fecp, sp_lote, sp_cria, sp_hora, sp_oper, sp_cant, sp_brut,"+
                " sp_tara, sp_neto, sp_sali, sp_docs, sp_fecs, sp_docr, sp_fefa, sp_maor, sp_loca, sp_fecv, sp_idfa, id_recepcion,"+
                " faja, fec_emp, rec_ini, bodega, id_despacho, sub_inventario, cod_art, inventariable, id_equipo_pesaje, codbarrgs1"+
                " FROM cx_prod_desp_test where lot_number= '" + req.body.lot_number + "'";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.InsertProductoDesp = async function (req, res){
        if(req.body.v_idProd == null || req.body.v_codvarr == null || req.body.v_sec == null || req.body.v_tipo_caja == null || 
            req.body.v_sp_fecp == null || req.body.v_sp_lote == null || req.body.v_sp_cria == null || req.body.v_sp_hora == null || 
            req.body.v_sp_oper == null || req.body.v_sp_brut == null || req.body.v_sp_tara == null || req.body.v_sp_neto == null || 
            req.body.v_sp_fefa == null || req.body.v_sp_loca == null || req.body.v_sp_fecv == null || req.body.v_sp_idfa == null || 
            req.body.v_idrecepcion == null || req.body.v_fec_emp == null || req.body.v_bodega == null || req.body.v_iddespacho == null || 
            req.body.v_sp_prod == null || req.body.sub_inventariable == null || req.body.id_equipo_pesaje == null || 
            req.body.v_faja == null || req.body.tipo_pesaje_caja == null || req.body.v_codbarrgs1 == null || req.body.nro_op == null || 
            req.body.tipo_alta == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "INSERT INTO cx_prod_desp (id_prod, lot_number, sec, tipo_caja, sp_empr,sp_fecp, sp_lote,"+
                " sp_cria, sp_hora, sp_oper, sp_cant, sp_brut, sp_tara, sp_neto, sp_sali, "+
                " sp_fefa, sp_maor, sp_loca, sp_fecv, sp_idfa, id_recepcion,fec_emp,rec_ini,"+
                " bodega,id_despacho,sub_inventario,cod_art, inventariable,id_equipo_pesaje, faja, tipo_pesaje, codbarrgs1, nro_op, tipo_alta, spc) VALUES"+
                " ('" + req.body.v_idProd + "','" + req.body.v_codvarr + "','" + req.body.v_sec + "', '" + req.body.v_tipo_caja + "', 1,"+
                " '" + req.body.v_sp_fecp + "'," + req.body.v_sp_lote + "," + req.body.v_sp_cria + ",'" + req.body.v_sp_hora + "',"+
                " '" + req.body.v_sp_oper + "', 1," + req.body.v_sp_brut + "," + req.body.v_sp_tara + ","+
                "" + req.body.v_sp_neto + ", 'T','" + req.body.v_sp_fefa + "', '','" + req.body.v_sp_loca + "',"+
                "'" + req.body.v_sp_fecv + "','" + req.body.v_sp_idfa + "','" + req.body.v_idrecepcion + "','" + req.body.v_fec_emp + "','','" + req.body.v_bodega + "',"+
                "" + req.body.v_iddespacho + ",'" + req.body.v_sp_loca + "','" + req.body.v_sp_prod + "'," + req.body.sub_inventariable + ",'"+
                "" + req.body.id_equipo_pesaje + "'," + req.body.v_faja + "," + req.body.tipo_pesaje_caja + ",'" + req.body.v_codbarrgs1 + "'," + req.body.nro_op + ",'" + req.body.tipo_alta + "',1)";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.InsertProductoParciales = async function (req, res){
        if(req.body.v_idProd == null || req.body.v_codvarr == null || req.body.v_sec == null || req.body.v_tipo_caja == null || 
            req.body.v_sp_fecp == null || req.body.v_sp_lote == null || req.body.v_sp_cria == null || req.body.v_sp_hora == null || 
            req.body.v_sp_oper == null || req.body.v_sp_brut == null || req.body.v_sp_tara == null || req.body.v_sp_neto == null || 
            req.body.v_sp_fefa == null || req.body.v_sp_loca == null || req.body.v_sp_fecv == null || req.body.v_sp_idfa == null || 
            req.body.v_idrecepcion == null || req.body.v_fec_emp == null || req.body.organizacion_inventario == null || 
            req.body.v_iddespacho == null || req.body.v_sp_prod == null || 
            req.body.sub_inventariable == null || req.body.id_equipo_pesaje == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "INSERT INTO cx_prod_desp_parciales (id_prod, lot_number, sec, tipo_caja, sp_empr,sp_fecp, sp_lote,"+
                " sp_cria, sp_hora, sp_oper, sp_cant, sp_brut, sp_tara, sp_neto, sp_sali, "+
                " sp_fefa, sp_maor, sp_loca, sp_fecv, sp_idfa, id_recepcion,fec_emp,rec_ini,"+
                " bodega,id_despacho,sub_inventario,cod_art, inventariable,id_equipo_pesaje) VALUES"+
                " ('" + req.body.v_idProd + "','" + req.body.v_codvarr + "','" + req.body.v_sec + "', '" + req.body.v_tipo_caja + "', 1,"+
                " '" + req.body.v_sp_fecp + "'," + req.body.v_sp_lote + "," + req.body.v_sp_cria + ",'" + req.body.v_sp_hora + "',"+
                " '" + req.body.v_sp_oper + "', 1," + req.body.v_sp_brut + "," + req.body.v_sp_tara + ","+
                "" + req.body.v_sp_neto + ", 'P','" + req.body.v_sp_fefa + "', '','" + req.body.v_sp_loca + "',"+
                "'" + req.body.v_sp_fecv + "','" + req.body.v_sp_idfa + "','" + req.body.v_idrecepcion + "','" + req.body.v_fec_emp + "',0,'" + req.body.organizacion_inventario + "',"+
                "" + req.body.v_iddespacho + ",'" + req.body.v_sp_loca + "','" + req.body.v_sp_prod + "'," + req.body.sub_inventariable + ",'"+
                "" + req.body.id_equipo_pesaje + "')";

        standarizatedQuery(sqlQuery, res);
    }

    exports.InsertError = async function(req, res){
        if(req.body.dato == null || req.body.id_equipo_pesaje == null || req.body.id_us_autenticado == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery =  "INSERT INTO cx_log_error (descripcion) values('"+ req.body.dato + "- desde:"+ req.body.id_equipo_pesaje + "- usuario:"+ req.body.id_us_autenticado +"')";
        standarizatedQuery(sqlQuery, res);
    }

    exports.InsertAndUpdateLote = async function (req, res){
        if(req.body.query == null)
            return;

        let sqlQuery = req.body.query;
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectUsuario = async function(req, res){
        if(req.body.id_usuario == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        let sqlQuery = "select * from cx_usuario where id_usuario='" + req.body.id_usuario + "'";
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectKilosDesposte = async function (req, res){
        if(req.body.id_desposte == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "select kilos_despostados Kilos_E  from cx_desposte where id_despacho= '" + req.body.id_desposte + "'";

        standarizatedQuery(sqlQuery, res);
    }

    exports.SumKilosMari = async function (req, res){
        if(req.body.id_desposte == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "select sum(sp_neto) Kilos_S from cx_prod_desp where id_despacho= '" + req.body.id_desposte + "' and sp_sali<>'*' and sp_loca <> 'CAM1MARI'";
        standarizatedQuery(sqlQuery, res);
    }

    exports.SumVaraCaliente = async function (req, res){
        if(req.body.id_desposte == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "select sum(v.PESO) Kilos_E from produccion.vara v, produccion.animal a, produccion.desposte d where d.iddespacho='" + req.body.id_desposte + "' and d.idfaena= a.IDFAENA"+
                " and a.codvar = v.codvar and v.tipo_vara='C'";
        standarizatedQuery(sqlQuery, res);
    }

    exports.SumKilosSub = async function (req, res){
        if(req.body.id_desposte == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "select sum(sp_neto) Kilos_S from cx_prod_desp where id_despacho= '" + req.body.id_desposte + "' and sp_sali<>'*' and sp_loca <> 'CAM1SUB'";
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectArticuloV = async function (req, res){
        if(req.body.codigo == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "select * from cx_articulo_v where cod_art='" + req.body.codigo + "'";
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectListado = async function (req, res){
        if(req.body.nro_docto_parcial == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "select lot_number LOT_NUMBER, sp_neto NETO from cx_prod_desp_parciales where sp_docs='" + req.body.nro_docto_parcial + "'";
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectLotes = async function (req, res){
        if(req.body.fecha == null || req.body.tipo == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "select concat(substring(DP.origen,1,3),'(', IFNULL(DATE_FORMAT(DP.fec_emp_ini,'%d/%m/%y'),''), ')') DESTINO,"+
                " DP.secu_desp LOTE, DP.id_despacho ID, DP.fecha FECHA, DP.id_plantel PROD,  "+
                " if(DP.flex_recepcion='1','PROPIOS',if(DP.flex_recepcion='2','TERCEROS','OTROS')) RORIGEN,"+
                " DP.unidades_despostadas UNID, DP.kilos_despostados KILOS, DP.estado_lote ESTADO,"+
                " DP.unidades_programadas UNID_PROG, DP.id_faena ID_FAENA,  DP.kilos_salida KILOS_PRODUC,"+
                " DP.fecha_faena FECHA_FAENA, DP.id_plantel PLANTEL, DP.nombre_predio PREDIO,"+
                " DP.nombre_productor NOMBRE_PROD, DP.rup RUP, DP.pig PIG, DP.flex_recepcion TIPO_RECEPCION,"+
                " DP.tipo_codificacion TIPO_CODIFICACION, DP.exportable EXPORTABLE, DP.origen ORIGEN, "+
                " DP.id_recepcion RECEPCION, DP.id_rec_ini RECEPCION_INICIAL, DP.fec_emp_ini FECHA_PROD_INICIAL, DS.MERCADO MERCADO_ORIGEN,"+
                " DP.secuencia_fprod SEC_FPROD"+
                " from cx_desposte DP, cx_destino_desposte DS where   DP.fecha='" + fecha + "' and DP.tipo_desposte='" + tipo + "'"+
                " and DP.origen=DS.descripcion "+
                " and DP.unidades_despostadas > 0 ";
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectLotesOp = async function (req, res){
        if(req.body.fecha == null || req.body.tipo == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "select concat(substring(DP.origen,1,3),'(', IFNULL(DATE_FORMAT(DP.fec_emp_ini,'%d/%m/%y'),''), ')') DESTINO,"+
                " OP.id_orden_fabricacion OP, DP.id_despacho ID, DP.fecha FECHA, DP.id_plantel PROD,  "+
                " DP.unidades_despostadas UNID, DP.kilos_despostados KILOS, OP.estado_lote ESTADO,if(DP.flex_recepcion='1','PROPIOS',"+
                " if (DP.flex_recepcion='2','TERCEROS','OTROS')) RORIGEN, DP.secu_desp LOTE,"+
                " OP.id_lista_material ID_LISTA, DP.unidades_programadas UNID_PROG, DP.id_faena ID_FAENA,  DP.kilos_salida KILOS_PRODUC,"+
                " DP.fecha_faena FECHA_FAENA, DP.id_plantel PLANTEL, DP.nombre_predio PREDIO,"+
                " DP.nombre_productor NOMBRE_PROD, DP.rup RUP, DP.pig PIG, DP.flex_recepcion TIPO_RECEPCION,"+
                " DP.tipo_codificacion TIPO_CODIFICACION, DP.exportable EXPORTABLE, DP.origen ORIGEN, "+
                " DP.id_recepcion RECEPCION, DP.id_rec_ini RECEPCION_INICIAL, DP.fec_emp_ini FECHA_PROD_INICIAL,"+
                " DS.MERCADO MERCADO_ORIGEN, DP.fecha FECHA_LOTE_DESPOSTE, DP.secuencia_fprod SEC_FPROD"+
                " from cx_desposte DP, cx_destino_desposte DS, cx_va_orden_proceso OP where"+
                " OP.fecha_inicio_programado='" + fecha + "' and DP.tipo_desposte='" + tipo + "'"+
                " and OP.lote_desposte=DP.id_despacho "+
                " and DP.origen=DS.descripcion "+
                " and DP.unidades_despostadas > 0 "+
                " and OP.estado = 'LIBERADO'";
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectProduccion = async function(req, res){
        let sqlQuery = "select pd.cod_art COD_ART, ar.descripcion DESCRIPCION, pd.lot_number FOLIO, pd.sp_fecp FECHA_PROD, pd.sp_oper USUARIO, sum(pd.sp_neto) KILOS_NETO"+
                " FROM cx_prod_desp pd, cx_articulo ar where"+
                " pd.cod_art=ar.cod_art and pd.sp_sali<>'*' group by pd.cod_art, pd.lot_number WITH ROLLUP";
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectListadoEquipos = async function(req, res){
        let sqlQuery = "select id_equipo_pesaje ID, ip_equipo_pesaje IP_EQUIPO, tipo_pesaje TIPO_PESAJE, descripcion_equipo DESCRIPCION, descripcion_ubicacion UBICACION, tipo_puerto_impresora CONEXION_IMPRESORA "+
                " from cx_configuracion_equipo";
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectArticulos = async function(req, res){
        if(req.body.condiciones == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "SELECT ar.cod_art, ar.descripcion, ar.codigo_sag,tara, ar.id_eti, et.nombre, ar.peso_minimo,"+
            " ar.peso_maximo,ar.peso_fijo, ar.dias_duracion, ar.calculo_fecha, if(activo='S','ACTIVO', 'INACTIVO') estado"+
            " FROM cx_articulo ar left join cx_etiqueta et on ar.id_eti= et.id_eti"+
            " where 1=1 " + req.body.condiciones;

        standarizatedQuery(sqlQuery, res);  
    }

    exports.SelectArticulosEstado = async function (req, res){
        var estado_tmp;
        if(req.body.estado == null )
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "SELECT ar.cod_art, ar.descripcion, if(activo='S','ACTIVO', 'INACTIVO') estado"+
                " FROM cx_articulo ar where (cod_art like '3%' or cod_art like '4%')";

        if(req.body.estado == "ACTIVOS"){
            estado_tmp = "S";
        }else{
            estado_tmp = "N";
        }

        if(estado != "TODOS")
            sqlQuery += " and activo='" + estado_tmp + "' ";

        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectProduccionDesposte = async function(req, res){
        if(req.body.id_desposte == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery =  "select COD_ART, DESCRIPCION,  SUB_INVENTARIO,"+
            " count(*) UNID, sum(NETO) NETO from"+
            " (select pd.cod_art COD_ART, ar.descripcion DESCRIPCION, sp_loca SUB_INVENTARIO,"+
            " sp_neto NETO from cx_prod_desp pd , cx_articulo ar"+
            " where pd.cod_art = ar.cod_art and id_despacho = '" + req.body.id_desposte + "' and sp_sali <> '*'"+
            " and(sp_loca <> 'CAM1MARI' AND sp_loca <> 'PROTERMV')"+
            " union all"+
            " select pd.cod_art COD_ART, ar.descripcion DESCRIPCION,  'INGRESO_VA' SUB_INVENTARIO,"+
            " sp_neto NETO from cx_prod_desp pd , cx_articulo ar"+
            " where pd.cod_art = ar.cod_art and id_despacho = '" + req.body.id_desposte + "' and sp_sali<> '*'"+
            " and sp_loca = 'CAM1MARI' and mp_va = 1) xx"+
            " group by SUB_INVENTARIO, COD_ART with rollup";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectAcceso = async function (req, res){
        if(req.body.menu == null || req.body.id_usuario == null)
            return;
    
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "select count(*) from cx_acceso where id_usuario='" + req.body.id_usuario + "'";
                " and id_tipo_acceso ='" + req.body.menu + "' and activo='1'";
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectEstadoLote = async function (req, res){
        if(req.body.tipo_lote == null)
            return;
    
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "";
        if(req.body.tipo_lote == "LOTE"){
            sqlQuery = "select estado_lote from cx_desposte where id_despacho='" + lote + "'";
        }else{
            sqlQuery = "select estado_lote from cx_va_orden_proceso where id_orden_fabricacion='" + lote + "'";
        }

        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectVersion = async function (req, res){
        let sqlQuery = "select version from cx_version_aplicacion order by id_version desc limit 1";

        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectFechaVersion = async function (req, res){
        let sqlQuery = "select fecha_version from cx_version_aplicacion order by id_version desc limit 1";

        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectEtiquetaNutricional = async function (req, res){
        if(req.body.cod_art == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "select etiq from cx_etiqueta_cn where nombre like '" + cod_art + "'";
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectProduccion = async function (req, res){
        if(req.body.fecha_inicio == null || req.body.fecha_fin == null || req.body.subinventario == null || 
            req.body.usuario == null || req.body.id_equipo == null || req.body.ver == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "select pd.cod_art COD_ART, ar.descripcion DESCRIPCION, pd.sub_inventario SUB_INVENTARIO, pd.lot_number FOLIO, CAST(pd.sp_fecp AS CHAR) FECHA_PROD,"+
            " CAST(sp_hora AS CHAR) HORA_PESAJE, pd.sp_oper USUARIO,  SUM(pd.sp_brut) BRUTO, SUM(pd.sp_tara) TARA, SUM(pd.sp_neto) KILOS_NETO, "+
            " IF(tipo_pesaje=1,'AUTOMATICO', IF(tipo_pesaje=2,'MANUAL', 'SIN INFORMACION')) TIPO_PESAJE"+
            " FROM cx_prod_desp pd, cx_articulo ar where pd.sp_sali <> '*' and pd.cod_art = ar.cod_art ";
        
        let sqlQueryTodos = "select pd.cod_art COD_ART, ar.descripcion DESCRIPCION, pd.sub_inventario SUB_INVENTARIO, pd.lot_number FOLIO, CAST(pd.sp_fecp AS CHAR) FECHA_PROD,"+
            " CAST(sp_hora AS CHAR) HORA_PESAJE, pd.sp_oper USUARIO,  SUM(pd.sp_brut) BRUTO, SUM(pd.sp_tara) TARA, SUM(pd.sp_neto) KILOS_NETO,"+
            " IF(tipo_pesaje=1,'AUTOMATICO', IF(tipo_pesaje=2,'MANUAL', 'SIN INFORMACION')) TIPO_PESAJE"+
            " FROM cx_prod_desp pd, cx_articulo ar where pd.sp_sali <> '*' and pd.cod_art = ar.cod_art ";
        
        if(ver == "pendiente"){
            sqlQuery += " and pd.sp_fecp='" + req.body.fecha_inicio + "'";
            sqlQueryTodos += " and pd.sp_fecp='" + req.body.fecha_inicio + "'";
        }else{
            sqlQuery += " and pd.sp_fecp >='" + req.body.fecha_inicio + "' and pd.sp_fecp <= '" + req.body.fecha_fin + "'";
            sqlQuerytodos += " and pd.sp_fecp >='" + req.body.fecha_inicio + "' and pd.sp_fecp <= '" + req.body.fecha_fin + "'";
        }

        if (usuario != "0"){
            sqlQuery += " and pd.sp_oper = '" + req.body.usuario + "'";
        }else{
            sqlQuery = sqlQueryTodos;
        }
        if (id_equipo != "0"){
            sqlQuery += " and pd.id_equipo_pesaje = '" + req.body.id_equipo + "'";
        }
        sqlQuery +=" group by pd.cod_art, pd.lot_number WITH ROLLUP";

        standarizatedQuery(sqlQuery, res);
    }
    
    exports.SelectProduccionTotal = async function (req, res){
        if(req.body.fecha == null || req.body.orderby == null || req.body.ver == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
            
        let sqlQuery = "select pd.cod_art COD_ART, ar.descripcion DESCRIPCION, pd.sub_inventario SUB_INVENTARIO, CAST(pd.sp_fecp AS CHAR) FECHA_PROD, sum(pd.sp_neto) KILOS_NETO, count(*) CANTIDAD"+
            " FROM cx_prod_desp pd, cx_articulo ar where"+
            " pd.cod_art = ar.cod_art "+
            " and pd.sp_fecp='" + req.body.fecha + "'";
        
        if(req.body.ver == "pendiente"){
            sqlQuery += " and (sp_sali='?' or sp_sali='T') and sp_loca <> 'CAM1MARI'";   
        }else{
            sqlQuery += " and sp_sali <> '*'";  
        }

        if(req.body.orderby == "camara"){
            sqlQuery += " group by pd.sub_inventario, pd.cod_art WITH ROLLUP";
        }else{
            if(req.body.orderby == "producto")
                sqlQuery += " group by pd.cod_art, pd.sub_inventario WITH ROLLUP";
        }

        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectListadoUsuarios = async function (req, res){
        let sqlQuery = "select id_usuario, nombre_usuario from cx_usuario where activo = 'S'";

        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectProduccionCantidad = async function (req, res){
        if(req.body.filtro == null || req.body.fecha == null || req.body.usuario == null || req.body.subinventario == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "";
        if(req.body.filtro == "minuto"){
            sqlQuery = "SELECT DATE_FORMAT(id_prod, '%Y-%m-%d %H:%i') AS MINUTO,";

            if (req.body.usuario != "TODOS")
                sqlQuery += " sp_oper USUARIO, ";

            sqlQuery += " COUNT(*) cajas from cx_prod_desp";
            sqlQuery += " WHERE DATE_FORMAT(id_prod, '%Y-%m-%d') = '" + req.body.fecha + "' and sp_sali <> '*'";

            if (req.body.usuario != "TODOS")
                sqlQuery += " and sp_oper='" + req.body.usuario + "'";

            if (req.body.subinventario != "0")
                sqlQuery += " and sp_loca='" + req.body.subinventario + "'";

            sqlQuery += " group by minuto";
        }else if (req.body.filtro == "hora"){
            sqlQuery = "SELECT DATE_FORMAT(id_prod, '%Y-%m-%d %H') AS HORA, ";

            if (req.body.usuario != "TODOS")
                sqlQuery += " sp_oper USUARIO, ";

            sqlQuery += " COUNT(*) cajas from cx_prod_desp";
            sqlQuery += " WHERE DATE_FORMAT(id_prod, '%Y-%m-%d') = '" + req.body.fecha + "' and sp_sali <> '*'";

            if (req.body.usuario != "TODOS")
                sqlQuery += " and sp_oper='" + req.body.usuario + "'";

            if (req.body.subinventario != "0")
                sqlQuery += " and sp_loca='" + req.body.subinventario + "'";

            sqlQuery += " group by HORA";
        }
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectSubinventario = async function (req, res){
        if(req.body.subinventario == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "select * from cx_bodegas where sub_inventario='" + req.body.subinventario + "'";
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectEquipoPesaje = async function (req, res){
        if(req.body.nombre_equipo == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;    
    
        let sqlQuery = "select id_equipo_pesaje, ip_equipo_pesaje, tipo_pesaje, comm, configura_comm, largo_string_pesa,"+
            " descripcion_equipo, descripcion_ubicacion, tabla_secuencia, funcion_secuencia, tipo_puerto_impresora,"+
            " tiempo_inicio_rechazo, tiempo_fin_rechazo, ip_impresion_uno, ip_impresion_dos,comm_rechazador,puerto_camara,"+
            " tipo_lectura_control_linea, cant_impresoras, ip_camara, usar_rechazador"+
            " from cx_configuracion_equipo where nombre_equipo='" + req.body.nombre_equipo + "'";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectEquipoPesajeIP = async function (req, res){
        if(req.body.ip == null )
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;    
    
        let sqlQuery = "select id_equipo_pesaje, ip_equipo_pesaje, tipo_pesaje, comm, configura_comm, largo_string_pesa," +
            " descripcion_equipo, descripcion_ubicacion, tabla_secuencia, funcion_secuencia, tipo_puerto_impresora," +
            " tiempo_inicio_rechazo, tiempo_fin_rechazo, ip_impresion_uno, ip_impresion_dos,comm_rechazador,puerto_camara," +
            " tipo_lectura_control_linea, cant_impresoras, ip_camara, usar_rechazador" +
            " from cx_configuracion_equipo where ip_equipo_pesaje='" + req.body.ip + "'";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectSecuencia = async function (req, res){
        if(req.body.fecha == null || req.body.funcion == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "select " + req.body.funcion  + "('" + req.body.fecha + "')";

        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectExisteLote = async function (req, res){
        if(req.body.lote == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "select count(*) from cx_desposte where id_despacho ='" + req.body.lote + "'";
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectSubinventarios = async function (req, res){
        if(req.body.id_us_autenticado == null)
            return;        
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "select sub_inventario, nombre_bodega from cx_bodegas B"+
            " inner join cx_acceso A on B.sub_inventario = A.id_tipo_acceso"+
            " and A.id_usuario ='" + Program.id_us_autenticado + "' and activo=1";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectEquipos = async function (req, res){
        let sqlQuery = "select id_equipo_pesaje, descripcion_equipo  from cx_configuracion_equipo C";

        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectTipoPesaje = async function (req, res){
        if(req.body.id_us_autenticado == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "select id_tipo_acceso from cx_menu B"+
            " inner join cx_acceso A on B.id_menu = A.id_menu and B.nombre_menu='TIPO_PESAJE'"+
            "AND A.id_usuario='"+ req.body.id_us_autenticado+"' and A.activo=1";
    }

    exports.UpdateRango = async function (req, res){
        if(req.body.codart == null || req.body.min_actual == null || req.body.min_nuevo == null || req.body.max_actual == null || req.body.max_nuevo == null ||
            req.body.fijo_actual == null || req.body.fijo_nuevo == null || req.body.tara_actual == null || req.body.tara_nueva == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "update cx_articulo set peso_minimo = " + req.body.min_nuevo + ", peso_maximo=" + req.body.max_nuevo + ", peso_fijo=" + req.body.fijo_nuevo + ","+
            " tara=" + req.body.tara_nueva + " where cod_art='" + req.body.codart + "'";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.InsertLogRango = async function (req, res){
        if(req.body.codart == null || req.body.min_actual == null || req.body.min_nuevo == null || req.body.max_actual == null || req.body.max_nuevo == null ||
            req.body.fijo_actual == null || req.body.fijo_nuevo == null || req.body.tara_actual == null || req.body.tara_nueva == null || req.body.id_us_autenticado == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "insert into cx_log_cambio_rangos(cod_art, minimo_actual, minimo_nuevo, maximo_actual, maximo_nuevo, fijo_actual, fijo_nuevo, tara_actual, tara_nuevo, usuario)"+
            " values('" + req.body.codart + "'," + req.body.min_actual + "," + req.body.min_nuevo + "," + req.body.max_actual + "," + req.body.max_nuevo + "," + req.body.fijo_actual + "," + req.body.fijo_nuevo + "," + req.body.tara_actual + "," + req.body.tara_nueva + ",'" + req.body.id_us_autenticado + "')";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.UpdateEstadoArticulo = async function (req, res){
        if(req.body.estado == null || req.body.cod_art == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "update cx_articulo set activo = '" + req.body.estado  + "' where cod_art='" + req.body.cod_art + "'";

        standarizatedQuery(sqlQuery, res);
    }

    exports.InsertLogArticulo = async function (req, res){
        if(req.body.estado_tmp == null || req.body.id_us_autenticado == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "insert into cx_log_cambio_rangos(cod_art, estado, usuario)"+
            " values('" + req.body.cod_art + "','"+ req.body.estado_tmp + "','" + req.body.id_us_autenticado + "')";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.UpdateArticuloGeneral = async function (req, res){
        if(req.body.estado == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "update cx_articulo set activo = '" + req.body.estado + "' where (cod_art like '3%' or cod_art like '4%')" +
            " and activo != '" + req.body.estado + "'";
        standarizatedQuery(sqlQuery, res);
    }

    exports.InsertLogLote = async function (req, res){
        if(req.body.id_despacho == null || req.body.usuario == null || req.body.accion == null || req.body.tipo_lote == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "insert into cx_log_abrir_lote(id_despacho, usuario, accion, tipo_lote)"+
            " values(" + req.body.id_despacho + ",'" + req.body.usuario + "','" + req.body.accion + "','"+ req.body.tipo_lote +"')";

        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectArticulosCx = async function (req, res){
        if(req.body.codart == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "select cod_art, descripcion, peso_minimo, peso_maximo, peso_fijo, tara, inventory_item_id_ora, activo, fecha_actualizacion from cx_articulo where cod_art='" + req.body.codart + "'";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectAmbiente = async function (req, res){
        if(req.body.nombre1 ==  null || req.body.ip1 == null || req.body.nombre2 == null || req.body.ip2 == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "select concat(n1, '__', n2) ambiente from (select nombre_visualizar n1 from cx_ambiente where nombre='" + req.body.nombre1 + "' and ip='" + req.body.ip1 + "') x1,";
            " (select nombre_visualizar n2 from cx_ambiente ";
            " where nombre='"+ req.body.nombre2+ "' and ip='"+ req.body.ip2 +"') x2";

        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectHistoricoArticulo = async function (req, res){
        if(req.body.codart == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery =  "SELECT cod_art COD_ART,fecha FECHA ,minimo_actual MIN_ANT,minimo_nuevo MIN_NUEVO, maximo_actual MAX_ANT, maximo_nuevo MAX_NUEVO,fijo_actual "+
            "FIJO_ANT, fijo_nuevo FIJO_NUEVO, tara_actual TARA_ANT, tara_nuevo TARA_NUEVO,estado ESTADO,usuario USUARIO from cx_log_cambio_rangos"+
            " where cod_art= '" + codart + "' order by fecha desc limit 10";

        standarizatedQuery(sqlQuery, res);
    }

    exports.UpdateParcialFolio = async function (req, req){
        if(req.body.lot_number == null || req.body.nro_doc_parcial == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "update cx_prod_desp_parciales set lot_number_org='"+req.body.lot_number  + "' where sp_docs='" +req.body.nro_docto_parcial + "'";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectNetoParciales = async function (req, res){
        if(req.body.lot_number == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
    
        let sqlQuery = "select sum(sp_neto) neto_caja from cx_prod_desp_parciales where lot_number_org='" + req.body.lot_number + "'";

        standarizatedQuery(sqlQuery, res);
    }

    exports.UpdateProdDesp = async function (req, res){
        if(req.body.resultado == null || req.body.tara == null || req.body.bruto == null || req.body.lot_number == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "update cx_prod_desp set sp_neto=" + req.body.resultado + ", sp_tara=" + req.body.tara + ", sp_brut="+ req.body.bruto  +" where lot_number='" + req.body.lot_number + "'";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectEstadoParcial = async function (req, res){
        if(req.body.lot_number_parc == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;       

        let sqlQuery = "select lot_number, lot_number_org, sp_sali, sp_docs from cx_prod_desp_parciales  where lot_number='" + req.body.lot_number_parc + "' ";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.UpdateQuitarParcial = async function (req, res){
        if(req.body.lot_number_parc == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "update cx_prod_desp_parciales set  sp_sali='P', sp_docs='' where lot_number='" + req.body.lot_number_parc + "' and sp_sali='I'";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectCountLotes = async function (req, res){
        if(req.body.tipo_validacion == null || req.body.fprod == null || req.body.nro_lote == null)
            return

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
    
        let sqlQuery = "";
        if(req.body.tipo_validacion == "ANTES"){
            sqlQuery =  "SELECT count(*) FROM cx_desposte where fec_emp_ini ='" + req.body.fprod + "' and secu_desp='" + req.body.nro_lote + "'"+
                " and tipo_desposte='DESPOSTE'";
        }else{
            sqlQuery = "SELECT count(*) FROM cx_desposte where fec_emp_ini ='" + req.body.fprod + "' and secuencia_fprod='" + req.body.nro_lote + "'"+
                " and tipo_desposte='DESPOSTE'";
        }

        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectOpFecha = async function (req, res){
        if(req.body.tipo_proceso == null || req.body.f_inicio == null || req.body.f_fin == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        if (req.body.tipo_proceso == "LAMINADO"){
            req.body.tipo_proceso = "LAMIN1";
        }
        else if (req.body.tipo_proceso == "PORCIONADO"){
            req.body.tipo_proceso = "PORC1";
        }

        let sqlQuery = "select id_orden_fabricacion NRO_OP, fecha_inicio_programado FECHA from cx_va_orden_proceso op"+
            " where  op.fecha_inicio_programado between '" + req.body.f_inicio + "' and '" + req.body.f_fin + "' ";
        
        if(req.body.tipo_proceso != "TODOS")
            sqlQuery += " and id_codigo_proceso='"+ req.body.tipo_proceso +"'";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectPackingOp = async function (req, res){
        if(req.body.op == null || req.body.tipo_visualizacion == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "select pd.cod_art COD_ART, ar.descripcion DESCRIPCION,  sp_loca SUB_INVENTARIO, count(*) UNIDADES, sum(sp_neto) NETO"+
            " from cx_prod_desp pd , cx_articulo ar"+
            " where pd.cod_art = ar.cod_Art"+
            "  and nro_op=" + req.body.op + " and sp_sali <> '*' ";
        
        if (tipo_visualizacion == 1){
            sqlQuery += " and sp_loca<>'CAM1MARI'";
        }
        else if (tipo_visualizacion == 2){
            sqlQuery += " and sp_loca='CAM1MARI'";
        }
        sqlQuery += " group by sp_loca, pd.cod_art";

        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectListaMaterial = async function (req, res){
        if(req.body.codart == null || req.body.lista == null || req.body.tipo_busqueda == null || req.body.solo_activos == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "";
        if (req.body.tipo_busqueda == 1){ /* 1 busca por codigo de articulo*/
            sqlQuery = "select  lm.id_lista_material, lm.desc_corta, lm.activo, lm.id_planta, "+
                " lm.cantidad, lm.created_by, lm.creation_date,"+
                " lm.last_updated_by, lm.last_update_date, lm.org_id, lm.cod_art, ar.descripcion "+
                " from cx_va_lista_mat lm, cx_articulo ar where lm.cod_art='" + req.body.codart + "'"+
                " and lm.cod_art =  ar.cod_art";
        }
        else{
            sqlQuery = "select  lm.id_lista_material, lm.desc_corta, lm.activo, lm.id_planta,"+
                " lm.cantidad, lm.created_by, lm.creation_date,"+
                " lm.last_updated_by, lm.last_update_date, lm.org_id, lm.cod_art, ar.descripcion "+
                " from cx_va_lista_mat lm, cx_articulo ar where lm.id_lista_material='" + req.body.lista + "'"+
                " and lm.cod_art =  ar.cod_art";
        }

        if (req.body.solo_activos == 1)
            sqlQuery += " and lm.activo = 1";
    }

    exports.SelectVaOp = async function (req, res){
        if(req.body.id_orden == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "SELECT id_orden_fabricacion, id_codigo_proceso, id_lista_material,"+
            " subinventory_code, cantidad_total, lote_desposte, fecha_inicio_programado,"+
            " fecha_fin_programado, texto_cabecera, estado, cod_art FROM  cx_va_orden_proceso"+
            " where id_orden_fabricacion = '" + req.body.id_orden + "'";

        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectListaMaterialDetalle = async function (req, res){
        if(req.body.id_lista == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "select lis.cod_art ARTICULO, ar.descripcion DESCRIPCION,"+
            " if (lis.cantidad = '1','Materia Prima',if (lis.cantidad = 0,'Producto Principal','Subproducto VA' )) TIPO"+
            " from cx_va_lista_mat_det lis, cx_articulo ar"+
            "  where lis.cod_art = ar.cod_art and lis.id_lista_material='" + req.body.id_lista + "' order by posicion";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectListaMaterialCabecera = async function (req, res){
        let sqlQuery = "select id_lista_material ID, desc_corta DESCRIPCION, cod_art ARTICULO from cx_va_lista_mat ";
        standarizatedQuery(sqlQuery, res);
    }
    
    exports.SelectHistorialMaterial = async function (req, res){
        if(req.body.id_lista == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "select id_lista_material ID_LISTA, fecha FECHA,cod_art ARTICULO, id_usuario USUARIO, descripcion DESCRIPCION,"+
            " if (cant = '1','Materia Prima',if (cant = 0,'Producto Principal','Subproducto VA' )) TIPO from cx_log_lista_mat "+
            " where id_lista_material='" + req.body.id_lista + "'";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectVaOrdenesCabecera = async function (req, res){
        let sqlQuery = "select OP.id_orden_fabricacion OP, OP.texto_cabecera DESCRIPCION, OP.fecha_inicio_programado FECHA_INICIO,"+
            " PRO.descripcion PROCESO, OP.lote_desposte LOTE_DESPOSTE "+
            " from cx_va_orden_proceso OP, cx_va_tipo_proc PRO"+
            " where OP.id_codigo_proceso = PRO.codigo_proceso"+
            " order by id_orden_fabricacion desc";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectArticulosListaMaterial = async function (req, res){
        let sqlQuery = "select lis.cod_art ARTICULO, lis.id_lista_material ID_LISTA, ar.descripcion DESCRIPCION from cx_va_lista_mat lis, cx_articulo ar"+
            " where lis.cod_art=ar.cod_art and lis.activo=1 order by ID_LISTA, ARTICULO ";

        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectVaLotes = async function (req, res){
        let sqlQuery = "select concat(substring(DP.origen,1,3),'(', IFNULL(DATE_FORMAT(DP.fec_emp_ini,'%d/%m/%y'),''), ')') DESTINO,"+
            "  DP.id_despacho LOTE_DESPOSTE, DP.fecha FECHA_CREACION, DP.id_plantel PROD,  "+
            " if(DP.flex_recepcion='1','PROPIOS',if(DP.flex_recepcion='2','TERCEROS','OTROS')) RORIGEN"+
            " from cx_desposte DP, cx_destino_desposte DS where DP.tipo_desposte='DESPOSTE'"+
            "  and DP.fecha >= DATE_ADD(sysdate(), INTERVAL -6 MONTH) "+
            " and DP.origen=DS.descripcion "+
            " and DP.unidades_despostadas > 0 "+
            " order by DP.fecha desc";

        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectTipoProceso = async function (req, res){
        let sqlQuery = "select codigo_proceso, descripcion from cx_va_tipo_proc where estado=1 order by nro_orden_listar";

        standarizatedQuery(sqlQuery, res);
    }
    
    exports.InsertListaMaterialCabecera = async function (req, res){
        if(req.body.desc_corta == null || req.body.activo == null || req.body.created_by == null || req.body.codart == null )
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "insert into cx_va_lista_mat ( desc_corta,activo,id_planta,cantidad,created_by,creation_date, last_updated_by, last_update_date, org_id, cod_art) "+
            " values ('" + req.body.desc_corta + "'," + req.body.activo + ",1,1,'" + req.body.created_by + "',sysdate(),'" + req.body.created_by + "',sysdate(),101,'" + req.body.codart + "')";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.InsertListaMaterialDetalle = async function (req, res){
        if(req.body.id_lista == null || req.body.cantidad == null || req.body.id_us_autenticado == null || req.body.codart == null )
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "insert into cx_va_lista_mat_det (posicion, cantidad,id_lista_material,created_by,creation_date, last_updated_by, last_update_date, org_id, cod_art) "+
            " values (get_posicion_va_lista_mat_det('" + req.body.id_lista  + "')," + req.body.cantidad + "," + req.body.id_lista + ",'" + req.body.id_us_autenticado + "',sysdate(),'" + req.body.id_us_autenticado + "',sysdate(),101,'" + req.body.cod_art + "')";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.InsertListaMaterial = async function (req, res){
        if(req.body.cod_art == null || req.body.cantidad == null || req.body.id_lista == null || req.body.id_us_autenticado == null )
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "insert into cx_log_lista_mat (cod_art, cant, id_lista_material, descripcion, id_usuario) "+
            " values ('" + cod_art + "'," + cantidad + "," + id_lista + ",'AGREGA ITEM','" + Program.id_us_autenticado + "')";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectCountLotesMaterial = async function (req, res){
        if(req.body.cod_art == null || req.body.id_lista == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "select count(*) from cx_va_lista_mat_det where  cod_art='" + req.body.cod_art + "' and id_lista_material='" + req.body.id_lista + "'";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectCantidadMaterial = async function (req, res){
        if(req.body.cod_art == null || req.body.id_lista == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "select cantidad from cx_va_lista_mat_det where  cod_art='" + req.body.cod_art + "' and id_lista_material='" + req.body.id_lista + "'";

        standarizatedQuery(sqlQuery, res);
    }

    exports.DeleteMaterial = async function (req, res){
        if(req.body.cod_art == null || req.body.id_lista == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "delete from cx_va_lista_mat_det where cod_art='" + req.body.cod_art + "' and id_lista_material='" + req.body.id_lista + "' and cantidad <> 0";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.InsertLogMaterial = async function (req, res){
        if(req.body.cod_art == null || req.body.id_lista == null || req.body.res_str == null || req.body.id_us_autenticado == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "insert into cx_log_lista_mat (cod_art, cant, id_lista_material, descripcion, id_usuario) "+
            " values ('" + req.body.cod_art + "'," + req.body.res_str + "," + req.body.id_lista + ",'ELIMINA ITEM','" + req.body.id_us_autenticado + "')";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectLastInsert = async function (req, res){
        let sqlQuery = "select LAST_INSERT_ID();";
        standarizatedQuery(sqlQuery, res);
    }

    exports.InsertOp = async function (req, res){
        if(req.body.id_tipo_op == null || req.body.id_codigo_proceso == null || req.body.id_lista_material == null || req.body.id_planta == null || req.body.subinventory_code == null ||
            req.body.cantidad_total == null || req.body.lote_desposte == null || req.body.fecha_inicio_programado == null || req.body.fecha_fin_programado == null ||
            req.body.texto_cabecera == null || req.body.estado == null || req.body.created_by == null || req.body.creation_date == null || req.body.last_updated_by == null ||
            req.body.last_update_date == null || req.body.org_id == null || req.body.cod_art_va == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "insert into cx_va_orden_proceso ( id_tipo_op, id_codigo_proceso,"+
            " id_lista_material, id_planta, subinventory_code, "+
            " cantidad_total, lote_desposte,"+
            "  fecha_inicio_programado, fecha_fin_programado,"+
            " texto_cabecera, estado, created_by, creation_date,"+
            " last_updated_by, last_update_date, org_id, cod_art) "+
            " values ('" + req.body.id_tipo_op + "','" + req.body.id_codigo_proceso + "','"+
            "" + req.body.id_lista_material + "','" + req.body.id_planta + "','" + req.body.subinventory_code + "','"+
            "" + req.body.cantidad_total + "','" + req.body.lote_desposte + "','"+
            "" + req.body.fecha_inicio_programado + "','"  + req.body.fecha_fin_programado + "','"+
            "" + req.body.texto_cabecera + "','" + req.body.estado + "','" + req.body.created_by + "'," + req.body.creation_date + ",'"+
            "" + req.body.last_updated_by + "','" + req.body.last_update_date + "','" + req.body.org_id + "','" + req.body.cod_art_va + "')";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.UpdateEstadoOp = async function (req, res){
        if(req.body.estado == null || req.body.id_op == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "update cx_va_orden_proceso set estado='" + req.body.estado + "'  where id_orden_fabricacion= '" + req.body.id_op + "'";

        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectCountOp = async function (req, res){
        if(req.body.id_op == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "select count(*) from cx_prod_desp where nro_op='" + req.body.id_op + "' and sp_sali <> '*'";

        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectCountMaterialActiva = async function (req, res){
        if(req.body.id_lista == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "select count(*) from cx_prod_desp where nro_op='" + req.body.id_lista + "' and sp_sali <> '*'";

        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectEnListaMaterial = async function (req, res){
        if(req.body.id_lista == null || req.body.cod_art == null || req.body.sub_inventario == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "select cod_art, cantidad, nombre_trx from cx_va_lista_mat_det, cx_tipo_trx_alta where "+
            " cod_art ='" + req.body.cod_art + "' and id_lista_material='" + req.body.id_lista + "'"+
            " and clasificacion_en_lm = cantidad"+
            " and sub_inventario ='" + req.body.sub_inventario + "'";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectSumKilosE = async function (req, res){
        if(req.body.nro_op == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "select sum(sp_neto) Kilos_E from cx_prod_desp where nro_op = " + req.body.nro_op + " and sp_loca = 'CAM1MARI' and sp_sali<>'*'";

        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectSumKilosS = async function (req, res){
        if(req.body.nro_op == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "select sum(sp_neto) Kilos_S from cx_prod_desp where nro_op = " + req.body.nro_op + " and sp_loca <> 'CAM1MARI' and sp_sali<>'*'";

        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectDescripcionLista = async function (req, res){
        if(req.body.nro_op == null || req.body.id_lista == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "select CONVERT(CONCAT(lis.cod_art, ' - ', "+
            " if (id_codigo_proceso = 'LAMIN1','LAMINADO',"+
            " if (id_codigo_proceso = 'PORC1','PORCIONADO','' ))),CHAR) DESCRIPCION"+
            " from cx_va_lista_mat lis, cx_va_orden_proceso op"+
            " where lis.id_lista_material ='" + req.body.id_lista + "'"+
            " and lis.id_lista_material = op.id_lista_material"+
            " and op.id_orden_fabricacion = '" + req.body.nro_op + "'";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.UpdateListaMaterial = async function (req, res){
        if(req.body.activo == null || req.body.id_lista == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "update cx_va_lista_mat set activo=" + req.body.activo + " where id_lista_material=" + req.body.id_lista + "";

        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectExisteLoteVa = async function (req, res){
        if(req.body.id_despacho == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "select count(*) from cx_desposte where id_despacho = '" + req.body.id_despacho  + "' and tipo_desposte='DESPOSTE' and unidades_despostadas > 0";

        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectFolio = async function (req, res){
        if(req.body.folio == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "select prod.cod_art Cod_Art, Descripcion, sp_loca Sub_Inventario, lot_number Folio, sp_fecp Fecha_Prod, " +
        "sp_hora Hora_Pesaje, sp_oper Usuario, sp_brut Bruto, sp_tara Tara, sp_neto Neto " +
        "from packing.cx_prod_desp prod left join packing.cx_articulo art on prod.cod_art = art.cod_art where lot_number='" + req.body.folio+"';";
        
        standarizatedQuery(sqlQuery, res);
    }

    exports.InsertControlEtiquetado = async function (req, res){
        if(req.body.folio == null || req.body.conDetalle == null || req.body.motivo == null || req.body.id_us_autenticado == null || req.body.usrControl == null)
            return;

        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "Insert into cx_control_Etiquetado(Folio, con_Detalle, Motivo, fecha_control, usuario_Control_Etiquetado, operario_Control) values('"+req.body.folio+"', '"+req.body.conDetalle+"', '"+req.body.motivo+"', date(sysdate()), '"+req.body.id_us_autenticado+"', '"+ req.body.usrControl +"')";

        standarizatedQuery(sqlQuery, res);
    }

    exports.getControlData = async function(req, res){
        if(req.body.fechaFrom == null || req.body.fechaTo == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "select prod.lot_number Folio, ctrE.con_Detalle, ctrE.Motivo, ctrE.fecha_Control, " +
            "ctrE.operario_Control Operario_Linea, ctrE.usuario_Control_Etiquetado Operario, " +
            "prod.cod_art Cod_Art, art.Descripcion, prod.sp_loca Sub_Inventario, prod.sp_fecp Fecha_Prod, " +
            "prod.sp_oper Usuario, prod.sp_brut Bruto, prod.sp_tara Tara, prod.sp_neto Neto " +
            "from packing.cx_control_etiquetado ctrE inner join packing.cx_prod_desp prod on ctrE.Folio = prod.lot_number "+
            "inner join packing.cx_articulo art on prod.cod_art = art.cod_art where ctrE.fecha_Control between '" + req.body.fechaFrom + "' and '"+ req.body.fechaTo+"'";
        
        if(req.body.usuario != null && req.body.usuario != "")
            sqlQuery += " and prod.sp_oper='" + usuario + "'";
        
        if(req.body.usuarioCtrl != null && req.body.usuarioCtrl != "")
            sqlQuery += " and ctrE.usuario_control_etiquetado= '"+usuarioCtrl+"'";

        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectUserControlLinea = async function (req, res){
        let sqlQuery = "select Nombre_Usuario user from cx_control_linea";

        standarizatedQuery(sqlQuery, res);
    }

    exports.SelectUserControlEtiquetado = async function (req, res){
        let sqlQuery = "select distinct(acc.id_usuario) user from cx_acceso acc " +
            "inner join cx_usuario usr on acc.id_usuario = usr.id_usuario "+
            "where acc.id_usuario != 'respina' and usr.activo = 'S' and acc.id_tipo_acceso='mnuControlEtiquetado';";

        standarizatedQuery(sqlQuery, res);
    }

    exports.DeleteControlLinea = async function (req, res){
        if(req.body.Nombre == null || req.body.Rut == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "delete from cx_control_linea where Nombre_usuario = '"+ req.body.Nombre +"' and Rut = '"+ req.body.Rut +"'";

        standarizatedQuery(sqlQuery, res);
    }

    exports.InsertControlLinea = async function (req, res){
        if(req.body.Nombre == null || req.body.Rut == null)
            return;
        
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "Insert into cx_control_linea(Nombre_Usuario, Rut) values ('"+ req.body.Nombre +"', '"+ req.body.Rut +"')";

        standarizatedQuery(sqlQuery, res);
    }

    /* -------------------INTEGRADOR-------------------- */

    exports.UpdateProdEliminadas = async function (req, res){
        if(req.body.v_sp_docs == null || req.body.v_sp_fecs == null || req.body.lot_number == null)
            return;
         
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "update cx_prod_desp set sp_sali='*', sp_docs='" + req.body.v_sp_docs + "', sp_fecs='" + req.body.v_sp_fecs + "' where lot_number='" + req.body.v_lot_number + "'";
        standarizatedQuery(sqlQuery, res);
    }

    exports.UpdateProdCambioCodigo = async function (req, res){
        if(req.body.v_sp_docs == null || req.body.v_sp_fecs == null || req.body.lot_number == null || req.body.v_sp_prod == null)
            return;
         
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;

        let sqlQuery = "update cx_prod_desp set cod_art='" + req.body.v_sp_prod + "', sp_sali='Y', sp_docs='" + req.body.v_sp_docs + "', "+
            "sp_fecs='" + req.body.v_sp_fecs + "' where lot_number='" + req.body.v_lot_number + "'";
        standarizatedQuery(sqlQuery, res);
    }

    exports.UpdateProdPinchaje0 = async function (req, res){
        if( req.body.lot_number == null )
            return;
         
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "update cx_prod_desp set sp_sali = '0' where lot_number = '" + req.body.v_lot_number + "' and sp_sali = '?'";
        standarizatedQuery(sqlQuery, res);
    }

    exports.UpdateProdPinchajeW = async function (req, res){
        if(req.body.lot_number == null || req.body.v_sp_sale == null || req.body.v_numero_documento == null)
            return;
         
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "update packing.cx_prod_desp set sp_sali='" + req.body.v_sp_sale + "' ,sp_docs='" +
            req.body.v_numero_documento + "',sp_fecs='" + date_format(sysdate(), "%Y/%m/%d") +
            "' where lot_number = '" + req.body.v_lot_number + "'";
        standarizatedQuery(sqlQuery, res);
    }

    exports.UpdateProdPinchajeU = async function (req, res){
        if(req.body.lot_number == null || req.body.v_sp_sale == null || req.body.v_numero_documento == null)
            return;
         
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "update packing.cx_prod_desp set sp_sali='" + req.body.v_sp_sale + "' ,sp_docs='" +
            req.body.v_numero_documento + "',sp_fecs='" + date_format(sysdate(), "%Y/%m/%d") +
            "' where lot_number = '" + req.body.v_lot_number + "'";
        standarizatedQuery(sqlQuery, res);
    }

    exports.UpdateProdPinchajeD = async function (req, res){
        if(req.body.lot_number == null)
            return;
         
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "update packing.cx_prod_desp set sp_sali='0', sp_docs='', sp_fecs where lot_number = '" + req.body.v_lot_number + "'";
        standarizatedQuery(sqlQuery, res);
    }
    
    exports.SelectArticulosEtiqueta = async function (req, res){
        let sqlQuery = "SELECT ar.cod_art, ar.descripcion, ar.codigo_sag,tara, ar.id_eti, et.nombre, ar.peso_minimo,"+
            " ar.peso_maximo,ar.peso_fijo, ar.dias_duracion, ar.calculo_fecha"+
            " FROM packing.cx_articulo ar left join packing.cx_etiqueta et on ar.id_eti= et.id_eti"+
            " where 1=1";

        standarizatedQuery(sqlQuery, res);
    }
    /* --------------- FIN INTEGRADOR ------------------ */

    /* -------------------- CAP. PACKING ---------------- */
    exports.UpdateProdCodArt = async function (req, res){
        if(req.body.producto == null || req.body.codvarr_bx == null)
            return;
         
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;        
        
        let sqlQuery = "update cx_prod_desp set cod_art='" + req.body.producto + "' WHERE lot_number='" + req.body.codvar + "'";
        standarizatedQuery(sqlQuery, res);
    }

    exports.UpdateProdCodArtPeso = async function (req, res){
        if(req.body.producto == null || req.body.codvar == null || req.body.vbruto == null || req.body.vneto == null)
            return;
         
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "update cx_prod_desp set cod_art='" + req.body.producto + "', sp_neto=" + req.body.vneto + ", sp_brut=" + req.body.vbruto + "  WHERE lot_number='" + req.body.codvar + "'";
        standarizatedQuery(sqlQuery, res);
    }

    exports.UpdateProdCodigoBarra = async function (req, res){
        if(req.body.codigobarra1 == null || req.body.codvarr == null)
            return;
         
        var includes = verifyCaracters(req, res);
        if(!includes)
            return;
        
        let sqlQuery = "update cx_prod_desp set codbarrgs1='" + req.body.codigobarra1 + "' where lot_number ='" + req.body.codvarr + "'";
        standarizatedQuery(sqlQuery, res);
    }

    /* -------------- FIN CAP. PACKING ----------------- */
    /*-------------------------------------------------*/
/* ------------------ END FUNCTIONS -------------------*/