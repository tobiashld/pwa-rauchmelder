import {
	Box,
	Collapse,
	Divider,
	IconButton,
	Slide,
	TextField,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import styles from "./chat.module.css";
import SendIcon from "@mui/icons-material/Send";
import Scrollbars from "react-custom-scrollbars-2";
import { Chat as Chatclass, Message } from "../../types/message";
import MessageElement from "../message/message";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { AddComment } from "@mui/icons-material";

function Chat(props: {
	useruuid: string | undefined;
	chats: Chatclass[] | undefined;
	isShown: boolean;
	onClose: () => void;
	messages: Message[];
	sendMessage: (
		message: string | undefined,
		chat: Chatclass | undefined
	) => void;
	scrollbarRef: React.RefObject<Scrollbars>;
}) {
	const containerRef = useRef(null);
	const [currentChat, setCurrentChat] = React.useState<Chatclass>();
	const [supportChat, setSupportChat] = React.useState(false);

	const inputRef = useRef<HTMLInputElement>(null);
	const handleKeyDown = (event: any) => {
		if (event.key === "Enter") {
			props.sendMessage(inputRef.current?.value, currentChat);
			inputRef.current!.value = "";
		}
	};
	// const openSupport = ()=>{
	//     setCurrentChat({nachrichten:[],})
	//     setSupportChat(true)
	// }
	// const closeSupport = ()=>{
	//     setCurrentChat(undefined)
	//     setSupportChat(false);
	// }
	const toggleSupport = () => {
		setCurrentChat(supportChat ? undefined : { nachrichten: [] });
		setSupportChat(supportChat ? false : true);
	};
	useEffect(() => {
		props.scrollbarRef.current?.scrollToBottom();
	}, [props.chats, props.scrollbarRef]);

	return (
		<Box
			ref={containerRef}
			className={
				styles.outerWrapper + " " + (props.isShown ? styles.zindex : "")
			}
		>
			<Slide in={props.isShown} container={containerRef.current}>
				<Box className={styles.completeChatWrapper}>
					<Box
						className={currentChat ? styles.showChats : ""}
						style={{
							borderTopRightRadius: currentChat ? "0px" : "15px",
							borderBottomRightRadius: currentChat ? "0px" : "15px",
							borderRadius: "15px",
							backgroundColor: "white",
							display: "flex",
							flexDirection: "column",
							height: "100%",
							boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.2)",
							marginRight: "-10px",
						}}
					>
						<Collapse orientation="horizontal" in={props.isShown}>
							<Box
								style={{
									width: "250px",
									height: "100%",
									display: "flex",
									flexDirection: "column",
								}}
							>
								<Box
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "center",
										padding: "15px",
										paddingRight: "20px",
									}}
								>
									<h3 style={{ flex: 1 }}>Chats</h3>
									<IconButton>
										<AddComment />
									</IconButton>
									<IconButton onClick={(event) => toggleSupport()}>
										<SupportAgentIcon />
									</IconButton>
								</Box>
								<Divider style={{ gridArea: "divider1" }} />
								<Box
									style={{
										height: "430px",
										padding: "10px",
										display: "flex",
										flexDirection: "column",
										overflowX: "hidden",
										overflowY: "scroll",
									}}
								>
									{props.chats ? (
										props.chats.map((chat) => (
											<div
												style={{
													width: "100%",
													height: "50px",
													borderRadius: "15px",
													boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
													display: "flex",
													padding: "10px",
													alignItems: "center",
													cursor: "pointer",
												}}
												onClick={() =>
													setCurrentChat(
														currentChat?.id === chat.id ? undefined : chat
													)
												}
											>
												{chat.chatteilnehmer?.map((teilnehmer) =>
													teilnehmer.user?.username === "admin"
														? "Supportticket"
														: teilnehmer.userid === props.useruuid
														? ""
														: teilnehmer.user?.username
												)}
											</div>
										))
									) : (
										<Box
											style={{
												position: "relative",
												height: "300px",
												width: "100%",
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											Noch keine Chats!
										</Box>
									)}
								</Box>
							</Box>
						</Collapse>
					</Box>
					<Box>
						<Collapse orientation="horizontal" in={currentChat ? true : false}>
							<Box className={styles.chatWrapper}>
								<Box
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "center",
										padding: "10px",
									}}
								>
									<h3 style={{ flex: 1 }}>
										{supportChat
											? "Support"
											: currentChat?.chatteilnehmer?.map((teilnehmer) =>
													teilnehmer.user?.username === "admin"
														? "Supportticket"
														: teilnehmer.userid === props.useruuid
														? ""
														: teilnehmer.user?.username
											  )}
									</h3>
									{supportChat ? <SupportAgentIcon /> : <></>}
								</Box>
								<Divider style={{ gridArea: "divider1" }} />

								<Scrollbars ref={props.scrollbarRef}>
									{/* <div className={styles.test} > */}
									{currentChat?.nachrichten &&
									currentChat?.nachrichten?.length > 0 ? (
										currentChat.nachrichten.map((message, index) => (
											<Collapse key={index} in={true}>
												<MessageElement
													text={message.nachricht}
													sent={message.userid === props.useruuid}
													seen={
														message.seen === undefined || message.seen === null
															? true
															: message.seen
													}
													name={message.user?.username}
												/>
											</Collapse>
										))
									) : (
										<></>
									)}
									{/* </div> */}
								</Scrollbars>
								<Divider style={{ gridArea: "divider2" }} />
								<div className={styles.interactions}>
									<TextField inputRef={inputRef} onKeyDown={handleKeyDown} />
									<IconButton
										onClick={() => {
											props.sendMessage(inputRef.current?.value, currentChat);
											inputRef.current!.value = "";
										}}
									>
										<SendIcon />{" "}
									</IconButton>
								</div>
							</Box>
						</Collapse>
					</Box>
				</Box>
			</Slide>
		</Box>
	);
}

export default Chat;
