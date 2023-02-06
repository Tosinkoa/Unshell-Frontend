import { amountOfDataToFetchActions } from "@/store/slices/amount-of-data-to-fetch-slice"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as Yup from "yup"
import MyInput from "./Formik"

const PaginationButton = ({ fetchNextData, fetchPreviousData, totalAmountOfDataShowing, total }) => {
  const initialDataLimit = useSelector((state) => state.amountOfDataToFetch.initialDataToFetch)
  const initialDataOffset = useSelector((state) => state.amountOfDataToFetch.initialDataOffset)
  const [whereTheDataStartedFrom, setWhereTheDataStartedFrom] = useState(1)
  const [whereTheDataEndedAt, setWhereTheDataEndedAt] = useState(initialDataLimit)
  const dispatch = useDispatch()
  // This function calculate the from and to from is where the data started from within
  // the total data and the to is where the data ended at within the total data
  const calculateFromTo = () => {
    setWhereTheDataStartedFrom(initialDataOffset + 1)
    if (whereTheDataEndedAt > total) return setWhereTheDataEndedAt(total)
    setWhereTheDataEndedAt(initialDataOffset + initialDataLimit)
  }

  useEffect(() => {
    calculateFromTo()
  }, [totalAmountOfDataShowing, initialDataLimit, initialDataOffset])

  // Validate the amount of data user can fetch at once
  const validation = Yup.object().shape({
    amountOfDataToShow: Yup.number().min(20, "Minimum must be 20").max(100, "Maximum must be 100"),
  })

  const limitDataToFetchPerRequest = (values) => {
    dispatch(amountOfDataToFetchActions.changeAmountOfDataToFetchFunction(values.amountOfDataToShow))
  }

  return (
    <div className="pagination_button_bg">
      <Formik
        validationSchema={validation}
        onSubmit={limitDataToFetchPerRequest}
        initialValues={{ amountOfDataToShow: initialDataLimit }}
      >
        {() => (
          <Form className="pagination_button_form">
            <MyInput
              className="pagination_button_input"
              type="number"
              name="amountOfDataToShow"
              placeholder="20 - 100"
            />
          </Form>
        )}
      </Formik>
      <div className="space-x-1 font-bold">
        <span>
          {whereTheDataStartedFrom}-{whereTheDataEndedAt}
        </span>
        <span>of</span>
        <span>{total}</span>
      </div>
      <div className="space-x-3">
        <button className="pagination_button_next_previous" onClick={fetchPreviousData}>
          Previous
        </button>
        <button className="pagination_button_next_previous" onClick={fetchNextData}>
          Next
        </button>
      </div>
    </div>
  )
}

export default PaginationButton
