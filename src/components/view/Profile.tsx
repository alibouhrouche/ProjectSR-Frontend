import { Edit, Form, Input, useForm } from "@pankod/refine-antd"

function Profile() {
    const { formProps, saveButtonProps } = useForm({
        resource: "Profile",
        id: "",
        action: "edit",
    });
    return (
        <Edit headerButtons={()=>null} saveButtonProps={saveButtonProps}>
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
                >
                    <Input.Password placeholder="(Unchanged)" />
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
            </Form>
        </Edit>
    )
}

export default Profile