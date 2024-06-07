import { useState, useEffect } from "react";

interface RectSize {
    width: number
    height: number
    top: number
    left: number
}

function getWindowDimensions(){
    const { innerWidth: width, innerHeight: height } = window
    return {
        width, 
        height
    }
}

function getRetangleSizes(): RectSize{
    const {width, height} = getWindowDimensions()
    if(width < 400) return {width, height, top: 0, left: 0}

    return {
        width: 44, 
        height: 17, 
        top: 326, 
        left: 524
    }
}

export default function useRetangleSize(){
    const [retangleSize, setRetangleSize] = useState<RectSize>(getRetangleSizes());

    useEffect(() => {
        function handleResize(){
            setRetangleSize(getRetangleSizes())
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return retangleSize;
}