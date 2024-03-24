import { useEffect, useState } from "react";
import { useDependencies } from "./hooks"
import { Paint } from "../../models/art.models";
import { Button, Form, Input, Space, Spin } from "antd";
import { isNill } from "../../utils/comon.utils";


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
                <>
                    <Spin></Spin>
                </>) : <>
                <Space.Compact style={{ width: '100%', display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    <Form onFinish={getByName} style={{display: "flex",flexDirection: "row", justifyContent: "center" }}>
                        <Form.Item
                            label="Name"
                            name="name"
                        >
                            <Input type="text"/>
                        </Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form>
                </Space.Compact>
                {paints?.map((paint, index) => (
                    <div key={index}>
                        <h2>{paint.name}</h2>
                        <img style={{ width: "300px", margin: "0 auto" }} src={`data:image/png;base64,${paint.paints[0]}`} alt={'Imagen'} />
                    </div>
                ))}
            </>}


        </>
    )
}

export default PaintPage