import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ReactCountryFlag from "react-country-flag"
import { useTranslation } from 'react-i18next';
import { __LANGUAGES } from '../../../../Helper_function'

export default function BasicMenu() {
    const { t, i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeLanguage = (lgn) => {
        i18n.changeLanguage(lgn)
    }


    return (
        <div className='header-left-drop-menus'>

            <div onClick={handleClick}>
                <aside>
                    <ReactCountryFlag countryCode={__LANGUAGES.find(e => e.lang == i18n.language).flag} svg />
                </aside>
                <p>Language</p>
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

                {__LANGUAGES.map(countryCode =>
                    <MenuItem
                        onClick={() => {
                            changeLanguage(countryCode.lang)
                            handleClose();
                        }}>
                        <div style={{ display: "flex", gap: "7px", alignItems: "center" }}>
                            <ReactCountryFlag countryCode={countryCode.flag} svg />
                            <h6 style={{ fontWeight: "600" }}>{countryCode.name}</h6>
                        </div>
                    </MenuItem>)}

            </Menu>
        </div>
    );
}
