import { bottts } from "@dicebear/collection"
import { createAvatar } from "@dicebear/core"
import Image from "next/legacy/image"
import { useEffect, useState } from "react"

const ImageCreator = ({ productImageName }) => {
  const [productImage, setProductImage] = useState("")

  const generateImage = (imageName) => {
    const image = createAvatar(bottts, {
      seed: imageName,
      backgroundColor: ["b6e3f4", "c0aede", "d1d4f9", "ffd5dc"],
      backgroundType: ["gradientLinear", "solid"],
      backgroundRotation: [0, 360],
    })
    setProductImage(image.toDataUriSync())
  }

  useEffect(() => {
    generateImage(productImageName)
  }, [productImageName])

  return (
    <>
      {productImage && (
        <Image src={productImage} className="rounded-md" alt={productImageName} layout="fill" objectFit="cover" />
      )}
    </>
  )
}

export default ImageCreator
