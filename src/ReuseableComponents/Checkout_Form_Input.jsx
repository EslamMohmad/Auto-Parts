const Checkout_Form_Input = ({
  label,
  inputType,
  placeholder,
  name,
  required,
  style = null,
}) => {
  return (
    <>
      <label
        htmlFor={name}
        className="py-4 block text-center text-xs text-black/60 w-full"
      >
        {label} <span>* </span>
      </label>
      <input
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
