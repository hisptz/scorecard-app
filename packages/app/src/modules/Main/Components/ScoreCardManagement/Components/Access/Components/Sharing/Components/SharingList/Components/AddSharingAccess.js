import i18n from "@dhis2/d2-i18n";
import {Button, SingleSelectField, SingleSelectOption} from "@dhis2/ui";
import {ACCESS_TYPES} from "@scorecard/shared";
import AddIcon from "@material-ui/icons/Add";
import React, {useState} from "react";
import useAccessManage from "../../../../../hooks/useAccessManage";
import {getAccessName} from "../../../utils";
import UserAndUserGroupSelector from "../../UserAndUserGroupSelector";

export default function AddSharingAccess() {
    const {userAndUserGroupAccesses, onAdd} = useAccessManage();
    const [selectedUserGroup, setSelectedUserGroup] = useState();
    const [selectedAccess, setSelectedAccess] = useState();

    const selectedList = userAndUserGroupAccesses;

    const onAddClick = () => {
        onAdd(selectedAccess, selectedUserGroup);
        setSelectedAccess(undefined);
        setSelectedUserGroup(undefined);
    }

    return (
        <div className="row align-items-end add-sharing-access">
            <div className="column pr-16 user-selector" style={{width: "50%"}}>
                <UserAndUserGroupSelector
                    selectedList={selectedList?.map(({id}) => id)}
                    selected={selectedUserGroup}
                    onChange={setSelectedUserGroup}
                />
            </div>
            <div className="column pr-16" style={{width: "30%"}}>
                <SingleSelectField
                    className="access-selector"
                    required
                    selected={selectedAccess}
                    onChange={({selected}) => {
                        setSelectedAccess(selected);
                    }}
                    label={i18n.t("Select Access")}
                >
                    {ACCESS_TYPES?.map((accessType) => (
                        <SingleSelectOption
                            value={accessType}
                            key={accessType}
                            label={getAccessName(accessType)}
                        />
                    ))}
                </SingleSelectField>
            </div>
            <div className="column" style={{width: "20%"}}>
                <Button
                    className="add-access-button"
                    onClick={onAddClick}
                    icon={<AddIcon/>}
                >
                    {i18n.t("Add")}
                </Button>
            </div>
        </div>
    );
}
