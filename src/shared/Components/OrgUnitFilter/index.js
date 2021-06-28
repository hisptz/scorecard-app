import {
    Box,
    CenteredContent,
    CheckboxField,
    CircularLoader,
    colors,
    OrganisationUnitTree,
    SingleSelectField,
    SingleSelectOption
} from '@dhis2/ui';
import {cloneDeep, find, isEmpty, remove} from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import useOrgUnitLevelsAndGroups from "./hooks/getLevelsAndGroups";
import useOrgUnitsRoot from "./hooks/useOrgUnitsRoot";

export default function OrgUnitFilter({value, onUpdate}) {
    const {roots, error, loading} = useOrgUnitsRoot();
    const {
        orgUnits: selectedOrgUnits = [],
        level: selectedLevel,
        group: selectedGroup,
        userOrgUnit,
        userSubUnit,
        userSubX2Unit
    } = value || {};
    const {groups, levels, error: levelsAndGroupsError, loading: levelsAndGroupsLoading} = useOrgUnitLevelsAndGroups()

    function isOrgUnitSelected(orgUnit) {
        return !isEmpty(find(selectedOrgUnits, ['id', orgUnit?.id]));
    }

    const onSelectOrgUnit = (orgUnit) => {
        onUpdate({
            ...value,
            orgUnits: [...selectedOrgUnits, orgUnit]
        })
    }

    const onDeselectOrgUnit = (orgUnit) => {
        const updateValue = cloneDeep(selectedOrgUnits);
        remove(updateValue, ['id', orgUnit.id])
        onUpdate({
            ...value,
            orgUnits: updateValue
        })
    }

    const onLevelSelect = ({selected}) => {
        onUpdate({
            ...value,
            level: selected
        })
    }

    const onGroupSelect = ({selected}) => {
        onUpdate({
            ...value,
            group: selected
        })
    }

    const onUserOrUnitChange = ({checked}) => {
        onUpdate({
            ...value,
            userOrgUnit: checked
        })
    }
    const onUserSubUnitsChange = ({checked}) => {
        onUpdate({
            ...value,
            userSubUnit: checked
        })
    }

    const onUserSubX2Units = ({checked}) => {
        onUpdate({
            ...value,
            userSubX2Unit: checked
        })
    }


    return (
        <Box minHeight='600px'>
            <div style={{minHeight: 400}} className='container-bordered'>
                <div style={{background: colors.grey200}} className='row space-between p-16'>
                    <CheckboxField checked={userOrgUnit} onChange={onUserOrUnitChange} label='User organisation unit'/>
                    <CheckboxField checked={userSubUnit} onChange={onUserSubUnitsChange} label='User sub-units'/>
                    <CheckboxField checked={userSubX2Unit} onChange={onUserSubX2Units} label='User sub-x2-units'/>
                </div>
                {
                    error && <CenteredContent><p>{error?.message || error.toString()}</p></CenteredContent>
                }
                <div className='p-16' style={{overflow: 'auto', maxHeight: 400}}>
                    {
                        roots &&
                        <OrganisationUnitTree
                            selected={selectedOrgUnits?.map(({path}) => path)}
                            roots={roots?.map(({id}) => id)}
                            onChange={(orgUnit) => {
                                if (isOrgUnitSelected(orgUnit)) {
                                    onDeselectOrgUnit(orgUnit)
                                } else {
                                    onSelectOrgUnit(orgUnit)
                                }
                            }
                            }
                            singleSelection
                        />
                    }
                    {
                        (loading && !error) && (<CenteredContent><CircularLoader small/></CenteredContent>)
                    }
                </div>
            </div>
            <div className='row pt-16'>
                <div className='column'>
                    <SingleSelectField loading={levelsAndGroupsLoading} error={levelsAndGroupsError}
                                       validationText={levelsAndGroupsError?.message}
                                       onChange={onLevelSelect} selected={selectedLevel}
                                       label='Select Level'>
                        {
                            levels?.map(({displayName, id}) => (
                                <SingleSelectOption label={displayName} value={id} key={id}/>))
                        }
                    </SingleSelectField>
                </div>
                <div className='column'>
                    <SingleSelectField loading={levelsAndGroupsLoading} error={levelsAndGroupsError}
                                       validationText={levelsAndGroupsError?.message}
                                       onChange={onGroupSelect} selected={selectedGroup}
                                       label='Select Group'>
                        {
                            groups?.map(({displayName, id}) => (
                                <SingleSelectOption label={displayName} value={id} key={id}/>))
                        }
                    </SingleSelectField>
                </div>
            </div>
        </Box>
    )
}

OrgUnitFilter.propTypes = {
    value: PropTypes.object,
    onUpdate: PropTypes.func
}
