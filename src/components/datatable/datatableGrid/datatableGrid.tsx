import { DeleteOutlined, Edit, MoreHoriz, MoreVert } from "@mui/icons-material";
import {
	Box,
	IconButton,
	SpeedDial,
	SpeedDialAction,
	SpeedDialIcon,
	Tooltip,
	Typography,
	Zoom,
} from "@mui/material";
import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { DatatableDisplayProps } from "../../../types/datatable";
import styles from "./datatableGrid.module.css";
import SensorsIcon from "@mui/icons-material/Sensors";
function DatatableGrid<T>(props: DatatableDisplayProps<T>) {
	// const [speeddialOpen, setSpeeddialOpen] = React.useState(false);
	React.useEffect(() => {}, []);

	return (
		<Scrollbars
			renderView={(props) => <Box {...props} className={styles.gridbox} />}
			className={styles.scroll}
		>
			{props.activeRows.map((value, index, array) => {
				return (
					<Zoom in={true} key={"datatable " + props.headline + " " + index}>
						<Box className={styles.singleGridElement}>
							<Zoom style={{ transitionDelay: "300ms" }} in={true}>
								<Box
									className={styles.interaction}
									zIndex={20}
									sx={{ backgroundColor: "background.default" }}
								>
									<Tooltip title="Bearbeiten" placement="left">
										<IconButton onClick={(event) => {}} size="medium">
											<Edit />
										</IconButton>
									</Tooltip>
									<SpeedDial
										direction="down"
										ariaLabel="ElementOptions"
										FabProps={{ size: "small", color: "secondary" }}
										icon={
											<SpeedDialIcon
												icon={<MoreVert />}
												openIcon={<MoreHoriz />}
											/>
										}
										sx={{
											position: "absolute",
											top: "-3px",
											right: "-1em",
											gap: 0,
										}}
									>
										{/* {typeof(T) ===typeof Pruefung?<SpeedDialAction icon={<Visibility />} tooltipTitle="Vorschau"></SpeedDialAction>:<></>}    */}
										<SpeedDialAction
											icon={<DeleteOutlined color="error" />}
											tooltipTitle="Löschen"
										></SpeedDialAction>
									</SpeedDial>
								</Box>
							</Zoom>
							<Box
								style={{
									display: "flex",
									alignItems: "center",
									padding: "10px",
									paddingTop: "40px",
									gap: "10px",
								}}
							>
								<SensorsIcon fontSize="large" />
								<Box
									style={{ display: "flex", flexDirection: "column", flex: 1 }}
								>
									<Typography
										textAlign={"start"}
										justifySelf="flex-start"
										variant="h5"
									>
										{props.renderGrid(value)}
									</Typography>
									<Typography variant="subtitle1">Testsubtitle</Typography>
								</Box>
							</Box>
						</Box>
					</Zoom>
				);
			})}
		</Scrollbars>
	);
}

export default DatatableGrid;
