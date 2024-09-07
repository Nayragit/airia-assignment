import React, { useState, useEffect } from 'react'
import './App.css';
import ProductList from './components/ProductList';
import ProductModal from './components/ProductModal';

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [popularityRange, setPopularityRange] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://cdn.drcode.ai/interview-materials/products.json');
        const data = await response.json();

        const productList = Object.values(data.products);
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();
  }, []);

  const filterByPrice = (product) => {
    const price = parseInt(product.price, 10);
    switch (priceRange) {
      case '0-5000':
        return price <= 5000;
      case '5000-10000':
        return price > 5000 && price <= 10000;
      case '10000-20000':
        return price > 10000 && price <= 20000;
      case '20000+':
        return price > 20000;
      default:
        return true; // No price filter applied
    }
  };

  const filterByPopularity = (product) => {
    const popularity = parseInt(product.popularity, 10);
    switch (popularityRange) {
      case '0-10000':
        return popularity <= 10000;
      case '10000-30000':
        return popularity > 10000 && popularity <= 30000;
      case '30000-50000':
        return popularity > 30000 && popularity <= 50000;
      case '50000+':
        return popularity > 50000;
      default:
        return true;
    }
  };

  const sortProducts = (productList) => {
    return [...productList].sort((a, b) => {
      const priceA = parseInt(a.price, 10);
      const priceB = parseInt(b.price, 10);
      const popularityA = parseInt(a.popularity, 10);
      const popularityB = parseInt(b.popularity, 10);

      switch (sortOption) {
        case 'price-asc':
          return priceA - priceB; // Sort by price ascending
        case 'price-desc':
          return priceB - priceA; // Sort by price descending
        case 'popularity-asc':
          return popularityA - popularityB; // Sort by popularity ascending
        case 'popularity-desc':
          return popularityB - popularityA; // Sort by popularity descending
        default:
          return 0; // No sorting applied
      }
    });
  };

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(filterByPrice)
    .filter(filterByPopularity);

  const sortedProducts = sortProducts(filteredProducts);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    if(pageNumber<1) {
      setCurrentPage(1);
    } else if(pageNumber >= totalPages) {
      setCurrentPage(totalPages)
    } else
    setCurrentPage(pageNumber);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  
  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='form-container'>
        <label>Filter by Price Range: </label>
        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
          <option value="">All</option>
          <option value="0-5000">0 - 5000</option>
          <option value="5000-10000">5000 - 10000</option>
          <option value="10000-20000">10000 - 20000</option>
          <option value="20000+">20000+</option>
        </select>
      </div>

      <div className='form-container'>
        <label>Filter by Popularity Range: </label>
        <select value={popularityRange} onChange={(e) => setPopularityRange(e.target.value)}>
          <option value="">All</option>
          <option value="0-10000">0 - 10000</option>
          <option value="10000-30000">10000 - 30000</option>
          <option value="30000-50000">30000 - 50000</option>
          <option value="50000+">50000+</option>
        </select>
      </div>

      <div className='form-container'>
        <label>Sort by: </label>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">None</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="popularity-asc">Popularity (Low to High)</option>
          <option value="popularity-desc">Popularity (High to Low)</option>
        </select>
      </div>

      <ProductList products={currentProducts} handleProductClick={handleProductClick} />

      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page</span>
        <input type="number" value={currentPage} min={1} max={totalPages} onChange={e => handlePageChange(parseInt(e.target.value))} onFocus={e=> e.target.select()}></input>
        <span>of {totalPages} </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      <ProductModal product={selectedProduct} onClose={handleCloseModal} />

    </div>
  );
}

export default App;
