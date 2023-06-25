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