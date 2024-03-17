"use client";
import isAuth from "@/components/isAuth";
import { useEffect, useState } from "react";
import {
  useGetAllCollectionsQuery,
  useCreateCollectionMutation,
  useUpdateCollectionMutation,
  useDeleteCollectionMutation,
} from "@/api/collectionApi";
import {
  useCreateBidMutation,
  useUpdateBidMutation,
  useDeleteBidMutation,
  useAcceptBidMutation,
  useRejectBidMutation,
} from "@/api/bidApi";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import Modal from "@/components/modalWindows/modal";
import CreateCollectionForm from "@components/forms/collectionCreateForm";
import { toast } from "react-toastify";
import CreateBidForm from "@/components/forms/bidCreateForm";

const backgroundBid: any = {
  pending: "bg-yellow-200",
  accepted: "bg-green-200",
  rejected: "bg-red-200",
};

export default isAuth(function Collections() {
  const [currentPage, setCurrentPage] = useState(1); // Состояние для текущей страницы

  const {
    data: collections,
    error: collectionsError,
    isLoading: isCollectionsLoading,
    refetch: refetchCollections,
  } = useGetAllCollectionsQuery({ page: currentPage });
  const [
    createCollection,
    { isLoading: isCreateCollectionLoading, data, error },
  ] = useCreateCollectionMutation();
  const [updateCollection] = useUpdateCollectionMutation();
  const [deleteCollection] = useDeleteCollectionMutation();

  const [createBid] = useCreateBidMutation();
  const [updateBid] = useUpdateBidMutation();
  const [deleteBid] = useDeleteBidMutation();
  const [acceptBid] = useAcceptBidMutation();
  const [rejectBid] = useRejectBidMutation();

  const { user } = useTypedSelector((state) => state.authState);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isBidCreate, setIsBidCreate] = useState(false);
  const [bidId, setBidId] = useState<number | null>(null); // [1
  const [collectionId, setCollectionId] = useState<number | null>(null);

  const handleBidSubmit = async (formData: { price: number }) => {
    try {
      let result;
      if (isBidCreate && collectionId) {
        result = await createBid({
          collectionId,
          dto: { price: +formData.price },
        }).unwrap();
      } else if (bidId) {
        result = await updateBid({
          bidId,
          dto: { price: +formData.price },
        }).unwrap();
      }
      if (result) {
        setIsBidModalOpen(false);
        toast.success(
          `You successfully ${isBidCreate ? "created" : "updated"} bid`
        );
        refetchCollections();
      }
    } catch (error: any) {
      setIsBidModalOpen(false);
      toast.error(error.data.detail.message);
    }
  };

  const handleCollectionSubmit = async (formData: {
    name: string;
    descriptions: string;
    stocks: number;
    price: number;
  }) => {
    formData.price = +formData.price;
    formData.stocks = +formData.stocks;
    let result;
    if (isCreate) {
      result = await createCollection(formData).unwrap();
    } else if (collectionId) {
      result = await updateCollection({
        collectionId,
        dto: {
          name: formData.name,
          descriptions: formData.descriptions,
          stocks: formData.stocks,
          price: formData.price,
        },
      }).unwrap();
    }
    if (result) {
      setIsCollectionModalOpen(false);
      toast.success(
        `You successfully ${isCreate ? "created" : "updated"} collection`
      );
      refetchCollections();
    }
    if (error) {
      setIsCollectionModalOpen(false);
      toast.error("Something went wrong");
    }
  };

  if (isCollectionsLoading) return <div>Loading...</div>;
  if (collectionsError) return <div>Error occurred</div>;
  if (!collections?.data.length) return <div>No collections</div>;

  const handleClickCreate = () => {
    setIsCreate(true);
    setIsCollectionModalOpen((prev) => !prev);
  };

  const handleClickCreateBid = (collectionId?: number) => {
    if (collectionId) setCollectionId(collectionId);
    setIsBidCreate(true);
    setIsBidModalOpen((prev) => !prev);
  };

  const handleClickUpdateBid = (bidId: number) => {
    setIsBidCreate(false);
    setBidId(bidId);
    setIsBidModalOpen((prev) => !prev);
  };

  const handleClickUpdate = (collectionId: number) => {
    setIsCreate(false);
    setCollectionId(collectionId);
    setIsCollectionModalOpen((prev) => !prev);
  };

  const handleDeleteCollection = async (collectionId: number) => {
    try {
      await deleteCollection({ collectionId }).unwrap();
      toast.success("You successfully deleted collection");
      refetchCollections();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDeleteBid = async (bidId: number) => {
    try {
      await deleteBid({ bidId }).unwrap();
      toast.success("You successfully deleted bid");
      refetchCollections();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleAcceptBid = async (collectionId: number, bidId: number) => {
    try {
      await acceptBid({ bidId, collectionId }).unwrap();
      toast.success("You successfully accepted bid");
      refetchCollections();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleRejectBid = async (collectionId: number, bidId: number) => {
    try {
      await rejectBid({ bidId, collectionId }).unwrap();
      toast.success("You successfully rejected bid");
      refetchCollections();
    } catch (error) {
      toast.error("Something went wrong");
    }
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
        {collections.data.map((collection: any) => (
          <>
            <div
              key={collection.id}
              className="w-full flex justify-between p-6 m-5 bg-gray-200 text-black rounded-md"
            >
              <h1>{collection.name}</h1>
              <p>{collection.descriptions}</p>
              <small>{collection.price}</small>
              {collection.userId === user?.id ? (
                <>
                  <button
                    className="bg-blue-500 text-white rounded-md p-2"
                    onClick={() => handleClickUpdate(collection.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white rounded-md p-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50"
                    onClick={() => handleDeleteCollection(collection.id)} // Убедитесь, что используете правильную функцию для удаления
                  >
                    Delete
                  </button>
                </>
              ) : (
                <button
                  className="bg-blue-500 text-white rounded-md p-2"
                  onClick={() => handleClickCreateBid(collection.id)}
                >
                  Place Bid
                </button>
              )}
            </div>
            <div className="flex justify-center flex-col items-end">
              {collection.bids.map((bid: any) => (
                <div
                  key={bid.id}
                  className={`${
                    backgroundBid[bid.status.toLowerCase()]
                  } p-2 w-1/2 m-5 rounded-md text-black flex justify-between items-center`}
                >
                  <p>Bid {bid.id}</p>
                  {collection.userId === user?.id && (
                    <div>
                      <button
                        className="bg-blue-500 text-white rounded-md p-2 text-black mr-3"
                        onClick={() => handleAcceptBid(collection.id, bid.id)}
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-600 text-white rounded-md p-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50"
                        onClick={() => handleRejectBid(collection.id, bid.id)} // Убедитесь, что используете правильную функцию для удаления
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {bid.userId === user?.id && (
                    <div>
                      <button
                        className="bg-blue-500 text-white rounded-md p-2 mr-2"
                        onClick={() => handleClickUpdateBid(bid.id)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-600 text-white rounded-md p-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50"
                        onClick={() => handleDeleteBid(bid.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ))}
      </div>
      <Modal isOpen={isCollectionModalOpen} onClose={handleClickCreate}>
        <button
          onClick={handleClickCreate}
          className="ml-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Close
        </button>
        <div>
          <CreateCollectionForm
            onFormSubmit={handleCollectionSubmit}
            isCreate={isCreate}
          />
        </div>
      </Modal>

      <Modal isOpen={isBidModalOpen} onClose={() => setIsBidModalOpen(false)}>
        <button
          onClick={() => setIsBidModalOpen(false)}
          className="ml-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Close
        </button>
        <div>
          <CreateBidForm
            onFormSubmit={handleBidSubmit}
            isCreate={isBidCreate}
          />
        </div>
      </Modal>
      <div className="flex justify-between items-center">
        <button
          className="bg-blue-500 text-white rounded-md p-2 mr-2"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <p className="mr-2">{currentPage}</p>
        <button
          className="bg-blue-500 text-white rounded-md p-2 mr-2"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </main>
  );
});
