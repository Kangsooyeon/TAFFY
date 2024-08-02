import { configureStore } from "@reduxjs/toolkit";
import stageReducer from "./poomsaeEdu/stageSlice";
import stagesReducer from "./poomsaeEdu/stagesSlice";

// Redux store 설정
const store = configureStore({
  reducer: {
    stages: stagesReducer,
    stage: stageReducer,
  },
});

export default store;