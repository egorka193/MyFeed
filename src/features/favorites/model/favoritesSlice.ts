import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type PostModel } from "@/shared/types/api-types";

interface FavoritesState {
  items: PostModel[];
}

const loadFromStorage = (): PostModel[] => {
  try {
    const data = localStorage.getItem("favorites");
    return data ? (JSON.parse(data) as PostModel[]) : [];
  } catch {
    return [];
  }
};

const initialState: FavoritesState = {
  items: loadFromStorage(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<PostModel>) => {
      const exists = state.items.find((p) => p.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter((p) => p.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
