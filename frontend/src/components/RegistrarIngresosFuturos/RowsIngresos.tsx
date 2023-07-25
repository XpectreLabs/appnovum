import * as React from "react";
import Styles from "../../pages/RegisterPay/RegisterPay.module.css";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import Chip from "@mui/material/Chip";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";

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