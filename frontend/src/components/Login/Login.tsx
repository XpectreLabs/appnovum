import React from 'react';
import style from './Login.module.css';
import { Input } from 'antd';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

export const Login = () => {
    return (
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("El email es incorrecto")
            .required("El email es requerido"),

          password: Yup.string()
          .required("La contraseña es requerida"),
        })}
        onSubmit={(values, actions) => {
          window.location.href ='/Home';
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
              <Form
                className={`${style.LoginForm}`}
                name="contact"
                method="post"
                onSubmit={handleSubmit}
              >
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

                <Input
                  placeholder="Contraseña"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email}
                <br />
                {errors.password}

                <div className="u-textLeft">
                  <Link
                    to="/Recovery-pass"
                    className={`${style.LoginTextOlvido} u-inline-block`}
                  >
                    ¿Olvido su contraseña?
                  </Link>
                  

                  <input
                    className={`${style.LoginBtnIniciarSesion} u-floatRight u-redondeado u-efecto`}
                    type="submit"
                    value="Iniciar sesión"
                  />
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
    )
}