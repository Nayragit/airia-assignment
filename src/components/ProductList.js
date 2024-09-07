import React from 'react'

const ProductList = ({products, handleProductClick}) => {


  console.log(typeof(products));

  

  return (
    <div>
        <table>
          <th>
            Title
          </th>
          <th>
            Price
          </th>
          <th>
            Popularity
          </th>
          {
            products.map(product => (
              <tr onClick={e => handleProductClick(product)}>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.popularity}</td>
              </tr>
            ))
          }
        </table>
    </div>
  )
}

export default ProductList
