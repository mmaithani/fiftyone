import React from "react";
import styled from "styled-components";
import { useSpring } from "react-spring";
import { useMachine } from "@xstate/react";
import { useRecoilValue } from "recoil";

import {
  white96 as backgroundColor,
  white85 as borderColor,
} from "../../shared/colors";
import { port } from "../../recoil/atoms";
import { getSocket, useSubscribe } from "../../utils/socket";
import ViewStage, { ViewStageButton } from "./ViewStage/ViewStage";
import viewBarMachine, { createBar } from "./viewBarMachine";

const ViewBarDiv = styled.div`
  background-color: ${backgroundColor};
  border-radius: 3px;
  border: 1px solid ${borderColor};
  box-sizing: border-box;
  height: 54px;
  width: 100%;
`;

/*const connectedViewBarMachine = viewBarMachine.withConfig(
  {
    actions: {
      submit: (ctx) => {
        // ...
      },
    },
  },
  // load view from recoil
  {
    stage: 
  }
);*/

export default () => {
  const portValue = useRecoilValue(port);
  const [state, send] = useMachine(
    viewBarMachine.withContext(createBar(getSocket(portValue, "state")))
  );

  const { stages, tailStage } = state.context;

  return (
    <ViewBarDiv>
      {state.matches("running") &&
        stages.map((stage, i) => {
          return (
            <>
              <ViewStage
                key={stage.id}
                stageRef={stage.ref}
                stageInfo={state.context.stageInfo}
              />
              {i === stage.length - 1 && <ViewStageButton />}
            </>
          );
        }) && (
          <ViewStage
            key={tailStage.id}
            stageInfo={state.context.stageInfo}
            stageRef={tailStage.ref}
            tailStage={true}
          />
        )}
    </ViewBarDiv>
  );
};