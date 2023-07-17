import {create} from 'zustand'
import {Platform} from "react-native";

export const useStore = create((set) => ({
  /* SYSTEM */
  deviceIds: {
    ios: [],
    android: []
  },
  updateDeviceIds: (newDeviceId) => set(state => {
    const platform = Platform.OS;
    const newDeviceIdsByPlatform = [...state.deviceIds[platform]]; // Create a new array to avoid mutating the original state
    if (newDeviceIdsByPlatform.indexOf(newDeviceId) === -1) {
      newDeviceIdsByPlatform.push(newDeviceId);
    }
    return {
      deviceIds: {
        ...state.deviceIds,
        [platform]: newDeviceIdsByPlatform
      }
    };
  }),

  /* USER */
  // general
  role: "client",
  updateRole: (newRole) => set(() => ({role: newRole})),
  isLogged: false,
  updateIsLogged: (newIsLogged) => set(() => ({isLogged: newIsLogged})),
  message: "",
  updateMessage: (newMessage) => set(() => ({message: newMessage})),

  // for both trainers and clients
  userId: -1,
  updateUserId: (newUserId) => set(() => ({userId: newUserId})),
  email: "mat@gmail.com",
  updateEmail: (newEmail) => set(() => ({email: newEmail})),
  password: "mat@123",
  updatePassword: (newPassword) => set(() => ({password: newPassword})),
  password2: "",
  updatePassword2: (newPassword2) => set(() => ({password2: newPassword2})),
  firstName: "",
  updateFirstName: (newFirstName) => set(() => ({firstName: newFirstName})),
  lastName: "",
  updateLastName: (newLastName) => set(() => ({lastName: newLastName})),
  birth: "",
  updateBirth: (newBirth) => set(() => ({birth: newBirth})),
  gender: "",
  updateGender: (newGender) => set(() => ({gender: newGender})),
  mobile: "",
  updateMobile: (newMobile) => set(() => ({mobile: newMobile})),
  intSpecs: [],
  updateIntSpecs: (newIntSpecs) => set(() => ({intSpecs: newIntSpecs})),
  addOrRemoveIntSpec: (newIntSpec) => set((state) => {
    const intSpecId = newIntSpec.categoryId
    const existingIndex = state.intSpecs.findIndex(item => item.categoryId === intSpecId);
    if (existingIndex !== -1) {
      const updatedIntSpecs = [...state.intSpecs];
      updatedIntSpecs.splice(existingIndex, 1);
      return {intSpecs: updatedIntSpecs};
    } else {
      return {intSpecs: [...state.intSpecs, newIntSpec]};
    }
  }),
  capacity: 3,
  updateCapacity: (newCapacity) => set(() => ({capacity: newCapacity})),
  avatarUri: "",
  updateAvatar: (newAvatarUri) => set(() => ({avatarUri: newAvatarUri})),
  zoom: false,
  updateZoom: (newZoom) => set((state) => ({zoom: newZoom})),
  home: false,
  updateHome: (newHome) => set((state) => ({home: newHome})),

  // only for trainers
  business: "",
  updateBusiness: (newBusiness) => set(() => ({business: newBusiness})),
  certifications: [], // { certificationId: "", certificationType: "", certificationNumber: "" },
  updateCertifications: (newCertifications) => set(() => ({certifications: newCertifications})),
  addCertification: (certificationObj) => set((state) => ({certifications: [certificationObj, ...state.certifications]})),
  removeCertification: (certificationId) => set((state) => {
    return {certifications: state.certifications.filter((certification) => certification.certificationId !== certificationId)}
  }),
  trainerLocations: [], // {  locationId: "", "address": "", city: "", state: "", zipcode: "", locationType: Gym/Home, latitude: -1.0, longitude: -1.0 },
  updateTrainerLocations: (newTrainerLocations) => set(() => ({trainerLocations: newTrainerLocations})),
  addTrainerLocation: (locationObj) => set((state) => ({trainerLocations: [...state.trainerLocations, locationObj]})),
  removeTrainerLocation: (locationId) => set((state) => {
    return {trainerLocations: state.trainerLocations.filter((location) => location.locationId !== locationId)}
  }),
  bio: "",
  updateBio: (newBio) => set(() => ({bio: newBio})),
  bid: 0,
  updateBid: (newBid) => set(() => ({bid: newBid})),

  // only for clients
  addr1: "",
  updateAddr1: (newAddr1) => set(() => ({addr1: newAddr1})),
  addr2: "",
  updateAddr2: (newAddr2) => set(() => ({addr2: newAddr2})),
  city: "",
  updateCity: (newCity) => set(() => ({city: newCity})),
  state: "",
  updateState: (newState) => set(() => ({state: newState})),
  zip: "",
  updateZip: (newZip) => set(() => ({zip: newZip})),
  latitude: 37.78825,
  updateLatitude: (newLatitude) => set(() => ({latitude: newLatitude})),
  longitude: -122.4324,
  updateLongitude: (newLongitude) => set(() => ({longitude: newLongitude})),
  distance: 20,
  updateDistance: (newDistance) => set(() => ({distance: newDistance})),
}))