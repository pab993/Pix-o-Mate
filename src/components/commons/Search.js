import { useEffect, useState } from "react";

const Search = ({handleSubmit, search, setSearch, setCurrentPage}) => {

    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(() => {
        return () => {
            if (timeoutId) {
            clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    const handleChangeText = (event) => {
        setSearch(event.target.value);

        if(event.target.value.length >= 2){
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
    
            const newTimeoutId = setTimeout(() =>{
                console.log('Ejecutando función...');
                setCurrentPage(1);
                handleSubmit(1,event.target.value);
            }, 3000);
            setTimeoutId(newTimeoutId);
        }
    }

    return ( 
        <form className="search" onSubmit={(e) => {e.preventDefault(); handleSubmit();}}>
            <input type="text" value={search} onChange={(e) => handleChangeText(e)} />
            <button type="submit" disabled={(search.length >= 2 || !search) ? false : true}>Buscar</button>
        </form>
     );
}
 
export default Search;