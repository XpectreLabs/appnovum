import React from 'react';
import { Input } from 'antd';
import { Formik, Form } from "formik";
import style from './Registro.module.css';
import 'react-intl-tel-input-18/dist/main.css';

export const Registro2 = () => {
    return (
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
                      placeholder="Nombre de la empresa"
                      type="text"
                      name="empresa"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <Input
                      placeholder="¿A que se dedica tu empresa?"
                      type="text"
                      name="dedicaEmpresa"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <Input
                      placeholder="Número de empleados"
                      type="text"
                      name="numEmpreados"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form>
                }
            </>
          );
        }}
      </Formik>
    )
}