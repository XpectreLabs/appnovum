import React, { useState } from 'react';
import style from '../../pages/Home.module.css';
import { Button, Modal, Select, Input } from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';
import { Formik, Form } from "formik";

export const Default = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
      setOpen(true);
    };

    const handleOk = () => {
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
    };

    const handleCancel = () => {
      console.log('Clicked cancel button');
      setOpen(false);
    };

    const handleChange = (value: string) => {
      console.log(`selected ${value}`);
    };

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
                        <Form className={`${style.RegistroForm}`} name="contact" method="post" onSubmit={handleSubmit}>
                          <Input
                            placeholder="Nombre de la cuenta"
                            type="text"
                            name="nombreCuenta"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoCapitalize="off"
                          />

                          <Select
                            defaultValue="Efectivo"
                            style={{ width: 120 }}
                            onChange={handleChange}
                            options={[
                              { value: 'Efectivo', label: 'Efectivo' },
                              { value: 'Banco', label: 'Banco' },
                            ]}
                          />

                          <Input
                            placeholder="Cantidad actual"
                            type="text"
                            name="cantidadActual"
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