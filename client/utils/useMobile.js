import { useEffect, useState } from "react"

const useMobile = () => {
    const [width, setWidth] = useState(window.innerWidth);

    const handleWindowChange = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowChange);

        return () => {
            window.removeEventListener('resize', handleWindowChange);
        }
    }, []);

    return width < 630;
}

export default useMobile;