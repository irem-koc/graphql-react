import { gql } from "@apollo/client";

const ALL_COUNTRIES_BY_CONTINENT = (term: string) => gql`
  query Query {
    countries(filter: { continent: { regex:"${term}" } }) {
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

export default ALL_COUNTRIES_BY_CONTINENT;
