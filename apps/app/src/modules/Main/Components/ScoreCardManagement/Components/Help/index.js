import {isEqual, pullAllWith} from "lodash";
import PropTypes from "prop-types";
import {useEffect} from "react";
import {useSetRecoilState} from "recoil";
import {HelpSteps} from "../../../../../../../../../shared/state/src/help";

export default function Help({helpSteps}) {
    const setHelpSteps = useSetRecoilState(HelpSteps);

    useEffect(() => {
        setHelpSteps((prevSteps) => [...prevSteps, ...helpSteps]);
        return () => {
            setHelpSteps((prevSteps) => {
                const newSteps = [...prevSteps];
                pullAllWith(newSteps, helpSteps, isEqual);
                return newSteps;
            });
        };
    }, [helpSteps]);

    return null;
}

Help.propTypes = {
    helpSteps: PropTypes.arrayOf(PropTypes.object).isRequired,
};
