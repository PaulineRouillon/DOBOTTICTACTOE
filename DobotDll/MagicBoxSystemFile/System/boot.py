# boot.py -- run on boot-up
# can run arbitrary Python, but best to keep it minimal

import machine
import pyb
import _thread
import mb
def thread_entry():
    while True:
        res = mb.ReadCH375Data()
        if not res:
            _thread.exit()
pyb.UART(2).init(115200, bits=8, parity=None, stop=1)
_thread.start_new_thread(thread_entry, ())
#pyb.main('main.py') # main script to run after this one
#pyb.usb_mode('VCP+MSC') # act as a serial and a storage device
#pyb.usb_mode('VCP+HID') # act as a serial device and a mouse
