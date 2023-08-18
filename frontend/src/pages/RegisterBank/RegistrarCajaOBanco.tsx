import React, { useState } from 'react';
import { Default } from '../../components/RegistrarCajaOBanco/Default.tsx';
import { TableRegistrarCajaOBanco } from '../../components/RegistrarCajaOBanco/TableRegistrarCajaOBanco.tsx';

export const RegistrarCajaOBanco = ({cajaActive,setCajaActive}) => {
    const [status, setStatus] = useState(cajaActive);

    const cambioTable = () => {
      setStatus(true);
    }

    const Cambio = (props) => {
      if (props.ban)
        return <TableRegistrarCajaOBanco />;
      else if (props.ban === false)
        return <Default cambioTable={cambioTable} />;
    }

    return (
        <Cambio ban={status} />
    )
}