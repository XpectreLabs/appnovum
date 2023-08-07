import React, { useState } from 'react';
import { Default } from '../../components/RegistrarCajaOBanco/Default.tsx';
import { TableRegistrarCajaOBanco } from '../../components/RegistrarCajaOBanco/TableRegistrarCajaOBanco.tsx';

export const RegistrarCajaOBanco = ({cambioRegistroBan}) => {
    const [status, setStatus] = useState(true);

    const cambioTable = () => {
      setStatus(true);
    }

    const Cambio = (props) => {
      if (props.ban)
        return <TableRegistrarCajaOBanco />;
      else if (props.ban === false)
        return <Default cambioRegistroBan={cambioRegistroBan} cambioTable={cambioTable} />;
    }

    return (
        <Cambio ban={status} />
    )
}