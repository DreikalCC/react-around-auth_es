import React from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Main } from './Main';
import { ImagePopup } from './ImagePopup';
import api from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { DeleteCardPopup } from './DeleteCardPopup';
import { ProtectedRoute } from './ProtectedRoute';
import { Login } from './Login';
import { Register } from './Register';

export default function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEraseCardPopupOpen, setEraseCardPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: '',
    link: '',
  });
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState('');
  const [deletableCard, setDeletableCard] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [link, setLink] = React.useState('');
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, serverCards]) => {
        setCurrentUser(user);
        setCards(serverCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    console.log(deletableCard);
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => {
        return state.map((c) => (c._id === card._id ? newCard : c));
      });
    });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(
        setCards((state) => {
          const remainingCards = state.filter((c) => c._id !== card._id);
          return remainingCards.map((c) => c);
        })
      )
      .finally(closeAllPopups());
  }

  function handleCardClick(e) {
    setSelectedCard({ name: e.target.alt, link: e.target.src });
    setIsImagePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEraseCardClick(card) {
    setDeletableCard(card);
    setEraseCardPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setEraseCardPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  }

  function handleUpdateUser({ name, about }) {
    api
      .postUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
      })
      .finally(closeAllPopups());
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .postUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
      })
      .finally(closeAllPopups());
  }
  function handleAddPlaceSubmit({ name, link }) {
    api
      .postCard(name, link)
      .then((newCard) => setCards([newCard, ...cards]))
      .finally(closeAllPopups());
  }
  function handleLoginSubmit({ email, password }) {
    console.log('error clearer');
    /*auth
      .login(email, password)
      .then((res) => {
        navigate('/main');
      })
      .catch((err) => {
        console.log(err);
      });*/
  }
  function handleSignupSubmit({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleLocationChange(e) {
    setLocation(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Routes>
          <ProtectedRoute path='/main' loggedIn={loggedIn}>
            <Main
              cards={cards}
              onCardLike={handleCardLike}
              handleCardClick={handleCardClick}
              handleEditAvatarClick={handleEditAvatarClick}
              handleEditProfileClick={handleEditProfileClick}
              handleAddPlaceClick={handleAddPlaceClick}
              handleEraseCardClick={handleEraseCardClick}
            />
          </ProtectedRoute>
          <Route path='/login'>
            <Login
              onPasswordChange={handlePasswordChange}
              onEmailChange={handleEmailChange}
              onLoginSubmit={handleLoginSubmit}
            />
          </Route>
          <Route path='/signup'>
            <Register
              onPasswordChange={handlePasswordChange}
              onEmailChange={handleEmailChange}
              onSignupSubmit={handleSignupSubmit}
            />
          </Route>
          <Route path='/'>
            {loggedIn ? <Navigate to='/main' /> : <Navigate to='/login' />}
          </Route>
        </Routes>
        <ImagePopup
          image={selectedCard}
          isPopupOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onNameChange={handleNameChange}
          onDescriptionChange={handleDescriptionChange}
          name={name}
          description={description}
        />
        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onNameChange={handleLocationChange}
          onLinkChange={handleLinkChange}
          link={link}
          location={location}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <DeleteCardPopup
          isOpen={isEraseCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          card={deletableCard}
          onConfirm={handleCardDelete}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
