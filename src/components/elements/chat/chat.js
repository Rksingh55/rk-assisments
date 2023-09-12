import React, { useState } from 'react'
import { IoChatbubblesOutline, IoLogoWhatsapp, IoLogoInstagram, IoLogoFacebook, IoCloseSharp, IoLogoPinterest, IoLogoLinkedin } from 'react-icons/io5'
import './style.scss'

export default function ChatsCompo() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div id="chat-compo">
            {isOpen && <div>
                <a><span><IoLogoWhatsapp /></span></a>
                <a><span><IoLogoInstagram /></span></a>
                <a><span><IoLogoLinkedin /></span></a>
                <a><span><IoLogoPinterest /></span></a>
                <a><span><IoLogoFacebook /></span></a>
            </div>}
            <aside>
                {!isOpen ?
                    <span onClick={() => { setIsOpen(true) }}><IoChatbubblesOutline /></span> :
                    <span
                        style={{transform:"translateY(2px)"}}
                        onClick={() => { setIsOpen(false) }}
                    ><IoCloseSharp /></span>}
            </aside>
        </div>
    )
}
