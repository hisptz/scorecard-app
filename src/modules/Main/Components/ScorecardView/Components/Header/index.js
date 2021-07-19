import {Card, ButtonStrip, Button} from '@dhis2/ui'
import React from 'react'
import {FilterComponentTypes} from "../../../../../../core/constants/selection";
import SelectionWrapper from "../../../../../../shared/Components/SelectionWrapper";

export default function ScorecardViewHeader() {


    return (
       <div className="selection-card">
           <Card >
              <div className='row space-between align-items-center pl-16 pr-16'>
                  <div className='row'>
                      <SelectionWrapper name={'Organisation Unit'} onClick={() => {
                      }} type={FilterComponentTypes.ORG_UNIT}/>
                      <SelectionWrapper name='Period' onClick={() => {
                      }} type={FilterComponentTypes.PERIOD}/>
                  </div>
                  <div className='column align-items-end' >
                      <ButtonStrip className='pb-8'>
                          <Button>Home</Button>
                          <Button>Refresh</Button>
                      </ButtonStrip>
                      <ButtonStrip>
                          <Button>Options</Button>
                          <Button>Edit</Button>
                          <Button>Print</Button>
                          <Button>Help</Button>
                      </ButtonStrip>
                  </div>
              </div>
           </Card>
       </div>
    )
}
