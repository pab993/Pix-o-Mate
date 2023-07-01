export const generatePhone = () => {
    let result = "";
    const max_value = 9;
    
    for(let i=0; i<9; i++){
        result = result + Math.floor(Math.random() * max_value);
    }
    return parseInt(result);
};


export const generateCreationDate = (start, end) => {
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return (randomDate.getDate() < 10 ? ("0" + randomDate.getDate()) : randomDate.getDate()) + "/" + ((randomDate.getMonth() + 1) < 10 ? ("0" + (randomDate.getMonth() + 1)) : (randomDate.getMonth() + 1)) + "/" + randomDate.getFullYear();
};


export const generatePhoneHashing = (value) => {
    function generarHash(str) {
        let hash = 0;
        if (str.length === 0) {
          return hash;
        }
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash;
        }
        return hash;
      }
      const hash = generarHash(value.toString());
      const phoneNumber = Math.abs(hash % 1000000000).toString().padStart(9, '0');
    
      return phoneNumber;
}


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


export const generateCreationDateHashing = (start, value) => {
  const actual = new Date();
  const strValue = value.toString();
  let concatNumbers = "";
  for (let i = 0; i < strValue.length; i++) {
    concatNumbers += strValue.charCodeAt(i);
  }

  const concatInitialNumbers = concatNumbers;

  const yearsDiff = actual.getFullYear() - start.getFullYear();
  const monthsTotal = 12;

  let year = null;
  let month = null;
  let day = null;

  while (year === null) {
    let subvalores = [];
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
    concatNumbers = Math.abs(concatNumbers << 1);
  }

  year = start.getFullYear() + year;

  while (month === null) {
    let subvalores = [];
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
    concatNumbers = Math.abs(concatNumbers << 1);
  }

  const daysTotal = new Date(year, month, 0).getDate();

  while (day === null) {
    let subvalores = [];
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
    concatNumbers = Math.abs(concatNumbers << 1);
  }
  

  const completeDate = (day < 10 ? "0" + day : day) + "/" + (month < 10 ? "0" + month : month) + "/" + year;

  return completeDate;

  /*new Date(2012, 0, 1)
  "21".charCodeAt(0) + "21".charCodeAt(1)*/
}

const obtenerSubvalores = (numero) => {
  const subvalores = [];
  const numeroString = numero.toString();

  for (let i = 0; i < numeroString.length - 1; i++) {
    const subvalor = parseInt(numeroString[i] + numeroString[i + 1]);
    subvalores.push(subvalor);
  }

  return subvalores;
};

/*export const generateDateHashing = (value) => {
    function generateCreationDate(value) {
      const start = new Date('2000-01-01');
      const actual = new Date();
      const range = actual.getTime() - start.getTime();
      const strValue = value.toString();
      for (let i = 0; i < strValue.length; i++) {
        console.log(strValue.charCodeAt(i));
      }
    }

    const creationDate = generateCreationDate(value);
    const fechaFormateada = creationDate.getDate() + "/" + (creationDate.getMonth() + 1 ) + "/" + creationDate.getFullYear();
  
    return fechaFormateada;
}*/
  