import { Select } from "antd";
import { Control, Controller } from "react-hook-form";

export type SelectOptions = {
    label: string | any;
    value: string;
};

type SelectFieldProps = {
    options: SelectOptions[];
    name: string;
    size?: "large" | "small";
    value?: string | string[] | undefined;
    placeholder?: string;
    label?: string | any;
    required?: boolean;
    className?: string;
    defaultValue?: SelectOptions;
    handleChange?: (el: string) => void;
    control: Control<any>
};

const AppFormSelect = ({
    name,
    size = "large",
    control,
    value,
    placeholder = "select",
    options,
    label,
    defaultValue,
    required,
    handleChange,
    className,
}: SelectFieldProps) => {

    return (
        <Controller
            control={control}
            name={name}
            rules={{
                required: `${name} field is required`
            }}
            defaultValue={defaultValue}
            render={({ field: { value: renderValue, onChange }, fieldState }) => (
                <div className='text-textDark'>
                    {label && <label className="text-sm font-medium" htmlFor={name}>{label}</label>}
                    <Select
                        onChange={handleChange ? handleChange : onChange}
                        size={size}
                        popupClassName="capitalize"
                        className={`${className ? className : ""} capitalize my-select`}
                        options={options}
                        value={value ? value : renderValue}
                        style={{ width: "100%" }}
                        placeholder={placeholder}
                    />
                    {fieldState.error && (
                        <p className="text-sm text-red font-normal">{fieldState.error?.message}</p>
                    )}
                </div>
            )}
        />
    );
};

export default AppFormSelect;
