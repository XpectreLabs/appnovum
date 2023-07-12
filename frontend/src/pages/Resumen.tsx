import React from 'react';
// import { LayoutAdmin } from '../hocs/Layout.tsx';
import { Default } from '../components/Resumen/Default.tsx';

export const Resumen = ({cambioRegistroBan}) => {
    return (
      // <LayoutAdmin className="u-textCenter" itemMenu='1'>
      <Default cambioRegistroBan={cambioRegistroBan} />
      // </LayoutAdmin>
    )
}