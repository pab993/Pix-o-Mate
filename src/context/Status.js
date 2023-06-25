import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { instance } from "../utils/axios-config";

const StatusContext = createContext();

export default function StatusProvider({children}) {

    const [favs, setFavs] = useState(0);
    const [catsCount, setCatsCount] = useState(0);

    useEffect(() => {
        
    }, []);

    const contextValue = useMemo(() => {
        return {
          favs,
          catsCount,
          setFavs,
          setCatsCount
        };
      }, [favs, catsCount]);

    return (
        <StatusContext.Provider value={contextValue}>
            {children}
        </StatusContext.Provider>
    );
}

export const useStatus = () => useContext(StatusContext);