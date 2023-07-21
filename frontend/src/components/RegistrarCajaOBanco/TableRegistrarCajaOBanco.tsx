import React, { useState } from "react";
import Box from "@mui/material/Box";
import Styles from "../../pages/RegisterBank/RegisterBank.module.css";

import { DataBank } from "./DataBank.tsx";
import data from "../../data/banco.json";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import { Modal, Input, message } from "antd";
import { Formik, Form } from "formik";

export const TableRegistrarCajaOBanco = () => {

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [datas, setDatas] = useState<Data[]>([]);
  const [nameValue, setNameValue] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [amountValue, setAmountValue] = useState("");

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  interface Data {
    id: number;
    nombre: string;
    tipo: string;
    cantidad: number;
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setTypeValue(value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountValue(event.target.value);
  };

  const addData = () => {
    const newTask: Data = {
      nombre: nameValue,
      tipo: typeValue,
      cantidad: +amountValue,
      id: data.length,
    };
    setDatas([...datas, newTask]);
    setNameValue("");
    setTypeValue("");
    setAmountValue("");
    setOpen(false);
  };

  return (
    <Box>
      <Modal
        title=""
        open={open}
        onOk={addData}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Guardar"
        cancelText="Cancelar"
      >
        <Formik initialValues={{}} onSubmit={(values, actions) => {}}>
          {({ handleBlur, handleSubmit }) => {
            return (
              <Form
                className={Styles.ModalForm}
                name="form-contacto"
                id="form-contacto"
                method="post"
                onSubmit={handleSubmit}
              >
                {contextHolder}

                <Input
                  placeholder="Nombre de la cuenta"
                  type="text"
                  id="txtNombre"
                  name="Nombre de la cuenta"
                  value={nameValue}
                  onChange={handleNameChange}
                  onBlur={handleBlur} /* PREGUNTAR PARA QUE SIRVE */
                  autoCapitalize="off"
                />

                <select
                  name="Efectivo o banco"
                  className={Styles.ModalSelect}
                  id=""
                  value={amountValue}
                  onChange={handleSelectChange}
                >
                  <option value="">Efectivo o banco</option>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Banco">Banco</option>
                </select>

                <Input
                  className={Styles.ModalCantidad}
                  placeholder="Cantidad actual"
                  type="text"
                  name="Cantidad actual"
                  value={amountValue}
                  onChange={handleAmountChange}
                  onBlur={handleBlur}
                />
              </Form>
            );
          }}
        </Formik>
      </Modal>

      <Box className={Styles.nav}>
        <Box className={Styles.counter}>
          <p>Cuentas</p>
          <div className={Styles.chip}>02</div>
        </Box>

        <Box className={Styles.itemSearch}>
          <Paper
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Buscar"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>

        <Box className={Styles.itemButton}>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            classes={{
              root: Styles.btnCreateAccount,
            }}
            onClick={showModal}
          >
            Crear nueva cuenta
          </Button>
        </Box>
      </Box>

      <div>
        {data.map((data) => (
          <DataBank
            key={data.id}
            nombre={data.nombre}
            tipo={data.tipo}
            cantidad={data.cantidad}
          />
        ))}
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
