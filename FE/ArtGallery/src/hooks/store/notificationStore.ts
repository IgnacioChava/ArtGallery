import {create} from "zustand";


interface notification {
    msg : string | undefined;
    type : "success" | "info" | "warning" | "error" | undefined;
    updateMsg: (newMsg: string) => void;
    updateType: (newMsg: string) => void;
};



export const useNotificationStore = create<notification>((set) => ({
    msg: "",
    type: undefined,
    updateMsg: (newMsg: string) => set({ msg: newMsg }),
    updateType: (newType: string) => set({ type: newType }),
    clearNotification: () => set({ msg : "", type:undefined }),
}));
