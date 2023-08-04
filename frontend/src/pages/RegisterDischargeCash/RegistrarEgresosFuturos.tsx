import React, { useState } from 'react';
import { Default } from '../../components/RegistrarEgresosFuturos/Default.tsx';
import { TableRegistrarEgresosFuturos } from '../../components/RegistrarEgresosFuturos/TableRegistrarEgresosFuturos.tsx';


export const RegistrarEgresosFuturos = ({cambioRegistroBan}) => {
    const [status, setStatus] = useState(true);

    const cambioTable = () => {
      setStatus(true);
    }

    const Cambio = (props) => {
      if (props.ban)
        return <TableRegistrarEgresosFuturos />;
      else if (props.ban === false)
        return <Default cambioRegistroBan={cambioRegistroBan} cambioTable={cambioTable}  />;
    }

    return (
        <Cambio ban={status} />
    )
}