import React, { useEffect, useState } from 'react';
import {
    Modal, Form, message, Button, Input, Row, Col, Space, Spin
} from "antd";

import ApiInstance from "../../../services/apis";

const ModalCourse = ({isModalVisible, handleCancel, selectedCourse, setSelectedCourse}) => {

    const [isSaving, setIsSaving] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
        if (selectedCourse) {
            form.setFieldsValue({
                ...selectedCourse
            });
        } else {
            form.resetFields();
        }
    }, [selectedCourse]);

    const onFinish = async () => {
        try {
            setIsSaving(true);
            const userData = await form.validateFields();
            if (selectedCourse) {
                await update(userData);
                selectedCourse.name = userData.name;
                selectedCourse.code = userData.code;
                setSelectedCourse(null);
            }
            message.success('Atualizado com sucesso!');
            setIsSaving(false)
            form.resetFields();
            handleCancel();
        } catch (error) {
            console.log(error)
            console.log('Falha ao atualizar o curso');
            form.resetFields();
            message.error('Ocorreu um erro! 😢');
            setIsSaving(false);
        }
    };

    const update = async (course) => {
        try {
            await ApiInstance.put(`api/course/${selectedCourse?.id}/`, {
                ...course,
                id: selectedCourse?.id
            });
        } catch (error) {
            message.error(error.message);
            throw new Error(error.message);
        }
    };

    return (
        <Modal
            title={'Editar Curso'}
            open={isModalVisible}
            onCancel={handleCancel}
            width={550}
            footer={[
                <Button key='back' disabled={isSaving} onClick={handleCancel}>
                    Cancelar
                </Button>,
                <Button key='submit' disabled={isSaving} type='primary' onClick={onFinish}>
                    {isSaving ? 'Salvando' : 'Salvar' }
                </Button>
            ]}
        >
            <Spin spinning={isSaving}>
                <Form
                    layout='vertical'
                    name='basic'
                    initialValues={{remember: true}}
                    style={{width: '100%'}}
                    form={form}
                >
                    <Space.Compact block size={'middle'}>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    label={'Nome'}
                                    name={'name'}
                                    rules={[{ required: true, message: 'Preencha o nome do curso' }]}
                                    style={{ marginRight: '15px', width: '500px'}}
                                >
                                    <Input style={{ height: '36px' }} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Space.Compact>
                    <Space.Compact block size={'middle'}>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    label={'Código'}
                                    name={'code'}
                                    rules={[{required: true, message: 'Preencha código do curso!'}]}
                                >
                                    <Input style={{ height: '36px', width: '500px' }} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Space.Compact>
                </Form>
            </Spin>


        </Modal>
    )

}

export default ModalCourse;