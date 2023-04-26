import { Box, Typography } from "@mui/material";
import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import {
	DatatableDisplayProps,
	DatatableProps,
} from "../../../types/datatable";
import styles from "./datatableList.module.css";
function DatatableList<T>(props: DatatableDisplayProps<T>) {
	return (
		<Box
			className={styles.actualTable}
			sx={{}}
			style={{
				display: "grid",
				gridTemplateAreas: `'tablehead' 'tablebody'`,
				gridTemplateRows: "50px 1fr",
			}}
		>
			<Box
				sx={{
					color: "text.primary",
					borderRadius: "10px",
					placeContent: "center",
					margin: "5px",
					backgroundColor: "background.default",
					boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.1)",
				}}
				className={styles.tableHead}
				style={{
					gridArea: "tablehead",
					display: "grid",
					gridTemplateColumns: `repeat(${props.columns.length},1fr)`,
				}}
			>
				{props.columns.map((column) => {
					return (
						<div className={styles.tableHeadCell}>
							<Typography variant={"h6"}>
								{
									// column.filter?
									//     column.filter.render((obj:T,filterValue:any)=>{
									//       if(filterValue){
									//         setCurrFilter([...currFilter,{func:}])
									//       }else{
									//         let aktAktiv = currFilter.findIndex(func=>func.func===column.filter!.func)
									//         if(aktAktiv !== -1){
									//           setCurrFilter(prev=>prev.filter((value,index)=>index!==aktAktiv?value:undefined))
									//         }
									//       }
									//     },column.filter.func)
									//     :
									column.title
								}
								{/* {column.title} */}
							</Typography>
						</div>
					);
				})}
			</Box>
			<Scrollbars className={styles.scroll}>
				<Box
					className={styles.tableBody}
					style={{
						display: "flex",
						flexDirection: "column",
						gridArea: "tablebody",
					}}
				>
					{props.activeRows.map((item, index, array) => {
						return (
							<Box
								className={styles.gridrow}
								sx={{
									backgroundColor: "background.default",
									"::before": {
										backgroundColor: "primary.light",
									},
								}}
								onContextMenuCapture={(
									event: React.MouseEvent<HTMLDivElement, MouseEvent>
								) => {
									if (props?.handleContextMenu)
										props.handleContextMenu(event, item);
								}}
								onClick={(event) => {
									if (props?.handleRowClick) props.handleRowClick(item);
								}}
							>
								{props.columns.map((column) => {
									return <Box sx={{ flex: 1 }}>{column.render(item)}</Box>;
								})}
							</Box>
						);
					})}
				</Box>
			</Scrollbars>
		</Box>
	);
}

export default DatatableList;
