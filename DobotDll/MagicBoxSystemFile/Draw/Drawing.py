#devType: ML
#isUsingRail: False
dType.SetQueuedCmdClear(api)
dType.SetQueuedCmdForceStopExec(api)
dType.SetQueuedCmdStartExec(api)
firstIndex = dType.SetArmSpeedRatio(api,1,50, 1)[0]
dType.SetLostStepParams(api,5.0, 0)
cpPathMode = 1
ptpPathMode = 1
runningMode = 1 
moveDataLen = 1141
isAddedHome = True
runningScaler = 1.34
isUsingLinearRail = False
lrLen = 1000
lastDrawIndex = 0
lastPos = [0, 0]
linearRailIndex = []
lastLPos = 0
endtype = 0
txt='Draw/Drawing.txt'
def ctrlHeadBeforeMove(isChange, value):
    global runningMode
    if isChange == 0 or value != 0:
        return
    elif endtype == 1:
        dType.SetEndEffectorGripper(api, 1, 0, 1)
    elif endtype == 2:
        dType.SetEndEffectorSuctionCup(api, 0, 0, 1)
    runningMode = 1
def ctrlHeadAfterMove(isChange, value):
    global runningMode
    if isChange == 0 or value != 1:
        return
    elif endtype == 1:
        dType.SetEndEffectorGripper(api, 1, 1, 1)
    elif endtype == 2:
        dType.SetEndEffectorSuctionCup(api, 1, 1, 1)
    runningMode = 0
def ctrlMovePos(index):
    point = f.readline().split('[')[1].split(']')[0]
    temp = [0, 0, 0, 0, 0]
    for i in range(5):
        temp[i] = float(point.split(',')[i])
    pos = list(temp)
    pos[0] = pos[0]  /  runningScaler
    pos[1] = pos[1]  /  runningScaler
    if isUsingLinearRail:
        pos[1] = -pos[1] + lrLen/2
    return pos
def ctrlSendPos(cpMod, ptpMod,  x,  y,  z):
    global runningMode
    if isUsingLinearRail:
        index = dType.SetCP2Cmd(api, cpMod, x, y, z, 1)
    else:
        if runningMode == 0:
            index = dType.SetCP2Cmd(api, cpMod, x, y, z, 1)
        else:
            index = dType.SetPTPCmd(api, ptpMod , x, y, z, 0, 1)
    return index
moveCnt = 0
f=open(txt, 'r')
if isAddedHome:
    dType.SetHOMECmd(api, 0, 1)
while True:                    
    pos = ctrlMovePos(moveCnt)
    spaceLen = 1000/8
    if isUsingLinearRail:
        if (lastPos != None) and (lastPos[1] > 0):
            if (lastPos[1] - pos[1]) != 0:
                Lnew = ((pos[1] // spaceLen) * spaceLen + spaceLen/2)
                if (lastLPos != Lnew):
                    while(True):
                        resIndex = dType.GetQueuedCmdCurrentIndex(api)[0]
                        if lastDrawIndex <= resIndex:
                            break
                        dType.SetProgbar(api, int((resIndex-firstIndex-len(linearRailIndex))*100/moveDataLen))
                        dType.dSleep(5)
                    current_pose = dType.GetPose(api)
                    lindex = dType.SetPTPWithLCmdEx(api, 1, current_pose[0], current_pose[1], current_pose[2], current_pose[3],Lnew,1)[0]
                    linearRailIndex.append(lindex)
                    lastLPos = Lnew
    ctrlHeadBeforeMove(pos[3], pos[4])
    y = pos[1]
    if (lastPos != None) and isUsingLinearRail:
        y = ((pos[1] // spaceLen) * spaceLen + spaceLen/2) - pos[1]
    lastDrawIndex = ctrlSendPos(cpPathMode, ptpPathMode, pos[0], y, pos[2])[0]
    index = dType.GetQueuedCmdCurrentIndex(api)[0]
    dType.SetProgbar(api, int((index - firstIndex - len(linearRailIndex))*100/moveDataLen))
    dType.dSleep(5)
    ctrlHeadAfterMove(pos[3], pos[4]) 
    lastPos = pos
    moveCnt += 1
    if moveCnt == moveDataLen:
        moveCnt = 0
        f.close()
        break 
while True:
    index = dType.GetQueuedCmdCurrentIndex(api)[0]
    if (firstIndex + moveDataLen + len(linearRailIndex)) <= index:
        dType.SetProgbar(api, 100)
        dType.dSleep(1000)
        dType.RestartMagicBox(api)
        break
    else:
        dType.SetProgbar(api, int((index - firstIndex - len(linearRailIndex))*100/moveDataLen))
        dType.dSleep(5)
        