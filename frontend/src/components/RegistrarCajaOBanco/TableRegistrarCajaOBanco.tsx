import React, { useState } from "react";
import Box from "@mui/material/Box";
import Styles from "../../pages/RegisterBank/RegisterBank.module.css";
import fn from "../../components/utility.tsx";
import fng from "./Funciones.tsx";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from "@mui/icons-material/Search";
import { Modal, Input, message } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// import { CSVLink} from 'react-csv';
import * as XLSX from 'xlsx/xlsx.mjs';

interface IData {
  Nombre: string;
  Tipo: string;
  Cantidad: string;
}

let listData: IData[];
const user_id = localStorage.getItem('user_id');

export const TableRegistrarCajaOBanco = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [cargandoVisible, setCargandoVisible] = useState(true);
  const [initialValues, setInitialValues] = useState(({ hdId:'',txtNombre: '',stTipo:'', txtCantidadActual: ''}));    
  const [cargandoModal, setcargandoModal] = useState(false)

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setInitialValues(({ hdId:'',txtNombre: '',stTipo:'0', txtCantidadActual: ''}));
    setTimeout(()=>{
      setOpen(false);
      setcargandoModal(false);
    },400);
  };

  const abrirModal = () => {
    setcargandoModal(true);
    showModal();
  }

  async function cargarDatos (ejecutarSetCargando=true,buscar=false) {
    let scriptURL = localStorage.getItem('site')+"/listCajasBancos";
    let dataUrl;
    let busqueda = "";
    dataUrl = {user_id};

    if(buscar) {
      scriptURL = localStorage.getItem('site')+"/listCajasBancosB";
      busqueda = fn.obtenerValor('#txtSearch');
      dataUrl = {user_id, busqueda};
    }

    await fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify(dataUrl),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then((resp) => resp.json())
    .then(function(info) {
      fng.mostrarData(info);
      listData = [];
      listData = Object.assign(fng.obtenerData(info));
      if(ejecutarSetCargando)
        setCargandoVisible(false)
    })
    .catch(error => {
      console.log(error.message);
      console.error('Error!', error.message);
    });
  }

  if(user_id!==""&&user_id!==null) {
    cargarDatos();
  }

  const validarSubmit = () => {
    fn.ejecutarClick("#txtAceptar");
  }

  const cargaDatosEdicion = () => {
      setTimeout(()=>{
        if(fn.obtenerValor("#hdId")) {
          const id_cb = fn.obtenerValor("#hdId");
          const cuenta = fn.obtenerValorHtml("#spName"+id_cb);
          const cantidad = fn.obtenerValorHtml("#spCantidadO"+id_cb);
          const id_tipo = fn.obtenerValorHtml("#spTipoO"+id_cb);
          setInitialValues(({ hdId:id_cb,txtNombre: cuenta,stTipo:id_tipo, txtCantidadActual: cantidad}));
        }
        setTimeout(()=>{
          setcargandoModal(false);
        },300);
      },800);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter')
      fn.ejecutarClick("#btnBuscar");
  };

  const handleOnExcel = () => {
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(listData);
    XLSX.utils.book_append_sheet(wb,ws,"CajaoBanco");
    XLSX.writeFile(wb,"CajayBanco.xlsx");
  }

  return (
    <Box>
      <Box className={Styles.nav}>
        <Box className={Styles.counter}>
          <p>Cuentas</p>
          <div id="NumCuenta" className={Styles.chip}>0</div>
        </Box>

        <Box className={Styles.itemSearch}>
          <Paper
            // component="form"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
            className="BorderContenedor"
          >
            <InputBase
              id="txtSearch"
              name="txtSearch"
              sx={{ ml: 1, flex: 1 }}
              placeholder="Buscar"
              inputProps={{ "aria-label": "search google maps" }}
              onKeyDown={ handleKeyDown }
            />
            <IconButton id="btnBuscar" type="button" sx={{ p: "10px" }} aria-label="search" onClick={ () => { cargarDatos (false,true); }}>
              <SearchIcon />
            </IconButton>

            <input style={{display:"none"}} id="btnAbrirModal" type="button" value="Abril Modal" onClick={abrirModal} />
          </Paper>
        </Box>

        <Box className={Styles.itemButton}>
          <Button
            variant="contained"
            color="success"
            startIcon={<FileDownloadIcon />}
            classes={{
              root: Styles.btnCreateAccount,
            }}
            onClick={handleOnExcel}
          >
            Exportar a excel
          </Button>
          {/* <CSVLink className={Styles.btnCreateAccount} data={ listData } filename="Reporte caja y banco" onClick={()=>{console.log(listData)}}><FileDownloadIcon />Exportar a excel</CSVLink> */}
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
            Crear nueva cuenta
          </Button>
        </Box>
      </Box>


      {/* <Box className={Styles.nav}>
        <Box></Box>
        <Box className={Styles.itemSearch}>
          <p><strong>Efectivo:</strong> $4,350.00</p>
          <p><strong>Banco:</strong> $8,200.00</p>
          <p><strong>Total en las cuentas:</strong> $8,200.00</p>
        </Box>
      </Box> */}

      <Box className={cargandoVisible?'u-textCenter':'u-textCenter u-ocultar'}>
        <CircularProgress />
      </Box>

      <div id="listDatos" style={{ paddingBottom: "50px" }}></div>

      <Modal
        title=""
        open={open}
        onOk={validarSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Guardar"
        cancelText="Cancelar"
        afterOpenChange={cargaDatosEdicion}
      >
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            txtNombre: Yup.string()
              .min(2, "El nombre de la cuenta es demasiado corto")
              .required("* Nombre de la cuenta"),
            stTipo: Yup.number()
            .min(1, "Efectivo o banco")
            .required("* Efectivo o banco"),
            txtCantidadActual:  Yup.number()
            .min(1, "Al menos un digito")
            .required("* Cantidad actual"),
          })}
          onSubmit={(values, actions) => {
              let scriptURL = localStorage.getItem('site')+"/altaCajaBanco";

              if(values.hdId)
                scriptURL = localStorage.getItem('site')+"/editarCajaBanco";

              const txtNombre = values.txtNombre;
              const stTipo = values.stTipo;
              const txtCantidadActual = values.txtCantidadActual;
              const caja_banco_id = values.hdId;
              const dataU = {txtNombre, stTipo, txtCantidadActual, user_id, caja_banco_id};
              setConfirmLoading(true);

              fetch(scriptURL, {
                method: 'POST',
                body: JSON.stringify(dataU),
                headers:{
                  'Content-Type': 'application/json'
                }
              })
              .then((resp) => resp.json())
              .then(function(dataR) {
                messageApi.open({
                  type: 'success',
                  content: 'La cuenta fue guardada con éxito',
                });
                setInitialValues(({ hdId:'',txtNombre: '',stTipo:'0', txtCantidadActual: ''}));

                setTimeout(() => {
                    setOpen(false);
                    setConfirmLoading(false);
                    cargarDatos(false);
                }, 1200);
              })
              .catch(error => {
                console.log(error.message);
                console.error('Error!', error.message);
              });
            }}>
          {({ handleBlur,handleChange, handleSubmit, errors, values }) => {
            return (
              <Form
                className={Styles.ModalForm}
                name="form-contacto"
                id="form-contacto"
                method="post"
                onSubmit={handleSubmit}
              >
                {contextHolder}

                <Box className={cargandoModal?'u-textCenter':'u-textCenter u-ocultar'}>
                  <CircularProgress />
                </Box>

                <div className={cargandoModal?'u-textCenter u-ocultar':'u-textCenter'}>
                  <Input
                    id="hdId"
                    name="hdId"
                    type="hidden"
                    value={values.hdId}
                  />
                  <Input
                    placeholder="Nombre de la cuenta"
                    type="text"
                    id="txtNombre"
                    name="txtNombre"
                    value={values.txtNombre}
                    onChange={handleChange}
                    onBlur={handleBlur} /* PREGUNTAR PARA QUE SIRVE */
                    autoCapitalize="off"
                  />

                  <select
                    name="stTipo"
                    className={Styles.ModalSelect}
                    id="stTipo"
                    value={values.stTipo}
                    onChange={handleChange}
                  >
                    <option value="0">Efectivo o banco</option>
                    <option value="1">Efectivo</option>
                    <option value="2">Banco</option>
                  </select>

                  <Input
                    className={Styles.ModalCantidad}
                    placeholder="Cantidad actual"
                    type="text"
                    id="txtCantidadActual"
                    name="txtCantidadActual"
                    value={values.txtCantidadActual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <div>
                    <p><strong>{(errors.txtNombre || errors.stTipo || errors.txtCantidadActual)?`Errores:`:null}</strong></p>
                    {errors.txtNombre ? (<p>{errors.txtNombre}</p>) : null}
                    {errors.stTipo ? (<p>{errors.stTipo}</p>) : null}
                    {errors.txtCantidadActual ? (<p>{errors.txtCantidadActual}</p>) : null}
                  </div>
                </div>

                <div className='u-textLeft' style={{display:"none"}}>
                  <input id="txtAceptar" type="submit" value="Aceptar" />
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </Box>
  );
};