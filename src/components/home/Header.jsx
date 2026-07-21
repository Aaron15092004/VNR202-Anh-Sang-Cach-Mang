import React, { useState } from "react";

import logoDang from "../../assets/images/logo/logo-dang.svg";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  return (
    <>
      {/* Skip Links - BEFORE header */}
      <div>
        <a className="sr-only sr-only-focusable" href="#main-navigation">
          Skip to navigation
        </a>
        <a className="sr-only sr-only-focusable" href="#themeskipto-mobilenav">
          Skip to navigation
        </a>
        <a className="sr-only sr-only-focusable" href="#themeskipto-search">
          Bỏ qua tới tìm kiếm
        </a>
        <a className="sr-only sr-only-focusable" href="#themeskipto-login">
          Bỏ qua tới biểu mẫu đăng nhập
        </a>
        <a className="sr-only sr-only-focusable" href="#maincontent">
          Skip to main content
        </a>
        <a className="sr-only sr-only-focusable" href="#acsb-menu_launcher">
          Skip to accessibility options
        </a>
        <a className="sr-only sr-only-focusable" href="#footer">
          Skip to footer
        </a>
      </div>

      {/* Accessibility Menu Button */}
      <a className="sr-only sr-only-focusable" href="#skip_acsb-menu">
        Skip accessibility options
      </a>
      <button
        id="acsb-menu_launcher"
        type="button"
        className="acsb-trigger"
        aria-label="Accessibility options"
      >
        <span className="acsb-icon-main">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm161.5-86.1c-12.2-5.2-26.3 .4-31.5 12.6s.4 26.3 12.6 31.5l11.9 5.1c17.3 7.4 35.2 12.9 53.6 16.3v50.1c0 4.3-.7 8.6-2.1 12.6l-28.7 86.1c-4.2 12.6 2.6 26.2 15.2 30.4s26.2-2.6 30.4-15.2l24.4-73.2c1.3-3.8 4.8-6.4 8.8-6.4s7.6 2.6 8.8 6.4l24.4 73.2c4.2 12.6 17.8 19.4 30.4 15.2s19.4-17.8 15.2-30.4l-28.7-86.1c-1.4-4.1-2.1-8.3-2.1-12.6V235.5c18.4-3.5 36.3-8.9 53.6-16.3l11.9-5.1c12.2-5.2 17.8-19.3 12.6-31.5s-19.3-17.8-31.5-12.6L338.7 175c-26.1 11.2-54.2 17-82.7 17s-56.5-5.8-82.7-17l-11.9-5.1zM256 160a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
          </svg>
        </span>
        <span className="acsb-icon-check">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
          </svg>
        </span>
      </button>
      <span id="skip_acsb-menu"></span>

      {/* Header */}
      <header id="main-header" style={{}}>
        <div className="mb2notices"></div>
        <div className="header-innner">
          <div className="header-inner2">
            <div id="master-header">
              <div className="master-header-inner">
                <div className="master-header-inner-bg">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="flexcols">
                          {/* Logo */}
                          <div className="logo-wrap">
                            <div className="main-logo">
                              <a
                                href="/"
                                aria-label="Ánh Sáng Của Đảng - Lịch sử Đảng Cộng sản Việt Nam"
                              >
                                <img
                                  className="logo-light is_svg"
                                  src={logoDang}
                                  alt="Ánh Sáng Của Đảng"
                                />
                                <img
                                  className="logo-dark is_svg"
                                  src={logoDang}
                                  alt="Ánh Sáng Của Đảng"
                                />
                                <span className="logo-brand-text">
                                  <span className="logo-brand-title">
                                    Ánh Sáng Của Đảng
                                  </span>
                                  <span className="logo-brand-subtitle">
                                    Lịch sử Đảng Cộng sản Việt Nam
                                  </span>
                                </span>
                              </a>
                            </div>
                          </div>

                          {/* Mobile Menu Toggle */}
                          <div className="menu-toggle">
                            <span id="themeskipto-mobilenav"></span>
                            <button
                              className="show-menu themereset p-0 lhsmall d-inline-flex justify-content-center align-items-center"
                              aria-controls="main-navigation"
                              aria-expanded={isMobileMenuOpen}
                              onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                              }
                            >
                              <span className="sr-only">Menu</span>
                              <i
                                className={`icon1 bi ${isMobileMenuOpen ? "d-none" : "bi-list"}`}
                                aria-hidden="true"
                              ></i>
                              <i
                                className={`icon2 bi ${isMobileMenuOpen ? "bi-x-lg" : "d-none"}`}
                                aria-hidden="true"
                              ></i>
                            </button>
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
      </header>

      {/* Login Modal */}
      <div
        id="header-modal-login"
        className={`modal theme-modal-scale theme-forms login ${showLoginModal ? "show" : ""}`}
        role="dialog"
        tabIndex="0"
        aria-labelledby="header-modal-login"
        aria-describedby="header-modal-login"
        aria-modal="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="theme-modal-container">
              <button
                className="close-container themereset p-0 lhsmall position-absolute d-inline-flex justify-content-center align-items-center"
                data-dismiss="modal"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowLoginModal(false)}
              >
                <i className="bi bi-x-lg" aria-hidden="true"></i>
                <span className="sr-only"> Close</span>
              </button>
              <div
                id="login_69724aa54684d"
                className="theme-loginform panel-item panel-login"
              >
                <h2 className="h4">Khu vực học tập VNR202</h2>
                <div className="potentialidps">
                  <h2 className="sr-only">Liên kết học tập:</h2>
                  <div className="potentialidplist">
                    <div className="potentialidp">
                      <a
                        className="btn btn-socimage btn-Google"
                        href="/courses"
                      >
                        <span className="btn-image" aria-hidden="true">
                          <img
                            src="https://accounts.google.com/favicon.ico"
                            alt="Google"
                          />
                        </span>
                        <span className="btn-text">Vào chuyên đề VNR202</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="text-separator">
                  <div>
                    <span>hoặc</span>
                  </div>
                </div>
                <form
                  id="header-form-login"
                  className="mb-2"
                  onSubmit={(event) => event.preventDefault()}
                >
                  <div className="form-field">
                    <label htmlFor="login-username">
                      <i className="ri-user-3-line"></i>
                    </label>
                    <input
                      id="login-username"
                      type="text"
                      name="username"
                      placeholder="Mã sinh viên"
                      aria-label="Mã sinh viên"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="login-password">
                      <i className="ri-lock-line"></i>
                    </label>
                    <input
                      id="login-password"
                      type="password"
                      name="password"
                      placeholder="Mật khẩu"
                      aria-label="Mật khẩu"
                    />
                    <span
                      className="themereset pass_show"
                      data-show="Show"
                      data-hide="Hide"
                      aria-hidden="true"
                    >
                      Hiện
                    </span>
                  </div>
                  <span className="login-info">
                    Tính năng đăng nhập không sử dụng trong bản học tập tĩnh.
                  </span>
                  <input
                    className="mb2-pb-btn typeprimary"
                    type="button"
                    value="Đóng"
                    onClick={() => setShowLoginModal(false)}
                  />
                </form>
              </div>
              <button
                className="themereset themekeynavonly"
                data-dismiss="modal"
                data-bs-dismiss="modal"
                onClick={() => setShowLoginModal(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <div
        id="header-modal-search"
        className={`modal theme-modal-scale theme-forms search ${showSearchModal ? "show" : ""}`}
        role="dialog"
        tabIndex="0"
        aria-labelledby="header-modal-search"
        aria-describedby="header-modal-search"
        aria-modal="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="theme-modal-container">
              <button
                className="close-container themereset p-0 lhsmall position-absolute d-inline-flex justify-content-center align-items-center"
                data-dismiss="modal"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowSearchModal(false)}
              >
                <i className="bi bi-x-lg" aria-hidden="true"></i>
                <span className="sr-only"> Close</span>
              </button>
              <div
                id="search_69724aa546f22"
                className="theme-searchform panel-item panel-search"
              >
                <div className="form-inner">
                  <form
                    id="theme-search"
                    onSubmit={(event) => event.preventDefault()}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <input
                      id="theme-searchbox"
                      type="text"
                      defaultValue=""
                      placeholder="Tìm chuyên đề VNR202"
                      name="search"
                    />
                    <button
                      className="mb2-pb-btn typeprimary p-0"
                      type="submit"
                      aria-label="Tìm kiếm VNR202"
                    >
                      <i className="ri-search-line"></i>
                    </button>
                  </form>
                </div>
              </div>
              <button
                className="themereset themekeynavonly"
                data-dismiss="modal"
                data-bs-dismiss="modal"
                onClick={() => setShowSearchModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
