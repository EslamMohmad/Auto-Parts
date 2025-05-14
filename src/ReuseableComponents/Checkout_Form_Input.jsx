import { useState } from "react";

const Checkout_Form_Input = ({
  label,
  inputType,
  placeholder,
  name,
  required,
  style = null,
  value = "",
}) => {
  const [state, setState] = useState(value);

  return (
    <>
      <label
        htmlFor={name}
        className="py-4 block text-center text-xs text-black/60 w-full"
      >
        {label} <span>* </span>
      </label>
      <input
        {...(value
          ? { defaultValue: state }
          : { onChange: (e) => setState(e.target.value) })}
        form="billing-opration"
        name={name}
        id={name}
        type={inputType}
        {...(placeholder ? { placeholder } : null)}
        {...(required ? { required } : null)}
        className={`w-full py-4  px-4 border border-black/10 rounded-md focus:border-black hover:border-black transition-colors outline-none text-sm placeholder:text-black/30 ${style}`}
      />
    </>
  );
};

export default Checkout_Form_Input;
