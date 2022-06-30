import React from "react";

export const FormInput = React.forwardRef((props, ref) => {
  const { id, label, onChange } = props;
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        className="mobile-input col-12 rounded-pill"
        {...props}
        ref={ref}
        onChange={onChange}
      />

      {/* {error.hasError && <p className="count-text pt-2">{error.message}</p>} */}
    </div>
  );
});
