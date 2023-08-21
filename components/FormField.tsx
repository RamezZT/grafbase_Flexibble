type Props = {
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  setState: (value: string) => void;
  classnames?: string;
};

const FormField = ({
  type,
  title,
  state,
  placeholder,
  isTextArea,
  setState,
  classnames,
}: Props) => {
  return (
    <div className={`flexStart flex-col w-full  gap-4 pb-4 ${classnames}`}>
      <label className="w-full text-gray-100" htmlFor="">
        {title}
      </label>

      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={state}
          required
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      ) : (
        <input
          type={type || "text"}
          placeholder={placeholder}
          value={state}
          required
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      )}
    </div>
  );
};

export default FormField;
