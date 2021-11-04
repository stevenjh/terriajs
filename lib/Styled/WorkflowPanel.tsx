import { action } from "mobx";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import ViewState from "../ReactViewModels/ViewState";
import Button from "./Button";
import { IconProps, StyledIcon } from "./Icon";
import { addTerriaScrollbarStyles } from "./mixins";
import Text from "./Text";
import Portal from "../ReactViews/StandardUserInterface/Portal";

export const WorkflowPanelPortalId = "worfklow-panel-portal";

type PropsType = {
  viewState: ViewState;
  title: string;
  icon: IconProps["glyph"];
  onClose: () => void;
  closeButtonText: string;
};

const WorkflowPanel: React.FC<PropsType> = props => {
  const viewState = props.viewState;

  useEffect(
    action(function hideTerriaSidePanelOnMount() {
      viewState.showTerriaSidePanel = false;
      return action(() => (viewState.showTerriaSidePanel = true));
    })
  );

  return (
    <Portal viewState={viewState} id={WorkflowPanelPortalId}>
      <Container>
        <TitleBar>
          <Icon glyph={props.icon} />
          <Title>{props.title}</Title>
          <CloseButton onClick={props.onClose}>
            {props.closeButtonText}
          </CloseButton>
        </TitleBar>
        <Content>
          <ErrorBoundary viewState={viewState}>{props.children}</ErrorBoundary>
        </Content>
      </Container>
    </Portal>
  );
};

type ErrorBoundaryProps = {
  viewState: ViewState;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    this.props.viewState.terria.raiseErrorToUser(error);
  }

  render() {
    return this.state.hasError ? (
      <Error>
        An error occured when running the workflow. Please try re-loading the
        app if the error persists.
      </Error>
    ) : (
      this.props.children
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${p => p.theme.fontPop}px;
  width: ${p => p.theme.workflowPanelWidth}px;
  height: 100vh;
  max-width: ${p => p.theme.workflowPanelWidth}px;
  box-sizing: border-box;
`;

const TitleBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.7em;
  border-bottom: 1px solid ${p => p.theme.darkLighter};
`;

const Title = styled(Text).attrs({
  textLight: true,
  bold: true
})`
  flex-grow: 1;
  padding: 0 1em;
`;

const Icon = styled(StyledIcon).attrs({
  styledWidth: "24px",
  styledHeight: "24px",
  light: true
})``;

const Content = styled.div`
  flex-grow: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
  ${addTerriaScrollbarStyles()}
`;

const CloseButton = styled(Button).attrs({
  secondary: true
})`
  border: 0px;
  border-radius: 3px;
  min-height: 0;
  padding: 3px 12px;
`;

const Error = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${p => p.theme.textLight};
  font-size: 14px;
`;

export default WorkflowPanel;
