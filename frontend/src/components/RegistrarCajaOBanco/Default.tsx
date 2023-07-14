import React, { useState } from 'react';
import style from '../../pages/Home.module.css';
import { Button, Modal, Select, Input, message } from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';
import { Formik, Form } from "formik";

export const Default = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const showModal = () => {
      setOpen(true);
    };

    const handleOk = () => {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbzge-BlKlBbf8oq7-L2CcD-CEfiodErmJvzoLyj1BoKyp8I01g4CFZyYJrPTDryE57m/exec'
      const form = document.forms['form-contacto'];

        setConfirmLoading(true);
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
          .then(response => {
            messageApi.open({
              type: 'success',
              content: 'Los datos fueron guardados con éxito',
            });
            setTimeout(() => {
              setOpen(false);
              setConfirmLoading(false); 
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
                            name="Nombre de la cuenta"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoCapitalize="off"
                          />

                          <select name="Efectivo o banco" className={`${style.ModalSelect}`} id="">
                            <option value="">Efectivo o banco</option>
                            <option value="Efectivo">Efectivo</option>
                            <option value="Banco">Banco</option>
                          </select>

                          <Input
                            className={`${style.ModalCantidad}`}
                            placeholder="Cantidad actual"
                            type="text"
                            name="Cantidad actual"
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