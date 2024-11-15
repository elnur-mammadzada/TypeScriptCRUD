import { ButtonProps } from "@mui/material";

export interface CustomButtonProps extends ButtonProps {}

export interface UserInitialState {
  users: UserType[];
  loading: boolean;
  isSnackbarOpen: boolean;
  snackbarMessage: string;
  error: string | null;
  userById: UserType;
  selectedId: number | null;
}

export interface UserType {
  id?: string;
  name?: string;
  surname?: string;
  age?: string;
  email?: string;
}

export interface IDialog {
  open: boolean;
  setOpen: (e: boolean) => void;
}
