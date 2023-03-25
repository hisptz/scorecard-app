import i18n from "@dhis2/d2-i18n";
import {Button} from "@dhis2/ui";
import {ScorecardIndicator} from "@scorecard/shared";
import {getDataSourceShortName} from "@scorecard/shared";
import {Avatar} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import React from "react";

export default function DataSource({dataSource, index, onDelete}) {
    const {label, type} = dataSource ?? new ScorecardIndicator();
    return (
        <div>
            <div className="container-bordered data-source p-8 w-100">
                <div className="row space-between align-items-center">
                    <div className="row align-items-center ">
                        <Avatar className="data-source avatar">
                            {getDataSourceShortName(type)}
                        </Avatar>
                        <p className="data-source name">{label} </p>
                    </div>
                    <div>
                        <Button
                            className="data-source close-icon"
                            small
                            onClick={(_, event) => {
                                event.stopPropagation();
                                onDelete(index);
                            }}
                            icon={<DeleteIcon/>}
                        >
                            {i18n.t("Delete")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

DataSource.propTypes = {
    dataSource: PropTypes.instanceOf(ScorecardIndicator).isRequired,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
};
