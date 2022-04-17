import { Route, Routes } from "react-router-dom";
import { ContainerMar80 } from "../components/common/Container";
import MailBoxContainer from "../containers/MailBoxContainer";
import MailBoxesContainer from "../containers/MailBoxesContainer";
import MailBoxRegistContainer from "../containers/MailBoxRegistContainer";

function MailBoxPage() {
  return (
    <ContainerMar80>
      <Routes>
        <Route index element={<MailBoxesContainer />} />
        <Route path=":id" element={<MailBoxContainer />} />
        <Route path="regist" element={<MailBoxRegistContainer />} />
      </Routes>
    </ContainerMar80>
  );
}

export default MailBoxPage;
