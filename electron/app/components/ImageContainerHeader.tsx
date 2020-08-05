import React from "react";
import styled from "styled-components";

import DropdownHandle from "./DropdownHandle";

type Props = {
  total: number;
  showSidebar: boolean;
  onShowSidebar: (show: boolean) => void;
};

const Wrapper = styled.div`
  background: ${({ theme }) => theme.background};
  display: grid;
  grid-template-columns: auto auto;
  padding-top: 5px;
  padding-bottom: 5px;

  > div {
    display: flex;
    align-items: center;
  }

  > div:last-child {
    justify-content: flex-end;
  }

  > div > div {
    display: inline-block;
  }
`;

const ImageContainerHeader = ({
  total = 0,
  showSidebar,
  onShowSidebar,
}: Props) => {
  return (
    <Wrapper>
      <div>
        <div>
          <DropdownHandle
            label="Display Options"
            expanded={showSidebar}
            onClick={onShowSidebar && (() => onShowSidebar(!showSidebar))}
          />
        </div>
      </div>
      <div>
        <div className="total">
          Viewing <strong>{total.toLocaleString()} samples</strong>
        </div>
      </div>
    </Wrapper>
  );
};

export default ImageContainerHeader;