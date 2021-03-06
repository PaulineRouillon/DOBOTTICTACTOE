# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'maintenance.ui'
#
# Created by: PyQt5 UI code generator 5.15.2
#
# WARNING: Any manual changes made to this file will be lost when pyuic5 is
# run again.  Do not edit this file unless you know what you are doing.

from PyQt5 import QtCore, QtGui, QtWidgets
from PyQt5.QtWidgets import QApplication, QMessageBox, QMainWindow, QAction
# import the necessary packages
from imageanalysis import ImageRecognition
import cv2
import time



class Ui_maintenance(object):
    def __init__(self,window,_dobot):
        self.main = window
        self.dobot = _dobot
        self.dobot.connectDobot()
        self.stateDobot = self.dobot.initDobot()
    
        
    def setupUi(self, maintenance):
        maintenance.setObjectName("maintenance")
        maintenance.resize(1164, 773)
        self.thisWindows=maintenance
        maintenance.setMaximumSize(QtCore.QSize(1164, 2581))
        font = QtGui.QFont()
        font.setFamily("PMingLiU-ExtB")
        font.setPointSize(12)
        maintenance.setFont(font)
        maintenance.setContextMenuPolicy(QtCore.Qt.NoContextMenu)
        icon = QtGui.QIcon()
        icon.addPixmap(QtGui.QPixmap("71UU+enQH9L._AC_SY355_.jpg"), QtGui.QIcon.Normal, QtGui.QIcon.Off)
        maintenance.setWindowIcon(icon)
        maintenance.setLayoutDirection(QtCore.Qt.LeftToRight)
        maintenance.setStyleSheet("background-color: rgb(0, 85, 127);")
        self.centralwidget = QtWidgets.QWidget(maintenance)
        self.centralwidget.setObjectName("centralwidget")
        self.lbhome = QtWidgets.QLabel(self.centralwidget)
        self.lbhome.setGeometry(QtCore.QRect(360, 0, 441, 111))
        font = QtGui.QFont()
        font.setFamily("PMingLiU-ExtB")
        font.setPointSize(26)
        font.setBold(True)
        font.setWeight(75)
        self.lbhome.setFont(font)
        self.lbhome.setStyleSheet("color: rgb(255, 255, 255);")
        self.lbhome.setAlignment(QtCore.Qt.AlignCenter)
        self.lbhome.setObjectName("lbhome")
        self.btnReturn = QtWidgets.QPushButton(self.centralwidget)
        self.btnReturn.setGeometry(QtCore.QRect(860, 610, 200, 100))
        font = QtGui.QFont()
        font.setFamily("Bahnschrift Light Condensed")
        font.setPointSize(20)
        font.setBold(True)
        font.setWeight(75)
        self.btnReturn.setFont(font)
        self.btnReturn.setAutoFillBackground(False)
        self.btnReturn.setStyleSheet("color: #333;\n"
"    border: 2px solid #555;\n"
"    border-radius: 50px;\n"
"    border-style: outset;\n"
"    background: qradialgradient(\n"
"        cx: 0.3, cy: -0.4, fx: 0.3, fy: -0.4,\n"
"        radius: 1.35, stop: 0 #fff, stop: 1 #888\n"
"        );\n"
"    padding: 5px;")
        icon = QtGui.QIcon.fromTheme("return")
        self.btnReturn.setIcon(icon)
        self.btnReturn.setIconSize(QtCore.QSize(50, 50))
        self.btnReturn.setObjectName("btnReturn")
        self.btnHomDobot = QtWidgets.QPushButton(self.centralwidget)
        self.btnHomDobot.setGeometry(QtCore.QRect(680, 450, 341, 111))
        font = QtGui.QFont()
        font.setFamily("Bahnschrift Light Condensed")
        font.setPointSize(20)
        font.setBold(True)
        font.setWeight(75)
        self.btnHomDobot.setFont(font)
        self.btnHomDobot.setAutoFillBackground(False)
        self.btnHomDobot.setStyleSheet("color: #333;\n"
"    border: 2px solid #555;\n"
"    border-radius: 50px;\n"
"    border-style: outset;\n"
"    background: qradialgradient(\n"
"        cx: 0.3, cy: -0.4, fx: 0.3, fy: -0.4,\n"
"        radius: 1.35, stop: 0 #fff, stop: 1 #888\n"
"        );\n"
"    padding: 5px;")
        icon = QtGui.QIcon.fromTheme("return")
        self.btnHomDobot.setIcon(icon)
        self.btnHomDobot.setIconSize(QtCore.QSize(50, 50))
        self.btnHomDobot.setObjectName("btnHomDobot")
        self.btnTestCamera = QtWidgets.QPushButton(self.centralwidget)
        self.btnTestCamera.setGeometry(QtCore.QRect(40, 170, 341, 111))
        font = QtGui.QFont()
        font.setFamily("Bahnschrift Light Condensed")
        font.setPointSize(20)
        font.setBold(True)
        font.setWeight(75)
        self.btnTestCamera.setFont(font)
        self.btnTestCamera.setAutoFillBackground(False)
        self.btnTestCamera.setStyleSheet("color: #333;\n"
"    border: 2px solid #555;\n"
"    border-radius: 50px;\n"
"    border-style: outset;\n"
"    background: qradialgradient(\n"
"        cx: 0.3, cy: -0.4, fx: 0.3, fy: -0.4,\n"
"        radius: 1.35, stop: 0 #fff, stop: 1 #888\n"
"        );\n"
"    padding: 5px;")
        icon = QtGui.QIcon.fromTheme("return")
        self.btnTestCamera.setIcon(icon)
        self.btnTestCamera.setIconSize(QtCore.QSize(50, 50))
        self.btnTestCamera.setObjectName("btnTestCamera")
        self.btnTestFiab = QtWidgets.QPushButton(self.centralwidget)
        self.btnTestFiab.setGeometry(QtCore.QRect(40, 450, 341, 111))
        font = QtGui.QFont()
        font.setFamily("Bahnschrift Light Condensed")
        font.setPointSize(20)
        font.setBold(True)
        font.setWeight(75)
        self.btnTestFiab.setFont(font)
        self.btnTestFiab.setAutoFillBackground(False)
        self.btnTestFiab.setStyleSheet("color: #333;\n"
"    border: 2px solid #555;\n"
"    border-radius: 50px;\n"
"    border-style: outset;\n"
"    background: qradialgradient(\n"
"        cx: 0.3, cy: -0.4, fx: 0.3, fy: -0.4,\n"
"        radius: 1.35, stop: 0 #fff, stop: 1 #888\n"
"        );\n"
"    padding: 5px;")
        icon = QtGui.QIcon.fromTheme("return")
        self.btnTestFiab.setIcon(icon)
        self.btnTestFiab.setIconSize(QtCore.QSize(50, 50))
        self.btnTestFiab.setObjectName("btnTestFiab")
        self.label = QtWidgets.QLabel(self.centralwidget)
        self.label.setGeometry(QtCore.QRect(40, 570, 341, 141))
        font = QtGui.QFont()
        font.setFamily("MS Shell Dlg 2")
        font.setPointSize(10)
        self.label.setFont(font)
        self.label.setTextFormat(QtCore.Qt.AutoText)
        self.label.setAlignment(QtCore.Qt.AlignLeading|QtCore.Qt.AlignLeft|QtCore.Qt.AlignTop)
        self.label.setWordWrap(True)
        self.label.setObjectName("label")
        self.label_2 = QtWidgets.QLabel(self.centralwidget)
        self.label_2.setGeometry(QtCore.QRect(680, 210, 201, 41))
        font = QtGui.QFont()
        font.setFamily("MS Shell Dlg 2")
        font.setPointSize(10)
        self.label_2.setFont(font)
        self.label_2.setTextFormat(QtCore.Qt.AutoText)
        self.label_2.setWordWrap(True)
        self.label_2.setObjectName("label_2")
        self.COMChoice = QtWidgets.QSpinBox(self.centralwidget)
        self.COMChoice.setGeometry(QtCore.QRect(900, 210, 111, 41))
        font = QtGui.QFont()
        font.setPointSize(14)
        self.COMChoice.setFont(font)
        self.COMChoice.setObjectName("COMChoice")
        self.btnTestAnalyse = QtWidgets.QPushButton(self.centralwidget)
        self.btnTestAnalyse.setGeometry(QtCore.QRect(40, 310, 341, 111))
        font = QtGui.QFont()
        font.setFamily("Bahnschrift Light Condensed")
        font.setPointSize(20)
        font.setBold(True)
        font.setWeight(75)
        self.btnTestAnalyse.setFont(font)
        self.btnTestAnalyse.setAutoFillBackground(False)
        self.btnTestAnalyse.setStyleSheet("color: #333;\n"
"    border: 2px solid #555;\n"
"    border-radius: 50px;\n"
"    border-style: outset;\n"
"    background: qradialgradient(\n"
"        cx: 0.3, cy: -0.4, fx: 0.3, fy: -0.4,\n"
"        radius: 1.35, stop: 0 #fff, stop: 1 #888\n"
"        );\n"
"    padding: 5px;")
        icon = QtGui.QIcon.fromTheme("return")
        self.btnTestAnalyse.setIcon(icon)
        self.btnTestAnalyse.setIconSize(QtCore.QSize(50, 50))
        self.btnTestAnalyse.setObjectName("btnTestAnalyse")
        self.btnValiderPort = QtWidgets.QPushButton(self.centralwidget)
        self.btnValiderPort.setGeometry(QtCore.QRect(680, 270, 341, 111))
        font = QtGui.QFont()
        font.setFamily("Bahnschrift Light Condensed")
        font.setPointSize(20)
        font.setBold(True)
        font.setWeight(75)
        self.btnValiderPort.setFont(font)
        self.btnValiderPort.setLayoutDirection(QtCore.Qt.LeftToRight)
        self.btnValiderPort.setAutoFillBackground(False)
        self.btnValiderPort.setStyleSheet("color: #333;\n"
"    border: 2px solid #555;\n"
"    border-radius: 50px;\n"
"    border-style: outset;\n"
"    background: qradialgradient(\n"
"        cx: 0.3, cy: -0.4, fx: 0.3, fy: -0.4,\n"
"        radius: 1.35, stop: 0 #fff, stop: 1 #888\n"
"        );\n"
"    padding: 5px;")
        icon = QtGui.QIcon.fromTheme("return")
        self.btnValiderPort.setIcon(icon)
        self.btnValiderPort.setIconSize(QtCore.QSize(50, 50))
        self.btnValiderPort.setObjectName("btnValiderPort")
        self.label_3 = QtWidgets.QLabel(self.centralwidget)
        self.label_3.setGeometry(QtCore.QRect(40, 280, 341, 31))
        font = QtGui.QFont()
        font.setFamily("MS Shell Dlg 2")
        font.setPointSize(10)
        self.label_3.setFont(font)
        self.label_3.setTextFormat(QtCore.Qt.AutoText)
        self.label_3.setWordWrap(True)
        self.label_3.setObjectName("label_3")
        self.label_4 = QtWidgets.QLabel(self.centralwidget)
        self.label_4.setGeometry(QtCore.QRect(680, 380, 341, 31))
        font = QtGui.QFont()
        font.setFamily("MS Shell Dlg 2")
        font.setPointSize(10)
        self.label_4.setFont(font)
        self.label_4.setTextFormat(QtCore.Qt.AutoText)
        self.label_4.setWordWrap(True)
        self.label_4.setObjectName("label_4")
        self.label_5 = QtWidgets.QLabel(self.centralwidget)
        self.label_5.setGeometry(QtCore.QRect(40, 420, 341, 31))
        font = QtGui.QFont()
        font.setFamily("MS Shell Dlg 2")
        font.setPointSize(10)
        self.label_5.setFont(font)
        self.label_5.setTextFormat(QtCore.Qt.AutoText)
        self.label_5.setWordWrap(True)
        self.label_5.setObjectName("label_5")
        maintenance.setCentralWidget(self.centralwidget)
        self.retranslateUi(maintenance)
        self.COMChoice.valueChanged.connect(self.COMchanged)
        self.btnTestAnalyse.clicked.connect(self.btnTestAnalyse_click)
        self.btnTestCamera.clicked.connect(self.btnTestCamera_click)
        self.btnTestFiab.clicked.connect(self.btnTestFiab_click)
        self.btnHomDobot.clicked.connect(self.btnHomDobot_click)
        self.btnReturn.clicked.connect(self.btnReturn_click)
        self.btnValiderPort.clicked.connect(self.btnValiderPort_click)
        QtCore.QMetaObject.connectSlotsByName(maintenance)

    def retranslateUi(self, maintenance):
        _translate = QtCore.QCoreApplication.translate
        maintenance.setWindowTitle(_translate("maintenance", "TIC TAC TOE"))
        self.lbhome.setText(_translate("maintenance", "Page maintenance"))
        self.btnReturn.setText(_translate("maintenance", "Retour"))
        self.btnHomDobot.setText(_translate("maintenance", "Remise à Hom du Dobot"))
        self.btnTestCamera.setText(_translate("maintenance", "Test rendu de la caméra"))
        self.btnTestFiab.setText(_translate("maintenance", "Test fiabilité du robot"))
        self.label.setText(_translate("maintenance", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:\'MS Shell Dlg 2\'; font-size:10pt; font-weight:400; font-style:normal;\">\n"
"<p align=\"justify\" style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:8pt; color:#ffffff;\">Cette fonction va permettre de tester la fiabilité des mouvements du robot. C\'est à dire qu\'il va répeter 10 fois consécutives le déplacement d\'un pion au slot 1 du robot, vers le centre du plateau, puis va le remettre au slot 1. Ce test nous permettra d\'étudier les décalages de placement sur le long terme.</span></p></body></html>"))
        self.label_2.setText(_translate("maintenance", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:\'MS Shell Dlg 2\'; font-size:10pt; font-weight:400; font-style:normal;\">\n"
"<p align=\"justify\" style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:20pt; color:#ffffff;\">Choix du port</span></p></body></html>"))
        self.btnTestAnalyse.setText(_translate("maintenance", "Test analyse du plateau"))
        self.btnValiderPort.setText(_translate("maintenance", "Validation port\n"
"Reconnexion robot"))
        self.label_3.setText(_translate("maintenance", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:\'MS Shell Dlg 2\'; font-size:10pt; font-weight:400; font-style:normal;\">\n"
"<p align=\"justify\" style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:8pt; color:#ffffff;\">Appuyer sur \'q\' sur la fenêtre de preview pour la fermer</span></p></body></html>"))
        self.label_4.setText(_translate("maintenance", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:\'MS Shell Dlg 2\'; font-size:10pt; font-weight:400; font-style:normal;\">\n"
"<p align=\"center\" style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:14pt; color:#ffffff;\">Robot connecté</span></p></body></html>"))
        self.label_5.setText(_translate("maintenance", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:\'MS Shell Dlg 2\'; font-size:10pt; font-weight:400; font-style:normal;\">\n"
"<p align=\"justify\" style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:8pt; color:#ffffff;\">Appuyez sur \'q\' sur la fenêtre d\'analyse pour la fermer</span></p></body></html>"))
        self.COMChoice.setPrefix("COM")
        self.COMChoice.setValue(int(self.dobot.getCOM()))
        self.updateStateDobot(self.stateDobot)            
       
    def updateStateDobot(self,value):
        _translate = QtCore.QCoreApplication.translate
        if (value == True):
            self.label_4.setText(_translate("maintenance", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:\'MS Shell Dlg 2\'; font-size:10pt; font-weight:400; font-style:normal;\">\n"
"<p align=\"center\" style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:14pt; color:#ffffff;\">Robot connecté</span></p></body></html>"))
        else:
            self.label_4.setText(_translate("maintenance", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:\'MS Shell Dlg 2\'; font-size:10pt; font-weight:400; font-style:normal;\">\n"
"<p align=\"center\" style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:14pt; color:#ffffff;\">Robot déconnecté</span></p></body></html>"))
    
    def updateMovementDobot(self,value):
        _translate = QtCore.QCoreApplication.translate
        self.label.setText(_translate("maintenance", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:\'MS Shell Dlg 2\'; font-size:10pt; font-weight:400; font-style:normal;\">\n"
"<p align=\"justify\" style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:8pt; color:#ffffff;\">Cette fonction va permettre de tester la fiabilité des mouvements du robot. C\'est à dire qu\'il va répeter 10 fois consécutives le déplacement d\'un pion au slot 1 du robot, vers le centre du plateau, puis va le remettre au slot 1. Ce test nous permettra d\'étudier les décalages de placement sur le long terme.<br />Déplacements effectués : " + str(value) + "</span></p></body></html>"))
       
        
    def COMchanged(self, value):
        self.dobot.setCOM(str(value))

    def btnReturn_click(self):
        print("Clique sur return")
        if (self.dobot.getDobotStatus() == True):
            self.dobot.disconnectDobot()        
        self.thisWindows.hide()
        
    def btnValiderPort_click(self):
        if (self.dobot.getDobotStatus() == True):
            self.dobot.disconnectDobot()
        self.dobot.connectDobot()
        self.updateStateDobot(self.dobot.initDobot())
        

    def btnTestAnalyse_click(self):
        print("Clique sur test analyse")
        recognition= ImageRecognition()
        recognition.shoot()
        recognition.recongnition()
        image = cv2.imread("output.png")
        cv2.imshow('preview',image)
        while(True):
            time.sleep(.05)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        cv2.destroyAllWindows()

    def btnHomDobot_click(self):
        print("Clique sur hom dobot")
        msgBox = QMessageBox()
        msgBox.setIcon(QMessageBox.Warning)
        msgBox.setText("Merci d'attendre la fin de mise à HOM du Dobot\navant d'effectuer une autre manoeuvre.\nLa commande démarrera après avoir cliqué sur OK")
        msgBox.setWindowTitle("HOM Dobot")
        msgBox.setStandardButtons(QMessageBox.Ok)
        msgBox.exec()
        self.dobot.HOMDobot()
        
    def btnTestFiab_click(self):
        print("Clique sur test fiab")
        msgBox = QMessageBox()
        msgBox.setIcon(QMessageBox.Warning)
        msgBox.setText("Merci d'attendre la fin des dix déplacements\navant d'effectuer une autre manoeuvre.\nLes mouvements démrarreront après avoir cliqué sur OK")
        msgBox.setWindowTitle("Fiab Dobot")
        msgBox.setStandardButtons(QMessageBox.Ok)
        msgBox.exec()
        for x in range (10):
            self.dobot.MaintenanceMovements()
            self.updateMovementDobot(x+1)
            print (x+1)
        
    def btnTestCamera_click(self):
        print("Clique sur test camera")
        recognition= ImageRecognition()
        recognition.maintShoot()

if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    maintenance = QtWidgets.QMainWindow()
    ui = Ui_maintenance()
    ui.setupUi(maintenance)
    maintenance.show()
    sys.exit(app.exec_())
