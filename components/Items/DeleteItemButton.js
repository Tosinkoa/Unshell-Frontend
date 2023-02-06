const DeleteItemButton = ({ deleteItemHandler }) => {
  return (
    <button className="delete_item_comp_button" onClick={deleteItemHandler}>
      Delete
    </button>
  )
}

export default DeleteItemButton
