import React from 'react'
import PixelatedCanvas from '../components/PixelatedCanvas';


const Canvas = () => {
  return (
    <div>
      <h1>Clickable Pixelated Canvas</h1>
      <PixelatedCanvas width={1000} height={1000} gridCount={100} />
    </div>  )
}

export default Canvas