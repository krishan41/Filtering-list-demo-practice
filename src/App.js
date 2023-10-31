import { useState } from "react";

const FilterableProductTable = ({ products }) => {
  const [searchInput, setSearchInput] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  return (
    <div>
      <SearchBar
        onClickSearch={setSearchInput}
        searchVal={searchInput}
        inStock={inStockOnly}
        onClickCheckbox={setInStockOnly}
      />
      <ProductTable
        searchInput={searchInput}
        inStock={inStockOnly}
        products={products}
      />
    </div>
  );
};

const ProductCategoryRow = ({ category }) => {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
};

const ProductRow = ({ product }) => {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  );
};

const ProductTable = ({ products, inStock, searchInput }) => {
  const row = [];
  let lastCategory = null;
  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(searchInput.toLowerCase()) === -1) {
      return;
    }
    console.log(inStock);

    if (inStock && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      row.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    row.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{row}</tbody>
    </table>
  );
};

const SearchBar = ({ onClickSearch, searchVal, inStock, onClickCheckbox }) => {
  return (
    <form>
      <input
        type="text"
        value={searchVal}
        onChange={(e) => onClickSearch(e.target.value)}
        placeholder="Search..."
      />
      <label>
        <input
          type="checkbox"
          checked={inStock}
          onChange={(e) => onClickCheckbox(e.target.checked)}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
};

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
