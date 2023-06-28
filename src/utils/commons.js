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
    return randomDate.getDate() + "/" + (randomDate.getMonth() + 1 ) + "/" + randomDate.getFullYear();
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
  