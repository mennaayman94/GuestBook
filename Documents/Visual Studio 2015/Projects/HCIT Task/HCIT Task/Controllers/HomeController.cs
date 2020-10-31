using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;

namespace HCIT_Task.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        //passing image object in httppost
        public ActionResult Index(HttpPostedFileBase imgfile)
        {
            if (imgfile != null && imgfile.ContentLength > 0)
            {
                string imgname = Path.GetFileName(imgfile.FileName);
                string imgext = Path.GetExtension(imgname);
                string imgpath = Path.Combine(Server.MapPath("~/Img"), imgname);
                imgfile.SaveAs(imgpath);
            }
            return View();
        }
    }
}
