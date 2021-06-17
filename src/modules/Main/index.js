import React from 'react'
import EmptyScoreCardList from "./Components/EmptyScoreCardList";


export default function ScoreCardList() {


    return (
        <div>
            <EmptyScoreCardList onNewClick={console.log}/>
        </div>
    )
}
