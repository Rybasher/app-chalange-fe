import React, { useState, FormEvent } from "react";
import CustomInput from "../input/customInput";
import { CreateBid } from "@/interfaces/bid.interface";

type CreateBidFormProps = {
  onFormSubmit: (formData: { price: number }) => void;
  error?: string;
  isCreate: boolean;
  collectionId?: number;
};

export interface CreateBidFormStates {
  price: number;
}

const CreateBidForm: React.FC<CreateBidFormProps> = ({
  onFormSubmit,
  isCreate,
  error,
}) => {
  const [state, setState] = useState<CreateBidFormStates>({
    price: 0,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const bidCreate: CreateBid = {
      price: state.price,
    };

    onFormSubmit(bidCreate);
  };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col justify-between items-center"
    >
      <div className="flex flex-col justify-between items-center h-60 w-1/5">
        <h3 className="text-2xl">{isCreate ? "Create bid" : "Update bid"}</h3>
        <div className="w-full flex flex-col justify-between items-center">
          <CustomInput
            required={true}
            minLength={8}
            name="price"
            placeholder="price"
            type="number"
            value={String(state.price)}
            onChange={onChangeHandler}
          />
        </div>
        <div className="flex flex-col justify-between items-center w-full">
          <button
            type="submit"
            className="mt-3 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            {isCreate ? "Create" : "Update"}
          </button>
        </div>
        <div>
          <p className="text-rose-600">{error}</p>
        </div>
      </div>
    </form>
  );
};

export default CreateBidForm;
