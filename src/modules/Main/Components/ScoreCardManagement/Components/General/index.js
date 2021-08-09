import PropTypes from 'prop-types'
import React from 'react'
import GeneralForm from "./Components/GeneralForm";

export default function GeneralScorecardForm({formRef}) {
    return (
        <div className='container'>
            <div className='column space-between'>
                <GeneralForm formRef={formRef}/>
            </div>
        </div>
    )
}

GeneralScorecardForm.propTypes = {
    formRef: PropTypes.instanceOf(HTMLFormElement)
};

