import { useRef } from "react";
import { StyledDialog } from "../StyledDialog/StyledDialog";
import {
	Box,
	Button,
	DialogActions,
	DialogContent,
	Divider,
	TextField,
} from "@mui/material";
import { Adresse, Auftraggeber } from "../../../types/allgemein";

export const ChangeAuftraggeberDialog = (props: {
	isShown: boolean;
	handleClose: (toCreateAuftraggeber?: Auftraggeber) => void;
	triggerNewEntity: (toCreateAuftraggeber: Auftraggeber) => void;
	currentAuftraggeber?: Auftraggeber;
}) => {
	const name = useRef<HTMLInputElement>(null);
	const hausnummer = useRef<HTMLInputElement>(null);
	const strasse = useRef<HTMLInputElement>(null);
	const ort = useRef<HTMLInputElement>(null);
	const plz = useRef<HTMLInputElement>(null);
	const telefon = useRef<HTMLInputElement>(null);
	const email = useRef<HTMLInputElement>(null);

	return (
		<StyledDialog
			props={{
				title: {
					id: "change-auftraggeber-dialog",
					onClose: () => props.handleClose(),
					children:
						props.currentAuftraggeber?.name ?? "Auftraggeber hinzufügen",
				},
				general: {
					open: props.isShown,
					fullWidth: true,
					maxWidth: "md",
					onClose: () => props.handleClose(),
					"aria-labelledby": "customized-dialog-title",
				},
			}}
		>
			<DialogContent dividers>
				<Box
					sx={{
						display: "grid",
						gridTemplateAreas: `'name name name name' 
											'email email telefon telefon'
											'divider divider divider divider'
											'strasse strasse strasse hausnr'
											'plz plz ort ort'`,
						gap: "15px",
					}}
				>
					<TextField
						sx={{ gridArea: "name" }}
						label="Name"
						defaultValue={props.currentAuftraggeber?.name ?? ""}
						inputRef={name}
					></TextField>
					<TextField
						sx={{ gridArea: "email" }}
						label="Email"
						defaultValue={props.currentAuftraggeber?.email ?? ""}
						inputRef={email}
					></TextField>
					<TextField
						sx={{ gridArea: "telefon" }}
						label="Telefon"
						defaultValue={props.currentAuftraggeber?.telefon ?? ""}
						inputRef={telefon}
					></TextField>
					<Divider sx={{ gridArea: "divider" }} />
					<TextField
						sx={{ gridArea: "strasse" }}
						label="Straße"
						defaultValue={props.currentAuftraggeber?.adresse.straße ?? ""}
						inputRef={strasse}
					></TextField>
					<TextField
						label="Hausnr."
						sx={{ gridArea: "hausnr" }}
						defaultValue={props.currentAuftraggeber?.adresse.hausnummer ?? ""}
						inputRef={hausnummer}
					></TextField>
					<TextField
						label="Plz"
						sx={{ gridArea: "plz" }}
						defaultValue={props.currentAuftraggeber?.adresse.plz ?? ""}
						inputRef={plz}
					></TextField>
					<TextField
						label="Ort"
						sx={{ gridArea: "ort" }}
						defaultValue={props.currentAuftraggeber?.adresse.ort ?? ""}
						inputRef={ort}
					></TextField>
				</Box>
			</DialogContent>
			<DialogActions>
				{props.currentAuftraggeber ? (
					<></>
				) : (
					<Button
						disabled
						onClick={() => {
							props.triggerNewEntity(
								new Auftraggeber(
									props.currentAuftraggeber?.id ?? -1,
									new Adresse(
										Number.parseInt(
											hausnummer.current?.value ??
												props.currentAuftraggeber?.adresse.hausnummer.toString() ??
												"0"
										) ?? 1,
										ort.current?.value ??
											props.currentAuftraggeber?.adresse.ort.toString() ??
											"",
										plz.current?.value ??
											props.currentAuftraggeber?.adresse.plz.toString() ??
											"",
										strasse.current?.value ??
											props.currentAuftraggeber?.adresse.straße.toString() ??
											""
									),
									email.current?.value ??
										props.currentAuftraggeber?.email.toString() ??
										"",
									name.current?.value ??
										props.currentAuftraggeber?.name.toString() ??
										"",
									telefon.current?.value ??
										props.currentAuftraggeber?.telefon.toString() ??
										""
								)
							);
						}}
					>
						weitere Hinzufügen
					</Button>
				)}
				<Button
					color="success"
					onClick={() => {
						props.handleClose(
							new Auftraggeber(
								props.currentAuftraggeber?.id ?? -1,
								new Adresse(
									Number.parseInt(
										hausnummer.current?.value ??
											props.currentAuftraggeber?.adresse.hausnummer.toString() ??
											"0"
									) ?? 1,
									ort.current?.value ??
										props.currentAuftraggeber?.adresse.ort.toString() ??
										"",
									plz.current?.value ??
										props.currentAuftraggeber?.adresse.plz.toString() ??
										"",
									strasse.current?.value ??
										props.currentAuftraggeber?.adresse.straße.toString() ??
										""
								),
								email.current?.value ??
									props.currentAuftraggeber?.email.toString() ??
									"",
								name.current?.value ??
									props.currentAuftraggeber?.name.toString() ??
									"",
								telefon.current?.value ??
									props.currentAuftraggeber?.telefon.toString() ??
									""
							)
						);
					}}
				>
					{props.currentAuftraggeber ? "Ändern" : "Hinzufügen"}
				</Button>
				<Button color="error" onClick={() => props.handleClose()}>
					Abbrechen
				</Button>
			</DialogActions>
		</StyledDialog>
	);
};
