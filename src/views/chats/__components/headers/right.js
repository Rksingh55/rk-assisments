import React from 'react';
import './style.scss'
import MenuPopperCompo from '../../../../components/elements/tables/popper'
import { HiDotsVertical } from 'react-icons/hi'
import { FiMenu } from 'react-icons/fi'

export default function Right({
    setIsDrawer,
    isMatched,
    selectedChat
}) {
    return <div>
        <section className='chat-right-header'>
            <div>
                {isMatched && <span onClick={() => setIsDrawer(true)}><FiMenu /></span>}
                <img src={selectedChat?.avatar} />
                <p>{selectedChat?.title}</p>
            </div>
            <div>
                <MenuPopperCompo
                    icon={HiDotsVertical}
                    list={[
                        {
                            title: "Go to Profile", func: () => { window.alert('profile') }
                        },
                        {
                            title: "View", func: () => { }
                        },
                        {
                            title: "Block", func: () => { }
                        },
                        {
                            title: "Report", func: () => { window.alert('Report') }
                        }]}
                />
            </div>
        </section>
    </div>;
}
