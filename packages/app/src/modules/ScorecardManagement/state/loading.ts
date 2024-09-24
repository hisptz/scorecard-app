import { atom } from "recoil";

type LoadingAction = "save" | "saveAndContinue" | "validate";
type LoadingButton = "save" | "saveAndContinue" | "previous" | "next";

export const FormLoadingState = atom<{ action: LoadingAction, loading: boolean, button: LoadingButton } | undefined>({
	key: "form-loading-state",
	default: undefined
});
