import { Menu, MenuDivider } from "@dhis2/ui";
import produce from "immer";
import { cloneDeep, findIndex, remove, set } from "lodash";
import React, { Fragment, useMemo } from "react";
import { useRecoilState } from "recoil";
import { AccessTypes } from "../../../../../../../../../../core/constants/scorecardAccessType";
import { ScorecardConfigDirtyState } from "../../../../../../../../../../core/state/scorecard";
import SingleSharingComponent from "./Components/SingleSharingComponent";

export default function SharingList() {
  const [publicAccess, setPublicAccess] = useRecoilState(
    ScorecardConfigDirtyState("publicAccess")
  );
  const [userGroupAccesses, setUserGroupAccesses] = useRecoilState(
    ScorecardConfigDirtyState("userGroupAccesses")
  );
  const [userAccesses, setUserAccesses] = useRecoilState(
    ScorecardConfigDirtyState("userAccesses")
  );

  const userAndUserGroupAccesses = useMemo(
    () => [...(userAccesses || []), ...(userGroupAccesses || [])],
    [userAccesses, userGroupAccesses]
  );

  const onPublicAccessChange = (value) => {
    setPublicAccess(value);
  };

  const onDelete = (access) => {
    const { type } = access || {};
    if (type === "user") {
      const updatedList = cloneDeep(userAccesses);
      remove(updatedList, ["id", access?.id]);
      setUserAccesses(updatedList);
      return;
    }
    const updatedList = cloneDeep(userGroupAccesses);
    remove(updatedList, ["id", access?.id]);
    setUserGroupAccesses(updatedList);
  };

  const onUpdate = (updatedAccess) => {
    const { type } = updatedAccess || {};
    if (type === AccessTypes.USER) {
      setUserAccesses((prevUserAccesses) => {
        const index = findIndex(prevUserAccesses, ["id", updatedAccess?.id]);
        return produce(prevUserAccesses, (draft) => {
          set(draft, [index], updatedAccess);
        });
      });
    }
    setUserGroupAccesses((prevUserGroupAccesses) => {
      const index = findIndex(prevUserGroupAccesses, ["id", updatedAccess?.id]);
      return produce(prevUserGroupAccesses, (draft) => {
        set(draft, [index], updatedAccess);
      });
    });
  };

  return (
    <div>
      <Menu dense>
        <SingleSharingComponent
          onAccessChange={onPublicAccessChange}
          access={publicAccess}
        />
        <MenuDivider />
        {userAndUserGroupAccesses?.map((access) => (
          <Fragment key={access?.id}>
            <SingleSharingComponent
              onAccessChange={onUpdate}
              access={access}
              onDelete={onDelete}
            />
            <MenuDivider />
          </Fragment>
        ))}
      </Menu>
    </div>
  );
}
