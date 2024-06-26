import { useState, useRef, useEffect } from "react";
import { createWorker } from 'tesseract.js';
import { Camera, CameraType } from 'react-camera-pro';
import useRetangleSize from "@/hooks/useRetangleSize";

interface CameraProps {
    setText: (text: string) => void;
}

export default function Scanner({ setText }: CameraProps) {
    const camera = useRef<CameraType>(null);
    const [image, setImage] = useState<string | null>(null);
    const [worker, setWorker] = useState<any>(null);
    const [log, setLog] = useState<string>("")

    const {left, top, width, height} = useRetangleSize()

    useEffect(() => {
        const loadTesseract = async () => {
            const tesseractWorker = await createWorker('eng');
            setWorker(tesseractWorker);
            console.log('worker created');
        };
        loadTesseract();
    }, []);

    useEffect(() => {
        const nameRetangle = { left, top, width, height }
        const interval = setInterval(async () => {
            if (worker && camera.current) {
                const photo = camera.current.takePhoto() as string;
                setImage(photo);
                if (photo) {
                    const { data } = await worker.recognize(photo, { nameRetangle});
                    setLog(`${data.confidence} - ${data.text}`)
                    if(data.confidence > 90){
                      setText(data.text);
                    }
                } else {
                    setText('');
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [worker, camera, setText, left, top, width, height]);

    const handleClick = async () => {
        if (camera.current) {
            const photo = camera.current.takePhoto() as string;
            setImage(photo);
            console.log(photo);
            if (photo) {
                await worker.load();
                await worker.loadLanguage('eng');
                await worker.initialize('eng');
                const { data } = await worker.recognize(photo);
                setText(data.text);
            } else {
                setText('Please, take another picture');
            }
        }
    };

    return (
        <div className="flex flex-col p-2 items-center">
            <div className="max-w-[400px] w-full h-[560px] relative ring-1">
                <Camera 
                    ref={camera} 
                    errorMessages={{}}
                    aspectRatio={5 / 7}
                    facingMode="environment"
                />

                <div className={`absolute opacity-35 ring-red-500 ring-1 bg-black top-[${top}px] left-[${left}px] w-[${width}px] h-[${height}px]`}></div>
            </div>
            {/* <button onClick={handleClick}>Capture</button> */}
            <div className="text-xs">
              {log} {width} x{height} | {left} x{top}
            </div>
        </div>
    );
}
