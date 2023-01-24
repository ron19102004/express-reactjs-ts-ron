import { Button, Checkbox, Form, Input } from 'antd';
import '../styles/login.scss';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
interface OwnsProps {
    setUser: (
        id: number,
        name: string,
        email: string,
        password: string,
        role: string,
        avatar: string,
        accessToken: string) => void;
}
type Props = OwnsProps;
const Login: React.FC<Props> = (props): any => {
    let [account, setAccount] = useState({});
    let navigate = useNavigate();
    let onFinish = (values: any) => {
        setAccount(values);
        verifyAccount(account);
    };
    let verifyAccount = async (values: any): Promise<void> => {
        let qs = require('qs');
        let data = qs.stringify({
            'email': values.email,
            'password': values.password
        });
        let config = {
            method: 'post',
            url: `https://api-ex-reactjs-ts-ron.onrender.com/auth/login`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': "application/json",
                'Access-Control-Allow-Origin':'https://ronshomerelax.vercel.app/'

            },
            data: data
        };
        let user: any = null;
        await axios(config)
            .then((data) => {
                user = data && data.data && data.data.user;
                console.log(data);
            })
            .catch(function (error: Error) {
                console.log(error);
            });
        if (user) {
            props.setUser(user.id, user.name, user.email, user.password, user.role, user.avatar, user.accessToken);
            navigate('/');
        }
    }
    let onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    let form = () => (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
    return (
        <>
            <h1>hi login</h1>
            <div className='form'>{form()}</div>
        </>
    )
};

export default Login;