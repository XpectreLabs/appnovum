import React, { useState } from "react";
import Box from "@mui/material/Box";
import Styles from "../../pages/RegisterBank/RegisterBank.module.css";
import { DataBank } from "./DataBank.tsx";

export const CargaDatos = ({listDatos}: {
  arrays: any;}) => {


  //let [datos, setDatos] = useState([]);
  const [datas, setDatas] = useState<Data[]>([]);
  //const [cargarInfo, setCargarInfo] = useState(false);
  //const [cargandoVisible, setCargandoVisible] = React.useState(true);

  return (
    <Box style={{
      paddingBottom: "50px"
    }}>
      <div>
        {
          listDatos.map((data) => (
          <DataBank
            key={data.id}
            nombre={data.nombre}
            tipo={data.tipo}
            cantidad={data.cantidad}
          />
        ))
      }
      </div>

      <div>
        {datas.map((task) => (
          <DataBank
            key={task.id}
            nombre={task.nombre}
            tipo={task.tipo}
            cantidad={task.cantidad}
          />
        ))}
      </div>
    </Box>
  );
};
