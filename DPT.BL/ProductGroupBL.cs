using DPT.DL;
using DPT.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPT.BL
{
    public class ProductGroupBL
    {
        #region Declaration
        ProductGroupAccess productGroupAccess;
        #endregion

        #region Contructor
        public ProductGroupBL()
        {
            productGroupAccess = new ProductGroupAccess();
        }
        #endregion

        #region Method
        public List<ProductGroup> GetListProductGroup()
        {
            return productGroupAccess.GetListProductGroup();
        }
        #endregion
    }
}
