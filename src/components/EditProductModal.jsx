import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { updateInvoiceItem } from "../redux/invoicesSlice";

const EditProductModal = ({ show, onClose, product, onUpdateProduct }) => {
  const [editedProduct, setEditedProduct] = useState(product || {});
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateProduct(editedProduct);
    dispatch(updateInvoiceItem({ itemName: editedProduct.itemName, updatedProduct: editedProduct }));


    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="itemName">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              name="itemName"
              value={editedProduct.itemName || ""}
              onChange={handleChange}
              readOnly 
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="itemDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="itemDescription"
              value={editedProduct.itemDescription || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="itemPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="itemPrice"
              value={editedProduct.itemPrice || 0}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="itemQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="itemQuantity"
              value={editedProduct.itemQuantity || 0}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProductModal;