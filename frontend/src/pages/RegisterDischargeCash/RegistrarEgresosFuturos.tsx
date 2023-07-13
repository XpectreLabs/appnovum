import * as React from "react";
import Styles from "./DischargeCash.module.css";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import Chip from "@mui/material/Chip";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";

// import { LayoutAdmin } from '../hocs/Layout.tsx';
import { Default } from "../../components/RegistrarIngresosFuturos/Default.js";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

interface Column {
  id:
    | "date_created"
    | "payment_method"
    | "category"
    | "name"
    | "concept"
    | "amount"
    | "date_to_pay"
    | "state"
    | "date_cashed";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "date_created", label: "Fecha de creación", minWidth: 100 },
  { id: "payment_method", label: "Método de pago", minWidth: 170 },
  { id: "category", label: "Categoria", minWidth: 100 },
  { id: "name", label: "Nombre de la persona o empresa", minWidth: 100 },
  { id: "concept", label: "Concepto", minWidth: 100 },
  { id: "amount", label: "Monto", minWidth: 100 },
  { id: "date_to_pay", label: "Fecha de pago tentativa", minWidth: 100 },
  { id: "state", label: "Estado", minWidth: 100 },
  { id: "date_cashed", label: "Fecha en la que se cobró", minWidth: 100 },
];

interface Data {
  date_created: string;
  payment_method: any;
  category: string;
  name: string;
  concept: string;
  amount: number;
  date_to_pay: string;
  state: any;
  date_cashed: any;
}

function createData(
  date_created: string,
  payment_method: any,
  category: string,
  name: string,
  concept: string,
  amount: number,
  date_to_pay: string,
  state: any,
  date_cashed: any
): Data {
  return {
    date_created,
    payment_method,
    category,
    name,
    concept,
    amount,
    date_to_pay,
    state,
    date_cashed,
  };
}

const rows = [
  createData(
    "16/06/2023",
    <div className={Styles.typeAmount1}>
      <RequestQuoteOutlinedIcon />
      <span>Efectivo</span>
    </div>,
    "Cliente",
    "Franco Espinilla",
    "Renta de local",
    1000990,
    "26/10/2023",
    <Chip
      icon={<PriceCheckIcon />}
      size="small"
      label="Cobrado"
      className={Styles.chipTable}
    />,
    <p className={Styles.txtNoCobrado}>26/10/2023</p>
  ),
];

export const RegistrarEgresosFuturos = () => {

const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(10);

const handleChangePage = (event: unknown, newPage: number) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};

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
            Egreso futuro
          </Button>
        </Box>
      </Box>

      <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}>
        <TableContainer sx={{ maxHeight: 440 }} className={Styles.table}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
