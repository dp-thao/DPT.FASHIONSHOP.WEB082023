using DPT.DL;
using DPT.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPT.BL
{
    public class CalculationUnitBL
    {
        #region Declaration
        CalculationUnitAccess calculationUnitAccess;
        #endregion

        #region Contructor
        public CalculationUnitBL()
        {
            calculationUnitAccess = new CalculationUnitAccess();
        }
        #endregion

        #region Method
        public List<CalculationUnit> GetListCalculationUnit()
        {
            return calculationUnitAccess.GetListCalculationUnit();
        }
        #endregion
    }
}
