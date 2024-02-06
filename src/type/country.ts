import Continent from "./continent";
import Language from "./language";

type Country = {
  code: string;
  name: string;
  phone: string;
  native: string;
  currency: string | undefined;
  emoji: string;
  emojiU: string;
  languages: Language[];
  continent: Continent;
};
export default Country;
