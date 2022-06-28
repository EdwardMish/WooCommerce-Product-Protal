import ReactTooltip from "react-tooltip";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

import {useState} from "react"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { productService } from "../../services"

export default function Table({ rowData, currentPage, numberPerPage }) {

  const [open, setOpen] = useState(false)  
  const handleDelete = (_id)=> {
    productService.deleteProduct(_id)
      .then( res => {
        setOpen(false);
        if(res.data.success) alert("Product Deleted Successfully")
      })
      .catch( err => {
        alert(err);
      })
  }
  const productNodes = rowData.map(function (product, index) {
    return (
      <tr key={currentPage * numberPerPage + index}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            {currentPage * numberPerPage + index}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img
                className="h-10 w-10 rounded-full"
                src={product.images[0].src}
                alt={product.name}
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {product.name}
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{product.sku}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div
            dangerouslySetInnerHTML={{ __html: product.price_html }}
            className="text-sm text-gray-900"
          ></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {product.in_stock ? (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              In Stock
            </span>
          ) : (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
              Out Of Stock
            </span>
          )}
        </td>

        <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium cursor-pointer">
          <VisibilityIcon
            data-tip="Preview On Store"
            onClick={() => {
              window.open(product.permalink);
            }}
          />
          <ReactTooltip html={true} />
          <Link to={"/products/detail?_id="+product.id}>
            <EditIcon data-tip="Edit Product" />
          </Link>
          <ReactTooltip html={true} />
          <DeleteIcon
            onClick = {()=>setOpen(!open)}
          />
          <Dialog
              open = {open}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Are you sure that you want to delete this product?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  This operation will delete the product from your WooCommerce store.
                  The product will be moved to the trash.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={()=>setOpen(false)} color="primary">
                  No
                </Button>
                <Button onClick={()=>handleDelete(product.id)} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
        </td>
      </tr>
    );
  });
  return (
    <div className="flex flex-col px-4 py-4">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Product Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    SKU
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {productNodes}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
