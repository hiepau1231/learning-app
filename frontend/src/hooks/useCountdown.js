import { useState, useEffect } from "react";

const useCountdown = (initialMinutes) => {
    const [seconds, setSeconds] = useState(initialMinutes * 60);

    useEffect(() => {
        setSeconds(initialMinutes * 60); // Reset seconds when initialMinutes changes
    }, [initialMinutes]);

    useEffect(() => {
        if (seconds <= 0) return;

        const intervalId = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [seconds]);

    return [seconds, setSeconds];
};

export default useCountdown;
