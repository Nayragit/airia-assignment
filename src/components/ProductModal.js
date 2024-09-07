import React from 'react';

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{product.title}</h2>
        <p><strong>Price:</strong> {product.price}</p>
        <p><strong>Popularity:</strong> {product.popularity}</p>
        <p><strong>Description:</strong> {product.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel magna varius, pellentesque arcu quis, tristique ex. Ut sit amet rhoncus neque. Nam eu vestibulum eros, commodo semper purus. Morbi eget maximus odio. Phasellus nec pulvinar augue. Sed laoreet in nibh ac ornare. Curabitur vel nisi efficitur, lobortis enim id, dictum est. Etiam interdum mattis posuere. Interdum et malesuada fames ac ante ipsum primis in faucibus.'}</p>
      </div>
    </div>
  );
};

export default ProductModal;
