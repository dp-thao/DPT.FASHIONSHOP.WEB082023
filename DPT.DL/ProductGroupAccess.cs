using DPT.Entity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPT.DL
{
    public class ProductGroupAccess
    {
        #region Declaration
        private SqlConnection _sqlConnection;
        private SqlCommand _sqlCommand;
        private string _connectionString = @"Data Source=DESKTOP-MQPJKPQ\SQLEXPRESS;Initial Catalog=DPT.FASHIONSHOP.WEB072023;Integrated Security=True";
        #endregion

        #region Constructor
        // Khởi tạo các đối tượng cần thiết để thực hiện kết nối
        public ProductGroupAccess()
        {
            if (_sqlConnection == null)
            {
                _sqlConnection = new SqlConnection(_connectionString);
            }
            _sqlCommand = _sqlConnection.CreateCommand();
            _sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
            // Mở kết nối dữ liệu
            if (_sqlConnection.State == System.Data.ConnectionState.Closed)
            {
                _sqlConnection.Open();
            }
        }
        #endregion

        #region Method
        public List<ProductGroup> GetListProductGroup()
        {
            var list = new List<ProductGroup>();
            // Lấy dữ liệu
            _sqlCommand.CommandText = "Proc_GetProductGroup";
            var sqlDataReader = _sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var product = new ProductGroup();
                product.ProductGroupID = (Guid)sqlDataReader["ProductGroupID"];
                product.ProductGroupCode = sqlDataReader["ProductGroupCode"].ToString();
                product.ProductGroupName = sqlDataReader["ProductGroupName"].ToString();
                list.Add(product);
            }
            // Trả về dữ liệu
            return list;
        }
        #endregion
    }
}
