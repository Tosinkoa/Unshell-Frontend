import Layout from "@/components/Helper/Layout"
import AllProductsData from "@/components/Home/AllProductsData"
import NoDataMessage from "@/components/Home/NoDataMessage"
import Loading from "@/components/Utils/Loading"
import PaginationButton from "@/components/Utils/PaginationButton"
import { useOrderItemsQuery } from "@/store/APIs/orderApi"
import { amountOfDataToFetchActions } from "@/store/slices/amount-of-data-to-fetch-slice"
import "aos/dist/aos.css"
import { useDispatch, useSelector } from "react-redux"

const Items = () => {
  const initialDataLimit = useSelector((state) => state.amountOfDataToFetch.initialDataToFetch)
  const initialDataOffset = useSelector((state) => state.amountOfDataToFetch.initialDataOffset)
  const dispatch = useDispatch()

  const {
    currentData: allOrderData,
    isError: allOrderDataError,
    isFetching: allOrderDataIsFetching,
  } = useOrderItemsQuery({ limit: initialDataLimit, offset: initialDataOffset }, { refetchOnMountOrArgChange: true })

  // Fetch next data whenever next button is clicked <PaginationButton /> component
  const fetchNextData = () => {
    dispatch(amountOfDataToFetchActions.maxDataFunction(allOrderData?.total))
    if (initialDataOffset === 0)
      return dispatch(amountOfDataToFetchActions.additionalDataOffsetFunction(initialDataOffset + initialDataLimit))
    dispatch(amountOfDataToFetchActions.additionalDataOffsetFunction(initialDataOffset))
  }

  // Fetch previous data whenever next button is clicked in the <PaginationButton /> component
  const fetchPreviousData = () => {
    dispatch(amountOfDataToFetchActions.maxDataFunction(allOrderData?.total))
    dispatch(amountOfDataToFetchActions.subtractDataOffsetFunction(initialDataOffset))
  }

  return (
    <Layout>
      {allOrderDataIsFetching && <Loading />}
      {!allOrderDataIsFetching && allOrderDataError && <NoDataMessage content="You didnot have any order!" />}
      {!allOrderDataIsFetching && !allOrderDataError && (
        <>
          <AllProductsData allProductsData={allOrderData} />
          <PaginationButton
            totalAmountOfDataShowing={allOrderData?.data?.length}
            total={allOrderData?.total}
            fetchNextData={fetchNextData}
            fetchPreviousData={fetchPreviousData}
          />
        </>
      )}
    </Layout>
  )
}

export default Items
