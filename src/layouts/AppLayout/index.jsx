import { Outlet } from "react-router";
import styles from "../AppLayout/style/index.module.css";

import { ProManageIcon } from "../../ui/icons/ProManageIcon/index.jsx";
import { Navbar } from "../../components/Navbar/index.jsx";
import { LogoutText } from "../../ui/logoutText/index.jsx";

export const AppLayout = () => {
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
        <Outlet />
      </div>

      <aside className={styles.navbar}>
        <div className={styles.brand}>
          <ProManageIcon />
          <p className={styles.headerOfNav}>Pro Manage</p>
        </div>

        <div className={styles.menuWrap}>
          <Navbar items={items} />
        </div>

        <div className={styles.logoutBut}>
          <ProManageIcon />
          <LogoutText onClick={() => console.log("logout")} />
        </div>
      </aside>
    </div>
  );
};
