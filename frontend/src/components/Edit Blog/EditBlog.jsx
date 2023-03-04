import React, { useEffect } from 'react'
import { Button, Card, Col, Form, Input, Row, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlog, getBlog, updateBlog } from '../../Actions/Blogs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '../Loader/Loading';

const EditBlog = () => {
    const {id} = useParams();
    const navigator = useNavigate();

    const dispatch = useDispatch();
    const {blog} = useSelector(state => state.getSingleBlog);

    const handleUpdation = async (values) => {
        let {title, description} = values;
        title = title ? title : blog.title;
        description = description ? description : blog.description;

        await dispatch(updateBlog(id, title, description));
        dispatch(getAllBlog());
        navigator("/");
    }

    useEffect(() => {
        dispatch(getBlog(id))
    }, [dispatch])
  return !blog ? <Loading/> : (
    <Row className='h-100 gradient-blue' justify={"center"} align={"middle"}>
        <Col lg={{span : 8}} md={{span : 10}} sm={{span : 12}} xs={{span : 20}}>
            <Card style={{border : "2px solid #1890ff"}} >
                <Form layout='vertical' onFinish={handleUpdation}>
                    <Form.Item label="Title: " name="title">
                        <Input defaultValue={blog.title} placeholder='enter your title'></Input>
                    </Form.Item>

                    <Form.Item label="Description: " name="description" >
                       <Input.TextArea defaultValue={blog.description} style={{resize : "none", height : "200px"}}></Input.TextArea>
                    </Form.Item>

                    <Button block type='primary'  className='mt-10' htmlType='submit'>EDIT</Button>

                    <div className='mt-10' style={{textAlign : "right"}}>
                        <Typography.Text>
                            <Link to="/">Back</Link>
                        </Typography.Text>
                    </div>
                </Form>
            </Card>
        </Col>
    </Row>
  )
}

export default EditBlog;