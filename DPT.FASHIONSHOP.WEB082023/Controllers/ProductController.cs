﻿using DPT.BL;
using DPT.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DPT.FASHIONSHOP.WEB082023.Controllers
{
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
    }
}