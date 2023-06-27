const Search = ({handleSubmit, search, setSearch}) => {

    const handleChangeText = (event) => {
        setSearch(event.target.value);
    }

    return ( 
        <form className="search" onSubmit={(e) => {e.preventDefault(); handleSubmit();}}>
            <input type="text" value={search} onChange={(e) => handleChangeText(e)} />
            <button type="submit" disabled={(search.length >= 2 || !search) ? false : true}>Buscar</button>
        </form>
     );
}
 
export default Search;