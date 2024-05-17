import { Select } from "antd";
import { Controller } from "react-hook-form";

type TAppSelectProps = {
    name: string;
    defaultValue?: string;
    placeholder?: string;
    options: {
        value: string;
        label: string;
    }[];
    control: any
}


const { Option } = Select;

const AppSelect = ({ name, options, defaultValue, placeholder, control }: TAppSelectProps) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
                <Select
                    size="large"
                    {...field}
                    placeholder={placeholder}
                >
                    {options.map(({ value, label }) => (
                        <Option key={value} value={value}>{label}</Option>
                    ))}
                </Select>
            )}
        />
    );
};

export default AppSelect;