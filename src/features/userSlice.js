import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // unique
  userId: null,
  // for both
  email: "",
  password: "",
  password2: "",
  firstName: "",
  lastName: "",
  birth: null,
  gender: null,
  mobile: "",
  intSpecs: [], // { categoryId: "", providerType: "",categoryName: "" },
  capacity: 3,
  addr1: "",
  addr2: "",
  city: "",
  state: "",
  zip: "",
  latitude: 37.78825,
  longitude: -122.4324,
  distance: 20,
  avatar: "",
  zoom: false,
  home: false,
  // gym: false,

  // only for trainer
  business: "",
  certifications: [], // { certificationId: "", certificationType: "", certificationNumber: "" },
  trainerLocations: [], //{  locationId: "", "address": "", city: "", state: "", zipcode: "", locationType: Gym/Home, latitude: -1.0, longitude: -1.0 },
  bio: "",
  bid: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // unique
    userIdChanged: (state, action) => {
      state.userId = action.payload;
    },
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
    intSpecsInited: (state, action) => {
      state.intSpecs = action.payload;
    },
    intSpecsChanged: (state, action) => {
      let flag = false;
      let index = 0;
      const payload = action.payload;
      const id = payload.categoryId;
      for (let item of state.intSpecs) {
        if (item.categoryId == id) {
          flag = true;
          break;
        }
        index += 1;
      }
      if (flag) {
        state.intSpecs.splice(index, 1);
      } else {
        state.intSpecs.push(action.payload);
      }
      console.log(state.intSpecs);
    },
    capacityChanged: (state, action) => {
      state.capacity = action.payload;
    },
    addr1Changed: (state, action) => {
      state.addr1 = action.payload;
    },
    addr2Changed: (state, action) => {
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
    latitudeChanged: (state, action) => {
      state.latitude = action.payload;
    },
    longitudeChanged: (state, action) => {
      state.longitude = action.payload;
    },
    distanceChanged: (state, action) => {
      state.distance = action.payload;
    },
    avatarChanged: (state, action) => {
      state.avatar = action.payload;
    },
    zoomInited: (state, action) => {
      state.zoom = action.payload;
    },
    zoomChanged: (state) => {
      state.zoom = !state.zoom;
    },
    homeInited: (state, action) => {
      state.home = action.payload;
    },
    homeChanged: (state) => {
      state.home = !state.home;
    },
    // gymChanged: (state) => {
    //   state.gym = !state.gym;
    // },

    // only for trainer
    businessChanged: (state, action) => {
      state.business = action.payload;
    },
    certificationsInited: (state, action) => {
      state.certifications = action.payload;
    },
    certificationsAdded: (state, action) => {
      state.certifications.unshift(action.payload);
    },
    certificationsRemoved: (state, action) => {
      const id = action.payload;
      let index = 0;
      for (const item of state.certifications) {
        if (item.certificationId == id) {
          state.certifications.splice(index, 1);
          break;
        }
        index += 1;
      }
    },
    trainerLocationsInited: (state, action) => {
      state.trainerLocations = action.payload;
    },
    trainerLocationsAdded: (state, action) => {
      state.trainerLocations.unshift(action.payload);
    },
    trainerLocationsRemoved: (state, action) => {
      const id = action.payload;
      let index = 0;
      for (const item of state.trainerLocations) {
        if (item.locationId == id) {
          state.trainerLocations.splice(index, 1);
          break;
        }
        index += 1;
      }
    },
    bioChanged: (state, action) => {
      state.bio = action.payload;
    },
    bidChanged: (state, action) => {
      state.bid = action.payload;
    },
  },
});

export const {
  userIdChanged,
  emailChanged,
  passwordChanged,
  password2Changed,
  firstNameChanged,
  lastNameChanged,
  birthChanged,
  genderChanged,
  mobileChanged,
  intSpecsInited,
  intSpecsChanged,
  zoomInited,
  zoomChanged,
  homeInited,
  homeChanged,
  gymChanged,
  capacityChanged,
  addr1Changed,
  addr2Changed,
  cityChanged,
  stateChanged,
  zipChanged,
  trainerLocationsInited,
  trainerLocationsAdded,
  trainerLocationsRemoved,
  latitudeChanged,
  longitudeChanged,
  distanceChanged,
  avatarChanged,
  businessChanged,
  certificationsInited,
  certificationsAdded,
  certificationsRemoved,
  bioChanged,
  bidChanged,
} = userSlice.actions;

export default userSlice.reducer;
