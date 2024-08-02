import {configureStore} from '@reduxjs/toolkit'
import userReducer from './myPage/myPageUser.js'

const store = configureStore({
  reducer: {user: userReducer},
})

export default store;