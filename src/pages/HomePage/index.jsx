import styles from "./styles/index.module.css";
import { ProManageIcon } from "../../ui/icons/ProManageIcon";
import { Navbar } from "../../components/Navbar/index.jsx";
import { LogoutButton } from "../../ui/logoutButton/index.jsx";

export const HomePage = () => {
  const items = [
    { to: "/", text: "Pro Manage", Icon: ProManageIcon },
    { to: "/dashboard", text: "Dashboard", Icon: ProManageIcon },
    { to: "/board", text: "Board", Icon: ProManageIcon },
    { to: "/analytics", text: "Analytics", Icon: ProManageIcon },
    { to: "/settings", text: "Settings", Icon: ProManageIcon },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>header</div>
      <div className={styles.main}>
        <section>section</section>
      </div>
      <div className={styles.navbar}>
        <Navbar
          items={items}
          logout={<LogoutButton onClick={() => console.log("logout")} />}
        />
      </div>
    </div>
  );
};
