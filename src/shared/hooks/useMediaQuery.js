import {useEffect, useState} from 'react';

function getWindowDimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    return {
        width: width > 1366 ? width : 1366,
        height: (height > 763 ? height : 763) - 48
    };
}

export default function useMediaQuery() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}
