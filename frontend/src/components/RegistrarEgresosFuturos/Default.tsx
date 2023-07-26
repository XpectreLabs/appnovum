import React, { useState } from 'react';
import style from '../../pages/Home.module.css';
import { Button, Modal, message, Input, DatePicker } from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';
import { Formik, Form } from "formik";
import type { DatePickerProps } from 'antd';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

export const Default = ({cambioTable}) => {
  const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

    const obtenerValor = (input) => {
      let valorInput: HTMLInputElement = document.querySelector(input);
      return valorInput?.value;
    };

    const showModal = () => {
      setOpen(true);
    };

    const handleOk = () => {
      const scriptURL = 'http://44.215.186.171/altaEgresoFuturo';
      const txtNombre = obtenerValor('#txtNombre');
      const txtConcepto = obtenerValor('#txtConcepto');
      const stTipo = obtenerValor('#stTipo');
      const stCategoria = obtenerValor('#stCategoria');
      const txtMonto = obtenerValor('#txtMonto');
      const user_id = localStorage.getItem('user_id');
      const txtFechaTentativaPago = obtenerValor('#txtFechaTentativaPago');

      const data = {txtNombre, txtConcepto,stTipo,stCategoria,txtMonto,user_id,txtFechaTentativaPago};

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
              content: 'Los datos del egreso fue guardada con éxito',
            });
            setTimeout(() => {
              setOpen(false);
              setConfirmLoading(false);
              cambioTable();
            }, 3000);
          })
          .catch(error => {
            alert(error.message);
            console.error('Error!', error.message);
          });
      /*
      */
    };

    const handleCancel = () => {
      setOpen(false);
    };

    return (
      <>
        <div className={`${style.HomeBienvenida} ${style.RegistarBanco} u-inline-block`}>
          <span className={`${style.HomeIcoBienvenida} icon-icoEgereso`}></span>
          <p>
            No tienes egresos futuros, agregar un egreso futuro
          </p>

          <Button type="primary" onClick={showModal}><PlusOutlined /> Egreso futuro</Button>
        </div>

        <Modal
        title=""
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Guardar"
        cancelText="Cancelar"
        >
        <Formik
          initialValues={{
          }}
          onSubmit={(values, actions) => {
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
                    <Form className={`${style.ModalForm}`} name="form-contacto" id="form-contacto" method="post" onSubmit={handleSubmit}>
                      {contextHolder}

                      <Input
                        placeholder="Nombre de la persona o empresa"
                        type="text"
                        id="txtNombre"
                        name="txtNombre"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoCapitalize="off"
                      />

                      <Input
                        placeholder="Concepto"
                        type="text"
                        id="txtConcepto"
                        name="txtConcepto"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoCapitalize="off"
                      />

                      <select name="stTipo" className={`${style.ModalSelect}`} id="stTipo">
                        <option value="">Efectivo o banco</option>
                        <option value="1">Efectivo</option>
                        <option value="2">Banco</option>
                      </select>

                      <select name="stCategoria" className={`${style.ModalSelect} u-sinMargen`} id="stCategoria">
                        <option value="">Categoria</option>
                        <option value="1">Otros</option>
                      </select>

                      <Input
                        className={`${style.ModalCantidad} ${style.ModalCantidadMr}`}
                        placeholder="Monto"
                        type="text"
                        id="txtMonto"
                        name="txtMonto"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <DatePicker
                        // format={dateFormatList}
                        className={`${style.ModalCantidad}`}
                        id='txtFechaTentativaPago'
                        name='txtFechaTentativaPago'
                        placeholder='Fecha tentativa de pago'
                        onChange={onChange}
                      />

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