import { Outlet } from "react-router-dom";
import "../styles/quiz/quiz.css";

const QuizLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default QuizLayout;
