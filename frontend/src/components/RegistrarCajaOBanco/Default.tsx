import React, { useState } from 'react';
import style from '../../pages/Home.module.css';
import { Button, Modal, Select, Input, message } from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';
import { Formik, Form } from "formik";

export const Default = ({cambioTable}) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const obtenerValor = (input) => {
      let valorInput: HTMLInputElement = document.querySelector(input);
      return valorInput?.value;
    };

    const showModal = () => {
      setOpen(true);
    };

    const handleOk = () => {
      const scriptURL = 'http://localhost:3001/altaCajaBanco';
      const txtNombre = obtenerValor('#txtNombre');
      const stTipo = obtenerValor('#stTipo');
      const txtCantidadActual = obtenerValor('#txtCantidadActual');
      const user_id = localStorage.getItem('user_id');

      const data = {txtNombre, stTipo, txtCantidadActual, user_id};
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
          content: 'La nueva cuenta fue guardada con éxito',
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

    // const handleChange = (value: string) => {
    //   console.log(`selected ${value}`);
    // };

    return (
      <>
          <div className={`${style.HomeBienvenida} ${style.RegistarBanco} u-inline-block`}>
            <span className={`${style.HomeIcoBienvenida} icon-icoRegistrarCB`}></span>
            <p>
              No tienes cuentas agregadas, tu cuentas aparecerán aqui
            </p>

            <Button type="primary" onClick={showModal}><PlusOutlined /> Crear nueva cuenta</Button>
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
                            placeholder="Nombre de la cuenta"
                            type="text"
                            id="txtNombre"
                            name="txtNombre"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoCapitalize="off"
                          />

                          <select name="stTipo" id="stTipo" className={`${style.ModalSelect}`}>
                            <option value="">Efectivo o banco</option>
                            <option value="1">Efectivo</option>
                            <option value="2">Banco</option>
                          </select>

                          <Input
                            className={`${style.ModalCantidad}`}
                            placeholder="Cantidad actual"
                            type="text"
                            id="txtCantidadActual"
                            name="txtCantidadActual"
                            onChange={handleChange}
                            onBlur={handleBlur}
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