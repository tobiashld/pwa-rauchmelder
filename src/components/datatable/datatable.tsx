import React, { useEffect, useState } from "react";
import {
	BsArrowDown,
	BsArrowLeft,
	BsArrowRight,
	BsArrowUp,
} from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
	getFittingInputsForKey,
	KeyType,
} from "../../services/helperfunctions";
import Loadingspinner from "../loadingspinner/loadingspinner";
import styles from "./datatable.module.css";
import { Scrollbars } from "react-custom-scrollbars-2";
import {
	Box,
	Chip,
	Divider,
	IconButton,
	Typography,
	useTheme,
} from "@mui/material";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { AppsOutlined, SubjectOutlined } from "@mui/icons-material";
import {
	DatatableActiveDisplaySetting,
	DatatableProps,
	SortArgument,
} from "../../types/datatable";
import DatatableGrid from "./datatableGrid/datatableGrid";
import DatatableList from "./datatableList/datatableList";

function DataTable<T>(props: DatatableProps<T>) {
	const [currFilter, setCurrFilter] = useState<
		{
			func: (obj: T) => T | undefined;
			value: any;
		}[]
	>([]);
	const theme = useTheme();

	const [currIndex, setCurrIndex] = useState(0);
	const [currMaxIndex, setMaxIndex] = useState(0);
	const [currOverflow, setCurrOverflow] = useState(0);
	const [activeSortIndex, setActiveSortIndex] = useState(0);
	const { width } = useWindowDimensions();
	const [activeSortDirection, setActiveSortDirection] = useState(true); // true -> asc, false -> desc
	const [activeDisplaySetting, setActiveDisplaySetting] =
		useState<DatatableActiveDisplaySetting>(
			DatatableActiveDisplaySetting.TABLE
		); // true -> asc, false -> desc

	useEffect(() => {
		if (props && props.rows && props.columns) {
			setCurrOverflow(props.rows.length % 100);
			if (props.rows.length > 100) {
				setMaxIndex(Math.floor(props.rows.length / 100));
			} else {
				setMaxIndex(0);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props, props.rows]);

	if (!props || !props.rows || !props.columns || props.rows.length <= 0) {
		return (
			<div className={styles.gesamtContainer + " " + styles.loadingspinner}>
				<Loadingspinner size="Big" />
			</div>
		);
	}

	const prepPagination = () => {
		let children: React.ReactNode[] = [];

		if (currMaxIndex > 4) {
			if (currIndex < 3) {
				children.push([
					<div
						className={
							currIndex === 0
								? styles.pageElement + " " + styles.currActivePage
								: styles.pageElement
						}
						onClick={(event) => {
							setCurrIndex(0);
						}}
					>
						1
					</div>,
					<div
						className={
							currIndex === 1
								? styles.pageElement + " " + styles.currActivePage
								: styles.pageElement
						}
						onClick={(event) => {
							setCurrIndex(1);
						}}
					>
						2
					</div>,
					<div
						className={
							currIndex === 2
								? styles.pageElement + " " + styles.currActivePage
								: styles.pageElement
						}
						onClick={(event) => {
							setCurrIndex(2);
						}}
					>
						3
					</div>,
					<div className={styles.pageElement}>...</div>,
					<div
						className={styles.pageElement}
						onClick={(event) => {
							setCurrIndex(currMaxIndex);
						}}
					>
						{currMaxIndex + 1}
					</div>,
				]);
			} else if (currIndex >= currMaxIndex - 2) {
				children.push([
					<div
						className={
							currIndex === 0
								? styles.pageElement + " " + styles.currActivePage
								: styles.pageElement
						}
						onClick={(event) => {
							setCurrIndex(0);
						}}
					>
						1
					</div>,
					<div className={styles.pageElement}>...</div>,
					<div
						className={
							currIndex === currMaxIndex - 2
								? styles.pageElement + " " + styles.currActivePage
								: styles.pageElement
						}
						onClick={(event) => {
							setCurrIndex(currMaxIndex - 2);
						}}
					>
						{currMaxIndex - 1}
					</div>,
					<div
						className={
							currIndex === currMaxIndex - 1
								? styles.pageElement + " " + styles.currActivePage
								: styles.pageElement
						}
						onClick={(event) => {
							setCurrIndex(currMaxIndex - 1);
						}}
					>
						{currMaxIndex}
					</div>,
					<div
						className={
							currIndex === currMaxIndex
								? styles.pageElement + " " + styles.currActivePage
								: styles.pageElement
						}
						onClick={(event) => {
							setCurrIndex(currMaxIndex);
						}}
					>
						{currMaxIndex + 1}
					</div>,
				]);
			} else {
				children.push([
					<div
						className={styles.pageElement}
						onClick={(event) => {
							setCurrIndex(0);
						}}
					>
						1
					</div>,
					<div className={styles.pageElement}>...</div>,
					<div
						className={styles.pageElement + " " + styles.currActivePage}
						onClick={(event) => {}}
					>
						{currIndex + 1}
					</div>,
					<div className={styles.pageElement}>...</div>,
					<div
						className={styles.pageElement}
						onClick={(event) => {
							setCurrIndex(currMaxIndex);
						}}
					>
						{currMaxIndex + 1}
					</div>,
				]);
			}
		} else {
			for (let i = 0; i <= currMaxIndex; i++) {
				children.push(
					currIndex === i ? (
						<div className={styles.currActivePage + " " + styles.pageElement}>
							{i + 1}
						</div>
					) : (
						<div
							className={styles.pageElement}
							onClick={(event) => setCurrIndex(i)}
						>
							{i + 1}
						</div>
					)
				);
			}
		}

		return (
			<>
				<div
					className={styles.pageElement}
					onClick={(event) => {
						if (currIndex > 0) {
							setCurrIndex(currIndex - 1);
						}
					}}
				>
					<BsArrowLeft />
				</div>
				{children}
				<div
					className={styles.pageElement}
					onClick={(event) => {
						if (currIndex < currMaxIndex) {
							setCurrIndex(currIndex + 1);
						}
					}}
				>
					<BsArrowRight />
				</div>
			</>
		);
	};

	const getSortDirection = (sortarg: SortArgument<T>) => {
		if (activeSortDirection) {
			return sortarg.functionAsc;
		} else {
			return sortarg.functionDesc;
		}
	};

	return (
		<div className={styles.paddingcontainer}>
			<Box
				className={styles.gesamtContainer}
				sx={{ bgcolor: "background.default", color: "text.primary" }}
			>
				<div className={styles.headline}>
					<span>{props.headline}</span>
					<div>
						<IconButton
							onClick={(event) => {
								setActiveDisplaySetting((prev) =>
									prev === DatatableActiveDisplaySetting.TABLE
										? DatatableActiveDisplaySetting.GRID
										: prev
								);
							}}
							aria-label="Grid-Ansicht"
							className={
								activeDisplaySetting === DatatableActiveDisplaySetting.GRID
									? theme.palette.mode === "light"
										? styles.lightActiveDSetting
										: styles.darkActiveDSetting
									: ""
							}
						>
							<AppsOutlined />
						</IconButton>
						<IconButton
							onClick={(event) => {
								setActiveDisplaySetting((prev) =>
									prev === DatatableActiveDisplaySetting.GRID
										? DatatableActiveDisplaySetting.TABLE
										: prev
								);
							}}
							aria-label="Listen-Ansicht"
							className={
								activeDisplaySetting === DatatableActiveDisplaySetting.TABLE
									? theme.palette.mode === "light"
										? styles.lightActiveDSetting
										: styles.darkActiveDSetting
									: ""
							}
						>
							<SubjectOutlined />
						</IconButton>
					</div>
				</div>
				<div className={styles.features}>
					{props.sort && props.sort.length > 0 ? (
						<div className={styles.sortSection}>
							{props.sort!.map((sort, index) => {
								return (
									<Chip
										key={index}
										className={
											index === activeSortIndex ? ` ${styles.activesort}` : ""
										}
										onClick={(event) => {
											if (activeSortIndex === index) {
												setActiveSortDirection(!activeSortDirection);
											} else {
												setActiveSortIndex(index);
												setActiveSortDirection(true);
											}
										}}
										icon={
											<span className={styles.sortarrow}>
												<BsArrowDown
													className={
														styles.sortindicator +
														" " +
														(activeSortDirection
															? styles.downarrow
															: styles.uparrow)
													}
												></BsArrowDown>
											</span>
										}
										label={sort.name}
										color="secondary"
									/>
									// <div key={index} className={styles.sortbutton + (index === activeSortIndex?` ${styles.activesort}`:"")} onClick={(event)=>{
									//   if(activeSortIndex === index){
									//     setActiveSortDirection(!activeSortDirection)
									//   }else{
									//     setActiveSortDirection(true)
									//     setActiveSortIndex(index)
									//   }
									// }}>

									//     <span className={styles.sortarrow}>
									//       {/* {activeSortIndex === index?<BsArrowDown className={styles.sortindicator + " " +(activeSortDirection?styles.downarrow:styles.uparrow)}></BsArrowDown>:<></>} */}
									//       <BsArrowDown className={styles.sortindicator + " " +(activeSortDirection?styles.downarrow:styles.uparrow)}></BsArrowDown>
									//     </span>
									//     <span>{sort.name}</span>
									// </div>
								);
							})}
						</div>
					) : (
						<></>
					)}
					{currMaxIndex > 0 ? (
						<div className={styles.pagination}>{prepPagination()}</div>
					) : (
						<></>
					)}
				</div>
				{width > 800 ? (
					activeDisplaySetting === DatatableActiveDisplaySetting.GRID ? (
						<DatatableGrid
							{...props}
							activeRows={props
								.rows!.filter((obj: T) => {
									let retValue = undefined;
									if (currFilter.length <= 0) return obj;
									for (let filter of currFilter) {
										retValue = filter.func(obj);
									}
									return retValue;
								})
								.sort(
									props.sort && props.sort[activeSortIndex]
										? getSortDirection(props.sort[activeSortIndex])
										: (a, b) => 1
								)
								.slice(
									currIndex * 100,
									currIndex < currMaxIndex
										? (currIndex + 1) * 100 - 1
										: currIndex * 100 + currOverflow
								)}
						/>
					) : (
						<DatatableList
							{...props}
							activeRows={props
								.rows!.filter((obj: T) => {
									let retValue = undefined;
									if (currFilter.length <= 0) return obj;
									for (let filter of currFilter) {
										retValue = filter.func(obj);
									}
									return retValue;
								})
								.sort(
									props.sort && props.sort[activeSortIndex]
										? getSortDirection(props.sort[activeSortIndex])
										: (a, b) => 1
								)
								.slice(
									currIndex * 100,
									currIndex < currMaxIndex
										? (currIndex + 1) * 100 - 1
										: currIndex * 100 + currOverflow
								)}
						/>
					)
				) : (
					// <div className={styles.actualTable} style={{display:'grid',gridTemplateAreas:`'tablehead' 'tablebody'`,gridTemplateRows:'50px 1fr'}}>
					//   <div className={styles.tableHead} style={{gridArea:'tablehead',display:'grid',gridTemplateColumns:`repeat(${props.columns.length},1fr)`}} >
					//     {props.columns.map(column=>{
					//       return (
					//         <div className={styles.tableHeadCell}>
					//           <Typography variant={"h6"}>
					//             {
					//               // column.filter?
					//               //     column.filter.render((obj:T,filterValue:any)=>{
					//               //       if(filterValue){
					//               //         setCurrFilter([...currFilter,{func:}])
					//               //       }else{
					//               //         let aktAktiv = currFilter.findIndex(func=>func.func===column.filter!.func)
					//               //         if(aktAktiv !== -1){
					//               //           setCurrFilter(prev=>prev.filter((value,index)=>index!==aktAktiv?value:undefined))
					//               //         }
					//               //       }
					//               //     },column.filter.func)
					//               //     :
					//                   column.title
					//             }
					//           {/* {column.title} */}
					//           </Typography>
					//         </div>
					//       )
					//     })}
					//   </div>
					//   <Scrollbars
					//     className={styles.scroll}

					//   >

					//     <div
					//       className={styles.tableBody}
					//       style={{display:'grid',gridTemplateColumns:`repeat(${props.columns.length},1fr)`,gridArea:'tablebody',gridTemplateRows:`repeat(${props.rows!.slice(currIndex * 100,currIndex < (currMaxIndex)?(currIndex+1)*100-1:currIndex*100+currOverflow).length},40px)`}}
					//     >
					//     {
					//       props.rows!
					//         .filter((obj:T)=>{
					//           let retValue = undefined
					//           if(currFilter.length <= 0)return obj
					//           for(let filter of currFilter){
					//             retValue = filter.func(obj)
					//           }
					//           return retValue
					//         })
					//         .sort(props.sort && props.sort[activeSortIndex]?getSortDirection(props.sort[activeSortIndex]):(a,b)=>1)
					//         .slice(currIndex * 100,currIndex < (currMaxIndex)?(currIndex+1)*100-1:currIndex*100+currOverflow)
					//         .map((item,index,array)=>{
					//         return (
					//           <div className={styles.gridrow}>
					//             {props.columns.map(column=>{
					//             return column.render(item)})}
					//           </div>

					//         )
					//       })
					//     }
					//     </div>
					//   </Scrollbars>
					// </div>
					<></>
				)}
			</Box>
		</div>
	);
}

export default DataTable;
