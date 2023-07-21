import * as React from "react";
import Styles from '../../pages/RegisterPay/RegisterPay.module.css';
import data from '../../data/ingreso.json';

import { DataIngreso } from './DataIngreso.tsx';
import { IngresoResponsive } from './IngresoResponsive.tsx';

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Formik, Form } from "formik";
import { Modal, message, Input, DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import { useState } from "react";

interface Data {
  id: number;
  date_created: string;
  payment_method: string;
  category: string;
  name: string;
  concept: string;
  amount: number;
  date_to_pay: string;
  state: string;
  date_cashed: string;
}

const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  console.log(date, dateString);
};

export const TableRegistrarIngresosFuturos = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

  const [tabla, setTabla] = useState<Data[]>([]);
  const [nameValue, setNameValue] = useState("");
  const [conceptValue, setConceptValue] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [amountValue, setAmountValue] = useState("");
  const [fechValue, setFechValue] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value);
  };

  const handleConceptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConceptValue(event.target.value);
  };

  const handleSelectChange1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setTypeValue(value);
  };

  const handleSelectChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCategoryValue(value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountValue(event.target.value);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const addDataTable = () => {
    const newTable: Data = {
      name: nameValue,
      concept: conceptValue,
      payment_method: typeValue,
      category: categoryValue,
      amount: +amountValue,
      date_to_pay: "21/07/2023",
      state: "Cobrado",
      date_cashed: "21/07/2023",
      date_created: "21/07/2023",
      id: data.length,
    };
    setTabla([...tabla, newTable]);
    setNameValue("");
    setConceptValue("");
    setTypeValue("");
    setCategoryValue("");
    setAmountValue("");
    setOpen(false);
  };

  return (
    <Box>
      <Modal
        title=""
        open={open}
        onOk={addDataTable}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Guardar"
        cancelText="Cancelar"
      >
        <Formik initialValues={{}} onSubmit={(values, actions) => {}}>
          {({ values, errors, handleChange, handleBlur, handleSubmit }) => {
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
                  placeholder="Nombre de la persona o empresa"
                  type="text"
                  id="txtNombre"
                  name="Nombre de la persona o empresa"
                  value={nameValue}
                  onChange={handleNameChange}
                  onBlur={handleBlur}
                  autoCapitalize="off"
                />

                <Input
                  placeholder="Concepto"
                  type="text"
                  id="txtNombre"
                  name="Concepto"
                  value={conceptValue}
                  onChange={handleConceptChange}
                  onBlur={handleBlur}
                  autoCapitalize="off"
                />

                <select
                  name="Efectivo o banco"
                  className={Styles.ModalSelect}
                  id=""
                  value={typeValue}
                  onChange={handleSelectChange1}
                >
                  <option value="">Efectivo o banco</option>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Banco">Banco</option>
                </select>

                <select
                  name="Categoría"
                  className={`${Styles.ModalSelect} u-sinMargen`}
                  id=""
                  value={categoryValue}
                  onChange={handleSelectChange2}
                >
                  <option value="">Categoria</option>
                  <option value="Otros">Otros</option>
                </select>

                <Input
                  className={`${Styles.ModalCantidad} ${Styles.ModalCantidadMr}`}
                  placeholder="Monto"
                  type="text"
                  name="Monto"
                  value={amountValue}
                  onChange={handleAmountChange}
                  onBlur={handleBlur}
                />

                <DatePicker
                  format={dateFormatList}
                  className={Styles.ModalCantidad}
                  name="Fecha tentativa de cobro"
                  placeholder="Fecha tentativa de cobro"
                  onChange={onChange}
                />
              </Form>
            );
          }}
        </Formik>
      </Modal>

      <Box className={Styles.nav}>
        <Box className={Styles.counter}>
          <p>Cuentas</p>
          <div className={Styles.chip}>04</div>
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
            Ingreso futuro
          </Button>
        </Box>
      </Box>

      <DataIngreso arrays={data} arrays2={tabla} />

      <Box>
        {data.map((data) => (
          <IngresoResponsive
            key={data.id}
            date_created={data.date_created}
            payment_method={data.payment_method}
            category={data.category}
            name={data.name}
            concept={data.concept}
            amount={data.amount}
            date_to_pay={data.date_to_pay}
            state={data.state}
            date_cashed={data.date_cashed}
          />
        ))}
      </Box>

      <div>
        {tabla.map((data) => (
          <IngresoResponsive
            key={data.id}
            date_created={data.date_created}
            payment_method={data.payment_method}
            category={data.category}
            name={data.name}
            concept={data.concept}
            amount={data.amount}
            date_to_pay={data.date_to_pay}
            state={data.state}
            date_cashed={data.date_cashed}
          />
        ))}
      </div>
    </Box>
  );
}