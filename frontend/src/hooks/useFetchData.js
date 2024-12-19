import { useCallback, useEffect, useRef, useState } from "react";

const useFetchData = ({ fn, defaultValue = [], params = null }) => {
    const [data, setData] = useState(defaultValue);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const paramsRef = useRef(params);

    const fetchData = useCallback(
        async (fetchParams) => {
            try {
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                const result = await fn(fetchParams);
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        },
        [fn]
    );

    useEffect(() => {
        fetchData(paramsRef.current);
    }, [fetchData]);

    useEffect(() => {
        if (JSON.stringify(paramsRef.current) !== JSON.stringify(params)) {
            paramsRef.current = params;
            fetchData(params);
        }
    }, [params, paramsRef.current, fetchData]);

    const refetchData = () => {
        fetchData(paramsRef.current);
    };

    return {
        data,
        loading,
        error,
        refetchData,
    };
};

export default useFetchData;
