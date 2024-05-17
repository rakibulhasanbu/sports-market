import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IoArrowBackOutline } from "react-icons/io5";
import AppLoading from "../components/ui/AppLoading";
import AppFormInput from "../components/ui/AppFormInput";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGetProductByIdQuery, useUpdatedProductMutation } from "../redux/features/products/productApi";
import { useEffect } from "react";

type TInputs = {
  name: string;
  price: number;
  quantity: number;
  type: string;
  brand: string;
  size: string;
  material: string;
  color: string;
  condition: string;
  weight: number;
  imageUrl: string;
  releaseDate: Date;
};

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data } = useGetProductByIdQuery(id);

  const [updateProduct, { isLoading }] = useUpdatedProductMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<TInputs>();

  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    const submitData = {
      ...data, releaseDate: new Date(), id
    }

    await updateProduct(submitData).unwrap().then((res: { success: any, message: any; }) => {
      if (!res.success) {
        toast.error(res.message || "Something went wrong");
      }
      toast.success("product are added successfully!");
      navigate('/');

    }).catch((res: { success: any; message: any; }) => {
      if (!res.success) {
        toast.error(res.message || "Something went wrong");
      }
    });
  };

  useEffect(() => {
    setValue("name", data?.data?.name);
    setValue("price", data?.data?.price);
    setValue("brand", data?.data?.brand);
    setValue("color", data?.data?.color);
    setValue("condition", data?.data?.condition);
    setValue("imageUrl", data?.data?.imageUrl);
    setValue("material", data?.data?.material);
    setValue("quantity", data?.data?.quantity);
    setValue("size", data?.data?.size);
    setValue("type", data?.data?.type);
    setValue("weight", data?.data?.weight);
  }, [data, setValue])

  return (
    <>
      <Link
        to={"/"}
        className="text-xl 2xl:text-2xl w-fit font-medium text-[#343A40] flex items-center gap-2"
      >
        <div className="rounded-full bg-[#F8F8F8] flex items-center justify-center size-10 lg:size-12">
          <IoArrowBackOutline />
        </div>
        <h2>Go Back</h2>
      </Link>

      {
        isLoading ? <AppLoading />
          :
          <div className="bg-[#F8F8F8] p-3 md:p-4 rounded-2xl mt-4">
            <h1 className="md:text-xl font-medium">Update Product</h1>
            <form className="space-y-2 md:space-y-4 pt-4 pb-2" onSubmit={handleSubmit(onSubmit)}>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-4">
                <AppFormInput
                  name="name"
                  required={true}
                  register={register}
                  type="text"
                  label="Product Name"
                  error={errors.name}
                />

                <AppFormInput
                  name="type"
                  required={true}
                  register={register}
                  type="text"
                  label="Product type"
                  error={errors.type}
                />

                <AppFormInput
                  name="brand"
                  required={true}
                  register={register}
                  type="text"
                  label="Product brand"
                  error={errors.brand}
                />

                <AppFormInput
                  name="material"
                  required={true}
                  register={register}
                  type="text"
                  label="Product material"
                  error={errors.material}
                />
                <AppFormInput
                  name="color"
                  required={true}
                  register={register}
                  type="text"
                  label="Product color"
                  error={errors.color}
                />
                <AppFormInput
                  name="condition"
                  required={true}
                  register={register}
                  type="text"
                  label="Product condition"
                  error={errors.condition}
                />

              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                <AppFormInput
                  name="price"
                  required={true}
                  register={register}
                  type="number"
                  label="Product price"
                  error={errors.price}
                />

                <AppFormInput
                  name="quantity"
                  required={true}
                  register={register}
                  type="number"
                  label="Product quantity"
                  error={errors.quantity}
                />

                <AppFormInput
                  name="size"
                  required={true}
                  register={register}
                  type="text"
                  label="Product size"
                  error={errors.size}
                />

                <AppFormInput
                  name="weight"
                  required={true}
                  register={register}
                  type="number"
                  label="Product weight"
                  error={errors.weight}
                />
              </div>

              <AppFormInput
                name="imageUrl"
                required={true}
                register={register}
                type="text"
                label="Product imageUrl"
                error={errors.imageUrl}
              />

              <div className="flex items-center justify-center pt-4">
                {isLoading ? (
                  <button className="appBtn px-10 flex items-center justify-center w-full mt-4 lg:mt-6 ">
                    <AiOutlineLoading3Quarters className="animate-spin text-white text-2xl" />
                  </button>
                ) : (
                  <button type="submit" className="roundedBtn cursor-pointer">
                    Update Product
                  </button>
                )}
              </div>
            </form>
          </div>
      }

    </>
  );
};

export default EditProduct;
