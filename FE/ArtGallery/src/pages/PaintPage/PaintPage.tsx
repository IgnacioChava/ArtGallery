import { useEffect, useState } from "react";
import { useDependencies } from "./hooks"
import { Paint } from "../../models/art.models";
import { AutoComplete, Button, Card, Carousel, Form, Input, Space, Spin } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import './styles.css'
import Meta from "antd/es/card/Meta";

const { Option } = AutoComplete;


const PaintPage = () => {

    const { handlePetition, handlePetitionByName } = useDependencies();

    const [paints, setPaints] = useState<Paint[] | null>();
    const [loading, setLoading] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [letter, setLetter] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            if (name == "" && date == "" && letter == "") {
                try {
                    const response = await handlePetition();
                    setPaints(response);
                    setLoading(false);

                } catch (error) {
                    console.error('Failed to get posts list: ', error);
                    setLoading(false);
                }
            }
            if (name != "" && date == "" && letter == "") {
                try {
                    const response = await handlePetitionByName(name as string); // handleNamePetition
                    setPaints(response);
                    setLoading(false);

                } catch (error) {
                    console.error('Failed to get posts list: ', error);
                    setLoading(false);
                }
            }/*
            if (name == "" || date != "" || letter == "") {
                try {
                    const response = await handlePetition(); // handleDatePetition
                    setPaints(response);
                    setLoading(false);

                } catch (error) {
                    console.error('Failed to get posts list: ', error);
                    setLoading(false);
                }
            }
            if (name == "" || date == "" || letter != "") {
                try {
                    const response = await handlePetition(); // handleLetterPetition
                    setPaints(response);
                    setLoading(false);

                } catch (error) {
                    console.error('Failed to get posts list: ', error);
                    setLoading(false);
                }
            }*/

        };

        void fetchData();
    }, [name, date, letter]);

    const getByName = (value: any) => {
        setName(value.name);
    }

    return (
        <>
            {loading ? (
                <div className="spinClass">
                    <div className="loading">Loading&#8230;</div>
                </div>) : <>
                <Space.Compact style={{ width: '100%', display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "10px" }}>
                    <Form onFinish={getByName} style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "5px" }}>
                        <Form.Item
                            name="name"
                        >
                            <AutoComplete
                                style={{ width: 200 }}
                                placeholder="Paint name"
                            >
                                {paints?.map((paint, index) => (
                                    <Option value={paint.name} key={index}>{paint.name}</Option>
                                ))}

                            </AutoComplete>
                        </Form.Item>
                        <Button type="primary" htmlType="submit"><SearchOutlined /></Button>
                    </Form>
                </Space.Compact>

                <div className="paintsPage">
                    {paints?.map((paint, index) => (
                        <div key={index}>
                            <Card className="cardPaint" hoverable 
                            cover={
                                <Carousel autoplay>
                                        {paint.paints?.map((image, index) => (
                                            <img className="imagePaint" src={`data:image/png;base64,${image}`} alt={'ImagenPintura'} />
                                        ))}
                                </Carousel>
                            }>
                                        <h4> Author: <span>{paint.name} </span></h4>
                                        <h4> Date: <span>{paint.date} </span></h4>
                            </Card>
                        </div>
                    ))}
                </div>


            </>}


        </>
    )
}

export default PaintPage