// components/ProductCard.tsx
import React from "react"

interface ProductCardProps {
  title: string
  image: string
  description: string
}

const ProductCard: React.FC<ProductCardProps> = ({ title, image, description }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-image" />
      <h4 className="product-title">{title}</h4>
      <p className="product-desc">{description}</p>
    </div>
  )
}

export default ProductCard
