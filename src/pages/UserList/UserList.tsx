import MUITable from "../../components/Table/MUITable";
import "../UserList/UserList.css";
import MUIDialog from "../../components/Dialog/MUIDialog";

const UserList: React.FC = () => {
    return (
        <div className='user-list'>
            <div className='user-list-button'>
                <MUIDialog />
            </div>
            <div className='user-list-table'>
                <MUITable />
            </div>
        </div>
    );
};

export default UserList;
