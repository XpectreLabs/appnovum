import React from 'react';
import {Button, Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Formik, Form } from "formik";
import style from './Registro.module.css';

export const Registro3 = () => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);

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

                      <Space direction="vertical">
                        <Input.Password placeholder="Contraseña" />
                        <Input.Password
                          placeholder="Confirma contraseña"
                          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                      </Space>
                  </Form>
                }
            </>
          );
        }}
      </Formik>
    )
}