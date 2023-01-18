import React from "react";
import {
    IResourceComponentsProps,
    BaseRecord,
    useShow,
} from "@pankod/refine-core";
import {
    useTable,
    List,
    Table,
    Space,
    EditButton,
    ShowButton,
    DeleteButton,
    Show,
    NumberField,
    TextField,
    Typography,
    Edit,
    useSelect,
    useForm,
    Form,
    Input,
    Select,
    InputNumber,
    Create,
    EmailField,
} from "@pankod/refine-antd";
import Buy from "components/view/Buy";

export const CarnetList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable({
        syncWithLocation: true
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id" sorter />
                <Table.Column dataIndex="username" title="Client"
                    render={(value)=><EmailField value={value}/>}
                />
                <Table.Column dataIndex="sportName" title="Sport" />
                <Table.Column
                    dataIndex="nombreEntrees"
                    title="Nombre Entrees"
                    sorter
                    render={(value,record: BaseRecord)=><Buy value={value} record={record!} />}
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

const { Title } = Typography;

export const CarnetShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading} headerButtons={({ defaultButtons }) => (
            <>
                {record && <Buy value="" record={record} hideText={true}/>}
                {defaultButtons}
            </>
        )}>
            <Title level={5}>Id</Title>
            <TextField value={record?.id} />
            <Title level={5}>Nombre Entrees</Title>
            <NumberField value={record?.nombreEntrees ?? ""} />
            <Title level={5}>Client</Title>
            <TextField value={record?.username} />
            <Title level={5}>Sport</Title>
            <TextField value={record?.sportName} />
        </Show>
    );
};

export const CarnetEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm();

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="User"
                    name={"username"}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input readOnly disabled/>
                </Form.Item>
                <Form.Item
                    label="Sport"
                    name={"sportName"}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input readOnly disabled/>
                </Form.Item>
                <Form.Item
                    label="Nombre Entrees"
                    name={["nombreEntrees"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber min={0} />
                </Form.Item>
            </Form>
        </Edit>
    );
};

export const CarnetCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm();

    const { selectProps: sportSelectProps } = useSelect({
        resource: "sports",
        optionLabel: "nom",
        optionValue: "id",
    });
    const { selectProps: clientSelectProps } = useSelect({
        resource: "users",
        optionLabel: "email",
        optionValue: "id",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Client"
                    name={["client"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...clientSelectProps} />
                </Form.Item>
                <Form.Item
                    label="Sport"
                    name={"sport"}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...sportSelectProps} />
                </Form.Item>
                <Form.Item
                    label="Nombre Entrees"
                    name={["nombreEntrees"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber min={0} defaultValue={0} />
                </Form.Item>
            </Form>
        </Create>
    );
};