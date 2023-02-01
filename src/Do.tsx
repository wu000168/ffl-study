import { useEffect, useState } from "react";

function Do({ onLoad, children }: any) {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if (!loaded) {
            onLoad();
            setLoaded(true);
        }
    }, [onLoad, loaded])
    return children;
}

export default Do;