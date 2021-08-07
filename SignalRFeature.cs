using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace WebApplicationAngular
{
    public class SignalRFeature
    {
        private readonly Timer _timer;
        private readonly Action _action;

        public DateTime TimerStarted { get; }

        public SignalRFeature(Action action)
        {
            _action = action;
            _timer = new Timer(Execute, new AutoResetEvent(false), 1000, 2000);
            TimerStarted = DateTime.Now;
        }

        public void Execute(object stateInfo)
        {
            _action();

            if ((DateTime.Now - TimerStarted).Seconds > 60)
            {
                _timer.Dispose();
            }
        }
    }
}
