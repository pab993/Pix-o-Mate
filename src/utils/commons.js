export const generatePhone = () => {
    let result = "";
    const max_value = 9;
    
    for(let i=0; i<9; i++){
        result = result + Math.floor(Math.random() * max_value);
    }
    return parseInt(result);
};

export const generateCreationDateFormatted = (start, end) => {
    let result = "";
    const randomDate = start;
    let years = end.getFullYear() - randomDate.getFullYear();

    const monthRandomDiff = 12 - (randomDate.getMonth() + 1);
    const monthEndDiff = end.getMonth() + 1;

    let months = monthRandomDiff + monthEndDiff;
    
    let days = 0;
    let hours = 0;

    if(months >= 12){
      months = months % 12;
    }

    if(years === 0 && months === 0){
      days = end.getDate() - randomDate.getDate();
    }else if(years !== 0 || months !== 0){
      const totalEndMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();
      const daysEndDiff = totalEndMonth - end.getDate();
      const daysCreatedDiff = randomDate.getDate();
      days = (daysEndDiff + daysCreatedDiff);
    }

    const endHours = end.getHours();

    let randomHours = randomDate.getHours();

    hours = (24 - randomHours) + endHours

    if(hours >= 24){
      hours = hours % 24;
    }
    

    result += years !== 0 ? `${years} años` : "";
    result += months !== 0 ? (years !== 0 ? ", ": "") + `${months} meses` : "";
    result += days !== 0 ? (months !== 0 ? ", ": "") + `${days} días` : "";
    result += hours !== 0 ? (days !== 0 ? ", ": "") + `${hours} horas.` : ".";
    result = result === "" ? "Se registró hace un momento." : "Se registró hace " + result;
    
    
    return result;
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
  