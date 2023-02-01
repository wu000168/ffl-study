import { useState, useEffect } from "react";

function Timer({ startTime }: any) {
    const [now, setNow] = useState(Date.now());
    useEffect(() => {
        const interval = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(interval);
    }, []);
    const time = now - startTime;
    return `${Math.floor(time / 1000 / 60)}:${Math.floor(time / 1000 % 60)}`
}

export default Timer;