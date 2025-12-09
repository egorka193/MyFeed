import { useState } from "react";
import { PageContainer } from "@/shared/ui/PageContainer/PageContainer";
import { PostsDropdown } from "@/shared/ui/PostsDropDown/PostsDropDown";
import { PostFilterType } from "@/shared/types/api-types";
import { PostsListWidget } from "@/widgets/PostsListWidget/PostsListWidget";

export const MainPage: React.FC = () => {
  const [filter, setFilter] = useState<PostFilterType>(PostFilterType.New);

  return (
    <PageContainer>
      <PostsDropdown value={filter} onChange={setFilter} />
      <PostsListWidget filter={filter} />
    </PageContainer>
  );
};
