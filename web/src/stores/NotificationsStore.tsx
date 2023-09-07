import {create} from "zustand";

interface INotificationsStore {
  notifications: INotifications
	updateNotifications: (notifications: INotifications) => void;
}

export interface INotifications {
  notificationsQuantity: number;
	wasNotificationsSeen: boolean;
}
export const useNotificationsStore = create<INotificationsStore>((set, get) => (
{
	notifications: {
		notificationsQuantity: 0,
		wasNotificationsSeen: false
	},
	updateNotifications: (notifications: INotifications) => {
		
		set({notifications});
	}
}))