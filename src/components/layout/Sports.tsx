import React from "react";
import { IResourceComponentsProps, BaseRecord, useShow } from "@pankod/refine-core";
import {
    useTable,
    List,
    Table,
    Space,
    EditButton,
    ShowButton,
    DeleteButton,
    TagField,
    Edit,
    Form,
    Input,useForm, Select, Typography, Show, NumberField, TextField, Create, useSelect, InputNumber
} from "@pankod/refine-antd";
import { Sport, Terrain } from "interfaces";

export const SportList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id"
                    sorter
                />
                <Table.Column dataIndex="nom" title="Nom"
                    sorter
                />
                <Table.Column
                    dataIndex="nombreJoueurs"
                    title="Nombre Joueurs"
                    sorter
                />
                <Table.Column
                    dataIndex="terrains"
                    title="Terrains"
                    render={(value: any[]) => (
                        <>
                            {value?.map((item) => (
                                <TagField value={item} key={item} />
                            ))}
                        </>
                    )}
                />
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <DeleteButton
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

export const SportEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm<Sport>();

    const sportsData = queryResult?.data?.data;

    const { selectProps: terrainSelectProps } = useSelect<Terrain>({
        resource: "Terrain",
        defaultValue: sportsData?.terrains,
        optionLabel: "code",
        optionValue: "code",
        defaultValueQueryOptions: {
            enabled: false,
        }
    })

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
                    label="Nombre Joueurs"
                    name={["nombreJoueurs"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                    label="Terrains"
                    name="terrains"
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        {...terrainSelectProps}
                    />
                </Form.Item>
            </Form>
        </Edit>
    );
};

const { Title } = Typography;

export const SportShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>Nom</Title>
            <TextField value={record?.nom} />
            <Title level={5}>Nombre Joueurs</Title>
            <NumberField value={record?.nombreJoueurs ?? ""} />
            <Title level={5}>Terrains</Title>
            {record?.terrains?.map((item: any) => (
                <TagField value={item} key={item} />
            ))}
        </Show>
    );
};

export const SportCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
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
                    label="Nombre Joueurs"
                    name={["nombreJoueurs"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber min={0} />
                </Form.Item>
            </Form>
        </Create>
    );
};