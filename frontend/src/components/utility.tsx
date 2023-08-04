const locales = 'en-US'
const options = {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
}
const formatterDolar = new Intl.NumberFormat(locales, options)

const convertirModena = (valor:number):string => {
  return formatterDolar.format(valor);
}

const obtenerValor = (input) => {
  let valorInput: HTMLInputElement = document.querySelector(input);
  return valorInput?.value;
};

const obtenerValorText = (select) => {
  let valorSelect = document.querySelector(select);
  return valorSelect.options[valorSelect.selectedIndex].text;
};

const obtenerValorHtml = (element) => {
  let valorHtml = document.querySelector(element);
  return valorHtml?.innerHTML;
};


const asignarValorInput = (input:string,valor:string):void => {
  let element = document.querySelector(input);
  element.value=valor;
};

const asignarValorSelect = (select:string,valor:string):void => {
  let element = document.getElementById(select);
  element.value = valor;
}

const asignarValorInnerHTML = (campo:string,valor:string):void => {
    let element = document.getElementById(campo);
    element.innerHTML=valor;
}

const ejecutarClick = (campo:string):void => {
  let element = document.querySelector(campo);
  element.click();
}


const convertirFecha = (fecha:string):string => {
  let fechaC="Pendiente";
  if(fecha)
    fechaC = fecha.substr(8,2)+"/"+fecha.substr(5,2)+"/"+fecha.substr(0,4);
  return fechaC;
}


export default {obtenerValor, obtenerValorText, convertirModena, obtenerValorHtml, asignarValorInput, asignarValorSelect,asignarValorInnerHTML,ejecutarClick, convertirFecha};