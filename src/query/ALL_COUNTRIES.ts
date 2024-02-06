import { gql } from "@apollo/client";

const ALL_COUNTRIES = gql`
  query Query {
    countries {
      code
      name
      phone
      native
      currency
      emoji
      emojiU
      languages {
        code
        name
        native
        rtl
      }
      continent {
        code
        name
      }
    }
  }
`;
export default ALL_COUNTRIES;
