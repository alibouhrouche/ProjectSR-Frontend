import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  ErrorComponent,
  AuthPage,
} from "@pankod/refine-antd";
import "@pankod/refine-antd/dist/reset.css";

import routerProvider, {HashRouterComponent} from "@pankod/refine-react-router-v6";
import { ColorModeContextProvider } from "contexts";
import {
  Title,
  Header,
  Sider,
  Footer,
  Layout,
  OffLayoutArea,
} from "components/layout";
import { authProvider, ROLE_KEY } from "./authProvider";
import config from "./config"
import dataProvider from "./dataProvider";
import { MessageCreate, MessageList, MessageShow } from "components/layout/Messages";
import { TerrainCreate, TerrainEdit, TerrainList, TerrainShow } from "components/layout/Terrain";
import defineAbilityFor from "accessControl";
import { SportCreate, SportEdit, SportList, SportShow } from "components/layout/Sports";
import { CarnetCreate, CarnetEdit, CarnetList, CarnetShow } from "components/layout/Carnet";
import { UserCreate, UserList, UserShow } from "components/layout/User";

function App() {  
  return (
    <ColorModeContextProvider>
      <Refine
        dataProvider={dataProvider(config.api_base)}
        notificationProvider={notificationProvider}
        catchAll={<ErrorComponent />}
        accessControlProvider={{
          can: async ({ resource, action }) => {
              const roles = JSON.parse(localStorage.getItem(ROLE_KEY)??"[]") as string[]
              const can = defineAbilityFor(roles).can(action, resource.toLowerCase())
              return Promise.resolve({ can });
          },
      }}
        resources={[
          {
            name: "Users",
            list: UserList,
            show: UserShow,
            create: UserCreate,
            canDelete: false,
          },
          {
            name: "Messages",
            list: MessageList,
            show: MessageShow,
            create: MessageCreate,
            canDelete: true,
          },
          {
            name: "MyMessages",
            list: MessageList,
            show: MessageShow,
            create: MessageCreate,
            canDelete: true,
          },
          {
            name: "Terrain",
            list: TerrainList,
            edit: TerrainEdit,
            show: TerrainShow,
            create: TerrainCreate,
            canDelete: true,
          },
          {
            name: "Sports",
            list: SportList,
            edit: SportEdit,
            show: SportShow,
            create: SportCreate,
            canDelete: true,
          },
          {
            name: "Carnets",
            list: CarnetList,
            edit: CarnetEdit,
            show: CarnetShow,
            create: CarnetCreate,
            canDelete: true,
          },
        ]}
        Title={Title}
        Header={Header}
        Sider={Sider}
        Footer={Footer}
        Layout={Layout}
        OffLayoutArea={OffLayoutArea}
        routerProvider={{
          ...routerProvider,
          RouterComponent: HashRouterComponent
        }}
        authProvider={authProvider}
        LoginPage={AuthPage}
      />
    </ColorModeContextProvider>
  );
}

export default App;
