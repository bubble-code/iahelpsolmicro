import * as tf from '@tensorflow/tfjs';
import * as qna from '@tensorflow-models/qna';
import { useEffect, useMemo, useState } from 'react';
import { Circles } from 'react-loader-spinner';
import { Button, Form, Input } from 'antd';


const MainView = () => {

    const [model, setModel] = useState(null)
    const [resp, setResp] = useState([]);
    const [form] = Form.useForm();

    // const loadModel = async () => {
    //     const model1 = await qna.load()
    //     console.log('Model load')
    //     return model1
    // }

    useEffect(() => {
        let isMounted = true;
        const loadModel = async () => {
            try {
                const loadedModel = await qna.load();
                if (isMounted) {
                    setModel(loadedModel)
                }
            } catch (error) {
                console.error('Error loading model:', error)
            }
        }
        loadModel()

        return () => {
            isMounted = false
        }
    }, [])

    async function onFinish() {
        const question = form.getFieldValue('question');
        const textForAnalysis = form.getFieldValue('textForAnalysis');
        if (model !== null) {
            const answers = await model.findAnswers(question, textForAnalysis);
            console.log(answers)
            // setResp(answers);
        }
        else {
            console.log("model is null");
        }
    }

    return (
        <div className='flex justify-center flex-col'>
            <Form form={form} onFinish={onFinish}>
                <Form.Item name={"textForAnalysis"} label='Input text'>
                    <Input.TextArea rows={16} cols={12} />
                </Form.Item>
                <Form.Item name={"question"} label="Enter the our question" >
                    <Input />
                </Form.Item>
                <Form.Item >
                    <Button htmlType='submit'>Enviar</Button>
                </Form.Item>
            </Form>

            {model === null && <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}

            />}
            <div>

            </div>
        </div>
    )
}

export { MainView }