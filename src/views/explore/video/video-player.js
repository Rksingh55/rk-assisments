import React from 'react';
import { Player, BigPlayButton } from 'video-react';
import 'video-react/dist/video-react.css';


export default ({ videoSrc, imageURL }) => {

    return (
        <div className='video-js'>
            <Player
                poster={imageURL}
                src={videoSrc}
                playsInline
                fluid={false}
                width="100%"
                height="100%"
                onEnded={() => console.log("video End")}

            >
                <BigPlayButton position="center" />
            </Player>
        </div>
    );
};
