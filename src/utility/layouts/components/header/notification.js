import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom'
import { CgShortcut } from 'react-icons/cg'
import { MdOutlineShortcut } from 'react-icons/md'
import { IoIosNotificationsOutline } from 'react-icons/io'

import { __SHORTCUTS } from '../../../../Helper_function'

const __NOTIFICATIONS = ["Last day users 14", "total view on videos is 51"]

export default function RecentsCompo() {

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <div className='header-left-drop-menus-1'>

            <div onClick={handleClick}>
                <aside style={{ transform: "translateY(3px)" }}>
                    <IoIosNotificationsOutline />
                </aside>
                <p>Recent's</p>
            </div>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >

                {__NOTIFICATIONS.map(notification =>
                    <MenuItem
                        onClick={() => {
                            handleClose();
                        }}>
                        <p>{notification}</p>
                    </MenuItem>)}

            </Menu>
        </div>
    );
}
