import { useSelector } from "react-redux";
import { selectInvoiceList } from "./invoicesSlice";
import { selectProductList } from "./productsSlice"; 

export const useInvoiceListData = () => {
  const invoiceList = useSelector(selectInvoiceList);
  const productList = useSelector(selectProductList);  
  // console.log("111productId", productList);
  const getOneInvoice = (receivedId) => {
    return (
      invoiceList.find(
        (invoice) => invoice.id.toString() === receivedId.toString()
      ) || null
    );
  };

  const getOneProduct = (itemName) => {
    return productList.find((productArray) => {
      return productArray.find((product) => product.itemName === itemName) !== undefined;
    })?.find((product) => product.itemName === itemName) || null;
  };

  const listSize = invoiceList.length;
  const productSize = productList.length;

  return {
    invoiceList,
    getOneInvoice,
    listSize,
    productList,         
    getOneProduct,       
    productSize,
  };
};
