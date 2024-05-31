'use client'

import { useEffect, useRef, useState } from 'react';
import { createWorker } from 'tesseract.js';
import { Camera, CameraProps, CameraType } from 'react-camera-pro'

const App = () => {
  const camera = useRef<CameraType>(null) 
  const [image, setImage] = useState<string | null>(null)
  const [text, setText] = useState<string>("")

  async function handleClick(){
    if(camera.current){
      setImage(camera.current.takePhoto() as string)
      const worker = await createWorker('por')
      if(image){
        const { data } = await worker.recognize(image);
        setText(data.text)
      } else {
        setText('Please, take another picture')
      }

      console.log(image)
    }
  }

  return (
    <div>
      <Camera 
        ref={camera} 
        errorMessages={{}}
        aspectRatio={16/9}
        facingMode="environment"
        />
      <button 
        onClick={handleClick}> teste
      </button>
      <div>{text}</div>
      <img src={image || ""} alt="" />

    </div>
  );
};

export default App;
