import Link from "next/link"

const CheckEmailMessage = ({ message }) => {
  return (
    <div className="space-y-4">
      <div className="w-10/12 mx-auto text-center text-lg justify-center font-bold mt-44 flex flex-column">
        <h1>{message}</h1>
      </div>
      <Link href="/" aria-label="Home">
        <div className="flex mx-auto focus:ring-2 focus:ring-offset-2 focus:ring-nairaonlyColor-500 text-sm font-semibold leading-none text-white focus:outline-none bg-nairaonlyColor-500  mt-4 shadow-sm dark:shadow-slate-50 rounded hover:bg-nairaonlyColor-400  w-fit disabled:bg-nairaonlyColor-200 px-4 py-2 cursor-pointer">
          Go Home
        </div>
      </Link>
    </div>
  )
}

export default CheckEmailMessage
