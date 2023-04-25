import React from "react";
import styles from "./search-bar.module.scss";

type Props = {
  placeholder: string;
  search: (searchValue: string) => void;
};

const SearchBarComponent: React.FC<Props> = ({ placeholder, search }) => {
  return (
    <input
      type="text"
      className={`${styles.searchText} form-control`}
      placeholder={placeholder}
      onChange={(e) => search(e.target.value)}
    />
  );
};

SearchBarComponent.displayName = "SearchBar";
export const SearchBar = React.memo(SearchBarComponent);
