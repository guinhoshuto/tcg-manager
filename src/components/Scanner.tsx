import { useState, useRef, useEffect } from "react";
import { createWorker } from 'tesseract.js';
import { Camera, CameraType } from 'react-camera-pro';

interface CameraProps {
    setText: (text: string) => void;
}

export default function Scanner({ setText }: CameraProps) {
    const camera = useRef<CameraType>(null);
    const [image, setImage] = useState<string | null>(null);
    const [worker, setWorker] = useState<any>(null);
    const [log, setLog] = useState<string>("")

    useEffect(() => {
        const loadTesseract = async () => {
            const tesseractWorker = await createWorker('eng');
            setWorker(tesseractWorker);
            console.log('worker created');
        };
        loadTesseract();
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (worker && camera.current) {
                const photo = camera.current.takePhoto() as string;
                setImage(photo);
                if (photo) {
                    const { data } = await worker.recognize(photo);
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
    }, [worker, camera]);

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
        <div>
            <Camera 
                ref={camera} 
                errorMessages={{}}
                aspectRatio={16 / 9}
                facingMode="environment"
            />
            {/* <button onClick={handleClick}>Capture</button> */}
            <div className="text-xs">
              {log}
            </div>
        </div>
    );
}