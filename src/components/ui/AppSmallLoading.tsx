import { Spin } from "antd";

const AppSmallLoading = ({ className }: { className?: string }) => {
    return (
        <div className={`w-full h-full bg-inherit flex items-center justify-center ${className}`}>
            <Spin size="large" />
        </div>
    );
};

export default AppSmallLoading;