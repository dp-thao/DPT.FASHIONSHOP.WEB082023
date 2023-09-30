using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DPT.Entity;

namespace DPT.DL
{
    /// <summary>
    /// Kết nối CSDL
    /// </summary>
    public class ProductAccess
    {
        #region Declaration
        protected SqlConnection _sqlConnection;
        protected SqlCommand _sqlCommand;
        protected string _connectionString = @"Data Source=DESKTOP-MQPJKPQ\SQLEXPRESS;Initial Catalog=DPT.FASHIONSHOP.WEB072023;Integrated Security=True";
        #endregion

        #region Constructor

        #endregion

        #region Methods
        /// <summary>
        /// Hàm lấy danh sách hàng hóa trong DB
        /// </summary>
        /// <returns>Danh sách hàng hóa</returns>
        public List<Product> GetListProduct()
        {
            List<Product> listProduct = new List<Product>();
            // Mở chuỗi kết nối
            _sqlConnection = new SqlConnection(_connectionString);
            _sqlCommand = _sqlConnection.CreateCommand();
            _sqlCommand.CommandType = CommandType.StoredProcedure;
            _sqlCommand.CommandText = "[dbo].[Proc_GetListProduct]";
            if (_sqlConnection.State == ConnectionState.Closed)
            {
                _sqlConnection.Open();
            }
            var sqlDataReader = _sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var product = new Product();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var fieldName = sqlDataReader.GetName(i);
                    var fieldValue = sqlDataReader[i];
                    var property = product.GetType().GetProperty(fieldName);
                    if (property != null && fieldValue != System.DBNull.Value)
                    {
                        property.SetValue(product, fieldValue);
                    }
                }
                listProduct.Add(product);
            }
            return listProduct;
        }
        
        // Thêm mới product
        public void AddNewProduct(Product product)
        {
            // Mở chuỗi kết nối
            _sqlConnection = new SqlConnection(_connectionString);
            _sqlCommand = _sqlConnection.CreateCommand();
            _sqlCommand.CommandType = CommandType.StoredProcedure;
            _sqlCommand.CommandText = "[dbo].[Proc_InsertProduct]";
            if (_sqlConnection.State == ConnectionState.Closed)
            {
                _sqlConnection.Open();
            }
            SqlCommandBuilder.DeriveParameters(_sqlCommand);
            foreach (SqlParameter p in _sqlCommand.Parameters)
            {
                if (p.ParameterName == "@CreatedDate")
                {
                    p.Value = DateTime.Now;
                    continue;
                }
                if (_sqlCommand.Parameters.IndexOf(p) != 0)
                {                    
                    var property = p.ParameterName.Replace("@", "");
                    var value = product.GetType().GetProperty(property).GetValue(product);
                    p.Value = value == null ? DBNull.Value : value;
                }
            }
            _sqlCommand.ExecuteNonQuery();

        }

        // Xóa product
        public void DeleteProduct(Guid[] productIDs)
        {
            if (productIDs.Length > 0)
            {
                // Mở chuỗi kết nối
                _sqlConnection = new SqlConnection(_connectionString);
                for (int item = 0; item < productIDs.Length; item++)
                {
                    _sqlCommand = _sqlConnection.CreateCommand();
                    _sqlCommand.CommandType = CommandType.StoredProcedure;
                    _sqlCommand.CommandText = "[dbo].[Proc_DeleteProduct]";
                    _sqlCommand.Parameters.AddWithValue("@ProductID", productIDs[item]);
                    if (_sqlConnection.State == ConnectionState.Closed)
                    {
                        _sqlConnection.Open();
                    }
                    _sqlCommand.ExecuteNonQuery();
                }
            }             
        }
        #endregion
    }
}
