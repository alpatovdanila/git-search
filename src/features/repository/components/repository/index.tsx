import React from "react";
import styles from "./repository.module.scss";

import { FlexRow, FlexItem, Language, ForksCount, StarsCount } from "@/ui";

import { Repository as RepositoryType } from "@/features/repository/model/repository";
import { Link } from "@/ui/link";

type Props = {
  repository: RepositoryType;
};

export const Repository = ({ repository }: Props) => {
  const { url, name, description, language, stars, forks, author } = repository;

  return (
    <div className={styles.repository}>
      <FlexRow col spacing={16}>
        <FlexItem>
          <Link className={styles.heading} href={url}>
            {name}
          </Link>
        </FlexItem>

        {repository.description && (
          <FlexItem>
            <div className={styles.description}>{description}</div>
          </FlexItem>
        )}

        <FlexItem>
          <FlexRow spacing={16} valignCenter>
            <FlexItem>
              <Link href={author.url}>{author.name}</Link>
            </FlexItem>
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
