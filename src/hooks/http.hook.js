import { useState, useCallback } from "react";

export const useHttpRequest = () => {
    const [process, setProcess] = useState('waiting');

    const request = useCallback(async (url, body = null, method = "GET", headers = {'Content-Type': 'application/json'}) => {
        setProcess('loading');
        try {
            const res = await fetch(url, {method, body, headers });
            if (!res.ok) {
                throw new Error(`Could not fetch url ${url}, status ${res.status}`);
            }
            const data = await res.json();
            return data;
        } catch(e) {
            setProcess('error');
            throw e.message;
        }
    }, []);


    return {request, process, setProcess};
};
