import { Button, Input, Select, Typography, Modal, Form, Row, Divider, Col, Drawer} from 'antd';
import React, { useEffect , useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProfile, loadUser, logout, updatePassword } from '../../Actions/User';
import './Home.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllBlog } from '../../Actions/Blogs';
import UpdateProfile from '../UpdateProfile/UpdateProfile';
import {DeleteOutlined, MenuOutlined} from '@ant-design/icons';
import CreateBlogButton from '../Create Blog/CreateBlogButton';
import BoxCard from '../Card/BoxCard';
import Profile from '../Profile/Profile';
import NoNotes from '../No Notes/NoNotes';

const Home = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [open, setOpen] = useState(false);
 
    const {user} = useSelector(state => state.userReducer);
    const {error: passError, message : passMessage, loading : passLoading} = useSelector(state => state.updateReducer);
    const {blog} = useSelector(state => state.getAllBlogs);

    const handleSignout = () => {
        if(window.confirm("Are you sure to signout?")){
            dispatch(logout());
        }
    }

    const handleDeleteProfile = () => {
        if(window.confirm("Are you sure to delete your profile?")){
            dispatch(deleteProfile());
            dispatch(logout());
        }
    }
    const handlePasswordUpdate = (values) => {
        const {oldpass, newpass} = values;
        dispatch(updatePassword(oldpass, newpass));
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showModalUpadte = () => {
        setUpdateModal(true);
    };

    const handleCancelUpdate = () => {
        setUpdateModal(false);
    };

    const showDrawer = () => {
        setOpen(true);
    };
      
    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(loadUser());
        dispatch(getAllBlog());
    }, [dispatch])

    useEffect(() => {
        if(passError){
            toast.error(passError);
            dispatch({type : "clearError"})
        }

        if(passMessage){
            toast.success(passMessage);
            dispatch({type : "clearMessage"})
            setIsModalOpen(false);
            setUpdateModal(false);
        }
    }, [dispatch, passError, passMessage, toast])
  return user && (
    <div className='h-100 homePage'>
        <CreateBlogButton />   
        <div className="leftSide hidden">
            <div className="profileAvatar">
                <img src={user.avatar.url} alt=""  width={"100%"} height={"100%"}/>
            </div>
            <div className="spaceBetween" style={{marginTop : "5px"}}>
                <Typography.Text type='secondary'>Name: </Typography.Text>
                <Typography.Text  type='secondary'>{user.firstName} {user.lastName}</Typography.Text>
            </div>
            <div className="spaceBetween">
                <Typography.Text type='secondary'>Email: </Typography.Text>
                <Typography.Text  type='secondary'>{user.email}</Typography.Text>
            </div>

            <Link className='text-center' onClick={showModalUpadte}>Update Profile</Link>
            <Modal open={updateModal} 
            closable={false}
            onCancel={handleCancelUpdate} okButtonProps={{style : {
                display : "none"
            }}} cancelButtonProps={{style : {
                display : "none"
            }}}>
                <UpdateProfile/>
            </Modal>
            <Link className='text-center' onClick={showModal}>Update Password</Link>
            <div style={{padding : "2px 5%", width : "100%"}}>
            <Button onClick={handleDeleteProfile} danger block style={{marginTop : "10px"}}> <DeleteOutlined />Profile</Button>
            </div>
            <Modal onCancel={handleCancel} title="Update Password" open={isModalOpen} okButtonProps={{style : {
                display : "none"
            }}} cancelButtonProps={{style : {
                display : "none"
            }}}>
                <Form layout='vertical' onFinish={handlePasswordUpdate}>
                    <Form.Item label="Old Password: " name="oldpass" rules={[{
                        required : true,
                        message : "Kindly enter your old password"
                    }]}>
                        <Input.Password placeholder='enter your old password'></Input.Password>
                    </Form.Item>
                    <Form.Item label="New Password: " name="newpass" rules={[{
                        required : true,
                        message : "Kindly enter your new password"
                    }]}>
                        <Input.Password placeholder='enter your new password'></Input.Password>
                    </Form.Item>
                    <Button type='primary' disabled={passLoading} className='mt-10' block htmlType='submit'>UPDATE PASSWORD</Button>
                </Form>
            </Modal>
            <div className="logout">
            <Button type='primary' onClick={handleSignout} block>Signout</Button>
            </div>
        </div>
        <Drawer title="My Profile" placement="left" onClose={onClose} open={open}>
        <Profile/>
      </Drawer>
        <div className="rightSide">
            <div className="mobile">
                <Button onClick={showDrawer} icon={<MenuOutlined />}/>
            </div>
            {
                blog && blog.length === 0 ? <NoNotes/> : (
                    <>
                    <Input size='large' placeholder='Search your notes here...' allowClear></Input>
            <div className="sortBlock" style={{ textAlign : "right" }}>
                <Select 
                    style={{
                        width : '100px',
                        margin : '5px 0px'
                    }}
                    defaultValue={"Default"}
                    // onChange={}
                    options={[
                        {label : "Default", value:"Default"},
                        {label : "A-Z", value:"a-z"},
                        {label : "Z-A", value:"z-a"},
                    ]}
                ></Select>
            </div>
            <Divider>Notes</Divider>
            <Row gutter={[12, 5]} justify="space-evenly" align={"center"}>
              { blog && blog.length > 0 && blog.map((elem) => {
                return (
                    <Col>
                    <BoxCard 
                        key={elem._id}
                        id={elem._id}
                        title={elem.title}  
                        description={elem.description}
                        ></BoxCard>
                    </Col>
                )
              }) }
            </Row>
                    </>
                )
            }
        </div>
    </div>
  )
}

export default Home;