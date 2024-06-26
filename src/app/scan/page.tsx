'use client'

import Scanner from '@/components/Scanner';
import { useState } from 'react';

export default function Scan(){
  const [text, setText] = useState<string>("")
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false)

  function handleCamera(){
    setIsCameraOn(!isCameraOn)
  }


  return (
    <div>
      {isCameraOn && (<Scanner setText={setText} />)}
      <button onClick={handleCamera}>Scan</button>
      {/* <button 
        onClick={handleClick}> Take Picture
      </button>  */}
      <div className="font-black">{text}</div>
      {/* <img src={image || ""} alt="" /> */}

    </div>
  );
};
