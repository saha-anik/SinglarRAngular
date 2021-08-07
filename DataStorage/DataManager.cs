using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationAngular.Model;

namespace WebApplicationAngular.DataStorage
{
    public static class DataManager
    {
        private static int _counter = 0;

        public static SignalRModel GetData()
        {
            return new SignalRModel {Counter = _counter++};
        }
    }
}
