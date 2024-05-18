/* eslint-disable no-extra-boolean-cast */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AppModal from "../components/ui/AppModal";
import AppTable from "../components/ui/AppTable";
import { useBulkDeleteProductMutation, useDeleteProductMutation, useGetProductQuery } from "../redux/features/products/productApi";
import { Link } from "react-router-dom";
import AppPopover from "../components/ui/AppPopover";
import { BsThreeDotsVertical } from "react-icons/bs";
import SaleProduct from "../components/product/SaleProduct";

const ManageProducts = () => {
    const [_page, setPage] = useState(1)

    const [filterOptions, setFilterOptions] = useState({
        priceRange: { min: 0, max: 1000 },
        releaseDate: "",
        brand: "",
        type: "",
        material: "",
        color: "",
        quantity: "",
        condition: "",
        size: "",
        weight: "",
    });


    // Function to update filter options
    const handleFilterChange = (key: any, value: any) => {
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            [key]: value,
        }));
    };

    const serializeFilterOptions = (options: any) => {
        const params = new URLSearchParams();
        for (const key in options) {
            if (
                options[key] !== "" &&
                options[key] !== null &&
                options[key] !== undefined
            ) {
                if (typeof options[key] === "object") {
                    // Handle nested objects, e.g., priceRange
                    for (const nestedKey in options[key]) {
                        params.append(`${key}[${nestedKey}]`, options[key][nestedKey]);
                    }
                } else {
                    params.append(key, options[key]);
                }
            }
        }
        return params.toString();
    };
    const queryParams = serializeFilterOptions(filterOptions);

    // const queryString = useMemo(() => {
    //     const info = {
    //         role: "user",
    //         brand:"",
    //         limit: 10,
    //         page,
    //         searchTerm: search.length ? search : undefined,
    //     };
    //     const queryString = Object.keys(info).reduce((pre, key: string) => {
    //         const value = info[key as keyof typeof info];
    //         if (value) {
    //             return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
    //         }
    //         return pre;
    //     }, "");
    //     return queryString;
    // }, [page, search]);

    const infoQuery = useGetProductQuery(queryParams);

    const [deleteUser, { isError, error, isLoading, isSuccess }] = useDeleteProductMutation();

    useEffect(() => {
        if (isError) {
            toast.error("User delete unsuccessful!");
        } else if (!isLoading && isSuccess) {
            toast.success('User deleted Successful!')
        }
    }, [isError, error, isLoading, isSuccess])

    const [bulkDeleteProduct] = useBulkDeleteProductMutation();

    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
    const handleCheckboxChange = (productId: string) => {
        // Step 3: Update the selectedProductIds state based on checkbox changes
        setSelectedProductIds((prevSelectedIds) => {
            if (prevSelectedIds.includes(productId)) {
                // If already selected, remove from the list
                return prevSelectedIds.filter((id) => id !== productId);
            } else {
                // If not selected, add to the list
                return [...prevSelectedIds, productId];
            }
        });
    };

    const handleDelete = async () => {

        await bulkDeleteProduct({ productsId: selectedProductIds }).unwrap().then((res: { success: any; message: any; }) => {
            if (!res.success) {
                toast.error(res.message || "Something went wrong");
            }
            toast.success("Bulk Delete Product successfully!");

        }).catch((res: { success: any; message: any; }) => {
            if (!res.success) {
                toast.error(res.message || "Something went wrong");
            }
        });
    };

    const columns = [
        {
            title: '',
            dataIndex: '_id',
            render: (id: string) => {
                return (
                    <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(id)}
                        checked={selectedProductIds.includes(id)}
                        className="cursor-pointer"
                    />
                )
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            className: "min-w-[150px]",
            render: (name: string, record: any) => {
                return (
                    <div className='flex items-center gap-1'>
                        <img src={record?.imageUrl} alt="" className="rounded-md object-cover w-16 h-10" />
                        <p className="">{name}</p>
                    </div>
                )
            }
        },
        {
            title: 'Price',
            dataIndex: 'price',
            className: "min-w-[100px]",
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            className: "min-w-[115px]",
        },
        {
            title: 'Type',
            dataIndex: 'type',
            className: "min-w-[115px]",
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            className: "min-w-[115px]",
        },
        {
            title: 'Material',
            dataIndex: 'material',
            className: "min-w-[115px]",
        },
        {
            title: 'Color',
            dataIndex: 'color',
            className: "min-w-[115px]",
        },
        {
            title: 'Condition',
            dataIndex: 'condition',
            className: "min-w-[115px]",
        },
        {
            title: 'Action',
            dataIndex: '',
            className: "min-w-[85px]",
            render: (_text: any, record: any) => {
                return (
                    <div className=''>
                        <AppPopover
                            key={record?._id}
                            children={
                                <div className='flex flex-col gap-2.5'>
                                    <AppModal button={
                                        <button className="text-xs font-medium w-full px-4 py-1 rounded-full text-gray-700 bg-gray-200">View Details</button>
                                    }
                                        cancelButtonTitle="Close"
                                        title="Product details"
                                    >
                                        <div className=' min-w-96 max-w-sm space-y-2 pt-2'>
                                            <img src={record?.imageUrl} alt="" className="rounded-md object-cover w-60 h-36 mx-auto" />
                                            <div className='grid grid-cols-2 gap-x-4 gap-y-2 '>

                                                <p className="font-medium">Product Name: {record?.name}</p>
                                                <p className="font-medium">Product Price: {record?.price}</p>
                                                <p className="font-medium">Product Quantity: {record?.quantity}</p>
                                                <p className="font-medium">Product Type: {record?.type}</p>
                                                <p className="font-medium">Product Brand: {record?.brand}</p>
                                                <p className="font-medium">Product Size: {record?.size}</p>
                                                <p className="font-medium">Product Material: {record?.material}</p>
                                                <p className="font-medium">Product Color: {record?.color}</p>
                                                <p className="font-medium">Product Condition: {record?.condition}</p>
                                                <p className="font-medium">Product Weight: {record?.weight}</p>
                                            </div>

                                        </div>
                                    </AppModal>

                                    <SaleProduct record={record} />

                                    <button className="text-xs font-medium px-4 py-1 rounded-full bg-[#E6E6E7] hover:text-gray-800 "><Link to={`/create-variant/${record?._id}`}>Create Variant</Link></button>
                                    <button className="text-xs font-medium px-4 py-1 rounded-full bg-[#E6E6E7] hover:text-gray-800 "><Link to={`/edit-product/${record?._id}`}>Update</Link></button>

                                    <AppModal button={
                                        <button className="text-xs text-white px-4 py-1 rounded-full w-full bg-bgred">Remove</button>}
                                        cancelButtonTitle="No, Don’t"
                                        primaryButtonTitle="Yes. Remove"
                                        primaryButtonAction={() => deleteUser(record?._id)}
                                    >
                                        <div className='max-w-80'>
                                            <p className="text-center text-[#828282] pt-4 text-lg">Are you sure  Remove <span className="text-textDark font-medium">{record?.name}</span> from the user list?</p>
                                        </div>
                                    </AppModal>
                                </div>
                            }
                            button={
                                <button>
                                    <BsThreeDotsVertical className="text-xl" />
                                </button>
                            }
                        />

                    </div>
                )
            }
        },
    ];

    return (
        <>
            <div className="bg-[#F8F8F8]  rounded-lg border grid grid-cols-2 gap-4 my-4 p-5">
                <label>
                    Price Range:
                    <input
                        type="number"
                        className="ml-2 px-2 py-1 border rounded-md max-w-xs w-40"
                        value={filterOptions.priceRange.min}
                        onChange={(e) =>
                            handleFilterChange("priceRange", {
                                ...filterOptions.priceRange,
                                min: Number(e.target.value),
                            })
                        }
                        placeholder="Min"
                    />{" "}
                    <span>to</span>
                    <input
                        type="number"
                        className="ml-2 px-2 py-1 border rounded-md max-w-xs w-40"
                        value={filterOptions.priceRange.max}
                        onChange={(e) =>
                            handleFilterChange("priceRange", {
                                ...filterOptions.priceRange,
                                max: Number(e.target.value),
                            })
                        }
                        placeholder="Max"
                    />
                </label>

                <label>
                    Release Date:
                    <input
                        type="date"
                        className="ml-2 px-2 py-1 border rounded-md sm w-full max-w-xs"
                        value={filterOptions.releaseDate}
                        onChange={(e) =>
                            handleFilterChange("releaseDate", e.target.value)
                        }
                        placeholder="YYYY-MM-DD"
                    />
                </label>

                <label>
                    Brand Name:
                    <input
                        type="text"
                        className="ml-2 px-2 py-1 border rounded-md sm w-full max-w-xs"
                        value={filterOptions.brand}
                        onChange={(e) => handleFilterChange("brand", e.target.value)}
                        placeholder="Brand Name"
                    />
                </label>
                <label>
                    Product Type:
                    <input
                        type="text"
                        className="ml-2 px-2 py-1 border rounded-md sm w-full max-w-xs"
                        value={filterOptions.type}
                        onChange={(e) =>
                            handleFilterChange("type", e.target.value)
                        }
                        placeholder="Product type"
                    />
                </label>
                <label>
                    Product Material:
                    <input
                        type="text"
                        className="ml-2 px-2 py-1 border rounded-md sm w-full max-w-xs"
                        value={filterOptions.material}
                        onChange={(e) => handleFilterChange("material", e.target.value)}
                        placeholder="Product Material "
                    />
                </label>
                <label>
                    Color:
                    <input
                        type="text"
                        className="ml-2 px-2 py-1 border rounded-md sm w-full max-w-xs"
                        value={filterOptions.color}
                        onChange={(e) =>
                            handleFilterChange("color", e.target.value)
                        }
                        placeholder="Product color"
                    />
                </label>
                <label>
                    Product Quantity:
                    <input
                        type="text"
                        className="ml-2 px-2 py-1 border rounded-md sm w-full max-w-xs"
                        value={filterOptions.quantity}
                        onChange={(e) =>
                            handleFilterChange("quantity", e.target.value)
                        }
                        placeholder="product quantity"
                    />
                </label>
                <label>
                    Condition:
                    <input
                        type="text"
                        className="ml-2 px-2 py-1 border rounded-md sm w-full max-w-xs"
                        value={filterOptions.condition}
                        onChange={(e) =>
                            handleFilterChange("condition", e.target.value)
                        }
                        placeholder="condition"
                    />
                </label>
                <label>
                    Product Size:
                    <input
                        type="text"
                        className="ml-2 px-2 py-1 border rounded-md sm w-full max-w-xs"
                        value={filterOptions.size}
                        onChange={(e) => handleFilterChange("size", e.target.value)}
                        placeholder=" Product Size"
                    />
                </label>
                <label>
                    Weight:
                    <input
                        type="text"
                        className="ml-2 px-2 py-1 border rounded-md sm w-full max-w-xs"
                        value={filterOptions.weight}
                        onChange={(e) => handleFilterChange("weight", e.target.value)}
                        placeholder="Weight"
                    />
                </label>
            </div>

            <AppTable
                columns={columns}
                infoQuery={infoQuery}
                setPage={setPage}
                headerText="products List"
                tabs={
                    <div>
                        {
                            selectedProductIds.length > 0 &&
                            <button
                                className="roundedBtn bg-red/80 hover:bg-red"
                                onClick={handleDelete}
                            >
                                Delete selected product
                            </button>
                        }
                    </div>
                }
                button={
                    <Link to={"/add-product"}>
                        <button className="roundedBtn">Add New Product</button>
                    </Link>
                }
            />
        </>
    );
};

export default ManageProducts;