import { createSlice } from "@reduxjs/toolkit"

const amountOfDataToFetchSlice = createSlice({
  name: "amountOfDataToFetch",
  initialState: {
    initialDataToFetch: 20,
    initialDataOffset: 0,
    maximumData: 0,
  },

  reducers: {
    // This function set the total amount of data that is available,
    // this help know when to return if we've reach the max data for fetching
    maxDataFunction: (state, action) => {
      state.maximumData = action.payload
    },

    // Increase the amount of offset data by the previous data offset.
    // This helps next button for pagination to fetch next data
    additionalDataOffsetFunction: (state, action) => {
      console.log("ACTION PAYLOAD:", action.payload)
      console.log("INITIAL OFFSET:", state.initialDataOffset)
      if (action.payload > state.maximumData) {
        state.initialDataOffset = state.initialDataOffset
        state.initialDataToFetch = state.maximumData - state.initialDataOffset
        return
      }
      state.initialDataOffset = state.initialDataToFetch + action.payload
    },

    // Decrease the amount of offset data by the previous data offset.
    // This helps previous button for pagination to fetch previous data
    subtractDataOffsetFunction: (state, action) => {
      const dataOffset = action.payload - state.initialDataToFetch
      if (dataOffset < 0 || dataOffset === 0) {
        state.initialDataOffset = 0
        return
      }
      state.initialDataOffset = dataOffset
    },
    // This function help change the amount of data we can fetch per request (limit is 20 and max is 100)
    changeAmountOfDataToFetchFunction: (state, action) => {
      state.initialDataToFetch = action.payload
    },
  },
})

export const amountOfDataToFetchActions = amountOfDataToFetchSlice.actions
export default amountOfDataToFetchSlice
