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


export const Default = () => {
  const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];


    const showModal = () => {
      setOpen(true);
    };

    const handleOk = () => {
      const scriptURL = 'https://script.google.com/macros/s/AKfycby8sgR1QckyBUMfZDCNH9G_OQ2ZxIGa-eqKDhlBCYf5IVXZirgHIkA1CeiUJzz74r12Fg/exec'
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
                            name="Nombre de la persona o empresa"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoCapitalize="off"
                          />

                          <Input
                            placeholder="Concepto"
                            type="text"
                            id="txtNombre"
                            name="Concepto"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoCapitalize="off"
                          />

                          <select name="Efectivo o banco" className={`${style.ModalSelect}`} id="">
                            <option value="">Efectivo o banco</option>
                            <option value="Efectivo">Efectivo</option>
                            <option value="Banco">Banco</option>
                          </select>

                          <select name="Categoría" className={`${style.ModalSelect} u-sinMargen`} id="">
                            <option value="">Categoria</option>
                            <option value="Otros">Otros</option>
                          </select>

                          <Input
                            className={`${style.ModalCantidad} ${style.ModalCantidadMr}`}
                            placeholder="Monto"
                            type="text"
                            name="Monto"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />

                          <DatePicker  
                            format={dateFormatList}
                            className={`${style.ModalCantidad}`} 
                            name='Fecha tentativa de cobro' 
                            placeholder='Fecha tentativa de cobro' 
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