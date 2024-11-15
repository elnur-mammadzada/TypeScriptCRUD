import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Button, Snackbar } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../../schemas/addSchema";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
    closeSnackbar,
    deleteUsers,
    updateUsers,
} from "../../../features/userSlice";
import { IDialog } from "../../../types/types";

const UpdatePage = ({ open, setOpen }: IDialog) => {
    const dispatch = useAppDispatch();
    const { userById, isSnackbarOpen, snackbarMessage, selectedId } =
        useAppSelector((state) => state.users);
    console.log(selectedId);
    const handleCloseSnackbar = () => {
        dispatch(closeSnackbar());
    };
    const {
        control,
        handleSubmit,
        reset,
        setValue,
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

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (userById) {
            setValue("name", String(userById.name));
            setValue("surname", String(userById.surname));
            setValue("email", String(userById.email));
            setValue("age", String(userById.age));
        }
    }, [userById, setValue]);

    const onsubmit = handleSubmit((data) => {
        dispatch(updateUsers({ id: userById.id, ...data }));
        handleClose();
        reset();
    });

    const handleDelete = () => {
        dispatch(deleteUsers(Number(selectedId)));
        setOpen(false);

    };
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: "form",
                }}>
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
                        defaultValue=''
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

                <DialogActions
                    sx={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <Button type='submit' onClick={onsubmit}>
                            Düzəliş et
                        </Button>
                        <Button onClick={handleClose}>Ləğv et</Button>
                    </div>
                    <div>
                        <Button
                            color='error'
                            variant='contained'
                            onClick={() => {
                                // e.stopPropagation();
                                handleDelete();
                            }}>
                            Sil
                        </Button>
                    </div>
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

export default UpdatePage;
