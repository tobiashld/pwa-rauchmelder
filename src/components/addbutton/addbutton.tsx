import React from "react";
import styles from "./addbutton.module.css";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

function AddButton(props: {
	routeParam?: string;
	onClick?: () => void;
	className?: string;
}) {
	const navigate = useNavigate();
	return (
		<Box
			sx={{
				backgroundColor: "primary.light",
				borderRadius: "3rem",
				color: "text.primary",
				padding: ".5rem",
				transition: "all 1s cubic-bezier(0.075, 0.82, 0.165, 1)",
				":hover": { backgroundColor: "primary.main", cursor: "pointer" },
			}}
			className={styles.box}
			onClick={(ev: any) => {
				if (props && props.onClick) {
					props.onClick();
				} else {
					navigate("/" + props.routeParam + "/add");
				}
			}}
		>
			<IoIosAdd size={"2rem"} />
			<span className={styles.text}>Hinzufügen</span>
		</Box>
	);
}

export default AddButton;
