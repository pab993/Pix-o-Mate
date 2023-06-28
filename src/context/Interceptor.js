import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { instance } from "../utils/axios-config";

const InterceptorContext = createContext();

export default function InterceptorProvider({children}) {

    const [apiCalls, setApiCalls] = useState(0);
    useEffect(() => {

        const apiInterceptor = instance.interceptors.request.use((config) => {
            setApiCalls((prevApiCalls) => prevApiCalls + 1);
            return config;
        });

        return () => {
            instance.interceptors.request.eject(apiInterceptor);
        };
    }, []);


    const contextValue = useMemo(() => {
        return {
            apiCalls,
            setApiCalls
        };
    }, [apiCalls]);

    return (
        
        <InterceptorContext.Provider value={contextValue}>
            
            {children}
            
        </InterceptorContext.Provider>
        
    );
}

export const useInterceptor = () => useContext(InterceptorContext);