import React from 'react';
import style from '../components/Login/Login.module.css'
import { AutoComplete } from 'antd';
import { useState } from "react";

const options = [
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' },
];

//if(localStorage.getItem('site')!==null&&localStorage.getItem('site')!=="")
//localStorage.setItem('site', "https://admin.bioesensi-crm.com");
//localStorage.setItem('site', "http://localhost:3001");


function cargarConceptos(setListConceptos:Function) {
  //alert("Yes");
  let user_id = 1;
  let scriptURL = localStorage.getItem('site')+"/listConceptosIngresosFuturos";
  let dataUrl = {user_id};

  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify(dataUrl),
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then((resp) => resp.json())
  .then(function(info) {
    console.log(info);
    setListConceptos(info['dataConceptos']);
  })
  .catch(error => {
    console.log(error.message);
    console.error('Error!', error.message);
  });
}

export const AutoComplementado = () => {
  const [listConceptos, setListConceptos] = useState([]);

  //listConceptos.length===0?cargarConceptos(setListConceptos):null;
  cargarConceptos(setListConceptos);
  return (
    <AutoComplete
       style={{ width: 200 }}
       options={listConceptos}
       placeholder=""
       filterOption={(inputValue, option) =>
         option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
       }
    />
  )
}