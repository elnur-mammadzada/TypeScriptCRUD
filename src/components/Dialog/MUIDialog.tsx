import { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MUIButton from "../Button/MUIButton";
import { Button, Snackbar } from "@mui/material";
import { addUsers, closeSnackbar } from "../../features/userSlice";
import { Controller, useForm } from "react-hook-form";
import { validationSchema } from "../../schemas/addSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../store";

const MUIDialog = () => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const { snackbarMessage, isSnackbarOpen } = useAppSelector(
        (state) => state.users
    );
    const handleCloseSnackbar = () => {
        dispatch(closeSnackbar());
    };

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: "",
            surname: "",
            email: "",
            age: "",
        },
    });

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const onsubmit = handleSubmit((data) => {
        dispatch(addUsers(data));
        console.log(data);
        reset();
        handleClose();
    });

    return (
        <div>
            <MUIButton
                variant='contained'
                color='success'
                onClick={handleClickOpen}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: "form",
                }}>
                <DialogTitle>Yeni İstifadəçi</DialogTitle>
                <DialogContent>
                    <Controller
                        name='name'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin='dense'
                                placeholder='Ad daxil edin'
                                fullWidth
                                variant='standard'
                            />
                        )}
                    />
                    {errors.name && <p>{errors.name.message}</p>}

                    <Controller
                        name='surname'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin='dense'
                                placeholder='Soyad daxil edin'
                                fullWidth
                                variant='standard'
                            />
                        )}
                    />
                    {errors.surname && <p>{errors.surname.message}</p>}

                    <Controller
                        name='email'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin='dense'
                                placeholder='Email daxin edin'
                                fullWidth
                                variant='standard'
                            />
                        )}
                    />
                    {errors.email && <p>{errors.email.message}</p>}

                    <Controller
                        name='age'
                        control={control}
                        defaultValue={"1"}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin='dense'
                                placeholder='Yaş daxil edin'
                                fullWidth
                                variant='standard'
                            />
                        )}
                    />
                    {errors.age && <p>{errors.age.message}</p>}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Ləğv et</Button>
                    <Button type='submit' onClick={onsubmit}>
                        Əlavə et
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                onClose={handleCloseSnackbar}
                open={isSnackbarOpen}
                autoHideDuration={1000}
                message={snackbarMessage}
            />
        </div>
    );
};

export default MUIDialog;
