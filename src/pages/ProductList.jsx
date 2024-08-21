import React, { useState } from "react";
import { useInvoiceListData } from "../redux/hooks";
import { useDispatch } from "react-redux";
import EditProductModal from "../components/EditProductModal"; 
import { Button, Card, Col, Row, Table, Nav, Tab } from "react-bootstrap";
import { addProduct, updateProduct } from "../redux/productsSlice";
import { BiSolidPencil } from "react-icons/bi";

const ProductList = ({ items }) => {
  const { productList, getOneProduct, productSize } = useInvoiceListData();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const isListEmpty = productSize === 0;

  const handleEditClick = (productName) => {
    setIsOpen(true);
    const product = getOneProduct(productName);
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  const handleUpdateProduct = (updatedProduct) => {
     console.log("update entry", updatedProduct);
    dispatch(updateProduct(updatedProduct));
    handleCloseModal();
  };

  const flattenedProductList = productList.reduce((acc, val) => [...acc, ...val], []);

  return (
    <>
      <Table borderless>
        <thead>
          <tr>
            <th>Product No.</th>
            <th>Item Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isListEmpty ? (
            <tr>
              <td colSpan={7} className="text-center">No data available</td>
            </tr>
          ) : (
            flattenedProductList.filter(item => item?.itemName).map((item, index) => (
              <tr key={item.itemId} style={{ borderBottom: "1px solid #ccc" }}>
                <td>{index + 1}</td>
                <td>{item.itemName}</td>
                <td>{item.itemDescription}</td>
                <td>${item.itemPrice}</td>
                <td>{item.itemQuantity}</td>
                <td>${(item.itemPrice * item.itemQuantity).toFixed(2)}</td>
                <td>
                  <Button variant="outline-primary" onClick={() => handleEditClick(item?.itemName)}>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <BiSolidPencil />
                    </div>
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {isOpen && selectedProduct && (
        <EditProductModal
          show={isOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
          onUpdateProduct={handleUpdateProduct}
        />
      )}
    </>
  );
};

export default ProductList;