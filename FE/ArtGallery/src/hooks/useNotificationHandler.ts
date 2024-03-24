
import { shallow } from "zustand/shallow";
import {useNotificationStore } from "./store/notificationStore";


const useNotificationHandler = () => {

	interface notificationReturn {
		msg : string;
		type : "success" | "info" | "warning" | "error" | undefined;

	}

	const updateMsg = useNotificationStore((state) => state.updateMsg);
	const updateType = useNotificationStore((state) => state.updateType);
	const clearNotification = useNotificationStore((e) => e.clearNotification);

	const { msg, type } = useNotificationStore(
		(state) => ({ msg: state.msg, type: state.type }),
		shallow
	);

	
	

	const setErrorNotification = (msg: string, type: string) => {
		console.log("Setting la notificacion");
		updateMsg(msg);
		updateType(type);
	};

    const getErrorNotification = ():notificationReturn => {
		console.log("getting la notificacion");
		console.log(msg);
		console.log(type);

		
		const notification: notificationReturn = {
			msg: msg,
			type: type,
		};
		
		return notification;
	};

	return {
		getErrorNotification,
		setErrorNotification,
		clearNotification
	};
};

export default useNotificationHandler;