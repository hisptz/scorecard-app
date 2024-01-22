import i18n from "@dhis2/d2-i18n";
import {colors, IconError24} from '@dhis2/ui'
import {OrgUnitSelector} from '@hisptz/dhis2-ui'
import {ContainerLoader, OrgUnitSelection} from "@scorecard/shared";
import {get} from 'lodash'
import React, {Suspense, useCallback} from "react";
import {useFormContext} from "react-hook-form";

function anyOrgUnitSelected({groups, levels, orgUnits, userOrgUnit, userSubUnit, userSubX2Unit}) {
    return userSubX2Unit || userSubUnit || userOrgUnit || groups.length > 0 || levels.length > 0 || orgUnits.length > 0;
}

export default function OrgUnit() {
    const {setValue, watch, register, formState} = useFormContext();
    register("orgUnitSelection", {
        validate: {
            atLeastOneOrgUnit: (value) => {
                if (anyOrgUnitSelected(value)) {
                    return true;
                }
                return i18n.t("Please select at least one organisation unit");
            }
        }
    });
    const organisationUnit = watch("orgUnitSelection");


    const setOrganisationUnit = useCallback(
        (updatedOrgUnitSelection) => {
            setValue("orgUnitSelection", updatedOrgUnitSelection)
        },
        [setValue],
    );

    const onSetOrgUnit = (values) => {
        setOrganisationUnit(
            OrgUnitSelection.setObject(organisationUnit, values)
        );
    };

    const error = get(formState.errors, "orgUnitSelection")

    return (
        <div className="column h-100">
            <div className="pt-16 pb-16">
                <h3>{i18n.t("Organisation Unit")}</h3>
            </div>
            {
                error &&
                <div style={{display: "flex", gap: 8, alignItems: "center", padding: "8px 0", color: colors.red500}}>
                    <IconError24/>{error?.message}</div>
            }
            <div style={{minHeight: 400}} className="access-org-unit-filter h-100">
                <Suspense fallback={<ContainerLoader height={400}/>}>
                    <OrgUnitSelector showGroups showLevels showUserOptions onUpdate={onSetOrgUnit}
                                     value={organisationUnit}/>
                </Suspense>
            </div>
        </div>
    );
}
