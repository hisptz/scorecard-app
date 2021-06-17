import i18n from '@dhis2/d2-i18n'
import {Button, colors} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import {ReactComponent as ScorecardIllustration} from '../../../../resources/images/scorecard_illustration.svg'
import useMediaQuery from "../../../../shared/hooks/useMediaQuery";

export default function EmptyScoreCardList({onNewClick}) {
    const {width, height} = useMediaQuery();
    return (
        <div className='container'>
            <div className='column center'>
                <div className='bordered text-center center column'
                     style={{height: height * .4, width: width * .4, borderRadius: 8}}>
                    <div className='p-32'>
                        <ScorecardIllustration style={{height: 150}}/>
                    </div>
                    <h1>{i18n.t('Welcome to Scorecard App!')}</h1>
                    <p style={{
                        fontStyle: 'italic',
                        color: colors.grey700
                    }}>{i18n.t('Create a scorecard instantly, over tea break')}...</p>
                    <div className='pt-16'>
                        <Button onClick={onNewClick} primary>{i18n.t('New Scorecard')}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

EmptyScoreCardList.propTypes = {
    onNewClick: PropTypes.func.isRequired
};

