import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  password2: "",
  firstName: "",
  lastName: "",
  birth: "",
  gender: "",
  mobile: "",
  interest: [],
  online: false,
  home: false,
  gym: false,
  share: 1,
  addr1: "",
  addr2: "",
  city: "",
  state: "",
  zip: "",
  distance: 20,
  avatar: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    emailChanged: (state, action) => {
      state.email = action.payload;
    },
    passwordChanged: (state, action) => {
      state.password = action.payload;
    },
    password2Changed: (state, action) => {
      state.password2 = action.payload;
    },
    firstNameChanged: (state, action) => {
      state.firstName = action.payload;
    },
    lastNameChanged: (state, action) => {
      state.lastName = action.payload;
    },
    birthChanged: (state, action) => {
      state.birth = action.payload;
    },
    genderChanged: (state, action) => {
      state.gender = action.payload;
    },
    mobileChanged: (state, action) => {
      state.mobile = action.payload;
    },
    interestChanged: (state, action) => {
      if (state.interest.includes(action.payload)) {
        newInterest = state.interest.filter(function (value) {
          return value != action.payload;
        });
        state.interest = newInterest;
      } else {
        state.interest.push(action.payload);
      }
    },
    onlineChanged: (state, action) => {
      state.online = !state.online;
    },
    homeChanged: (state, action) => {
      state.home = !state.home;
    },
    gymChanged: (state, action) => {
      state.gym = !state.gym;
    },
    shareChanged: (state, action) => {
      state.share = action.payload;
    },
    addr1Changed: (state, action) => {
      state.addr1 = action.payload;
    },
    addr2Chnaged: (state, action) => {
      state.addr2 = action.payload;
    },
    cityChanged: (state, action) => {
      state.city = action.payload;
    },
    stateChanged: (state, action) => {
      state.state = action.payload;
    },
    zipChanged: (state, action) => {
      state.zip = action.payload;
    },
    distanceChanged: (state, action) => {
      state.distance = action.payload;
    },
    avatarChanged: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

export const {
  emailChanged,
  passwordChanged,
  password2Changed,
  firstNameChanged,
  lastNameChanged,
  birthChanged,
  genderChanged,
  mobileChanged,
  interestChanged,
  onlineChanged,
  homeChanged,
  gymChanged,
  shareChanged,
  addr1Changed,
  addr2Chnaged,
  cityChanged,
  stateChanged,
  zipChanged,
  distanceChanged,
  avatarChanged,
} = userSlice.actions;

export default userSlice.reducer;
