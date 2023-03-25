import i18n from "@dhis2/d2-i18n";
import {Tooltip} from "@dhis2/ui";
import {ScorecardIndicatorHolder} from "@scorecard/shared";
import {IconButton} from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import UnlinkIcon from "@material-ui/icons/LinkOff";
import PropTypes from "prop-types";
import React from "react";
import useLinkManage from "../../../../../hooks/useLinkManage";
import DataSourceHolder from "../../DataSourceHolder";

export default function LinkingContainer({
                                             chunk,
                                             onDataSourceDelete,
                                             onLink,
                                             onUnlink,
                                             dataHolders,
                                         }) {

    const {
        linkable,
        hasLink,
        onIconClick,
        getIndex,
        onUnlinkClick
    } = useLinkManage({onLink, onUnlink, dataHolders, chunk})

    return (
        <div className="linking-container">
            <div className="row align-items-center">
                <div className="column">
                    {chunk?.map((source) => (
                        <Tooltip
                            content={i18n.t("Click to configure, drag to rearrange")}
                            key={source.id}
                        >
                            <DataSourceHolder
                                onUnlink={onUnlinkClick}
                                dataHolder={source}
                                onDelete={onDataSourceDelete}
                                key={source.id}
                                id={source.id}
                                index={getIndex(source.id)}
                            />
                        </Tooltip>
                    ))}
                </div>
                <div className="link-button-container">
                    <Tooltip
                        content={i18n.t("Click to {{linkAction}}", {
                            linkAction: hasLink ? i18n.t("unlink") : i18n.t("link"),
                        })}
                    >
                        <IconButton onClick={onIconClick} disabled={!linkable && !hasLink}>
                            {(linkable || hasLink) &&
                                (hasLink ? (
                                    <UnlinkIcon className="link-button"/>
                                ) : (
                                    <LinkIcon className="link-button"/>
                                ))}
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}

LinkingContainer.propTypes = {
    chunk: PropTypes.array.isRequired,
    dataHolders: PropTypes.arrayOf(PropTypes.instanceOf(ScorecardIndicatorHolder))
        .isRequired,
    onDataSourceDelete: PropTypes.func.isRequired,
    onLink: PropTypes.func.isRequired,
    onUnlink: PropTypes.func.isRequired,
};
