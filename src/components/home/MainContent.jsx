import { useState } from "react";
import demoCert from "../../assets/images/demo_certificates.svg";
import { Link } from "react-router-dom";

const heroCover = "/hero/flag-cover.png";
const archivePoster = "/dang-95-nam.svg";

const oldQuoteBadge =
  "https://lmsstyle.com/theme/new-learning/pluginfile.php/1/local_mb2builder/images/demo_logos.png";
const oldShapeBackground =
  'url("https://lmsstyle.com/theme/new-learning/theme/image.php/mb2nl/local_mb2builder/1722369476/sample-data/2024/07/bg_shape_yellow")';

const journeyMilestones = [
  {
    year: "1930",
    title: "Thành lập Đảng Cộng sản Việt Nam",
    text: "Ngày 3/2/1930, dưới sự chủ trì của Nguyễn Ái Quốc, Hội nghị hợp nhất các tổ chức cộng sản đã thành lập Đảng Cộng sản Việt Nam và thông qua Cương lĩnh chính trị đầu tiên. Đây là bước ngoặt lịch sử, chấm dứt khủng hoảng về đường lối cứu nước kéo dài từ cuối thế kỷ XIX.",
  },
  {
    year: "1930-1939",
    title: "Cao trào cách mạng và phong trào dân chủ",
    text: "Cao trào Xô Viết Nghệ Tĩnh 1930-1931 là cuộc tổng diễn tập đầu tiên của cách mạng Việt Nam. Đến 1936-1939, Đảng chuyển hướng đấu tranh đòi dân sinh, dân chủ trong điều kiện hợp pháp, nửa hợp pháp, tích lũy thêm kinh nghiệm chỉ đạo phong trào quần chúng rộng lớn.",
  },
  {
    year: "1939-1945",
    title: "Chuẩn bị lực lượng, Tổng khởi nghĩa Tháng Tám",
    text: "Đảng chuyển hướng chiến lược, đặt nhiệm vụ giải phóng dân tộc lên hàng đầu, thành lập Mặt trận Việt Minh và xây dựng lực lượng vũ trang, căn cứ địa. Chớp đúng thời cơ Nhật đầu hàng Đồng minh, cả dân tộc vùng lên Tổng khởi nghĩa, khai sinh nước Việt Nam Dân chủ Cộng hòa ngày 2/9/1945.",
  },
  {
    year: "1946-1954",
    title: "Kháng chiến chống Pháp, chiến thắng Điện Biên Phủ",
    text: "Với đường lối kháng chiến toàn dân, toàn diện, trường kỳ và tự lực cánh sinh, quân dân ta từng bước làm thất bại các kế hoạch quân sự của thực dân Pháp. Chiến dịch Điện Biên Phủ năm 1954 toàn thắng, 'lừng lẫy năm châu, chấn động địa cầu', buộc Pháp ký Hiệp định Genève.",
  },
  {
    year: "1954-1975",
    title: "Kháng chiến chống Mỹ, cứu nước",
    text: "Đảng lãnh đạo nhân dân hai miền vừa xây dựng chủ nghĩa xã hội ở miền Bắc, vừa đánh bại lần lượt các chiến lược chiến tranh của Mỹ ở miền Nam. Kết hợp đấu tranh quân sự với đấu tranh ngoại giao tại Hội nghị Paris, tạo thế và lực cho thắng lợi cuối cùng.",
  },
  {
    year: "1975",
    title: "Đại thắng mùa Xuân, non sông thu về một mối",
    text: "Chiến dịch Hồ Chí Minh lịch sử kết thúc thắng lợi ngày 30/4/1975, giải phóng hoàn toàn miền Nam. Đất nước thống nhất, mở ra kỷ nguyên độc lập, tự do và đi lên chủ nghĩa xã hội trên phạm vi cả nước.",
  },
  {
    year: "1986-nay",
    title: "Đổi mới và phát triển đất nước",
    text: "Đại hội Đảng toàn quốc lần thứ VI (1986) khởi xướng công cuộc Đổi mới toàn diện. Sau gần 40 năm, Việt Nam từ một nước nghèo đã vươn lên trở thành nền kinh tế năng động, hội nhập sâu rộng với thế giới dưới ánh sáng soi đường của Đảng.",
  },
];

const MainContent = () => {
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState(
    "Bước vào hành trình cách mạng",
  );
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const languages = ["Bước vào hành trình cách mạng"];

  return (
    <div className="pagelayout-content d-flex flex-column">
      {/* Page Content */}
      <div className="page-b">
        <div id="main-content">

                    {/* Page Builder Content */}
                    <div className="mb2-pb-fpsection position-relative pre-bg0 hidden0 light">
                      <div
                        className="section-inner"
                        style={{ paddingTop: "0px", paddingBottom: "0px" }}
                      >
                        {/* Hero Section */}
                        <div
                          className="mb2-pb-row pre-bg0 dark bgfixed0 wave-none va0 bgfixed0 wavefliph1 wavepos0 colgutter-s parallax0 heroimg1 herovbottom herogradl0 herogradr0 bgtextmob0 waveover1 heroonsmall0 bordert0 borderb0 borderfw1 obgimg1 heroisimg isfw0 isbg rowpt-150 rowpb-100"
                          style={{
                            position: "relative",
                            overflow: "hidden",
                            marginTop: "0px",
                            "--mb-pb-row_btcolor": "#dddddd",
                            "--mb-pb-row_bbcolor": "#dddddd",
                            "--mb-pb-row_btw": "1px",
                            "--mb-pb-row_bbw": "1px",
                            "--mb-pb-row_pt": "170px",
                            "--mb-pb-row_pb": "110px",
                          }}
                        >
                          <video
                            className="vnr-hero-video"
                            autoPlay
                            loop
                            muted
                            playsInline
                            poster={heroCover}
                            style={{
                              position: "absolute",
                              inset: 0,
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              zIndex: 0,
                            }}
                          >
                            <source src="/hero/flag-bg.mp4" type="video/mp4" />
                          </video>
                          <div
                            aria-hidden="true"
                            style={{
                              position: "absolute",
                              inset: 0,
                              zIndex: 1,
                              background:
                                "linear-gradient(120deg, rgba(27, 67, 50, 0.45), rgba(27, 67, 50, 0.15))",
                            }}
                          />
                          <div
                            className="section-inner mb2-pb-row-inner"
                            style={{ position: "relative", zIndex: 2 }}
                          >
                            <div className="row-topgap w-100"></div>
                            <div className="container-fluid">
                              <div className="row">
                                <div className="mb2-pb-column col-lg-12 noempty light align-none aligncnone mobcenter1 moborder0">
                                  <div
                                    className="column-inner"
                                    style={{
                                      paddingBottom: "30px",
                                      maxWidth: "622px",
                                    }}
                                  >
                                    <div className="clearfix">
                                      <h4
                                        style={{
                                          marginTop: "0px",
                                          marginBottom: "45px",
                                          maxWidth: "2000px",
                                          marginLeft: "auto",
                                          marginRight: "auto",
                                          fontSize: "2.9rem",
                                          "--mb2-pb-heading-thshadow": "0.06em",
                                          "--mb2-pb-heading-tvshadow": "0.04em",
                                          "--mb2-pb-heading-tbshadow": "0px",
                                          "--mb2-pb-heading-tcshadow":
                                            "transparent",
                                        }}
                                        id="typed_69724aa5441fb"
                                        className="heading heading-none upper0 fwglobal lhglobal pbtsize-2 vnr-hero-in vnr-hero-in-1"
                                      >
                                        <span className="btext fwglobal">
                                          Ánh Sáng Của Đảng
                                        </span>
                                        <span className="headingtext fwglobal nline0 vnr-shine-text">
                                          {" "}
                                          Soi Đường Dân Tộc Việt Nam
                                        </span>
                                      </h4>

                                      {/* Select Dropdown */}
                                      <div
                                        id="select_69724aa54422f"
                                        className="mb2-pb-select isimage0 layouth label1 center0 vnr-hero-in vnr-hero-in-2"
                                        style={{
                                          marginTop: "0px",
                                          marginBottom: "45px",
                                          "--mb-pb-selecth": "51px",
                                          "--mb-pb-selectmh": "80",
                                          "--mb-pb-selectfs": "1.18rem",
                                          "--mb-pb-swidth": "287px",
                                        }}
                                        data-target="0"
                                      >
                                        <div className="select-label">
                                          <span className="labeltext">
                                            “Thắp lại ngọn lửa cách mạng — soi
                                            sáng con đường Đảng đã dẫn dắt dân
                                            tộc, tiếp truyền bản lĩnh và khí
                                            phách cho thế hệ hôm nay.”
                                          </span>
                                        </div>
                                        <div className="select-container">
                                          <div className="select-dropdown">
                                            <button
                                              type="button"
                                              id="select_69724aa54422f_btn"
                                              className="mb2-pb-select-btn rounded-1 d-inline-flex align-items-center"
                                              tabIndex="-1"
                                              onClick={() =>
                                                setIsSelectOpen(!isSelectOpen)
                                              }
                                            >
                                              <span className="select-btn-text">
                                                {selectedLanguage}
                                              </span>
                                              <span
                                                className="select-btn-arrow mb2ml-auto"
                                                aria-hidden="true"
                                              ></span>
                                            </button>
                                            <div
                                              id="select_69724aa54422f_items"
                                              className={`select-items-container ${isSelectOpen ? "active" : ""}`}
                                              data-id="select_69724aa54422f"
                                              tabIndex="-1"
                                            >
                                              <ul>
                                                {languages.map((lang) => (
                                                  <li
                                                    key={lang}
                                                    className="mb2-pb-select_item position-relative d-flex align-items-center"
                                                    data-link="#"
                                                    tabIndex="-1"
                                                    onClick={() => {
                                                      setSelectedLanguage(lang);
                                                      setIsSelectOpen(false);
                                                    }}
                                                  >
                                                    <div className="select-item-inner lhsmall d-inline-flex align-items-center">
                                                      <span className="select-text">
                                                        {lang}
                                                      </span>
                                                    </div>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          </div>
                                          <div className="select-button">
                                            <Link
                                              to="/courses"
                                              className="mb2-pb-btn lhsmall rounded-1 btnborder1 fwglobal typeprimary"
                                              style={{
                                                "--mb2-pb-btn-color":
                                                  "rgb(244, 163, 0)",
                                                "--mb2-pb-btn-bghcolor":
                                                  "rgb(244, 163, 0)",
                                                "--mb2-pb-btn-hcolor":
                                                  "rgb(27, 43, 31)",
                                                "--mb2-pb-btn-borcolor":
                                                  "rgb(244, 163, 0)",
                                              }}
                                            >
                                              Xem chuyên đề
                                            </Link>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Feature List */}
                                      <div
                                        className="mb2-pb-listicon vnr-hero-in vnr-hero-in-3"
                                        style={{ marginBottom: "30px" }}
                                      >
                                        <ul
                                          className="theme-listicon mb2-pb-sortable-subelements iconbg1 horizontal1 border0 fwbold alignnone"
                                          style={{
                                            "--mb2-pb-listicon-fs": "1rem",
                                            "--mb2-pb-listicon-isize":
                                              "2.74rem",
                                            "--mb2-pb-listicon-space":
                                              "1.87rem",
                                          }}
                                        >
                                          <li className="mb2-pb-listicon_item">
                                            <div className="item-content">
                                              <span
                                                className="iconel d-inline-flex justify-content-center align-items-center"
                                                style={{
                                                  backgroundColor:
                                                    "rgb(244, 163, 0)",
                                                  color: "rgb(27, 67, 50)",
                                                }}
                                              >
                                                <i className="bi bi-check-lg"></i>
                                              </span>
                                              <span
                                                className="list-text"
                                                style={{
                                                  color: "rgb(45, 106, 79)",
                                                }}
                                              >
                                                Theo dấu chân Đảng qua từng
                                                chuyên đề
                                              </span>
                                            </div>
                                          </li>
                                          <li className="mb2-pb-listicon_item">
                                            <div className="item-content">
                                              <span
                                                className="iconel d-inline-flex justify-content-center align-items-center"
                                                style={{
                                                  backgroundColor:
                                                    "rgb(244, 163, 0)",
                                                  color: "rgb(27, 67, 50)",
                                                }}
                                              >
                                                <i className="bi bi-check-lg"></i>
                                              </span>
                                              <span
                                                className="list-text"
                                                style={{
                                                  color: "rgb(45, 106, 79)",
                                                }}
                                              >
                                                Tôi luyện bản lĩnh qua trắc
                                                nghiệm
                                              </span>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Trusted By Section */}
                        <div
                          className="mb2-pb-row pre-bg0 light bgfixed0 wave-none va0 bgfixed0 wavefliph0 wavepos0 colgutter-s parallax0 heroimg0 herovcenter herogradl0 herogradr0 bgtextmob0 waveover1 heroonsmall1 bordert0 borderb0 borderfw1 obgimg1 heroisvideo isfw0 nobg rowpt-50 rowpb-0"
                          style={{
                            marginTop: "0px",
                            "--mb-pb-row_btcolor": "#dddddd",
                            "--mb-pb-row_bbcolor": "#dddddd",
                            "--mb-pb-row_btw": "1px",
                            "--mb-pb-row_bbw": "1px",
                            "--mb-pb-row_pt": "60px",
                            "--mb-pb-row_pb": "0px",
                          }}
                        >
                          <div className="section-inner mb2-pb-row-inner">
                            <div className="row-topgap w-100"></div>
                            <div className="container-fluid">
                              <div className="row">
                                <div className="mb2-pb-column col-lg-12 noempty light align-none aligncnone mobcenter0 moborder0">
                                  <div
                                    className="column-inner"
                                    style={{
                                      paddingBottom: "30px",
                                      maxWidth: "2000px",
                                    }}
                                  >
                                    <div className="clearfix">
                                      <h4
                                        style={{
                                          marginTop: "0px",
                                          marginBottom: "30px",
                                          maxWidth: "2000px",
                                          marginLeft: "auto",
                                          marginRight: "auto",
                                          fontSize: "1.25rem",
                                          "--mb2-pb-heading-thshadow": "0.06em",
                                          "--mb2-pb-heading-tvshadow": "0.04em",
                                          "--mb2-pb-heading-tbshadow": "0px",
                                          "--mb2-pb-heading-tcshadow":
                                            "transparent",
                                        }}
                                        id="typed_69724aa544346"
                                        className="heading heading-center upper0 fwglobal lhglobal pbtsize-1"
                                      >
                                        <span
                                          className="headingtext fwglobal nline0"
                                          style={{ color: "#2d6a4f" }}
                                        >
                                          “Không có gì quý hơn độc lập, tự do.”
                                          - Chủ tịch Hồ Chí Minh
                                        </span>
                                      </h4>
                                      <div
                                        className="mb2-image align-none center1"
                                        style={{
                                          marginBottom: "30px",
                                          width: "450px",
                                          maxWidth: "100%",
                                        }}
                                      >
                                        <img
                                          className="lazy"
                                          src={oldQuoteBadge}
                                          data-src={oldQuoteBadge}
                                          alt=""
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div
                            className="mb2-pb-row pre-bg0 light bgfixed0 wave-none va0 bgfixed0 wavefliph0 wavepos0 colgutter-s parallax0 heroimg0 herovcenter herogradl0 herogradr0 bgtextmob0 waveover1 heroonsmall1 bordert0 borderb0 borderfw1 obgimg1 heroisvideo isfw0 nobg rowpt-0 rowpb-0"
                            style={{
                              "--mb-pb-row_bbcolor": "#dddddd",
                              "--mb-pb-row_bbw": "1px",
                              "--mb-pb-row_btcolor": "#dddddd",
                              "--mb-pb-row_btw": "1px",
                              "--mb-pb-row_pb": "0px",
                              "--mb-pb-row_pt": "0px",
                              marginTop: "0px",
                            }}
                          >
                            <div className="section-inner mb2-pb-row-inner">
                              <div className="container-fluid">
                                <div className="row">
                                  <div className="mb2-pb-column col-lg-12 noempty light align-none aligncnone mobcenter0 moborder0">
                                    <div
                                      className="column-inner"
                                      style={{
                                        maxWidth: "4000px",
                                        paddingBottom: "30px",
                                      }}
                                    >
                                      <div className="clearfix">
                                        <div
                                          className="theme-text"
                                          style={{
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                            maxWidth: "2000px",
                                          }}
                                        >
                                          <div
                                            className="theme-text-inner align-none text-hcm-red rounded0 gradient0 light"
                                            style={{
                                              "--mb2-pb-graddeg": "180deg",
                                            }}
                                          >
                                            <div
                                              className="theme-text-text upper0 fwbold lhglobal"
                                              style={{
                                                color: "rgb(45, 106, 79)",
                                                fontSize: "1rem",
                                              }}
                                            >
                                              <p>Ngọn lửa cách mạng đang chờ bạn</p>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="vnr-section-label">
                                          <span>Tôi Luyện Bản Lĩnh</span>
                                        </div>
                                        <h3 className="vnr-section-title">
                                          Tôi Luyện Bản Lĩnh Qua Từng Thử Thách
                                        </h3>
                                        <p className="vnr-section-desc">
                                          Hòa quyện lý luận sắc bén, những dấu son lịch sử và trải
                                          nghiệm ôn luyện sống động — tiếp thêm bản lĩnh để bạn vững
                                          bước trên con đường Đảng đã chọn.
                                        </p>

                                        <div className="vnr-feature-cards">
                                          <Link to="/quiz" className="vnr-feature-card vnr-feature-card--quiz">
                                            <div className="vnr-feature-card-top">
                                              <div className="vnr-feature-card-icon">
                                                <i className="bi bi-pencil-square"></i>
                                              </div>
                                            </div>
                                            <div className="vnr-feature-card-badge">Trắc nghiệm</div>
                                            <div className="vnr-feature-card-body">
                                              <h4>Trắc nghiệm VNR202</h4>
                                              <p>Rèn giũa trí tuệ qua từng câu hỏi, khắc sâu mỗi chặng đường lịch sử vẻ vang của Đảng.</p>
                                              <span className="vnr-feature-card-cta">
                                                Bắt đầu ôn tập <i className="bi bi-arrow-right"></i>
                                              </span>
                                            </div>
                                          </Link>

                                          <Link to="/flip" className="vnr-feature-card vnr-feature-card--flip">
                                            <div className="vnr-feature-card-top">
                                              <div className="vnr-feature-card-icon">
                                                <i className="bi bi-collection"></i>
                                              </div>
                                            </div>
                                            <div className="vnr-feature-card-badge">Thẻ nhớ</div>
                                            <div className="vnr-feature-card-body">
                                              <h4>Lật Thẻ VNR202</h4>
                                              <p>Lật mở từng trang sử vàng — khắc ghi nhân vật, mốc son và cột mốc hào hùng chỉ trong chớp mắt.</p>
                                              <span className="vnr-feature-card-cta">
                                                Chơi thẻ nhớ <i className="bi bi-arrow-right"></i>
                                              </span>
                                            </div>
                                          </Link>

                                          <Link to="/game" className="vnr-feature-card vnr-feature-card--game">
                                            <div className="vnr-feature-card-top">
                                              <div className="vnr-feature-card-icon">
                                                <i className="bi bi-crosshair"></i>
                                              </div>
                                            </div>
                                            <div className="vnr-feature-card-badge">Game</div>
                                            <div className="vnr-feature-card-body">
                                              <h4>Pháo Binh Điện Biên</h4>
                                              <p>Điều khiển pháo binh, tiêu diệt cứ điểm Him Lam, Đồi A1 và hầm De Castries trong chiến dịch Điện Biên Phủ.</p>
                                              <span className="vnr-feature-card-cta">
                                                Vào chơi <i className="bi bi-arrow-right"></i>
                                              </span>
                                            </div>
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="mb2-pb-row pre-bg0 light bgfixed0 wave-none va0 bgfixed0 wavefliph0 wavepos0 colgutter-s parallax0 heroimg0 herovcenter herogradl0 herogradr0 bgtextmob0 waveover1 heroonsmall1 bordert0 borderb0 borderfw1 obgimg1 heroisvideo isfw0 nobg rowpt-50 rowpb-0"
                            style={{
                              "--mb-pb-row_bbcolor": "#dddddd",
                              "--mb-pb-row_bbw": "1px",
                              "--mb-pb-row_btcolor": "#dddddd",
                              "--mb-pb-row_btw": "1px",
                              "--mb-pb-row_pb": "0px",
                              "--mb-pb-row_pt": "50px",
                              marginTop: "0px",
                            }}
                          >
                            <div className="section-inner mb2-pb-row-inner">
                              <div className="row-topgap w-100" />
                              <div className="container-fluid">
                                <div className="row">
                                  <div className="mb2-pb-column col-lg-12 noempty light align-none aligncnone mobcenter1 moborder0">
                                    <div
                                      className="column-inner"
                                      style={{
                                        maxWidth: "2000px",
                                        paddingBottom: "30px",
                                      }}
                                    >
                                      <div className="clearfix">
                                        <div
                                          className="mb2-pb-ba position-relative align-items-end imgpos-left iscontent1 imgcrop0 imgvalignend imgonsm0 rounded0 shadow1 paddingnormal d-flex flex-column justify-content-center"
                                          style={{
                                            "--mb-pb-ba_bgcolor":
                                              "rgb(255, 235, 156)",
                                            "--mb-pb-ba_color": "rgb(79, 76, 81)",
                                            "--mb-pb-ba_cwidth": "610px",
                                            "--mb-pb-ba_imghpos": "-11%",
                                            "--mb-pb-ba_tcolor": "rgb(27, 43, 31)",
                                            backgroundImage: oldShapeBackground,
                                            marginBottom: "30px",
                                            minHeight: "560px",
                                            overflow: "visible",
                                          }}
                                        >
                                          <div className="mb2-pb-ba_inner position-relative">
                                            <div className="mb2-pb-ba_title">
                                              <h4
                                                className="ba_title title mb-0 pbtsize-2 fwglobal lhglobal"
                                                style={{
                                                  fontSize: "2.3rem",
                                                }}
                                              >
                                                <span className="title-text">
                                                  Kho Tư Liệu Soi Sáng Con
                                                  Đường Cách Mạng
                                                </span>
                                              </h4>
                                            </div>
                                            <div
                                              className="mb2-pb-ba_content fwglobal lhglobal"
                                              style={{
                                                fontSize: "1rem",
                                                marginTop: "1.9rem",
                                              }}
                                            >
                                              <p>
                                                Trọn vẹn tư liệu, những dấu
                                                son lịch sử và bài học được
                                                Đảng soi lối, biên soạn mạch
                                                lạc để bạn khắc sâu từng trang
                                                sử vàng của dân tộc.
                                              </p>
                                              <img
                                                alt="Huy hiệu Ánh Sáng Của Đảng"
                                                src={demoCert}
                                                style={{
                                                  marginTop: "0.9rem",
                                                }}
                                                width="280"
                                              />
                                            </div>
                                            <div
                                              className="mb2-pb-ba_btn"
                                              style={{
                                                marginTop: "2.1rem",
                                              }}
                                            >
                                              <Link
                                                className="mb2-pb-btn sizexlg rounded-1 btnborder0"
                                                to="/courses"
                                                style={{
                                                  "--mb2-pb-btn-bgcolor":
                                                    "rgb(45, 106, 79)",
                                                  "--mb2-pb-btn-bghcolor":
                                                    "rgb(27, 67, 50)",
                                                }}
                                              >
                                                Khám phá kho tư liệu
                                              </Link>
                                            </div>
                                          </div>
                                          <div
                                            aria-hidden="true"
                                            className="ba_img d-flex position-absolute w-100 h-100"
                                          >
                                            <div className="ba_img2 d-flex position-relative w-100">
                                              <div
                                                className="ba_img3 position-absolute"
                                                style={{
                                                  "--mb2-pb-ba_imgmt": "0px",
                                                  width: "min(760px, 90vw)",
                                                  maxWidth: "none",
                                                }}
                                              >
                                                <img
                                                  alt="Kỷ niệm 95 năm ngày thành lập Đảng Cộng sản Việt Nam"
                                                  className="ba_img_img lazy"
                                                  data-src={archivePoster}
                                                  src={archivePoster}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <section className="vnr-journey-section">
                            <div className="vnr-journey-inner">
                              <div className="vnr-journey-head journey-reveal">
                                <span className="vnr-journey-kicker">
                                  95 năm dưới ánh sáng của Đảng
                                </span>
                                <h3>Từ ngày thành lập đến công cuộc Đổi mới</h3>
                                <p>
                                  Từ năm 1930 đến nay, Đảng Cộng sản Việt Nam đã
                                  dẫn dắt dân tộc qua các cuộc đấu tranh giành
                                  độc lập, thống nhất đất nước và công cuộc đổi
                                  mới, phát triển. Nhấn vào từng mốc để xem chi
                                  tiết dấu son lịch sử.
                                </p>
                              </div>

                              <div className="vnr-thread-wrap journey-reveal">
                                <div className="vnr-thread-line">
                                  <div
                                    className="vnr-thread-fill"
                                    style={{
                                      width: `${
                                        (activeMilestone /
                                          (journeyMilestones.length - 1)) *
                                        100
                                      }%`,
                                    }}
                                  />
                                </div>
                                <div className="vnr-thread-points">
                                  {journeyMilestones.map((milestone, index) => (
                                    <button
                                      key={milestone.year}
                                      type="button"
                                      className={`vnr-thread-point${
                                        index === activeMilestone
                                          ? " active"
                                          : ""
                                      }`}
                                      onClick={() => setActiveMilestone(index)}
                                      aria-label={`Xem mốc ${milestone.year}`}
                                      aria-pressed={index === activeMilestone}
                                    >
                                      <span className="vnr-thread-point-year">
                                        {milestone.year}
                                      </span>
                                    </button>
                                  ))}
                                </div>
                                <div
                                  className="vnr-thread-detail"
                                  key={activeMilestone}
                                >
                                  <div className="vnr-thread-stamp">
                                    <span className="vnr-thread-stamp-year">
                                      {journeyMilestones[activeMilestone].year}
                                    </span>
                                    Mốc son
                                  </div>
                                  <div className="vnr-thread-detail-text">
                                    <h4>
                                      {journeyMilestones[activeMilestone].title}
                                    </h4>
                                    <p>
                                      {journeyMilestones[activeMilestone].text}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>

                          {/* Era 1: Su ra doi va vai tro lanh dao gianh chinh quyen */}
                          <section className="vnr-section-pad">
                            <div className="vnr-era-inner">
                              <div className="vnr-era-head scroll-reveal">
                                <span className="vnr-era-kicker">
                                  Chặng thứ nhất · 1930 – 1945
                                </span>
                                <h3>
                                  Sự ra đời và vai trò lãnh đạo giành chính
                                  quyền
                                </h3>
                                <p>
                                  Trước bối cảnh các phong trào yêu nước theo
                                  khuynh hướng phong kiến và tư sản lần lượt
                                  thất bại, Nguyễn Ái Quốc đã chuẩn bị các điều
                                  kiện về tư tưởng, chính trị và tổ chức, dẫn
                                  tới Hội nghị hợp nhất thành lập Đảng.
                                </p>
                              </div>
                              <div className="vnr-era-grid scroll-reveal">
                                <div className="vnr-era-card">
                                  <span className="vnr-era-num">01</span>
                                  <h4>Bối cảnh lịch sử</h4>
                                  <p>
                                    Cuối thế kỷ XIX – đầu thế kỷ XX, các phong
                                    trào Cần Vương, Đông Du, Duy Tân lần lượt
                                    thất bại vì thiếu một đường lối cứu nước
                                    đúng đắn.
                                  </p>
                                </div>
                                <div className="vnr-era-card">
                                  <span className="vnr-era-num">02</span>
                                  <h4>Hội nghị hợp nhất</h4>
                                  <p>
                                    Ngày 3/2/1930, Hội nghị hợp nhất các tổ
                                    chức cộng sản diễn ra dưới sự chủ trì của
                                    Nguyễn Ái Quốc, chấm dứt khủng hoảng về
                                    đường lối cứu nước.
                                  </p>
                                </div>
                                <div className="vnr-era-card">
                                  <span className="vnr-era-num">03</span>
                                  <h4>Cách mạng Tháng Tám</h4>
                                  <p>
                                    Nghệ thuật chớp thời cơ đưa đến thắng lợi
                                    năm 1945, khai sinh nước Việt Nam Dân chủ
                                    Cộng hòa – nhà nước công nông đầu tiên ở
                                    Đông Nam Á.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </section>

                          {/* Era 2: Khang chien, kien quoc, thong nhat dat nuoc */}
                          <section className="vnr-section-pad alt">
                            <div className="vnr-era-inner">
                              <div className="vnr-era-head scroll-reveal">
                                <span className="vnr-era-kicker">
                                  Chặng thứ hai · 1945 – 1975
                                </span>
                                <h3>
                                  Lãnh đạo kháng chiến, kiến quốc và thống nhất
                                  đất nước
                                </h3>
                                <p>
                                  Đường lối "kháng chiến, kiến quốc" gắn liền
                                  nhiệm vụ chống ngoại xâm với xây dựng chế độ
                                  mới, kết tinh qua hai cuộc kháng chiến chống
                                  thực dân Pháp và đế quốc Mỹ.
                                </p>
                              </div>
                              <div className="vnr-hexwrap scroll-reveal">
                                <div className="vnr-hex">
                                  <div className="vnr-hex-in">
                                    <b>1954</b>
                                    Chiến thắng Điện Biên Phủ, kết thúc kháng
                                    chiến chống thực dân Pháp.
                                  </div>
                                </div>
                                <div className="vnr-hex">
                                  <div className="vnr-hex-in">
                                    <b>1960</b>
                                    Đại hội III xác định đồng thời hai chiến
                                    lược cách mạng ở hai miền.
                                  </div>
                                </div>
                                <div className="vnr-hex">
                                  <div className="vnr-hex-in">
                                    <b>1973</b>
                                    Hiệp định Paris được ký kết, Mỹ rút quân
                                    khỏi miền Nam.
                                  </div>
                                </div>
                                <div className="vnr-hex">
                                  <div className="vnr-hex-in">
                                    <b>1975</b>
                                    Đại thắng mùa Xuân, giải phóng hoàn toàn
                                    miền Nam, thống nhất đất nước.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>

                          {/* Era 3: Doi moi, hoi nhap, hien dai hoa - data viz */}
                          <section className="vnr-section-pad">
                            <div className="vnr-era-inner">
                              <div className="vnr-era-head scroll-reveal">
                                <span className="vnr-era-kicker">
                                  Chặng thứ ba · 1986 – Nay
                                </span>
                                <h3>
                                  Công cuộc Đổi mới, hội nhập và hiện đại hóa
                                </h3>
                                <p>
                                  Đại hội VI (1986) tạo bước đột phá về tư duy
                                  kinh tế, chuyển từ kế hoạch hóa tập trung
                                  sang kinh tế thị trường định hướng xã hội
                                  chủ nghĩa, mở đường cho hội nhập quốc tế sâu
                                  rộng.
                                </p>
                              </div>
                              <div className="vnr-viz-grid scroll-reveal">
                                <div className="vnr-chart-card">
                                  <h4>
                                    Tăng trưởng GDP bình quân theo giai đoạn
                                    (%/năm)
                                  </h4>
                                  <div className="vnr-bars">
                                    <div
                                      className="vnr-bar"
                                      style={{ height: "45%" }}
                                    >
                                      <span className="vnr-bar-val">4.5%</span>
                                      <span className="vnr-bar-lbl">
                                        1986–90
                                      </span>
                                    </div>
                                    <div
                                      className="vnr-bar"
                                      style={{ height: "82%" }}
                                    >
                                      <span className="vnr-bar-val">8.2%</span>
                                      <span className="vnr-bar-lbl">
                                        1991–95
                                      </span>
                                    </div>
                                    <div
                                      className="vnr-bar"
                                      style={{ height: "73%" }}
                                    >
                                      <span className="vnr-bar-val">7.3%</span>
                                      <span className="vnr-bar-lbl">
                                        2001–10
                                      </span>
                                    </div>
                                    <div
                                      className="vnr-bar"
                                      style={{ height: "60%" }}
                                    >
                                      <span className="vnr-bar-val">6.0%</span>
                                      <span className="vnr-bar-lbl">
                                        2011–20
                                      </span>
                                    </div>
                                  </div>
                                  <p className="vnr-chart-note">
                                    Số liệu tổng hợp mang tính minh hoạ xu
                                    hướng, không phải số liệu thống kê chính
                                    thức tuyệt đối.
                                  </p>
                                </div>
                                <div className="vnr-chart-card">
                                  <h4>
                                    Lạm phát được kiểm soát dần qua các năm (%)
                                  </h4>
                                  <div className="vnr-bars">
                                    <div
                                      className="vnr-bar"
                                      style={{ height: "100%" }}
                                    >
                                      <span className="vnr-bar-val">774%</span>
                                      <span className="vnr-bar-lbl">1986</span>
                                    </div>
                                    <div
                                      className="vnr-bar"
                                      style={{ height: "40%" }}
                                    >
                                      <span className="vnr-bar-val">67%</span>
                                      <span className="vnr-bar-lbl">1990</span>
                                    </div>
                                    <div
                                      className="vnr-bar"
                                      style={{ height: "14%" }}
                                    >
                                      <span className="vnr-bar-val">
                                        12.7%
                                      </span>
                                      <span className="vnr-bar-lbl">1995</span>
                                    </div>
                                    <div
                                      className="vnr-bar"
                                      style={{ height: "5%" }}
                                    >
                                      <span className="vnr-bar-val">3.2%</span>
                                      <span className="vnr-bar-lbl">2020</span>
                                    </div>
                                  </div>
                                  <p className="vnr-chart-note">
                                    Số liệu tổng hợp mang tính minh hoạ xu
                                    hướng, không phải số liệu thống kê chính
                                    thức tuyệt đối.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </section>

                          {/* Thanh tuu + bai hoc kinh nghiem */}
                          <section className="vnr-section-pad alt">
                            <div className="vnr-era-inner">
                              <div className="vnr-era-head scroll-reveal">
                                <span className="vnr-era-kicker">
                                  Thành tựu & bài học
                                </span>
                                <h3>
                                  Thành tựu tiêu biểu sau gần 40 năm Đổi mới
                                </h3>
                                <p>
                                  Những con số phản ánh chặng đường chuyển
                                  mình của đất nước, cùng các bài học kinh
                                  nghiệm được đúc kết xuyên suốt quá trình
                                  lãnh đạo của Đảng.
                                </p>
                              </div>
                              <div className="vnr-ach-grid scroll-reveal">
                                <div className="vnr-ach-card">
                                  <span className="vnr-ach-big">2010</span>
                                  <span className="vnr-ach-lab">
                                    Thoát khỏi nhóm nước thu nhập thấp
                                  </span>
                                </div>
                                <div className="vnr-ach-card">
                                  <span className="vnr-ach-big">&lt;3%</span>
                                  <span className="vnr-ach-lab">
                                    Tỷ lệ hộ nghèo đa chiều (ước tính gần đây)
                                  </span>
                                </div>
                                <div className="vnr-ach-card">
                                  <span className="vnr-ach-big">90%+</span>
                                  <span className="vnr-ach-lab">
                                    Độ bao phủ bảo hiểm y tế toàn dân
                                  </span>
                                </div>
                                <div className="vnr-ach-card">
                                  <span className="vnr-ach-big">1995</span>
                                  <span className="vnr-ach-lab">
                                    Gia nhập ASEAN, mở đầu hội nhập khu vực
                                  </span>
                                </div>
                              </div>
                              <div
                                className="vnr-hexwrap scroll-reveal"
                                style={{ marginTop: "44px" }}
                              >
                                <div className="vnr-hex">
                                  <div className="vnr-hex-in">
                                    <b>Bài học 1</b>
                                    Kiên trì mục tiêu độc lập dân tộc gắn liền
                                    chủ nghĩa xã hội.
                                  </div>
                                </div>
                                <div className="vnr-hex">
                                  <div className="vnr-hex-in">
                                    <b>Bài học 2</b>
                                    Lấy dân làm gốc, thực hành dân chủ rộng
                                    rãi.
                                  </div>
                                </div>
                                <div className="vnr-hex">
                                  <div className="vnr-hex-in">
                                    <b>Bài học 3</b>
                                    Đổi mới toàn diện, đồng bộ và có bước đi
                                    phù hợp.
                                  </div>
                                </div>
                                <div className="vnr-hex">
                                  <div className="vnr-hex-in">
                                    <b>Bài học 4</b>
                                    Kết hợp sức mạnh dân tộc với sức mạnh thời
                                    đại.
                                  </div>
                                </div>
                                <div className="vnr-hex">
                                  <div className="vnr-hex-in">
                                    <b>Bài học 5</b>
                                    Không ngừng nâng cao năng lực lãnh đạo của
                                    Đảng.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                    </div>

      </div>
    </div>
    </div>
  );
};

export default MainContent;
