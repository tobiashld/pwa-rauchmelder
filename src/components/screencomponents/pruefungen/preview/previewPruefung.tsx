import { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import dataFunctions from "../../../../services/datafunctions";
import { ClientStatus } from "../../../../types/statusenum";
import {
	Page,
	Text,
	Document,
	StyleSheet,
	View,
	PDFViewer,
} from "@react-pdf/renderer";
import { Box } from "@mui/material";

const styles = StyleSheet.create({
	startPage: {
		flexDirection: "row",
	},
	textArea: {
		height: "85px",
	},
	rauchmelderPage: {
		position: "relative",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	rauchmelderTable: {
		height: "80%",
		width: "80%",
		display: "flex",
		flexDirection: "column",
	},
	rauchmelderTableRow: {
		width: "100%",
		height: "60px",
		display: "flex",
		flexDirection: "row",
	},
	rauchmelderTableRowCell: {
		flex: "1",
		border: "1px solid black",
		position: "relative",
		padding: "5px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: "14px",
		fontWeight: "medium",
	},
	rauchmelderTableRowCellHeader: {
		position: "absolute",
		fontWeight: "thin",
		fontSize: "10px",
		top: "2px",
		left: "2px",
	},
});

const PreviewPruefung = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const pruefungQuery = useQuery(["pruefung", id], {
		enabled: id && Number.parseInt(id) !== -1 ? true : false,
		queryFn: () =>
			dataFunctions[ClientStatus.online].pruefungen.get({
				id: Number.parseInt(id ?? "-1"),
			}),
	});

	useEffect(() => {
		if (!id) {
			navigate(-1);
		}
	}, [id, navigate]);
	useEffect(() => {
		if (pruefungQuery.isSuccess && pruefungQuery.data.data) {
		}
	}, [pruefungQuery]);
	return (
		<Box sx={{ width: "100%", height: "100%" }}>
			<PDFViewer width={"100%"} height={"100%"}>
				<Document>
					<Page size="A4" style={styles.startPage}>
						<View>
							<Text>test</Text>
						</View>
					</Page>
					{pruefungQuery.data?.data
						?.at(0)
						?.rauchmelder.map((rauchmelder, index) => {
							return (
								<Page size="A4" style={styles.rauchmelderPage}>
									<View style={styles.rauchmelderTable}>
										<View style={styles.rauchmelderTableRow}>
											<View style={styles.rauchmelderTableRowCell}>
												<Text style={styles.rauchmelderTableRowCellHeader}>
													Lfd Nr.
												</Text>
												<Text>{index}</Text>
											</View>
											<View style={styles.rauchmelderTableRowCell}>
												<Text style={styles.rauchmelderTableRowCellHeader}>
													{rauchmelder.rauchmelderhistorie?.rauchmelderBz
														?.wohnungsID !== 5
														? "Mieter"
														: ""}
												</Text>
												<Text>
													{rauchmelder.rauchmelderhistorie?.rauchmelderBz
														?.wohnung?.nachname ?? ""}
												</Text>
											</View>
										</View>
										<View
											style={{
												...styles.rauchmelderTableRow,
												...styles.textArea,
											}}
										>
											<View
												style={{
													...styles.rauchmelderTableRowCell,
													alignItems: "flex-start",
													justifyContent: "center",
												}}
											>
												<Text style={styles.rauchmelderTableRowCellHeader}>
													Allgemeine Anmerkungen
												</Text>
												<Text>{rauchmelder.anmerkungen ?? ""}</Text>
											</View>
										</View>
										<View
											style={{
												display: "flex",
												width: "100%",
												flexDirection: "row",
											}}
										>
											<View
												style={{
													width: "30px",
													fontSize: "10px",
													height: "100%",
													border: "1px solid black",
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
												}}
											>
												<Text
													style={{
														width: "50px",
														transform: "rotate(-90deg)",
													}}
												>
													Prüfung
												</Text>
											</View>
											<View
												style={{
													flex: 1,
													height: "100%",
												}}
											>
												<View
													style={{
														...styles.rauchmelderTableRow,
														height: "40px",
													}}
												>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															flex: "6",
														}}
													>
														<Text
															style={{
																fontSize: "10px",
																position: "absolute",
																left: "10px",
															}}
														>
															Beschreibung
														</Text>
													</View>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															fontSize: "10px",
														}}
													>
														<Text style={{ position: "absolute", left: "50%" }}>
															Ja
														</Text>
													</View>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															fontSize: "10px",
														}}
													>
														<Text style={{ position: "absolute", left: "50%" }}>
															Nein
														</Text>
													</View>
												</View>
												<View
													style={{
														...styles.rauchmelderTableRow,
														height: "40px",
													}}
												>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															flex: "6",
														}}
													>
														<Text
															style={{
																fontSize: "10px",
																position: "absolute",
																left: "10px",
															}}
														>
															Ist die Batterie in Ordnung?
														</Text>
													</View>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															fontSize: "10px",
														}}
													>
														<Text style={{ position: "absolute", left: "50%" }}>
															{rauchmelder.batterieGut ? "X" : ""}
														</Text>
													</View>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															fontSize: "10px",
														}}
													>
														<Text style={{ position: "absolute", left: "50%" }}>
															{!rauchmelder.batterieGut ? "X" : ""}
														</Text>
													</View>
												</View>
												<View
													style={{
														...styles.rauchmelderTableRow,
														height: "40px",
													}}
												>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															flex: "6",
														}}
													>
														<Text
															style={{
																fontSize: "10px",
																position: "absolute",
																left: "10px",
															}}
														>
															Ist der Raum baulich unverändert?
														</Text>
													</View>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															fontSize: "10px",
														}}
													>
														<Text style={{ position: "absolute", left: "50%" }}>
															{rauchmelder.baulichUnveraendert ? "X" : ""}
														</Text>
													</View>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															fontSize: "10px",
														}}
													>
														<Text style={{ position: "absolute", left: "50%" }}>
															{!rauchmelder.baulichUnveraendert ? "X" : ""}
														</Text>
													</View>
												</View>
												<View
													style={{
														...styles.rauchmelderTableRow,
														height: "40px",
													}}
												>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															flex: "6",
														}}
													>
														<Text
															style={{
																fontSize: "10px",
																position: "absolute",
																left: "10px",
															}}
														>
															War die Funktionsprüfung erfolgreich?
														</Text>
													</View>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															fontSize: "10px",
														}}
													>
														<Text style={{ position: "absolute", left: "50%" }}>
															{rauchmelder.pruefungErfolgreich ? "X" : ""}
														</Text>
													</View>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															fontSize: "10px",
														}}
													>
														<Text style={{ position: "absolute", left: "50%" }}>
															{!rauchmelder.pruefungErfolgreich ? "X" : ""}
														</Text>
													</View>
												</View>
												<View
													style={{
														...styles.rauchmelderTableRow,
														height: "40px",
													}}
												>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															flex: "6",
														}}
													>
														<Text
															style={{
																fontSize: "10px",
																position: "absolute",
																left: "10px",
															}}
														>
															Ist der Rauchwarnelder augenscheinlich
															unbeschädigt?
														</Text>
													</View>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															fontSize: "10px",
														}}
													>
														<Text style={{ position: "absolute", left: "50%" }}>
															{rauchmelder.relevanteBeschaedigung ? "X" : ""}
														</Text>
													</View>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															fontSize: "10px",
														}}
													>
														<Text style={{ position: "absolute", left: "50%" }}>
															{!rauchmelder.relevanteBeschaedigung ? "X" : ""}
														</Text>
													</View>
												</View>
												<View
													style={{
														...styles.rauchmelderTableRow,
														height: "40px",
													}}
												>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															flex: "6",
														}}
													>
														<Text
															style={{
																fontSize: "10px",
																position: "absolute",
																left: "10px",
															}}
														>
															Ist die Nutzung der Räumlichkeit gleich geblieben?
														</Text>
													</View>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															fontSize: "10px",
														}}
													>
														<Text style={{ position: "absolute", left: "50%" }}>
															{rauchmelder.selberRaum ? "X" : ""}
														</Text>
													</View>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															fontSize: "10px",
														}}
													>
														<Text style={{ position: "absolute", left: "50%" }}>
															{!rauchmelder.selberRaum ? "X" : ""}
														</Text>
													</View>
												</View>
												<View
													style={{
														...styles.rauchmelderTableRow,
														height: "40px",
													}}
												>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															flex: "6",
														}}
													>
														<Text
															style={{
																fontSize: "10px",
																position: "absolute",
																left: "10px",
															}}
														>
															Wurde der Mindestabstand zu Hinternissen von 0.5 m
															eingehalten?
														</Text>
													</View>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															fontSize: "10px",
														}}
													>
														<Text style={{ position: "absolute", left: "50%" }}>
															{rauchmelder.hindernisseUmgebung ? "X" : ""}
														</Text>
													</View>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															fontSize: "10px",
														}}
													>
														<Text style={{ position: "absolute", left: "50%" }}>
															{!rauchmelder.hindernisseUmgebung ? "X" : ""}
														</Text>
													</View>
												</View>
												<View
													style={{
														...styles.rauchmelderTableRow,
														height: "40px",
													}}
												>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															flex: "6",
														}}
													>
														<Text
															style={{
																fontSize: "10px",
																position: "absolute",
																left: "10px",
															}}
														>
															Ist der Rauchwarnmelder sauber?
														</Text>
													</View>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															fontSize: "10px",
														}}
													>
														<Text style={{ position: "absolute", left: "50%" }}>
															{rauchmelder.warnmelderGereinigt ? "X" : ""}
														</Text>
													</View>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															fontSize: "10px",
														}}
													>
														<Text style={{ position: "absolute", left: "50%" }}>
															{!rauchmelder.warnmelderGereinigt ? "X" : ""}
														</Text>
													</View>
												</View>
												<View
													style={{
														...styles.rauchmelderTableRow,
														height: "40px",
													}}
												>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															flex: "6",
														}}
													>
														<Text
															style={{
																fontSize: "10px",
																position: "absolute",
																left: "10px",
															}}
														>
															Sind die Rauchmelderöffnungen frei?
														</Text>
													</View>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															fontSize: "10px",
														}}
													>
														<Text style={{ position: "absolute", left: "50%" }}>
															{rauchmelder.oeffnungenFrei ? "X" : ""}
														</Text>
													</View>
													<View
														style={{
															...styles.rauchmelderTableRowCell,
															fontSize: "10px",
														}}
													>
														<Text style={{ position: "absolute", left: "50%" }}>
															{!rauchmelder.oeffnungenFrei ? "X" : ""}
														</Text>
													</View>
												</View>
											</View>
										</View>
										<View
											style={{
												...styles.rauchmelderTableRow,
												...styles.textArea,
											}}
										>
											<View
												style={{
													...styles.rauchmelderTableRowCell,
													alignItems: "flex-start",
													justifyContent: "center",
												}}
											>
												<Text
													style={{
														...styles.rauchmelderTableRowCellHeader,
													}}
												>
													Prüfungsrelevante Anmerkungen
												</Text>
												<Text>{rauchmelder.anmerkungenZwei ?? ""}</Text>
											</View>
										</View>
									</View>
								</Page>
							);
						})}
					<Page size="A4">
						<View></View>
					</Page>
					{/* return ( */}
					{/* {pruefungQuery.data?.data?.at(0)?.rauchmelder.map((rauchmelder) => {
                    <Page>
                    <View>
                    <Text>{rauchmelder.rauchmelderhistorie?.raum}</Text>
                    </View>
                    </Page>
					);
				})} */}
				</Document>
			</PDFViewer>
		</Box>
	);
};

export default PreviewPruefung;
