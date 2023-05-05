import {
	Alert,
	Autocomplete,
	Box,
	Button,
	Checkbox,
	Divider,
	FormControl,
	FormControlLabel,
	FormGroup,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Tooltip,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useRef, useState } from "react";
import PlaylistAddSharpIcon from "@mui/icons-material/PlaylistAddSharp";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import dataFunctions from "../../../../services/datafunctions";
import { RootState } from "../../../../store/store";
import { GeprRauchmelder, Pruefung } from "../../../../types/allgemein";
import { ClientStatus } from "../../../../types/statusenum";
import styles from "./addpruefung.module.css";
import {
	Rauchmelder,
	RauchmelderBeziehung,
} from "../../../../types/rauchmelder";
import { useQuery } from "react-query";
import Loadingspinner from "../../../loadingspinner/loadingspinner";
import { DatePicker } from "@mui/x-date-pickers";
import Scrollbars from "react-custom-scrollbars-2";
import { WarningAmber } from "@mui/icons-material";
import moment, { Moment } from "moment";
import pruefungUtil from "../../../../util/pruefung";

function AddPruefung() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const clientStatus = useSelector((state: RootState) => state.isOffline);
	// const [autofillvalue,setAutofillvalue] = useState("")
	const [changedMieter, setChangedMieter] = useState<{ [key: number]: string }>(
		{}
	);
	const [currGeprRauchmelderId, setCurrGeprRauchmelder] = useState<
		number | undefined
	>();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [searchParams, setSearchParams] = useSearchParams();
	const { id } = useParams();
	const currPruefObjektParam =
		Number.parseInt(id ? id : "0") === -1 && searchParams.get("pruefObjekt")
			? searchParams.get("pruefObjekt")
			: undefined;
	const currPruefObjektQuery = useQuery(
		["objekt", currPruefObjektParam],
		() => dataFunctions[1].objekte.get({ id: currPruefObjektParam }),
		{ enabled: currPruefObjektParam ? true : false }
	);
	const [currPruefung, setCurrPruefung] = useState<Pruefung | undefined>(
		new Pruefung(-1, new Date(), [], undefined, undefined)
	);
	const [currSelectedRauchmelder, setCurrSelectedRauchmelder] = useState<
		RauchmelderBeziehung | undefined
	>();
	const rauchmelderQuery = useQuery(
		[
			"objekt",
			currPruefObjektParam
				? currPruefObjektParam
				: currPruefung?.objekt?.id
				? currPruefung?.objekt?.id
				: -1,
			"rauchmelder",
		],
		dataFunctions[ClientStatus.online].rauchmelder.getForObject
	);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const pruefungQuery = useQuery(
		["pruefung", id],
		() => dataFunctions[1].pruefungen.get({ id: id }),
		{
			enabled: id !== "-1" ? true : false,
			onSuccess: (data) => {
				setCurrPruefung(data?.data?.at(0));
			},
		}
	);

	const [showNewRauchmelder, setShowNewRauchmelder] = useState(false);
	const [newRauchmelderHistorie, setNewRauchmelderHistorie] = useState<
		RauchmelderBeziehung[]
	>([]);
	const newSeriennrRef = useRef(null);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [newSeriennr, setNewSeriennr] = useState("");
	const [newProdDatum, setNewProdDatum] = useState<Moment>();
	const [currMieterName, setCurrMieterName] = useState("");
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	React.useEffect(() => {
		// bei jedem Wechsel des selektierten rauchmelders soll die value des
		// mieterinputs entweder leer sein oder den geänderten mieter beinhalten

		let currentRauchmelder = rauchmelderQuery?.data?.data?.find(
			(item) => item.aktuelleHistorienID === currGeprRauchmelderId
		);
		let isAlreadyNew = newRauchmelderHistorie.find(
			(item) => item.id === currentRauchmelder?.id
		);
		setShowNewRauchmelder(isAlreadyNew ? true : false);
		setNewSeriennr(isAlreadyNew?.aktuellerRauchmelder?.seriennr ?? "");
		setNewProdDatum(
			moment(isAlreadyNew?.aktuellerRauchmelder?.produktionsdatum ?? new Date())
		);
		let currRauchmelderBz = rauchmelderQuery.data?.data.filter(
			(rauchmelder) => rauchmelder.aktuelleHistorienID === currGeprRauchmelderId
		);
		if (currRauchmelderBz && currRauchmelderBz.length === 1) {
			let wohnungsId = currRauchmelderBz.at(0)?.wohnungsID;
			setCurrMieterName(
				wohnungsId && changedMieter[wohnungsId] ? changedMieter[wohnungsId] : ""
			);
		} else {
			setCurrMieterName("");
		}
	}, [
		currGeprRauchmelderId,
		rauchmelderQuery.data?.data,
		changedMieter,
		newRauchmelderHistorie,
	]);

	React.useEffect(() => {
		if (
			currPruefObjektQuery.isSuccess &&
			currPruefObjektQuery.data.data?.at(0) &&
			currPruefung
		) {
			let clone = structuredClone(currPruefung);
			clone.objekt = currPruefObjektQuery.data.data.at(0);
			setCurrPruefung(clone);
		}
	}, [
		currPruefObjektQuery.isSuccess,
		currPruefObjektQuery.data?.data,
		currPruefung,
	]);

	// if(pruefungQuery.isSuccess){
	//     setCurrPruefung(toPruefungConverter(pruefungQuery.data?.data?[0]?pruefungQuery.data.data[0]:new Pruefung(-1,"",)))
	// }

	const handleChange = (event: any, value: any, reason: any, details: any) => {
		setCurrSelectedRauchmelder(value);
	};
	const handleAttributeChange = (
		newGeprRauchmelder: Partial<Omit<GeprRauchmelder, "id">>
	) => {
		let clone = structuredClone(currPruefung);

		if (clone && clone.rauchmelder && clone.rauchmelder.length > 0) {
			clone.rauchmelder = clone.rauchmelder.map(
				(rauchmelder: GeprRauchmelder) => {
					if (rauchmelder.rauchmelderID === currGeprRauchmelderId) {
						Object.keys(newGeprRauchmelder).forEach((key) => {
							// @ts-ignore
							rauchmelder[key] = newGeprRauchmelder[key];
							// @ts-ignore
						});
					}
					return rauchmelder;
				}
			);
		}

		setCurrPruefung((prev) => clone);
	};
	const handleSave = () => {
		if (currPruefung) {
			if (id && id !== "-1") {
				dataFunctions[ClientStatus.online].pruefungen.change(
					pruefungUtil.prepPruefung(currPruefung),
					(data) => {
						if (data && data.status && data.status === 200) {
							enqueueSnackbar(data.data, { variant: "success" });
							navigate("/pruefungen");
						} else if (data) {
							enqueueSnackbar(
								"Hinzufügen der Prüfung fehlgeschlagen. Probiere es erneut",
								{ variant: "error" }
							);
						}
					}
				);
			} else {
				dataFunctions[ClientStatus.online].pruefungen.create(
					pruefungUtil.prepPruefung(currPruefung),
					(data) => {
						if (data && data.status && data.status === 200) {
							enqueueSnackbar(data.data, { variant: "success" });
							navigate("/pruefungen");
						} else if (data) {
							enqueueSnackbar(
								"Hinzufügen der Prüfung fehlgeschlagen. Probiere es erneut",
								{ variant: "error" }
							);
						}
					}
				);
			}
		}
	};
	if (rauchmelderQuery.isError) {
		enqueueSnackbar("Error in addpruefung component", { variant: "error" });
		return <div>Error</div>;
	}

	return (
		<div className={styles.fullcell}>
			<div className={styles.gesamtbox}>
				<div className={styles.outerbox}>
					<div className={styles.rauchmelderbox}>
						<div className={styles.rauchmelderboxInside}>
							<div className={styles.gesamtuebersicht}>
								<Box className={styles.rauchmeldercard + " " + styles.addcard}>
									<Autocomplete
										id="pruefung-rauchmelder-select"
										value={currSelectedRauchmelder ?? undefined}
										onChange={handleChange}
										isOptionEqualToValue={(option, value) => {
											if (value === undefined) return true;
											return option.id === value.id;
										}}
										options={
											rauchmelderQuery?.data?.data.filter((rauchmelder) =>
												currPruefung?.rauchmelder.find(
													(index) =>
														index.rauchmelderID ===
														rauchmelder.aktuelleHistorienID
												)
													? false
													: true
											) ?? []
										}
										groupBy={(option) =>
											`${option.wohnung?.nachname.split(" ")[0]}`
										}
										getOptionLabel={(option) =>
											option.aktuellerRauchmelder?.seriennr +
											" " +
											option.aktuellerRauchmelder?.raum
										}
										loading={
											!rauchmelderQuery.isSuccess ||
											(rauchmelderQuery.data &&
												rauchmelderQuery.data.error !== undefined)
										}
										sx={{ width: 300 }}
										renderInput={(params) => (
											<TextField {...params} label="Rauchmelder" />
										)}
									/>
									{/* <FormControl fullWidth>
                                    <InputLabel id="Rauchmelder">Rauchmelder</InputLabel>
                                    <Select
                                        labelId="Rauchmelder"
                                        id="single-select"
                                        value={currSelectedRauchmelder?JSON.stringify(currSelectedRauchmelder):""}
                                        label="Rauchmelder"
                                        onChange={handleChange}
                                        input={<OutlinedInput id="select-multiple-chip" label="Rauchmelder" />}
                                        MenuProps={MenuProps}
                                        renderValue={(value)=>{
                                            if(value=== "")return ""
                                            let rauchmelder : RauchmelderBeziehung= JSON.parse(value)
                                            return rauchmelder.aktuellerRauchmelder!.seriennr + " " + rauchmelder.aktuellerRauchmelder!.raum
                                        }}
                                    >
                                        {
                                        rauchmelderQuery!.data!.data.filter(rauchmelder=>currPruefung?.rauchmelder.find(index=>index.rauchmelderId===rauchmelder.aktuelleHistorienID)?false:true).map(rauchmelder=>{
                                            
                                            return (
                                                <MenuItem
                                                    key={rauchmelder.aktuelleHistorienID}
                                                    value={JSON.stringify(rauchmelder)}
                                                >
                                                    {rauchmelder.aktuellerRauchmelder!.seriennr+ " "+ rauchmelder.aktuellerRauchmelder!.raum }
                                                </MenuItem>
                                        )})
                                        }
            
                                    </Select>
                                </FormControl> */}
									<IconButton
										className={styles.addbutton}
										size="medium"
										onClick={() => {
											let rauchmelderBereitsGeprueft =
												currPruefung?.rauchmelder.find(
													(item: GeprRauchmelder) =>
														item.rauchmelderID ===
														currSelectedRauchmelder?.aktuelleHistorienID
												);
											if (!currSelectedRauchmelder) return;
											if (rauchmelderBereitsGeprueft) {
												enqueueSnackbar(
													"Dieser Rauchmelder ist bereits geprüft!",
													{ variant: "warning" }
												);
												return;
											}
											let rauchmelderTransient =
												rauchmelderQuery.data?.data?.find(
													(value) =>
														value.aktuelleHistorienID ===
														currSelectedRauchmelder.aktuelleHistorienID
												);
											let geprRauchmelder = new GeprRauchmelder(
												currSelectedRauchmelder.id,
												0,
												true,
												true,
												true,
												true,
												true,
												true,
												true,
												true,
												"",
												"",
												undefined,
												rauchmelderTransient?.aktuellerRauchmelder,
												new Date()
											);
											let newGeprRauchmelderList =
												currPruefung && currPruefung.rauchmelder
													? currPruefung?.rauchmelder.slice()
													: [];
											newGeprRauchmelderList.push(geprRauchmelder);
											setCurrGeprRauchmelder(
												currSelectedRauchmelder.aktuelleHistorienID
											);
											setCurrPruefung({
												...currPruefung,
												id: currPruefung?.id ? currPruefung.id : -1,
												timestamp: currPruefung?.timestamp
													? currPruefung.timestamp
													: new Date(),
												rauchmelder: currPruefung?.rauchmelder
													? [...currPruefung?.rauchmelder, geprRauchmelder]
													: [geprRauchmelder],
											});
											setCurrSelectedRauchmelder(undefined);
										}}
									>
										<PlaylistAddSharpIcon color="inherit" fontSize="medium" />
									</IconButton>
									{/* <AddButton routeParam='test' className={styles.addbutton} onClick={()=>{
                                    if(!currSelectedRauchmelder)return
                                    if(currPruefung?.rauchmelder.find(item=>item.rauchmelderId===currSelectedRauchmelder.id)){
                                        enqueueSnackbar("Dieser Rauchmelder ist bereits geprüft!",{variant:"warning"})
                                        return
                                    }
                                    let geprRauchmelder = new GeprRauchmelder(0,currSelectedRauchmelder.id,0,true,true,true,true,true,true,true,true,"","","now",currPruefung?.id)
                                    let newGeprRauchmelderList = (currPruefung && currPruefung.rauchmelder)?currPruefung?.rauchmelder.slice():[]
                                    newGeprRauchmelderList.push(geprRauchmelder)
                                    let helperPruefung = new Pruefung(currPruefung!.id,currPruefung!.timestamp,currPruefung!.user,currPruefung!.objekt,newGeprRauchmelderList)
                                    setCurrGeprRauchmelder(geprRauchmelder)
                                    setCurrPruefung(helperPruefung)
                                    setCurrSelectedRauchmelder(undefined)
                                }}/> */}
								</Box>

								<Divider variant="middle" className={styles.divider} />

								<Scrollbars className={styles.rauchmelderliste}>
									{currPruefung ? (
										currPruefung?.rauchmelder.map((rauchmelder) => {
											return (
												<Box
													sx={{
														"::before": {
															content: '""',
															position: "absolute",
															marginLeft:
																currGeprRauchmelderId &&
																rauchmelder.rauchmelderID ===
																	currGeprRauchmelderId
																	? "-13px"
																	: "-20px",
															width: "8px",
															height: "80%",
															borderRadius: "5px",
															marginTop: "auto",
															marginBottom: "auto",
															backgroundColor: "primary.light",
															transition: "all 0.3s ease-in-out",
														},
														position: "relative",
														color: "text.primary",
														overflow: "hidden",
													}}
													className={
														currGeprRauchmelderId &&
														rauchmelder.rauchmelderID === currGeprRauchmelderId
															? styles.rauchmeldercard +
															  " " +
															  styles.activeRauchmelder
															: styles.rauchmeldercard
													}
													onClick={(event) => {
														setCurrGeprRauchmelder(rauchmelder.rauchmelderID);
													}}
												>
													<Box
														sx={{
															fontWeight:
																currGeprRauchmelderId &&
																rauchmelder.rauchmelderID ===
																	currGeprRauchmelderId
																	? 600
																	: 400,
														}}
														className={styles.rauchmeldercardTitle}
													>
														{rauchmelder.rauchmelderhistorie?.raum ??
															rauchmelder.rauchmelderID}
													</Box>
													<Box>
														{rauchmelder.rauchmelderhistorie?.seriennr ??
															"abgelöst"}
														{rauchmelder.rauchmelderhistorie &&
														!rauchmelder.rauchmelderhistorie.isactive ? (
															<Box
																sx={{
																	position: "absolute",
																	top: "5px",
																	right: "5px",
																}}
															>
																<Tooltip title={"Mittlerweile abgelöst!"}>
																	<WarningAmber color="warning" />
																</Tooltip>
															</Box>
														) : (
															<></>
														)}
													</Box>
												</Box>
											);
										})
									) : (
										<Loadingspinner size="Big" />
									)}
								</Scrollbars>
							</div>
							{currPruefung ? (
								currPruefung?.rauchmelder.length > 0 &&
								Number.parseInt(id ? id : "0") === -1 ? (
									<div className={styles.saveinteractions}>
										<Button
											fullWidth
											color="success"
											variant="contained"
											onClick={handleSave}
											disabled={currPruefung.rauchmelder.length <= 0}
										>
											Prüfung abschließen
										</Button>
									</div>
								) : (
									<></>
								)
							) : (
								<></>
							)}
						</div>
					</div>
					<div className={styles.pruefungsbox}>
						<div className={styles.pruefungboxInside}>
							<div className={styles.actualPruefung}>
								{currPruefung?.rauchmelder.find(
									(item) => item.rauchmelderID === currGeprRauchmelderId
								)?.rauchmelderhistorie?.isactive === false ? (
									<Box sx={{ margin: "10px" }}>
										<Alert severity="warning">
											Dieser Rauchmelder wurde bereits ersetzt und ist daher
											nicht mehr im Einsatz!
										</Alert>
									</Box>
								) : (
									<></>
								)}
								{currPruefung?.rauchmelder.find(
									(item) => item.rauchmelderID === currGeprRauchmelderId
								)?.rauchmelderhistorie?.rauchmelderBz?.wohnungsID === 5 ? (
									<Box sx={{ margin: "10px" }}>
										<Alert severity="info">
											Dieser Rauchmelder befindet sich im Treppenhaus!
										</Alert>
									</Box>
								) : (
									<></>
								)}

								{currGeprRauchmelderId ? (
									<Scrollbars>
										<div className={styles.pruefungsinhalt}>
											<div>
												{rauchmelderQuery.data?.data
													.filter((rauchmelder) => {
														return (
															rauchmelder.aktuelleHistorienID ===
															currGeprRauchmelderId
														);
													})
													.map((rauchmelder) => {
														let isTreppenhaus = rauchmelder.wohnung?.id === 5;
														let isChangedMieter =
															rauchmelder.wohnung?.id &&
															!isTreppenhaus &&
															changedMieter[rauchmelder.wohnung.id]
																? changedMieter[rauchmelder.wohnung.id]
																: undefined;
														return (
															<div className={styles.infotable}>
																<div>
																	<strong>Seriennr</strong>
																</div>
																{!isTreppenhaus ? (
																	<div>
																		<strong>{"Mieter Nachname"}</strong>
																	</div>
																) : (
																	<div></div>
																)}

																<div>
																	{rauchmelder.aktuellerRauchmelder!.seriennr}
																</div>
																{!isTreppenhaus ? (
																	<div>
																		{
																			<TextField
																				value={currMieterName}
																				size="small"
																				id="add-pruefung-mieter"
																				placeholder={
																					isChangedMieter
																						? isChangedMieter
																						: rauchmelder.wohnung?.nachname
																				}
																				onChange={(event) => {
																					setCurrMieterName(
																						event.target.value
																							? event.target.value
																							: ""
																					);
																					if (
																						event.currentTarget.value &&
																						event.currentTarget.value !== ""
																					) {
																						setChangedMieter((prev) => {
																							let copy = { ...prev };
																							prev[rauchmelder.wohnungsID] =
																								event.target.value;
																							return copy;
																						});
																					} else if (
																						event.target.value === ""
																					) {
																						setChangedMieter((prev) => {
																							let copy = { ...prev };
																							delete copy[
																								rauchmelder.wohnungsID
																							];
																							return copy;
																						});
																					}
																				}}
																			></TextField>
																		}
																	</div>
																) : (
																	<div></div>
																)}
															</div>
														);
													}) || (
													<div className={styles.infotable}>
														<div>
															<strong>Seriennr</strong>
														</div>

														<div>
															{
																currPruefung?.rauchmelder.find(
																	(item) =>
																		item.rauchmelderID === currGeprRauchmelderId
																)?.rauchmelderhistorie?.seriennr
															}
														</div>
													</div>
												)}
											</div>
											<div>
												<TextField
													fullWidth
													className={styles.anmerkung}
													placeholder="Allgemeine Anmerkungen (Tausch etc.)"
													id="allgemeine-anmerkungen"
													onChange={(event) => {
														handleAttributeChange({
															anmerkungen: event.target.value,
														});
													}}
													value={
														currPruefung?.rauchmelder.find(
															(item) =>
																item.rauchmelderID === currGeprRauchmelderId
														)?.anmerkungen ?? ""
													}
												/>
											</div>
											<div className={styles.pruefungskriterien}>
												<FormGroup>
													<FormControlLabel
														onChange={(event, checked) => {
															handleAttributeChange({ selberRaum: checked });
														}}
														control={
															<Checkbox
																checked={
																	currPruefung?.rauchmelder.find(
																		(item) =>
																			item.rauchmelderID ===
																			currGeprRauchmelderId
																	)?.selberRaum ?? false
																}
															/>
														}
														label="Nutzung des Raums gleich (z.B. Wohnzimmer wurde nicht zum Schlafzimmer)?"
													/>
													<FormControlLabel
														onChange={(event, checked) => {
															handleAttributeChange({
																baulichUnveraendert: checked,
															});
														}}
														control={
															<Checkbox
																checked={
																	currPruefung?.rauchmelder.find(
																		(item) =>
																			item.rauchmelderID ===
																			currGeprRauchmelderId
																	)?.baulichUnveraendert ?? false
																}
															/>
														}
														label="Raum ist baulich unverändert?"
													/>
													<FormControlLabel
														onChange={(event, checked) => {
															handleAttributeChange({
																hindernisseUmgebung: checked,
															});
														}}
														control={
															<Checkbox
																checked={
																	currPruefung?.rauchmelder.find(
																		(item) =>
																			item.rauchmelderID ===
																			currGeprRauchmelderId
																	)?.hindernisseUmgebung ?? false
																}
															/>
														}
														label="Keine Hindernisse in der umgebung von 0,5m? Leuchte näher als 50 cm?"
													/>
													<FormControlLabel
														onChange={(event, checked) => {
															handleAttributeChange({
																relevanteBeschaedigung: checked,
															});
														}}
														control={
															<Checkbox
																checked={
																	currPruefung?.rauchmelder.find(
																		(item) =>
																			item.rauchmelderID ===
																			currGeprRauchmelderId
																	)?.relevanteBeschaedigung ?? false
																}
															/>
														}
														label="Keine funktionsrelevante Beschädigung?"
													/>
													<FormControlLabel
														onChange={(event, checked) => {
															handleAttributeChange({
																oeffnungenFrei: checked,
															});
														}}
														control={
															<Checkbox
																checked={
																	currPruefung?.rauchmelder.find(
																		(item) =>
																			item.rauchmelderID ===
																			currGeprRauchmelderId
																	)?.oeffnungenFrei ?? false
																}
															/>
														}
														label="Raucheindringöffnungen frei?"
													/>
													<FormControlLabel
														onChange={(event, checked) => {
															handleAttributeChange({
																warnmelderGereinigt: checked,
															});
														}}
														control={
															<Checkbox
																checked={
																	currPruefung?.rauchmelder.find(
																		(item) =>
																			item.rauchmelderID ===
																			currGeprRauchmelderId
																	)?.warnmelderGereinigt ?? false
																}
															/>
														}
														label="Rauchwarnmelder gereinigt?"
													/>
													<FormControlLabel
														onChange={(event, checked) => {
															handleAttributeChange({
																pruefungErfolgreich: checked,
															});
														}}
														control={
															<Checkbox
																checked={
																	currPruefung?.rauchmelder.find(
																		(item) =>
																			item.rauchmelderID ===
																			currGeprRauchmelderId
																	)?.pruefungErfolgreich ?? false
																}
															/>
														}
														label="Funktionsprüfung erfolgreich?"
													/>
													<FormControlLabel
														onChange={(event, checked) => {
															handleAttributeChange({ batterieGut: checked });
														}}
														control={
															<Checkbox
																checked={
																	currPruefung?.rauchmelder.find(
																		(item) =>
																			item.rauchmelderID ===
																			currGeprRauchmelderId
																	)?.batterieGut ?? false
																}
															/>
														}
														label="Batterie in Ordnung?"
													/>
												</FormGroup>
											</div>
											<div className={styles.pruefungstext}>
												<div className={styles.grundselect}>
													<FormControl
														sx={{ width: "100%", backgroundColor: "white" }}
													>
														<InputLabel id="grund">Grund</InputLabel>
														<Select
															labelId="grund"
															id="single-select"
															value={
																currPruefung?.rauchmelder
																	.find(
																		(item) =>
																			item.rauchmelderID ===
																			currGeprRauchmelderId
																	)
																	?.grund.toString() ?? ""
															}
															label="Grund"
															disabled={
																currPruefung?.rauchmelder.find(
																	(item) =>
																		item.rauchmelderID === currGeprRauchmelderId
																)?.rauchmelderhistorie?.isactive === false
															}
															onChange={(event) => {
																let grund = Number.parseInt(event.target.value);
																handleAttributeChange({ grund: grund });

																let currentRauchmelder =
																	rauchmelderQuery?.data?.data?.find(
																		(item) =>
																			item.aktuelleHistorienID ===
																			currGeprRauchmelderId
																	);
																let isAlreadyNew =
																	newRauchmelderHistorie.findIndex(
																		(item) => item.id === currentRauchmelder?.id
																	);
																if (grund === 2) {
																	setShowNewRauchmelder(true);
																	if (
																		!isAlreadyNew ||
																		(isAlreadyNew === -1 && currentRauchmelder)
																	) {
																		setNewRauchmelderHistorie((prev) =>
																			prev.concat(
																				new RauchmelderBeziehung(
																					currentRauchmelder!.id!,
																					-1,
																					currentRauchmelder!.wohnungsID,
																					currentRauchmelder?.wohnung,
																					new Rauchmelder(
																						currentRauchmelder!.aktuellerRauchmelder!.raum,
																						"",
																						new Date(),
																						true,
																						-1,
																						currentRauchmelder!.id,
																						new Date(),
																						undefined
																					)
																				)
																			)
																		);
																	}
																	// setNewRauchmelderHistorie(prev=>{
																	// 	prev.find
																	// })
																} else if (currentRauchmelder) {
																	setNewRauchmelderHistorie((prev) =>
																		prev.filter(
																			(item) =>
																				item.id !== currentRauchmelder?.id
																		)
																	);
																	setShowNewRauchmelder(false);
																} else {
																	console.error(
																		"addpruefung.tsx:800. Kein Rauchmelder mit passender bz id gefunden"
																	);
																	enqueueSnackbar(
																		"Ups! Es ist etwas falsch gelaufen. Bitte versuchen Sie es später erneut.",
																		{ variant: "error" }
																	);
																}
															}}
														>
															<MenuItem value="0">Erstinbetriebnahme</MenuItem>
															<MenuItem value="1">
																Inspektion / Wartung
															</MenuItem>
															<MenuItem value="2">
																Ausgetauscht + Erstinbetriebnahme
															</MenuItem>
														</Select>
													</FormControl>
												</div>
												{showNewRauchmelder &&
												Number.parseInt(id ? id : "0") === -1 ? (
													<div className={styles.newRauchmelderDiv}>
														<TextField
															placeholder="Neue Seriennr"
															defaultValue={
																newRauchmelderHistorie.find((item) => {
																	return (
																		item.id ===
																		rauchmelderQuery?.data?.data?.find(
																			(itemTwo) =>
																				itemTwo.aktuelleHistorienID ===
																				currGeprRauchmelderId
																		)?.id
																	);
																})?.aktuellerRauchmelder?.seriennr
															}
															className={
																styles.newSeriennr + " " + styles.input
															}
															inputRef={newSeriennrRef}
															onKeyUp={(event) => {
																let currentRauchmelder =
																	rauchmelderQuery?.data?.data?.find(
																		(item) =>
																			item.aktuelleHistorienID ===
																			currGeprRauchmelderId
																	);
																let isAlreadyNew = newRauchmelderHistorie.find(
																	(item) => item.id === currentRauchmelder?.id
																);
																if (isAlreadyNew && currentRauchmelder) {
																	setNewRauchmelderHistorie((prev) =>
																		prev.map((item) => {
																			if (item.id === currentRauchmelder!.id) {
																				// @ts-ignore
																				item.aktuellerRauchmelder!.seriennr =
																					// @ts-ignore
																					event.target.value ?? "";
																			}
																			return item;
																		})
																	);
																}
															}}
														/>
														<DatePicker
															label="Produktionsdatum"
															value={newProdDatum}
															inputFormat="DD/MM/yyyy"
															onChange={(newValue: Moment | null) => {
																// @ts-ignore
																setNewProdDatum(newValue ?? "");
																let currentRauchmelder =
																	rauchmelderQuery?.data?.data?.find(
																		(item) =>
																			item.aktuelleHistorienID ===
																			currGeprRauchmelderId
																	);
																let isAlreadyNew = newRauchmelderHistorie.find(
																	(item) => item.id === currentRauchmelder?.id
																);
																if (
																	isAlreadyNew &&
																	currentRauchmelder &&
																	newValue
																) {
																	setNewRauchmelderHistorie((prev) =>
																		prev.map((item) => {
																			if (item.id === currentRauchmelder!.id) {
																				// @ts-ignore
																				item.aktuellerRauchmelder!.produktionsdatum =
																					// @ts-ignore
																					newValue.toDate() ?? "";
																			}
																			return item;
																		})
																	);
																}
															}}
															renderInput={(params) => (
																<TextField {...params} />
															)}
															className={
																styles.newProddatum + " " + styles.input
															}
														/>
													</div>
												) : (
													<></>
												)}

												<div>
													<TextField
														placeholder="Prüfungsrelevante Anmerkungen (Grund fürs Nicht-Bestehen etc.)"
														value={
															currPruefung?.rauchmelder.find(
																(item) =>
																	item.rauchmelderID === currGeprRauchmelderId
															)?.anmerkungenZwei ?? ""
														}
														fullWidth
														onChange={(event) => {
															handleAttributeChange({
																anmerkungenZwei: event.target.value,
															});
														}}
														className={styles.anmerkung}
													/>
												</div>
											</div>
										</div>
									</Scrollbars>
								) : (
									<></>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddPruefung;
