import { Typography } from "@mui/material";
import styles from "./message.module.css";

function MessageElement(props: {
	name: string | undefined;
	text: string;
	sent: boolean;
	seen: boolean;
}) {
	// const username = useSelector((state:RootState)=>state.username)
	return (
		<div
			className={styles.outer}
			style={{ justifyContent: props.sent ? "flex-end" : "flex-start" }}
		>
			<div
				className={
					styles.bubble +
					" " +
					(props.sent ? styles.outgoing : styles.incoming) +
					" " +
					(props.seen ? "" : styles.new)
				}
			>
				<Typography variant="subtitle2" color="grey">
					{props.sent ? "Du" : props.name}
				</Typography>
				<Typography variant="subtitle1">{props.text}</Typography>
			</div>
		</div>
	);
}

export default MessageElement;
