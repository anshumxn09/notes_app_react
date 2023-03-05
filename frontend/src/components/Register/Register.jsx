import { Avatar, Button, Card, Col, Form, Input, Row, Typography } from 'antd';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../../Actions/User';

const Register = () => {
    const [image, setImage] = useState("");
    const dispatch = useDispatch();
    const {error} = useSelector(state => state.userReducer);

    const handleAvatar = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            if(reader.readyState === 2){
                setImage(reader.result);
            }
        }

        reader.readAsDataURL(file);
    }
    const handleRegister = (values) => {
        console.log(values);
        const {firstName, lastName, email, password } = values;
        dispatch(register(firstName, lastName, email, password , image))
    }

    useEffect(() => {
        if(error){
            toast.error(error)
            dispatch({type : "clearError"});
        }
    }, [error, dispatch, toast])

  return (
    <Row className='h-100 gradient-blue' justify="center" align="middle">
        <Col lg={{span : 8}} md={{span : 10}} sm={{span : 12}} xs={{span : 20}}>
            <Card style={{border : "2px solid #1890ff"}}>
            <Form layout='vertical' onFinish={handleRegister}>

                <div className="flexCenter">
                <Avatar src={image ? image : "https://res.cloudinary.com/anshumxn09/image/upload/v1677756698/Post/vciuulx48ce4zfkcvvqm.jpg"} style={{width : "80px", height : "80px"}}/>
                </div>

                <Form.Item label="First Name: " name="firstName" rules={[{
                    required : true,
                    message : "Kindly enter your first name"
                }]}>
                <Input placeholder='enter your first name'></Input>
                </Form.Item>

                <Form.Item label="Last Name: " name="lastName" rules={[{
                    required : true,
                    message : "Kindly enter your last name"
                }]}>
                <Input placeholder='enter your last name'></Input>
                </Form.Item>

                <Form.Item label="Email: " name="email" rules={[{
                    required : true,
                    message : "Kindly enter your email"
                }]}>
                <Input placeholder='enter your email'></Input>
                </Form.Item>

                <Form.Item label="Password: " name="password" rules={[{
                    required : true,
                    message : "Kindly enter your password"
                }]}>
                <Input.Password placeholder='enter your password'></Input.Password>
                </Form.Item>

                <div className="flexCenter">
                    <input type="file" accept="image/*" onChange={handleAvatar}></input>
                </div>

                <Button htmlType='submit' type='primary' block>REGISTER</Button>

                <Typography.Paragraph style={{marginTop : "15px"}} className='text-center'>
                        <Typography.Text>Already have an account? </Typography.Text>
                        <Link to="/login">Login</Link>
                    </Typography.Paragraph>
            </Form>
            </Card>
        </Col>
    </Row>
  )
}

export default Register;