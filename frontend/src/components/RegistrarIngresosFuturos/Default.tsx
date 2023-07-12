import React from 'react';
import style from '../../pages/Home.module.css';
import { Button } from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';

export const Default = () => {
    return (
        <div className={`${style.HomeBienvenida} ${style.RegistarBanco} u-inline-block`}>
          <span className={`${style.HomeIcoBienvenida} icon-icoIngreso`}></span>
          <p>
            No tienes ingresos futuros, agregar un ingreso futuro
          </p>

          <Button type="primary"><PlusOutlined /> Ingreso futuro</Button>
        </div>
    )
}