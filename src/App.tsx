import { Autocomplete } from "./Autocomplete";
import { fetchCountriesOptions } from "./fetchCountriesOptions";

function App() {
  return (
    <div className="App">
      <Autocomplete
        placeholder="Select Country"
        getOptions={fetchCountriesOptions}
        onSelect={(country) => {
          alert(`Selected country: ${country?.label}`);
        }}
      />
    </div>
  );
}

export default App;
