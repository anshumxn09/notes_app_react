import { Button, Card, Col, Form, Input, Row, Typography } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBlog, getAllBlog } from '../../Actions/Blogs';

const CreateBlog = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const {error : blogError, message : blogMessage, loading} = useSelector(state => state.createBlog);

    const handleCreate = async (values) => {
        const {title , description} = values;
        await dispatch(createBlog(title, description));
        dispatch(getAllBlog());
        navigator("/");
    }

    useEffect(() => {
        if(blogError){
            toast.error(blogError);
            dispatch({type : 'clearError'})
        }

        if(blogMessage){
            toast.success(blogMessage);
            dispatch({type : 'clearMessage'})
        }
    }, [dispatch, blogError, blogMessage, toast])
  return (
    <Row className='h-100 gradient-blue' justify={"center"} align={"middle"}>
        <Col lg={{span : 8}} md={{span : 10}} sm={{span : 12}} xs={{span : 20}}>
            <Card style={{border : "2px solid #1890ff"}} >
                <Form layout='vertical' onFinish={handleCreate}>
                    <Form.Item label="Title: " name="title" rules={[{
                        required : true,
                        message : "Kindly set your title"
                    }]}>
                        <Input placeholder='enter your title'></Input>
                    </Form.Item>

                    <Form.Item label="Description: " name="description" rules={[{
                        required : true,
                        message : "Kindly enter your description"
                    }]}>
                       <Input.TextArea style={{resize : "none", height : "200px"}}></Input.TextArea>
                    </Form.Item>

                    <Button block type='primary' disabled={loading} className='mt-10' htmlType='submit'>CREATE</Button>

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

export default CreateBlog;