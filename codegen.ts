import * as cli from "@graphql-codegen/cli";
import dotenv from "dotenv";

dotenv.config();

const config: cli.CodegenConfig = {
  schema: "http://localhost:5000/graphql",
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  generates: {
    "./src/graphql/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;