import i18n from '@dhis2/d2-i18n'
import {Button, Chip, Modal, ModalActions, ModalContent, ModalTitle} from '@dhis2/ui'
import DescriptionIcon from '@material-ui/icons/Description';
import ChartIcon from '@material-ui/icons/Equalizer';
import TableChartIcon from '@material-ui/icons/TableChart';
import PropTypes from 'prop-types'
import React, {useEffect, useState,Suspense} from 'react'
import {useRecoilCallback, useRecoilValueLoadable, useSetRecoilState} from "recoil";
import FullPageError from "../../../../../../../../shared/Components/Errors/FullPageError";
import {FullPageLoader} from "../../../../../../../../shared/Components/Loaders";
import ChartAnalysis from "./Components/ChartAnalysis";
import DictionaryAnalysis from "./Components/DictionaryAnalysis";
import DimensionsSelector from "./Components/DimensionsSelector";
import TableAnalysis from "./Components/TableAnalysis";
import {DataSourceState, DataState} from "./state/data";
import {LayoutState} from "./state/layout";
import {OrgUnitState} from "./state/orgUnit";
import {PeriodState} from "./state/period";

const viewTypes = [
    {
        displayName: i18n.t('Table'),
        name: 'table',
        icon: <TableChartIcon/>,
        component: TableAnalysis
    },
    {
        displayName: i18n.t('Chart'),
        name: 'chart',
        icon: <ChartIcon/>,
        component: ChartAnalysis
    },
    {
        displayName: i18n.t('Dictionary'),
        name: 'dictionary',
        icon: <DescriptionIcon/>,
        component: DictionaryAnalysis
    },
]

export default function TableCellAnalysis({onClose, dataHolder}) {
    const dataState = useRecoilValueLoadable(DataState)
    const setDataSources = useSetRecoilState(DataSourceState)
    const [viewType, setViewType] = useState(viewTypes[0]);
    const dataSources = dataHolder?.dataSources;
    const SelectedView = viewType.component;

    const resetStates = useRecoilCallback(({reset}) => () => {
        reset(OrgUnitState)
        reset(PeriodState)
        reset(LayoutState)
        reset(DataSourceState)
    },[])

    useEffect(() => {
        setDataSources(dataSources)
        return () => {
            resetStates()
        };
    }, [dataSources, resetStates, setDataSources]);

    return (
        <Modal className='large-modal' position='middle' onClose={onClose} large>
            <ModalTitle>
                {
                    dataSources?.length > 1 ? `${dataSources[0]?.displayName} / ${dataSources[1]?.displayName}` : `${dataSources[0]?.displayName}`
                }
            </ModalTitle>
            <ModalContent>
                <DimensionsSelector/>
                <Suspense fallback={<div>Loading...</div>}>
                   <div style={{
                       maxHeight: '45vh' ,
                       flex: 1,
                       overflow: 'auto',
                       margin: '16px 0'
                   }}>
                       {
                           dataState.state === 'hasError' && <FullPageError error={dataState.contents}/>
                       }
                       {
                           dataState.state === 'loading' && <FullPageLoader/>
                       }
                       {
                           dataState.state === 'hasValue' && <SelectedView/>
                       }
                   </div>
               </Suspense>

            </ModalContent>
            <ModalActions>
                <div className='row space-between align-items-center'>
                    <div>
                        {
                            viewTypes?.map((type) => (
                                <Chip selected={type?.name === viewType?.name} onClick={() => setViewType(type)}
                                      key={type?.name}
                                      icon={type?.icon}>{type?.displayName}</Chip>
                            ))
                        }
                    </div>
                    <Button onClick={onClose}>Cancel</Button>
                </div>
            </ModalActions>
        </Modal>
    )
}


TableCellAnalysis.propTypes = {
    dataHolder: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};
