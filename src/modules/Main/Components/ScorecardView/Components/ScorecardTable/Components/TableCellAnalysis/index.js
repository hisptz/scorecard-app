import i18n from '@dhis2/d2-i18n'
import {Button, ButtonStrip, Modal, ModalActions, ModalContent, ModalTitle} from '@dhis2/ui'
import DescriptionIcon from '@material-ui/icons/Description';
import ChartIcon from '@material-ui/icons/Equalizer';
import TableChartIcon from '@material-ui/icons/TableChart';
import PropTypes from 'prop-types'
import React, {useState} from 'react'
import {useRecoilValue} from "recoil";
import {ScorecardViewState} from "../../../../../../../../core/state/scorecard";
import ChartAnalysis from "./Components/ChartAnalysis";
import DictionaryAnalysis from "./Components/DictionaryAnalysis";
import DimensionsSelector from "./Components/DimensionsSelector";
import TableAnalysis from "./Components/TableAnalysis";

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
    const periodSelection = useRecoilValue(ScorecardViewState('periodSelection'))
    const orgUnitSelection = useRecoilValue(ScorecardViewState('orgUnitSelection'))
    const [viewType, setViewType] = useState(viewTypes[0]);
    const dataSources = dataHolder?.dataSources;
    const SelectedView = viewType.component;

    const [dimensions, setDimensions] = useState({
        periodSelection,
        orgUnitSelection,
        dataSources,
        layout: {
            column: [{displayName: 'Data', name: 'data'}],
            row: [{displayName: 'Organisation Unit', name: 'orgUnit'}],
            filter: []
        }
    });

    return (
        <Modal className='large-modal' position='middle' onClose={onClose} large>
            <ModalTitle>
                {
                    dataSources?.length > 1 ? `${dataSources[0]?.displayName} / ${dataSources[1]?.displayName}` : `${dataSources[0]?.displayName}`
                }
            </ModalTitle>
            <ModalContent>
                <DimensionsSelector dimensions={dimensions} setDimensions={setDimensions}/>
                <>
                    <SelectedView dimensions={dimensions}/>
                </>
                <ButtonStrip>
                    {
                        viewTypes?.map((type) => (
                            <Button onClick={() => setViewType(type)} key={type?.name}
                                    icon={type?.icon}>{type?.displayName}</Button>
                        ))
                    }
                </ButtonStrip>
            </ModalContent>
            <ModalActions>
                <Button onClick={onClose}>Cancel</Button>
            </ModalActions>
        </Modal>
    )
}


TableCellAnalysis.propTypes = {
    dataHolder: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};
