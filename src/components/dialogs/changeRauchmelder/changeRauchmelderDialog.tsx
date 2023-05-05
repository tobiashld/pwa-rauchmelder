import { useEffect, useRef, useState } from "react";
import { StyledDialog } from "../StyledDialog/StyledDialog";
import {
	Autocomplete,
	Box,
	Button,
	DialogActions,
	DialogContent,
	TextField,
} from "@mui/material";
import { useQuery } from "react-query";
import dataFunctions from "../../../services/datafunctions";
import { ClientStatus } from "../../../types/statusenum";
import { Auftraggeber, Objekt } from "../../../types/allgemein";
import { Rauchmelder } from "../../../types/rauchmelder";

const ChangeRauchmelderDialog = (props: {
	isShown: boolean;
	handleClose: (toCreateObjekt?: Objekt) => void;
	triggerNewEntity: (toCreateObjekt: Objekt) => void;
	currentRauchmelder?: Rauchmelder;
}) => {
	const auftraggeber = useQuery(
		"auftraggeber",
		() => dataFunctions[ClientStatus.online].auftraggeber.get(),
		{}
	);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const strasse = useRef<HTMLInputElement>(null);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const hausnummer = useRef<HTMLInputElement>(null);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const plz = useRef<HTMLInputElement>(null);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const ort = useRef<HTMLInputElement>(null);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const beschreibung = useRef<HTMLInputElement>(null);

	const [currSelectedAuftraggeber, setCurrSelectedAuftraggeber] =
		useState<Auftraggeber | null>();

	// useEffect(() => {
	// 	// if (props.isShown) {
	// 	// 	if (props.currentObjekt && props.currentObjekt.auftraggeber) {
	// 	// 		setCurrSelectedAuftraggeber(
	// 	// 			(prev) => props.currentObjekt?.auftraggeber ?? null
	// 	// 		);
	// 	// 	}
	// 	// }
	// 	// console.log(props, "props");
	// }, [props, props.isShown, props.currentObjekt]);
	useEffect(() => {
		console.log(currSelectedAuftraggeber);
	}, [currSelectedAuftraggeber]);

	return (
		<StyledDialog
			props={{
				title: {
					id: "change-Objekt-dialog",
					onClose: () => props.handleClose(),
					children:
						props.currentRauchmelder?.seriennr +
							" " +
							props.currentRauchmelder?.raum ?? "Objekt hinzufügen",
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
						gap: "15px",
						display: "grid",
						gridTemplateAreas: `'auftraggeber auftraggeber auftraggeber auftraggeber' 
											'beschreibung beschreibung beschreibung beschreibung'
											'beschreibung beschreibung beschreibung beschreibung'
											'divider divider divider divider'
											'strasse strasse strasse hausnr'
											'plz plz ort ort'`,
					}}
				>
					<Autocomplete
						aria-label="Auftraggeber"
						id="pruefung-rauchmelder-select"
						value={currSelectedAuftraggeber}
						onChange={(event, value) => setCurrSelectedAuftraggeber(value)}
						options={auftraggeber.data?.data ?? []}
						loading={!auftraggeber.isSuccess || auftraggeber.isLoading}
						isOptionEqualToValue={(option, value) => {
							return value && option.id === value.id;
						}}
						renderOption={(props, option) => {
							return (
								<Box
									component="li"
									{...props}
									sx={{ display: "flex", gap: "10px" }}
								>
									<strong>{option.name}</strong>
									{option.adresse.toString()}
								</Box>
							);
						}}
						sx={{ gridArea: "auftraggeber" }}
						renderInput={(params) => (
							<TextField {...params} label="Auftraggeber" />
						)}
					/>
					{/* <TextField
						label="Beschreibung"
						placeholder="Zusätzliche Informationen zum Objekt"
						sx={{ gridArea: "beschreibung" }}
						multiline
						rows={3}
						defaultValue={props.currentObjekt?.beschreibung ?? ""}
						inputRef={beschreibung}
					></TextField>

					<Divider sx={{ gridArea: "divider" }} />
					<TextField
						sx={{ gridArea: "strasse" }}
						label="Straße"
						defaultValue={props.currentObjekt?.adresse.straße ?? ""}
						inputRef={strasse}
					></TextField>
					<TextField
						label="Hausnr."
						sx={{ gridArea: "hausnr" }}
						defaultValue={props.currentObjekt?.adresse.hausnummer ?? ""}
						inputRef={hausnummer}
					></TextField>
					<TextField
						label="Plz"
						sx={{ gridArea: "plz" }}
						defaultValue={props.currentObjekt?.adresse.plz ?? ""}
						inputRef={plz}
					></TextField>
					<TextField
						label="Ort"
						sx={{ gridArea: "ort" }}
						defaultValue={props.currentObjekt?.adresse.ort ?? ""}
						inputRef={ort}
					></TextField> */}
				</Box>
			</DialogContent>
			<DialogActions>
				{props.currentRauchmelder ? (
					<></>
				) : (
					<Button
						disabled
						onClick={() => {
							if (currSelectedAuftraggeber) {
								// props.triggerNewEntity(
								// 	new Wohnung(
								// 		currSelectedObjekt.id,
								// 		etage.current?.value ?? "",
								// 		(wohnungslage.current?.value as Wohnungslage) ?? "-",
								// 		(haus.current?.value as WohnungsHausArt) ?? "-",
								// 		"",
								// 		nachname.current?.value ?? "",
								// 		props.currentWohnung?.id ?? -1,
								// 		currSelectedObjekt ?? undefined
								// 	)
								// );
							}
						}}
					>
						weitere Hinzufügen
					</Button>
				)}
				<Button
					color="success"
					onClick={() => {
						if (currSelectedAuftraggeber) {
							// props.handleClose(
							// 	new Wohnung(
							// 		currSelectedObjekt.id,
							// 		etage.current?.value ?? "",
							// 		(wohnungslage.current?.value as Wohnungslage) ?? "-",
							// 		(haus.current?.value as WohnungsHausArt) ?? "-",
							// 		"",
							// 		nachname.current?.value ?? "",
							// 		props.currentWohnung?.id ?? -1,
							// 		currSelectedObjekt ?? undefined
							// 	)
							// );
						}
					}}
				>
					Ändern
				</Button>
				<Button color="error" onClick={() => props.handleClose()}>
					Abbrechen
				</Button>
			</DialogActions>
		</StyledDialog>
	);
};

export default ChangeRauchmelderDialog;
