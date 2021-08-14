import PropTypes from 'prop-types'
import React from 'react'
import LayoutSelector from "./Components/LayoutSelector";
import OrgUnitSelector from "./Components/OrgUnitSelector";
import PeriodSelector from "./Components/PeriodSelector";

export default function DimensionsSelector({dimensions, setDimensions}) {
    const {orgUnitSelection, periodSelection, layout} = dimensions;

    const updateDimension = (dimension) => (value) =>{
        setDimensions({
            ...dimensions,
            [dimension]: value
        })
    }

    return (
        <div className='row space-between'>
            <OrgUnitSelector orgUnitSelection={orgUnitSelection} onChange={updateDimension('orgUnitSelection')}  />
            <PeriodSelector periodSelection={periodSelection} onChange={updateDimension('periodSelection')}/>
            <LayoutSelector onChange={updateDimension('layout')} layoutSelection={layout} />
        </div>
    )
}

DimensionsSelector.propTypes = {
    dimensions: PropTypes.object.isRequired,
    setDimensions: PropTypes.func.isRequired
};

