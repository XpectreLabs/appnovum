import fn from "../../components/utility.tsx";

function obtenerList(info) {
  let listData = [];
  for(let j=0; j < (Object.keys(info['listEgresosFuturos']).length); j++) {
    const fechaCreacion = fn.convertirFecha(info['listEgresosFuturos'][j]['fecha_creacion']);
    const fechaPago = fn.convertirFecha(info['listEgresosFuturos'][j]['fecha_tentativa_pago']);
    const fechaEnQueSePago = fn.convertirFecha(info['listEgresosFuturos'][j]['fecha_pago']);
    const state = fechaEnQueSePago?fechaEnQueSePago:'No pagado';

    let item = {
      "id": info['listEgresosFuturos'][j]['egresos_futuros_id'],
      "date_created": fechaCreacion,
      "id_payment_method": info['listEgresosFuturos'][j]['tipo_pago_id'],
      "payment_method": info['listEgresosFuturos'][j]['tipos_pagos']['tipo_pago'],
      "id_category": info['listEgresosFuturos'][j]['categoria_id'],
      "category": info['listEgresosFuturos'][j]['categorias']['categoria'],
      "name": info['listEgresosFuturos'][j]['nombre_persona_empresa'],
      "concept": info['listEgresosFuturos'][j]['concepto'],
      "amount": info['listEgresosFuturos'][j]['monto'],
      "date_to_pay": fechaPago,
      "date_to_pay_o": fn.obtenerFecha(info['listEgresosFuturos'][j]['fecha_tentativa_pago']),
      "state": state,
      "date_cashed": fechaEnQueSePago
    }
    listData.push(item);
  }
  return listData;
}

export default {obtenerList};