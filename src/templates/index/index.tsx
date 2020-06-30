import styles from "./index.module.scss";
import { Footer } from "@/templates/common/footer";
import React from "react";

type Props = {
  children?: React.ReactChild;
};

export const IndexTemplate = ({ children }: Props) => (
  <div className={styles.template}>
    <main className={styles.content}>{children}</main>
    <footer className={styles.footer}>
      <Footer />
    </footer>
  </div>
);
