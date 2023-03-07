import React, { useEffect } from 'react'
import {Row, Col, Card, Form, Input, Typography, Button} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from '../../Actions/User';
import { Link } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const {error, loading} = useSelector(state => state.userReducer);

    const loginHandler = (values) => {
        const {email, password} = values;
        dispatch(login(email, password));
    }

    useEffect(() => {
        if(error){
            toast.error(error)
            dispatch({type : "clearError"});
        }
    }, [error])
  return (
    <Row className='h-100' justify={"center"} align={"middle"}>
        <div className="footer" style={{
            position : "absolute",
            bottom : "5px",
            textTransform : "uppercase",
            letterSpacing : "2px"
        }}>
            <Typography.Text type='secondary' className='text-center'>&copy; Anshuman Sharma 2023</Typography.Text>
        </div>
        <Col lg={{span : 8}} md={{span : 10}} sm={{span : 12}} xs={{span : 20}}>
            <Card style={{border : "2px solid #1890ff"}}>
                <Form layout='vertical' onFinish={loginHandler}>
                    <div className='text-center'>
                    <img src="https://res.cloudinary.com/anshumxn09/image/upload/v1678011919/Post/logoNotes_i9a8rm.png" alt="LOGO" width={80} height={80}/>
                    </div>
                    <Form.Item label="Email" name="email" rules={[
                        {required : true,
                        message : "Kindly enter your email"}
                    ]}>
                        <Input placeholder='enter your email'></Input>
                    </Form.Item>

                    <Form.Item label="Password" name="password" rules={[
                        {required : true,
                        message : "Kindly enter your password"}
                    ]}>
                        <Input.Password placeholder='enter your password'></Input.Password>
                    </Form.Item>

                    <Button style={{marginTop : "10px"}} block htmlType='submit' disabled={loading} type='primary'>LOGIN</Button>

                    <Typography.Paragraph style={{marginTop : "15px"}} className='text-center'>
                        <Typography.Text>Don't have an account? </Typography.Text>
                        <Link to="/register">Register</Link>
                    </Typography.Paragraph>
                </Form>
            </Card>
        </Col>
    </Row>
  )
}

export default Login;