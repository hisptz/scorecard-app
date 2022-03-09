import {atom} from "recoil";
import {getWindowDimensions} from "@hisptz/scorecard-utils/src";

const ScreenDimensionState = atom({
    key: "screen-dimensions",
    default: {},
    effects_UNSTABLE: [
        ({setSelf}) => {
            function handleResize() {
                setSelf(getWindowDimensions());
            }

            window.addEventListener("resize", handleResize);

            return () => window.removeEventListener("resize", handleResize);
        },
    ],
});

export {ScreenDimensionState};
