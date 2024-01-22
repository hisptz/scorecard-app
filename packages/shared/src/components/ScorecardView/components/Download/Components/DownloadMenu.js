import i18n from "@dhis2/d2-i18n";
import {FlyoutMenu, MenuItem} from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";
import {DownloadTypes} from "../../../../../constants";

export default function DownloadMenu({onClose, onDownload}) {
    return (
        <FlyoutMenu dataTest={"download-menu"}>
            {Object.values(DownloadTypes)?.map((type) => (
                <MenuItem
                    dataTest={`${type}-download-menu`}
                    onClick={() => {
                        onDownload(type);
                        onClose();
                    }}
                    key={`${type}-download-menu`}
                    label={type}
                />
            ))}
            <MenuItem dataTest={"ALMA-download-menu"} label={"ALMA"}>
                <MenuItem
                    dataTest={"test-alma-data-json"}
                    label={`${i18n.t("Data")}(JSON)`}
                    onClick={() => {
                        onDownload("ALMAData");
                        onClose();
                    }}
                />
                <MenuItem
                    dataTest={"test-alma-meta-data"}
                    label={i18n.t("Metadata")}
                    onClick={() => {
                        onDownload("ALMAMeta");
                        onClose();
                    }}
                />
            </MenuItem>
        </FlyoutMenu>
    );
}

DownloadMenu.propTypes = {
    onClose: PropTypes.func.isRequired,
    onDownload: PropTypes.func.isRequired,
};
