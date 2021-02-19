import _thread
import os
import rtt
def main():
    try:
        from System.StudioApi import dType
        f = open('System/filename.txt', 'r')
        path = f.read()
        f.close()
        filefolder = path.split("/")[1]
        execfile = path.split("/")[2]
        scriptname = execfile.split(".")[0]
        ismpy = execfile.split(".")[1]

        if ismpy == 'mpy':
            runmpy = filefolder + '.' + scriptname
            script = "import {}".format(runmpy)
            exec(script)

        if ismpy == 'py':
            f = open(path, 'r')
            devType = f.readline()
            isRail = f.readline()
            script = f.read()
            f.close()
            rtt.print(script)
            devType = devType.split(":")[1]
            devType = devType.strip()
            isRail = isRail.split(":")[1]
            isRail = isRail.strip()

            if isRail == 'True':
                isUsingRail = True
            elif isRail == 'False':
                isUsingRail = False
            else:
                raise RuntimeError('Invaild isRail')

            if devType == 'ML':
                import mgl
                import mb
                api = mgl
                if isUsingRail:
                    mb.SetDeviceWithL(1,0)
                else:
                    mb.SetDeviceWithL(0,0)
            elif devType == 'M':
                import mg
                api = mg
                if isUsingRail:
                    mg.SetDeviceWithL(1)
                else:
                    mg.SetDeviceWithL(0)
            else:
                raise RuntimeError('Invaild Device Type')

            exec(script, {'dType': dType, 'api': api})
    except Exception as e:
        rtt.print("Script Error {}".format(e))

_thread.start_new_thread(main, ())