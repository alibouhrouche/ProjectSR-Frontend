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
    Create, Form, useForm, Input, TagField, Show, Typography, NumberField, TextField, Edit, Select, useSelect
} from "@pankod/refine-antd";

const Surface:Record<string,string> = {
    'BETON': 'Beton',
    'PARQUET': 'Parquet',
    'TERRE_BATTUE': 'Terre Battue'
}

const SurfaceOptions = Object.entries(Surface).map(([k,v])=>({
    label: v,
    value: k
}))

export const TerrainList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
        hasPagination: false
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id" />
                <Table.Column dataIndex="code" title="Code" />
                <Table.Column dataIndex="surface" title="Surface" 
                    render={(value:string) => <TextField value={Surface[value] ?? value} />}
                />
                <Table.Column
                    dataIndex="sportsNames"
                    title="Sports"
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


export const TerrainCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Code"
                    name={["code"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Surface"
                    name={["surface"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        options={SurfaceOptions}
                    />
                </Form.Item>
            </Form>
        </Create>
    );
};

export const TerrainEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();

    const terrainData = queryResult?.data?.data;

    const { selectProps: sportSelectProps } = useSelect({
        resource: "Sports",
        defaultValue: terrainData?.sports,
        optionLabel: "nom",
        optionValue: "id",
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
                    label="Code"
                    name={["code"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Surface"
                    name={["surface"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        defaultValue='BETON'
                        options={SurfaceOptions}
                    />
                </Form.Item>
                <Form.Item
                    label="Sports"
                    name="sports"
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        {...sportSelectProps}
                    />
                </Form.Item>
            </Form>
        </Edit>
    );
};


const { Title } = Typography;

export const TerrainShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>Code</Title>
            <TextField value={record?.code} />
            <Title level={5}>Surface</Title>
            <TextField value={Surface[record?.surface] ?? record?.surface} />
            <Title level={5}>Sports</Title>
            {record?.sportsNames?.map((item: any) => (
                <TagField value={item} key={item} />
            ))}
        </Show>
    );
};
