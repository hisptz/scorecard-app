import i18n from '@dhis2/d2-i18n'
import {Button, colors, Tooltip} from "@dhis2/ui";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {cloneDeep, filter, find, findIndex, flattenDeep, fromPairs, head, isEmpty, last,} from "lodash";
import PropTypes from "prop-types";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {useRecoilCallback, useRecoilState, useRecoilValue} from "recoil";
import ScorecardIndicator from "../../../../../../../../../../core/models/scorecardIndicator";
import ScorecardIndicatorGroup from "../../../../../../../../../../core/models/scorecardIndicatorGroup";
import ScorecardIndicatorHolder from "../../../../../../../../../../core/models/scorecardIndicatorHolder";
import {OrgUnitLevels} from "../../../../../../../../../../core/state/orgUnit";
import {
    ScorecardConfigDirtySelector,
    ScorecardConfigDirtyState,
    ScorecardConfigEditState,
} from "../../../../../../../../../../core/state/scorecard";
import {DataGroupErrorState} from "../../../../../../../../../../core/state/validators";
import {updateListFromDragAndDrop} from "../../../../../../../../../../shared/utils/dnd";
import {generateLegendDefaults, uid} from "../../../../../../../../../../shared/utils/utils";
import DataSourceSelectorModal from "../DataSourceSelectorModal";
import {Accordion, AccordionDetails, AccordionSummary} from "./Components/Accordions";
import EditTitle from "./Components/EditTitle";
import GroupTitle from "./Components/GroupTitle";
import LinkingContainer from "./Components/LinkingContainer";
import {customChunk} from "./utils";


export default function DataGroup({
                                      handleAccordionChange,
                                      expanded,
                                      index,
                                      onDelete,
                                  }) {
    const [scorecardEditorState, setScorecardEditorState] =
        useRecoilState(ScorecardConfigEditState);
    const legendDefinitions = useRecoilValue(
        ScorecardConfigDirtyState("legendDefinitions")
    );
    const filteredLegendDefinitions = useMemo(() => filter(legendDefinitions, ({isDefault}) => (!isDefault)), [legendDefinitions]);
    const path = ["dataGroups", index];
    const [group, setGroup] = useRecoilState(ScorecardConfigDirtySelector({key: 'dataSelection', path}));
    const orgUnitLevels = useRecoilValue(OrgUnitLevels)
    const targetOnLevels = useRecoilValue(ScorecardConfigDirtyState('targetOnLevels'))
    const {title, id, dataHolders} = group ?? new ScorecardIndicatorGroup();
    const errors = useRecoilValue(DataGroupErrorState(id))
    const [openAdd, setOpenAdd] = useState(false);
    const [titleEditOpen, setTitleEditOpen] = useState(false);
    const [titleEditValue, setTitleEditValue] = useState(title);

    const summaryRef = useRef()

    const onLink = (indexOfMergedHolder, indexOfTheDeletedHolder) => {
        const dataSourceToLink = head(
            dataHolders[indexOfTheDeletedHolder]?.dataSources
        );
        const mergedHolder =
            ScorecardIndicatorHolder.linkDataSource(dataHolders[indexOfMergedHolder], dataSourceToLink);
        const updatedHolderList = [...dataHolders];
        updatedHolderList.splice(indexOfMergedHolder, 1, mergedHolder);
        updatedHolderList.splice(indexOfTheDeletedHolder, 1);
        setGroup((prevState) =>
            ScorecardIndicatorGroup.set(prevState, "dataHolders", updatedHolderList)
        );
    };

    const onUnlink = (id) => {
        //get the linked holder by id
        const dataHolder = find(dataHolders, ["id", id]);
        const dataHolderIndex = findIndex(dataHolders, ["id", id]);
        //create a new holder for the last dataSource
        const newDataHolder = new ScorecardIndicatorHolder({
            dataSources: [last(dataHolder?.dataSources)],
        });
        const dataHolderToModify = cloneDeep(dataHolder);
        const modifiedDataHolder = ScorecardIndicatorHolder.set(
            dataHolderToModify,
            "dataSources",
            dataHolderToModify?.dataSources?.splice(0, 1)
        );
        const updatedHolderList = [...dataHolders];
        updatedHolderList.splice(dataHolderIndex, 1, modifiedDataHolder);
        updatedHolderList.splice(dataHolderIndex, 0, newDataHolder);
        setGroup((prevState) =>
            ScorecardIndicatorGroup.set(prevState, "dataHolders", updatedHolderList)
        );
    };

    const onDragEnd = useRecoilCallback(({set}) => (result) => {
        const {destination, source} = result || {};
        set(ScorecardConfigDirtySelector({key: 'dataSelection', path}), (prevState) =>
            ScorecardIndicatorGroup.set(
                prevState,
                "dataHolders",
                updateListFromDragAndDrop(
                    prevState?.dataHolders,
                    source?.index,
                    destination?.index
                )
            )
        );
        set(ScorecardConfigEditState, (prevState) => {
            if (prevState.selectedDataHolderIndex === source?.index) {
                return {
                    ...prevState,
                    selectedDataHolderIndex: destination?.index,
                };
            }
            return prevState;
        });
    });

    const onDataSourceAdd = (addedDataSources) => {
        //Assigns each of the selected indicator to its own holder
        const newDataSources = addedDataSources.map(
            (dataSource) =>
                new ScorecardIndicatorHolder({
                    id: uid(),
                    dataSources: [
                        new ScorecardIndicator({
                            ...dataSource,
                            label: dataSource.displayName,
                            legends: targetOnLevels ? fromPairs([...orgUnitLevels?.map(({id}) => [id, generateLegendDefaults(filteredLegendDefinitions, 100, true)])]) : generateLegendDefaults(filteredLegendDefinitions, 100, true),
                        }),
                    ],
                })
        );
        const updatedDataSources = [...dataHolders, ...newDataSources];
        setGroup((prevState) =>
            ScorecardIndicatorGroup.set(prevState, "dataHolders", updatedDataSources)
        );
    };

    useEffect(() => {
        setScorecardEditorState((prevState) => ({
            ...prevState,
            selectedDataHolderIndex: undefined,
            selectedGroupIndex: index,
        }));
    }, [expanded, index]);

    const onExpand = (event, newExpanded) => {
        handleAccordionChange(id)(event, newExpanded);
    };

    const onDataSourceDelete = (deletedDataSourceIndex) => {
        try {
            if (
                scorecardEditorState.selectedDataHolderIndex === deletedDataSourceIndex
            ) {
                setScorecardEditorState((prevState) => ({
                    ...prevState,
                    selectedDataHolderIndex: undefined,
                }));
            }
            const updatedDataSources = cloneDeep(dataHolders) || [];
            if (!isEmpty(updatedDataSources)) {
                updatedDataSources.splice(deletedDataSourceIndex, 1);
                setGroup((prevState) =>
                    ScorecardIndicatorGroup.set(
                        prevState,
                        "dataHolders",
                        updatedDataSources
                    )
                );
            }
        } catch (e) {
            console.log(e);
        }
    };

    const onTitleEditSubmit = (_, event) => {
        event.stopPropagation();
        if (isEmpty(titleEditValue.trim())) {
            setTitleEditValue(title);
            setTitleEditOpen(false);
        } else {
            setGroup((prevState) =>
                ScorecardIndicatorGroup.set(prevState, "title", titleEditValue)
            );
            setTitleEditOpen(false);
        }
    };

    const dataHolderChunks = customChunk(dataHolders);
    const selectedDataSourcesIds = flattenDeep(
        dataHolders.map(({dataSources}) => dataSources)
    ).map(({id}) => id);

    console.log({dataHolderChunks})

    return (
        <Draggable index={index} draggableId={id}>
            {(provided) => (
                <Accordion
                    innerRef={provided.innerRef}
                    onDoubleClick={(event) => event.stopPropagation()}
                    expandIcon={<ExpandMoreIcon/>}
                    square
                    expanded={expanded === id}
                    onChange={onExpand}
                >
                    <Tooltip
                        content={i18n.t('Click to {{action}}, drag to rearrange', {action: expanded === id ? i18n.t('collapse') : i18n.t('expand')})}>
                        <AccordionSummary
                            innerRef={summaryRef}
                            onClick={(event) => event.stopPropagation()}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            expandIcon={<ExpandMoreIcon className="expand-group-icon"
                                                        dataTest="scorecard-group-expand"/>}
                            aria-controls={`${id}d-content`}
                            id={`${id}d--header`}
                            dataTest="scorecard-group-item"
                        >
                            {titleEditOpen ? (
                                <EditTitle onTitleEditSubmit={onTitleEditSubmit} titleEditValue={titleEditValue}
                                           onClose={setTitleEditOpen} title={title}
                                           setTitleEditValue={setTitleEditValue}/>
                            ) : (
                                <GroupTitle title={title} onDelete={onDelete} setTitleEditOpen={setTitleEditOpen}
                                            id={id}/>
                            )}
                        </AccordionSummary>
                    </Tooltip>
                    <AccordionDetails>
                        <div className="column data-holders-area">
                            {isEmpty(dataHolders) ? (
                                <div
                                    className="column w-100 text-center center"
                                    style={{height: 100}}
                                >
                                    <p style={{color: colors.grey600}}>{i18n.t('Add a data source')}</p>
                                </div>
                            ) : (
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable droppableId={`${id}`}>
                                        {(provided) => (
                                            <div
                                                className="w-100 "
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                            >
                                                {dataHolderChunks?.map((chunk, i) => (
                                                    <LinkingContainer
                                                        dataHolders={dataHolders}
                                                        onUnlink={onUnlink}
                                                        onLink={onLink}
                                                        chunk={chunk}
                                                        chunkIndex={i}
                                                        onDataSourceDelete={onDataSourceDelete}
                                                        key={`${i}-linking-container-${group?.id}`}
                                                    />
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            )}
                            <div>
                                <Button
                                    className="scorecard-indicator-add"
                                    dataTest='scorecard-indicator-add'
                                    onClick={() => setOpenAdd(true)}
                                    icon={<AddIcon/>}
                                >
                                    {i18n.t('Add Item')}
                                </Button>
                            </div>
                        </div>
                        {openAdd && (
                            <DataSourceSelectorModal
                                disabled={selectedDataSourcesIds}
                                onSelect={onDataSourceAdd}
                                onClose={() => setOpenAdd(false)}
                                open={openAdd}
                            />
                        )}
                    </AccordionDetails>
                </Accordion>
            )}
        </Draggable>
    );
}

DataGroup.propTypes = {
    index: PropTypes.number.isRequired,
    expanded: PropTypes.string,
    handleAccordionChange: PropTypes.func,
    onDelete: PropTypes.func,
};
