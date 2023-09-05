import * as React from "react";
import Styles from "../../pages/RegisterPay/RegisterPay.module.css";
import fn from "../../components/utility.tsx";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CloseOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';

const cancel = () => {};
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
  showModalC,
  showModalE,
  showModalCl
}: {
  pullData: any;
  page: any;
  rowsPerPage: any;
  showModal: Function;
  setInitialValues: Function;
  showModalC: Function;
  showModalE: Function;
  showModalCl: Function;
}) => {

  const editar = (id) => {
    showModal();
    console.log(pullData);
    const pos = fn.buscarPosicionArreglo(pullData,id);

    setTimeout(()=> {
      setInitialValues(({hdId:id,txtNombre:pullData[pos]['name'], txtConcepto:pullData[pos]['concept'], stTipo:pullData[pos]['id_payment_method'], stCategoria:pullData[pos]['id_category'], txtMonto:pullData[pos]['amount'], txtFechaTentativaCobro:dayjs(pullData[pos]['date_to_pay_o'])}));
    },100);
  }
  return (
    <>
      {Object.keys(pullData).length>0?pullData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((data) => (
          <TableRow
            key={data.name}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
              {!data.statusBorrado? data.state == "Cobrado" ? (
                <Chip
                  icon={<span className="icon-icoCobrar"></span>}
                  size="small"
                  label="Cobrado"
                  className={Styles.chipTable}
                  onClick={()=>{showModalC(data.id,2,data.date_created_o)}}
                />
              ) : (
                <Chip
                  icon={<span className="icon-icoCobrarDismiss"></span>}
                  label="No cobrado"
                  size="small"
                  className={Styles.chipTableNo}
                  onClick={()=>{showModalC(data.id,1,data.date_created_o)}}
                />
              ):(
                <Chip
                  label="Cancelado"
                  size="small"
                  className={Styles.chipTableNo}
                />
              )}
            </TableCell>
            <TableCell align="left" className={data.date_cashed!=="Pendiente"?data.statusCobro==true?Styles.txtCobrado:Styles.txtNoCobrado:null}>{!data.statusBorrado?data.date_cashed +" "+ data.textRetraso:"Cancelado"}</TableCell> 
            <TableCell className="Iconos-Tabla" align="right">
              {!data.statusBorrado?<CloseOutlined onClick={()=>{showModalCl(data.id)}} className="u-efecto slideRight u-marginR-5" />:null}
              {!data.statusBorrado?<EditIcon className="u-efecto slideRight" onClick={()=>{editar(data.id)}} />:null}
              <DeleteIcon className="icoBorrar u-efecto slideRight" onClick={()=>{showModalE(data.id)}}/>
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