import * as React from "react";
import Styles from '../../pages/RegisterPay/RegisterPay.module.css';
import fn from "../../components/utility.tsx";
import fng from './Funciones.tsx';
import { DataIngreso } from './DataIngreso.tsx';
import { IngresoResponsive } from './IngresoResponsive.tsx';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Formik, Form } from "formik";
import { Modal, message, Input, DatePicker } from "antd";
import dayjs, { Dayjs } from 'dayjs';
import type { DatePickerProps } from "antd";
import { useState } from "react";
import * as Yup from "yup";
let data = [];
const user_id = localStorage.getItem('user_id');

async function cargarDatos(buscar=false,setListaDatos='',ejecutarSetInitialValues=false,setInitialValues='',setOpen='',setConfirmLoading='')
{
  let scriptURL = localStorage.getItem('site')+"/listIngresosFuturos";
  let dataUrl = {user_id};
  let busqueda = "";
  let metodo_id = fn.obtenerValor("#stTipoB");
  let estado_id = fn.obtenerValor("#stEstadoB");

  if(metodo_id!==undefined&&estado_id!==undefined&&buscar===false) {
    metodo_id = fn.obtenerValor("#stTipoB");
    estado_id = fn.obtenerValor("#stEstadoB");

    scriptURL = localStorage.getItem('site')+"/listIngresosFuturosFiltro";
    dataUrl = {user_id,metodo_id,estado_id};
  }

  if(buscar) {
    scriptURL = localStorage.getItem('site')+"/listIngresosFuturosB";
    busqueda = fn.obtenerValor('#txtSearch');
    dataUrl = {user_id, busqueda};
  }

  console.log("Data:");
  console.log(dataUrl);
  await fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify(dataUrl),
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then((resp) => resp.json())
  .then(function(info) {
    data = fng.obtenerList(info);
    console.log(data);

    if(buscar)
      setListaDatos(data);

    if(metodo_id!==undefined&&estado_id!==undefined&&buscar===false) {
      setListaDatos(data);
    }

    if(ejecutarSetInitialValues) {
      setInitialValues(({hdId:'',txtNombre:'', txtConcepto:'', stTipo:'0', stCategoria:'', txtMonto:'', txtFechaTentativaCobro:''}));
      setTimeout(() => {
        setListaDatos(data);
        setOpen(false);
        setConfirmLoading(false);
      }, 1000);
    }
  })
  .catch(error => {
    console.log(error.message);
    console.error('Error!', error.message);
  });
}


if(user_id!==""&&user_id!==null) {
  cargarDatos();
}

export const TableRegistrarIngresosFuturos = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirm2Loading, setConfirm2Loading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();  
  const [cargandoVisible, setCargandoVisible] = useState(true);
  const [listaDatos, setListaDatos] = useState([]);
  const [initialValues, setInitialValues] = useState(({hdId:'',txtNombre:'', txtConcepto:'', stTipo:'0', stCategoria:'', txtMonto:'', txtFechaTentativaCobro:''}));
  const [cantidadV, setCantidadV] = useState("0");
  const [modal2Open, setModal2Open] = useState(false);
  const [idIngresoStatus, setIdIngresoStatus] = useState("0");
  const [cobrado, setCobrado] = useState(false);

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
      setInitialValues(({hdId:fn.obtenerValor("#hdId"),txtNombre:fn.obtenerValor("#txtNombre"), txtConcepto:fn.obtenerValor("#txtConcepto"), stTipo:fn.obtenerValor("#stTipo"), stCategoria:fn.obtenerValor("#stCategoria"), txtMonto:fn.obtenerValor("#txtMonto"), txtFechaTentativaCobro:dayjs(dateString)}));
  };

  let idSI = setInterval(() => {
    if(!data)
      console.log("Vacio");
    else {
      console.log("Ja"+data.length);
      setCantidadV(data.length);
      setListaDatos(data);
      setCargandoVisible(false);
      clearInterval(idSI);
    }
  }, 1000);

  const showModal = () => {
    setOpen(true);
  };

  const validarSubmit = () => {
    fn.ejecutarClick("#txtAceptar");
  }

  const handleCancel = () => {
    setInitialValues(({hdId:' ',txtNombre:'', txtConcepto:'', stTipo:'0', stCategoria:'', txtMonto:'', txtFechaTentativaCobro:''}));

    setTimeout(()=>{
      setOpen(false);
    },500);
  };

  const showModalC = (id,tipo) => {
    tipo===1?setCobrado(false):setCobrado(true);
    setModal2Open(true);

    setTimeout(()=>{
      setIdIngresoStatus(id);
    },500);
  };

  const cobrar = () => {
    const scriptURL = localStorage.getItem('site')+"/cambiarCobrado"; // deberia es
    const ingresos_futuros_id = idIngresoStatus;
    const dataU = {ingresos_futuros_id};
    setConfirm2Loading(true)
    fetch(scriptURL, {
       method: 'POST',
       body: JSON.stringify(dataU),
       headers:{
         'Content-Type': 'application/json'
       }
     })
    .then((resp) => resp.json())
    .then(function(info) {
      cargarDatos(true,setListaDatos);
      setTimeout(()=> {
        setModal2Open(false);
        setConfirm2Loading(false)
      },600)
    })
    .catch(error => {
      console.log(error.message);
      console.error('Error!', error.message);
    });
  };


  const revertir = () => {
    const scriptURL = localStorage.getItem('site')+"/revertirCobro"; // deberia es
    const ingresos_futuros_id = idIngresoStatus;
    const dataU = {ingresos_futuros_id};
    setConfirm2Loading(true)
    fetch(scriptURL, {
       method: 'POST',
       body: JSON.stringify(dataU),
       headers:{
         'Content-Type': 'application/json'
       }
     })
    .then((resp) => resp.json())
    .then(function(info) {
      cargarDatos(true,setListaDatos);
      setTimeout(()=> {
        setModal2Open(false);
        setConfirm2Loading(false)
      },600)
    })
    .catch(error => {
      console.log(error.message);
      console.error('Error!', error.message);
    });
  };

  const buscarPorSelect = () => {
    cargarDatos(false,setListaDatos);
  }

  return (
    <Box>
      <Box className={Styles.nav}>
        <Box className={Styles.counter}>
          <p>Cuentas</p>
          <div id="NumCuenta" className={Styles.chip}>{cantidadV}</div>
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
              onKeyUp={()=>{ fn.ejecutarClick("#btnBuscar") }}
            />
            <IconButton id="btnBuscar" type="button" sx={{ p: "10px" }} aria-label="search" onClick={()=>{cargarDatos(true,setListaDatos)}}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>

        <Box className={Styles.itemSearch}>
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
          <label htmlFor="stTipoB" className={Styles.LblFilter}>Método</label>
          <select
            name="stTipoB"
            id="stTipoB"
            className={`${Styles.ModalSelect} ${Styles.ModalSelectBrVerde}`}
            onChange={buscarPorSelect}
          >
            <option value="0">Todos</option>
            <option value="1">Efectivo</option>
            <option value="2">Transferencia</option>
          </select>

          <label htmlFor="stEstadoB" className={Styles.LblFilter}>Estado</label>
          <select
             name="stEstadoB"
            id="stEstadoB"
            className={`${Styles.ModalSelect} ${Styles.ModalSelectBrVerde}`}
            onChange={buscarPorSelect}
          >
            <option value="0">Todos</option>
            <option value="1">Cobrados</option>
            <option value="2">No cobrados</option>
          </select>

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
            Ingreso futuro
          </Button>
        </Box>
      </Box>

      <DataIngreso arrays={listaDatos} showModal={showModal} setInitialValues={setInitialValues} showModalC={showModalC} />

      <Box className={cargandoVisible?'u-textCenter':'u-textCenter u-ocultar'}>
        <CircularProgress />
      </Box>

      <Box>
        {listaDatos.map((data) => (
          <IngresoResponsive
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
            txtFechaTentativaCobro: Yup.date()
              .required("* Fecha tentativa de cobro"),
          })}
          onSubmit={(values, actions) => {
            let scriptURL = localStorage.getItem('site')+"/altaIngresoFuturo";

            if(values.hdId)
                scriptURL = localStorage.getItem('site')+"/editarIngresoFuturo";

            const txtNombre = values.txtNombre;
            const txtConcepto = values.txtConcepto;
            const stTipo = values.stTipo;
            const stCategoria = values.stCategoria;
            const txtMonto = values.txtMonto;
            const txtFechaTentativaCobro = values.txtFechaTentativaCobro;
            const ingresos_futuros_id = values.hdId;
            const dataC = {txtNombre, txtConcepto, stTipo, stCategoria, txtMonto, user_id, txtFechaTentativaCobro, ingresos_futuros_id};

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
                content: 'Los datos del ingreso fue guardado con éxito',
              });
              console.log("Si");

              cargarDatos(false,setListaDatos,true,setInitialValues,setOpen,setConfirmLoading);
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

                <Input
                  id="hdId"
                  name="hdId"
                  type="hidden"
                  value={values.hdId}
                />

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
                  className={Styles.ModalSelect}
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
                  <option value="1">Cliente</option>
                  <option value="2">Otros</option>
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
                  className={Styles.ModalCantidad}
                  id='txtFechaTentativaCobro'
                  name='txtFechaTentativaCobro'
                  placeholder='Fecha tentativa de cobro'
                  value={values.txtFechaTentativaCobro}
                  onChange={onChange}
                  onBlur={handleBlur}
                />

                <div>
                  <p><strong>{(errors.txtNombre || errors.txtConcepto || errors.stTipo || errors.stCategoria || errors.txtMonto || errors.txtFechaTentativaCobro)?`Errores:`:null}</strong></p>
                  {errors.txtNombre? (<p>{errors.txtNombre}</p>):null}
                  {errors.txtConcepto? (<p>{errors.txtConcepto}</p>):null}
                  {errors.stTipo? (<p>{errors.stTipo}</p>):null}
                  {errors.stCategoria? (<p>{errors.stCategoria}</p>):null}
                  {errors.txtMonto? (<p>{errors.txtMonto}</p>):null}
                  {errors.txtFechaTentativaCobro? (<p>{errors.txtFechaTentativaCobro}</p>):null}
                </div>

                <div className='u-textLeft' style={{display:"none"}}>
                  <input id="txtAceptar" type="submit" value="Aceptar" />
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal>

      <Modal
        width={340}
        title=""
        centered
        open={modal2Open}
        onOk={cobrado?revertir:cobrar}
        onCancel={() => setModal2Open(false)}
        okText={cobrado?"Cambiar":"Cobrar"}
        cancelText="Cancelar"
        className={cobrado?`${Styles.ModalCobrar} Cobrado u-textCenter`:`${Styles.ModalCobrar} u-textCenter`}
        confirmLoading={confirm2Loading}
      >
        <input type="hidden" name="idIngresoFuturo" id="idIngresoFuturo" value={idIngresoStatus} />
        <span className={cobrado?"icon-icoCobrarDismiss":"icon-icoCobrar"}></span>
        <p><strong>{cobrado?"¿Este ingreso ya fue cobrado, desea cambiarlo?":"Deseas cobrar esta deuda, se creará un registro de cobro"}</strong></p>
      </Modal>
    </Box>
  );
}