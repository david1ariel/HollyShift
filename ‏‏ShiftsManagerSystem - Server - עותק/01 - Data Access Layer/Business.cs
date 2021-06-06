using System;
using System.Collections.Generic;

namespace CtrlShift
{
    public partial class Business
    {
        public int BusinessId { get; set; }
        public string BusinessName { get; set; }
        public string Adress { get; set; }
        public string LineOfBusiness { get; set; }
        public string ManagerName { get; set; }
        public string Phone { get; set; }
        public int? EstimatedEmployeesNum { get; set; }
        public string ContactName { get; set; }
        public string ContactPhone { get; set; }
    }
}
