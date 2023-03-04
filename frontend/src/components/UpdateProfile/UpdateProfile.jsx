import { Avatar, Button, Card, Col, Form, Input, Row } from 'antd';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {loadUser, updateProfile } from '../../Actions/User';

const UpdateProfile = () => {
    const [image, setImage] = useState("");
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.userReducer);
    const { loading: updateLoading} = useSelector(state => state.updateReducer);

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
        const {firstName, lastName} = values;
        console.log(firstName, lastName)
        dispatch(updateProfile(firstName ? firstName : user.firstName, lastName ?  lastName : user.lastName, image))
        dispatch(loadUser());
    }

  return user && (
    <Row justify={"center"}>
        <Col span={22}>
            <Card  style={{border : "2px solid #1890ff"}} >
            <Form layout='vertical' onFinish={handleRegister}>
                <div className="flexCenter">
                <Avatar src={image ? image : user.avatar.url} style={{width : "80px", height : "80px"}}/>
                </div>

                <Form.Item label="First Name: " name="firstName">
                <Input defaultValue={user.firstName} placeholder='enter your first name'></Input>
                </Form.Item>

                <Form.Item label="Last Name: " name="lastName">
                <Input defaultValue={user.lastName} placeholder='enter your last name'></Input>
                </Form.Item>

                <Form.Item label="Email: " name="email">
                <Input disabled defaultValue={user.email} placeholder='enter your email'></Input>
                </Form.Item>

                <div className="flexCenter">
                    <input type="file" accept="image/*" onChange={handleAvatar}></input>
                </div>

                <Button disabled={updateLoading} htmlType='submit' type='primary' block>Update Profile</Button>
            </Form>
            </Card>
        </Col>
    </Row>
  )
}

export default UpdateProfile;