import React from 'react'
import {InfinitySpin} from 'react-loader-spinner'
const Loading = () => {
  return (
    <div className="profile h-100">
        <InfinitySpin 
            width='200'
            color="#1890ff"
        />
    </div>
  )
}

export default Loading;