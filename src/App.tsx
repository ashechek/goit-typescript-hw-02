// ------------------------------------------------------------------------- imports
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import Modal from "react-modal";
import searchImagesForTopic from "./search-img-api";
import { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { useState } from "react";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

// ------------------------------------------------------------------------- types
interface ImageData {
  id: string;
  likes: number;
  alt_description: string;
  urls: {
    regular: string;
    small: string;
  };
}

// ------------------------------------------------------------------------- consts
const App: React.FC = () => {
  const [serverData, setServerData] = useState < ImageData[] > ([]);
  const [loader, setIsLoader] = useState < boolean > (false);
  const [error, setIsError] = useState < boolean > (false);
  const [page, setPage] = useState < number > (1);
  const [topic, setTopic] = useState < string > ("");
  const [modalIsOpen, setModalIsOpen] = useState < boolean > (false);
  const [currentImage, setCurrentImage] = useState < string | null > (null);

  Modal.setAppElement("#root");

  const openModal = (imageUrl: string) => {
    setCurrentImage(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentImage(null);
  };

  const submitFu = async (newTopic: string) => {
    try {
      setPage(1);
      setIsError(false);
      setIsLoader(true);
      setTopic(newTopic);
      const data = await searchImagesForTopic(newTopic, 1);
      setServerData(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoader(false);
    }
  };

  const loadMoreFu = async () => {
    try {
      setIsLoader(true);
      const nextPage = page + 1;
      const data = await searchImagesForTopic(topic, nextPage);
      setPage(nextPage);
      setServerData((prev) => [...prev, ...data]);
    } catch {
      setIsError(true);
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={submitFu} />
      <Toaster />
      {serverData.length > 0 && (
        <ImageGallery galleryList={serverData} openModalFu={openModal} />
      )}
      {serverData.length > 0 && !loader && (
        <LoadMoreBtn loadMoreFu={loadMoreFu} />
      )}
      {error && <ErrorMessage />}
      {loader && <Loader />}
      {modalIsOpen && (
        <ImageModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          currentImage={currentImage}
        />
      )}
    </>
  );
};

export default App;
