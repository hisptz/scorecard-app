/* eslint-disable import/no-unresolved */
import React from 'react'
import {  useRecoilValue, } from 'recoil'
import { DataState } from '../../state/data'
import TableItemComponent from './Components/table-item/table-item.component';

export default function TableAnalysis() {
    return (
      <div
        className="column align-items-center center"
        style={{ minHeight: 500 }}
      >
        <TableItemComponent width="50%" />
      </div> // TODO: @danford
    )
  }