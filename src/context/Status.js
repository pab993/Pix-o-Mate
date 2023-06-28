import { createContext, useContext, useEffect, useMemo, useState } from "react";

const StatusContext = createContext();

export default function StatusProvider({children}) {

    const [favs, setFavs] = useState([]);

    useEffect(() => {
          try{
              setFavs(window.localStorage.getItem("favs") ? JSON.parse(window.localStorage.getItem("favs")) : []);
          } catch(e){
              window.localStorage.removeItem('catsCount');
              window.localStorage.removeItem('favs');
          }
    }, []);

    const updateFavs = (favs) => {
      setFavs(favs);
      localStorage.setItem('favs', JSON.stringify(favs));
    }

    const contextValue = useMemo(() => {
        return {
          favs,
          updateFavs,
          setFavs,
        };
      }, [favs]);

    return (
        <StatusContext.Provider value={contextValue}>
            {children}
        </StatusContext.Provider>
    );
}

export const useStatus = () => useContext(StatusContext);