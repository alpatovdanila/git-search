import React from "react";
import styles from "./repository.module.scss";
import { StarsCount } from "../stars-count";
import { ForksCount } from "../forks-count";
import { Language } from "../language";
import { FlexRow, FlexItem } from "../layout";
import { Repository as RepositoryType } from "@/features/repository/model/repository";

type Props = {
  repository: RepositoryType;
};

export const Repository = ({ repository }: Props) => {
  const { url, name, description, language, stars, forks } = repository;
  return (
    <div className={styles.repository}>
      <FlexRow col spacing={16}>
        <FlexItem>
          <div className={styles.url}>{name}</div>
        </FlexItem>

        {repository.description && (
          <FlexItem>
            <div className={styles.description}>{description}</div>
          </FlexItem>
        )}

        <FlexItem>
          <FlexRow spacing={16} valignCenter>
            {language && (
              <FlexItem>
                <Language languageAlias={language} />
              </FlexItem>
            )}
            <FlexItem>
              <StarsCount stars={stars} />
            </FlexItem>
            <FlexItem>
              <ForksCount forks={forks} />
            </FlexItem>
          </FlexRow>
        </FlexItem>
      </FlexRow>
    </div>
  );
};
