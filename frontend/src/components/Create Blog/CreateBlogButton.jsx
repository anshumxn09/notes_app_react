import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import {PlusOutlined} from '@ant-design/icons';

const CreateBlogButton = () => {
  return (
    <Link to="/create/note" style={{zIndex : 10}}>
        <div className='plus'>
        <Button title='create a note' type='primary' className='plusButton'>
        <PlusOutlined size="large" />
        </Button>
    </div>
    </Link>
  )
}

export default CreateBlogButton