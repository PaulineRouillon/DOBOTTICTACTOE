# USAGE
# python detect_color.py --image example_shapes.png

# import the necessary packages
import imutils
import cv2
import numpy as np
from scipy.spatial import distance as dist

# construct the argument parse and parse the arguments

tabpos = []

class Point:
    def __init__(self, x, y,posx,posy):
        self.x = x
        self.y = y
        self.posx_plateau=posx
        self.posy_plateau=posy
        self.couleur=" "
        
class MyCapture(object):
    def captureImage(self):
        webcam = cv2.VideoCapture(0)
        try:
            check, frame = webcam.read()
            print(check) #prints true as long as the webcam is running
            print(frame) #prints matrix values of each framecd 
            cv2.imshow("Capturing", frame)
            key = cv2.waitKey(5)
            cv2.imwrite(filename='saved.png', img=frame)
            webcam.release()
            img_new = cv2.imread('saved.png', cv2.IMREAD_GRAYSCALE)
            img_new = cv2.imshow("Captured Image", img_new)
            cv2.waitKey(1650)
            cv2.destroyAllWindows()
            
        except(KeyboardInterrupt):
            print("Turning off camera.")
            webcam.release()
            print("Camera off.")
            print("Program ended.")
            cv2.destroyAllWindows()

    def previewImage(self):
        webcam = cv2.VideoCapture(0)
        try:
            while(True):
                check, frame = webcam.read()
                cv2.imshow('preview',frame) 
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
            webcam.release()
            cv2.destroyAllWindows()
        except(KeyboardInterrupt):
            print("Turning off camera.")
            webcam.release()
            print("Camera off.")
            print("Program ended.")
            cv2.destroyAllWindows()     

class ColorLabeler:
	def __init__(self):
		
		self.lower = {
         'blue':(200,83,200),
         'orange':(20,100,10)
         }

		self.upper = {
		         'blue':(255,100,100),
		         'orange':(30,255,255)

		         }

		# define standard colors for circle around the object
		self.colors = {
		          'blue':(240,100,100),
		          'orange':(0,128,255),
		          }

		# allocate memory for the L*a*b* image, then initialize
		# the color names list
		self.lab = np.zeros((len(self.colors), 1, 3), dtype="uint8")
		self.colorNames = []

		# loop over the colors dictionary
		for (i, (name, rgb)) in enumerate(self.colors.items()):
			# update the L*a*b* array and the color names list
			self.lab[i] = rgb
			self.colorNames.append(name)

		# convert the L*a*b* array from the RGB color space
		# to L*a*b*
		self.lab = cv2.cvtColor(self.lab, cv2.COLOR_BGR2HSV)

	def label(self, image, c):
		# construct a mask for the contour, then compute the
		# average L*a*b* value for the masked region
		# initialize the minimum distance found thus far
		minDist = (np.inf, None)
		for key, value in self.upper.items():
	# find the colors within the specified boundaries and apply
	# the mask
			mask = cv2.inRange(image,self.lower[key],self.upper[key])
			cv2.drawContours(mask, [c], -1, 255, -1)
			mask = cv2.erode(mask, None, iterations=2)
			mean = cv2.mean(image, mask=mask)[:3]
			output = cv2.bitwise_and(image, image, mask = mask)
			
			# loop over the known L*a*b* color values
			for (i, row) in enumerate(self.lab):
				# compute the distance between the current L*a*b*
				# color value and the mean of the image
				d = dist.euclidean(row[0], mean)

				# if the distance is smaller than the current distance,
				# then update the bookkeeping variable
				if d < minDist[0]:
					minDist = (d, i)

		# return the name of the color with the smallest distance
		return self.colorNames[minDist[1]]
    
class ShapeDetector:
	def __init__(self):
		pass

	def detect(self, c):
		# initialize the shape name and approximate the contour
		shape = "unidentified"
		peri = cv2.arcLength(c, True)
		approx = cv2.approxPolyDP(c, 0.04 * peri, True)

		# if the shape is a triangle, it will have 3 vertices
		if len(approx) == 3:
			shape = "triangle"

		# if the shape has 4 vertices, it is either a square or
		# a rectangle
		elif len(approx) == 4:
			# compute the bounding box of the contour and use the
			# bounding box to compute the aspect ratio
			(x, y, w, h) = cv2.boundingRect(approx)
			ar = w / float(h)

			# a square will have an aspect ratio that is approximately
			# equal to one, otherwise, the shape is a rectangle
			shape = "square" 
			#if ar >= 0.95 and ar <= 1.05 else "rectangle"

		# if the shape is a pentagon, it will have 5 vertices
		elif len(approx) == 5:
			shape = "pentagon"

		# otherwise, we assume the shape is a circle
		else:
			shape = "circle"

		# return the name of the shape
		return shape
      
ca = MyCapture()
sd = ShapeDetector()
cl = ColorLabeler()

class ImageRecognition(object):

#ap = argparse.ArgumentParser()
#ap.add_argument("-i", "--image", required=True,
#help="path to the input image")
#args = vars(ap.parse_args())
    def __init__(self):
        self.tabcords=[]

    def shoot(self):
        ca.captureImage()
        return True
    
    def maintShoot(self):
        ca.previewImage()
        return True

    def ajouterPoint(self,point):
        self.tabcords.append(point)

    def remplirTableauPiecesDetectees(self,cX,cY,couleur):

        col=-1
        row=-1

        if cX>50 :
            if cX < 307 :
                row=2
            elif cX < 466 :
                row=1
            else:
                row=0

            if cY < 187 :
                col=0
            elif cY < 337 :
                col =1
            else :
                col=2

        p = Point(cX,cY,row,col)
        p.couleur=couleur
        self.ajouterPoint(p)
    

    def filter_min_area(self,contours,min_area):
        return list(filter(lambda cnt:cv2.contourArea(cnt)>=min_area,contours))

# load the image and resize it to a smaller factor so that
# the shapes can be approximated better

    def recongnition(self):
        board =["-"]*9
        gamestate=[["-","-","-"],["-","-","-"],["-","-","-"]]
        image = cv2.imread("saved.png")
        resized = imutils.resize(image, width=300)
        ratio = image.shape[0] / float(resized.shape[0])
        img_width = resized.shape[0]
        img_height = resized.shape[1]
        # blur the resized image slightly, then convert it to both
        # grayscale and the L*a*b* color spaces
        blurred = cv2.GaussianBlur(resized, (5, 5), 0)
        gray = cv2.cvtColor(blurred, cv2.COLOR_BGR2HSV)
        hue,sat,val = cv2.split(gray)
        lab = cv2.cvtColor(blurred, cv2.COLOR_BGR2HSV)
        thresh = cv2.threshold(val,0, 255, cv2.THRESH_BINARY+cv2.THRESH_OTSU)[1]
        #cv2.imshow("Thresh", thresh)
    # find contours in the thresholded image
        cnts = cv2.findContours(thresh.copy(), cv2.RETR_LIST,cv2.CHAIN_APPROX_SIMPLE)
        cnts = imutils.grab_contours(cnts)
        cnts=self.filter_min_area(cnts,50)
    # initialize the shape detector and color labeler
        
        #n_ctns=filter_min_area(cnts,150)
        # Parcours les contours
        i=0
        counter=0
        print("w:"+str(img_width))
        print("h:"+str(img_height))
        for index, c in enumerate(cnts):
            
            M = cv2.moments(c)
            #position de chaque contour dans l'image
            cX = int((M["m10"] / M["m00"]) * ratio)
            cY = int((M["m01"] / M["m00"]) * ratio)  

            # detection des formes et couleur
            shape = sd.detect(c)
            color = cl.label(lab, c)

            #Remplissage du tableau des pièces détectées
            self.remplirTableauPiecesDetectees(cX,cY,color)  
            
            # multiplier les coordonnées de contour (x, y) par le rapport de redimensionnement,
            # puis dessinez les contours et le nom de la forme et étiquetés
            # couleur sur l'image
            c = c.astype("float")
            c *= ratio
            c = c.astype("int")
            text = "{},{},{},i=>{}".format(cX,cY,color,index)
            cv2.drawContours(image, [c], -1, (0, 255, 0), 3)
            cv2.putText(image, text, (cX, cY),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

        #remplissage du plateau par les points
        for index,point in enumerate(self.tabcords):
            if point.couleur=="blue":
                print("=====blue=====")
                print("xb:"+str(point.posx_plateau)+" xb:"+str(point.x))
                print("yb:"+str(point.posy_plateau)+" yb:"+str(point.y))
                gamestate[point.posx_plateau][point.posy_plateau] = "O"

            if point.couleur=="orange":
                print("=====orange=====")
                print("xo:"+str(point.posx_plateau)+" xo:"+str(point.x))
                print("yo:"+str(point.posy_plateau)+" yo:"+str(point.y))
                gamestate[point.posx_plateau][point.posy_plateau] = "X"
                
        counter=0
        #affichage de l'état du plateau
        print("Gamestate:")
        for line in gamestate:
                linetxt = ""
                for cel in line:
                        linetxt = linetxt + "|" + cel
                        board[counter]=cel
                        counter=counter+1
                print(linetxt)
        # show the output image
        cv2.imwrite("output.png", image)
        counter=0
       
        return board
    

        