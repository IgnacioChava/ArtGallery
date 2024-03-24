import { Button, Form, Input, Modal, UploadFile } from "antd"
import { useState } from "react";
import { useDependencies } from "./hooks";
import Upload, { RcFile, UploadProps } from "antd/es/upload";
import { PlusOutlined } from '@ant-design/icons';

const CreatePaintPage = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>();

    const { handleSubmit} = useDependencies();

    const getBase64 = (file: RcFile): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);

        });

    const CancelView = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };


    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        console.log(newFileList);
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
      );

    const getFile = (e: any) => {

        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    return (
        <div className="page">
        
            <Form
                onFinish={handleSubmit} className="card">
                <Form.Item
                    name="name" label="Name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="author" label="Author"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="date" label="Date"
                >
                    <Input />
                </Form.Item>
                <Form.Item name="images" valuePropName="fileList" getValueFromEvent={(e) => e.fileList} className="containerUpload">
                    <Upload
                        multiple
                        onChange={handleChange}
                        onPreview={handlePreview}
                        fileList={fileList}
                        beforeUpload={() => false}
                        listType="picture-card">
                    {uploadButton}
                    </Upload>
                </Form.Item>
            <div className="containerButton">
            <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Publicar
                        </Button>
                </Form.Item>
                <Form.Item >
                        <Button type="primary" htmlType="submit" danger>
                            Cancelar
                        </Button>
                </Form.Item>
            </div>
                
            </Form>
           
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={CancelView}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
           
        </div>
    );

}

export default CreatePaintPage