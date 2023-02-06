import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ImageCreator from "./ImageCreator"
import { formatProductName } from "./formatProductName"

const ListItems = ({ dataToMapAndList }) => {
  const router = useRouter()
  return (
    <div className="all_products_grid">
      {dataToMapAndList?.data?.map((data) => (
        <div key={data._id} data-aos="fade-up" data-aos-delay="200" data-aos-offset="0">
          <ItemsListing
            id={data._id}
            product_category_name={router.pathname === "/" ? data.product_category_name : data.product_category}
            product_weight_g={router.pathname === "/" ? data.product_weight_g : data.price}
          />
        </div>
      ))}
    </div>
  )
}

const ItemsListing = ({ id, product_category_name, product_weight_g }) => {
  const router = useRouter()
  const [productName, setProductName] = useState("")

  useEffect(() => {
    setProductName(formatProductName(product_category_name))
  }, [product_category_name])

  const showOrderDetails = () => {
    if (router.pathname === "/") return
    router.push({
      pathname: "/items/[id]",
      query: { id },
    })
  }

  return (
    <div key={id} onClick={showOrderDetails}>
      <div className="all_items_bg">
        <ImageCreator productImageName={productName ? productName : "Good Product"} key={id} />
      </div>
      <div className="item_listing_details">
        <div>${product_weight_g ?? "200"}</div>
        <div className="item_listing_product_name">{productName ? productName : "Good Product"}</div>
      </div>
    </div>
  )
}

export default ListItems
