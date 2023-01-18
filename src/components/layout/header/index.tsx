import { useContext } from "react";
import { useGetIdentity, useRouterContext } from "@pankod/refine-core";
import {
  AntdLayout,
  Avatar,
  Typography,
  Switch,
} from "@pankod/refine-antd";
import { ColorModeContext } from "contexts";
const { Text } = Typography;

export const Header: React.FC = () => {
  const { data: user } = useGetIdentity();
  const { mode, setMode } = useContext(ColorModeContext);
  const { Link } = useRouterContext();
  return (
    <AntdLayout.Header
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0px 24px",
        height: "64px",
        color: "#fff"
      }}
    >
      <Switch
        checkedChildren="🌛"
        unCheckedChildren="🔆"
        onChange={() => setMode(mode === "light" ? "dark" : "light")}
        defaultChecked={mode === "dark"}
        style={{
          background: mode === "light" ? "#f5f5f5" : "#000000"
        }}
      />
      <Link to="/Profile">
        <div style={{ marginLeft: "8px", display: 'flex', alignItems: 'center', gap: '10px' }}>
          {user?.name && (
            <Text ellipsis strong style={{
              color: "#fff"
            }}>
              {user.name}
            </Text>
          )}
          {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} /> }
        </div>
      </Link>
    </AntdLayout.Header>
  );
};
