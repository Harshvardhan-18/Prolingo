import { StickyWrapper } from "@/components/sticky-wrapper";
import { FeedWrapper } from "@/components/feed-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";

const LearnPage = () => {
  return (
    <div className=" flex  gap-[48px] px-6">
      <FeedWrapper>
      <Header title="Python"/>
      </FeedWrapper>
      <StickyWrapper>
        <UserProgress
        activeCourse={{title: 'Python', ImageSrc: '/python.svg'}}
        hearts={5}
        points={100}
        hasActiveSubscription={false}
        />
      </StickyWrapper>
    </div>
  );
};

export default LearnPage;
