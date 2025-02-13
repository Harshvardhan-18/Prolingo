import { getLesson, getUserProgress } from "@/db/queries";
import { Quiz } from "../quiz";
import { redirect } from "next/navigation";

type Props={
  params:{
    lessonId:number;
  }
}

const LessonIdPage = async({params}:Props) => {
  const lessonId = Number(params.lessonId); 
  if (isNaN(lessonId)) {
    redirect("/learn");
  }
    const lessonData=getLesson(lessonId);
    const userProgressData=getUserProgress();

    const [lesson,userProgress]=await Promise.all([
        lessonData,
        userProgressData
    ])
    if(!lesson || !userProgress){
        redirect("/learn");
    }
    const initialPercentage= lesson.challenges.filter((challenge)=>challenge.completed).length/lesson.challenges.length*100;
  return (
    <Quiz
    initialLessonId={lesson.id}
    initialLessonChallenges={lesson.challenges}
    initialHearts={userProgress.hearts}
    initialPercentage={initialPercentage}
    userSubscription={null}
    />
  )
}

export default LessonIdPage;