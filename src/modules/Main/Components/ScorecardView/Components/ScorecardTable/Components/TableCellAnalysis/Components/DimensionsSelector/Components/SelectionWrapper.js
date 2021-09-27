import i18n from "@dhis2/d2-i18n";
import { colors, Tooltip } from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";

export default function SelectionWrapper({
  selectedItems,
  onClick,
  icon,
  label,
}) {
  const Icon = icon;

  return (
    <Tooltip
      content={
        <div>
          {selectedItems?.map(({ displayName, name, id }) => (
            <p style={{ margin: 4 }} key={`cell-analysis-selector-${id}`}>
              {name ?? displayName}
            </p>
          ))}
        </div>
      }
    >
      <div
        className="row align-items-center"
        style={{
          padding: 8,
          maxWidth: "100%",
          overflowX: "auto",
          background: colors.grey300,
          borderRadius: 4,
        }}
        onClick={() => {
          onClick(true);
        }}
      >
        <Icon style={{ color: colors.grey700, margin: "0 4px" }} />
        <p style={{ fontSize: 14, color: colors.grey900, margin: 0 }}>
          {label}
          {selectedItems !== null && ":"}
        </p>
        {selectedItems !== null && (
          <p
            style={{
              fontSize: 14,
              color: colors.grey700,
              margin: 0,
              paddingLeft: 4,
            }}
          >
            {i18n.t("{{number}} Selected", { number: selectedItems?.length })}
          </p>
        )}
      </div>
    </Tooltip>
  );
}

SelectionWrapper.propTypes = {
  icon: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  selectedItems: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
