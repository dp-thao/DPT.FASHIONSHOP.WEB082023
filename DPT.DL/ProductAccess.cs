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
            _sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
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
        
        public void AddNewProduct(Product product)
        {
            // Mở chuỗi kết nối
            _sqlConnection = new SqlConnection(_connectionString);
            _sqlCommand = _sqlConnection.CreateCommand();
            _sqlCommand.CommandType = CommandType.StoredProcedure;
            _sqlCommand.CommandText = "[dbo].[Proc_InsertProduct]";
            _sqlCommand.Parameters.AddWithValue("@ProductName", product.ProductName);
            _sqlCommand.Parameters.AddWithValue("@SKUCode", product.SKUCode);
            _sqlCommand.Parameters.AddWithValue("@BarCode", product.BarCode);
            _sqlCommand.Parameters.AddWithValue("@PurchasePrice", product.PurchasePrice);
            _sqlCommand.Parameters.AddWithValue("@SalePrice", product.SalePrice);
            _sqlCommand.Parameters.AddWithValue("@CalculationUnitID", product.CalculationUnitID);
            _sqlCommand.Parameters.AddWithValue("@InitialInventoryQuantity", product.InitialInventoryQuantity);
            _sqlCommand.Parameters.AddWithValue("@MinQuantity", product.MinQuantity);
            _sqlCommand.Parameters.AddWithValue("@MaxQuantity", product.MaxQuantity);
            _sqlCommand.Parameters.AddWithValue("@StockLocation", product.StockLocation);
            _sqlCommand.Parameters.AddWithValue("@DisplayLocation", product.DisplayLocation);
            _sqlCommand.Parameters.AddWithValue("@Status", product.Status);
            _sqlCommand.Parameters.AddWithValue("@InActive", product.InActive);
            _sqlCommand.Parameters.AddWithValue("@Description", product.Description);
            _sqlCommand.Parameters.AddWithValue("@ProductGroupID", product.ProductGroupID);
            _sqlCommand.Parameters.AddWithValue("@ColorTag", product.ColorTag);
            _sqlCommand.Parameters.AddWithValue("@SizeTag", product.SizeTag);
            _sqlCommand.Parameters.AddWithValue("@Image", product.Image);
            _sqlCommand.Parameters.AddWithValue("@ProductTypeID", product.ProductTypeID);
            _sqlCommand.Parameters.AddWithValue("@CreatedDate", DateTime.Now);
            _sqlCommand.Parameters.AddWithValue("@CreatedBy", "");
            if (_sqlConnection.State == ConnectionState.Closed)
            {
                _sqlConnection.Open();
            }
            _sqlCommand.ExecuteNonQuery();
            
        }
        #endregion
    }
}
