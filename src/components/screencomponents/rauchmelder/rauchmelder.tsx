import { useSnackbar } from "notistack";

import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import dataFunctions from "../../../services/datafunctions";
import { ClientStatus } from "../../../types/statusenum";
import AddButton from "../../addbutton/addbutton";
import DataTable from "../../datatable/datatable";
import RauchmelderHistorienDialog from "../../dialogs/rauchmelderhistorienDialog/rauchmelderhistorienDialog";
import Loadingspinner from "../../loadingspinner/loadingspinner";
import SaveButton from "../../savebutton/savebutton";
import styles from "./rauchmelder.module.css";
import {
	RauchmelderI,
	RauchmelderBeziehung,
	Rauchmelder,
} from "../../../types/rauchmelder";
import {
	Dialog,
	ListItemIcon,
	Menu,
	MenuItem,
	Typography,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import { Delete, Edit } from "@mui/icons-material";
import DeleteDialog from "../../dialogs/deleteDialog/deleteDialog";

function RauchmelderComponent() {
	const [changedRauchmelder, setChangedRauchmelder] = useState<
		RauchmelderBeziehung[]
	>([]);
	const [isSavable, setIsSavable] = useState(false);
	const [showHistoryDialog, setShowHistoryDialog] = useState(false);
	const [showEditMenu, setShowEditMenu] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [historyid, setHistoryid] = useState(1);
	const { enqueueSnackbar } = useSnackbar();
	const rauchmelderQuery = useQuery("rauchmelder", () =>
		dataFunctions[ClientStatus.online].rauchmelder.get()
	);
	const objekteQuery = useQuery("objekte", () =>
		dataFunctions[ClientStatus.online].objekte.get()
	);
	const queryClient = useQueryClient();
	const [contextMenu, setContextMenu] = React.useState<{
		mouseX: number;
		mouseY: number;
	} | null>(null);
	const deleteRauchmelder = useMutation({
		mutationFn: (id: number) =>
			dataFunctions[ClientStatus.online].rauchmelder.delete(id),
	});
	const handleContextMenu = (event: React.MouseEvent, obj: Rauchmelder) => {
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
		setHistoryid(obj.id ? obj.id : -1);
	};

	const handleClose = () => {
		setContextMenu(null);
	};

	useEffect(() => {
		if (changedRauchmelder.length > 0) {
			setIsSavable(true);
		} else {
			setIsSavable(false);
		}
	}, [changedRauchmelder]);

	const onEditClick = () => {
		setContextMenu(null);
	};

	if (rauchmelderQuery.isLoading || objekteQuery.isLoading) {
		return (
			<div className={styles.table}>
				<Loadingspinner size="Big" />
			</div>
		);
	}

	if (
		rauchmelderQuery.isError ||
		objekteQuery.isError ||
		(rauchmelderQuery.data && rauchmelderQuery.data.error) ||
		(objekteQuery.data && objekteQuery.data.error)
	) {
		enqueueSnackbar("Laden Fehlgeschlagen!", { variant: "error" });
		return <>Error</>;
	}

	const handleSave = () => {};
	return (
		<>
			<div className={styles.table}>
				<RauchmelderHistorienDialog
					handleClose={(e: any) => setShowHistoryDialog(false)}
					isShown={showHistoryDialog}
					rauchmelderHistorienId={historyid}
				/>
				<DataTable<Rauchmelder>
					rows={rauchmelderQuery.data?.data.map(
						(rauchmelderBz: RauchmelderBeziehung) =>
							rauchmelderBz.aktuellerRauchmelder!
					)}
					columns={[
						{
							title: "Produktionsdatum",
							render: (obj) => {
								return <div>{obj.produktionsdatum.toLocaleDateString()}</div>;
							},
						},
						{
							title: "raum",
							render: (obj) => {
								return <div>{obj.raum}</div>;
							},
						},
						{
							title: "seriennr",
							render: (obj) => {
								return <div>{obj.seriennr}</div>;
							},
						},
					]}
					options={objekteQuery.data?.data}
					headline="Rauchmelder"
					renderGrid={(obj) => {
						return <>{obj.raum}</>;
					}}
					// handleEdit={(id,key,value)=>{
					//   if(id === -1){

					//   }else{
					// let currRauchmelder = alleRauchmelder.slice().find((rauchmelder)=>rauchmelder.id === id)
					// // let newRauchmelder = currRauchmelder?{currRauchmelder.id,currRauchmelder.objekt,currRauchmelder.produktionsdatum,currRauchmelder.raum,currRauchmelder.seriennr,currRauchmelder.letztePruefungsID,currRauchmelder.mieter):undefined
					// if(newRauchmelder && (newRauchmelder[key as RauchmelderChangeKeys]!.toString() !== value.toString() && value.toString() !== "")){
					//   let alreadyChanged = changedRauchmelder.slice().find((rauchmelder)=>rauchmelder.id===id)
					//   if(alreadyChanged){
					//     let addChangedRauchmelder = changedRauchmelder.slice().map((kurzRauchmelder:RauchmelderBeziehung)=>{
					//       if(kurzRauchmelder.id === id){
					//         // kurzRauchmelder[key as RauchmelderChangeKeys] = value
					//         return kurzRauchmelder
					//       }else{
					//         return kurzRauchmelder
					//       }
					//     })
					//     setChangedRauchmelder(addChangedRauchmelder)
					//   }else{
					//     let addChangedObjek = changedRauchmelder.slice()
					//     addChangedObjek.push(newRauchmelder)
					//     setChangedRauchmelder(addChangedObjek)
					//   }

					// }else if(newRauchmelder && (newRauchmelder[key as RauchmelderChangeKeys]!.toString() === value.toString() || value.toString() === "")){
					//   let removeNotChangedObjek = changedRauchmelder.slice().filter((rauchmelder)=>rauchmelder.id!==id)
					//   setChangedRauchmelder(removeNotChangedObjek)
					// }else{
					//   //error
					// }
					// }
					// }}
					// handleHistory={(id)=>{
					//   setHistoryid(id)
					//   setShowHistoryDialog(true)
					// }}
					// handleDelete={(id)=>{
					//   dataFunctions[ClientStatus.online].rauchmelder.delete(id)

					//   setTimeout(()=>{
					//     queryClient.invalidateQueries("rauchmelder")
					//     setChangedRauchmelder([])
					//   },300)
					// }}
					sort={[
						{
							name: "hinzugefügt",
							functionAsc: (a: RauchmelderI, b: RauchmelderI) => a.id! - b.id!,
							functionDesc: (a: RauchmelderI, b: RauchmelderI) => b.id! - a.id!,
						},
						{
							name: "p.datum",
							functionAsc: (a: RauchmelderI, b: RauchmelderI) => {
								let aS = a.produktionsdatum;
								let bS = b.produktionsdatum;
								return aS.valueOf() - bS.valueOf();
							},
							functionDesc: (a: RauchmelderI, b: RauchmelderI) => {
								let aS = a.produktionsdatum;
								let bS = b.produktionsdatum;
								return bS.valueOf() - aS.valueOf();
							},
						},
						{
							name: "seriennr",
							functionAsc: (a: RauchmelderI, b: RauchmelderI) => {
								return a.seriennr.localeCompare(b.seriennr);
							},
							functionDesc: (a: RauchmelderI, b: RauchmelderI) => {
								return b.seriennr.localeCompare(a.seriennr);
							},
						},
					]}
					handleContextMenu={handleContextMenu}
				/>
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
						onClick={(event) => {
							setContextMenu(null);
							setShowHistoryDialog(true);
						}}
					>
						<ListItemIcon>
							<HistoryIcon />
						</ListItemIcon>
						Historie{" "}
					</MenuItem>
					<MenuItem onClick={handleClose}>
						<ListItemIcon>
							<Edit />
						</ListItemIcon>
						Bearbeiten
					</MenuItem>
					<MenuItem
						onClick={() => setShowDeleteDialog(true)}
						style={{ color: "red" }}
					>
						<ListItemIcon>
							<Delete htmlColor="red" />
						</ListItemIcon>
						Löschen
					</MenuItem>
					<DeleteDialog
						isShown={showDeleteDialog}
						handleClose={() => {
							setShowDeleteDialog(false);
						}}
						handleDelete={() => {
							//delete Logik
							deleteRauchmelder
								.mutateAsync(historyid)
								.then((data) => queryClient.invalidateQueries(["rauchmelder"]));
							setShowDeleteDialog(false);
						}}
						title={"Löschen?"}
						message={
							"Möchten Sie wirklich den Rauchmelder mit der Seriennr: " +
							rauchmelderQuery.data?.data.find(
								(rauchmelder) => rauchmelder.aktuelleHistorienID === historyid
							)?.aktuellerRauchmelder?.seriennr +
							" in der Wohnung " +
							rauchmelderQuery.data?.data.find(
								(rauchmelder) => rauchmelder.aktuelleHistorienID === historyid
							)?.wohnung?.nachname +
							" wirklich löschen?"
						}
					/>
				</Menu>
				<div className={styles.interactions}>
					<AddButton routeParam="rauchmelder" />
					<SaveButton onClick={handleSave} isShown={isSavable} />
				</div>
			</div>
		</>
	);
}

export default RauchmelderComponent;
