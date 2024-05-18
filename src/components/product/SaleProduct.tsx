import { useState } from "react";
import { toast } from "react-toastify";
import { useAddSaleMutation } from "../../redux/features/sales/saleApi";
import AppModal from "../ui/AppModal";

const SaleProduct = ({ record }: { record: any }) => {
    const [addSale] = useAddSaleMutation();

    const handleSale = async (id: string) => {
        const submitData = {
            quantity: +modalData?.quantity,
            buyerName: modalData?.buyerName,
            saleDate: modalData?.saleDate,
            productId: id,
        }
        console.log(submitData);

        await addSale(submitData).unwrap().then((res: {
            data: any; success: any; errorMessage: any;
        }) => {
            if (!res.success) {
                toast.error(res?.data?.message || "Something went wrong");
            }
            toast.success("product Buy successful!");

        }).catch((res: {
            data: any;
            errorMessage: string; success: any; message: any;
        }) => {
            if (!res.success) {
                toast.error(res?.data?.message || "Something went wrong");
            }
        });
    };

    const [modalData, setModalData] = useState({
        quantity: 0,
        buyerName: "",
        saleDate: ""
    });
    const handleChange = (key: any, value: any) => {
        console.log(value);
        setModalData((prevOptions) => ({
            ...prevOptions,
            [key]: value,
        }));
    };
    return (
        <AppModal
            key={record?._id}
            button={
                <button className="text-xs font-medium px-4 py-1 w-full rounded-full text-white bg-primary">Buy Now</button>
            }
            cancelButtonTitle="No, Don’t"
            primaryButtonTitle="Yes. Buy"
            primaryButtonAction={() => handleSale(record?._id)}
        >
            <div className='max-w-96 space-y-2 pt-2'>
                <p className="font-medium">Product Name: {record?.name}</p>
                <p className="font-medium">Product Price: {record?.price}</p>
                <div className=''>
                    <label htmlFor="Buyer-Name">Buyer Name</label>
                    <input
                        id="Buyer-Name"
                        type="text"
                        value={modalData?.buyerName}
                        onChange={(e) => handleChange("buyerName", e.target.value)}
                        placeholder="Buyer Name"
                        className="w-full outline-none border px-2 py-1.5 text-sm md:text-base md:pl-2"
                    />
                </div>
                <div className=''>
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        id="quantity"
                        type="number"
                        onChange={(e) => handleChange("quantity", e.target.value)}
                        value={modalData?.quantity}
                        placeholder="Product Quantity"
                        className="w-full outline-none border px-2 py-1.5 text-sm md:text-base md:pl-2"
                    />
                </div>
                <div className=''>
                    <label htmlFor="saleDate">Quantity</label>
                    <input
                        id="saleDate"
                        type="date"
                        onChange={(e) => handleChange("saleDate", e.target.value)}
                        value={modalData?.quantity}
                        placeholder="Selling Date"
                        className="w-full outline-none border px-2 py-1.5 text-sm md:text-base md:pl-2"
                    />
                </div>
            </div>
        </AppModal>
    );
};

export default SaleProduct;