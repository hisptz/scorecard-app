import i18n from "@dhis2/d2-i18n";
import {Chip, colors, Field} from "@dhis2/ui";
import PropTypes from 'prop-types'
import React, {useState} from "react";
import LayoutSelectorModal from "./Components/LayoutSelectorModal";

export default function LayoutSelector({layoutSelection, onChange}) {

    const [selectorOpen, setSelectorOpen] = useState(false);
    return (
        <div style={{width: "30%"}}>
            <Field label={i18n.t("Layout")}>
                <div className='row' style={{
                    padding: 8,
                    maxWidth: "100%",
                    overflowX: "auto",
                    background: colors.grey300,
                    borderRadius: 4
                }} onClick={() => {
                    setSelectorOpen(true)
                }}>
                    <Chip>Layout here</Chip>
                </div>
            </Field>
            {
                selectorOpen && <LayoutSelectorModal initialValue={layoutSelection} onClose={()=>setSelectorOpen(false)} onSelect={onChange} />
            }
        </div>
    )
}

LayoutSelector.propTypes = {
    layoutSelection: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};
