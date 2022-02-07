import i18n from "@dhis2/d2-i18n";
import {Button, Checkbox, Input} from "@dhis2/ui";
import AddIcon from "@material-ui/icons/Add";
import { debounce, find, } from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import {DragDropContext} from "react-beautiful-dnd";
import {useFormContext} from "react-hook-form";
import {useRecoilCallback, useRecoilState,atom, selector, useSetRecoilState} from "recoil";
import DataSelection from "../../../../../../core/models/dataSelection";
import {ScorecardConfigDirtyState, ScorecardConfigEditState,} from "../../../../../../core/state/scorecard";
import {updateListFromDragAndDrop} from "../../../../../../shared/utils/dnd";
import DataGroups from "./Components/DataGroups";

export const dataSelector = selector({
    key:"dataSelectionFilterSelector",
    get:({get})=>{
      return  get(dataSetAtom);
    },
    set:(({set},value)=>{
         set(dataSetAtom,value);
    })
})


 export const dataSetAtom = atom({
    key:"dataSelectionFilterAtom",
    default:[]
})

export default function DataGroupArea({onGroupAdd}) {
    const {setValue, watch} = useFormContext();
    const dataSelection = watch("dataSelection");
    const [keyword, setKeyword] = useState("");
    const setFilteredIndicatorList = useSetRecoilState(dataSelector);
    const [targetOnLevels, updateTargetOnLevels] = useRecoilState(
        ScorecardConfigDirtyState("targetOnLevels")

    );
    const [filteredIndicator, setFilteredIndicator] = useState([]);

useEffect(() => {
  if(keyword != "" || keyword != undefined){
    onSearch.current(keyword) 
  }
  if(filteredIndicator.length > 0)
  {
    setFilteredIndicatorList(filteredIndicator)
  }
},[keyword])



const onSearch = useRef(
   debounce((keyword)=>{
    setFilteredIndicator(()=>{
  return dataSelection?.dataGroups.filter(dataHolderGroup=>{
    return find( dataHolderGroup?.dataHolders,(dataHolderIndicator)=>{
        return find(dataHolderIndicator?.dataSources,(dataHolderIndicatorSelections)=>{
          const searchIndex =
          `${dataHolderIndicatorSelections.name} ${dataHolderIndicatorSelections.label}`.toLowerCase();
            return searchIndex.match(new RegExp(keyword.toLowerCase()))
    })
})
  })  
   })}
    ))

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
            <div className="row space-between pr-16 pt-16 target-on-level-selector ">
                <p style={{margin: 0}} className="pl-16">
                    {i18n.t("Set Target on Levels")}
                </p>
                <Checkbox
                    dataTest={"set-target-selection"}
                    checked={targetOnLevels}
                    onChange={() => updateTargetOnLevels((prevState) => !prevState)}
                />
            </div>
            <div style={{
                padding:"3%"
            }}>
                  <Input name="" onChange={({value})=>setKeyword(value)} placeholder="Search for Indicator" />
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
