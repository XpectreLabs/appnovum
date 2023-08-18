import React, { useState } from 'react';
import { Default } from '../../components/RegistrarIngresosFuturos/Default.tsx';
import { TableRegistrarIngresosFuturos } from '../../components/RegistrarIngresosFuturos/TableRegistrarIngresosFuturos.tsx';
 
export const RegistrarIngresosFuturos = ({ingresoActive, setIngresoActive}) => {
  const [status, setStatus] = useState(ingresoActive);

  const cambioTable = () => {
    setStatus(true);
  }

  const Cambio = (props) => {
    if (props.ban)
      return <TableRegistrarIngresosFuturos />;
    else if (props.ban === false)
      return <Default cambioTable={cambioTable}  />;
  }

  return (
      <Cambio ban={status} />
  )
}