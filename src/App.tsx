import { Autocomplete, Option } from "./Autocomplete";

const fetchOptions = (val: string) =>
  new Promise<Option<string>[]>((res) => {
    setTimeout(() => {
      res([
        {
          label: "new",
          value: "new",
        },
        {
          label: "old",
          value: "old",
        },
        {
          label: "laptop",
          value: "macBook",
        },
        {
          label: "tablet",
          value: "iPad",
        },
        {
          label: "mobile",
          value: "iPhone",
        },
      ].filter((option) =>
        option.label.toLocaleLowerCase().includes(val.toLocaleLowerCase())
      ));
    }, 300);
  });

function App() {
  return (
    <div className="App">
      <Autocomplete getOptions={fetchOptions} onSelect={console.log} />
    </div>
  );
}

export default App;
