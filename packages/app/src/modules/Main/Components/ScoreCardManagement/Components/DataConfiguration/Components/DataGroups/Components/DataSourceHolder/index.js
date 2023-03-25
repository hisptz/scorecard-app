import {colors} from "@dhis2/ui";
import {ScorecardIndicatorHolder} from "@scorecard/shared";
import {ScorecardConfigDirtySelector, ScorecardConfigEditState,} from "@scorecard/shared";
import PropTypes from "prop-types";
import React from "react";
import {Draggable} from "react-beautiful-dnd";
import {useFormContext} from "react-hook-form";
import {useRecoilState, useSetRecoilState} from "recoil";
import DataSource from "../DataSource";


export default function DataSourceHolder({dataHolder, id, index, onDelete}) {
    const {dataSources} = dataHolder ?? new ScorecardIndicatorHolder();
    const {trigger} = useFormContext();
    const [scorecardEditState, setScorecardEditState] = useRecoilState(
        ScorecardConfigEditState
    );
    const path = [
        "dataGroups",
        scorecardEditState.selectedGroupIndex,
        "dataHolders",
        index,
    ];
    const updateDataHolder = useSetRecoilState(
        ScorecardConfigDirtySelector({key: "dataSelection", path})
    );

    const selected = scorecardEditState.selectedDataHolderIndex === index;
    const hasLinked = dataSources?.length > 1;
    const onDataSourceDelete = (indicatorIndex) => {
        if (hasLinked) {
            const updatedDataSources = [...dataSources];
            updatedDataSources.splice(indicatorIndex, 1);
            updateDataHolder((prevState) =>
                ScorecardIndicatorHolder.set(
                    prevState,
                    "dataSources",
                    updatedDataSources
                )
            );
            return;
        }
        onDelete(index);
    };
    return (
        <Draggable draggableId={`${id}`} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div className="row align-items-center">
                        <div
                            onClick={async () => {
                                if (id) {
                                    if (await trigger()) {
                                        setScorecardEditState((prevState) => ({
                                            ...prevState,
                                            selectedDataHolderIndex: index,
                                        }));
                                    }
                                }
                            }}
                            className="column center"
                            style={{
                                border: hasLinked && `1px solid ${colors.grey400}`,
                                background: selected && `${colors.teal200}`,
                                padding: hasLinked && 8,
                                marginBottom: 8,
                            }}
                        >
                            {dataSources?.map((dataGroup, index) => {
                                return (
                                    <div
                                        className="data-holder"
                                        key={dataGroup.id}
                                        style={{margin: "4px 0"}}
                                    >
                                        <DataSource
                                            hasLinked={hasLinked}
                                            dataSource={dataGroup}
                                            key={dataGroup.id}
                                            onDelete={onDataSourceDelete}
                                            index={index}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
}

DataSourceHolder.propTypes = {
    dataHolder: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
};
