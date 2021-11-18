import i18n from "@dhis2/d2-i18n";
import { Tooltip } from "@dhis2/ui";
import { IconButton } from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import UnlinkIcon from "@material-ui/icons/LinkOff";
import { findIndex, head, last } from "lodash";
import PropTypes from "prop-types";
import React, { useCallback } from "react";
import ScorecardIndicatorHolder from "../../../../../../../../../../../core/models/scorecardIndicatorHolder";
import DataSourceHolder from "../../DataSourceHolder";

export default function LinkingContainer({
  chunk,
  onDataSourceDelete,
  onLink,
  onUnlink,
  dataHolders,
}) {
  const linkable = chunk.length > 1;
  const hasLink = head(chunk)?.dataSources?.length > 1;


  const getIndex = useCallback(
    (id) => {
      return findIndex(dataHolders, ["id", id]);
    },
    [chunk, dataHolders]
  );
  const onLinkClick = () => {
    const indexOfMergedHolder = getIndex(head(chunk)?.id);
    const indexOfDeletedHolder = getIndex(last(chunk)?.id);
    onLink(indexOfMergedHolder, indexOfDeletedHolder);
  };

  const onUnlinkClick = () => {
    onUnlink(head(chunk).id);
  };

  const onIconClick = () => {
    hasLink ? onUnlinkClick() : onLinkClick();
  };

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
                  <UnlinkIcon className="link-button" />
                ) : (
                  <LinkIcon className="link-button" />
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
