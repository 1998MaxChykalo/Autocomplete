import axios from "axios";
import { Option } from "./Autocomplete";

type CountryEntity = {
  name: {
    common: string;
  };
};
type FetchCountriesResponse = Array<CountryEntity>;

const adaptCountryToOption = (country: CountryEntity): Option => ({
  label: country.name.common,
  value: country.name.common,
});

export const fetchCountriesOptions = async (query: string): Promise<Option[]> =>
  query.length > 0
    ? axios
        .get<FetchCountriesResponse>(
          `https://restcountries.com/v3.1/name/${query}`
        )
        .then((res) => res.data.map(adaptCountryToOption))
    : [];
