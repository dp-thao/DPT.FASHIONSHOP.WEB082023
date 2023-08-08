using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPT.Entity
{
    /// <summary>
    /// Lớp kết quả trả về khi thực hiện controller
    /// </summary>
    public class AjaxResult
    {
        #region Property
        /// <summary>
        /// Kết quả thực hiện
        /// </summary>
        public Boolean Success { get; set; }

        /// <summary>
        /// Tin nhắn trả về
        /// </summary>
        public string Messenger { get; set; }

        /// <summary>
        /// Dữ liệu trả về
        /// </summary>
        public object Data { get; set; }
        #endregion
    }
}
