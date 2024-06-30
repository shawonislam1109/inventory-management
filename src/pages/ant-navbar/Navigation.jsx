import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { items } from "./menuItem/IndexMeuItem";
import "./navigation.css";
import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import ProfileMenu from "./ProfileMenu";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useGetBranchQuery } from "../../api/service/branch.service";
import { convertToLabel } from "../../utils/convertToLabel";
import { useDispatch } from "react-redux";
import { activeBranchSetup } from "../../store/reducer/auth";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const Navigation = () => {
  // -> USE DISPATCH HOOK
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // => USE AUTH HOOK
  const { user, activeBranch } = useAuth();

  //   ->RTK QUERY HOOK
  const { branches } = useGetBranchQuery(user?._id, {
    skip: !user,
    selectFromResult: ({ data, ...rest }) => {
      return { branches: convertToLabel(data, "name", "_id"), ...rest };
    },
  });

  // -> ACTIVE BRANCH HANDLER
  const activeBranchHandler = (data) => {
    if (data) {
      dispatch(activeBranchSetup({ branch: data.value, branches }));
      window.location.reload();
    }
  };

  // => COLLAPSED FOR USE STATE
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = (event) => {
    console.log(event);
    navigate(`/${event.key}`);
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={"17rem"}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          left: 0,
          top: 0,
          zIndex: 60,
          bottom: 0,
        }}
        className={"sider-scrollbar "}
      >
        <div className="demo-logo-vertical " />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={location.pathname.split("/")[1]}
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            overflow: "auto",
            position: "sticky",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            left: 0,
            zIndex: "100",
            top: 0,
          }}
        >
          <Box>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 50,
                height: 50,
              }}
            />
          </Box>

          <Stack
            width={240}
            direction="row"
            justifyContent="center" // Use center to align items horizontally
            alignItems="center" // Use center to align items vertically
            sx={{ mr: 2 }}
            spacing={2} // Add spacing between elements
          >
            <Box sx={{ width: 200 }}>
              <Autocomplete
                onChange={(event, data) => {
                  if (data) {
                    activeBranchHandler(data);
                  }
                }}
                value={
                  branches?.find((item) => item.value === activeBranch?._id) ||
                  null
                }
                options={branches || []}
                getOptionLabel={(option) => option?.label}
                disableClearable
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" size="small" />
                )}
              />
            </Box>

            <ProfileMenu />
          </Stack>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            marginLeft: "3rem",
          }}
          className={"sider-scrollbar "}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Navigation;
