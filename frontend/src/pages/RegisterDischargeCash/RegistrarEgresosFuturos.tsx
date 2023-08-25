import React, { useState } from 'react';
import { Default } from '../../components/RegistrarEgresosFuturos/Default.tsx';
import { TableRegistrarEgresosFuturos } from '../../components/RegistrarEgresosFuturos/TableRegistrarEgresosFuturos.tsx';


export const RegistrarEgresosFuturos = ({egresoActive, setEgresoActive}) => {
    const [status, setStatus] = useState(egresoActive);

    const cambioTable = () => {
      setStatus(true);
    }

    const Cambio = (props) => {
      if (props.ban)
        return <TableRegistrarEgresosFuturos />;
      else if (props.ban === false)
        return <Default cambioTable={cambioTable}  />;
    }

    return (
        <Cambio ban={status} />
    )
}