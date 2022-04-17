import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Track } from "../store/mailbox/types";
import { ContainerMar16 } from "./common/Container";
import { ContentTitle } from "./common/PageTitle";
import RegistMailBox from "./MailBox/RegistMailBox";
import SearchTrack from "./MailBox/SearchTrack";

type TMailBox = {
  title: string;
  description: string;
};

type FormProps = {
  onMailBoxSubmit: (data: TMailBox, image: Blob) => void;
};

function RegistForm({ onMailBoxSubmit }: FormProps) {
  const { register, handleSubmit } = useForm<TMailBox>();
  const [image, setImage] = React.useState<Blob | null>(null);
  const [mainImage, setMainImage] = React.useState<string | null | undefined>(
    null
  );
  const fileChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileReader = new FileReader();

      fileReader.onload = function (e) {
        const src = e.target?.result;

        setMainImage(src as any);
      };

      if (e.target.files && e.target.files.length > 0) {
        fileReader.readAsDataURL(e.target.files[0]);
        setImage(e.target.files[0]);
      }
    },
    []
  );
  const onSubmit = handleSubmit((data) => {
    if (image !== null) onMailBoxSubmit(data, image);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FileBox>
        <FileLabel htmlFor="image" />
        <input id="image" type="file" onChange={fileChange} />
        {mainImage && <img src={mainImage} alt="mailbox img" />}
      </FileBox>
      <InputGroup>
        <InputText
          placeholder="우체통의 이름을 지어주세요."
          {...register("title")}
        />
        <InputTextArea
          placeholder="우체통의 설명을 적어주세요."
          {...register("description")}
        />
      </InputGroup>
      <RegistMailBox type="submit" />
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
  position: relative;
  width: 350px;
  height: 200px;

  & > input[type="file"] {
    display: none;
  }

  & > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 350px;
    height: 200px;
    object-fit: cover;

    z-index: 1;
  }
`;

const FileLabel = styled.label`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;

  z-index: 2;

  width: 350px;
  height: 200px;

  background: rgba(51, 51, 51, 0.2);
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

type Props = {
  selTracks: Track[];
  selectTrack: (selTrack: Track) => void;
} & FormProps;

function MailBoxRegistComponent({
  selTracks,
  selectTrack,
  onMailBoxSubmit,
}: Props) {
  return (
    <ContainerMar16
      display="flex"
      flexDirection="column"
      color="#fff"
      padding="0 0 160px 0"
    >
      <ContentTitle>우체통 등록하기</ContentTitle>
      <RegistForm onMailBoxSubmit={onMailBoxSubmit} />
      <SearchTrack selTracks={selTracks} selectTrack={selectTrack} />
    </ContainerMar16>
  );
}

export default MailBoxRegistComponent;
