import * as React from "react";
import Styles from '../../pages/RegisterPay/RegisterPay.module.css';
import fn from "../../components/utility.tsx";
//import data from '../../data/ingreso.json';
import { DataIngreso } from './DataIngreso.tsx';
import { IngresoResponsive } from './IngresoResponsive.tsx';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
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

interface Data {
  id: number;
  date_created: string;
  payment_method: string;
  category: string;
  name: string;
  concept: string;
  amount: number;
  date_to_pay: string;
  state: string;
  date_cashed: string;
}

const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  console.log(date, dateString);
};

async function cargarDatos () {
  console.log("Yes");
  const scriptURL = 'https://admin.bioesensi-crm.com/listIngresosFuturos';
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
    let listData = [];
    for(let j=0; j < (Object.keys(info['listIngresosFuturos']).length); j++) {
      const fechaCreacion = fn.convertirFecha(info['listIngresosFuturos'][j]['fecha_creacion']);
      const fechaCobro = fn.convertirFecha(info['listIngresosFuturos'][j]['fecha_tentativa_cobro']);
      const fechaEnQueSeCobro = fn.convertirFecha(info['listIngresosFuturos'][j]['fecha_cobro']);
      //console.log(fechaCreacion+" -> "+fechaCobro+" -> "+fechaEnQueSeCobro);
      const state = fechaEnQueSeCobro?fechaEnQueSeCobro:'No cobrado';

      let item = {
        "id": info['listIngresosFuturos'][j]['ingresos_futuros_id'],
        "date_created": fechaCreacion,
        "payment_method": info['listIngresosFuturos'][j]['tipos_pagos']['tipo_pago'],
        "category": info['listIngresosFuturos'][j]['categorias']['categoria'],
        "name": info['listIngresosFuturos'][j]['nombre_persona_empresa'],
        "concept": info['listIngresosFuturos'][j]['concepto'],
        "amount": info['listIngresosFuturos'][j]['monto'],
        "date_to_pay": fechaCobro,
        "state": state,
        "date_cashed": fechaEnQueSeCobro
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


export const TableRegistrarIngresosFuturos = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const [cargandoVisible, setCargandoVisible] = useState(true);

  const [tabla, setTabla] = useState<Data[]>([]);
  const [listaDatos, setListaDatos] = useState([]);
  const [initialValues, setInitialValues] = useState(({hdId:'',txtNombre:'', txtConcepto:'', stTipo:'', stCategoria:'', txtMonto:''}));
  const [cantidadV, setCantidadV] = useState("0");

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
    
    const scriptURL = 'https://admin.bioesensi-crm.com/altaIngresoFuturo';
    const txtNombre = fn.obtenerValor('#txtNombre');
    const txtConcepto = fn.obtenerValor('#txtConcepto');
    const stTipo = fn.obtenerValor('#stTipo');
    const stCategoria = fn.obtenerValor('#stCategoria');
    const txtMonto = fn.obtenerValor('#txtMonto');
    const user_id = localStorage.getItem('user_id');
    const txtFechaTentativaCobro = fn.obtenerValor('#txtFechaTentativaCobro');
    const ingresos_futuros_id = fn.obtenerValor("#hdId");
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
        content: 'Los datos del ingreso fue guardada con éxito',
      });
      console.log("Si");

      const scriptURLG = 'https://admin.bioesensi-crm.com/listIngresosFuturos';
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
        for(let j=0; j < (Object.keys(info['listIngresosFuturos']).length); j++) {
          const fechaCreacion = fn.convertirFecha(info['listIngresosFuturos'][j]['fecha_creacion']);
          const fechaCobro = fn.convertirFecha(info['listIngresosFuturos'][j]['fecha_tentativa_cobro']);
          const fechaEnQueSeCobro = fn.convertirFecha(info['listIngresosFuturos'][j]['fecha_cobro']);
          const state = fechaEnQueSeCobro?fechaEnQueSeCobro:'No cobrado';

          let item = {
            "id": info['listIngresosFuturos'][j]['ingresos_futuros_id'],
            "date_created": fechaCreacion,
            "payment_method": info['listIngresosFuturos'][j]['tipos_pagos']['tipo_pago'],
            "category": info['listIngresosFuturos'][j]['categorias']['categoria'],
            "name": info['listIngresosFuturos'][j]['nombre_persona_empresa'],
            "concept": info['listIngresosFuturos'][j]['concepto'],
            "amount": info['listIngresosFuturos'][j]['monto'],
            "date_to_pay": fechaCobro,
            "state": state,
            "date_cashed": fechaEnQueSeCobro
          }
          listData.push(item);
        }
        //console.log("Si -> 2");
        data = listData;

        setInitialValues(({hdId:'',txtNombre:'', txtConcepto:'', stTipo:'', stCategoria:'', txtMonto:''}));
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

    /*const newTable: Data = {
      name: nameValue,
      concept: conceptValue,
      payment_method: typeValue,
      category: categoryValue,
      amount: +amountValue,
      date_to_pay: "21/07/2023",
      state: "Cobrado",
      date_cashed: "21/07/2023",
      date_created: "21/07/2023",
      id: data.length,
    };
    setTabla([...tabla, newTable]);
    setNameValue("");
    setConceptValue("");
    setTypeValue("");
    setCategoryValue("");
    setAmountValue("");*/
    //setOpen(false);
  };


  const buscarEnTabla = () => {
    const scriptURL = 'https://admin.bioesensi-crm.com/listIngresosFuturosB'; // deberia es
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
      for(let j=0; j < (Object.keys(info['listIngresosFuturos']).length); j++) {
        const fechaCreacion = fn.convertirFecha(info['listIngresosFuturos'][j]['fecha_creacion']);
        const fechaCobro = fn.convertirFecha(info['listIngresosFuturos'][j]['fecha_tentativa_cobro']);
        const fechaEnQueSeCobro = fn.convertirFecha(info['listIngresosFuturos'][j]['fecha_cobro']);
        //console.log(fechaCreacion+" -> "+fechaCobro+" -> "+fechaEnQueSeCobro);
        const state = fechaEnQueSeCobro?fechaEnQueSeCobro:'No cobrado';

        let item = {
          "id": info['listIngresosFuturos'][j]['ingresos_futuros_id'],
          "date_created": fechaCreacion,
          "payment_method": info['listIngresosFuturos'][j]['tipos_pagos']['tipo_pago'],
          "category": info['listIngresosFuturos'][j]['categorias']['categoria'],
          "name": info['listIngresosFuturos'][j]['nombre_persona_empresa'],
          "concept": info['listIngresosFuturos'][j]['concepto'],
          "amount": info['listIngresosFuturos'][j]['monto'],
          "date_to_pay": fechaCobro,
          "state": state,
          "date_cashed": fechaEnQueSeCobro
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
                  // format={dateFormatList}
                  className={Styles.ModalCantidad}
                  id='txtFechaTentativaCobro'
                  name='txtFechaTentativaCobro'
                  placeholder='Fecha tentativa de cobro'
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
            );
          }}
        </Formik>
      </Modal>

      <Box className={Styles.nav}>
        <Box className={Styles.counter}>
          <p>Cuentas</p>
          <div id="NumCuenta" className={Styles.chip}>{cantidadV}</div>
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
            Ingreso futuro
          </Button>
        </Box>
      </Box>

      

      {/* {listaDatos?<DataIngreso arrays={listaDatos} arrays2={tabla} />:null} */}
      <DataIngreso arrays={listaDatos} arrays2={tabla} />
      <div>
          <img className={cargandoVisible? "Cargando Mt mostrarI-b Sf" : "Cargando Mt Sf"}  src="img/loading.gif" alt="" />
      </div>
      <Box>
        {data.map((data) => (
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

      <div>
        {tabla.map((data) => (
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
      </div>
    </Box>
  );
}