import DeleteItemButton from "@/components/Items/DeleteItemButton"
import ImageCreator from "@/components/Utils/ImageCreator"
import dayjs from "dayjs"
import Link from "next/link"
import { useRouter } from "next/router"
import { AiOutlineArrowLeft } from "react-icons/ai"

const ViewItemComponent = ({ productName, allProductsData, viewId, deleteItemHandler }) => {
  const formatShippingDateLimit = dayjs(allProductsData.data.shipping_limit_date).format("h:mma D MMM, YYYY")
  const router = useRouter()

  return (
    <div className=" px-2">
      <AiOutlineArrowLeft onClick={() => router.back()} className="view_item_comp_back_button" />
      <div className="view_item_comp_img_bg">
        <ImageCreator productImageName={productName ?? "Good Product"} />
      </div>
      <div className="view_item_comp_bg">
        <div className="space-x-4">
          Price: <span className="font-normal">${allProductsData.data.price}</span>
        </div>
        <div className="space-x-4">
          Freight Value: <span className="font-normal">{allProductsData.data.freight_value}F</span>
        </div>
        <div className="space-x-4">
          Shipping Limit Date: <span className="font-normal">{formatShippingDateLimit}</span>
        </div>
        <div className="view_item_comp_button_bg">
          <Link href="/items/edit-item/[editId]" as={`/items/edit-item/${viewId}`}>
            <button className="view_item_comp_edit_button">Edit</button>
          </Link>
          <DeleteItemButton deleteItemHandler={deleteItemHandler} />
        </div>
      </div>
    </div>
  )
}

export default ViewItemComponent
