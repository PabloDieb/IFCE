import {create} from "zustand";

interface IUserClaimsStore {
	claims: IUserClaims;
	updateUserClaims: (claims: IUserClaims) => void;
}

export interface IUserClaims {
	admin: boolean;
	professor: boolean;
}
export const useUserClaimsStore = create<IUserClaimsStore>((set, get) => (
{
	claims: {
		admin: false,
		professor: false
	},
	updateUserClaims: (claims: IUserClaims) => {
		
		set({claims});
	}
}))