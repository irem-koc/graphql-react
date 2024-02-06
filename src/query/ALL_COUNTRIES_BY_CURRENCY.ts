import { gql } from "@apollo/client";

const ALL_COUNTRIES_BY_CURRENCY = (term: string) => gql`
  query Query {
    countries(filter: { currency: { regex:"${term}" } }) {
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

export default ALL_COUNTRIES_BY_CURRENCY;
