import Layout from "@/components/Helper/Layout"
import ViewItemComponent from "@/components/Items/ViewItemComponent"
import Loading from "@/components/Utils/Loading"
import { formatProductName } from "@/components/Utils/formatProductName"
import { useDeleteOrderItemMutation, useOneOrderItemQuery } from "@/store/APIs/orderApi"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const ViewItems = () => {
  const router = useRouter()
  const { viewId } = router.query
  const [isLoading, setIsLoading] = useState(false)

  const {
    currentData: allProductsData,
    isSuccess: allProductsDataSuccess,
    isError: allProductsDataError,
    isFetching: allProductsDataIsFetching,
  } = useOneOrderItemQuery(viewId)
  const [
    deleteOrderItem,
    {
      data: deletedProductsResult,
      isLaoding: productIsDeleting,
      isSuccess: productDeleteSuccess,
      isError: productDeleteError,
    },
  ] = useDeleteOrderItemMutation()

  const deleteItemHandler = async () => {
    setIsLoading(true)
    const result = await deleteOrderItem(viewId)
    if (result?.error) {
      if (typeof result?.error?.data?.error === "string") {
        setIsLoading(false)
        return toast.warning(result?.error?.data?.error)
      } else {
        setIsLoading(false)
        return toast.warning(result?.error?.data?.error[0])
      }
    }
    router.push("/items")
  }

  const [productName, setProductName] = useState("")
  const fetchedProductName = allProductsData?.data?.product_category_name

  useEffect(() => {
    setProductName(formatProductName(fetchedProductName))
  }, [fetchedProductName])

  useEffect(() => {
    if (!allProductsDataIsFetching && allProductsDataError) return router.back()
  }, [allProductsDataIsFetching, allProductsDataError])

  return (
    <Layout>
      {(allProductsDataIsFetching || isLoading) && <Loading />}
      {!allProductsDataIsFetching && allProductsData && !isLoading && viewId && !productIsDeleting && (
        <ViewItemComponent
          productName={productName}
          allProductsData={allProductsData}
          viewId={viewId}
          deleteItemHandler={deleteItemHandler}
        />
      )}
    </Layout>
  )
}

export default ViewItems
