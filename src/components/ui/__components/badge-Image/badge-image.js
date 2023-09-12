import React from 'react'
import { Badge } from '@mui/material'
import { FaCrown } from 'react-icons/fa'
import DummyImagePNG from '../../../../assets/png/dummy-user.png'

export default function BadgeImage({
    user,
    onClick
}) {
    
    return <Badge badgeContent={<>
        {(user?.subscription && !(user.subscription.toDate() <= new Date())) &&
            <div style={{ backgroundColor: "red", borderRadius: "100em", padding: 4 }}>
                <FaCrown color='#fff' size={10} />
            </div>}
    </>}
        color="default">
        <img
            onClick={onClick || null}
            src={user?.basic?.image || DummyImagePNG}
            alt={user?.basic?.name}
        />
    </Badge>
}
