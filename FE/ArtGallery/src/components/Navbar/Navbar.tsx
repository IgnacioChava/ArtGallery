import { Link, Outlet, useLocation } from "react-router-dom";
import { getSessionToken } from "../../service/cookies.service";
import { Menu, MenuProps, notification } from "antd";
import { FileAddOutlined, OrderedListOutlined, HomeOutlined, LoginOutlined } from '@ant-design/icons';
import { useState } from "react";
import useNotificationHandler from "../../hooks/useNotificationHandler";
import useSessionHandler from "../../hooks/useSessionHandler";
import './navbar.css'



const Navbar = () => {


    //TODO: HACER LLAMADA AL API PARA OBTENER EL TOKEN
    const isSessionActive= useSessionHandler();

    const getNotificationError = useNotificationHandler();


    const [current, setCurrent] = useState('');

    const [api, contextHolder] = notification.useNotification();

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };

    const items: MenuProps['items'] = [
        {
            label: (
                <Link to='/home'>
                    <HomeOutlined className="icon"/>
                </Link>
            ),
            key: 'logo',
        },
        {
            label: (
                <Link to='/paints' className="icon">Paints</Link>
            ),
            key: 'paints',
            icon: <OrderedListOutlined />
        },
        {
            label: (
                <Link to='/create' className="icon">Create paint</Link>
            ),
            key: 'create',
            icon: <FileAddOutlined />
        },

    ]

    const itemsPublic: MenuProps['items'] = [
        {
            label: (
                <Link to='/home'>
                    <HomeOutlined className="icon"/>
                </Link>
            ),
            key: 'logo',
        },
        {
            label: (
                <Link to='/login'> <LoginOutlined className="icon" /></Link>
            ),
            key: 'login'
        },
        {
            label: (
                <Link to='/paints'>
                    <div className="itemClass">
                        <OrderedListOutlined className="icon2" />
                        <div className="icon">See Paints</div>
                    </div>
                    
                </Link>
            ),
            key: 'paints',
            
        },

    ]

    return (
        <div>
                {isSessionActive() == true ? (


                    <div>
                        
                        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className="navbar"></Menu>
                        <Outlet></Outlet>
                    </div>
                    
                    
                ) : (
                    <div>
                        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={itemsPublic} className="navbar"></Menu>
                        <Outlet></Outlet>
                    </div>
                )}
     
        </div>
    );
}

export default Navbar;