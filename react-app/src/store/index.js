import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import photosReducer from './photos';
import albumsReducer from './albums';
import userReducer from './users';
<<<<<<< HEAD
import commentReducer from './comments'

=======
import favReducer from './fav';
>>>>>>> dev

const rootReducer = combineReducers({
  session,
  photos: photosReducer,
  albums: albumsReducer,
  users: userReducer,
<<<<<<< HEAD
  comments: commentReducer
=======
  favs: favReducer
>>>>>>> dev
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
