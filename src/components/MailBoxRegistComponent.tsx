import styled from "styled-components";
import { ContainerMar16 } from "./common/Container";
import { ContentTitle } from "./common/PageTitle";
import SearchTrack from "./MailBox/SearchTrack";

function RegistForm() {
  return (
    <Form>
      <FileBox>
        <FileLabel htmlFor="image" />
        <input id="image" type="file" />
      </FileBox>
      <InputGroup>
        <InputText placeholder="우체통의 이름을 지어주세요." />
        <InputTextArea placeholder="우체통의 설명을 적어주세요." />
      </InputGroup>
    </Form>
  );
}
const Form = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 16px;

  color: #fff;
  margin: 16px 0 0;
`;

const FileBox = styled.div`
  & > input[type="file"] {
    display: none;
  }
`;

const FileLabel = styled.label`
  display: inline-block;

  width: 350px;
  height: 200px;

  background: rgba(51, 51, 51, 0.3);
  cursor: pointer;
`;

const InputGroup = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;

  gap: 4px;

  & > * {
    font-size: 16px;

    background-color: transparent;
    padding: 8px;
  }
`;

const InputText = styled.input``;

const InputTextArea = styled.textarea`
  resize: none;
`;

function MailBoxRegistComponent() {
  return (
    <ContainerMar16 display="flex" flexDirection="column" color="#fff">
      <ContentTitle>우체통 등록하기</ContentTitle>
      <RegistForm />
      <SearchTrack />
    </ContainerMar16>
  );
}

export default MailBoxRegistComponent;
