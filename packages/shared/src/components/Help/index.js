import {HelpSteps} from "@scorecard/state";
import {isEqual, pullAllWith} from "lodash";
import PropTypes from "prop-types";
import {useEffect} from "react";
import {useSetRecoilState} from "recoil";
import "../locales"

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
