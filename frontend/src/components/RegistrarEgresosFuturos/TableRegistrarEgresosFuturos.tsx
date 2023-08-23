import * as React from "react";
import Styles from "../../pages/RegisterDischargeCash/DischargeCash.module.css";
import fn from "../../components/utility.tsx";
import fng from './Funciones.tsx';
import { DataEgreso } from './DataEgreso.tsx';
import { EgresoResponsive } from './EgresoResponsive.tsx';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Field, Formik, Form } from "formik";
import { Modal, message, Input, DatePicker } from "antd";
import dayjs, { Dayjs } from 'dayjs';
import type { DatePickerProps } from "antd";
import { useState } from "react";
import * as Yup from "yup";
let data = [];
const user_id = localStorage.getItem('user_id');

async function cargarDatos(buscar=false,setListaDatos='',ejecutarSetInitialValues=false,setInitialValues='',setOpen='',setConfirmLoading='')
{
  let scriptURL = localStorage.getItem('site')+"/listEgresosFuturos";
  let dataUrl = {user_id};
  let busqueda = "";
  let metodo_id = fn.obtenerValor("#stTipoB");
  let estado_id = fn.obtenerValor("#stEstadoB");

  if(buscar) {
    scriptURL = localStorage.getItem('site')+"/listEgresosFuturosB";
    busqueda = fn.obtenerValor('#txtSearch');
    dataUrl = {user_id, busqueda};
  }

  if(metodo_id!==undefined&&estado_id!==undefined&&buscar===false) {
    metodo_id = fn.obtenerValor("#stTipoB");
    estado_id = fn.obtenerValor("#stEstadoB");

    scriptURL = localStorage.getItem('site')+"/listEgresosFuturosFiltro";
    dataUrl = {user_id,metodo_id,estado_id};
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
    data = fng.obtenerList(info);

    if(buscar)
      setListaDatos(data);

    if(metodo_id!==undefined&&estado_id!==undefined&&buscar===false) {
      setListaDatos(data);
    }

    if(ejecutarSetInitialValues) {
      setInitialValues(({hdId:'',txtNombre:'', txtConcepto:'', stTipo:'0', stCategoria:'', txtMonto:'', txtFechaTentativaPago:''}));
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

export const TableRegistrarEgresosFuturos = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [cargandoVisible, setCargandoVisible] = useState(true);
  const [listaDatos, setListaDatos] = useState([]);
  const [initialValues, setInitialValues] = useState(({hdId:'',txtNombre:'', txtConcepto:'', stTipo:'', stCategoria:'', txtMonto:'', txtFechaTentativaPago:''}));
  const [cantidadV, setCantidadV] = useState("0");

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setInitialValues(({hdId:fn.obtenerValor("#hdId"),txtNombre:fn.obtenerValor("#txtNombre"), txtConcepto:fn.obtenerValor("#txtConcepto"), stTipo:fn.obtenerValor("#stTipo"), stCategoria:fn.obtenerValor("#stCategoria"), txtMonto:fn.obtenerValor("#txtMonto"), txtFechaTentativaPago:dayjs(dateString)}));
  };

  let idSI = setInterval(() => {
    if(!data)
      console.log("Vacio");
    else {
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
    setInitialValues(({hdId:'',txtNombre:'', txtConcepto:'', stTipo:'0', stCategoria:'', txtMonto:'', txtFechaTentativaCobro:''}));

    setTimeout(()=>{
      setOpen(false);
    },500);
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
              <option value="1">Pagados</option>
              <option value="2">No pagados</option>
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
            Egreso futuro
          </Button>
        </Box>
      </Box>

      <DataEgreso arrays={listaDatos} showModal={showModal} setInitialValues={setInitialValues} />

      {/* <div>
          <img className={cargandoVisible? "Cargando Mt mostrarI-b Sf" : "Cargando Mt Sf"}  src="img/loading.gif" alt="" />
      </div> */}

      <Box className={cargandoVisible?'u-textCenter':'u-textCenter u-ocultar'}>
        <CircularProgress />
      </Box>

      <Box>
        {listaDatos.map((data) => (
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
            txtFechaTentativaPago: Yup.date()
              .required("* Fecha tentativa de pago"),
          })}
          onSubmit={(values, actions) => {
            let scriptURL = localStorage.getItem('site')+"/altaEgresoFuturo";

            if(values.hdId)
                scriptURL = localStorage.getItem('site')+"/editarEgresoFuturo";

            const txtNombre = values.txtNombre;
            const txtConcepto = values.txtConcepto;
            const stTipo = values.stTipo;
            const stCategoria = values.stCategoria;
            const txtMonto = values.txtMonto;
            const txtFechaTentativaPago = values.txtFechaTentativaPago;
            const egresos_futuros_id = values.hdId;
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

              cargarDatos(false,setListaDatos,true,setInitialValues,setOpen,setConfirmLoading);
            })
            .catch(error => {
              console.log(error.message);
              console.error('Error!', error.message);
            });
          }}
        >
          {({ values, errors, handleChange, handleBlur, handleSubmit}) => {
            return (
              <Form
                className={`${Styles.ModalForm}`}
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

                <Field
                  className={`${Styles.ModalFormText}`}
                  placeholder="Nombre de la persona o empresa"
                  type="text"
                  id="txtNombre"
                  name="txtNombre" />

                <Field
                  className={`${Styles.ModalFormText}`}
                  placeholder="Concepto"
                   type="text"
                  id="txtConcepto"
                  name="txtConcepto" />

                <Field
                  as="select"
                  name="stTipo"
                  id="stTipo"
                  className={`${Styles.ModalSelect}`}
                >
                  <option value="0">Efectivo o banco</option>
                  <option value="1">Efectivo</option>
                  <option value="2">Banco</option>
                </Field>

                <Field
                  as="select"
                  name="stCategoria"
                  id="stCategoria"
                  className={`${Styles.ModalSelect} u-sinMargen`}
                >
                  <option value="0">Categoria</option>
                  <option value="3">Proveedores o costo de mercancía</option>
                  <option value="4">Gastos fijos</option>
                  <option value="5">Nómina</option>
                  <option value="6">Deuda</option>
                  <option value="7">Impuestos</option>
                  <option value="8">Otros</option>
                </Field>

                <Field
                  className={`${Styles.ModalCantidad} ${Styles.ModalCantidadMr} ${Styles.ModalFormText}`}
                  placeholder="Monto"
                  type="text"
                  id="txtMonto"
                  name="txtMonto" />

                <DatePicker
                    // format={dateFormatList}
                  className={`${Styles.ModalCantidad}`}
                  id='txtFechaTentativaPago'
                  name='txtFechaTentativaPago'
                  placeholder='Fecha tentativa de pago'
                  value={values.txtFechaTentativaPago}
                  onChange={onChange}
                  onBlur={handleBlur}
                />

                <div>
                  <p><strong>{(errors.txtNombre || errors.txtConcepto || errors.stTipo || errors.stCategoria || errors.txtMonto || errors.txtFechaTentativaPago)?`Errores:`:null}</strong></p>
                  {errors.txtNombre? (<p>{errors.txtNombre}</p>):null}
                  {errors.txtConcepto? (<p>{errors.txtConcepto}</p>):null}
                  {errors.stTipo? (<p>{errors.stTipo}</p>):null}
                  {errors.stCategoria? (<p>{errors.stCategoria}</p>):null}
                  {errors.txtMonto? (<p>{errors.txtMonto}</p>):null}
                  {errors.txtFechaTentativaPago? (<p>{errors.txtFechaTentativaPago}</p>):null}
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
