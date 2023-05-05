import {
	Alert,
	Box,
	Button,
	DialogActions,
	DialogContent,
	Divider,
	InputAdornment,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { passwordRequirements } from "../../../services/globals";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styles from "./changePasswordDialog.module.css";
import { StyledDialog } from "../StyledDialog/StyledDialog";

const ChangePasswordDialog = (props: {
	isShown: boolean;
	handleClose: any;
}) => {
	const oldPasswordRef = useRef<HTMLInputElement>(null);
	const newPassword1Ref = useRef<HTMLInputElement>(null);
	const newPassword2Ref = useRef<HTMLInputElement>(null);

	const [error, setError] = useState(false);
	const [showPwordOld, setShowPwordOld] = useState(false);
	const [showPwordNew1, setShowPwordNew1] = useState(false);
	const [showPwordNew2, setShowPwordNew2] = useState(false);
	const [allgemeinError, setAllgemeinError] = useState<
		{ error: string; id: number }[] | undefined
	>(undefined);

	useEffect(() => {}, []);

	const handleKeyUp = (event: any) => {
		if (
			newPassword1Ref.current &&
			newPassword1Ref.current.value !== "" &&
			newPassword2Ref.current &&
			newPassword2Ref.current.value !== "" &&
			newPassword1Ref.current.value !== newPassword2Ref.current.value
		) {
			setError(true);
		} else {
			setError(false);
		}
		if (
			newPassword1Ref.current &&
			newPassword2Ref.current &&
			oldPasswordRef.current &&
			newPassword1Ref.current.value === newPassword2Ref.current.value &&
			newPassword1Ref.current.value === oldPasswordRef.current.value &&
			oldPasswordRef.current.value !== "" &&
			oldPasswordRef.current.value !== null
		) {
			addError({
				error: "Das neue Passwort darf nicht dem alten entsprechen",
				id: 1,
			});
		} else {
			removeError(1);
		}
		if (
			newPassword1Ref.current &&
			newPassword2Ref.current &&
			newPassword1Ref.current.value !== "" &&
			newPassword1Ref.current.value !== null &&
			!newPassword1Ref.current.value.match(passwordRequirements)
		) {
			addError({
				error:
					"Das neue Passwort muss folgende Bedingungen erfüllen: 1.Das Passwort muss mindestens 8 Zeichen haben 2. Das Passwort muss mindestens einen Groß- und Kleinbuchstaben haben 3. Das Passwort muss mindestens eine Zahl haben 4. Das Passwort muss mindestens ein Sonderzeichen haben (!@#$%^&*) ",
				id: 2,
			});
		} else {
			removeError(2);
		}
		// setError(((newEmail1Ref.current && newEmail1Ref.current.value !== "") && (newEmail2Ref.current && newEmail2Ref.current.value !== "") && newEmail1Ref.current.value !== newEmail2Ref.current.value)?false:true)
	};

	const addError = (error: { error: string; id: number }) => {
		let test = allgemeinError?.find((errorParam) => errorParam.id === error.id);
		if (test) return;
		setAllgemeinError(allgemeinError ? [...allgemeinError, error] : [error]);
	};
	const removeError = (id: number) => {
		let test = allgemeinError?.find((errorParam) => errorParam.id === id);
		if (!test) return;
		setAllgemeinError(
			allgemeinError && !(test && allgemeinError.length <= 1)
				? allgemeinError.filter((error) => error.id !== id)
				: undefined
		);
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
					children: "Passwort ändern",
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
							Gebe dein altes Passwort ein, damit wir deine Identität
							verifizieren können!
						</Typography>
						<TextField
							label="Altes Passwort"
							inputRef={oldPasswordRef}
							required
							onKeyUp={handleKeyUp}
							fullWidth
							type={showPwordOld ? "text" : "password"}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<div
											className={styles.logineye}
											onClick={() => setShowPwordOld(!showPwordOld)}
										>
											{showPwordOld ? <VisibilityOff /> : <Visibility />}
										</div>
									</InputAdornment>
								),
							}}
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
							Bestätige dein neues Passwort!
						</Typography>
						<TextField
							label="Neues Passwort"
							required
							inputRef={newPassword1Ref}
							fullWidth
							onKeyUp={handleKeyUp}
							type={showPwordNew1 ? "text" : "password"}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<div
											className={styles.logineye}
											onClick={() => setShowPwordNew1(!showPwordNew1)}
										>
											{showPwordNew1 ? <VisibilityOff /> : <Visibility />}
										</div>
									</InputAdornment>
								),
							}}
						/>
						<TextField
							label="Neues Passwort bestätigen"
							required
							inputRef={newPassword2Ref}
							error={error ? true : false}
							helperText={error ? "Passwörter stimmen nicht überein" : ""}
							onKeyUp={handleKeyUp}
							fullWidth
							type={showPwordNew2 ? "text" : "password"}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<div
											className={styles.logineye}
											onClick={() => setShowPwordNew2(!showPwordNew2)}
										>
											{showPwordNew2 ? <VisibilityOff /> : <Visibility />}
										</div>
									</InputAdornment>
								),
							}}
						/>
					</Box>
				</Paper>
				{allgemeinError ? (
					allgemeinError.map((error) => (
						<Alert severity="error" style={{ marginTop: "10px" }}>
							{error.error}
						</Alert>
					))
				) : (
					<></>
				)}
			</DialogContent>

			<DialogActions>
				<Button
					disabled={
						error ||
						allgemeinError ||
						newPassword1Ref.current?.value === "" ||
						newPassword2Ref.current?.value === "" ||
						oldPasswordRef.current?.value === ""
							? true
							: false
					}
				>
					Passwort ändern
				</Button>
			</DialogActions>
		</StyledDialog>
	);
};

export default ChangePasswordDialog;
