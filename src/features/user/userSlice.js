import { getAddress } from '../../services/apiGeocoding';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// função que pega a posição do usuário através do navegador que usa a API de geolocalização
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// --------------------------------- PARTE DO REDUX THUNK ---------------------------------------------
export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    // Payload of the FULLFILLED state
    return { position, address };
  },
);

// --------------------------------- PARTE DO REDUX ---------------------------------------------
// 1° Passo - Criar um slice

const initialState = {
  userName: '',
  status: 'idle',
  position: {},
  address: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = 'idle';
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        // state.error = action.error.message;
        state.error =
          'There was a problem fetching the address. Make sure to fill this field ';
      }),
});

// 2° Passo - Exportar as actions e o reducer
export const { updateName } = userSlice.actions;

export default userSlice.reducer;

// o 3° Passo está no arquivo src/store.js

export const getUsername = (state) => state.user.userName;
