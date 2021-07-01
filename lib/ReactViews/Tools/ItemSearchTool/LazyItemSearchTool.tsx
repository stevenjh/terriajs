import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import CatalogMemberMixin from "../../../ModelMixins/CatalogMemberMixin";
import AnimatedSpinnerIcon from "../../../Styled/AnimatedSpinnerIcon";
import RaiseToUserErrorBoundary from "../../Errors/RaiseToUserErrorBoundary";
import { Frame, Main } from "../ToolModal";
import { PropsType } from "./ItemSearchTool";

const ItemSearchTool = React.lazy(() => import("./ItemSearchTool"));

/**
 * Lazily loads the item search tool while showing a the search window and an animated spinner.
 */
const LazyItemSearchTool: React.FC<PropsType> = props => {
  const { viewState, item } = props;
  const itemName = CatalogMemberMixin.isMixedInto(item) ? item.name : "Item";
  const [t] = useTranslation();

  return (
    <Suspense
      fallback={
        <Frame
          viewState={viewState}
          title={t("itemSearchTool.title", { itemName })}
        >
          <Wrapper>
            <AnimatedSpinnerIcon light styledWidth="25px" styledHeight="25px" />
          </Wrapper>
        </Frame>
      }
    >
      <RaiseToUserErrorBoundary viewState={viewState}>
        <ItemSearchTool {...props} />
      </RaiseToUserErrorBoundary>
    </Suspense>
  );
};

const Wrapper = styled(Main)`
  align-items: center;
  justify-content: center;
`;

export default LazyItemSearchTool;
