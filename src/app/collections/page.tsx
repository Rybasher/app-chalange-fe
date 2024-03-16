"use client";
import isAuth from "@/components/isAuth";
import { useEffect, useState } from "react";
import {
  useGetAllCollectionsQuery,
  useCreateCollectionMutation,
} from "@/api/collectionApi";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import Modal from "@/components/modalWindows/modal";
import CreateCollectionForm from "@components/forms/collectionCreateForm";
import { toast } from "react-toastify";

export default isAuth(function Collections() {
  const {
    data: collections,
    error: collectionsError,
    isLoading: isCollectionsLoading,
  } = useGetAllCollectionsQuery({});
  const [
    createCollection,
    { isLoading: isCreateCollectionLoading, data, error },
  ] = useCreateCollectionMutation();

  const { user } = useTypedSelector((state) => state.authState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const handleSingupSubmit = async (formData: {
    name: string;
    descriptions: string;
    stocks: number;
    price: number;
  }) => {
    formData.price = +formData.price;
    formData.stocks = +formData.stocks;
    const result = await createCollection(formData).unwrap();
    if (result) {
      setIsModalOpen(false);
      toast.success("You successfully created collection");
    }
    if (error) {
      toast.error("Something went wrong");
    }
  };

  console.log(user);
  if (isCollectionsLoading) return <div>Loading...</div>;
  if (collectionsError) return <div>Error occurred</div>;

  console.log(collections);

  if (!collections) return <div>No collections</div>;

  const handleClickCreate = () => {
    setIsCreate(true);
    setIsModalOpen((prev) => !prev);
  };

  return (
    <main className="flex min-h-screen flex-col items-end justify-between p-24">
      <button
        className="bg-blue-500 text-white rounded-md p-2"
        onClick={handleClickCreate}
      >
        Create
      </button>
      <div className="flex flex-col w-full">
        {collections.map((collection: any) => (
          <>
            <div
              key={collection.id}
              className="w-full flex justify-between p-6 m-5 bg-gray-200 text-black rounded-md"
            >
              <h1>{collection.name}</h1>
              <p>{collection.descriptions}</p>
              <small>{collection.price}</small>
              {collection.userId === user?.id && (
                <button className="bg-blue-500 text-white rounded-md p-2">
                  Edit
                </button>
              )}
            </div>
            {collection.bids.map((bid: any) => (
              <div key={bid.id}>
                <p>Bid {bid.id}</p>
              </div>
            ))}
          </>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleClickCreate}>
        <button
          onClick={handleClickCreate}
          className="ml-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Закрыть
        </button>
        <div>
          <CreateCollectionForm onFormSubmit={handleSingupSubmit} isCreate />
        </div>
      </Modal>
    </main>
  );
});
