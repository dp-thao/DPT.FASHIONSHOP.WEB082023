using DPT.Entity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPT.DL
{
    public class CalculationUnitAccess
    {
        #region Declaration
        private SqlConnection _sqlConnection;
        private SqlCommand _sqlCommand;
        private string _connectionString = @"Data Source=DESKTOP-MQPJKPQ\SQLEXPRESS;Initial Catalog=DPT.FASHIONSHOP.WEB072023;Integrated Security=True";
        #endregion

        #region Contructor
        public CalculationUnitAccess()
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
        /// <summary>
        /// Hàm lấy danh sách đơn vị tính
        /// </summary>
        /// <returns>Danh sách đơn vị tính</returns>
        public List<CalculationUnit> GetListCalculationUnit()
        {
            var list = new List<CalculationUnit>();

            _sqlCommand.CommandText = "Proc_GetCalculationUnit";
            var sqlDataReader = _sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var calculationUnit = new CalculationUnit();
                calculationUnit.CalculationUnitID = (Guid)sqlDataReader["CalculationUnitID"];
                calculationUnit.CalculationUnitName = sqlDataReader["CalculationUnitName"].ToString();
                list.Add(calculationUnit);
            }

            return list;
        }
        #endregion
    }
}
