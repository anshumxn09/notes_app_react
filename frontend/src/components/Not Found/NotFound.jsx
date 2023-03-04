import Typography from 'antd/es/typography/Typography';
import React from 'react'
import {FidgetSpinner} from 'react-loader-spinner'
const NotFound = () => {
  return (
    <div className="profile h-100">
        <FidgetSpinner
            visible={true}
            height="200"
            width="200"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
            ballColors={["white", "white", "white"]}
            backgroundColor="#1890ff"
        />
        <Typography.Title>NOT FOUND</Typography.Title>
    </div>
  )
}

export default NotFound;