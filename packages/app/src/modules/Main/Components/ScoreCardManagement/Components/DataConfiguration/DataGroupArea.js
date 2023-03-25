import i18n from "@dhis2/d2-i18n";
import {Button, Input} from "@dhis2/ui";
import AddIcon from "@material-ui/icons/Add";
import {DataSelection, ScorecardConfigEditState, updateListFromDragAndDrop} from "@scorecard/shared";
import {debounce, find,} from "lodash";
import PropTypes from "prop-types";
import React, {useRef, useState} from "react";
import {DragDropContext} from "react-beautiful-dnd";
import {useFormContext} from "react-hook-form";
import {atom, useRecoilCallback, useSetRecoilState} from "recoil";
import DataGroups from "./Components/DataGroups";


export const SearchedGroupsState = atom({
    key: "dataSelectionFilterAtom",
    default: []
})

export default function DataGroupArea({onGroupAdd}) {
    const {setValue, watch} = useFormContext();
    const dataSelection = watch("dataSelection");
    const [keyword, setKeyword] = useState("");
    const setSearchedGroups = useSetRecoilState(SearchedGroupsState);

    const onSearch = useRef(
        debounce((keyword) => {
                setSearchedGroups(() => {
                    if (keyword) {
                        return dataSelection?.dataGroups.filter(dataHolderGroup => {
                            return find(dataHolderGroup?.dataHolders, (dataHolderIndicator) => {
                                return find(dataHolderIndicator?.dataSources, (dataHolderIndicatorSelections) => {
                                    const searchIndex =
                                        `${dataHolderIndicatorSelections.name} ${dataHolderIndicatorSelections.label}`.toLowerCase();
                                    return searchIndex.match(new RegExp(keyword.toLowerCase()))
                                })
                            })
                        })?.map(({id}) => id)
                    } else {
                        return []
                    }
                })
            }
            , 500))

    const onDragEnd = useRecoilCallback(
        ({set}) =>
            (result) => {
                const {destination, source} = result ?? {};
                setValue("dataSelection", DataSelection.set(dataSelection, "dataGroups", [
                    ...updateListFromDragAndDrop(
                        dataSelection?.dataGroups,
                        source?.index,
                        destination?.index
                    ),
                ]))
                set(ScorecardConfigEditState, (prevState) => {
                    if (prevState.selectedGroupIndex === source?.index) {
                        return {
                            ...prevState,
                            selectedGroupIndex: destination?.index,
                        };
                    }
                    return prevState;
                });
            },
        [dataSelection, setValue]
    );

    return (
        <div className="column h-100">
            <div className="p-16">
                <Input value={keyword} name="" onChange={({value}) => {
                    setKeyword(value)
                    if (value !== "" && value !== undefined) {
                        onSearch.current(value)
                    } else {
                        setSearchedGroups([])
                    }
                }} placeholder={i18n.t("Search for Indicator")}/>
            </div>
            <h4 className="pl-16">{i18n.t("Groups")}</h4>
            <div style={{maxHeight: '60vh', overflowY: 'auto', flex: 1}}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <DataGroups/>
                </DragDropContext>
            </div>
            <div className="p-8 column" style={{alignItems: "start"}}>
                <Button
                    onClick={onGroupAdd}
                    icon={<AddIcon/>}
                    dataTest="scocecard-add-group-button"
                    className="scorecard-add-group-button"
                >
                    {i18n.t("Add Group")}
                </Button>
            </div>
        </div>
    );
}

DataGroupArea.propTypes = {
    onGroupAdd: PropTypes.func.isRequired,
};
