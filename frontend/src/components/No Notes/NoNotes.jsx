import { Button, Typography } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';

const NoNotes = () => {
  return (
    <div className="noNotes" style={{alignItems : "st"}}>
        <Typography.Title className='text-center' level={3} style={{textTransform : "uppercase", color : "#1890ff", fontFamily : "Poppins", letterSpacing : "2px"}}>No Notes Available</Typography.Title>
        <img src="https://static.vecteezy.com/system/resources/previews/009/759/700/original/eps10-blue-remote-work-or-work-from-home-line-icon-isolated-on-white-background-freelancer-working-at-the-desk-outline-symbol-in-a-flat-style-for-your-website-design-logo-and-mobile-app-vector.jpg" alt="!!!" 
            width={290} height={290}
            style={{borderRadius : "10px", border : "2px solid #1890ff", marginBottom : "15px"}}
        />
        <Button type='primary'>
            <Link to={"/create/note"}>CREATE YOUR FIRST NOTE</Link>
        </Button>
    </div>
  )
}

export default NoNotes;