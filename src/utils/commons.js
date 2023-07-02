export const generatePhone = () => {
    let result = "";
    const max_value = 9;
    
    for(let i=0; i<9; i++){
        result = result + Math.floor(Math.random() * max_value);
    }
    return parseInt(result);
};

export const generatePhoneHashing = (value) => {
  let result = "";
  let sumNumbers = 0;
  const strValue = value.toString();

  for (let i = 0; i < strValue.length; i++) {
    sumNumbers += strValue.charCodeAt(i);
  }

  while(result.length !== 9){
    if(sumNumbers.toString().length >= 9){
      result = sumNumbers.toString().slice(0,9);
    }else{
      sumNumbers = Math.abs(sumNumbers << (parseInt(sumNumbers.toString().slice(-1)) === 0 ? 1 : parseInt(sumNumbers.toString().slice(-1))));
    }
  }

  return result;
}

export const generateCreationDate = (start, end) => {
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return (randomDate.getDate() < 10 ? ("0" + randomDate.getDate()) : randomDate.getDate()) + "/" + ((randomDate.getMonth() + 1) < 10 ? ("0" + (randomDate.getMonth() + 1)) : (randomDate.getMonth() + 1)) + "/" + randomDate.getFullYear();
};


export const generateCreationDateFormatted = (start, end) => {
    let result = "";
    let days = 0;
    let hours = 0;
    let years = end.getFullYear() - start.getFullYear();

    const monthRandomDiff = 12 - (start.getMonth() + 1);
    const monthEndDiff = end.getMonth() + 1;

    let months = monthRandomDiff + monthEndDiff;

    if(months >= 12 && years === 0){
      months = months % 12;
    }else if(months === 12 && years !== 0){
      months = 0;
    }else if(months > 12 && years !== 0){
      months = months % 12;
    }else{
      if(years !== 0){
        years = years - 1;
      }
    }

    if(years === 0 && months === 0){
      days = end.getDate() - start.getDate();
    }else if(years !== 0 || months !== 0){
      
      const totalDaysOfRandMonth = new Date(start.getFullYear(), start.getMonth()+1, 0).getDate();
      const restDaysRandMonth = totalDaysOfRandMonth - start.getDate();
      const restDaysEndMonth = end.getDate();
      days = restDaysEndMonth + restDaysRandMonth;
      const totalDaysOfEndMonth = new Date(end.getFullYear(), end.getMonth()+1, 0).getDate();

      if(totalDaysOfEndMonth >= totalDaysOfRandMonth){
        if(days > totalDaysOfEndMonth){
          days = (days % totalDaysOfEndMonth);
        }else if(days === totalDaysOfEndMonth){
          days = (days % totalDaysOfEndMonth);
        }else if(days < totalDaysOfEndMonth){
          months = (months === 0 ? months : months - 1);
        }
      }else{
        if(days > totalDaysOfRandMonth){
          days = (days % totalDaysOfRandMonth) + 1;
        }else if(days === totalDaysOfRandMonth && restDaysRandMonth > 0){
          days = (days % totalDaysOfRandMonth) + 1;
        }else if((days < totalDaysOfRandMonth) && (days === totalDaysOfEndMonth)){
          days = (days % totalDaysOfEndMonth);
        }else if(days < totalDaysOfRandMonth){
          months = (months === 0 ? months : months - 1);
        }
      }
    }

    const endHours = end.getHours();

    let randomHours = start.getHours();

    hours = (24 - randomHours) + endHours

    if(hours >= 24){
      hours = hours % 24;
    }
    

    result += years !== 0 ? `${years} años` : "";
    result += months !== 0 ? (years !== 0 ? ", ": "") + `${months} meses` : "";
    result += days !== 0 ? ((months !== 0 || (months === 0 && years !== 0)) ? ", ": "") + `${days} días` : "";
    result += hours !== 0 ? ((days !== 0 || (days === 0 && months !== 0) || (days === 0 && months === 0 && years !== 0)) ? ", ": "") + `${hours} horas` : "";
    result = result === "" ? "Se registró hace un momento." : "Se registró hace " + result + ".";
    
    
    return result;
};


export const generateCreationDateHashing = (start, actual, value) => {
  const strValue = value.toString();
  let concatNumbers = 0;
  for (let i = 0; i < strValue.length; i++) {
    concatNumbers += strValue.charCodeAt(i);
  }

  concatNumbers = concatNumbers.toString();

  const concatInitialNumbers = concatNumbers;

  const yearsDiff = actual.getFullYear() - start.getFullYear();
  const monthsTotal = 12;
  const hoursTotal = 23;

  let year = null;
  let month = null;
  let day = null;
  let hour = null;

  while (year === null) {
    if(yearsDiff === 0){
      year = 0;
    }else{
      let subvalores = [];
      let newConcat = "";
      if(concatInitialNumbers === concatNumbers){
        subvalores = obtenerSubvalores(concatInitialNumbers);
      }else{
        subvalores = obtenerSubvalores(concatNumbers);
      }
      
      for (let i = 0; i < subvalores.length; i++) {
        if (yearsDiff > subvalores[i]) {
          year = subvalores[i];
        }
      }
      newConcat = Math.abs(concatNumbers << (parseInt(concatNumbers.toString()[0]) === 0 ? 1 : parseInt(concatNumbers.toString()[0]))).toString();
      newConcat = newConcat.replace("000", (parseInt(concatNumbers.toString()[0]) === 0 ? 1 : parseInt(concatNumbers.toString()[0])));
      if(newConcat === "0"){
        concatNumbers = concatNumbers.slice(0,3);
      }else{
        concatNumbers = newConcat;
      }
    }
  }

  year = start.getFullYear() + year;

  while (month === null) {
    let subvalores = [];
    let newConcat = "";
    if(concatInitialNumbers === concatNumbers){
      subvalores = obtenerSubvalores(concatInitialNumbers);
    }else{
      subvalores = obtenerSubvalores(concatNumbers);
    }

    for (let i = 0; i < subvalores.length; i++) {
      if (monthsTotal >= subvalores[i]) {
        month = subvalores[i];
      }
    }
    newConcat = Math.abs(concatNumbers << (parseInt(concatNumbers.toString()[0]) === 0 ? 1 : parseInt(concatNumbers.toString()[0]))).toString();
    newConcat = newConcat.replace("000", (parseInt(concatNumbers.toString()[0]) === 0 ? 1 : parseInt(concatNumbers.toString()[0])));
    if(newConcat === "0"){
      concatNumbers = concatNumbers.slice(0,3);
    }else{
      concatNumbers = newConcat;
    }
  }

  const daysTotal = new Date(year, month, 0).getDate();

  while (day === null) {
    let subvalores = [];
    let newConcat = "";
    if(concatInitialNumbers === concatNumbers){
      subvalores = obtenerSubvalores(concatInitialNumbers);
    }else{
      subvalores = obtenerSubvalores(concatNumbers);
    }

    for (let i = 0; i < subvalores.length; i++) {
      if (daysTotal >= subvalores[i]) {
        day = subvalores[i];
      }
    }

    newConcat = Math.abs(concatNumbers << (parseInt(concatNumbers.toString()[0]) === 0 ? 1 : parseInt(concatNumbers.toString()[0]))).toString();
    newConcat = newConcat.replace("000", (parseInt(concatNumbers.toString()[0]) === 0 ? 1 : parseInt(concatNumbers.toString()[0])));
    if(newConcat === "0"){
      concatNumbers = concatNumbers.slice(0,3);
    }else{
      concatNumbers = newConcat;
    }
  }

  while (hour === null) {
    let subvalores = [];
    let newConcat = "";
    if(concatInitialNumbers === concatNumbers){
      subvalores = obtenerSubvalores(concatInitialNumbers);
    }else{
      subvalores = obtenerSubvalores(concatNumbers);
    }

    for (let i = 0; i < subvalores.length; i++) {
      if (hoursTotal >= subvalores[i]) {
        hour = subvalores[i];
      }
    }

    newConcat = Math.abs(concatNumbers << (parseInt(concatNumbers.toString()[0]) === 0 ? 1 : parseInt(concatNumbers.toString()[0]))).toString();
    newConcat = newConcat.replace("000", (parseInt(concatNumbers.toString()[0]) === 0 ? 1 : parseInt(concatNumbers.toString()[0])));
    if(newConcat === "0"){
      concatNumbers = concatNumbers.slice(0,3);
    }else{
      concatNumbers = newConcat;
    }
  }
  

  const completeDate = (day < 10 ? "0" + day : day) + "/" + (month < 10 ? "0" + month : month) + "/" + year + " " + hour + ":00";

  return completeDate;
}




//FUNCIONES AXILIARES
// ====================================================================================================================
const obtenerSubvalores = (numero) => {
  let subvalores = [];
  const numeroString = numero.toString();

  for (let i = 0; i < numeroString.length - 1; i++) {
    const subvalor = parseInt(numeroString[i] + numeroString[i + 1]);
    subvalores.push(subvalor);
  }

  return subvalores;
};
  