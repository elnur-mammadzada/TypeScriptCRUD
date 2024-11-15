import { FC } from "react";
import { CustomButtonProps } from "../../types/types";
import { Button } from "@mui/material";

const MUIButton: FC<CustomButtonProps> = ({ ...props }) => {
    return (
        <div>
            <Button {...props}>{"Yarat"}</Button>
        </div>
    );
};

export default MUIButton;


