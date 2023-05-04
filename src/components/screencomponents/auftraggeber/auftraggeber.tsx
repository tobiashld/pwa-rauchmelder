import React, { useState, useEffect } from "react";
import dataFunctions from "../../../services/datafunctions";
import { Auftraggeber } from "../../../types/allgemein";
import { ClientStatus } from "../../../types/statusenum";
import AddButton from "../../addbutton/addbutton";
import DataTable from "../../datatable/datatable";
import styles from "./auftraggeber.module.css";
import SaveButton from "../../savebutton/savebutton";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
	Autocomplete,
	Box,
	Grid,
	ListItemIcon,
	Menu,
	MenuItem,
	TextField,
	Typography,
} from "@mui/material";
import { GeoDaten } from "../../../types/geodaten";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Delete, Edit } from "@mui/icons-material";
import { ChangeAuftraggeberDialog } from "../../dialogs/changeAuftraggeber/changeAuftraggeber";
import { useMutation, useQuery, useQueryClient } from "react-query";
import DeleteDialog from "../../dialogs/deleteDialog/deleteDialog";

type AuftraggeberChangeKeys = "adresse" | "email" | "name" | "telefon";

function AuftraggeberComponent() {
	const queryClient = useQueryClient();
	const clientStatus = useSelector((state: RootState) => state.isOffline);
	const [alleAuftraggeber, setAlleAuftraggeber] = useState<Auftraggeber[]>([]);
	const auftraggeber = useQuery("auftraggeber", () =>
		dataFunctions[ClientStatus.online].auftraggeber.get()
	);
	const deleteAuftraggeber = useMutation({
		mutationFn: (id: number) =>
			dataFunctions[ClientStatus.online].auftraggeber.delete(id),
		onSuccess: () => queryClient.invalidateQueries("auftraggeber"),
	});
	const createAuftraggeber = useMutation({
		mutationFn: (auftraggeber: Auftraggeber) =>
			dataFunctions[ClientStatus.online].auftraggeber.create(auftraggeber),
		onSuccess: () => queryClient.invalidateQueries("auftraggeber"),
	});
	const changeAuftraggeber = useMutation({
		mutationFn: (auftraggeber: Auftraggeber) =>
			dataFunctions[ClientStatus.online].auftraggeber.change(auftraggeber),
		onSuccess: () => queryClient.invalidateQueries("auftraggeber"),
	});
	const [value, setValue] = React.useState<GeoDaten | null>(null);
	const [showChangeDialog, setShowChangeDialog] = useState(false);
	const [inputValue, setInputValue] = React.useState("");
	const [options, setOptions] = React.useState<readonly GeoDaten[]>([]);
	const loaded = React.useRef(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [changedAuftraggeber, setChangedAuftraggeber] = useState<
		Auftraggeber[]
	>([]);
	const [isSavable, setIsSavable] = useState(false);
	const [selectedAuftraggeber, setSelectedAuftraggeber] = useState<
		Auftraggeber | undefined
	>();
	const { enqueueSnackbar } = useSnackbar();
	const [reload, setReload] = useState(false);

	const [contextMenu, setContextMenu] = React.useState<{
		mouseX: number;
		mouseY: number;
	} | null>(null);

	const handleContextMenu = (event: React.MouseEvent, obj: Auftraggeber) => {
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
		setSelectedAuftraggeber(obj);
	};

	const handleClose = () => {
		setContextMenu(null);
	};

	const handleDialogExit = (
		triggerNew: boolean,
		auftraggeber?: Auftraggeber
	) => {
		setShowChangeDialog(false);
		if (auftraggeber) {
			if (auftraggeber.id === -1) {
				createAuftraggeber.mutateAsync(auftraggeber);
				console.log("create auftraggeber", auftraggeber);
			} else {
				changeAuftraggeber.mutateAsync(auftraggeber);
				console.log("change auftraggeber", auftraggeber);
			}
			if (triggerNew) {
				console.log("trigger");
				setSelectedAuftraggeber(undefined);
				setTimeout(() => setShowChangeDialog(true), 200);
			}
		}
	};

	useEffect(() => {
		dataFunctions[ClientStatus.online].auftraggeber.get(undefined, (data) => {
			setAlleAuftraggeber(data.data!);
			setReload(true);
		});
		setChangedAuftraggeber([]);
	}, [clientStatus]);

	useEffect(() => {
		if (changedAuftraggeber.length > 0) {
			setIsSavable(true);
		} else {
			setIsSavable(false);
		}
	}, [changedAuftraggeber]);

	const handleSave = () => {
		changedAuftraggeber.forEach((auftraggeber) => {
			let error = undefined;
			dataFunctions[ClientStatus.online].auftraggeber.change(
				auftraggeber,
				(data) => {
					//error if error is there
					if (data && data.error) error = data.error;
				}
			);
			if (error) {
				enqueueSnackbar(error, { variant: "error" });
			}
		});

		setTimeout(
			() =>
				dataFunctions[ClientStatus.online].auftraggeber.get(
					undefined,
					(data) => {
						setAlleAuftraggeber(data.data!);
					}
				),
			400
		);
		setChangedAuftraggeber([]);
		setIsSavable(false);
		setReload(!reload);
	};
	return (
		<>
			<div className={styles.table}>
				<DataTable<Auftraggeber>
					rows={auftraggeber?.data?.data}
					handleRowClick={(auftraggeber) => {
						setSelectedAuftraggeber(auftraggeber);
						setShowChangeDialog(true);
					}}
					columns={[
						{
							title: "Addresse",
							render: (obj) => {
								return <div>{obj.adresse.toString()}</div>;
							},
						},
						{
							title: "Email",
							render: (obj) => {
								return <div>{obj.email}</div>;
							},
						},
						{
							title: "name",
							render: (obj) => {
								return <div>{obj.name}</div>;
							},
						},
						{
							title: "Telefon",
							render: (obj) => {
								return <div>{obj.telefon}</div>;
							},
						},
					]}
					headline="Auftraggeber"
					sort={[
						{
							name: "hinzugefügt",
							functionAsc: (a: Auftraggeber, b: Auftraggeber) => a.id - b.id,
							functionDesc: (a: Auftraggeber, b: Auftraggeber) => b.id - a.id,
						},
						{
							name: "name",
							functionAsc: (a: Auftraggeber, b: Auftraggeber) =>
								a.name.localeCompare(b.name),
							functionDesc: (a: Auftraggeber, b: Auftraggeber) =>
								b.name.localeCompare(a.name),
						},
					]}
					editedElementIds={changedAuftraggeber.map(
						(auftraggeber) => auftraggeber.id
					)}
					renderGrid={(obj) => {
						return <Typography>{obj.name}</Typography>;
					}}
					handleContextMenu={handleContextMenu}
				/>
			</div>
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
						handleClose();
					}}
				>
					<ListItemIcon>
						<Edit />
					</ListItemIcon>
					Bearbeiten
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
				handleClose={() => setShowDeleteDialog(false)}
				isShown={showDeleteDialog}
				handleDelete={() => {
					deleteAuftraggeber.mutateAsync(selectedAuftraggeber?.id ?? -1);
					setShowDeleteDialog(false);
				}}
				title={"Löschen?"}
				message={
					"Möchten Sie wirklich den Auftraggeber " +
					selectedAuftraggeber?.name +
					" löschen?"
				}
			/>
			<ChangeAuftraggeberDialog
				isShown={showChangeDialog}
				currentAuftraggeber={selectedAuftraggeber}
				triggerNewEntity={(auf?) => handleDialogExit(true, auf)}
				handleClose={(auf?) => handleDialogExit(false, auf)}
			/>
			<div className={styles.interactions}>
				<AddButton
					routeParam="auftraggeber"
					onClick={() => {
						setSelectedAuftraggeber(undefined);
						setShowChangeDialog(true);
					}}
				/>
				<SaveButton onClick={handleSave} isShown={isSavable} />
			</div>
		</>
	);
}

export default AuftraggeberComponent;
