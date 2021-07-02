import {Button, ButtonStrip, colors, Input} from "@dhis2/ui";
import {IconButton, withStyles} from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {cloneDeep, isEmpty} from "lodash";
import PropTypes from "prop-types";
import React, {useState} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {useRecoilState} from "recoil";
import ScorecardIndicator from "../../../../../../../../../../core/models/scorecardIndicator";
import ScorecardIndicatorGroup from "../../../../../../../../../../core/models/scorecardIndicatorGroup";
import ScorecardIndicatorHolder from "../../../../../../../../../../core/models/scorecardIndicatorHolder";
import {ScorecardEditState, ScorecardStateSelector} from "../../../../../../../../../../core/state/scorecard";
import {updateListFromDragAndDrop} from "../../../../../../../../../../shared/utils/dnd";
import DataSourceHolder from "../DataSourceHolder";
import DataSourceSelectorModal from "../DataSourceSelectorModal";

const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        background: '#F8F9FA',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

export default function DataGroup({handleAccordionChange, expanded, index, onDelete}) {
    const [scorecardEditorState, setScorecardEditorState] = useRecoilState(ScorecardEditState)
    const path = ['dataSelection', 'dataGroups', index]
    const [group, setGroup] = useRecoilState(ScorecardStateSelector(path))
    const {title, id, dataHolders} = group ?? new ScorecardIndicatorGroup();
    const [openAdd, setOpenAdd] = useState(false);
    const [titleEditOpen, setTitleEditOpen] = useState(false);
    const [titleEditValue, setTitleEditValue] = useState(title);

    const onDragEnd = (result) => {
        const {destination, source} = result || {};
        setGroup(prevState => ScorecardIndicatorGroup.set(prevState, 'dataHolders', updateListFromDragAndDrop(prevState?.dataHolders, source?.index, destination?.index)))
        setScorecardEditorState((prevState) => {
            if (prevState.selectedDataHolderIndex === source?.index) {
                return {
                    ...prevState,
                    selectedDataHolderIndex: destination?.index
                }
            }
            return prevState;
        })
    }

    const onDataSourceAdd = (addedDataSources) => {
        //Assigns each of the selected indicator to its own holder
        const newDataSources = addedDataSources.map(dataSource => (new ScorecardIndicatorHolder({
            dataSources: [new ScorecardIndicator({
                ...dataSource,
                label: dataSource.displayName
            })]
        })))
        const updatedDataSources = [...dataHolders, ...newDataSources]
        setGroup(prevState => ScorecardIndicatorGroup.set(prevState, 'dataHolders', updatedDataSources))
    }

    function onExpand(event, newExpanded) {
        if (newExpanded) {
            setScorecardEditorState((prevState) => ({
                ...prevState,
                selectedDataHolderIndex: undefined,
                selectedGroupIndex: index
            }))
        }
        handleAccordionChange(id)(event, newExpanded)
    }

    const onDataSourceDelete = (deletedDataSourceIndex) => {
        try {
            if (scorecardEditorState.selectedDataHolderIndex === deletedDataSourceIndex) {
                setScorecardEditorState(prevState => ({
                    ...prevState,
                    selectedDataHolderIndex: undefined
                }))
            }
            const updatedDataSources = cloneDeep(dataHolders) || [];
            if (!isEmpty(updatedDataSources)) {
                updatedDataSources.splice(deletedDataSourceIndex, 1);
                setGroup(prevState => ScorecardIndicatorGroup.set(prevState, 'dataHolders', updatedDataSources))
            }
        } catch (e) {
            console.log(e)
        }
    }

    const onTitleEditSubmit = (_, event) => {
        event.stopPropagation()
        if (isEmpty(titleEditValue.trim())) {
            setTitleEditValue(title)
            setTitleEditOpen(false)
        } else {
            setGroup(prevState => ScorecardIndicatorGroup.set(prevState, 'title', titleEditValue))
            setTitleEditOpen(false)
        }
    }

    return (
        <Draggable index={index} draggableId={id}>
            {
                provided => (
                    <Accordion
                        innerRef={provided.innerRef}
                        onDoubleClick={event => event.stopPropagation()}
                        expandIcon={<ExpandMoreIcon/>} square expanded={expanded === id}
                        onChange={onExpand}>
                        <AccordionSummary
                            onClick={event => event.stopPropagation()}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls={`${id}d-content`}
                            id={`${id}d--header`}>
                            {
                                titleEditOpen ?
                                    <div className='row space-between w-100'>
                                        <div onClick={(event => event.stopPropagation())} className='column'>
                                            <Input
                                                initialFocus
                                                value={titleEditValue}
                                                onChange={({value}) => setTitleEditValue(value)}/>
                                        </div>
                                        <div className='column '>
                                            <ButtonStrip end>
                                                <Button onClick={onTitleEditSubmit} primary>Save</Button>
                                                <Button onClick={(_, event) => {
                                                    event.stopPropagation()
                                                    setTitleEditOpen(false)
                                                    setTitleEditValue(title)
                                                }}>Cancel</Button>
                                            </ButtonStrip>
                                        </div>
                                    </div> :
                                    <div className='row space-between align-items-center'>
                                        <div className='row align-items-center accordion-title-container'>
                                            <p
                                                onDoubleClick={(event) => {
                                                    event.stopPropagation();
                                                    setTitleEditOpen(true)
                                                }} onClick={event => event.stopPropagation()}
                                                className='accordion-title'>{title}</p>
                                            <IconButton onClick={(event) => {
                                                event.stopPropagation()
                                                setTitleEditOpen(true)
                                            }} size='small' className='accordion-title-edit'>
                                                <EditIcon/>
                                            </IconButton>
                                        </div>
                                        <Button onClick={(_, event) => {
                                            event.stopPropagation();
                                            if (onDelete) {
                                                onDelete(id)
                                            }
                                        }}
                                                icon={<DeleteIcon/>}>Delete</Button>
                                    </div>
                            }
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className='column'>
                                {
                                    isEmpty(dataHolders) ?
                                        <div className='column w-100 text-center center' style={{height: 100}}>
                                            <p style={{color: colors.grey600}}>Add a data source</p>
                                        </div> :
                                        <DragDropContext onDragEnd={onDragEnd}>
                                            <Droppable droppableId={id}>
                                                {
                                                    provided => (
                                                        <div className='w-100' {...provided.droppableProps}
                                                             ref={provided.innerRef}>
                                                            {
                                                                dataHolders?.map((source, index) => (
                                                                    <DataSourceHolder
                                                                        dataHolder={source}
                                                                        onDelete={onDataSourceDelete}
                                                                        key={source.id}
                                                                        id={source.id}
                                                                        index={index}
                                                                    />))
                                                            }
                                                            {provided.placeholder}
                                                        </div>
                                                    )
                                                }
                                            </Droppable>
                                        </DragDropContext>
                                }
                                <div>
                                    <Button onClick={() => setOpenAdd(true)} icon={<AddIcon/>}>Add Item</Button>
                                </div>
                            </div>
                            {
                                openAdd &&
                                <DataSourceSelectorModal disabled={dataHolders.map(({id}) => id)}
                                                         onSelect={onDataSourceAdd} onClose={() => setOpenAdd(false)}
                                                         open={openAdd}/>
                            }
                        </AccordionDetails>
                    </Accordion>
                )
            }
        </Draggable>)
}

DataGroup.propTypes = {
    index: PropTypes.number.isRequired,
    expanded: PropTypes.string,
    handleAccordionChange: PropTypes.func,
    onDelete: PropTypes.func,

};
