import * as React from "react";
import styled from "@emotion/styled";
import { FaHashtag } from "react-icons/fa";
import "../ArticleList.scss";

const Self = styled.div`
  margin-right: 1rem;
  transition: color 0.2s;
  display: inline-block;
  font-weight: 300;
  text-overflow: ellipsis;
  label: Keyword;
`;

const Icon = styled(FaHashtag)`
  margin-right: 0.5rem;
  font-weight: 300;
`;

export default function Keyword({ keyword }: { keyword: string }) {
  return (
    <Self>
      <Icon size={10} />
      {keyword}
    </Self>
  );
}
