import MyInput from "@/components/Utils/Formik"
import { useUpdateOrderItemMutation } from "@/store/APIs/orderApi"
import dayjs from "dayjs"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useState } from "react"
import * as Yup from "yup"
import ImageCreator from "../Utils/ImageCreator"

const ItemForm = ({ itemFormData, productName }) => {
  const router = useRouter()
  const { editId } = router.query
  const [updateOrderItem] = useUpdateOrderItemMutation()
  const [isLaoding, setIsLoading] = useState(false)

  // Validate user inputs
  const validation = Yup.object().shape({
    price: Yup.number()
      .min(10, "Minimum price is $10")
      .max(1000, "Maximum price is $1000")
      .required("Price is required"),
    freight_value: Yup.number()
      .min(10, "Minimum freight value is be 10F")
      .max(100, "Maximum freight value is 100F")
      .required("Freight value is required"),
    shipping_limit_date: Yup.date()
      .typeError(() => "Invalid shipping limit date")
      .required("Please enter a shipping limit date"),
  })

  // Initial values form
  const initialValues = {
    price: itemFormData.data.price,
    freight_value: itemFormData.data.freight_value,
    shipping_limit_date: dayjs(itemFormData.data.shipping_limit_date).format("YYYY-MM-DD"),
  }

  // This function make a request to update the edited item
  const MakeRequestToUpdateItem = async (values) => {
    const result = await updateOrderItem({ orderId: editId, body: values })
    if (result?.error) {
      if (typeof result?.error?.data?.error === "string") {
        setIsLoading(false)
        return toast.warning(result?.error?.data?.error)
      } else {
        setIsLoading(false)
        return toast.warning(result?.error?.data?.error[0])
      }
    } else {
      router.push("/items")
    }
  }

  return (
    <div>
      <div className="item_form_profile_img">
        <ImageCreator productImageName={productName ?? "Good Product"} />
      </div>
      <Formik validationSchema={validation} onSubmit={MakeRequestToUpdateItem} initialValues={initialValues}>
        {() => (
          <Form className="item_form_bg">
            <div className="space-y-1">
              <MyInput
                className="item_form_input"
                type="number"
                name="price"
                label="Price"
                placeholder="Enter a price"
              />
            </div>
            <div className="space-y-1">
              <MyInput
                className="item_form_input"
                type="number"
                label="Freight Value"
                name="freight_value"
                placeholder="Enter a freight value"
              />
            </div>
            <div className="space-y-1">
              <MyInput
                className="item_form_input"
                type="date"
                label="Shipping Limit Date"
                name="shipping_limit_date"
                placeholder="mm/dd/yyy"
              />
            </div>
            <button type="submit" className="item_form_button">
              {isLaoding ? <div className="item_form_spinner"></div> : <div className="mx-auto">Update</div>}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ItemForm
