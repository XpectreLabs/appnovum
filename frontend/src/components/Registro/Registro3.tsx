import React from 'react';
import {Button, Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Formik, Form } from "formik";
import style from './Registro.module.css';
import * as Yup from "yup";

export const Registro3 = () => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);

    return (
      <Formik
        initialValues={{
          password: '',
          repitePasword: '',
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string()
            .min(8, 'La contraseña debe tener al menos 8 caracteres')
            .required("* Contraseña"),
          repitePasword:  Yup.string()
          .oneOf([Yup.ref('password')],"Las contraseñas deben ser iguales")
          .min(8, 'La contraseña debe tener al menos 8 caracteres')
          .required("* Confirma contraseña"),
        })}
        onSubmit={(values, actions) => {
          document.querySelector("#BtnTerminar").click();
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

                      <Space direction="vertical">
                        <Input.Password 
                          name='password' 
                          placeholder="Contraseña" 
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <Input.Password 
                          name='repitePasword'
                          placeholder="Confirma contraseña"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                      </Space>

                      <div>
                        <p><strong>{(errors.password)?`Errores:`:null}</strong></p>
                        {errors.password}<br />
                        {errors.repitePasword} <br /><br />
                      </div>

                      <div className='u-textLeft'>
                        <input className={`${style.RegistroBtnSiguiente} u-floatRight u-redondeado u-efecto`} type="submit" value="Terminar registro" />
                      </div>
                  </Form>
                }
            </>
          );
        }}
      </Formik>
    )
}