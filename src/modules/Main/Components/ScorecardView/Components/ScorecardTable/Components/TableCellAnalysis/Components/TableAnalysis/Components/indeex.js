// layout.filter.length > 0 ? (
//     layout.column.length > 0 ?       
   
    
//     columnDataState?.map((cols, index) => {
//       return (
//         <DataTableRow key={'cols-table' + index}>
//           {columnDataState[
//             index == 0
//               ? columnDataState.length - (columnDataState.length - index)
//               : columnDataState.length -
//                 (columnDataState.length - index) -
//                 1
//           ]?.map(() => {
//             return cols?.map((dataColsValueId, indexPosition) => {
              
//               return (
//                 rowDataState?.map((rows, index) => {
//                   return index === 0 ? (
//                     <DataTableRow fixed bordered key={'rows-state' + index}>
//                         <DataTableCell
//                 width={'1%'}
//                 fixed
//                 key={'cells-table' + index + indexPosition}
//                 colSpan={
//                   columnDataState[index + 1]?.length *
//                     columnDataState[columnDataState.length - 1]
//                       ?.length ===
//                   isNaN
//                     ? 1
//                     : columnDataState[index + 1]?.length *
//                       columnDataState[columnDataState.length - 1]
//                         ?.length
//                 }
//                 bordered
//               >
//                 {defaultDataState['_data']['metaData']['names'][
//                   dataColsValueId
//                 ] ?? ''}{' '}
//                  <DataTableCell bordered fixed>
//                         {rows?.map((rowsInCells, cellsPositions) => {
//                           return (
//                             <tr
//                               key={'rowsInCells' + cellsPositions}
//                               bordered
//                               width={'100%'}
//                               height={'40px'}
//                             >
//                               {defaultDataState['_data']['metaData']['names'][
//                                 rowsInCells
//                               ] ?? ''}

//                               {index}
//                             </tr>
//                           )
//                         })}
//                       </DataTableCell>
//               </DataTableCell>
                     
//                     </DataTableRow>
//                   ) : (
//                     rowDataState[
//                       rowDataState.length - (rowDataState.length - index) - 1
//                     ].map(() => {
//                       return (
//                         <>
//                           {rows.length > 1 ? (
//                             <DataTableCell fixed bordered key={'rows-state' + index}>
//                               {rows?.map((rowsInCells, cellsPositions) => {
//                                 return (
//                                   <tr
//                                     key={'rowsInCells' + cellsPositions}
//                                     bordered
//                                     width={'100%'}
//                                     height={'40px'}
//                                   >
//                                     {defaultDataState['_data']['metaData']['names'][
//                                       rowsInCells
//                                     ] ?? ''}
//                                     {cellsPositions}
//                                     {index}
//                                   </tr>
//                                 )
//                               })}
//                             </DataTableCell>
//                           ) : (
//                             <DataTableRow fixed bordered key={'rows-state' + index}>
//                               <DataTableCell bordered fixed>
//                                 {rows?.map((rowsInCells, cellsPositions) => {
//                                   return (
//                                     <tr
//                                       key={'rowsInCells' + cellsPositions}
//                                       bordered
//                                       width={'100%'}
//                                       height={'40px'}
//                                     >
//                                       {defaultDataState['_data']['metaData']['names'][
//                                         rowsInCells
//                                       ] ?? ''}
//                                       {cellsPositions}
//                                       {index}
//                                     </tr>
//                                   )
//                                 })}
//                               </DataTableCell>
//                             </DataTableRow>
//                           )}
//                         </>
//                       )
//                     })
//                   )
//                 }
              
//               ))
//             })
//           })}
//         </DataTableRow>
//       )
//     })
    
//     : (
//       //   columnDataState?.map((cols, index) => {
//       //   return (
//       //     <DataTableRow key={'cols-table' + index}>
//       //       {columnDataState[
//       //         index == 0
//       //           ? columnDataState.length - (columnDataState.length - index)
//       //           : columnDataState.length -
//       //             (columnDataState.length - index) -
//       //             1
//       //       ]?.map(() => {
//       //         return cols?.map((dataColsValueId, indexPosition) => {
//       //           return (
//       //             <DataTableCell
//       //               width={'1%'}

//       //               key={'cells-table' + index + indexPosition}
//       //               colSpan={
//       //                 columnDataState[index + 1]?.length *
//       //                   columnDataState[columnDataState.length - 1]
//       //                     ?.length ===
//       //                 isNaN
//       //                   ? 1
//       //                   : columnDataState[index + 1]?.length *
//       //                     columnDataState[columnDataState.length - 1]
//       //                       ?.length
//       //               }
//       //               bordred
//       //             >
//       //               {defaultDataState['_data']['metaData']['names'][
//       //                 dataColsValueId
//       //               ] ?? ''}{' '}
//       //             </DataTableCell>
//       //           )
//       //         })
//       //       })}
//       //     </DataTableRow>
//       //   )
//       // })

//       <h1>d</h1>
//     )
//   ) : (
//     <h1 style={{ width: 50 + '%', backgroundColor: '' }}></h1>
//   )

//   //   () => {

//   //     if(layout.filter.length > 0)
//   //     {
//   //       if(layout.column.length > 0){
//   //        {columnDataState?.map((cols, index) => {
//   //          return (
//   //            <DataTableRow key={'cols-table' + index}>
//   //              {columnDataState[
//   //                index == 0
//   //                  ? columnDataState.length - (columnDataState.length - index)
//   //                  : columnDataState.length -
//   //                    (columnDataState.length - index) -
//   //                    1
//   //              ]?.map(() => {
//   //                return cols?.map((dataColsValueId, indexPosition) => {
//   //                  return (
//   //                    <DataTableCell
//   //                      width={'1%'}
//   //                      fixed
//   //                      key={'cells-table' + index + indexPosition}
//   //                      colSpan={
//   //                        columnDataState[index + 1]?.length *
//   //                          columnDataState[columnDataState.length - 1]
//   //                            ?.length ===
//   //                        isNaN
//   //                          ? 1
//   //                          : columnDataState[index + 1]?.length *
//   //                            columnDataState[columnDataState.length - 1]
//   //                              ?.length
//   //                      }
//   //                      bordered
//   //                    >
//   //                      {defaultDataState['_data']['metaData']['names'][
//   //                        dataColsValueId
//   //                      ] ?? ''}{' '}
//   //                    </DataTableCell>
//   //                  )
//   //                })
//   //              })}
//   //            </DataTableRow>
//   //          )
//   //        })}     }
//   //       else{
//   //        console.log("am in 2 go with rows");
//   //       }

//   //     }
//   //     else if (layout.column.length > 0){
//   //       console.log(" am in column ");
//   //     }
//   //  else {
//   //    console.log("display with rows only");
//   //  }
//   //   }