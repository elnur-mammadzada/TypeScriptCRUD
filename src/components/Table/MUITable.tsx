import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {
    fetchUsers,
    getUserById,
    setSelectedId,
} from "../../features/userSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import CircularProgress from "@mui/material/CircularProgress";
import UpdatePage from "../../pages/UserList/UpdatePage/UpdatePage";

const MUITable: React.FC = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const { users, loading, error } = useAppSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleRowDoubleClick = (user: any) => {
        setOpen(true);
        dispatch(getUserById(user?.id));
        dispatch(setSelectedId(user?.id));
    };

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Surname</TableCell>
                            <TableCell align='center'>Email</TableCell>
                            <TableCell align='center'>Age</TableCell>
                            <TableCell align='center'>ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell>
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : error ? (
                            <TableRow>
                                <TableCell>{error}</TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <TableRow
                                    onDoubleClick={() => handleRowDoubleClick(user)}
                                    key={user.id}>
                                    <TableCell component='th' scope='row'>
                                        {user.name}
                                    </TableCell>
                                    <TableCell>{user.surname}</TableCell>
                                    <TableCell align='center'>{user.email}</TableCell>
                                    <TableCell align='center'>{user.age}</TableCell>
                                    <TableCell align='center'>{user.id}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <UpdatePage open={open} setOpen={setOpen} />
        </div>
    );
};

export default MUITable;
