import * as React from "react";
import Styles from "../../pages/RegisterPay/RegisterPay.module.css";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";

export const IngresoResponsive = ({
  date_created,
  payment_method,
  category,
  name,
  concept,
  amount,
  date_to_pay,
  state,
  date_cashed,
}: {
  date_created: string;
  payment_method: string;
  category: string;
  name: string;
  concept: string;
  amount: number;
  date_to_pay: string;
  state: string;
  date_cashed: string;
}) => {
  const formatNumber = (number) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);

  return (
    <Box>
      <Box className={Styles.results}>
        <Box className={Styles.conten}>
          <Box className={Styles.resultResponsive}>
            <div className={Styles.btnEdit}>
              <IconButton aria-label="delete" size="small">
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </div>
            <Box className={Styles.columnas}>
              <li>Fecha de creación:</li>
              <li>Persona o empresa:</li>
              <li>Concepto:</li>
              <li>Monto:</li>
              <li>Fecha tentativa de pago:</li>
              <li>Estatus:</li>
              <li>
                <p>{date_created}</p>
              </li>
              <li>
                <p>{name}</p>
              </li>
              <li>
                <p>{concept}</p>
              </li>
              <li>
                <p>$ {formatNumber(amount)}</p>
              </li>
              <li>
                <p>{date_to_pay}</p>
              </li>
              <li>
                {state == "Cobrado" ? (
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
              </li>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
