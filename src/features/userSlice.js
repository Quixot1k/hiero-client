import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // for both
  email: "",
  password: "",
  password2: "",
  firstName: "",
  lastName: "",
  birth: "",
  gender: "",
  mobile: "",
  intSpec: [],
  capacity: 1,
  addr1: "",
  addr2: "",
  city: "",
  state: "",
  zip: "",
  distance: 20,
  avatar: null,
  online: false,
  home: false,
  gym: false,
  // only for provider
  business: "",
  certification: [], //{type: , number:, }
  trainingSpot: [],
  bio: "",
  price: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // for both
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
    intSpecChanged: (state, action) => {
      if (state.intSpec.includes(action.payload)) {
        newintSpec = state.intSpec.filter(function (value) {
          return value != action.payload;
        });
        state.intSpec = newintSpec;
      } else {
        state.intSpec.push(action.payload);
      }
    },
    capacityChanged: (state, action) => {
      state.capacity = action.payload;
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
    onlineChanged: (state, action) => {
      state.online = !state.online;
    },
    homeChanged: (state, action) => {
      state.home = !state.home;
    },
    gymChanged: (state, action) => {
      state.gym = !state.gym;
    },
    // only for provider
    businessChanged: (state, action) => {
      state.business = action.payload;
    },
    certificationAdded: (state, action) => {
      state.certification.push(action.payload);
    },
    certificationRemoved: (state, action) => {
      const index = state.certification.indexOf(action.payload);
      state.certification.splice(index, 1);
    },
    bioChanged: (state, action) => {
      state.bio = action.payload;
    },
    priceChanged: (state, action) => {
      state.price = action.payload;
      console.log(state);
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
  intSpecChanged,
  onlineChanged,
  homeChanged,
  gymChanged,
  capacityChanged,
  addr1Changed,
  addr2Chnaged,
  cityChanged,
  stateChanged,
  zipChanged,
  distanceChanged,
  avatarChanged,
  businessChanged,
  certificationAdded,
  certificationRemoved,
  bioChanged,
  priceChanged,
} = userSlice.actions;

export default userSlice.reducer;
