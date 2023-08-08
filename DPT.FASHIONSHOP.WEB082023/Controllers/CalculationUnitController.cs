using DPT.BL;
using DPT.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DPT.FASHIONSHOP.WEB082023.Controllers
{
    public class CalculationUnitController : Controller
    {
        CalculationUnitBL calculationUnitBL = new CalculationUnitBL();

        // GET: CalculationUnit
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Hàm lấy danh sách đơn vị tính
        /// </summary>
        /// <returns>Danh sách đơn vị tính</returns>
        /// date: 06/08/2023
        public JsonResult Get()
        {
            // Đối tượng trả về
            AjaxResult result = new AjaxResult();
            try
            {
                result.Data = calculationUnitBL.GetListCalculationUnit();
                // Gán các thông tin bổ sung khi thành công
                result.Success = true;
                result.Messenger = "Thành công";
            }
            catch (Exception ex)
            {
                // Gán các thông tin bổ sung khi thất bại
                result.Success = false;
                result.Messenger = "Thất bại";
            }
            // Chuyển đối tượng trả về thành kiểu JSON
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}