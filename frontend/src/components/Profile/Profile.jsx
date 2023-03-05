import React, {useState} from "react";
import { Button, Input, Typography, Modal, Form} from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProfile, logout, updatePassword } from "../../Actions/User";
import UpdateProfile from '../UpdateProfile/UpdateProfile';
import {DeleteOutlined} from '@ant-design/icons';

const Profile = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const {user} = useSelector(state => state.userReducer);
    const {loading : passLoading} = useSelector(state => state.updateReducer);
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

  return (
    <>
      <div className="profile">
      <div className="proResponsive" style={{width : "200px", height : "200px"}}>
        <img style={{objectFit : "contain", border : "1px solid #1890ff", borderRadius : "50%"}} src={user.avatar.url} alt="" width={"100%"} height={"100%"} />
      </div>
      <div className="spaceBetween" style={{ marginTop: "5px" }}>
        <Typography.Text type="secondary">Name: </Typography.Text>
        <Typography.Text type="secondary">
          {user.firstName} {user.lastName}
        </Typography.Text>
      </div>
      <div className="spaceBetween">
        <Typography.Text type="secondary">Email: </Typography.Text>
        <Typography.Text type="secondary">{user.email}</Typography.Text>
      </div>

      <Link className="text-center mt-10" onClick={showModalUpadte}>
        Update Profile
      </Link>
      <Modal
        open={updateModal}
        closable={false}
        onCancel={handleCancelUpdate}
        okButtonProps={{
          style: {
            display: "none",
          },
        }}
        cancelButtonProps={{
          style: {
            display: "none",
          },
        }}
      >
        <UpdateProfile />
      </Modal>
      <Link className="text-center mt-10" onClick={showModal}>
        Update Password
      </Link>
      <div style={{ padding: "2px 5%", width: "100%" }}>
        <Button
          onClick={handleDeleteProfile}
          danger
          block
          style={{ marginTop: "10px" }}
        >
          {" "}
          <DeleteOutlined />
          Profile
        </Button>
      </div>
      <Modal
        onCancel={handleCancel}
        title="Update Password"
        open={isModalOpen}
        okButtonProps={{
          style: {
            display: "none",
          },
        }}
        cancelButtonProps={{
          style: {
            display: "none",
          },
        }}
      >
        <Form layout="vertical" onFinish={handlePasswordUpdate}>
          <Form.Item
            label="Old Password: "
            name="oldpass"
            rules={[
              {
                required: true,
                message: "Kindly enter your old password",
              },
            ]}
          >
            <Input.Password placeholder="enter your old password"></Input.Password>
          </Form.Item>
          <Form.Item
            label="New Password: "
            name="newpass"
            rules={[
              {
                required: true,
                message: "Kindly enter your new password",
              },
            ]}
          >
            <Input.Password placeholder="enter your new password"></Input.Password>
          </Form.Item>
          <Button
            type="primary"
            disabled={passLoading}
            className="mt-10"
            block
            htmlType="submit"
          >
            UPDATE PASSWORD
          </Button>
        </Form>
      </Modal>
      <div className="logout">
        <Button type="primary" onClick={handleSignout} block>
          Signout
        </Button>
      </div>
      </div>
    </>
  );
};

export default Profile;
