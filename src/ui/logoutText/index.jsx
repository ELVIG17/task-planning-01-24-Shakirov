export const LogoutText = ({ onClick, children = "Log out" }) => {
  return (
    <span
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) =>
        e.key === "Enter" || e.key === " " ? onClick?.() : null
      }
      style={{ cursor: "pointer" }}
    >
      {children}
    </span>
  );
};
