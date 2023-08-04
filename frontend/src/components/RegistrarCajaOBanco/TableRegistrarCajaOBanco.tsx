import React, { useState } from "react";
import Box from "@mui/material/Box";
import Styles from "../../pages/RegisterBank/RegisterBank.module.css";
import fn from "../../components/utility.tsx";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Modal, Input, message } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
let listData = "";

export const TableRegistrarCajaOBanco = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [cargandoVisible, setCargandoVisible] = useState(true);
  const [initialValues, setInitialValues] = useState(({ hdId:'',txtNombre: '',stTipo:'', txtCantidadActual: ''}));    

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setInitialValues(({ hdId:'',txtNombre: '',stTipo:'', txtCantidadActual: ''}));
    setTimeout(()=>{
      setOpen(false);
    },400);
  };

  function abrirModal() {
    showModal();
  }

  function agregarItem(id:number,nombre:string,id_tipo:number,tipo:string,cantidad:number):string {
      const item = `
      <div class="RegisterBank_container__V9zdU MuiBox-root css-0">
        <div class="RegisterBank_information__bROQ- MuiBox-root css-0">
          <div class="RegisterBank_headInfo__IZdhr MuiBox-root css-0">
            <div>
              <span class="${tipo==="Banco"?'icon-icoBankPlus':'icon-icoCash'}"></span>
              <span id="spName${id}">${nombre}</span>
            </div>
          <div>
          <button class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-78trlr-MuiButtonBase-root-MuiIconButton-root" tabindex="0" type="button" aria-label="Edit" onClick="document.querySelector('#btnPrueba').click(); setTimeout(()=>{document.querySelector('#hdId').value='${id}';},500);">
            <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EditOutlinedIcon"><path d="m14.06 9.02.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"></path>
            </svg>
            <span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span>
          </button>
          <button class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-78trlr-MuiButtonBase-root-MuiIconButton-root" tabindex="0" type="button" aria-label="Edit">
            <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="MoreVertIcon"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
            </svg>
            <span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span>
          </button>
        </div>
      </div>
      <div class="RegisterBank_bankInfo__LChD8 MuiBox-root css-0">
        <p>${tipo}</p>
        <p id="spTipoO${id}" class="u-ocultar">${id_tipo}</p>
        <p id="spCantidad${id}">${fn.convertirModena(cantidad)}</p>
        <p id="spCantidadO${id}" class="u-ocultar">${cantidad}</p>
        </div>
      </div>
    </div>`;

    return item;
  }

  function mostrarData(info) {
    listData="";
    for(let j=0; j < (Object.keys(info['listCajasBancos']).length); j++)
      listData += agregarItem(info['listCajasBancos'][j]['cajas_bancos_id'],info['listCajasBancos'][j]['nombre_cuenta'],info['listCajasBancos'][j]['tipo_pago_id'],info['listCajasBancos'][j]['tipos_pagos']['tipo_pago'],info['listCajasBancos'][j]['cantidad_actual']);

    if(listData==="")
      listData="<p><strong>No hay resultados en la busqueda.</strong></p>";

    fn.asignarValorInnerHTML("listDatos",listData);
    fn.asignarValorInnerHTML("NumCuenta",Object.keys(info['listCajasBancos']).length);
  }

  async function cargarDatos () {
    console.log("Prueba");
    const scriptURL = 'https://admin.bioesensi-crm.com/listCajasBancos';
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
      mostrarData(info);
      setCargandoVisible(false)
    })
    .catch(error => {
      console.log(error.message);
      console.error('Error!', error.message);
    });
  }

  cargarDatos();

  // const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setNameValue(event.target.value);
  // };

  // const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const value = event.target.value;
  //   setTypeValue(value);
  // };

  // const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAmountValue(event.target.value);
  // };

  const validarSubmit = () => {
    fn.ejecutarClick("#txtAceptar");
  }

  const validarSubit = () => {
    addData();
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
      },800);
  }

  const addData = () => {
    let scriptURL = 'https://admin.bioesensi-crm.com/altaCajaBanco';

    if(fn.obtenerValor("#hdId"))
      scriptURL = 'https://admin.bioesensi-crm.com/editarCajaBanco';

    const txtNombre = fn.obtenerValor('#txtNombre');
    const stTipo = fn.obtenerValor('#stTipo');
    const txtCantidadActual = fn.obtenerValor('#txtCantidadActual');
    const user_id = localStorage.getItem('user_id');
    const caja_banco_id = fn.obtenerValor("#hdId");

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
       setInitialValues(({ hdId:'',txtNombre: '',stTipo:'', txtCantidadActual: ''}));

       setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);

         const scriptURLC = 'https://admin.bioesensi-crm.com/listCajasBancos';
         const dataUrl = {user_id};

         fetch(scriptURLC, {
           method: 'POST',
           body: JSON.stringify(dataUrl),
           headers:{
             'Content-Type': 'application/json'
           }
         })
         .then((resp) => resp.json())
         .then(function(info) {
           mostrarData(info);
         })
         .catch(error => {
           console.log(error.message);
           console.error('Error!', error.message);
         });
       }, 1200);
     })
     .catch(error => {
       console.log(error.message);
       console.error('Error!', error.message);
     });
  };

  const buscarEnTabla = () => {
    const scriptURL = 'https://admin.bioesensi-crm.com/listCajasBancosB';
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
        mostrarData(info);
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
          onSubmit={(values, actions) => { validarSubit(); }}>
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
                  <p><strong>{(errors.txtNombre)?`Errores:`:null}</strong></p>
                  {errors.txtNombre??errors.txtNombre}
                  {errors.stTipo??errors.stTipo}<br />
                  {errors.txtCantidadActual??errors.txtCantidadActual}
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
          <div id="NumCuenta" className={Styles.chip}></div>
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

            <input style={{display:"none"}} id="btnPrueba" type="button" value="Prueba" onClick={abrirModal} />
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
            Crear nueva cuenta
          </Button>
        </Box>
      </Box>

      <div>
          <img className={cargandoVisible? "Cargando Mt mostrarI-b Sf" : "Cargando Mt Sf"}  src="img/loading.gif" alt="" />
      </div>

      <div id="listDatos" style={{ paddingBottom: "50px" }}></div>
    </Box>
  );
};