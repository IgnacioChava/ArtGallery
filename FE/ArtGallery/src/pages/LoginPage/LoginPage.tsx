import { Button, Card, Form, Input } from "antd";
import { useDependencies } from "./hooks";
import { LoginForm } from "./types";
import './styles.css'
import { UserOutlined, LockOutlined} from '@ant-design/icons';
const LoginPage = () => {

    const { handleSubmit } = useDependencies();


    return (
        <div className="container">


            <Card className="cardLogin">
                <Form
                    onFinish={handleSubmit} className="card">



                    <Form.Item
                        name="username"
                    >
                        <div className="itemLogin">
                            <UserOutlined className="iconLogin" />
                            <Input />
                        </div>
                    </Form.Item>


                    <Form.Item
                        name="password"
                    >
                        <div className="itemLogin">
                            <LockOutlined className="iconLogin" />
                            <Input.Password />
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" className="buttonLogin">Login</Button>
                    </Form.Item>
                </Form>

            </Card>
        </div>






    );

}

export default LoginPage