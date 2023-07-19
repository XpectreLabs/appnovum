import React, { useState } from 'react';
import { Default } from '../../components/RegistrarIngresosFuturos/Default.tsx';
import { TableRegistrarIngresosFuturos } from '../../components/RegistrarIngresosFuturos/TableRegistrarIngresosFuturos.tsx';

export const RegistrarIngresosFuturos = ({cambioRegistroBan}) => {
  const [status, setStatus] = useState(false);

  const cambioTable = () => {
    setStatus(true);
  }

  const Cambio = (props) => {
    if (props.ban)
      return <TableRegistrarIngresosFuturos />;
    else if (props.ban === false)
      return <Default cambioRegistroBan={cambioRegistroBan} cambioTable={cambioTable}  />;
  }

  return (
      <Cambio ban={status} />
  )
}