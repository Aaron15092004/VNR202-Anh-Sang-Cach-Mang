import { Link } from "react-router-dom";

const BackHomeButton = ({
  className = "",
  label = "Trang chủ",
  to = "/",
  variant = "floating",
}) => {
  const variantClass = `vnr-back-home-btn--${variant}`;
  const classes = ["vnr-back-home-btn", variantClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Link to={to} className={classes} aria-label={label}>
      <i className="bi bi-house-door-fill" aria-hidden="true"></i>
      <span className="vnr-back-home-btn__text">{label}</span>
    </Link>
  );
};

export default BackHomeButton;
