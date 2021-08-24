import {atom} from "recoil";
import {getWindowDimensions} from "../../shared/utils/utils";



const ScreenDimensionState = atom({
    key: 'screen-dimensions',
    default: {},
    effects_UNSTABLE: [
        ({setSelf, onSet, trigger}) => {
            if (trigger === 'get') {
                onSet(() => setSelf(getWindowDimensions() ?? {height: 768, width: 1366}))
            }

            function handleResize() {
                setSelf(getWindowDimensions());
            }

            window.addEventListener('resize', handleResize);

            return () => window.removeEventListener('resize', handleResize);
        }
    ]
})

export {
    ScreenDimensionState
}
