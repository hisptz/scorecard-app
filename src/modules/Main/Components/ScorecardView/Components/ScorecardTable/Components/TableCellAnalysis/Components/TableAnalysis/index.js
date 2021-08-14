/* eslint-disable react/prop-types */
import {useAlert} from "@dhis2/app-runtime";
import {
    DataTable,
    TableHead,
    TableBody,
    // TableFoot,
    DataTableRow,
    DataTableCell,
    DataTableColumnHeader,
} from '@dhis2/ui'
import { auto } from "async";
import {flatten, isEqual,uniqWith ,uniq } from 'lodash';
import PropTypes from 'prop-types'
import React, {useEffect,Suspense} from 'react'
import {atom, selector, useRecoilValue, useSetRecoilState} from "recoil";
import {PeriodResolverState} from "../../../../../../../../../../core/state/period";
import useTableAnalysisData from "./hooks/useTableAnalysisData";


const dataDefaults = {
    column:['dx'],
    rows:['ou'],
    filter:['dx','pe','ou']
}


const columnAtom = atom({
    key:'columnAtomState',
    default:[]
})
// const spanSelector = selector({
//     key:'tableSpanSelector',
//     get:({get})=>{
//    let columns = get(columnAtom);
//    let rows = get(rowAtom);
//    console.log("your rowsx columns lenght is "+ columns?.length*rows?.length)
//     }
// })
const dataAtomAtom = atom({
    key:'dataState',
    default:undefined

})
const rowAtom = atom({
    key:'rowAtomState',
    default:[]
})

const filterAtom = atom({
    key:'filterAtomState',
    default:[]
})

// const dataManipulatingFn = (data)=>{
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     // const setdataFilter = useSetRecoilState(filterAtom)

//     console.log("onCalling datas");
//     // eslint-disable-next-line react/prop-types
//     console.log(data['_data']['metaData'])
//     //for Filters
//     for (var filtersId in dataDefaults['filter']){
//         // setdataFilter((filters)=> [...filters,filtersId])
//     }
//     // const setdataColumn = useSetRecoilState(columnAtom)
//     // const setdataRow = useSetRecoilState(rowAtom)

// }

const TableData = () =>{

    return (
        <DataTable>
    <TableHead>
       <ColumnComponent />
    </TableHead>
    <TableBody>
       <RowComponent/>
    </TableBody>
    {/* <TableFoot>
        <DataTableRow>
            <DataTableCell colSpan="4">
                Footer content
            </DataTableCell>
        </DataTableRow>
    </TableFoot> */}
</DataTable>
    );
}

const ColumnComponent = () =>{
  
    // const rowDataState = useRecoilValue(rowAtom);
    const columnDataState = useRecoilValue(columnAtom);
    const defaultDataState = useRecoilValue(dataAtomAtom);

    // console.log("my data in rowAtom is")
    // console.log(rowDataState);
    console.log("my data in columnAtom is")
    console.log(uniq(columnDataState));

    return (
       <>
     <Suspense fallback={<div>Loading...</div>}>
     <FilterComponent />
     </Suspense>
       {
           columnDataState?.map(cols =>{
               return ( <DataTableRow key={Math.random + cols.keys}>
                   {
                       cols.map(dataColsValueId =>{
                           return (
                            <DataTableColumnHeader key={Math.random + dataColsValueId.random}>
{
    (defaultDataState['_data']['metaData']['names'][dataColsValueId])??""
}                        </DataTableColumnHeader>
                           );
                       })
                   }

            </DataTableRow>
            );
           })
       }
         
         
       </>
    );
}
const FilterComponent = () =>{
    const filterDataState = useRecoilValue(filterAtom);
    const defaultDataState = useRecoilValue(dataAtomAtom);
    // console.log("my data in filter is")
    // console.log(filterDataState);
    // console.log("this is the expected output " +defaultDataState['_data']);
    console.log("am in data now wooooh")
if(filterAtom === undefined || filterAtom === null || defaultDataState === undefined ) {return (
    <h4></h4>
);}
    return (
        <>
<DataTableRow>           
             <DataTableColumnHeader colSpan='4' >
<b>
{             uniq(filterDataState).map((filtersObjectsId)=>{
 return (defaultDataState['_data']['metaData']['names'][filtersObjectsId])??""
}).join('  ')
}
    </b>                  
     </DataTableColumnHeader>
         </DataTableRow>
        </>
    );
}

const RowComponent = () =>{
    return (
        <DataTableRow>
            <DataTableCell>
                Kwasi
            </DataTableCell>
            <DataTableCell>
                Okafor
            </DataTableCell>
            <DataTableCell>
                08/11/2010
            </DataTableCell>
            <DataTableCell>
                02/26/1991
            </DataTableCell>
        </DataTableRow>
    );
}
export default function TableAnalysis({dimensions}) {
    const {orgUnitSelection, layout, dataSources} = dimensions ?? {}
    const periods = useRecoilValue(PeriodResolverState)
    const {loading, data, error} = useTableAnalysisData({orgUnits: orgUnitSelection?.orgUnits, periods, dataSources});
    const {row, column, filter} = layout ?? {};
    const {show} = useAlert(({message}) => message, ({type}) => ({...type, duration: 3000}))
    const setdataFilter = useSetRecoilState(filterAtom)
    const setdataColumn = useSetRecoilState(columnAtom)
    const setdataRow = useSetRecoilState(rowAtom)
    const setDefaultData = useSetRecoilState(dataAtomAtom)

    useEffect(() => {
       if(error) {show({message: error?.message ?? error?.details ?? error?.toString()})}
    }, [error]);

    if (loading) {return <div className='column align-items-center center' style={{minHeight: 500}}>
        <h3>Loading...</h3></div>}

    if (error) {return <div className='column align-items-center center' style={{minHeight: 500}}>
        <h3>{error?.message ?? error?.details ?? error?.toString()}</h3></div>}

    // eslint-disable-next-line react/prop-types
    // console.log([...data['_data']['metaData']['dx']])
  console.log(data??'data')
// // var mydefault = [];
  if(data === undefined)
{
  return ()=>{
      setTimeout(()=>{
      },3000)
  }
}
setDefaultData(data);

dataDefaults['filter']?.forEach((filterObject)=>{
    setdataFilter((filters)=>{
        return [...filters,...data['_data']['metaData'][filterObject]];
    })
})

dataDefaults['column']?.forEach((columnObject)=>{
    setdataColumn((columnsObjects)=> {
        return uniqWith([...columnsObjects,[...data['_data']['metaData'][columnObject]]],isEqual);
    })
})

//     setdataRow((rowsObjects)=> [...rowsObjects,...data['_data']['metaData'][rowObject]])
// })


    // dataManipulatingFn(data);
    return (
        <div className='column align-items-center center' style={{minHeight: 500}}>
            {/* <h3 style={{paddingLeft:'70px'}}>{JSON.stringify(data)}</h3> */}
            <TableData />
            </div> // TODO: @danford
    )
}

TableAnalysis.propTypes = {
    dimensions: PropTypes.object.isRequired,
};
