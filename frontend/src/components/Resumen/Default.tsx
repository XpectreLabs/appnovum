import React from 'react';
import style from '../../pages/Home.module.css';
import { Button } from 'antd';

export const Default = ({cambioRegistroBan}) => {


    return (
        <div className={`${style.HomeBienvenida} u-inline-block`}>
          <span className={`${style.HomeIcoBienvenida} icon-icoRegistrarCB`}></span>
          <h2 className={`${style.HomeTitle}`}>
            Bienvenido
          </h2>
          <p>
            Aqui veras un resumen de tus movimientos, intenta registra uno
          </p>

          <Button type="primary" onClick={cambioRegistroBan}>Comenzar</Button>
        </div>
    )
}