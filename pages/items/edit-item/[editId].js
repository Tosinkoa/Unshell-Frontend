import Layout from "@/components/Helper/Layout"
import ItemForm from "@/components/Items/ItemForm"
import Loading from "@/components/Utils/Loading"
import { formatProductName } from "@/components/Utils/formatProductName"
import { useOneOrderItemQuery } from "@/store/APIs/orderApi"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Edit = () => {
  const router = useRouter()
  const { editId } = router.query
  const [productName, setProductName] = useState("")
  const {
    currentData: allProductsData,
    isError: allProductsDataError,
    isFetching: allProductsDataIsFetching,
  } = useOneOrderItemQuery(editId)

  const fetchedProductName = allProductsData?.product_category_name

  useEffect(() => {
    setProductName(formatProductName(fetchedProductName))
  }, [fetchedProductName])

  useEffect(() => {
    if (!allProductsDataIsFetching && allProductsDataError) router.push("/404")
  }, [allProductsDataIsFetching, allProductsDataError])

  return (
    <Layout>
      {allProductsDataIsFetching && <Loading />}
      {!allProductsDataIsFetching && allProductsData && (
        <ItemForm itemFormData={allProductsData} productName={productName} />
      )}
    </Layout>
  )
}

export default Edit
