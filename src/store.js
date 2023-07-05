import {create} from 'zustand'

export const useStore = create((set) => ({
  /* SYSTEM */
  role: "client",
  updateRole: (newRole) => set(() => ({role: newRole})),
  isLogged: false,
  updateIsLogged: (newIsLogged) => set(() => ({isLogged: newIsLogged})),
  message: "",
  updateMessage: (newMessage) => set(() => ({message: newMessage})),

  /* USER */
  // properties for both trainers and clients
  userId: "",
  updateUserId: (newUserId) => set(() => ({userId: newUserId})),
  email: "shawn@gmail.com",
  updateEmail: (newEmail) => set(() => ({email: newEmail})),
  password: "shawn@123",
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
  updateZoom: () => set((state) => ({zoom: !state.zoom})),
  home: false,
  updateHome: () => set((state) => ({home: !state.home})),

  // properties only for trainers
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

  // properties only for clients
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