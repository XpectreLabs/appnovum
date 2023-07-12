import React from 'react';
import { Input } from 'antd';
import { Formik, Form } from "formik";
import style from './Registro.module.css';
import IntlTelInput from 'react-intl-tel-input-18';
import 'react-intl-tel-input-18/dist/main.css';


export const Registro1 = () => {
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
                      className={`${style.RegistroInputCol}`}
                      placeholder="Nombre"
                      type="text"
                      name="nombre"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoCapitalize="off"
                    />

                    <Input
                      className={`${style.RegistroInputCol} u-sinMargen`}
                      placeholder="Apellido"
                      type="text"
                      name="apellido"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <Input
                      placeholder="Puesto"
                      type="text"
                      name="puesto"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <Input
                      placeholder="Email"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoCapitalize="off"
                      autoCorrect="off"
                      autoComplete="email"
                    />

                    <IntlTelInput
                      containerClassName="intl-tel-input"
                      placeholder='Celular'
                      defaultCountry={'mx'}
                      separateDialCode={true}
                    />
                  </Form>
                }
            </>
          );
        }}
      </Formik>
    )
}