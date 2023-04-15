import {
  ChangeEventHandler,
  useCallback, useMemo, useState
} from "react";
import { useFetchData } from "./useFetchData";
import { useDebouncedFn } from "./useDebouncedFn";

export type Option<T> = {
  label: string;
  value: T;
};

const autocompleteInitialState = {
  isOpened: false,
  activeIndex: -1,
  inputValue: "",
};

const useDebouncedFetch = <TRes extends unknown>(fetchFn: () => Promise<TRes>) => {
  const debouncedFetch = useDebouncedFn(fetchFn);
  return useFetchData(debouncedFetch)
}

const getSelectedOptionIndex = (options: Option<unknown>[] | null, selectedOption: Option<unknown> | null) => 
options?.findIndex((opt) => opt.label === selectedOption?.label) ?? -1

export const useAutocomplete = <TVal extends unknown>(
  getOptions: (inputValue: string) => Promise<Option<TVal>[]>
) => {
  const [autocompleteState, setAutocompleteState] = useState(autocompleteInitialState);

  const fetchOptions = useCallback(
    () => getOptions(autocompleteState.inputValue),
    [getOptions, autocompleteState.inputValue]
  );
  const { data: options, isLoading: isOptionsLoading } = useDebouncedFetch(fetchOptions);
  const [selectedOption, setSelectedOption] = useState<Option<TVal> | null>(
    null
  );

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setAutocompleteState({
      isOpened: true,
      activeIndex: getSelectedOptionIndex(options, selectedOption),
      inputValue: e.target.value,
    });
  }, [options, selectedOption]);

  const closeAutocomplete = useCallback(
    () => setAutocompleteState(autocompleteInitialState),
    []
  );

  const handleSelect = useCallback(
    (option: Option<TVal> | null) => {
      setSelectedOption(option);
      closeAutocomplete();
    },
    [closeAutocomplete, setSelectedOption]
  );

  const openAutocomplete = useCallback(() => {
    setAutocompleteState({
      isOpened: true,
      inputValue: "",
      activeIndex: getSelectedOptionIndex(options ?? [], selectedOption),
    });
  }, [options, selectedOption]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (options) {
        switch (event.key) {
          case "ArrowUp":
            event.preventDefault();
            setAutocompleteState((prev) => ({
              ...prev,
              activeIndex: prev.activeIndex > 0
                ? prev.activeIndex - 1
                : options.length - 1,
            }));
            break;
          case "ArrowDown":
            event.preventDefault();
            setAutocompleteState((prev) => {
              return {
                ...prev,
                activeIndex: prev.activeIndex < options.length - 1
                  ? prev.activeIndex + 1
                  : 0,
              };
            });
            break;
          case "Enter":
            if (!autocompleteState.isOpened) {
              openAutocomplete();
            } else if (autocompleteState.activeIndex > -1) {
              handleSelect(options[autocompleteState.activeIndex]);
            }
            break;
          case "Escape":
            closeAutocomplete();
            break;
        }
      }
    },
    [
      closeAutocomplete,
      autocompleteState.activeIndex,
      autocompleteState.isOpened,
      handleSelect,
      openAutocomplete,
      options,
    ]
  );

  return useMemo(
    () => ({
      autocompleteState,
      onChange,
      handleKeyDown,
      openAutocomplete,
      closeAutocomplete,
      onSelect: handleSelect,
      selectedOption,
      isOptionsLoading,
      options,
    }),
    [
      autocompleteState,
      onChange,
      handleKeyDown,
      openAutocomplete,
      closeAutocomplete,
      handleSelect,
      selectedOption,
      isOptionsLoading,
      options,
    ]
  );
};
