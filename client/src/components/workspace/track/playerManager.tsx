import * as Tone from 'tone';
import { useEffect } from "react";
import { EventManager } from '../../ui/instruments/piano/sequencer/eventManager';

const eventManager = new EventManager();

let init = false;

export function PlayerManager()
{

    const update = (e: any, action: boolean) => {

        e.preventDefault();

        if (action) 
        {
            Tone.Transport.start();
            eventManager.sequenceArray.start(0);
            eventManager.mainLoop.start(0);
        } 
        else
        {
            Tone.Transport.stop();
            eventManager.sequenceArray.stop(0);
            eventManager.mainLoop.stop(0);
        }
    }   
    useEffect(()=>{

        if (init)
            return;

        init = true;

        const startSeq = document.getElementById('start-seq');
        startSeq?.addEventListener('click', e => update(e, true));
    
        const stopSeq = document.getElementById('stop-seq');
        stopSeq?.addEventListener('click', e => update(e, false));
    });

    return (
        <div className="sound-bank">
           <div id="player-options" className="options">
                <div className="bordered options" id="start-seq"><p>Start</p></div>
                <div className="bordered options" id="stop-seq"><p>Stop</p></div>
           </div>
        </div>
    );
}