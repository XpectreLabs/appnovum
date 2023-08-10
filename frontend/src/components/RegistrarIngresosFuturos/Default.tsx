import React, { useState } from 'react';
import style from '../../pages/Home.module.css';
import fn from "../../components/utility.tsx";
import { Button, Modal, message, Input, DatePicker } from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';
import { Formik, Form } from "formik";
import dayjs, { Dayjs } from 'dayjs';
import type { DatePickerProps } from 'antd';
import * as Yup from "yup";

export const Default = ({cambioTable}) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
    const [initialValues, setInitialValues] = useState(({txtNombre:'', txtConcepto:'', stTipo:'', stCategoria:'', txtMonto:'', txtFechaTentativaCobro:''}));

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
      setInitialValues(({txtNombre:fn.obtenerValor("#txtNombre"), txtConcepto:fn.obtenerValor("#txtConcepto"), stTipo:fn.obtenerValor("#stTipo"), stCategoria:fn.obtenerValor("#stCategoria"), txtMonto:fn.obtenerValor("#txtMonto"), txtFechaTentativaCobro:dayjs(dateString)}));
    };

    const showModal = () => {
      setOpen(true);
    };

    const validarSubmit = () => {
      fn.ejecutarClick("#txtAceptar");
    }

    const handleCancel = () => {
      setInitialValues(({txtNombre:'', txtConcepto:'', stTipo:'0', stCategoria:'', txtMonto:'', txtFechaTentativaCobro:''}));

      setTimeout(()=>{
        setOpen(false);
      },500);
    };

    return (
      <>
        <div className={`${style.HomeBienvenida} ${style.RegistarBanco} u-inline-block`}>
          <span className={`${style.HomeIcoBienvenida} icon-icoIngreso`}></span>
          <p>
            No tienes ingresos futuros, agregar un ingreso futuro
          </p>

          <Button type="primary" onClick={showModal}><PlusOutlined /> Ingreso futuro</Button>
        </div>

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
                const scriptURL = 'http://localhost:3001/altaIngresoFuturo';
                const user_id = localStorage.getItem('user_id');
                const txtNombre = values.txtNombre;
                const txtConcepto = values.txtConcepto;
                const stTipo = values.stTipo;
                const stCategoria = values.stCategoria;
                const txtMonto = values.txtMonto;
                const txtFechaTentativaCobro = values.txtFechaTentativaCobro;
                const data = {txtNombre, txtConcepto,stTipo,stCategoria,txtMonto,user_id,txtFechaTentativaCobro};

                  setConfirmLoading(true);
                  fetch(scriptURL, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers:{
                      'Content-Type': 'application/json'
                    }
                  })
                  .then(response => {
                    messageApi.open({
                      type: 'success',
                      content: 'Los datos del ingreso fue guardada con éxito',
                    });
                    setTimeout(() => {
                      setOpen(false);
                      setConfirmLoading(false);
                      cambioTable();
                    }, 3000);
                  })
                  .catch(error => {
                    console.log(error.message);
                    console.error('Error!', error.message);
                  });
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
                          className={`${style.ModalForm}`}
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
                            className={`${style.ModalSelect}`}
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
                            className={`${style.ModalSelect} u-sinMargen`}
                            value={values.stCategoria}
                            onChange={handleChange}
                          >
                            <option value="0">Categoria</option>
                            <option value="1">Cliente</option>
                            <option value="2">Otros</option>
                          </select>

                          <Input
                            className={`${style.ModalCantidad} ${style.ModalCantidadMr}`}
                            placeholder="Monto"
                            type="text"
                            id="txtMonto"
                            name="txtMonto"
                            value={values.txtMonto}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />

                          <DatePicker
                            //format={dateFormatList}
                            className={`${style.ModalCantidad}`}
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
                      }
                  </>
                );
              }}
            </Formik>
          </Modal>
      </>
    )
}