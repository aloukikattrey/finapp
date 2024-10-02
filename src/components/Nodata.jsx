import React from 'react'
import image from '../images/nodata.png'
const Nodata = () => {
  return (
    <div className='divnodata'>
        <div ><img className="noimage" src={image}></img></div>
        <div ><p className="nodatamsg">No entries found, try adding some</p></div>
    </div>
  )
}

export default Nodata