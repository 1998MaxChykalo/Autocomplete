import { useRef } from "react";

import { highlightMatchedText } from "./highlightMatchedText";
import { useClickOutside, Option, useAutocomplete } from "./hooks";

import "./Autocomplete.css";

type CustomSelectProps<T> = {
  getOptions: (value: string) => Promise<Option<T>[]>;
  onSelect: (option: Option<T> | null) => void;
};

export const Autocomplete = <TVal extends unknown>({
  getOptions,
  onSelect,
}: CustomSelectProps<TVal>) => {
  const {
    autocompleteState,
    selectedOption,
    handleKeyDown,
    onChange,
    onSelect: selectOption,
    openAutocomplete,
    closeAutocomplete,
    options,
    isOptionsLoading,
  } = useAutocomplete<TVal>(getOptions);

  const autocompleteContainerRef = useRef<HTMLDivElement>(null);
  useClickOutside(autocompleteContainerRef, () => {
    debugger;
    closeAutocomplete()});

  return (
    <div className="autocomplete-container" ref={autocompleteContainerRef}>
      <div
        className="input-container"
        onClick={autocompleteState.isOpened ? closeAutocomplete : openAutocomplete}
      >
        <input
          className="input"
          type="text"
          value={autocompleteState.inputValue}
          onKeyDown={handleKeyDown}
          onChange={onChange}
        />
        {!autocompleteState.inputValue ? (
          <span
            className={`selected-value${
              autocompleteState.isOpened ? " selected-value--opened" : ""
            }`}
          >
            {selectedOption?.label ?? 'Select value'}
          </span>
        ) : null}
      </div>
      <div
        className={`autocomplete${
          autocompleteState.isOpened ? " autocomplete--opened" : ""
        }`}
      >
        {isOptionsLoading ? (
          <div className="spinner-container">
            <span className="spinner">Loading...</span>
          </div>
        ) : options?.length ? (
          options?.map((option, idx) => (
            <div
              key={option.label}
              className={`option${
                autocompleteState.activeIndex === idx ? " option--selected" : ""
              }`}
              onClick={() => {
                selectOption(option);
                onSelect(option);
              }}
            >
              {highlightMatchedText(option.label, autocompleteState.inputValue)}
            </div>
          ))
        ) : (
          <div className="no-data-container">
            No Data
          </div>
        )}
      </div>
    </div>
  );
};
