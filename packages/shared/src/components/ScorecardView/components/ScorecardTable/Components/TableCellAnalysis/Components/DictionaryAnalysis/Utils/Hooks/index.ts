import React, { useEffect, useState } from "react";
import {
	getDataSetsArray,
	getNumDenMatch,
} from "../Functions/DataElementGroupSetFunctions";
import {
	getFormulaSources,
	getWordDataForAll,
} from "../Functions/FormulaFunctions";
import { dataTypes, dataTypesInitials } from "../Models";

export function useGetData(formula: any, engine: any, loc: any) {
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);
	const [data, setData] = useState<any>();

	useEffect(() => {
		let arrDtEle: any = getFormulaSources(
			formula,
			dataTypesInitials.DATA_ELEMENT,
		);
		let arrProgInd: any = getFormulaSources(
			formula,
			dataTypesInitials.PROGRAM_INDICATOR,
		);
		let arrDtSetRep: any = getFormulaSources(
			formula,
			dataTypesInitials.DATASET_REPORTING_RATES,
		);
		let arrAttr: any = getFormulaSources(formula, dataTypesInitials.ATTRIBUTES);
		let arrConst: any = getFormulaSources(formula, dataTypesInitials.CONSTANTS);

		async function fetch() {
			arrDtEle = await getWordDataForAll(engine, arrDtEle, loc);
			arrProgInd = await getWordDataForAll(engine, arrProgInd, loc);
			arrDtSetRep = await getWordDataForAll(engine, arrDtSetRep, loc);
			arrAttr = await getWordDataForAll(engine, arrAttr, loc);
			arrConst = await getWordDataForAll(engine, arrConst, loc);
		}
		fetch()
			.then(() => {
				const result = {
					dataElements: arrDtEle,
					programIndicators: arrProgInd,
					dataSetReportingRates: arrDtSetRep,
					attributes: arrAttr,
					constants: arrConst,
				};

				setData(result);
				// setData((prevState => {return prevState.concat(result) }))
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				setError(error);
			});
	}, []);

	return {
		loading,
		error,
		data,
	};
}

export function useGetDataSet(array: any, engine: any) {
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);
	const [data, setData] = useState<any>();

	//{"dataSetName:[dataElements in {id:"",displname:""}]}
	useEffect(() => {
		let tempArr: any;
		async function fetch() {
			tempArr = await getDataSetsArray(engine, array);
		}
		fetch()
			.then(() => {
				const result = { dataSets: tempArr };

				setData(result);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				setError(error);
			});
	}, []);

	return {
		loading,
		error,
		data,
	};
}

export function useGetNumDenMatch(array: any, engine: any) {
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);
	const [data, setData] = useState<any>();

	useEffect(() => {
		let tempArr: any;
		async function fetch() {
			tempArr = await getNumDenMatch(engine, array);
		}
		fetch()
			.then(() => {
				const result = { matches: tempArr };
				setData(result);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				setError(error);
			});
	}, [array?.length]);

	return {
		loading,
		error,
		data,
	};
}
