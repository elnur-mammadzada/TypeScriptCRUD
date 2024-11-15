import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInitialState, UserType } from "../types/types";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "fetchUsers",
  async (_, thunkApi) => {
    try {
      const response = await axios.get<UserType[]>(
        "https://66fcde2bc3a184a84d1834e8.mockapi.io/api/users/users"
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue("Nəsə yanlış getdi");
    }
  }
);

export const addUsers = createAsyncThunk(
  "addUsers",
  async (newUser: UserType, thunkApi) => {
    try {
      const response = await axios.post<UserType>(
        "https://66fcde2bc3a184a84d1834e8.mockapi.io/api/users/users",
        newUser
      );
      thunkApi.dispatch(fetchUsers());
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue("Nəsə yanlış getdi");
    }
  }
);

export const getUserById = createAsyncThunk(
  "getUserById",
  async (id: number, thunkApi) => {
    try {
      const response = await axios.get<UserType>(
        `https://66fcde2bc3a184a84d1834e8.mockapi.io/api/users/users/${id}`
      );
      const data = response.data;
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue("Nəsə yanlış getdi");
    }
  }
);

export const updateUsers = createAsyncThunk(
  "updateUsers",
  async (updatedUsers: UserType, thunkApi) => {
    try {
      const response = await axios.put(
        `https://66fcde2bc3a184a84d1834e8.mockapi.io/api/users/users/${updatedUsers.id}`,
        updatedUsers
      );

      thunkApi.dispatch(fetchUsers());
      const data = response.data;
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue("Nəsə yanlış getdi");
    }
  }
);

export const deleteUsers = createAsyncThunk(
  "deleteUsers",
  async (id: number, thunkApi) => {
    try {
      await axios.delete(
        `https://66fcde2bc3a184a84d1834e8.mockapi.io/api/users/users/${id}`
      );
      thunkApi.dispatch(fetchUsers());

      return id;
    } catch (error) {
      return thunkApi.rejectWithValue("Nəsə yanlış getdi");
    }
  }
);

const initialState: UserInitialState = {
  users: [],
  loading: false,
  isSnackbarOpen: false,
  snackbarMessage: "",
  error: null,
  userById: {},
  selectedId: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    closeSnackbar: (state) => {
      state.isSnackbarOpen = false;
      state.snackbarMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<UserType[]>) => {
          state.loading = false;
          state.users = action.payload;
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
      });
    // ADD
    builder
      .addCase(addUsers.fulfilled, (state, action) => {
        state.isSnackbarOpen = true;
        state.snackbarMessage = `İstifadəçi yaradıldı:  ${action.payload.name}`;
      })
      .addCase(addUsers.rejected, (state, action) => {
        state.error = String(action.payload);
      });
    //GETUSERBYID
    builder
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.userById = action.payload;
      })

      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
      });

    builder
      .addCase(updateUsers.fulfilled, (state, action) => {
        state.isSnackbarOpen = true;
        state.snackbarMessage = `Düzəliş olundu:  ${action.payload}`;
      })
      .addCase(updateUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
      });

    // DELETE
    builder
      .addCase(deleteUsers.fulfilled, (state, action) => {
        state.isSnackbarOpen = true;
        state.snackbarMessage = `İstifadəçi silindi:  ${action.payload}`;
      })
      .addCase(deleteUsers.rejected, (state, action) => {
        state.error = String(action.payload);
      });
  },
});

export const { closeSnackbar, setSelectedId } = userSlice.actions;

export default userSlice.reducer;
