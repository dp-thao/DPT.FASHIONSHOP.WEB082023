using DPT.DL;
using DPT.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPT.BL
{
    public class ProductBL
    {
        #region Declaration

        #endregion

        #region Constructor
        public ProductBL()
        {

        }
        #endregion

        #region Methods
        /// <summary>
        /// Lấy danh sách product
        /// </summary>
        /// <returns>Danh sách product</returns>
        public List<Product> GetAllProduct()
        {
            ProductAccess productAccess = new ProductAccess();
            List<Product> listProduct = productAccess.GetListProduct();
            return listProduct;
        }
        /// <summary>
        /// Thêm mới product
        /// </summary>
        /// <param name="product">Đối tượng product</param>
        public void AddNewProduct(Product product)
        {
            ProductAccess productAccess = new ProductAccess();
            productAccess.AddNewProduct(product);
        }

        /// <summary>
        /// Xóa product
        /// </summary>
        /// <param name="productIDs">danh sách productID cần xóa</param>
        public void DeleteProduct(Guid[] productIDs)
        {
            ProductAccess productAccess = new ProductAccess();
            productAccess.DeleteProduct(productIDs);
        }
        #endregion
    }
}
