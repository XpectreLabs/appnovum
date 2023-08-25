import * as React from "react";
import Styles from "../../pages/RegisterPay/RegisterPay.module.css";
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

export const RowsIngreso = ({
  pullData,
  page,
  rowsPerPage,
  showModal,
  setInitialValues,
  showModalC
}: {
  pullData: any;
  page: any;
  rowsPerPage: any;
  showModal: Function;
  setInitialValues: Function;
  showModalC: Function;
}) => {

  const editar = (id) => {
    showModal();
    console.log(pullData);
    const pos = fn.buscarPosicionArreglo(pullData,id);

    setTimeout(()=> {
      setInitialValues(({hdId:id,txtNombre:pullData[pos]['name'], txtConcepto:pullData[pos]['concept'], stTipo:pullData[pos]['id_payment_method'], stCategoria:pullData[pos]['id_category'], txtMonto:pullData[pos]['amount'], txtFechaTentativaCobro:dayjs(pullData[pos]['date_to_pay_o'])}));
    },100);
  }

  const eliminar = (id) => {
    const scriptURL = localStorage.getItem('site')+"/eliminarIngresoFuturo"; // deberia es
    const ingresos_futuros_id = id;
    const dataU = {ingresos_futuros_id};

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
      {Object.keys(pullData).length>0?pullData
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
                  <span>Transferencia</span>
                </div>
              )}
            </TableCell>
            <TableCell align="left">{data.category}</TableCell>
            <TableCell align="left">{data.name}</TableCell>
            <TableCell align="left">{data.concept}</TableCell>
            <TableCell align="left">${formatNumber(data.amount)}</TableCell>
            <TableCell align="left">{data.date_to_pay}</TableCell>
            <TableCell align="left" className="IcoEstados Ingreso">
              {data.state == "Cobrado" ? (
                <Chip
                  icon={<span className="icon-icoCobrar"></span>}
                  size="small"
                  label="Cobrado"
                  className={Styles.chipTable}
                  onClick={()=>{showModalC(data.id,2)}}
                />
              ) : (
                <Chip
                  icon={<span className="icon-icoCobrarDismiss"></span>}
                  label="No cobrado"
                  size="small"
                  className={Styles.chipTableNo}
                  onClick={()=>{showModalC(data.id,1)}}
                />
              )}
            </TableCell>
            <TableCell align="left" className={data.date_cashed!=="Pendiente"?data.statusCobro==true?Styles.txtCobrado:Styles.txtNoCobrado:null}>{data.date_cashed}</TableCell>
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
        )):(
          <TableRow
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell scope="row" colSpan={10} align="center"><strong>No hay ingresos registrados</strong></TableCell>
          </TableRow>
        )}
    </>
  );
};

/*
arrays.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
  page
  rowsPerPage
*/