import { memo, useEffect, useRef, useState } from "react";
import { setInputSearchStates, setSearchState } from "../Store/SearchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const SearchInput = ({ className, name, placeholder }) => {
  const { searchState, inputSearchStates } = useSelector(
    ({ SearchSlice }) => SearchSlice
  );

  const [inputFocus, setInputFocus] = useState(
    searchState.value ? true : false
  );
  const [inputValue, setInputValue] = useState("");

  const action = useDispatch();

  const inputRef = useRef();

  const { pathname } = useLocation();

  useEffect(() => {
    if (inputValue) {
      const debouncedInpur = setTimeout(() => {
        action(setSearchState({ state: true, value: inputValue }));
      }, 1000);
      return () => clearTimeout(debouncedInpur);
    } else action(setSearchState({ state: false, value: "" }));
  }, [inputValue]);

  useEffect(() => {
    setInputValue(searchState.value ? searchState.value : inputValue);
  }, [searchState.value]);

  useEffect(() => {
    setInputValue("");
    action(setSearchState({ state: false, value: "" }));
  }, [pathname, action]);

  useEffect(() => {
    action(setInputSearchStates({ inputValue, inputFocus }));
  }, [inputValue, inputFocus, action, setInputSearchStates]);

  return (
    <input
      ref={inputRef}
      type="text"
      onChange={() => setInputValue(inputRef.current.value)}
      onFocus={() => setInputFocus(true)}
      onBlur={() => !inputValue && setInputFocus(false)}
      value={inputSearchStates.inputValue}
      className={className}
      name={name}
      autoComplete="off"
      {...(placeholder ? { placeholder } : {})}
    />
  );
};

export default memo(SearchInput);
