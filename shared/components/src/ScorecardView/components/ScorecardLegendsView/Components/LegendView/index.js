import PropTypes from "prop-types";
import React from "react";

export default function LegendView({legend}) {
    const {name, color} = legend ?? {color: "#FFFFFF"};
    return (
        <div className="row align-items-center">
            <div
                style={{
                    width: 60,
                    height: 25,
                    background: color,
                    border: "1px solid rgb(232, 237, 242)",
                    padding: 16,
                }}
            />
            <p style={{paddingLeft: 8, marginRight: 8}}>{name}</p>
        </div>
    );
}

LegendView.propTypes = {
    legend: PropTypes.object.isRequired,
};
