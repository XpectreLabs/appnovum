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
import { Field, Formik, Form } from "formik";
import { Modal, message, Input, DatePicker } from "antd";
import dayjs, { Dayjs } from 'dayjs';
import type { DatePickerProps } from "antd";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import * as XLSX from 'xlsx/xlsx.mjs';
import type { RangePickerProps } from 'antd/es/date-picker';

interface IData {
  Nombre: string;
  Concepto: string;
  Metodo: string;
  Categoria: string;
  Monto: string;
  Estado: string;
  FechaDeCreacion: string;
  FechaTentativaDeCobro: string;
  FechaEnQueSeCobro: string;
}

let listData: IData[];

let data = [];
const user_id = localStorage.getItem('user_id');
let fecha_creacion_o_m;

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
    listData = [];
    listData = Object.assign(fng.obtenerData(info));

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


export const TableRegistrarIngresosFuturos = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirm2Loading, setConfirm2Loading] = useState(false);
  const [confirm3Loading, setConfirm3Loading] = useState(false);
  const [confirm4Loading, setConfirm4Loading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [cargandoVisible, setCargandoVisible] = useState(true);
  const [listaDatos, setListaDatos] = useState([]);
  const [initialValues, setInitialValues] = useState(({hdId:'',txtNombre:'', txtConcepto:'', stTipo:'0', stCategoria:'', txtMonto:'', txtFechaTentativaCobro:''}));
  const [cantidadV, setCantidadV] = useState(0);
  const [modal2Open, setModal2Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);
  const [modal4Open, setModal4Open] = useState(false);
  const [idIngresoStatus, setIdIngresoStatus] = useState("0");
  const [cobrado, setCobrado] = useState(false);
  const [stMetodo,setStMetodo] = useState(0);
  const [stEstado,setStEstado] = useState(0);
  const [ocultarFechaRealizo,setOcultarFechaRealizo] = useState(true);
  const [valueFechaRealizoCobro,setValueFechaRealizoCobro] = useState('');

  if(user_id!==""&&user_id!==null) {
    cargarDatos();
  }

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setInitialValues(({hdId:fn.obtenerValor("#hdId"),txtNombre:fn.obtenerValor("#txtNombre"), txtConcepto:fn.obtenerValor("#txtConcepto"), stTipo:fn.obtenerValor("#stTipo"), stCategoria:fn.obtenerValor("#stCategoria"), txtMonto:fn.obtenerValor("#txtMonto"), txtFechaTentativaCobro:dayjs(dateString)}));
  };

  const onChange2: DatePickerProps['onChange'] = (date, dateString) => {
    if((Date.parse(dateString) >= Date.parse(fecha_creacion_o_m)))
      setValueFechaRealizoCobro(dayjs(dateString));
    else
      alert("La fecha no puede ser mayor a la fecha de creación");
  };

  let idSI = setInterval(() => {
    //cargarDatos();
    if(!data)
      console.log("Vacio");
    else {
      setCantidadV(data.length);
      setListaDatos(data);


      setCargandoVisible(false);
      clearInterval(idSI);

        /*setTimeout(()=>{
          if(fn.obtenerValor("#txtSearch")===""&&fn.obtenerValor("#stTipoB")==="0"&&fn.obtenerValor("#stEstadoB")==="0")
            fn.ejecutarClick("#btnBuscar");
        },200);*/     
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

  const showModalC = (id,tipo,fecha_c_o) => {
    tipo===1?setCobrado(false):setCobrado(true);
    setModal2Open(true);
    setValueFechaRealizoCobro('');
    setOcultarFechaRealizo(true);
    fecha_creacion_o_m = fecha_c_o.slice(0, 10);

    setTimeout(()=>{
      setIdIngresoStatus(id);
    },500);
  };

  const cobrar = () => {
    const scriptURL = localStorage.getItem('site')+"/cambiarCobrado"; // deberia es
    const ingresos_futuros_id = idIngresoStatus;
    const tipoFecha = fn.obtenerValorRadio("rdRealizoCobro");
    const fechaRealizo = dayjs(fn.obtenerValor("#txtFechaRealizoCobro"));
    const dataU = {ingresos_futuros_id,tipoFecha,fechaRealizo};

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
        setConfirm2Loading(false);
      },600)
    })
    .catch(error => {
      console.log(error.message);
      console.error('Error!', error.message);
    });
  };

  const buscarPorSelect = () => {
    cargarDatos(false,setListaDatos);
    setStMetodo(parseInt(fn.obtenerValor("#stTipoB")));
    setStEstado(parseInt(fn.obtenerValor("#stEstadoB")));
  }

  const handleOnExcel = () => {
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(listData);
    XLSX.utils.book_append_sheet(wb,ws,"IngresosFuturos");
    XLSX.writeFile(wb,"IngresosFuturos.xlsx");
  }

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current > dayjs().endOf('day');
  };

  const showModalE = (id) => {
    setModal3Open(true);
    setTimeout(()=>{
      setIdIngresoStatus(id);
    },500);
  };

  const showModalCl = (id) => {
    setModal4Open(true);
    setTimeout(()=>{
      setIdIngresoStatus(id);
    },500);
  };

  const eliminar = () => {
    const scriptURL = localStorage.getItem('site')+"/eliminarIngresoFuturo"; // deberia es
    const ingresos_futuros_id = idIngresoStatus;
    const dataU = {ingresos_futuros_id};

    setConfirm3Loading(true);

    fetch(scriptURL, {
       method: 'POST',
       body: JSON.stringify(dataU),
       headers:{
         'Content-Type': 'application/json'
       }
     })
    .then((resp) => resp.json())
    .then(function(info) {
      fn.ejecutarClick("#btnBuscar");
      setModal3Open(false);
      setConfirm3Loading(false);
     })
     .catch(error => {
       console.log(error.message);
       console.error('Error!', error.message);
     });
  }


  const cancelarIngreso = () => {
    const scriptURL = localStorage.getItem('site')+"/CancelarIngresoFuturo"; // deberia es
    const ingresos_futuros_id = idIngresoStatus;
    const dataU = {ingresos_futuros_id};

    setConfirm4Loading(true);

    fetch(scriptURL, {
       method: 'POST',
       body: JSON.stringify(dataU),
       headers:{
         'Content-Type': 'application/json'
       }
     })
    .then((resp) => resp.json())
    .then(function(info) {
      fn.ejecutarClick("#btnBuscar");
      setModal4Open(false);
      setConfirm4Loading(false);
     })
     .catch(error => {
       console.log(error.message);
       console.error('Error!', error.message);
     });
  }

  return (
    <Box>
      {contextHolder}
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
            <IconButton id="btnBuscar" type="button" sx={{ p: "10px" }} aria-label="search" onClick={()=>{cargarDatos(true,setListaDatos); setStMetodo(0); setStEstado(0);}}>
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
              value={stMetodo}
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
              value={stEstado}
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
            startIcon={<span className="icon-excel"></span>}
            classes={{
              root: Styles.btnCreateAccount,
            }}
            onClick={handleOnExcel}
          >
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
            Ingreso futuro
          </Button>
        </Box>
      </Box>

      <DataIngreso arrays={listaDatos} showModal={showModal} setInitialValues={setInitialValues} showModalC={showModalC} showModalE={showModalE} showModalCl={showModalCl} />

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
          }}
        >
          {({ handleBlur,handleChange, handleSubmit, errors, values }) => {
            return (
              <Form
                className={Styles.ModalForm}
                name="form-contacto"
                id="form-contacto"
                method="post"
                onSubmit={handleSubmit}
              >
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
                  type="number"
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
        <form
          className={Styles.ModalForm}
          name="formEstadoCobro"
          id="formEstadoCobro"
          method="post"
        >
          <input type="hidden" name="idIngresoFuturo" id="idIngresoFuturo" value={idIngresoStatus} />
          <span className={cobrado?"icon-icoCobrarDismiss":"icon-icoCobrar"}></span>
          {/* <p><strong>{cobrado?"¿Este ingreso ya fue cobrado, desea cambiarlo?":"Deseas cobrar esta deuda, se creará un registro de cobro"}</strong></p>*/}
          <p><strong>{cobrado?"¿Este ingreso ya fue cobrado, desea cambiarlo?":""}</strong></p>

          {!cobrado?(
            <div className="u-textLeft">
              <p className={Styles.RadioFechaAnterior}><strong>Fecha en que se realizo el cobro:</strong></p>
              <div>
                <input
                  type="radio"
                  name="rdRealizoCobro"
                  id="rdRealizoCobro1"
                  value="1"
                  checked={ocultarFechaRealizo?true:false}
                  onClick={()=>{setValueFechaRealizoCobro(''); setOcultarFechaRealizo(true);}}
                />
                <label className={Styles.ModalLabelRealizoCobro} htmlFor="rdRealizoCobro1"><strong>Hoy</strong></label>
              </div>
              <div className={Styles.RadioFechaAnterior}>
                <input
                  type="radio"
                  name="rdRealizoCobro"
                  id="rdRealizoCobro2"
                  value="2"
                  checked={ocultarFechaRealizo?false:true}
                  onClick={()=>{setOcultarFechaRealizo(false);}}
                />
                <label className={Styles.ModalLabelRealizoCobro} htmlFor="rdRealizoCobro2"><strong>Fecha anterior</strong></label>
              </div>

              <DatePicker
                className={`${Styles.ModalCantidad} ${Styles.ModalRealizoCobro} ${ocultarFechaRealizo?'u-ocultar':null}`}
                id='txtFechaRealizoCobro'
                name='txtFechaRealizoCobro'
                placeholder='Fecha en que se realizo'
                value={valueFechaRealizoCobro}
                onChange={onChange2}
                disabledDate={disabledDate}
              />
            </div>
          ):null}
        </form>
      </Modal>

      <Modal
        width={340}
        title=""
        centered
        open={modal3Open}
        onOk={eliminar}
        onCancel={() => setModal3Open(false)}
        okText={"Eliminar"}
        cancelText="Cancelar"
        className={`${Styles.ModalCobrar} u-textCenter`}
        confirmLoading={confirm3Loading}
      >
        <form
          className={Styles.ModalForm}
          name="formEliminar"
          id="formEliminar"
          method="post"
        >
          <input type="hidden" name="idIngresoFuturoE" id="idIngresoFuturoE" value={idIngresoStatus} />
          <p><strong>¿Desea eliminar este registro de cobro?</strong></p>
        </form>
      </Modal>


      <Modal
        width={340}
        title=""
        centered
        open={modal4Open}
        onOk={cancelarIngreso}
        onCancel={() => setModal4Open(false)}
        okText={"Cancelar ingreso"}
        cancelText="Salir"
        className={`${Styles.ModalCobrar} Cobrado u-textCenter`}
        confirmLoading={confirm4Loading}
      >
        <form
          className={Styles.ModalForm}
          name="formCancelar"
          id="formCancelar"
          method="post"
        >
          <input type="hidden" name="idIngresoFuturoE" id="idIngresoFuturoE" value={idIngresoStatus} />
          <p><strong>¿Desea cancelar este cobro?</strong></p>
        </form>
      </Modal>

    </Box>
  );
}