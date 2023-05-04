import { useEffect, useRef, useState } from "react";
import { Wohnung, WohnungsHausArt, Wohnungslage } from "../../../types/wohnung";
import { StyledDialog } from "../StyledDialog/StyledDialog";
import {
	Autocomplete,
	Box,
	Button,
	DialogActions,
	DialogContent,
	Divider,
	TextField,
} from "@mui/material";
import { useQuery } from "react-query";
import dataFunctions from "../../../services/datafunctions";
import { ClientStatus } from "../../../types/statusenum";
import { Objekt } from "../../../types/allgemein";

const ChangeObjektDialog = (props: {
	isShown: boolean;
	handleClose: (toCreateObjekt?: Objekt) => void;
	triggerNewEntity: (toCreateObjekt: Objekt) => void;
	currentWohnung?: Wohnung;
}) => {
	const objekte = useQuery(
		"objekte",
		() => dataFunctions[ClientStatus.online].objekte.get(),
		{}
	);
	const nachname = useRef<HTMLInputElement>(null);
	const haus = useRef<HTMLInputElement>(null);
	const etage = useRef<HTMLInputElement>(null);
	const wohnungslage = useRef<HTMLInputElement>(null);
	const [currSelectedObjekt, setCurrSelectedObjekt] = useState<Objekt>();

	useEffect(() => {
		if (props.isShown) {
			if (props.currentWohnung && props.currentWohnung.objekt) {
				setCurrSelectedObjekt(props.currentWohnung.objekt);
			}
		}
	}, [props, props.isShown, props.currentWohnung]);

	return (
		<StyledDialog
			props={{
				title: {
					id: "change-Objekt-dialog",
					onClose: () => props.handleClose(),
					children: props.currentWohnung?.nachname ?? "Objekt hinzufügen",
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
						gridTemplateAreas: `'objekt objekt'
										'vorname nachname'
										'divider divider'
										'haus haus'
										'etage lage'`,
					}}
				>
					<Autocomplete
						aria-label="Objekt"
						id="pruefung-rauchmelder-select"
						value={
							currSelectedObjekt ?? props.currentWohnung?.objekt ?? undefined
						}
						onChange={(event, value) =>
							setCurrSelectedObjekt(value ?? undefined)
						}
						options={objekte.data?.data ?? []}
						loading={!objekte.isSuccess || objekte.isLoading}
						isOptionEqualToValue={(option, value) => {
							return value && option.id === value.id;
						}}
						getOptionLabel={(option) => {
							return (
								option.adresse.straße +
								" " +
								option.adresse.hausnummer +
								", " +
								option.adresse.ort
							);
						}}
						sx={{ gridArea: "objekt" }}
						renderInput={(params) => <TextField {...params} label="Objekt" />}
					/>
					<TextField
						label="Vorname"
						defaultValue={props.currentWohnung?.vorname ?? ""}
						inputRef={nachname}
						sx={{ gridArea: "vorname" }}
					></TextField>
					<TextField
						label="Nachname"
						sx={{ gridArea: "nachname" }}
						defaultValue={props.currentWohnung?.nachname ?? ""}
						inputRef={nachname}
					></TextField>
					<Autocomplete
						sx={{ gridArea: "haus" }}
						options={["-", "Haupthaus", "Anbau"]}
						defaultValue={props.currentWohnung?.haus ?? "-"}
						renderInput={(params) => (
							<TextField {...params} label="Haus" inputRef={haus} />
						)}
						isOptionEqualToValue={(option, value) => {
							if (value && option === value) return true;
							return false;
						}}
					/>
					<Autocomplete
						sx={{ gridArea: "etage" }}
						options={[
							"Sousterrain",
							"EG",
							"1. OG",
							"2. OG",
							"3. OG",
							"4. OG",
							"5. OG",
							"6. OG",
							"7. OG",
							"DG",
						]}
						defaultValue={props.currentWohnung?.etage ?? "EG"}
						renderInput={(params) => (
							<TextField {...params} label="Etage" inputRef={etage} />
						)}
						isOptionEqualToValue={(option, value) => {
							if (value && option === value) return true;
							return false;
						}}
					/>
					<Divider sx={{ gridArea: "divider" }} />
					<Autocomplete
						options={[
							"-",
							"H",
							"HL",
							"HR",
							"L",
							"M",
							"MM",
							"R",
							"V",
							"VL",
							"VR",
						]}
						defaultValue={props.currentWohnung?.wohnungslage ?? "-"}
						renderInput={(params) => (
							<TextField {...params} label="Lage" inputRef={wohnungslage} />
						)}
						isOptionEqualToValue={(option, value) => {
							if (value && option === value) return true;
							return false;
						}}
						sx={{ gridArea: "lage" }}
					/>
				</Box>
			</DialogContent>
			<DialogActions>
				{props.currentWohnung ? (
					<></>
				) : (
					<Button
						onClick={() => {
							if (currSelectedObjekt) {
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
						if (currSelectedObjekt) {
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

export default ChangeObjektDialog;
