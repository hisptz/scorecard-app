import i18n from "@dhis2/d2-i18n";
import {Chip, colors, Field} from "@dhis2/ui";
import {capitalize, isEmpty} from 'lodash'
import React, {useState} from "react";
import {useRecoilState} from "recoil";
import {LAYOUTS} from "../../../../../../../../../../../../core/constants/layout";
import {LayoutState} from "../../../../state/layout";
import LayoutSelectorModal from "./Components/LayoutSelectorModal";


export default function LayoutSelector() {
    const [layoutSelection, onChange] = useRecoilState(LayoutState)
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
                    {
                        Object.keys(layoutSelection)?.map(key => {
                            const value = layoutSelection[key];
                            return !isEmpty(value) && <Chip key={`${key}`}>
                                <b>{`${i18n.t('{{ dimension }}', {dimension: capitalize(key)})}: `}</b>
                                {value?.map(val => LAYOUTS[val]?.displayName).join(', ')}
                            </Chip>
                        })
                    }
                </div>
            </Field>
            {
                selectorOpen &&
                <LayoutSelectorModal initialValue={layoutSelection} onClose={() => setSelectorOpen(false)}
                                     onSelect={onChange}/>
            }
        </div>
    )
}

