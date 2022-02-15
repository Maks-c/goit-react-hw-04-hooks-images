import SearchBar from "./Components/Searchbar";
import ImageGallery from "./Components/ImageGallery";
import Loader from "./Components/Loader";
import {useState, useEffect} from "react";
import {AppWrapper} from "./appStyle";
import Modal from "./Components/Modal";
import ButtonLoadMore from "./Components/ButtonLoadMore";
import imageRequest from "./Services/images-api";
//=====================================================


const App = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchObject, setSearchObject] = useState('')
    const [hits, setHits] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [tags, setTags] = useState('')
    const [imageModal, setImageModal] = useState('')

    useEffect(() => {
        if( !searchObject) return;

        setIsLoading(true)

        imageRequest(searchObject, currentPage)
            .then(({hits}) => {

                const images = hits.map(({webformatURL, id, tags, largeImageURL}) => ({
                    webformatURL, id, tags, largeImageURL
                }))

                if(hits.length === 0) {
                    return Promise.reject(new Error("Проверьте ввод запроса"))
                }
                setHits((state) => [...state, ...images])

            })
            .catch(error => setError(error))
            .finally(() => setIsLoading(false))
    }, [searchObject, currentPage])


    const onLoadMoreButton = () => {
        setCurrentPage(state => (state + 1))
    }


    const handleFormSubmit = query => {
        setSearchObject(query)
        setCurrentPage(1)
        setHits([])
        setError(null)
    }

    const toggleModal = () => {

        setShowModal( !showModal)


    }


    const onModal = ({largeImageURL, tags}) => {
        setImageModal(largeImageURL)
        setTags(tags)
        toggleModal({});
    };

    const renderButtonLoadMore = hits.length > 0 && !isLoading

    return (
        <AppWrapper>
            <SearchBar onSubmit={handleFormSubmit}/>
            {error && <h1>{error.message}</h1>}
            {hits.length > 0 && <ImageGallery showQuery={hits} onClick={onModal}/>}
            {isLoading && <Loader/>}
            {renderButtonLoadMore && <ButtonLoadMore onClick={onLoadMoreButton}/>}
            {showModal && <Modal onClose={toggleModal}>
                <img src={imageModal} alt={tags}/>
            </Modal>}
        </AppWrapper>)
}

export default App;
