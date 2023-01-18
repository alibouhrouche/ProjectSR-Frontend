import React from "react";
import { IResourceComponentsProps, BaseRecord, useShow } from "@pankod/refine-core";
import {
    useTable,
    List,
    Table,
    Space,
    ShowButton,
    DeleteButton,
    DateField,
    Create, Form, useForm, Input, Show, NumberField, TextField, Typography
} from "@pankod/refine-antd";

export const MessageList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id"
                    sorter
                />
                <Table.Column
                    dataIndex={["dateEcriture"]}
                    title="Date Ecriture"
                    render={(value: any) => <DateField value={value} />}
                    sorter
                />
                <Table.Column dataIndex="message" title="Message"
                    sorter
                />
                <Table.Column dataIndex="From" title="From"
                    sorter
                />
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

export const MessageCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Message"
                    name={["message"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Create>
    );
};

const { Title } = Typography;

export const MessageShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>Date Ecriture</Title>
            <DateField value={record?.dateEcriture} />
            <Title level={5}>Message</Title>
            <TextField style={{
                whiteSpace: 'pre'
            }} value={record?.message} />
            <Title level={5}>From</Title>
            <TextField value={record?.From} />
        </Show>
    );
};
