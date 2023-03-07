import { Button, Card, Dropdown } from 'antd';
import Typography from 'antd/es/typography/Typography';
import React from 'react'
import {DeleteOutlined, EditOutlined, MoreOutlined} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteBlog, getAllBlog } from '../../Actions/Blogs';

const BoxCard = ({title="Anshuman", description="God's Grace", id}) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const handleDeletion = async () => {
    await dispatch(deleteBlog(id));
    dispatch(getAllBlog());
    navigator("/");
  }

  const items = [
    {
      key: '1',
      label: (
        <Link to={`/edit/${id}`} ><EditOutlined /> Edit</Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link onClick={handleDeletion}><DeleteOutlined /> Delete</Link>
      ),
    },
  ];
  return (
        <Card hoverable style={{width : "290px", height : "350px", border : "1px solid #1890ff"}}>
      <div className="actions">
      <Dropdown menu={{items, }} placement="bottom">
       <Button style={{border : "none"}}><MoreOutlined /></Button>
      </Dropdown>
      </div>
      <Typography.Title level={3} style={{fontFamily : "Poppins", color : "#1890ff"}}>{title.length > 14 ? title.substring(0, 14)+"..." : title}</Typography.Title>
      <Typography.Paragraph style={{textAlign : "justify"}}> {
        description.length > 350 ? description + "..." : description
      } </Typography.Paragraph>
    </Card>
  )
}

export default BoxCard;