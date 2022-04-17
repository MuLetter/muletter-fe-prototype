import Content from "../components/common/Content";
import Header from "../components/common/Header";
import { ContainerBG } from "../components/common/Container";
import { Outlet } from "react-router-dom";

function RootPage() {
  return (
    <>
      <Header />
      <ContainerBG />
      <Content>
        <Outlet />
      </Content>
    </>
  );
}

export default RootPage;
