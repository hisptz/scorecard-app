import i18n from "@dhis2/d2-i18n";
import {Button, ButtonStrip, colors, MenuItem} from "@dhis2/ui";
import {ScorecardAccess} from "@scorecard/shared";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {cloneDeep, set} from "lodash";
import PropTypes from "prop-types";
import React, {useState} from "react";
import {getAccessIcon, getAccessName} from "../../../utils";
import SharingMenu from "./SharingMenu";

export default function SingleSharingComponent({
                                                   access,
                                                   onDelete,
                                                   onAccessChange,
                                               }) {
    const {access: selectedAccess, type, displayName} = access;
    const [ref, setRef] = useState();

    const onChange = (newAccess) => {
        const updatedAccess = cloneDeep(access);
        set(updatedAccess, ["access"], newAccess);
        onAccessChange(updatedAccess);
        setRef(undefined);
    };

    return (
        <MenuItem
            icon={getAccessIcon(type)}
            label={
                <div className="row space-between align-items-center">
                    <div className="column">
                        <p style={{margin: 2, fontSize: 16}}>{displayName}</p>
                        <p style={{color: colors.grey700, fontSize: 14, margin: 0}}>
                            {getAccessName(selectedAccess)}
                        </p>
                    </div>
                    <div className="column align-items-end">
                        <ButtonStrip className="edit-delete-access">
                            <Button
                                onClick={(_, e) => setRef(e.currentTarget)}
                                icon={<EditIcon/>}
                            >
                                {i18n.t("Edit")}
                            </Button>
                            {Boolean(onDelete) && (
                                <Button
                                    onClick={() => {
                                        onDelete(access);
                                    }}
                                    icon={<DeleteIcon/>}
                                >
                                    {i18n.t("Delete")}
                                </Button>
                            )}
                        </ButtonStrip>
                    </div>
                    {ref && (
                        <SharingMenu
                            reference={ref}
                            onClose={() => setRef(undefined)}
                            selectedAccess={selectedAccess}
                            onAccessChange={onChange}
                        />
                    )}
                </div>
            }
        />
    );
}

SingleSharingComponent.propTypes = {
    access: PropTypes.instanceOf(ScorecardAccess).isRequired,
    onAccessChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
};
