import {Menu, MenuDivider} from "@dhis2/ui";
import React, {Fragment} from "react";
import useAccessManage from "../../../../hooks/useAccessManage";
import SingleSharingComponent from "./Components/SingleSharingComponent";

export default function SharingList() {
    const {publicAccess, onPublicAccessChange, userAndUserGroupAccesses, onUpdate, onDelete} = useAccessManage();

    return (
        <div>
            <Menu dense>
                <SingleSharingComponent
                    onAccessChange={onPublicAccessChange}
                    access={publicAccess}
                />
                <MenuDivider/>
                {userAndUserGroupAccesses?.map((access) => (
                    <Fragment key={access?.id}>
                        <SingleSharingComponent
                            onAccessChange={onUpdate}
                            access={access}
                            onDelete={onDelete}
                        />
                        <MenuDivider/>
                    </Fragment>
                ))}
            </Menu>
        </div>
    );
}
