import React from 'react';
import style from '../../pages/Home.module.css';
import { Button } from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';

export const Default = () => {
    return (
        <div className={`${style.HomeBienvenida} ${style.RegistarBanco} u-inline-block`}>
          <span className={`${style.HomeIcoBienvenida} icon-icoEgereso`}></span>
          <p>
            No tienes egresos futuros, agregar un egreso futuro
          </p>

          <Button type="primary"><PlusOutlined /> Egreso futuro</Button>
        </div>
    )
}