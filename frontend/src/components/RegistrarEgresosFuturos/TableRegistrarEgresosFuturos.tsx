import * as React from "react";
import Styles from "../../pages/RegisterDischargeCash/DischargeCash.module.css";
import fn from "../../components/utility.tsx";

import { DataEgreso } from './DataEgreso.tsx';
import { EgresoResponsive } from './EgresoResponsive.tsx';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";

// import Chip from "@mui/material/Chip";
// import PriceCheckIcon from "@mui/icons-material/PriceCheck";
// import MoneyOffIcon from "@mui/icons-material/MoneyOff";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";

// import { LayoutAdmin } from '../hocs/Layout.tsx';
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Formik, Form } from "formik";
import { Modal, message, Input, DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import { useState } from "react";
import * as Yup from "yup";
let data = [];

/*interface Column {
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
  { id: "payment_method", label: "Método de pago", minWidth: 100 },
  { id: "category", label: "Categoria", minWidth: 100 },
  { id: "name", label: "Nombre de la persona o empresa", minWidth: 100 },
  { id: "concept", label: "Concepto", minWidth: 100 },
  { id: "amount", label: "Monto", minWidth: 100 },
  { id: "date_to_pay", label: "Fecha de pago tentativa", minWidth: 100 },
  { id: "state", label: "Estado", minWidth: 100 },
  { id: "date_cashed", label: "Fecha en la que se pago", minWidth: 100 },
];

interface Data {
  date_created: string;
  payment_method: any;
  category: string;
  name: string;
  concept: string;
  amount: any;
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
  amount: any,
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

const formatNumber = (number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);*/




  async function cargarDatos () {
    console.log("Yes");
    const scriptURL = 'http://localhost:3001/listEgresosFuturos';
    const user_id = localStorage.getItem('user_id');
    const dataUrl = {user_id};

    await fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify(dataUrl),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then((resp) => resp.json())
    .then(function(info) {
      console.log(Object.keys(info['listEgresosFuturos']));
      let listData = [];
      for(let j=0; j < (Object.keys(info['listEgresosFuturos']).length); j++) {
        const fechaCreacion = fn.convertirFecha(info['listEgresosFuturos'][j]['fecha_creacion']);
        const fechaPago = fn.convertirFecha(info['listEgresosFuturos'][j]['fecha_tentativa_pago']);
        const fechaEnQueSePago = fn.convertirFecha(info['listEgresosFuturos'][j]['fecha_pago']);
        //console.log(fechaCreacion+" -> "+fechaCobro+" -> "+fechaEnQueSeCobro);
        const state = fechaEnQueSePago?fechaEnQueSePago:'No pagado';

        let item = {
          "id": info['listEgresosFuturos'][j]['egresos_futuros_id'],
          "date_created": fechaCreacion,
          "payment_method": info['listEgresosFuturos'][j]['tipos_pagos']['tipo_pago'],
          "category": info['listEgresosFuturos'][j]['categorias']['categoria'],
          "name": info['listEgresosFuturos'][j]['nombre_persona_empresa'],
          "concept": info['listEgresosFuturos'][j]['concepto'],
          "amount": info['listEgresosFuturos'][j]['monto'],
          "date_to_pay": fechaPago,
          "state": state,
          "date_cashed": fechaEnQueSePago
        }
         listData.push(item);
      }
      data = listData;
      //fn.asignarValorInnerHTML("NumCuenta",data.length);//Ajustar
    })
    .catch(error => {
      console.log(error.message);
      console.error('Error!', error.message);
    });
  }

  cargarDatos();

export const TableRegistrarEgresosFuturos = () => {
const [open, setOpen] = useState(false);
const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(10);
const [initialValues, setInitialValues] = useState(({hdId:' ',txtNombre:'', txtConcepto:'', stTipo:'', stCategoria:'', txtMonto:''}));
const [cantidadV, setCantidadV] = useState("0");
const [tabla, setTabla] = useState<Data[]>([]);
const [listaDatos, setListaDatos] = useState([]);
const [cargandoVisible, setCargandoVisible] = useState(true);


let idSI = setInterval(() => {
  if(!data)
    alert("Vacio");
  else {
    console.log("Ja"+data.length);
    setCantidadV(data.length);
    setListaDatos(data);
    setCargandoVisible(false);
    clearInterval(idSI);
  }
}, 1000);


/*const handleChangePage = (event: unknown, newPage: number) => {
  setPage(newPage);
};*/

const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  console.log(date, dateString);
};
/*
const handleChangeRowsPerPage = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};*/




const showModal = () => {
  setOpen(true);
};

const validarSubmit = () => {
  fn.ejecutarClick("#txtAceptar");
}

const validarSubit = () => {
  addDataTable();
}

const handleCancel = () => {
  setInitialValues(({hdId:' ',txtNombre:'', txtConcepto:'', stTipo:'0', stCategoria:'', txtMonto:''}));

  setTimeout(()=>{
    setOpen(false);
  },500);
};

const addDataTable = () => {
  const scriptURL = 'https://admin.bioesensi-crm.com/altaEgresoFuturo';
  const txtNombre = fn.obtenerValor('#txtNombre');
  const txtConcepto = fn.obtenerValor('#txtConcepto');
  const stTipo = fn.obtenerValor('#stTipo');
  const stCategoria = fn.obtenerValor('#stCategoria');
  const txtMonto = fn.obtenerValor('#txtMonto');
  const user_id = localStorage.getItem('user_id');
  const txtFechaTentativaPago = fn.obtenerValor('#txtFechaTentativaPago');
  const egresos_futuros_id = fn.obtenerValor("#hdId");
  const dataC = {txtNombre, txtConcepto, stTipo, stCategoria, txtMonto, user_id, txtFechaTentativaPago, egresos_futuros_id};

  setConfirmLoading(true);
  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify(dataC),
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    messageApi.open({
      type: 'success',
      content: 'Los datos del ingreso fue guardada con éxito',
    });
    console.log("Si");

    const scriptURLG = 'https://admin.bioesensi-crm.com/listEgresosFuturos';
    const dataUrlG = {user_id};

    fetch(scriptURLG, {
      method: 'POST',
      body: JSON.stringify(dataUrlG),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then((resp) => resp.json())
    .then(function(info) {
      //console.log("Si -> 1");
      let listData = [];
      for(let j=0; j < (Object.keys(info['listEgresosFuturos']).length); j++) {
        const fechaCreacion = fn.convertirFecha(info['listEgresosFuturos'][j]['fecha_creacion']);
        const fechaPago = fn.convertirFecha(info['listEgresosFuturos'][j]['fecha_tentativa_pago']);
        const fechaEnQueSePago = fn.convertirFecha(info['listEgresosFuturos'][j]['fecha_pago']);
        const state = fechaEnQueSePago?fechaEnQueSePago:'No pagado';

        let item = {
          "id": info['listEgresosFuturos'][j]['ingresos_futuros_id'],
          "date_created": fechaCreacion,
          "payment_method": info['listEgresosFuturos'][j]['tipos_pagos']['tipo_pago'],
          "category": info['listEgresosFuturos'][j]['categorias']['categoria'],
          "name": info['listEgresosFuturos'][j]['nombre_persona_empresa'],
          "concept": info['listEgresosFuturos'][j]['concepto'],
          "amount": info['listEgresosFuturos'][j]['monto'],
          "date_to_pay": fechaPago,
          "state": state,
          "date_cashed": fechaEnQueSePago
        }
        listData.push(item);
      }
      //console.log("Si -> 2");
      data = listData;

      setInitialValues(({hdId:'',txtNombre:'', txtConcepto:'', stTipo:'0', stCategoria:'', txtMonto:''}));
      setTimeout(() => {
        setListaDatos(data);
        setOpen(false);
        setConfirmLoading(false);
      }, 1000);

      //console.log(listData);
      //console.log(data);
      //setCargandoVisible(false)
    })
    .catch(error => {
      console.log(error.message);
      console.error('Error!', error.message);
    });
  })
  .catch(error => {
    console.log(error.message);
    console.error('Error!', error.message);
  });
  //setOpen(false);
};


const buscarEnTabla = () => {
  const scriptURL = 'https://admin.bioesensi-crm.com/listEgresosFuturosB';
  const busqueda = fn.obtenerValor('#txtSearch');
  const user_id = localStorage.getItem('user_id');
  const dataU = {busqueda, user_id};

  fetch(scriptURL, {
     method: 'POST',
     body: JSON.stringify(dataU),
     headers:{
       'Content-Type': 'application/json'
     }
   })
  .then((resp) => resp.json())
  .then(function(info) {
    let listData = [];

    for(let j=0; j < (Object.keys(info['listEgresosFuturos']).length); j++) {
      const fechaCreacion = fn.convertirFecha(info['listEgresosFuturos'][j]['fecha_creacion']);
      const fechaPago = fn.convertirFecha(info['listEgresosFuturos'][j]['fecha_tentativa_pago']);
      const fechaEnQueSePago = fn.convertirFecha(info['listEgresosFuturos'][j]['fecha_pago']);
      const state = fechaEnQueSePago?fechaEnQueSePago:'No pagado';

      let item = {
        "id": info['listEgresosFuturos'][j]['ingresos_futuros_id'],
        "date_created": fechaCreacion,
        "payment_method": info['listEgresosFuturos'][j]['tipos_pagos']['tipo_pago'],
        "category": info['listEgresosFuturos'][j]['categorias']['categoria'],
        "name": info['listEgresosFuturos'][j]['nombre_persona_empresa'],
        "concept": info['listEgresosFuturos'][j]['concepto'],
        "amount": info['listEgresosFuturos'][j]['monto'],
        "date_to_pay": fechaPago,
        "state": state,
        "date_cashed": fechaEnQueSePago
      }
      listData.push(item);
    }

    data = listData;
    setListaDatos(data);
   })
   .catch(error => {
     alert(error.message);
     console.error('Error!', error.message);
   });
};


  return (
    <Box>
      <Modal
          title=""
          open={open}
          onOk={validarSubmit}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          okText="Guardar"
          cancelText="Cancelar"
        >
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            txtNombre: Yup.string()
              .min(3, "El nombre de la persona o empresa es demasiado corto")
              .required("* Nombre de la persona o empresa"),
            txtConcepto: Yup.string()
              .min(3, "El concepto es demasiado corto")
              .required("* Concepto"),
            stTipo: Yup.number()
              .min(1, "Efectivo o banco")
              .required("* Efectivo o banco"),
            stCategoria: Yup.number()
              .min(1, "Categoria")
              .required("* Categoria"),
            txtMonto:  Yup.number()
              .min(1, "Al menos un digito")
              .required("* Monto"),
            // txtFechaTentativaCobro: Yup.date()
            //   .required("* Fecha tentativa de cobro"),
          })}
          onSubmit={(values, actions) => {
            validarSubit();
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            return (
              <>
                  {
                    <Form
                      className={`${Styles.ModalForm}`}
                      name="form-contacto"
                      id="form-contacto"
                      method="post"
                      onSubmit={handleSubmit}
                    >

                      {contextHolder}

                      <Input
                        placeholder="Nombre de la persona o empresa"
                        type="text"
                        id="txtNombre"
                        name="txtNombre"
                        value={values.txtNombre}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoCapitalize="off"
                      />

                      <Input
                        placeholder="Concepto"
                        type="text"
                        id="txtConcepto"
                        name="txtConcepto"
                        value={values.txtConcepto}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoCapitalize="off"
                      />

                      <select
                        name="stTipo"
                        id="stTipo"
                        className={`${Styles.ModalSelect}`}
                        value={values.stTipo}
                        onChange={handleChange}
                      >
                        <option value="0">Efectivo o banco</option>
                        <option value="1">Efectivo</option>
                        <option value="2">Banco</option>
                      </select>

                      <select
                        name="stCategoria"
                        id="stCategoria"
                        className={`${Styles.ModalSelect} u-sinMargen`}
                        value={values.stCategoria}
                        onChange={handleChange}
                      >
                        <option value="0">Categoria</option>
                        <option value="3">Proveedores o costo de mercancía</option>
                        <option value="4">Gastos fijos</option>
                        <option value="5">Nómina</option>
                        <option value="6">Deuda</option>
                        <option value="7">Impuestos</option>
                        <option value="8">Otros</option>
                      </select>

                      <Input
                        className={`${Styles.ModalCantidad} ${Styles.ModalCantidadMr}`}
                        placeholder="Monto"
                        type="text"
                        id="txtMonto"
                        name="txtMonto"
                        value={values.txtMonto}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <DatePicker
                        // format={dateFormatList}
                        className={`${Styles.ModalCantidad}`}
                        id='txtFechaTentativaPago'
                        name='txtFechaTentativaPago'
                        placeholder='Fecha tentativa de pago'
                        onChange={onChange}
                      />

                      <div>
                        <p><strong>{(errors.txtNombre)?`Errores:`:null}</strong></p>
                        {errors.txtNombre??errors.txtNombre} 
                        {errors.txtConcepto??errors.txtConcepto} 
                        {errors.stTipo??errors.stTipo} 
                        {errors.stCategoria??errors.stCategoria} 
                        {errors.txtMonto??errors.txtMonto}
                        {/* {errors.txtFechaTentativaCobro??errors.txtFechaTentativaCobro} */}
                      </div>

                      <div className='u-textLeft' style={{display:"none"}}>
                        <input id="txtAceptar" type="submit" value="Aceptar" />
                      </div>
                    </Form>
                  }
              </>
            );
          }}
        </Formik>
      </Modal>


      <Box className={Styles.nav}>
        <Box className={Styles.counter}>
          <p>Cuentas</p>
          <div className={Styles.chip}>{cantidadV}</div>
        </Box>

        <Box className={Styles.itemSearch}>
          <Paper
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputBase
              id="txtSearch"
              name="txtSearch"
              sx={{ ml: 1, flex: 1 }}
              placeholder="Buscar"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={buscarEnTabla}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>

        <Box className={Styles.itemButton}>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            classes={{
              root: Styles.btnCreateAccount,
            }}
            onClick={showModal}
          >
            Egreso futuro
          </Button>
        </Box>
      </Box>

      <DataEgreso arrays={listaDatos} arrays2={tabla} />

      <div>
          <img className={cargandoVisible? "Cargando Mt mostrarI-b Sf" : "Cargando Mt Sf"}  src="img/loading.gif" alt="" />
      </div>
      <Box>
        {data.map((data) => (
          <EgresoResponsive
            key={data.id}
            date_created={data.date_created}
            payment_method={data.payment_method}
            category={data.category}
            name={data.name}
            concept={data.concept}
            amount={data.amount}
            date_to_pay={data.date_to_pay}
            state={data.state}
            date_cashed={data.date_cashed}
          />
        ))}
      </Box>

      <div>
        {tabla.map((data) => (
          <EgresoResponsive
            key={data.id}
            date_created={data.date_created}
            payment_method={data.payment_method}
            category={data.category}
            name={data.name}
            concept={data.concept}
            amount={data.amount}
            date_to_pay={data.date_to_pay}
            state={data.state}
            date_cashed={data.date_cashed}
          />
        ))}
      </div>

      {/* <Paper
        sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}
        className={Styles.divTable}
      >
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
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                    >
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
      </Paper> */}

      {/* <Box className={Styles.results}>
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
                <p>23/06/2023</p>
              </li>
              <li>
                <p>Santiago Elan Dido</p>
              </li>
              <li>
                <p>Renta de local en venta</p>
              </li>
              <li>
                <p>$ {formatNumber(8000000)}</p>
              </li>
              <li>
                <p>Pendiente</p>
              </li>
              <li>
                <Chip
                  icon={<MoneyOffIcon />}
                  label="No cobrado"
                  size="small"
                  className={Styles.chipTableNo}
                />
              </li>
            </Box>
          </Box>
        </Box>
      </Box> */}
    </Box>
  );
};
