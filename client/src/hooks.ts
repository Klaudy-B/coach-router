import { useEffect } from "react";

export const useFetch = (dispatch: React.Dispatch<any>, url: string, username: string|undefined)=>{
    useEffect(
        ()=>{
            const abort = new AbortController();
            fetch(url, {signal: abort.signal})
            .then(res=>res.json())
            .then(data=>dispatch(data))
            .catch(error=>{
                if(error.name === 'AbortError'){
                    return;
                }
                dispatch({error: error.message})
            })
        return ()=>abort.abort()
        },
        [username]
    )
}