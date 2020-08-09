import React, { useState, useRef } from "react";
import styled from "styled-components";

import { Close } from "@material-ui/icons";

import Player51 from "./Player51";
import Tag from "./Tags/Tag";

import { useResizeHandler } from "../utils/hooks";

type Props = {
  sample: object;
  sampleUrl: string;
};

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 280px;
  width: 90vw;
  height: 80vh;
  background-color: ${({ theme }) => theme.background};

  h2 svg {
    float: right;
    cursor: pointer;
  }

  .player {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .sidebar {
    border-left: 2px solid ${({ theme }) => theme.border};
    padding-left: 1em;
    padding-right: 1em;
  }

  .row {
    > label {
      font-weight: bold;
    }
    > span {
      float: right;
    }
  }
`;

const Row = ({ name, value }) => (
  <div class="row">
    <label>{name}</label>
    <span>{value}</span>
  </div>
);

const SampleModal = ({
  sample,
  sampleUrl,
  activeLabels,
  colorMapping,
  onClose,
}: Props) => {
  const playerContainerRef = useRef();
  const [playerStyle, setPlayerStyle] = useState({ height: "100%" });

  const handleResize = () => {
    if (!playerContainerRef.current) {
      return;
    }
    const container = playerContainerRef.current;
    const image = playerContainerRef.current.querySelector(
      "img.p51-contained-image"
    );
    const containerRatio = container.clientWidth / container.clientHeight;
    const imageRatio = image.clientWidth / image.clientHeight;
    if (containerRatio < imageRatio) {
      setPlayerStyle({
        width: container.clientWidth,
        height: container.clientWidth / imageRatio,
      });
    } else {
      setPlayerStyle({
        height: container.clientHeight,
        width: container.clientHeight * imageRatio,
      });
    }
  };

  useResizeHandler(handleResize);

  const classifications = Object.keys(sample)
    .filter((k) => sample[k] && sample[k]._cls == "Classification")
    .map((k) => (
      <Row
        key={k}
        name={<Tag name={k} color={colorMapping[k]} />}
        value={sample[k].label}
      />
    ));
  const detections = Object.keys(sample)
    .filter((k) => sample[k] && sample[k]._cls == "Detections")
    .map((k) => {
      const len = sample[k].detections.length;
      return (
        <Row
          key={k}
          name={<Tag name={k} color={colorMapping[k]} />}
          value={`${len} detection${len == 1 ? "" : "s"}`}
        />
      );
    });

  return (
    <Container>
      <div className="player" ref={playerContainerRef}>
        <Player51
          src={sampleUrl}
          onLoad={handleResize}
          style={{
            position: "relative",
            ...playerStyle,
          }}
          sample={sample}
          colorMapping={colorMapping}
          activeLabels={activeLabels}
        />
      </div>
      <div className="sidebar">
        <h2>
          Metadata <Close onClick={onClose} />
        </h2>
        <Row name="ID" value={sample._id.$oid} />
        <Row name="Source" value={sample.filepath} />
        <Row
          name="Tags"
          value={sample.tags.map((tag) => (
            <Tag key={tag} name={tag} color={colorMapping[tag]} />
          ))}
        />
        {classifications.length ? (
          <>
            <h2>Classification</h2>
            {classifications}
          </>
        ) : null}
        {detections.length ? (
          <>
            <h2>Object Detection</h2>
            {detections}
          </>
        ) : null}
      </div>
    </Container>
  );
};

export default SampleModal;