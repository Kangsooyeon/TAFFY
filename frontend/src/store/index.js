import { configureStore } from "@reduxjs/toolkit";
import stageReducer from "./poomsaeEdu/stageSlice";
import stagesReducer from "./poomsaeEdu/stagesSlice";
import landingReducer from "./landing/landingSlice";

// Redux store 설정
const store = configureStore({
  reducer: {
    stages: stagesReducer,
    stage: stageReducer,
    landing: landingReducer,
  },
});

export default store;