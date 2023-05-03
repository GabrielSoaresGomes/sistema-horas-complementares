import React, { useEffect, useState } from 'react';
import {
    Modal, Form, message, Button, Input, Row, Col, Select, Space
} from "antd";

import ApiInstance from "../../../services/apis";

const { Option } = Select;

const ModalUser = ({isModalVisible, handleCancel, selectedUser, setSelectedUser}) => {

    const [courses, setCourses] = useState([]);
    const [form] = Form.useForm();

    const getCourses = React.useCallback(async () => {
        try {
            return await ApiInstance.get('api/course/');
        } catch (error) {
            console.log('Falha ao listar cursos');
            message.error('Ocorreu um erro! 😢')
        }
    }, []);

    useEffect(() => {
        getCourses().then(r => {setCourses(r)});
        form.resetFields();
        if (selectedUser) {
            form.setFieldsValue({
                ...selectedUser
            });
        } else {
            form.resetFields();
        }
    }, [selectedUser, getCourses]);



    const onFinish = async () => {
        try {
            const userData = await form.validateFields();
            if (selectedUser) {
                await update(userData);
                selectedUser.name = userData.name;
                selectedUser.registration = userData.registration;
                selectedUser.email = userData.email;
                selectedUser.course_id = userData.course;
                setSelectedUser(null);
            }
            form.resetFields();
            handleCancel();
        } catch (error) {
            form.resetFields();
            console.log(error);
        }
    };

    const update = async (user) => {
        try {
            await ApiInstance.put(`users/${selectedUser?.id}/`, {
                ...user,
                id: selectedUser?.id
            });
            message.success('Atualizado com sucesso!');
        } catch (error) {
            message.error(error.message);
            throw new Error(error.message);
        }
    };

    return (
        <Modal
            title={'Editar Usuário'}
            open={isModalVisible}
            onCancel={handleCancel}
            width={1200}
            footer={[
                <Button key='back' onClick={handleCancel}>
                    Cancelar
                </Button>,
                <Button key='submit' type='primary' onClick={onFinish}>
                    Salvar
                </Button>
            ]}
        >
            <Form
                layout='vertical'
                name='basic'
                initialValues={{remember: true}}
                style={{width: '100%'}}
                form={form}
            >
                <Space.Compact block size={'large'}>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label={'Nome'}
                                name={'name'}
                                rules={[{ required: true, message: 'Preencha seu nome!' }]}
                                style={{ marginRight: '15px', width: '500px'}}
                            >
                                <Input style={{ height: '36px' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={'Email'}
                                name={'email'}
                                rules={[{required: true, message: 'Preencha seu email!'}, {type: 'email', message: 'Preencha um email válido!'}]}
                            >
                                <Input style={{ height: '36px', width: '500px' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Space.Compact>
                <Space.Compact block size={'large'}>
                    <Row>
                        {/*<Col span={8}>*/}
                        {/*    <Form.Item*/}
                        {/*        label={'Senha'}*/}
                        {/*        name={'password'}*/}
                        {/*        style={{ marginRight: '10px', width: '300px'  }}*/}
                        {/*        rules={[{required: true, message: 'Preencha sua senha!'}]}*/}
                        {/*    >*/}
                        {/*        <Input.Password*/}
                        {/*            iconRender={(visible) => (<></>)}*/}
                        {/*        />*/}
                        {/*    </Form.Item>*/}
                        {/*</Col>*/}
                        <Col span={12}>
                            <Form.Item
                                label={'Matrícula'}
                                name='registration'
                                style={{ marginRight: '10px', width: '500px'  }}
                                rules={[{required: !selectedUser?.is_admin, message: 'Preencha sua matrícula!'}]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name={'course'}
                                label={'Curso'}
                                rules={[{required: !selectedUser?.is_admin, message: 'Selecione um curso!'}]}
                                style={{ width: '500px' }}
                            >
                                <Select placeholder={'Selecione seu curso'}>
                                    {
                                        courses.map((course) => (
                                            <Option
                                                key={course.id}
                                                value={course.id}
                                            >
                                                {course.name}
                                            </Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Space.Compact>
            </Form>


        </Modal>
    )

}

export default ModalUser;