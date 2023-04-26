import {
	Alert,
	Box,
	Button,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Paper,
	styled,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useQuery } from "react-query";
import dataFunctions from "../../../services/datafunctions";
import Loadingspinner from "../../loadingspinner/loadingspinner";
import { Rauchmelder } from "../../../types/rauchmelder";
import { dateOptions, emailRegex } from "../../../services/globals";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styles from "./rauchmelderhistorienDialog.module.css";
import { StyledDialog } from "../StyledDialog/StyledDialog";

const ChangeEmailDialog = (props: { isShown: boolean; handleClose: any }) => {
	const oldEmailRef = useRef<HTMLInputElement>(null);
	const newEmail1Ref = useRef<HTMLInputElement>(null);
	const newEmail2Ref = useRef<HTMLInputElement>(null);
	const [error, setError] = useState(false);
	const [allgemeinError, setAllgemeinError] = useState<string | undefined>(
		undefined
	);

	useEffect(() => {}, []);

	const handleKeyUp = (event: any) => {
		if (
			newEmail1Ref.current &&
			newEmail1Ref.current.value !== "" &&
			newEmail2Ref.current &&
			newEmail2Ref.current.value !== "" &&
			newEmail1Ref.current.value !== newEmail2Ref.current.value
		) {
			setError(true);
		} else {
			setError(false);
		}
		if (
			newEmail1Ref.current &&
			newEmail2Ref.current &&
			oldEmailRef.current &&
			newEmail1Ref.current.value === newEmail2Ref.current.value &&
			newEmail1Ref.current.value === oldEmailRef.current.value
		) {
			setAllgemeinError("Die neue Email darf nicht der alten entsprechen");
		} else if (
			!newEmail1Ref.current?.value.match(emailRegex) &&
			newEmail1Ref.current?.value !== "" &&
			newEmail1Ref.current?.value !== null
		) {
			setAllgemeinError(
				"Bitte achten Sie auf die korrekte Schreibweise einer Email!"
			);
		} else {
			setAllgemeinError(undefined);
		}
		// setError(((newEmail1Ref.current && newEmail1Ref.current.value !== "") && (newEmail2Ref.current && newEmail2Ref.current.value !== "") && newEmail1Ref.current.value !== newEmail2Ref.current.value)?false:true)
	};
	const close = () => {
		props.handleClose();
		setError(false);
		setAllgemeinError(undefined);
	};

	return (
		<StyledDialog
			props={{
				general: {
					fullWidth: true,
					maxWidth: "md",
					onClose: close,
					"aria-labelledby": "customized-dialog-title",
					open: props.isShown,
				},
				title: {
					id: "customized-dialog-title",
					onClose: () => close(),
					children: "Email ändern",
				},
			}}
		>
			<DialogContent dividers>
				<Paper
					style={{
						display: "flex",
						flexDirection: "row",
						padding: "20px",
						gap: "10px",
					}}
				>
					<Box
						style={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
							padding: "10px",
							gap: "20px",
							alignItems: "center",
						}}
					>
						<Typography variant="subtitle2" alignSelf={"center"}>
							Gebe deine alte Email-Addresse ein, damit wir deine Identität
							verifizieren können!
						</Typography>
						<TextField
							label="Alte Email"
							inputRef={oldEmailRef}
							required
							onKeyUp={handleKeyUp}
							fullWidth
						/>
					</Box>
					<Divider orientation="vertical" variant="middle" flexItem />
					<Box
						style={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
							padding: "10px",
							gap: "20px",
							alignItems: "center",
						}}
					>
						<Typography variant="subtitle2" alignSelf={"center"}>
							Bestätige deine neue Email!
						</Typography>
						<TextField
							label="Neue Email"
							required
							inputRef={newEmail1Ref}
							fullWidth
							onKeyUp={handleKeyUp}
						/>
						<TextField
							label="Neue Email bestätigen"
							required
							inputRef={newEmail2Ref}
							error={error ? true : false}
							helperText={error ? "Emailaddressen stimmen nicht überein" : ""}
							onKeyUp={handleKeyUp}
							fullWidth
						/>
					</Box>
				</Paper>
				{allgemeinError ? (
					<Alert severity="error" style={{ marginTop: "10px" }}>
						{allgemeinError}
					</Alert>
				) : (
					<></>
				)}
			</DialogContent>

			<DialogActions>
				<Button
					disabled={error || newEmail1Ref.current?.value === "" ? true : false}
				>
					Email ändern
				</Button>
			</DialogActions>
		</StyledDialog>
	);
};

export default ChangeEmailDialog;
