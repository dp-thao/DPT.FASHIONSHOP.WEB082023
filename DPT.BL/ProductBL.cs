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
        public List<Product> GetAllProduct()
        {
            ProductAccess productAccess = new ProductAccess();
            List<Product> listProduct = productAccess.GetListProduct();
            return listProduct;
        }
        #endregion
    }
}
