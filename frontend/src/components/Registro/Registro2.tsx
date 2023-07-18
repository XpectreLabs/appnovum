import React from 'react';
import { Input } from 'antd';
import { Formik, Form } from "formik";
import style from './Registro.module.css';
import 'react-intl-tel-input-18/dist/main.css';
import * as Yup from "yup";

export const Registro2 = () => {
    return (
      <Formik
      initialValues={{
        empresa: '',
        dedicaTuEmpresa: '',
        numeroEmpreados: '',
      }}
      validationSchema={Yup.object().shape({
        empresa: Yup.string()
          .min(2, "El nombre de la empresa es demasiado corto")
          .required("* Empresa"),
        dedicaTuEmpresa:  Yup.string()
        .min(2, "El texto es demasiado corto")
        .required("* ¿A que se dedica tu empresa?"),
        numeroEmpreados:  Yup.number()
        .min(1, "Al menos un digito")
        .required("* Número de empleados"),
        // Apellido: Yup.string()
        // .min(2, "Tu apellido es demasiado corto")
        // .required("* Apellido"),
        // Puesto: Yup.string()
        // .min(2, "Tu puesto es demasiado corto")
        // .required("* Puesto"),
        // Email: Yup.string()
        //   .email("El email es incorrecto")
        //   .required("* Email"),
        // Celular: Yup.string()
        // .min(7, "Tu celular es demasiado corto")
        // .required("* Celular"),
      })}
        onSubmit={(values, actions) => {
          document.querySelector("#BtnSiguiente").click();
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
                      name="dedicaTuEmpresa"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <Input
                      placeholder="Número de empleados"
                      type="text"
                      name="numeroEmpreados"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <div>
                      <p><strong>{(errors.empresa)?`Errores:`:null}</strong></p>
                      {errors.empresa}<br />
                      {errors.dedicaTuEmpresa}<br />
                      {errors.numeroEmpreados}
                    </div>

                    <div className='u-textLeft'>
                      <input className={`${style.RegistroBtnSiguiente} u-floatRight u-redondeado u-efecto`} type="submit" value="Siguiente" />
                    </div>
                  </Form>
                }
            </>
          );
        }}
      </Formik>
    )
}