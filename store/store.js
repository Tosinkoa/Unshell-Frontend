import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { authApi } from "./APIs/authApi"
import { fetcherApi } from "./fetcherApi"
import amountOfDataToFetchSlice from "./slices/amount-of-data-to-fetch-slice"

const store = configureStore({
  reducer: {
    [fetcherApi.reducerPath]: fetcherApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    amountOfDataToFetch: amountOfDataToFetchSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fetcherApi.middleware),
})
setupListeners(store.dispatch)

export default store
