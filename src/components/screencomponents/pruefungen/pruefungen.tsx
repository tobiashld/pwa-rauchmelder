import { Delete, Edit, Visibility } from "@mui/icons-material";
import {
	Box,
	FormControl,
	InputLabel,
	ListItemIcon,
	Menu,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	TextField,
	Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import {
	useMutation,
	useQuery,
	useQueryClient,
	UseQueryResult,
} from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dataFunctions from "../../../services/datafunctions";
import { RootState } from "../../../store/store";
import { DBResponse, Objekt, Pruefung } from "../../../types/allgemein";
import { ClientStatus } from "../../../types/statusenum";
import AddButton from "../../addbutton/addbutton";
import Button from "../../button/button";
import DataTable from "../../datatable/datatable";
import Loadingspinner from "../../loadingspinner/loadingspinner";
import styles from "./pruefungen.module.css";
import HistoryIcon from "@mui/icons-material/History";
import DeleteDialog from "../../dialogs/deleteDialog/deleteDialog";
import { DatePicker } from "@mui/x-date-pickers";

function PruefungenComponent() {
	const clientStatus = useSelector((state: RootState) => state.isOffline);
	const queryClient = useQueryClient();
	const pruefungenQuery: UseQueryResult<DBResponse<Pruefung>> = useQuery(
		"pruefungen",
		() => dataFunctions[1].pruefungen.get()
	);
	const objekteQuery: UseQueryResult<DBResponse<Objekt>> = useQuery(
		"objekte",
		() => dataFunctions[1].objekte.get()
	);
	const mutation = useMutation({
		mutationFn: (id: number) =>
			dataFunctions[ClientStatus.online].pruefungen.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries("pruefungen");
		},
	});
	const [currPruefObjekt, setCurrPruefObjekt] = useState<Objekt>();
	const [showDialog, setShowDialog] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	const { enqueueSnackbar } = useSnackbar();
	const [editPruefungsId, setEditPruefungsId] = useState(-1);
	const [contextMenu, setContextMenu] = React.useState<{
		mouseX: number;
		mouseY: number;
	} | null>(null);
	const navigate = useNavigate();
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};
	useEffect(() => {
		// if(clientStatus){
		//   dataFunctions[ClientStatus.online].pruefungen.get(undefined,(pruefungen:any[])=>{
		//     setAllePruefungen(pruefungen.map(item=>toPruefungConverter(item)))
		//   })
		// }
		// console.log(clientStatus)
		// dataFunctions[clientStatus].objekte.get(undefined,(objekte:any)=>{
		//   setAlleObjekte(objekte.data)
		// })
	});

	const handleContextMenu = (event: React.MouseEvent, pruefung: Pruefung) => {
		event.preventDefault();
		setContextMenu(
			contextMenu === null
				? {
						mouseX: event.clientX + 2,
						mouseY: event.clientY - 6,
				  }
				: // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
				  // Other native context menus might behave different.
				  // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
				  null
		);
		setEditPruefungsId(pruefung.id ?? -1);
		// setHistoryid(obj.id?obj.id:-1)
	};

	const handleClose = () => {
		setContextMenu(null);
	};

	const handleChange = (
		event: SelectChangeEvent<string>,
		child: React.ReactNode
	) => {
		setCurrPruefObjekt(JSON.parse(event.target.value));
	};
	const handleNewPruefung = () => {
		if (currPruefObjekt) {
			navigate("/pruefungen/-1?pruefObjekt=" + currPruefObjekt?.id);
		} else {
			enqueueSnackbar("Bitte wählen Sie ein Prüfobjekt", {
				variant: "warning",
			});
		}
	};

	if (objekteQuery.isError || pruefungenQuery.isError) {
		return <>Error</>;
	}

	return (
		<>
			<div className={styles.table}>
				{clientStatus ? (
					<DataTable<Pruefung>
						rows={pruefungenQuery.data?.data}
						columns={[
							{
								title: "Durchgeführt am",
								render: (obj) => {
									return (
										<Box sx={{ display: "flex", alignItems: "center" }}>
											{obj.timestamp.toLocaleDateString()}
											{/*obj.timestamp.toString()*/}
										</Box>
									);
								},
							},
							{
								title: "Objekt",
								render: (obj) => {
									return <div>{obj.objekt?.name}</div>;
								},
							},
						]}
						headline="Prüfungen"
						handleRowClick={(item) => {
							navigate("/pruefungen/" + item.id);
						}}
						disabledRows={true}
						// handleDelete={(id)=>{
						//   dataFunctions[ClientStatus.online].pruefungen.delete(id)
						//   setTimeout(()=>{
						//     queryClient.invalidateQueries("pruefungen")
						//     // dataFunctions[ClientStatus.online].pruefungen.get(undefined,(data:any[])=>{
						//     //   setAllePruefungen(data.map((item)=>toPruefungConverter(item)))
						//     // })
						//   },300)
						// }}
						sort={[
							{
								name: "hinzugefügt",
								functionAsc: (a: Pruefung, b: Pruefung) => a.id - b.id,
								functionDesc: (a: Pruefung, b: Pruefung) => b.id - a.id,
							},
							{
								name: "p.datum",
								functionAsc: (a: Pruefung, b: Pruefung) => {
									return a.timestamp.getTime() - b.timestamp.getTime();
								},
								functionDesc: (a: Pruefung, b: Pruefung) => {
									return a.timestamp.getTime() - b.timestamp.getTime();
								},
							},
						]}
						renderGrid={(obj) => {
							return <Typography>{obj.timestamp.toString()}</Typography>;
						}}
						handleContextMenu={handleContextMenu}
					/>
				) : (
					<div className={styles.offlineDiv}>
						<div className={styles.offlineDiv_inside}>
							Im Offline-Modus können keine Prüfungen bearbeitet werden, sondern
							nur angelegt!
						</div>
					</div>
				)}
				<div className={styles.interactions}>
					{showDialog ? (
						<div className={styles.objektauswahl}>
							<FormControl sx={{ width: "98%" }}>
								<InputLabel id="pruefObjekt">Objekte</InputLabel>
								<Select
									labelId="pruefObjekt"
									id="single-select"
									value={currPruefObjekt ? JSON.stringify(currPruefObjekt) : ""}
									label="Objekte"
									onChange={handleChange}
									input={
										<OutlinedInput id="select-multiple-chip" label="Objekte" />
									}
									MenuProps={MenuProps}
								>
									{objekteQuery.data?.data?.map((objekt: any) => (
										<MenuItem key={objekt.id} value={JSON.stringify(objekt)}>
											{objekt.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<Button onClick={handleNewPruefung} value="Prüfung anlegen" />
						</div>
					) : (
						<></>
					)}
					<Menu
						open={contextMenu !== null}
						onClose={handleClose}
						anchorReference="anchorPosition"
						anchorPosition={
							contextMenu !== null
								? { top: contextMenu.mouseY, left: contextMenu.mouseX }
								: undefined
						}
					>
						<MenuItem
							onClick={() => {
								setContextMenu(null);
								navigate("/pruefungen/" + editPruefungsId);
							}}
						>
							<ListItemIcon>
								<Edit />
							</ListItemIcon>
							Bearbeiten
						</MenuItem>
						<MenuItem
							onClick={() => {
								setContextMenu(null);
								navigate("/pruefungen/preview/" + editPruefungsId);
							}}
						>
							<ListItemIcon>
								<Visibility />
							</ListItemIcon>
							Vorschau
						</MenuItem>
						<MenuItem
							onClick={() => {
								setShowDeleteDialog(true);
								handleClose();
							}}
							style={{ color: "red" }}
						>
							<ListItemIcon>
								<Delete htmlColor="red" />
							</ListItemIcon>
							Löschen
						</MenuItem>
					</Menu>
					<DeleteDialog
						isShown={showDeleteDialog}
						handleClose={() => {
							setShowDeleteDialog(false);
						}}
						handleDelete={() => {
							//delete Logik
							mutation.mutateAsync(editPruefungsId);
							setShowDeleteDialog(false);
						}}
						title={"Löschen?"}
						message={
							"Möchten Sie wirklich die Prüfung mit der id: " +
							editPruefungsId +
							" wirklich löschen?"
						}
					/>

					<AddButton
						routeParam="/pruefungen/-1"
						onClick={() => setShowDialog(!showDialog)}
					/>
				</div>
			</div>
		</>
	);
}

export default PruefungenComponent;
