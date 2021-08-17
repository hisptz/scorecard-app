import i18n from "@dhis2/d2-i18n";
import {Chip, colors, Field} from "@dhis2/ui";
import React, {useState} from "react";
import {useRecoilState} from "recoil";
import PeriodSelectorModal from "../../../../../../../../../../../shared/Components/PeriodSelectorModal";
import {PeriodState} from "../../../state/period";

export default function PeriodSelector() {
    const [periodSelection, onChange] = useRecoilState(PeriodState)
    const {periods} = periodSelection ?? {};
    const [selectorOpen, setSelectorOpen] = useState(false);
    return (
        <div className="pr-16" style={{width: "30%"}}>
            <Field label={i18n.t("Period(s)")}>
                <div className='row' style={{
                    padding: 8,
                    maxWidth: "100%",
                    overflowX: "auto",
                    background: colors.grey300,
                    borderRadius: 4,
                }} onClick={() => {
                    setSelectorOpen(true)
                }}>
                    {
                        periods?.map(({name: displayName, id}) => <Chip
                            key={`${id}-further-analysis-selector`}>{displayName}</Chip>)
                    }
                </div>
            </Field>
            {
                selectorOpen && <PeriodSelectorModal onClose={() => setSelectorOpen(false)} onSelect={onChange}
                                                     initialValue={periodSelection}/>
            }
        </div>
    )
}

