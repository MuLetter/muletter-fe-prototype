import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { ConnectedProps } from "react-redux";
import { Coord } from "../../store/mailbox/types";
import MailBoxMapConnector from "../../store/mailBoxMap/connector";
import { MailBox } from "../../store/mailBoxMap/types";
import convertCoordToPos from "../../utils/convertCoordToPos";
import convertPosToCoord from "../../utils/convertPosToCoord";
import createWheelStopListener from "../../utils/createWheelStopListener";

type ItemProps = {
  mapSize: number;
  mailBox: MailBox;
};

function MapItem({ mapSize, mailBox }: ItemProps) {
  return (
    <Box
      position="absolute"
      style={convertCoordToPos(mapSize, mailBox.point!)}
      background="#fff"
      borderRadius="100%"
    >
      <Image
        src={`${process.env.REACT_APP_API_SERVER}${mailBox.imagePath}`}
        width="100%"
        height="100%"
        objectFit="cover"
        borderRadius="100%"
      />
    </Box>
  );
}

type Props = ConnectedProps<typeof MailBoxMapConnector>;

function MailBoxMap({ getMap, mailBoxes }: Props) {
  const refZoomOuter = React.useRef<HTMLDivElement>(null);
  const refZoom = React.useRef<HTMLDivElement>(null);
  const refMapCenter = React.useRef<HTMLDivElement>(null);
  const refCenter = React.useRef<HTMLDivElement>(null);

  const refMousePoint = React.useRef<Coord>({ x: 0, y: 0 });
  const refMaxSize = React.useRef<Coord | null>({ x: 600, y: 600 });
  const refMaxPoint = React.useRef<Coord | null>({ x: 0, y: 0 });
  const refScale = React.useRef<number>(1);

  const refStart = React.useRef<Coord>({ x: 0, y: 0 });
  const refMoving = React.useRef<boolean>(false);

  const [mapSize, setMapSize] = React.useState<number>(300);
  const [centerCoord, setCenterCoord] = React.useState<Coord>({ x: 0, y: 0 });

  React.useEffect(() => {
    const offset = 100 / refScale.current;
    const { x, y } = centerCoord;
    console.log("now center", centerCoord);
    console.log("offset", offset);

    getMap({
      centerX: x,
      centerY: y,
      pointOffset: offset,
    });
  }, [centerCoord, getMap]);

  const setTransform = React.useCallback(() => {
    if (refZoom && refZoom.current) {
      if (refMousePoint.current && refMaxPoint.current) {
        let { x, y } = refMousePoint.current;
        let { x: maxX, y: maxY } = refMaxPoint.current;

        // 상,좌 컨트롤
        if (x > 0) x = 0;
        if (y > 0) y = 0;

        // 하, 우 컨트롤
        if (x < maxX) x = maxX;
        if (y < maxY) y = maxY;

        refZoom.current.style.transform =
          "translate(" + x + "px, " + y + "px) scale(" + refScale.current + ")";
      }
    }
  }, []);

  // zoom transitionend
  React.useEffect(() => {
    if (refZoom && refZoom.current) {
      refZoom.current.ontransitionend = (e: TransitionEvent) => {
        const { width: mapSize } = refZoom.current!.getBoundingClientRect();

        if (refMapCenter && refCenter) {
          const { x: mcx, y: mcy } =
            refMapCenter.current!.getBoundingClientRect();
          const { x: cx, y: cy } = refCenter.current!.getBoundingClientRect();

          console.log(mcx, mcy);
          console.log(cx, cy);

          const errX = cx - mcx;
          const errY = cy - mcy;

          console.log(errX, errY);

          setCenterCoord(
            convertPosToCoord(mapSize / 2, {
              x: errX,
              y: errY,
            })
          );
          setMapSize(mapSize / 2);
        }
      };
    }
  }, []);

  // Drag Event
  React.useEffect(() => {
    if (refZoom && refZoom.current) {
      refZoom.current.onmousedown = (e) => {
        e.preventDefault();

        const { x: pointX, y: pointY } = refMousePoint.current;
        refStart.current = {
          x: e.clientX - pointX,
          y: e.clientY - pointY,
        };
        refMoving.current = true;
      };
      refZoom.current.onmouseup = (e) => {
        refMoving.current = false;
      };
      refZoom.current.onmousemove = (e) => {
        e.preventDefault();
        if (!refMoving.current) {
          return;
        }

        refMousePoint.current = {
          x: e.clientX - refStart.current.x,
          y: e.clientY - refStart.current.y,
        };
        setTransform();
      };
    }
  }, [setTransform]);

  // Wheel Event
  React.useEffect(() => {
    if (refZoom && refZoom.current)
      createWheelStopListener(
        refZoom.current,
        function (e) {
          if (refZoomOuter && refZoomOuter.current) {
            let { x: zoomX, y: zoomY } =
              refZoomOuter.current.getBoundingClientRect();

            // zoom control 값
            zoomX = 0;
            zoomY = 0;

            let pointX = 0,
              pointY = 0;
            if (refMousePoint.current) {
              const { x, y } = refMousePoint.current;
              pointX = x;
              pointY = y;
            }

            var xs = (e.clientX - zoomX - pointX) / refScale.current,
              ys = (e.clientY - zoomY - pointY) / refScale.current,
              delta = e.deltaY;

            let nextScale = 0;
            if (delta < 0) nextScale = refScale.current + 0.4;
            else nextScale = refScale.current - 0.4;
            if (nextScale < 1) refScale.current = 1;
            else {
              if (nextScale > 3) refScale.current = 3;
              else refScale.current = nextScale;
            }

            let maxPointX = 0,
              maxPointY = 0;
            if (refMaxSize.current) {
              const { x, y } = refMaxSize.current;
              maxPointX = x;
              maxPointY = y;
            }

            // 커진 크기만큼만 이동가능한 포인트
            const nextMaxPointX = maxPointX - maxPointX * refScale.current;
            const nextMaxPointY = maxPointY - maxPointY * refScale.current;

            refMaxPoint.current = {
              x: nextMaxPointX,
              y: nextMaxPointY,
            };

            const nextPointX = e.clientX - zoomX - xs * refScale.current;
            const nextPointY = e.clientY - zoomY - ys * refScale.current;

            refMousePoint.current = {
              x: nextPointX,
              y: nextPointY,
            };

            setTransform();
          }
        },
        200
      );
  }, [setTransform]);

  return (
    <Flex flex={1} alignItems="center" justifyContent="center">
      <Box
        position="relative"
        ref={refZoomOuter}
        width="600px"
        height="600px"
        overflow="hidden"
        boxShadow="1px 1px 20px rgba(255,255,255,0.3)"
      >
        <Box
          ref={refZoom}
          position="relative"
          width="600px"
          height="600px"
          // background="linear-gradient(90deg, #4568DC 0%, #B06AB3 100%)"
          transition="0.2s"
          transformOrigin="0% 0%"
        >
          <Box
            ref={refMapCenter}
            position="absolute"
            top="300px"
            left="300px"
            width="0"
            height="0"
            overflow="visible"
          >
            {mailBoxes?.map((mailBox) => (
              <MapItem key={mailBox._id} mailBox={mailBox} mapSize={mapSize} />
            ))}
          </Box>
        </Box>
        <Flex
          ref={refCenter}
          position="absolute"
          top="300px"
          left="300px"
          width="0"
          height="0"
        />
      </Box>
    </Flex>
  );
}

export default MailBoxMapConnector(MailBoxMap);
