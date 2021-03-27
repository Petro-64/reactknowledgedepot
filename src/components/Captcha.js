import React, { useRef, useEffect } from 'react'


const Captcha = props => {
    const canvasRef = useRef(null);

    const draw = ctx => {
        ctx.fillStyle = '#0f0'
        ctx.beginPath()
        ctx.arc(50, 100, 20, 0, 2*Math.PI)
        ctx.fill()
      }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        //Our first draw
        context.fillStyle = '#fff'
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)
        context.fillStyle = '#06f'
        context.font = "20px Arial";
        context.fillText(props.text, 10, 30);

        context.fillStyle = '#f00'
        context.font = "10px Arial";
        context.fillText('Click to reload', 100, 35);
      }, [draw])

    return <canvas ref={canvasRef} {...props} width="170px" height="40px" />
}


export default Captcha;