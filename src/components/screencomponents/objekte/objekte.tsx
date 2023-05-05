import { Delete, Edit } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import dataFunctions from "../../../services/datafunctions";
import { Objekt } from "../../../types/allgemein";
import { ClientStatus } from "../../../types/statusenum";
import AddButton from "../../addbutton/addbutton";
import DataTable from "../../datatable/datatable";
import styles from "./objekte.module.css";
import ChangeObjektDialog from "../../dialogs/changeObjekt/changeObjektDialog";
import DeleteDialog from "../../dialogs/deleteDialog/deleteDialog";

// type ObjektChangeKeys = "name" | "beschreibung" | "adresse";

function ObjekteComponent() {
	const queryClient = useQueryClient();
	const [showChangeDialog, setShowChangeDialog] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const [currSelectedObjekt, setCurrSelectedObjekt] = useState<Objekt>();
	const [contextMenu, setContextMenu] = React.useState<{
		mouseX: number;
		mouseY: number;
	} | null>(null);
	const { data, isError } = useQuery(
		"objekte",
		() => dataFunctions[ClientStatus.online].objekte.get(),
		{}
	);
	const deleteMutation = useMutation({
		mutationFn: (id: number) =>
			dataFunctions[ClientStatus.online].objekte.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries("objekte");
		},
	});
	const createMutation = useMutation({
		mutationFn: (objekt: Objekt) =>
			dataFunctions[ClientStatus.online].objekte.create(objekt),
		onSuccess: () => {
			queryClient.invalidateQueries("objekte");
		},
	});

	// const changeMutation = useMutation({
	// 	mutationFn: (objekt: Objekt) =>
	// 		dataFunctions[ClientStatus.online].objekte.change(objekt),
	// 	onSuccess: () => {
	// 		queryClient.invalidateQueries("objekte");
	// 	},
	// });

	if (isError || (data && data.error)) {
		enqueueSnackbar("Laden der Objekte Fehlgeschlagen!", { variant: "error" });
	}

	const handleContextMenu = (event: React.MouseEvent, obj: Objekt) => {
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
		setCurrSelectedObjekt(obj);
	};

	// const handleSave = () => {};

	const handleClose = () => {
		setContextMenu(null);
		setShowDeleteDialog(true);
	};

	const handleDialogExit = (triggerNew: boolean, objekt?: Objekt) => {
		setShowChangeDialog(false);
		if (objekt) {
			if (objekt.id === -1) {
				createMutation.mutateAsync(objekt);
				// createAuftraggeber.mutateAsync(auftraggeber);
				// console.log("create auftraggeber", auftraggeber);
			} else {
				// changeAuftraggeber.mutateAsync(auftraggeber);
				// console.log("change auftraggeber", auftraggeber);
			}
			if (triggerNew) {
				console.log("trigger");
				// setSelectedAuftraggeber(undefined);
				setTimeout(() => setShowChangeDialog(true), 200);
			}
		}
	};

	return (
		<>
			<div className={styles.table}>
				<DataTable<Objekt>
					rows={data?.data}
					columns={[
						{
							title: "Name",
							render: (obj) => {
								return <div>{obj.name}</div>;
							},
						},
						{
							title: "Beschreibung",
							render: (obj) => {
								return <div>{obj.beschreibung}</div>;
							},
						},
					]}
					headline="Objekte"
					handleRowClick={(item) => {
						setCurrSelectedObjekt(item);
						setShowChangeDialog(true);
					}}
					// handleEdit={(id,key,value)=>{
					//   if(id === -1){

					//   }else{
					//     let currObjekt = data!.data!.slice().find((objekt)=>objekt.id === id)
					//     let newObjekt = currObjekt?new Objekt(currObjekt.id,currObjekt.adresse,currObjekt.beschreibung,currObjekt.name,currObjekt.auftraggeberID):undefined
					//     if(newObjekt && (newObjekt[key as ObjektChangeKeys]!.toString() !== value.toString() && value.toString() !== "")){
					//       let alreadyChanged = changedObjekte.slice().find((objekt)=>objekt.id===id)
					//       if(alreadyChanged){
					//         let addChangedObjekt = changedObjekte.slice().map((kurzObjekt:Objekt)=>{
					//           if(kurzObjekt.id === id){
					//             kurzObjekt[key as ObjektChangeKeys] = value
					//             return kurzObjekt
					//           }else{
					//             return kurzObjekt
					//           }
					//         })
					//         setChangedObjekte(addChangedObjekt)
					//       }else{
					//         let addChangedObjek = changedObjekte.slice()
					//         addChangedObjek.push(newObjekt)
					//         setChangedObjekte(addChangedObjek)
					//       }

					//     }else if(newObjekt && (newObjekt[key as ObjektChangeKeys]!.toString() === value.toString() || value.toString() === "")){
					//       let removeNotChangedObjek = changedObjekte.slice().filter((objekt)=>objekt.id!==id)
					//       setChangedObjekte(removeNotChangedObjek)
					//     }else{
					//       //error
					//     }
					//   }
					// }}
					// handleDelete={(id)=>{
					//   mutate.mutate(id)
					//   setTimeout(()=>queryClient.invalidateQueries("objekte"),200)
					//   setChangedObjekte([])
					// }}
					sort={[
						{
							name: "hinzugefügt",
							functionAsc: (a: Objekt, b: Objekt) => a.id - b.id,
							functionDesc: (a: Objekt, b: Objekt) => b.id - a.id,
						},
						{
							name: "name",
							functionAsc: (a: Objekt, b: Objekt) =>
								a.name.localeCompare(b.name),
							functionDesc: (a: Objekt, b: Objekt) =>
								b.name.localeCompare(a.name),
						},
					]}
					renderGrid={(obj) => {
						return <Typography>{obj.name}</Typography>;
					}}
					handleContextMenu={handleContextMenu}
				/>
			</div>
			<ChangeObjektDialog
				isShown={showChangeDialog}
				handleClose={(item) => handleDialogExit(false, item)}
				triggerNewEntity={(item) => handleDialogExit(true, item)}
				currentObjekt={currSelectedObjekt}
			/>
			<DeleteDialog
				isShown={showDeleteDialog}
				handleClose={() => {
					setShowDeleteDialog(false);
				}}
				handleDelete={() => {
					if (currSelectedObjekt) {
						deleteMutation.mutateAsync(currSelectedObjekt.id);
					}
					setShowDeleteDialog(false);
				}}
				title="Löschen?"
				message="Möchten Sie Wirklich das Objekt löschen"
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
					onClick={() => {
						setShowChangeDialog(true);
						setContextMenu(null);
					}}
				>
					<ListItemIcon>
						<Edit />
					</ListItemIcon>
					Bearbeiten
				</MenuItem>
				<MenuItem onClick={handleClose} style={{ color: "red" }}>
					<ListItemIcon>
						<Delete htmlColor="red" />
					</ListItemIcon>
					Löschen
				</MenuItem>
			</Menu>
			<div className={styles.interactions}>
				<AddButton
					routeParam="auftraggeber"
					onClick={() => {
						setCurrSelectedObjekt(undefined);
						setShowChangeDialog(true);
					}}
				/>
			</div>
		</>
	);
}

export default ObjekteComponent;
