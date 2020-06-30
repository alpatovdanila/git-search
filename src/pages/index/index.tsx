import React from "react";
import { SearchForm } from "@/features/search/components/search-form";
import { FlexItem, FlexCol } from "@/ui/layout";
import styles from "./index.module.scss";
import { Footer } from "@/pages/common/footer";
import { Logo } from "@/ui/logo";

export const Index = () => {
  return (
    <div className={styles.template}>
      <main className={styles.content}>
        <FlexCol col spacing={48} block alignCenter fullHeight>
          <FlexItem>
            <Logo />
          </FlexItem>
          <FlexItem block>
            <SearchForm autoSubmitTimeout={500} />
          </FlexItem>
        </FlexCol>
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
};
