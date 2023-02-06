import ListItems from "../Utils/ItemsListing"

const AllProductsData = ({ allProductsData }) => {
  return (
    <div>
      <ListItems dataToMapAndList={allProductsData} />
    </div>
  )
}

export default AllProductsData
