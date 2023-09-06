import React, { useState } from 'react';
// import { LayoutAdmin } from '../hocs/Layout.tsx';
import { Default } from '../components/Resumen/Default.tsx';
import { Reporte } from '../components/Resumen/Reporte.tsx';

export const Resumen = ({resumenActive,cambioRegistroBan}) => {
  const [status, setStatus] = useState(resumenActive);

  const Cambio = (props) => {
    if (props.ban)
      return <Reporte />;
    else if (props.ban === false)
      return <Default cambioRegistroBan={cambioRegistroBan} />;
  }
  return (
      <Cambio ban={status} />
  )
}