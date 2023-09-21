using DPT.BL;
using DPT.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DPT.FASHIONSHOP.WEB082023.Controllers
{
    [RoutePrefix("products")]
    public class ProductController : Controller
    {
        ProductBL productBL = new ProductBL();
        // GET: Product
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Get()
        {
            // Đối tượng trả về
            AjaxResult result = new AjaxResult();
            try
            {
                result.Data = productBL.GetAllProduct();
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

        /// <summary>
        ///  Hàm kiểm tra mã SKU đã tồn tại hay chưa
        /// </summary>
        /// <param name="skucode">Mã SKU</param>
        /// <returns>Đối tượng Ajax kết quả thực hiện</returns>
        /// date: 10/08/2023
        [HttpPost]
        [Route("{skucode}")]
        public JsonResult CheckSkucode(string skucode)
        {
            AjaxResult result = new AjaxResult();


            // Chuyển đối tượng trả về thành kiểu JSON
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Thêm mới product
        /// </summary>
        /// <param name="product"></param>
        /// <returns></returns>
        public JsonResult AddNewProduct(Product product)
        {
            AjaxResult result = new AjaxResult();
            productBL.AddNewProduct(product);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Xóa product
        /// </summary>
        /// <param name="arrProductIsChoose"></param>
        /// <returns></returns>
        public JsonResult DeleteProduct(Guid[] productIDs)
        {
            AjaxResult result = new AjaxResult();
            productBL.DeleteProduct(productIDs);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}