import { useState } from "react";
import { coursesData } from "../data/coursesData";
import "../styles/courses/courses.css";
import BackHomeButton from "../components/common/BackHomeButton";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const Courses = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleTopicChange = (e) => {
    const topicId = e.target.value;
    if (topicId) {
      const topic = coursesData.find((t) => t.id === topicId);
      setSelectedTopic(topic);
    } else {
      setSelectedTopic(null);
    }
  };

  const renderContent = () => {
    if (!selectedTopic) {
      return (
        <div className="text-center py-5 text-muted">
          <i
            className="bi bi-book display-1"
            style={{ color: "var(--secondary-color)", opacity: 0.3 }}
          ></i>
          <h5 className="mt-3">
            Vui lòng chọn một chủ đề từ danh sách bên trên
          </h5>
        </div>
      );
    }

    return (
      <div className="d-flex flex-column gap-3">
        {selectedTopic.cac_van_de.map((vd) => (
          <div key={vd.stt} className="question-item bg-light rounded-3 p-3">
            <div className="d-flex align-items-start gap-3">
              <span
                className="badge rounded-pill text-white d-flex align-items-center justify-content-center"
                style={{
                  background: "var(--primary-color)",
                  width: "32px",
                  height: "32px",
                  fontSize: "14px",
                }}
              >
                {vd.stt}
              </span>
              <div className="flex-grow-1">
                <h6
                  className="fw-bold mb-2"
                  style={{ color: "var(--secondary-color)" }}
                >
                  {vd.van_de}
                </h6>
                <p className="mb-0 text-secondary">{vd.noi_dung}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderMindmap = () => {
    if (!selectedTopic) {
      return (
        <div className="text-center">
          <i
            className="bi bi-diagram-3 display-1 text-muted opacity-25"
            style={{ color: "var(--secondary-color)" }}
          ></i>
          <p className="mt-3 text-muted mb-0 fw-semibold">Ảnh sơ đồ tư duy</p>
          <small className="text-muted">Sẽ hiển thị khi có dữ liệu</small>
        </div>
      );
    }

    if (selectedTopic.mindmap_url && selectedTopic.mindmap_url.trim() !== "") {
      return (
        <Zoom>
          <img
            src={selectedTopic.mindmap_url}
            className="img-fluid rounded"
            alt="Sơ đồ tư duy"
            style={{ cursor: "zoom-in" }}
          />
        </Zoom>
      );
    }

    return (
      <div className="text-center">
        <i
          className="bi bi-diagram-3 display-1 text-muted opacity-25"
          style={{ color: "var(--secondary-color)" }}
        ></i>
        <p className="mt-3 text-muted mb-0 fw-semibold">Ảnh sơ đồ tư duy</p>
        <small className="text-muted">Chưa có dữ liệu</small>
      </div>
    );
  };

  return (
    <div className="lich-su-dang-wrapper container-fluid p-4">
      {/* Header */}
      <div
        className="courses-hero position-relative rounded-4 shadow-lg p-4 mb-4 text-center"
      >
        <BackHomeButton />
        <h1 className="mb-2 fw-bold">
          <i className="bi bi-book"></i> Chuyên đề VNR202
        </h1>
        <p className="mb-0 fs-5">
          <i className="bi bi-lightbulb"></i> Học Lịch sử Đảng Cộng sản Việt Nam theo từng chủ đề
        </p>
      </div>

      {/* Topic Dropdown Selector */}
      <div className="bg-white rounded-4 shadow p-4 mb-4">
        <div
          htmlFor="topicSelect"
          className="form-label fw-bold fs-5"
          style={{ color: "var(--secondary-color)" }}
        >
          <i className="bi bi-journal-text"></i> Chọn chuyên đề VNR202:
        </div>
        <select
          id="topicSelect"
          className="form-select form-select-lg"
          value={selectedTopic?.id || ""}
          onChange={handleTopicChange}
          style={{ borderColor: "var(--primary-color)" }}
        >
          <option value="">-- Vui lòng chọn một chuyên đề --</option>
          {coursesData.map((topic, index) => (
            <option key={topic.id} value={topic.id}>
              Chủ đề {index + 1}: {topic.tieu_de}
            </option>
          ))}
        </select>
      </div>

      {/* Content Area: 2 Columns */}
      <div className="row g-4">
        {/* Left Column - Nội dung bài học */}
        <div className="col-lg-7">
          <div
            className="bg-white rounded-4 shadow p-4"
            style={{ minHeight: "500px" }}
          >
            <div className="border-bottom pb-3 mb-4">
              <h3
                className="mb-0 fw-bold"
                style={{ color: "var(--secondary-color)" }}
              >
                <i className="bi bi-book-half"></i>{" "}
                {selectedTopic ? selectedTopic.tieu_de : "Nội dung chuyên đề"}
              </h3>
            </div>
            <div>{renderContent()}</div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-lg-5">
          {/* Câu nói hay */}
          <div className="quote-box rounded-4 shadow p-4 mb-4">
            <h5
              className="mb-3 fw-bold"
              style={{ color: "var(--secondary-color)" }}
            >
              <i className="bi bi-quote"></i> Câu nói hay
            </h5>
            <p className="fst-italic mb-0">
              {selectedTopic
                ? selectedTopic.cau_noi_hay
                : "Chọn một chủ đề để xem câu nói hay..."}
            </p>
          </div>

          {/* Ảnh sơ đồ tư duy */}
          <div className="mindmap-box rounded-4 shadow p-4 d-flex align-items-center justify-content-center">
            {renderMindmap()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
