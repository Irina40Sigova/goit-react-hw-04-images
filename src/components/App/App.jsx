import React, { useState, useEffect } from 'react';

import { Container } from './App.styled';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import fetchApi from 'components/services/fetchApi';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { Loader } from 'components/Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    if (!error & error) {
      Notify.failure(`Sorry something went wrong: ${error}`);
    }
    setLoading(true);

    fetchApi(searchQuery, page)
      .then(data => {
        const images = data.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );

        setImages(prevState => [...prevState, ...images]);
        setError(null);
        setTotalImages(data.totalHits);
      })
      .catch(error => setError(error.massage))
      .finally(() => setLoading(false));
  }, [searchQuery, page, error]);

  const handleSearchFormSubmit = query => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
    setTotalImages(0);
  };

  const toggleModal = (modalData = null) => {
    setModalData(modalData);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <Container>
      <Searchbar handleSearchFormSubmit={handleSearchFormSubmit} />

      {images.length > 0 && (
        <ImageGallery images={images} onClick={toggleModal} />
      )}

      {images.length !== totalImages && !loading && (
        <Button loadMore={loadMore} />
      )}

      {loading && <Loader />}

      {modalData && (
        <Modal onClose={toggleModal}>
          <img src={modalData.largeImageURL} alt={modalData.tags} />
        </Modal>
      )}
    </Container>
  );
};

// export class App extends Component {
//   state = {
//     images: [],
//     searchQuery: '',
//     page: 1,
//     totalImages: 0,

//     error: null,
//     loading: false,
//     modalData: null,
//   };

//   componentDidUpdate(_, prevState) {
//     const { searchQuery, page, error } = this.state;

//     if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
//       this.fetchImages();
//     }

//     if (prevState.error !== error & error) {
//       Notify.failure(`Sorry something went wrong: ${error}`);
//     }
//   }

//   fetchImages = () => {
//     const { page, searchQuery } = this.state;
//     this.setState({ loading: true, error: null });

//     fetchApi(searchQuery, page)
//       .then(data => {
//         const images = data.hits.map(
//           ({ id, tags, webformatURL, largeImageURL }) => ({
//             id,
//             tags,
//             webformatURL,
//             largeImageURL,
//           })
//         );
//         this.setState(prevState => ({
//           images: [...prevState.images, ...images],
//           error: null,
//           totalImages: data.totalHits,
//         }));
//       })
//       .catch(error => this.setState({ error: error.massage }))
//       .finally(() => this.setState({ loading: false }));
//   };

//   handleSearchFormSubmit = query => {
//     this.setState({ searchQuery: query, page: 1, images: [], totalImages: 0 });
//   };

//   toggleModal = (modalData = null) => {
//     this.setState({
//       modalData: modalData,
//     });
//   };

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     const { images, loading, modalData, totalImages } = this.state;
//     return (
//       <Container>
//         <Searchbar handleSearchFormSubmit={this.handleSearchFormSubmit} />

//         {images.length > 0 && (
//           <ImageGallery images={images} onClick={this.toggleModal} />
//         )}

//         {images.length !== totalImages && !loading && (
//           <Button loadMore={this.loadMore} />
//         )}

//         {loading && <Loader />}

//         {modalData && (
//           <Modal onClose={this.toggleModal}>
//             <img src={modalData.largeImageURL} alt={modalData.tags} />
//           </Modal>
//         )}
//       </Container>
//     );
//   }
// }
