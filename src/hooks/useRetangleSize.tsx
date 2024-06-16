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
    // if(width < 400) return {width, height, top: 0, left: 0}

    return {
        width: width*31/40, 
        height: height*19/280, 
        top:height*241/280, 
        left: width/8
    }
}

export default function useRetangleSize(): RectSize{
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