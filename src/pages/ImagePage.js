import React from 'react'
import UploadPage from '../components/Image/UploadPage'
import { VimeoPlayer } from 'reactjs-vimeo-player'

function ImagePage() {
  return (
    <div className='flex flex-col'>
      <UploadPage/>
      <VimeoPlayer id="https://player.vimeo.com/video/685611394?h=c0bdd1329f&badge=0&autopause=0&player_id=0&app_id=58479" />

    </div>
  )
}

export default ImagePage