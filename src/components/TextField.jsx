import { useField } from 'formik';

export const TextField = ({ label, className, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={className}>
      <label htmlFor={field.name} className="block">
        {label}
      </label>
      <input
        className={`form-input border border-gray-300 transition duration-300 focus:border-transparent focus:ring-2 ${
          meta.touched && meta.error
            ? 'focus:ring-red-300'
            : 'focus:ring-gray-300'
        }
        }`}
        {...field}
        {...props}
        autoComplete="off"
      />
      {meta.touched && meta.error ? (
        <div className={`text-sm text-red-400 mt-0.5`}>{meta.error}</div>
      ) : null}
    </div>
  );
};

