const express = require("express");
const bodyparser = require('body-parser');
const cors = require('cors');

/* --------- CONTROLLERS ------------------------*/
const packing = require('./controllers/packingController');
/* --------- END CONTROLLERS --------------------*/

const PORT = process.env.PORT || 3050;
const app = express();

app.disable('x-powered-by');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());

/* --------- Routes -------------*/
app.get('/', (req, res)=>{
    res.send('WELCOME TO MY API');
});

/*-------------- COEXCA ------------------------*/

app.post('/UpdateClave', packing.UpdateClave);
app.post('/UpdateEstadoLote', packing.UpdateEstadoLote);
app.post('/UpdateArticuloImpreso', packing.UpdateArticuloImpreso);
app.post('/UpdateArticuloImpresoB', packing.UpdateArticuloImpresoB);
app.post('/UpdateSelectKilosParc', packing.UpdateSelectKilosParc);
app.post('/UpdateParcial', packing.UpdateParcial);
app.post('/SelectConsultaParcial', packing.SelectConsultaParcial);
app.post('/InsertProductoTmp', packing.InsertProductoTmp);
app.post('/InsertProductoParcial', packing.InsertProductoParcial);
app.post('/SelectCamTmp', packing.SelectCamTmp);
app.post('/SelectCamParc', packing.SelectCamParc);
app.post('/InsertProductoTest', packing.InsertProductoTest);
app.post('/SelectProductoTest', packing.SelectProductoTest);
app.post('/InsertProductoDesp', packing.InsertProductoDesp);
app.post('/InsertProductoParciales', packing.InsertProductoParciales);
app.post('/InsertError', packing.InsertError);
app.post('/InsertAndUpdateLote', packing.InsertAndUpdateLote);
app.post('/SelectUsuario', packing.SelectUsuario);
app.post('/SelectKilosDesposte', packing.SelectKilosDesposte);
app.post('/SumKilosMari', packing.SumKilosMari);
app.post('/SumVaraCaliente', packing.SumVaraCaliente);
app.post('/SumKilosSub', packing.SumKilosSub);
app.post('/SelectArticuloV', packing.SelectArticuloV);
app.post('/SelectListado', packing.SelectListado);
app.post('/SelectLotes', packing.SelectLotes);
app.post('/SelectLotesOp', packing.SelectLotesOp);
app.post('/SelectProduccion', packing.SelectProduccion);
app.post('/SelectListadoEquipos', packing.SelectListadoEquipos);
app.post('/SelectArticulos', packing.SelectArticulos);
app.post('/SelectArticulosEstado', packing.SelectArticulosEstado);
app.post('/SelectProduccionDesposte', packing.SelectProduccionDesposte);
app.post('/SelectAcceso', packing.SelectAcceso);
app.post('/SelectEstadoLote', packing.SelectEstadoLote);
app.post('/SelectVersion', packing.SelectVersion);
app.post('/SelectFechaVersion', packing.SelectFechaVersion);
app.post('/SelectEtiquetaNutricional', packing.SelectEtiquetaNutricional);
app.post('/SelectProduccion', packing.SelectProduccion);
app.post('/SelectProduccionTotal', packing.SelectProduccionTotal);
app.post('/SelectListadoUsuarios', packing.SelectListadoUsuarios);
app.post('/SelectProduccionCantidad', packing.SelectProduccionCantidad);
app.post('/SelectSubinventario', packing.SelectSubinventario);
app.post('/SelectEquipoPesaje', packing.SelectEquipoPesaje);
app.post('/SelectEquipoPesajeIP', packing.SelectEquipoPesajeIP);
app.post('/SelectSecuencia', packing.SelectSecuencia);
app.post('/SelectExisteLote', packing.SelectExisteLote);
app.post('/SelectSubinventarios', packing.SelectSubinventarios);
app.post('/SelectEquipos', packing.SelectEquipos);
app.post('/SelectTipoPesaje', packing.SelectTipoPesaje);
app.post('/UpdateRango', packing.UpdateRango);
app.post('/InsertLogRango', packing.InsertLogRango);
app.post('/UpdateEstadoArticulo', packing.UpdateEstadoArticulo);
app.post('/InsertLogArticulo', packing.InsertLogArticulo);
app.post('/UpdateArticuloGeneral', packing.UpdateArticuloGeneral);
app.post('/InsertLogLote', packing.InsertLogLote);
app.post('/SelectArticulosCx', packing.SelectArticulosCx);
app.post('/SelectAmbiente', packing.SelectAmbiente);
app.post('/SelectHistoricoArticulo', packing.SelectHistoricoArticulo);
app.post('/UpdateParcialFolio', packing.UpdateParcialFolio);
app.post('/SelectNetoParciales', packing.SelectNetoParciales);
app.post('/UpdateProdDesp', packing.UpdateProdDesp);
app.post('/SelectEstadoParcial', packing.SelectEstadoParcial);
app.post('/UpdateQuitarParcial', packing.UpdateQuitarParcial);
app.post('/SelectCountLotes', packing.SelectCountLotes);
app.post('/SelectOpFecha', packing.SelectOpFecha);
app.post('/SelectPackingOp', packing.SelectPackingOp);
app.post('/SelectListaMaterial', packing.SelectListaMaterial);
app.post('/SelectVaOp', packing.SelectVaOp);
app.post('/SelectListaMaterialDetalle', packing.SelectListaMaterialDetalle);
app.post('/SelectListaMaterialCabecera', packing.SelectListaMaterialCabecera);
app.post('/SelectHistorialMaterial', packing.SelectHistorialMaterial);
app.post('/SelectVaOrdenesCabecera', packing.SelectVaOrdenesCabecera);
app.post('/SelectArticulosListaMaterial', packing.SelectArticulosListaMaterial);
app.post('/SelectVaLotes', packing.SelectVaLotes);
app.post('/SelectTipoProceso', packing.SelectTipoProceso);
app.post('/InsertListaMaterialCabecera', packing.InsertListaMaterialCabecera);
app.post('/InsertListaMaterialDetalle', packing.InsertListaMaterialDetalle);
app.post('/InsertListaMaterial', packing.InsertListaMaterial);
app.post('/SelectCountLotesMaterial', packing.SelectCountLotesMaterial);
app.post('/SelectCantidadMaterial', packing.SelectCantidadMaterial);
app.post('/DeleteMaterial', packing.DeleteMaterial);
app.post('/InsertLogMaterial', packing.InsertLogMaterial);
app.post('/SelectLastInsert', packing.SelectLastInsert);
app.post('/InsertOp', packing.InsertOp);
app.post('/UpdateEstadoOp', packing.UpdateEstadoOp);
app.post('/SelectCountOp', packing.SelectCountOp);
app.post('/SelectCountMaterialActiva', packing.SelectCountMaterialActiva);
app.post('/SelectEnListaMaterial', packing.SelectEnListaMaterial);
app.post('/SelectSumKilosE', packing.SelectSumKilosE);
app.post('/SelectSumKilosS', packing.SelectSumKilosS);
app.post('/SelectDescripcionLista', packing.SelectDescripcionLista);
app.post('/UpdateListaMaterial', packing.UpdateListaMaterial);
app.post('/SelectExisteLoteVa', packing.SelectExisteLoteVa);
app.post('/SelectFolio', packing.SelectFolio);
app.post('/InsertControlEtiquetado', packing.InsertControlEtiquetado);
app.post('/getControlData', packing.getControlData);
app.post('/SelectUserControlLinea', packing.SelectUserControlLinea);
app.post('/SelectUserControlEtiquetado', packing.SelectUserControlEtiquetado);
app.post('/DeleteControlLinea', packing.DeleteControlLinea);
app.post('/InsertControlLinea', packing.InsertControlLinea);

app.post('/UpdateProdEliminadas', packing.UpdateProdEliminadas);
app.post('/UpdateProdCambioCodigo', packing.UpdateProdCambioCodigo);
app.post('/UpdateProdPinchaje0', packing.UpdateProdPinchaje0);
app.post('/UpdateProdPinchajeW', packing.UpdateProdPinchajeW);
app.post('/UpdateProdPinchajeU', packing.UpdateProdPinchajeU);
app.post('/UpdateProdPinchajeD', packing.UpdateProdPinchajeD);
app.post('/SelectArticulosEtiqueta', packing.SelectArticulosEtiqueta);

//CAPTURA PACKING
app.post('/UpdateProdCodArt', packing.UpdateProdCodArt);
app.post('/UpdateProdCodArtPeso', packing.UpdateProdCodArtPeso);
app.post('/UpdateProdCodigoBarra', packing.UpdateProdCodigoBarra);

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`));