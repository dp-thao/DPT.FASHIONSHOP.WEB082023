using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPT.Entity
{
    /// <summary>
    /// Lớp mô tả bảng ProductGroup trong DB
    /// </summary>
    public class ProductGroup
    {
        #region Declaration

        #endregion

        #region Property

        /// <summary>
        /// Khóa chính
        /// </summary>
        public Guid ProductGroupID { get; set; }

        /// <summary>
        /// Mã nhóm hàng
        /// </summary>
        public string ProductGroupCode { get; set; }

        /// <summary>
        /// Tên nhóm hàng
        /// </summary>
        public string ProductGroupName { get; set; }

        /// <summary>
        /// ID nhóm cha
        /// </summary>
        public Guid ParentGroupID { get; set; }

        /// <summary>
        /// Mô tả
        /// </summary>
        public string Description { get; set; }

        #endregion

        #region Constructor

        #endregion

        #region Method

        #endregion
    }
}
