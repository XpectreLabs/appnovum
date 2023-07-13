import React from 'react';
import Box from "@mui/material/Box";
import Styles from './RegisterBank.module.css';

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PaymentsIcon from "@mui/icons-material/Payments";

// import { LayoutAdmin } from '../hocs/Layout.tsx';
//import { Default } from '../components/RegistrarCajaOBanco/Default.tsx';

//<Default />

export const RegistrarCajaOBanco = () => {
  return (
    <Box>
      <Box className={Styles.nav}>
        <Box className={Styles.counter}>
          <p>Cuentas</p>
          <div className={Styles.chip}>01</div>
        </Box>

        <Box>
          <Paper
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Buscar"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>

        <Box>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            classes={{
              root: Styles.btnCreateAccount,
            }}
          >
            Crear nueva cuenta
          </Button>
        </Box>
      </Box>

      <Box className={Styles.container}>
        <Box className={Styles.information}>
          <Box className={Styles.headInfo}>
            <div>
              <AccountBalanceIcon />
              <span>Pepito</span>
            </div>

            <div>
              <IconButton type="button" aria-label="Edit">
                <EditOutlinedIcon />
              </IconButton>
              <IconButton type="button" aria-label="Edit">
                <MoreVertIcon />
              </IconButton>
            </div>
          </Box>
          <Box className={Styles.bankInfo}>
            <p>Banco</p>
            <p>$6,000,000.00</p>
          </Box>
        </Box>
      </Box>

      <Box className={Styles.container}>
        <Box className={Styles.information}>
          <Box className={Styles.headInfo}>
            <div>
              <PaymentsIcon />
              <span>Caja</span>
            </div>

            <div>
              <IconButton type="button" aria-label="Edit">
                <EditOutlinedIcon />
              </IconButton>
              <IconButton type="button" aria-label="Edit">
                <MoreVertIcon />
              </IconButton>
            </div>
          </Box>
          <Box className={Styles.bankInfo}>
            <p>Efectivo</p>
            <p>$803,500.00</p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}