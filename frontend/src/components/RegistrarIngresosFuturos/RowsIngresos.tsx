import * as React from "react";
import Styles from "../../pages/RegisterPay/RegisterPay.module.css";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import Chip from "@mui/material/Chip";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, message, Popconfirm } from 'antd';


const confirm = () => {
  console.log("Yes");
  message.success('Click on Yes');
};

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
}: {
  pullData: any;
  page: any;
  rowsPerPage: any;
}) => {

  const editar = () => {
    alert("Editar");
  }

  const eliminar = (id) => {
    //if(window.confirm("¿Desea eliminar este registro? "+id)) {}
  }

  return (
    <>
      {pullData
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
            <TableCell align="left">
              {data.state == "Cobrado" ? (
                <Chip
                  icon={<PriceCheckIcon />}
                  size="small"
                  label="Cobrado"
                  className={Styles.chipTable}
                />
              ) : (
                <Chip
                  icon={<MoneyOffIcon />}
                  label="No cobrado"
                  size="small"
                  className={Styles.chipTableNo}
                />
              )}
            </TableCell>
            <TableCell align="left">{data.date_cashed}</TableCell>
            <TableCell className="Iconos-Tabla" align="right">
              <EditIcon className="u-efecto slideRight" onClick={editar} />
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
    </>
  );
};

/*
arrays.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
  page
  rowsPerPage
*/