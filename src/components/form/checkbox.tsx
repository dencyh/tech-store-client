import React from "react";

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  name: string;
  value: string;
  onChange: ({ name, value }: { name: string; value: string }) => void;
}

const Checkbox: React.FC<Props> = ({
  label,
  name,
  value,
  onChange,
  ...rest
}) => {
  const [checked, setChecked] = value;
  return (
    <label className="checkbox_label">
      <input
        className="check_input"
        type="checkbox"
        name={name}
        value={value}
        onChange={(e) => onChange({ name, value: value })}
        {...rest}
      />
      <span className="custom_checkbox"></span>
      {label}
    </label>
  );
};

export default React.memo(Checkbox);
