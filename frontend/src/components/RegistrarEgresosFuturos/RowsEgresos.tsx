import * as React from "react";
import Styles from "../../pages/RegisterDischargeCash/DischargeCash.module.css";
import fn from "../../components/utility.tsx";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {message, Popconfirm } from 'antd';
import dayjs, { Dayjs } from 'dayjs';


const cancel = () => {
  message.error('Click on No');
};

const formatNumber = (number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);

export const RowsEgresos = ({
  pullData,
  page,
  rowsPerPage,
  showModal,
  setInitialValues
}: {
  pullData: any;
  page: any;
  rowsPerPage: any;
  showModal: Function;
  setInitialValues: Function;
}) => {

  const editar = (id) => {

    showModal();
    console.log(pullData);
    const pos = fn.buscarPosicionArreglo(pullData,id);

    setTimeout(()=> {
      setInitialValues(({hdId:id,txtNombre:pullData[pos]['name'], txtConcepto:pullData[pos]['concept'], stTipo:pullData[pos]['id_payment_method'], stCategoria:pullData[pos]['id_category'], txtMonto:pullData[pos]['amount'], txtFechaTentativaPago:dayjs(pullData[pos]['date_to_pay_o'])}));
    },100);

    /*const cuenta = fn.obtenerValorHtml("#spName"+id_cb);
    const cantidad = fn.obtenerValorHtml("#spCantidadO"+id_cb);
    const id_tipo = fn.obtenerValorHtml("#spTipoO"+id_cb);*/
  }

  const eliminar = (id) => {
    const scriptURL = localStorage.getItem('site')+"/eliminarEgresoFuturo"; // deberia es
    const egresos_futuros_id = id;
    const dataU = {egresos_futuros_id};

    fetch(scriptURL, {
       method: 'POST',
       body: JSON.stringify(dataU),
       headers:{
         'Content-Type': 'application/json'
       }
     })
    .then((resp) => resp.json())
    .then(function(info) {
      fn.agregarClase("tr[idTr='"+id+"']", "u-ocultar");
      fn.ejecutarClick("#btnBuscar");
     })
     .catch(error => {
       alert(error.message);
       console.error('Error!', error.message);
     });
  }

  return (
    <>
      {pullData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((data) => (
          <TableRow
            key={data.name}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            idTr={data.id}
          >
            <TableCell scope="row">{data.date_created}</TableCell>
            <TableCell align="left">
              {data.payment_method === "Efectivo" ? (
                <div className={Styles.typeAmount1}>
                  <RequestQuoteOutlinedIcon />
                  <span>Efectivo</span>
                </div>
              ) : (
                <div className={Styles.typeAmount2}>
                  <PaymentOutlinedIcon />
                  <span>Banco</span>
                </div>
              )}
            </TableCell>
            <TableCell align="left">{data.category}</TableCell>
            <TableCell align="left">{data.name}</TableCell>
            <TableCell align="left">{data.concept}</TableCell>
            <TableCell align="left">${formatNumber(data.amount)}</TableCell>
            <TableCell align="left">{data.date_to_pay}</TableCell>
            <TableCell align="left">
              {data.state == "Pagado" ? (
                <Chip
                  icon={<PriceCheckIcon />}
                  size="small"
                  label="Pagado"
                  className={Styles.chipTable}
                />
              ) : (
                <Chip
                  icon={<MoneyOffIcon />}
                  label="No pagado"
                  size="small"
                  className={Styles.chipTableNo}
                />
              )}
            </TableCell>
            <TableCell align="left"><p className={Styles.txtNoCobrado}>{data.date_cashed}</p></TableCell>
            <TableCell className="Iconos-Tabla" align="right">
              <EditIcon className="u-efecto slideRight" onClick={()=>{editar(data.id)}} />
              <Popconfirm
                title="¿Desea eliminar este registro?"
                description=""
                onConfirm={()=>{eliminar(data.id)}}
                onCancel={cancel}
                okText="Si"
                cancelText="No" 
              >
                <DeleteIcon className="icoBorrar u-efecto slideRight" onClick={()=>{}}/>
              </Popconfirm>
            </TableCell>
          </TableRow>
        ))}

        {/* {
          if(pullData.length===0) { 
            => (
            <TableRow>
            <TableCell scope="row" colSpan={10} align="center"><strong>No hay egresos registrados</strong></TableCell>
          </TableRow>
          {
           }
        } */}
    </>
  );
};
