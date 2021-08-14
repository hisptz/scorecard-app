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
import {flatten, flattenDepth ,uniq } from 'lodash';
import PropTypes from 'prop-types'
import React, {useEffect,Suspense} from 'react'
import {atom, useRecoilValue, useSetRecoilState} from "recoil";
import {PeriodResolverState} from "../../../../../../../../../../core/state/period";
import useTableAnalysisData from "./hooks/useTableAnalysisData";


const dataDefaults = {
    column:['pe','ou'],
    rows:['ou'],
    filter:['dx','pe','ou']
}


const columnAtom = atom({
    key:'columnAtomState',
    default:[]
})
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
    // console.log("my data in rowAtom is")
    // console.log(rowDataState);
    console.log("my data in columnAtom is")
    console.log(uniq(columnDataState));

    return (
       <>
     <Suspense fallback={<div>Loading...</div>}>
     <FilterComponent />
     </Suspense>
        <DataTableRow>
             <DataTableColumnHeader>
                 First name
             </DataTableColumnHeader>
             <DataTableColumnHeader>
                 Last name
             </DataTableColumnHeader>
             <DataTableColumnHeader>
                 Incident date
             </DataTableColumnHeader>
             <DataTableColumnHeader>
                 Last updated
             </DataTableColumnHeader>
         </DataTableRow>
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

//     setdataRow((rowsObjects)=> [...rowsObjects,...data['_data']['metaData'][rowObject]])
// })



dataDefaults['column']?.forEach((columnObject)=>{
    setdataColumn((columnsObjects)=> {
        console.log("data in columns prev are  "+ [flattenDepth(columnsObjects,1)])
        return [data['_data']['metaData'][columnObject]];
    })
})

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
