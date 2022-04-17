import { ConnectedProps } from "react-redux";
import styled from "styled-components";
import assets from "../../assets";
import InfoConnector from "../../store/info/connector";
import Tracks from "../common/Tracks";

type Props = ConnectedProps<typeof InfoConnector>;

function Letter({ randomTracks }: Props) {
  return (
    <LetterBlock>
      <LetterBack />

      <LetterPaper className="letter-paper">
        {randomTracks && <Tracks tracks={randomTracks} />}
      </LetterPaper>

      <LetterFront className="letter-front">
        <img src={assets.Item.LetterFrontx3} alt="Letter Front" />
      </LetterFront>

      <LetterLid className="letter-lid">
        <img src={assets.Item.LetterLidReversex3} alt="Letter Lid" />
      </LetterLid>
    </LetterBlock>
  );
}

const LetterBlock = styled.div`
  position: sticky;
  top: 386.74px;
  margin: 148px 0 96px;

  width: 740px;
  height: 493.33px;

  & > div {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    border-end-start-radius: 16px;
    border-end-end-radius: 16px;
  }
`;

const LetterLid = styled.div`
  height: calc(493.33px / 2) !important;

  /* transform: rotateX(180deg); */
  transform-origin: 0% 0%;

  /* z-index: 1; */

  & > img {
    filter: drop-shadow(0px 2px 1px rgba(55, 55, 55, 0.5));
  }
`;

const LetterFront = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  perspective: 500px;

  /* z-index: 3; */

  & > img {
    filter: drop-shadow(-2px -2px 1px rgba(55, 55, 55, 0.5));
  }
`;

const LetterPaper = styled.div`
  left: 10px !important;
  width: 720px !important;
  background-color: #fff;

  /* transform: translateY(-145px); */

  border-radius: 16px !important;
  /* z-index: 2; */

  box-shadow: 0px 0px 4px rgba(55, 55, 55, 0.5);
`;

const LetterBack = styled.div`
  background-color: #eee;
`;

export default InfoConnector(Letter);
