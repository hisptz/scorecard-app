import i18n from '@dhis2/d2-i18n'
import {Chip, colors, Field} from '@dhis2/ui'
import React, {useState} from "react";
import {useRecoilState} from "recoil";
import OrgUnitSelectorModal from "../../../../../../../../../../../shared/Components/OrgUnitSelectorModal";
import {OrgUnitState} from "../../../state/orgUnit";

export default function OrgUnitSelector() {
    const [orgUnitSelection, onChange] = useRecoilState(OrgUnitState)
    const {orgUnits} = orgUnitSelection;
    const [selectorOpen, setSelectorOpen] = useState(false);
    return (
        <div className="pr-16" style={{width: "30%"}}>
            <Field label={i18n.t("Organisation Unit(s)")}>
                <div className='row' style={{
                    padding: 8,
                    maxWidth: "100%",
                    overflowX: "auto",
                    background: colors.grey300,
                    borderRadius: 4
                }} onClick={() => {
                    setSelectorOpen(true)
                }}>
                    {
                        orgUnits?.map(({displayName, id}) => <Chip
                            key={`${id}-further-analysis-selector`}>{displayName}</Chip>)
                    }
                </div>
            </Field>
            {
                selectorOpen && <OrgUnitSelectorModal onClose={() => setSelectorOpen(false)} onSelect={onChange}
                                                      initialValue={orgUnitSelection}/>
            }
        </div>
    )
}

