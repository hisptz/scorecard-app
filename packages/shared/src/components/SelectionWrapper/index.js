import i18n from "@dhis2/d2-i18n";
import {Box, Chip, Tooltip} from "@dhis2/ui";
import {chunk, head} from "lodash";
import PropTypes from "prop-types";
import React from "react";
import {FilterComponentTypes} from "../../constants";

const ITEM_DISPLAY_NO = 1;

export default function SelectionWrapper({
                                             type,
                                             onClick,
                                             selectedItems = [],
                                             id,
                                             ...props
                                         }) {
    const selectText =
        type === FilterComponentTypes.PERIOD
            ? i18n.t("Selected period")
            : i18n.t("Selected organisation unit");

    const itemsToDisplay = head(chunk(selectedItems, ITEM_DISPLAY_NO));

    return (
        <div id={id} onClick={onClick}>
            <Tooltip
                content={
                    <div>
                        {selectedItems?.map(({name, displayName, id}) => (
                            <p style={{margin: 4}} key={`${id}-tooltip`}>
                                {name ?? displayName}
                            </p>
                        ))}
                    </div>
                }
            >
                <Box className="selection-box" {...props}>
                    <p className="selection-box-header">{selectText}</p>

                    <Box className="selection-text-box" width="90%" height="40%">
                        {itemsToDisplay?.map(({name, displayName, id}) => (
                            <Chip key={id}>{name ?? displayName}</Chip>
                        ))}
                        {selectedItems?.length > ITEM_DISPLAY_NO && (
                            <Chip>
                                {i18n.t(`and {{number}} more`, {
                                    number: selectedItems.length - ITEM_DISPLAY_NO,
                                })}
                            </Chip>
                        )}
                    </Box>
                </Box>
            </Tooltip>
        </div>
    );
}

SelectionWrapper.defaultProps = {
    type: "",
    name: "",
};

SelectionWrapper.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
        FilterComponentTypes.PERIOD,
        FilterComponentTypes.ORG_UNIT,
    ]).isRequired,
    onClick: PropTypes.func.isRequired,
    id: PropTypes.string,
    selectedItems: PropTypes.array,
};
