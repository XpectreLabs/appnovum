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
import * as XLSX from 'xlsx/xlsx.mjs';

interface IData {
  Nombre: string;
  Concepto: string;
  Metodo: string;
  Categoria: string;
  Monto: string;
  Estado: string;
  FechaDeCreacion: string;
  FechaTentativaDePago: string;
  FechaEnQueSePago: string;
}

let listData: IData[];
let data = [];
const user_id = localStorage.getItem('user_id');
let fecha_creacion_o_m;

//async function cargarDatos(buscar=false,setListaDatos='',ejecutarSetInitialValues=false,setInitialValues='',setOpen='',setConfirmLoading='')
async function cargarDatos(
  buscar=false,
  setListaDatos?:Function,
  ejecutarSetInitialValues=false,
  setInitialValues?:Function,
  setOpen?:Function,
  setConfirmLoading?:Function)
{
  let scriptURL = localStorage.getItem('site')+"/listEgresosFuturos";
  let dataUrl = {};
  let busqueda = "";
  let metodo_id = fn.obtenerValor("#stTipoB");
  let estado_id = fn.obtenerValor("#stEstadoB");

  dataUrl = {user_id};

  if(metodo_id!==undefined&&estado_id!==undefined&&buscar===false) {
    metodo_id = fn.obtenerValor("#stTipoB");
    estado_id = fn.obtenerValor("#stEstadoB");

    scriptURL = localStorage.getItem('site')+"/listEgresosFuturosFiltro";
    dataUrl = {user_id,metodo_id,estado_id};
  }

  if(buscar) {
    scriptURL = localStorage.getItem('site')+"/listEgresosFuturosB";
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
  const [confirm2Loading, setConfirm2Loading] = useState(false);
  const [confirm3Loading, setConfirm3Loading] = useState(false);
  const [confirm4Loading, setConfirm4Loading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [cargandoVisible, setCargandoVisible] = useState(true);
  const [listaDatos, setListaDatos] = useState([]);
  const [initialValues, setInitialValues] = useState(({hdId:'',txtNombre:'', txtConcepto:'', stTipo:'', stCategoria:'', txtMonto:'', txtFechaTentativaPago:''}));
  const [cantidadV, setCantidadV] = useState(0);
  const [modal2Open, setModal2Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);
  const [modal4Open, setModal4Open] = useState(false);
  const [idEgresoStatus, setIdEgresoStatus] = useState("0");
  const [pagado, setPagado] = useState(false);
  const [stMetodo,setStMetodo] = useState(0);
  const [stEstado,setStEstado] = useState(0);
  const [ocultarFechaRealizo,setOcultarFechaRealizo] = useState(true);
  const [valueFechaRealizoPago,setValueFechaRealizoPago] = useState('');

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setInitialValues(({hdId:fn.obtenerValor("#hdId"),txtNombre:fn.obtenerValor("#txtNombre"), txtConcepto:fn.obtenerValor("#txtConcepto"), stTipo:fn.obtenerValor("#stTipo"), stCategoria:fn.obtenerValor("#stCategoria"), txtMonto:fn.obtenerValor("#txtMonto"), txtFechaTentativaPago:dayjs(dateString)}));
  };

  const onChange2: DatePickerProps['onChange'] = (date, dateString) => {
    if((Date.parse(dateString) >= Date.parse(fecha_creacion_o_m)))
      setValueFechaRealizoPago(dayjs(dateString));
    else
      alert("La fecha no puede ser mayor a la fecha de creación");
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

  const showModalC = (id,tipo,fecha_c_o) => {
    tipo===1?setPagado(false):setPagado(true);
    setModal2Open(true);
    setValueFechaRealizoPago('');
    setOcultarFechaRealizo(true);
    fecha_creacion_o_m = fecha_c_o.slice(0, 10);

    setTimeout(()=>{
      setIdEgresoStatus(id);
    },500);
  };

  const pagar = () => {
    const scriptURL = localStorage.getItem('site')+"/cambiarPagado"; // deberia es
    const egresos_futuros_id = idEgresoStatus;
    const tipoFecha = fn.obtenerValorRadio("rdRealizoCobro");
    const fechaRealizo = dayjs(fn.obtenerValor("#txtFechaRealizoCobro"));
    const dataU = {egresos_futuros_id,tipoFecha,fechaRealizo};

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
    const scriptURL = localStorage.getItem('site')+"/revertirPago"; // deberia es
    const egresos_futuros_id = idEgresoStatus;
    const dataU = {egresos_futuros_id};
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
    setStMetodo(parseInt(fn.obtenerValor("#stTipoB")));
    setStEstado(parseInt(fn.obtenerValor("#stEstadoB")));
  }

  const handleOnExcel = () => {
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(listData);
    XLSX.utils.book_append_sheet(wb,ws,"EgresosFuturos");
    XLSX.writeFile(wb,"EgresosFuturos.xlsx");
  }

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current > dayjs().endOf('day');
  };

  const showModalE = (id) => {
    setModal3Open(true);
    setTimeout(()=>{
      setIdEgresoStatus(id);
    },500);
  };

  const showModalCl = (id) => {
    setModal4Open(true);
    setTimeout(()=>{
      setIdEgresoStatus(id);
    },500);
  };

  const eliminar = () => {
    const scriptURL = localStorage.getItem('site')+"/eliminarEgresoFuturo"; // deberia es
    const egresos_futuros_id = idEgresoStatus;
    const dataU = {egresos_futuros_id};

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

    const cancelarEgreso = () => {
      const scriptURL = localStorage.getItem('site')+"/CancelarEgresoFuturo"; // deberia es
      const egresos_futuros_id = idEgresoStatus;
      const dataU = {egresos_futuros_id};

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
              <option value="1">Pagados</option>
              <option value="2">No pagados</option>
              <option value="3">Atrasados</option>
              <option value="4">Cancelados</option>
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
            Egreso futuro
          </Button>
        </Box>
      </Box>

      <DataEgreso arrays={listaDatos} showModal={showModal} setInitialValues={setInitialValues} showModalC={showModalC} showModalE={showModalE} showModalCl={showModalCl} />

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
                  type="number"
                  id="txtMonto"
                  name="txtMonto" />

                <DatePicker
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

      <Modal
        width={340}
        title=""
        centered
        open={modal2Open}
        onOk={pagado?revertir:pagar}
        onCancel={() => setModal2Open(false)}
        okText={pagado?"Cambiar":"Pagar"}
        cancelText="Cancelar"
        className={pagado?`${Styles.ModalCobrar} Cobrado u-textCenter`:`${Styles.ModalCobrar} u-textCenter`}
        confirmLoading={confirm2Loading}
      >
        <input type="hidden" name="idEgresoFuturo" id="idEgresoFuturo" value={idEgresoStatus} />
        <span className={pagado?"icon-icoCobrarDismiss":"icon-icoCobrar"}></span>
        {/* <p><strong>{pagado?"¿Este egreso ya fue pagado, desea cambiarlo?":"Deseas pagar esta deuda, se creará un registro de pago"}</strong></p> */}
        <p><strong>{pagado?"¿Este egreso ya fue pagado, desea cambiarlo?":""}</strong></p>


        {!pagado?(
            <div className="u-textLeft">
              <p className={Styles.RadioFechaAnterior}><strong>Fecha en que se realizo el pago:</strong></p>
              <div>
                <input
                  type="radio"
                  name="rdRealizoCobro"
                  id="rdRealizoCobro1"
                  value="1"
                  checked={ocultarFechaRealizo?true:false}
                  onClick={()=>{setValueFechaRealizoPago(''); setOcultarFechaRealizo(true);}}
                />
                <label className={Styles.ModalLabelRealizoPago} htmlFor="rdRealizoCobro1"><strong>Hoy</strong></label>
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
                <label className={Styles.ModalLabelRealizoPago} htmlFor="rdRealizoCobro2"><strong>Fecha anterior</strong></label>
              </div>

              <DatePicker
                className={`${Styles.ModalCantidad} ${Styles.ModalRealizoPago} ${ocultarFechaRealizo?'u-ocultar':null}`}
                id='txtFechaRealizoCobro'
                name='txtFechaRealizoCobro'
                placeholder='Fecha en que se realizo'
                value={valueFechaRealizoPago}
                onChange={onChange2}
                disabledDate={disabledDate}
              />
            </div>
          ):null}
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
          <input type="hidden" name="idEgresoFuturoE" id="idEgresoFuturoE" value={idEgresoStatus} />
          <p><strong>¿Desea eliminar este registro de pago?</strong></p>
        </form>
      </Modal>

      <Modal
        width={340}
        title=""
        centered
        open={modal4Open}
        onOk={cancelarEgreso}
        onCancel={() => setModal4Open(false)}
        okText={"Cancelar egreso"}
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
          <input type="hidden" name="idEgresoFuturoE" id="idEgresoFuturoE" value={idEgresoStatus} />
          <p><strong>¿Desea cancelar este pago?</strong></p>
        </form>
      </Modal>

    </Box>
  );
};
