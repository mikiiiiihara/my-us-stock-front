import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: "./**/*.graphql",
  generates: {
    "src/gql/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
  config: {
    skipTypename: false,
    withHOC: false,
    withComponent: false, //出力するファイルを一つに設定する
    scalars: {
      uniqueidentifier: "string",
    },
  },
};

export default config;
