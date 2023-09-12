import React, { useEffect } from 'react';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar'; 
import { FaTachometerAlt, FaGem } from 'react-icons/fa';
import { ImBlog } from 'react-icons/im'
import { MdVideoLibrary } from 'react-icons/md'
import { VscPerson } from 'react-icons/vsc'
import 'react-pro-sidebar/dist/css/styles.css';
import { IoMdHelpCircle } from 'react-icons/io'
import { GiDiscussion, GiWorld } from 'react-icons/gi'
import { MdOutlineMiscellaneousServices, MdRadioButtonChecked } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { appMenuCollapsed, appMenuToggled } from '../../../../redux/slices/App-State';
import { useTranslation } from 'react-i18next';

const Aside = ({ }) => {

    const { t } = useTranslation();
    const appState = useSelector(e => e.appState);
    const userState = useSelector(e => e.auth.id); 
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    return (
        <div
            style={{
                height: '100%'
            }}
        >
            <ProSidebar
                image="https://raw.githubusercontent.com/azouaoui-med/react-pro-sidebar/master/demo/src/assets/bg2.jpg"
                collapsed={appState.isMenuCollapsed}
                toggled={appState.isMenuToggled}
                breakPoint="md"
                onToggle={() => { dispatch(appMenuToggled(false)) }}
            >
                <SidebarHeader>
                    <div

                        style={{
                            whiteSpace: 'nowrap',
                            display: "flex",
                            alignItems: 'center',
                            justifyContent: "space-between",
                            padding: "30px 25px",
                            overflow: "hidden",
                            letterSpacing: "2px"
                        }}
                    >
                        {appState.isMenuCollapsed ?
                            <>
                                <p onClick={() => {
                                    dispatch(appMenuCollapsed(!appState.isMenuCollapsed));
                                }}>AM</p>
                            </> :
                            <>
                                <p>Assist mates</p>
                                <div className='menu-collapse-switch'>
                                    <div>
                                        {appState.isMenuCollapsed ?
                                            <span className='active'>T</span> : <span onClick={() => {
                                                dispatch(appMenuCollapsed(!appState.isMenuCollapsed));
                                            }}><MdRadioButtonChecked /></span>}
                                    </div>
                                </div>
                            </>}
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">

                        <MenuItem
                            icon={<FaGem />}
                            onClick={() => { navigate("/") }}
                        >
                            {t("menu.explore")}
                        </MenuItem>

                        <SubMenu
                            icon={<FaTachometerAlt />}
                            // suffix={<span className="badge red">new</span>}
                            title={t("menu.dashboard")}
                        >
                            <MenuItem
                                icon={<ImBlog />}
                                onClick={() => userState ? navigate("/blog-analytics") : navigate("/authorization")}
                            >
                                {t("menu.blogs")}
                            </MenuItem>
                            <MenuItem
                                icon={<MdVideoLibrary />}
                                onClick={() => userState ? navigate("/record-analytics") : navigate("/authorization")}
                            >
                                {t("menu.records")}
                            </MenuItem>
                        </SubMenu>

                        <MenuItem
                            icon={<GiDiscussion />}
                            onClick={() => { navigate("/what") }}

                        >
                            {t("menu.discussion")}
                        </MenuItem>

                        {/* <MenuItem
                            icon={<AiFillWechat />}
                            onClick={() => { navigate("/chats") }}

                        >
                            {t("menu.chats")}
                        </MenuItem>

                        <MenuItem
                            icon={<GiShoppingBag />}
                            suffix={<span style={{ backgroundColor: "#fff", color: "#000", fontWeight: "400" }} className="badge">new</span>}
                            onClick={() => { navigate("/shop") }}

                        >
                            {t("menu.shop")}
                        </MenuItem> */}

                        <MenuItem
                            icon={<MdOutlineMiscellaneousServices />}
                            suffix={<span style={{ backgroundColor: "#fff", color: "#000", fontWeight: "400" }} className="badge">new</span>}
                            onClick={() => { navigate("/my-services") }}

                        >
                            {t("menu.my-services")}
                        </MenuItem>

                        <MenuItem
                            icon={<VscPerson />}
                            onClick={() => { userState ? navigate("/prefrences") : navigate("/authorization") }}
                        >
                            {t("menu.profile")}
                        </MenuItem>

                        <MenuItem
                            icon={<IoMdHelpCircle />}
                            onClick={() => { navigate("/faq") }}
                        >
                            {t("menu.faq")}
                        </MenuItem>

                    </Menu>

                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="#"
                            //  target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <GiWorld />

                        </a>
                    </div>
                    {!appState.isMenuCollapsed && <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '0px 20px 20px',
                        }}
                    >
                        <aside>
                            <p onClick={() => { navigate("/about-us") }}>{t("menu.about-us")}</p>
                            <p onClick={() => { navigate("/sitemap") }}>{t("menu.sitemap")}</p>
                            <p onClick={() => { navigate("/cookie-policy") }}>{t("menu.cookie-policy")}</p>
                            <p onClick={() => { navigate("/privacy-policy") }}>{t("menu.privacy-policy")}</p>
                            <p onClick={() => { navigate("/terms-and-conditions") }}>{t("menu.terms-and-conditions")}</p>
                        </aside>
                    </div>}

                </SidebarFooter>
            </ProSidebar>
        </div>
    );
};

export default Aside;