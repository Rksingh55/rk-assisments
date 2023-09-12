import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom'
import { MdOutlineShortcut } from 'react-icons/md'
import { useTranslation } from 'react-i18next';
import { __SHORTCUTS } from '../../../../Helper_function'

export default function Shortcuts() {

    const { t } = useTranslation();
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
        <div className='header-left-drop-menus'>

            <div onClick={handleClick}>
                <aside style={{ transform: "translateY(3px)" }}>
                    <MdOutlineShortcut />
                </aside>
                <p>{t("header.shortcut")}</p>
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

                {__SHORTCUTS.map(shortcut =>
                    <MenuItem
                        onClick={() => {
                            handleClose();
                            navigate(shortcut.route);
                        }}>
                        <div style={{ display: "flex", gap: "7px", alignItems: "center" }}>
                            {shortcut.icon}
                            <h6 style={{ fontWeight: "600" }}>{t(`header.shortcut-items.${shortcut.title}`)}</h6>
                        </div>
                    </MenuItem>)}

            </Menu>
        </div>
    );
}
