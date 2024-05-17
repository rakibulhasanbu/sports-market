import { ReactNode, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";

type TAppDrawer = {
    button: ReactNode;
    children: ReactNode;
    title?: string;
}

const AppDrawer = ({ button, children, title }: TAppDrawer) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div onClick={() => setOpen(true)}>{button}</div>
            <div className={`${open ? 'md:hidden fixed bottom-0 min-h-screen inset-0 z-50 bg-transparent' : 'hidden'} `}>
                <div className='bg-[#FAFAFC] h-full p-4  mt-11'>
                    <div className='flex items-center text-center'>
                        <HiOutlineArrowLeft onClick={() => setOpen(false)} className="text-3xl font-bold p-1 rounded-full border" />
                        <h4 className="text-center w-full text-base text-textBlack font-medium">{title}</h4>
                    </div>
                    <div className='mt-2 rounded bg-white h-full overflow-y-auto'>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AppDrawer;