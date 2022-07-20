import React, {useState, useRef, useEffect} from "react";
import styles from '../styles/AudioPlayer.module.css'
import {TbPlayerTrackNext} from "react-icons/tb";
import {TbPlayerTrackPrev} from "react-icons/tb";
import {FaPlay} from "react-icons/fa";
import {FaPause} from "react-icons/fa";



const AudioPlayer = () => {

    const [isPlay, setIsPlay] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const audioPlayer = useRef();
    const progressBar = useRef();
    const animationRef = useRef();

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;
    }, []);

    const time = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    const togglePlay = () => {
        const prevValue = isPlay;
        setIsPlay(!prevValue);
        if (!prevValue) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current)
        }
    }

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    }


    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    }
    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value);
    }

    const backTen = () => {
        progressBar.current.value = Number(progressBar.current.value - 10);
        changeRange();
    }

    const forwardThirty = () => {
        progressBar.current.value = Number(progressBar.current.value) + 30;
        console.log(progressBar.current.value)
        changeRange();
    }


    return (
       <>
           <div className={styles.cover}>
           <img src="flying.jpg" width='420px'  height='420px' alt=""/>
               <p>Flying </p>
               <span>Anathema</span>

           </div>

    <div className={styles.AudioPlayer}>

        <audio ref={audioPlayer} src="./09%20-%20Flying.mp3" preload='metadata' />
        {/*back btn*/}

        <div className={styles.btnBox}>

            <button className={styles.forwardBackward} onClick={backTen}><TbPlayerTrackPrev /></button>

            {/*play pause btn*/}
            <button onClick={togglePlay} className={styles.playing}>
                {isPlay ? <FaPause /> : <FaPlay />  }
            </button>

            {/*forward btn */}
            <button className={styles.forwardBackward} onClick={forwardThirty}> <TbPlayerTrackNext /></button>

        </div>

            {/*current time*/}
            <div className={styles.currentTime}>{time(currentTime)}</div>

            {/*progress bar*/}
            <div>
                <input type="range" className={styles.progressBar} defaultValue='0' ref={progressBar} onChange={changeRange}/>
            </div>

            {/*time duration*/}
            <div className={styles.duration}>{(duration && !isNaN(duration)) && time(duration)}</div>



    </div>
       </>
)
}
export default AudioPlayer;