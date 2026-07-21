import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { quizQuestions } from "../data/quizData";
import logoImg from "../assets/images/logo/logo-dang.svg";
import bgImg from "../assets/images/background/bg_0.png";
import clockImg from "../assets/images/clock/clock.png";
import "../styles/quiz/quiz.css";

const QuizPage = () => {
  // ============ STATE ============
  const [showModal, setShowModal] = useState(true);
  const [quizConfig, setQuizConfig] = useState({
    numberOfQuestions: 10,
    chapter: "random",
    difficulty: "random",
  });
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [progress, setProgress] = useState(25);
  const [timeLeft, setTimeLeft] = useState(300);

  const navigate = useNavigate();

  // Get unique chapters from quizQuestions
  const chapters = [...new Set(quizQuestions.map((q) => q.chapter))].sort(
    (a, b) => a - b,
  );

  // ============ FILTER QUESTIONS ============
  const handleStartQuiz = () => {
    let filtered = [...quizQuestions];

    // Filter by chapter
    if (quizConfig.chapter !== "random") {
      filtered = filtered.filter(
        (q) => q.chapter === parseInt(quizConfig.chapter),
      );
    }

    // Filter by difficulty
    if (quizConfig.difficulty !== "random") {
      filtered = filtered.filter(
        (q) => q.difficulty === parseInt(quizConfig.difficulty),
      );
    }

    // Shuffle and limit questions
    const shuffled = filtered.sort(() => Math.random() - 0.5);
    const limited = shuffled.slice(0, parseInt(quizConfig.numberOfQuestions));

    if (limited.length === 0) {
      alert("Không tìm thấy câu hỏi phù hợp với cấu hình đã chọn!");
      return;
    }

    setFilteredQuestions(limited);
    setShowModal(false);
    setProgress((1 / limited.length) * 100);
  };

  const totalQuestions = filteredQuestions.length;
  const currentData = filteredQuestions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];

  // ============ SUBMIT QUIZ ============
  const handleSubmit = () => {
    let score = 0;
    Object.keys(selectedAnswers).forEach((qIndex) => {
      const answerIndex = selectedAnswers[qIndex];
      const correctIndex = filteredQuestions[qIndex].correctAnswer;
      if (answerIndex === correctIndex) {
        score++;
      }
    });

    navigate("/quiz/results", {
      state: {
        score,
        total: totalQuestions,
        percentage: (score / totalQuestions) * 100,
      },
    });
  };

  // ============ TIMER COUNTDOWN ============
  useEffect(() => {
    if (showModal || !filteredQuestions.length) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showModal, filteredQuestions]);

  // Format time MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // ============ HANDLE SELECT ANSWER ============
  const handleSelectAnswer = (index) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: index,
    });
  };

  // ============ NAVIGATION ============
  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      const newProgress = ((currentQuestion + 2) / totalQuestions) * 100;
      setProgress(newProgress);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const newProgress = (currentQuestion / totalQuestions) * 100;
      setProgress(newProgress);
    }
  };

  // ============ RENDER ============
  return (
    <div className="wrapper overflow-hidden position-relative">
      {/* ========== CONFIGURATION MODAL ========== */}
      {showModal && (
        <div className="quiz-config-modal">
          <div className="modal-content-custom">
            <h2 className="modal-title-custom">Cấu hình trắc nghiệm VNR202</h2>

            <div>
              {/* Number of Questions */}
              <div className="config-label">
                <i className="bi bi-list-ol me-2"></i>
                Số lượng câu hỏi
              </div>
              <select
                id="select-1"
                className="config-select"
                value={quizConfig.numberOfQuestions}
                onChange={(e) =>
                  setQuizConfig({
                    ...quizConfig,
                    numberOfQuestions: e.target.value,
                  })
                }
              >
                <option value="10">10 câu</option>
                <option value="30">30 câu</option>
                <option value="50">50 câu</option>
                <option value="100">100 câu</option>
                <option value={quizQuestions.length}>
                  Tất cả ({quizQuestions.length} câu)
                </option>
              </select>

              {/* Chapter Selection */}
              <div className="config-label">
                <i className="bi bi-book me-2"></i>
                Chuyên đề
              </div>
              <select
                id="select-2"
                className="config-select"
                value={quizConfig.chapter}
                onChange={(e) =>
                  setQuizConfig({
                    ...quizConfig,
                    chapter: e.target.value,
                  })
                }
              >
                <option value="random">Ngẫu nhiên (Tất cả chuyên đề)</option>
                {chapters.map((chapter) => (
                  <option key={chapter} value={chapter}>
                    Chuyên đề {chapter}
                  </option>
                ))}
              </select>

              {/* Difficulty Selection */}
              <div className="config-label">
                <i className="bi bi-speedometer2 me-2"></i>
                Độ khó
              </div>
              <select
                id="select-3"
                className="config-select"
                value={quizConfig.difficulty}
                onChange={(e) =>
                  setQuizConfig({
                    ...quizConfig,
                    difficulty: e.target.value,
                  })
                }
              >
                <option value="random">Ngẫu nhiên (Tất cả độ khó)</option>
                <option value="0">Dễ</option>
                <option value="1">Trung bình</option>
                <option value="2">Khó</option>
              </select>

              {/* Start Button */}
              <button className="start-quiz-btn" onClick={handleStartQuiz}>
                <i className="bi bi-play-fill"></i>
                Bắt đầu ôn tập
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== QUIZ CONTENT ========== */}
      {!showModal && filteredQuestions.length > 0 && (
        <div
          style={{
            width: "100%",
            paddingRight: "var(--bs-gutter-x, 0.75rem)",
            paddingLeft: "var(--bs-gutter-x, 0.75rem)",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginLeft: "-0.75rem",
              marginRight: "-0.75rem",
            }}
          >
            {/* ========== LEFT SIDEBAR ========== */}
            <div className="col-lg-4">
              <div className="steps_area step_area_fixed">
                {/* Logo */}
                <div className="form_logo position-absolute ps-5 pt-5">
                  <img className="d-none d-lg-block" src={logoImg} alt="Ánh Sáng Của Đảng" />
                </div>

                {/* Background Image */}
                <div className="image_holder">
                  <img
                    className="overflow-hidden d-none d-lg-block"
                    src={currentData?.image || bgImg}
                    alt="background"
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="form_btn">
                  {currentQuestion > 0 && (
                    <button className="prev_btn" onClick={handlePrev}>
                      <i className="bi bi-arrow-left"></i>
                      Câu trước
                    </button>
                  )}

                  <button className="next_btn" onClick={handleNext}>
                    {currentQuestion === totalQuestions - 1 ? (
                      <>
                        Nộp bài
                        <i className="bi bi-check-circle"></i>
                      </>
                    ) : (
                      <>
                        Câu tiếp
                        <i className="bi bi-arrow-right"></i>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* ========== RIGHT CONTENT ========== */}
            <div className="col-lg-8 pt-5 form_wrapper overflow-hidden">
              {/* Timer */}
              <div className="step_content text-center pt-3">
                <div className="count_clock">
                  <img src={clockImg} alt="clock" />
                </div>
                <div className="count_number countdown_timer pt-1">
                  <span>{formatTime(timeLeft)}</span>
                </div>
              </div>

              {/* Question */}
              <div className="form_content">
                <div className="question_title py-5 text-white">
                  <h1 className="text-center text-uppercase overflow-hidden rounded-pill">
                    {currentData.question}
                  </h1>
                </div>

                {/* Options */}
                <div className="form_items">
                  <div className="row">
                    {currentData.options.map((option, index) => (
                      <div key={index} className="col-md-6 mb-3">
                        <label
                          className={`quiz-option ${selectedAnswer === index ? "active" : ""}`}
                          onClick={() => handleSelectAnswer(index)}
                        >
                          <span>{option}</span>
                          <input
                            type="radio"
                            name={`question_${currentQuestion}`}
                            value={option}
                            checked={selectedAnswer === index}
                            onChange={() => {}}
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="d-flex justify-content-center pt-4 pb-5">
                <div className="progress-wrap">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${progress}%` }}
                      aria-valuenow={progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>

                  <div className="steps_number">
                    {filteredQuestions.map((_, index) => (
                      <div key={index} className="step">
                        <span
                          className={`${index <= currentQuestion ? "active" : ""} ${index < currentQuestion ? "finish" : ""}`}
                        >
                          {index + 1}
                        </span>
                        <p
                          className={`${index <= currentQuestion ? "active" : ""} ${index < currentQuestion ? "finish" : ""}`}
                        >
                          Câu {index + 1}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
