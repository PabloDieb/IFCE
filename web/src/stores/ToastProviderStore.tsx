import {create} from "zustand";

interface IToastStore {
	toast: IToast;
	showToast: (toast: IToast) => void;
}

export interface IToast {
	showToast: boolean;
  headerText?: string;
  bodyText?: string;
  variation?: string;
}

export const useToastStore = create<IToastStore>((set, get) => (
{
	toast: {
		showToast: false,
    headerText: "",
    bodyText: "",
    variation: ""
	},
	showToast: (toast: IToast) => {
		set({toast});
    // setTimeout(() => toast.show = false, 3000);
	}
}))