import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { instance } from "../utils/axios-config";

const InterceptorContext = createContext();

export default function InterceptorProvider({children}) {

    const [apiCalls, setApiCalls] = useState(0);
    const [favs, setFavs] = useState([]);
    
    useEffect(() => {

        try{
            setFavs(window.localStorage.getItem("favs") ? JSON.parse(window.localStorage.getItem("favs")) : []);
            const apiInterceptor = instance.interceptors.request.use((config) => {
                setApiCalls((prevApiCalls) => prevApiCalls + 1);
                return config;
            });
    
            return () => {
                instance.interceptors.request.eject(apiInterceptor);
            };
        } catch(e){
            window.localStorage.removeItem('catsCount');
            window.localStorage.removeItem('favs');
        }
        
    }, []);

    const updateFavs = (favs) => {
        setFavs(favs);
        localStorage.setItem('favs', JSON.stringify(favs));
      }
  
      const deleteFavs = (favs) => {
        setFavs(favs);
        localStorage.removeItem('favs');
      }


    const contextValue = useMemo(() => {
        return {
            apiCalls,
            setApiCalls,
            favs,
            updateFavs,
            deleteFavs,
            setFavs
        };
    }, [apiCalls, favs]);

    return (
        
        <InterceptorContext.Provider value={contextValue}>
            
            {children}
            
        </InterceptorContext.Provider>
        
    );
}

export const useInterceptor = () => useContext(InterceptorContext);