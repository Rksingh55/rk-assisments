
import React from 'react';
import "./style.scss"

const returnStyle = (isDrawer, side) => {
    if (side == "left") {
        return {
            left: 0,
            top: 0,
            bottom: 0,
            height: '100%',
            transform: !isDrawer ? "translateX(-100%)" : "translateX(0%)"
        }
    } else if (side == "right") {
        return {
            top: 0,
            bottom: 0,
            right: 0,
            height: '100%',
            transform: !isDrawer ? "translateX(100%)" : "translateX(0%)"
        }
    } else if (side == "top") {
        return {
            left: 0,
            right: 0,
            top: 0,
            width: '100%',
            transform: !isDrawer ? "translateY(-100%)" : "translateY(0%)"
        }
    } else {
        return {
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            transform: !isDrawer ? "translateY(100%)" : "translateY(0%)"
        }
    }
}
export default function DivDrawer({
    side,
    isDrawer,
    setIsDrawer,
    children,
    drawerContent
}) {

    return <section className="div-drawer">
        <div style={returnStyle(isDrawer, side)} className='div-drawer-content'>
            {drawerContent()}
        </div>
        {isDrawer && <div onClick={() => { setIsDrawer(false) }} className='div-drawer-bg' />}
        {children}
    </section>
}








