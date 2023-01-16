import React from "react";
import { IResourceComponentsProps, BaseRecord, useShow } from "@pankod/refine-core";
import {
    useTable,
    List,
    Table,
    Space,
    ShowButton,
    EmailField,
    Create,
    Form,
    useForm,
    Input,
    Select,
    TextField,
    NumberField,
    Show,
    Typography,
    Edit,
} from "@pankod/refine-antd";

export const UserList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
        hasPagination: false
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id" />
                <Table.Column
                    dataIndex={["email"]}
                    title="Email"
                    render={(value: any) => <EmailField value={value} />}
                />
                <Table.Column dataIndex="codePostal" title="Code Postal" />
                <Table.Column dataIndex="rue" title="Rue" />
                <Table.Column dataIndex="ville" title="Ville" />
                <Table.Column dataIndex="nom" title="Nom" />
                <Table.Column dataIndex="prenom" title="Prenom" />
                <Table.Column dataIndex="role" title="Role" />
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};

export const UserCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Prenom"
                    name={["prenom"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Nom"
                    name={["nom"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name={["email"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name={["password"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Rue"
                    name={["rue"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ville"
                    name={["ville"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Code Postal"
                    name={["codePostal"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Role"
                    name={["role"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select 
                        options={[
                            {
                                label: 'Admin',
                                value: 'ADMIN'
                            },
                            {
                                label: 'Client',
                                value: 'CLIENT'
                            },
                        ]}
                    />
                </Form.Item>
            </Form>
        </Create>
    );
};

const { Title } = Typography;

export const UserShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>Email</Title>
            <EmailField value={record?.email} />
            <Title level={5}>Code Postal</Title>
            <NumberField value={record?.codePostal ?? ""} />
            <Title level={5}>Rue</Title>
            <TextField value={record?.rue} />
            <Title level={5}>Ville</Title>
            <TextField value={record?.ville} />
            <Title level={5}>Nom</Title>
            <TextField value={record?.nom} />
            <Title level={5}>Prenom</Title>
            <TextField value={record?.prenom} />
            <Title level={5}>Role</Title>
            <TextField value={record?.role} />
        </Show>
    );
};

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm();

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Id"
                    name={["id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input readOnly disabled />
                </Form.Item>
                <Form.Item
                    label="Code Postal"
                    name={["codePostal"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Rue"
                    name={["rue"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ville"
                    name={["ville"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name={["email"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Nom"
                    name={["nom"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Prenom"
                    name={["prenom"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Role"
                    name={["role"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select 
                        options={[
                            {
                                label: 'Admin',
                                value: 'ADMIN'
                            },
                            {
                                label: 'Client',
                                value: 'CLIENT'
                            },
                        ]}
                    />
                </Form.Item>
            </Form>
        </Edit>
    );
};