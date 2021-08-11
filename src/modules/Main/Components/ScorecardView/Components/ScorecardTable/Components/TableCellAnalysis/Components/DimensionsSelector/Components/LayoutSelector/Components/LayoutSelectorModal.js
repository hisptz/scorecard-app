import i18n from '@dhis2/d2-i18n'
import {Button, ButtonStrip, Chip, Modal, ModalActions, ModalContent, ModalTitle} from "@dhis2/ui";
import PropTypes from 'prop-types'
import React, {useState} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";


function Layout({layout}) {
    const {column, row, series, category, filter} = layout ?? {}

    const onDragEnd = (results) => {
        console.log(results)
    }

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div  className='grid-2'>
                    <Droppable droppableId={'column-series'}>
                        {
                            (provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className='column bordered p-8'>
                                    <p>{column ? i18n.t('Column') : i18n.t('Series')}</p>
                                    {
                                        (column ?? series)?.map((val, index) => (
                                            <Draggable index={index} draggableId={`${val}-draggable`}  key={`${val?.name}-draggable`}>
                                                {
                                                    (provided)=>(
                                                        <Chip {...provided.draggableProps}
                                                              {...provided.dragHandleProps}
                                                              ref={provided.innerRef} >{val?.displayName}</Chip>
                                                    )
                                                }
                                            </Draggable>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </Droppable>
                    <Droppable droppableId={'row-category'}>
                        {
                            (provided)=>(
                                <div {...provided.droppableProps}
                                     ref={provided.innerRef} className='column bordered p-8'>
                                    <p>{row ? i18n.t('Row') : i18n.t('Category')}</p>
                                    {
                                        (row ?? category)?.map((val, index) => (
                                            <Draggable index={index} draggableId={`${val}-draggable`}  key={`${val?.name}-draggable`}>
                                                {
                                                    (provided)=>(
                                                        <Chip {...provided.draggableProps}
                                                              {...provided.dragHandleProps}
                                                              ref={provided.innerRef} >{val?.displayName}</Chip>
                                                    )
                                                }
                                            </Draggable>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </Droppable>
                    <Droppable droppableId={'filter'}>
                        {
                            (provided)=>(
                                <div {...provided.droppableProps}
                                     ref={provided.innerRef} className='column bordered p-8'>
                                    <p>{i18n.t('Filter')}</p>
                                    {
                                        (filter)?.map((val, index) => (
                                            <Draggable index={index} draggableId={`${val}-draggable`}  key={`${val?.name}-draggable`}>
                                                {
                                                    (provided)=>(
                                                        <Chip {...provided.draggableProps}
                                                              {...provided.dragHandleProps}
                                                              ref={provided.innerRef} >{val?.displayName}</Chip>
                                                    )
                                                }
                                            </Draggable>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </Droppable>
                </div>
            </DragDropContext>
        </div>
    )
}

Layout.propTypes = {
    layout: PropTypes.object.isRequired
};


export default function LayoutSelectorModal({onClose, onSelect, initialValue}) {

    const [value, setValue] = useState(initialValue);

    const onUpdateClick = () => {
        onSelect(value);
        onClose()
    }

    return (
        <Modal large onClose={onClose}>
            <ModalTitle>Select Layout(s)</ModalTitle>
            <ModalContent>
                <Layout layout={value}/>
            </ModalContent>
            <ModalActions>
                <ButtonStrip>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button primary onClick={onUpdateClick}>Update</Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

LayoutSelectorModal.propTypes = {
    initialValue: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
};
