import styles from "./empty.module.scss";

export const Empty = () => {
  return (
    <div className={styles.empty}>
      <p>銘柄が登録されていません。</p>
    </div>
  );
};
