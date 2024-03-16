import Link from "next/link";
import React, { useState, FormEvent } from "react";
import CustomInput from "../input/customInput";
import { toast } from "react-toastify";
import { CreateCollection } from "@/interfaces/collection.interface";

type CreateCollectionFormProps = {
  onFormSubmit: (formData: {
    name: string;
    descriptions: string;
    stocks: number;
    price: number;
  }) => void;
  error?: string;
  isCreate: boolean;
};

export interface CreateCollectionFormStates {
  name: string;
  descriptions: string;
  stocks: number;
  price: number;
}

const CreateCollectionForm: React.FC<CreateCollectionFormProps> = ({
  onFormSubmit,
  isCreate,
  error,
}) => {
  const [state, setState] = useState<CreateCollectionFormStates>({
    name: "",
    descriptions: "",
    stocks: 0,
    price: 0,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const collectionCreate: CreateCollection = {
      name: state.name,
      descriptions: state.descriptions,
      stocks: state.stocks,
      price: state.price,
    };

    onFormSubmit(collectionCreate);
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
        <h3 className="text-2xl">
          {isCreate ? "Create Collection" : "Update Collection"}
        </h3>
        <div className="w-full flex flex-col justify-between items-center">
          <CustomInput
            type="text"
            required={true}
            name="name"
            value={state.name}
            placeholder="Name"
            onChange={onChangeHandler}
          />

          <CustomInput
            type="text"
            required={true}
            name="descriptions"
            value={state.descriptions}
            placeholder="descriptions"
            onChange={onChangeHandler}
          />

          <CustomInput
            type="number"
            required={true}
            name="stocks"
            minLength={8}
            value={String(state.stocks)}
            placeholder="stocks"
            onChange={onChangeHandler}
          />

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
            Create
          </button>
        </div>
        <div>
          <p className="text-rose-600">{error}</p>
        </div>
      </div>
    </form>
  );
};

export default CreateCollectionForm;
