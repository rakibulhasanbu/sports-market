import { DatePicker } from "antd";
import { Control, Controller } from "react-hook-form";

interface TAppDatePicker {
    control: Control<any>;
    name: string;
    placeholder?: string;
    label?: string;
}

const AppFormDatePicker = ({ control, name, label, placeholder }: TAppDatePicker) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={{
                required: `${label} field is required`
            }}
            render={({ field, fieldState }) => {
                return (
                    <div className='text-textDark'>
                        <label htmlFor={name}>{label}</label>
                        <DatePicker
                            size="large"
                            className="w-full h-11"
                            placeholder={placeholder}
                            rootClassName="my-date-picker"
                            status={fieldState.error ? "error" : undefined}
                            ref={field.ref}
                            name={field.name}
                            onBlur={field.onBlur}
                            value={field.value ? field.value : null}
                            onChange={(date, dateString) => {
                                field.onChange(date);
                            }}
                        />
                        {fieldState.error && (
                            <p className="text-sm text-red font-normal">{fieldState.error?.message}</p>
                        )}
                    </div>
                );
            }}
        />
    );
};

export default AppFormDatePicker;