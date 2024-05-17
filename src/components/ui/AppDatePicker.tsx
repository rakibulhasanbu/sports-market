import { DatePicker, DatePickerProps } from "antd";
import { Dispatch } from "react";

interface TAppDatePicker {
    name?: string;
    placeholder?: string;
    label?: string;
    setDate: Dispatch<any>
}

const AppDatePicker = ({ name, label, placeholder, setDate }: TAppDatePicker) => {

    const onChange: DatePickerProps['onChange'] = (date) => {
        // console.log(date, dateString);
        setDate(date);
    };

    return (
        <div className='text-textDark'>
            <label htmlFor={name}>{label}</label>
            <DatePicker
                size="large"
                className="w-fit md:w-full shadow h-10 2xl:h-11"
                placeholder={placeholder}
                rootClassName="my-date-picker"
                name={name}
                onChange={onChange}
            />
        </div>
    );
};

export default AppDatePicker;