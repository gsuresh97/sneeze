from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from pymongo import MongoClient
import os
from time import time


# Create your views here.


#use getCurrentPosition() in react native. This should return a Position object, which has a Coordinates member.
#Pass in Coordinates.latitude and Coordinates.longitude
@api_view(['POST'])
def saveMeme(request):
	if request.method == 'POST':
		data = request.data
        client = MongoClient('localhost', 27017)
        db = client.memes
        col = db.info
        post = {
        	"loc": [data.longitude, data.latitude],
        	"path": os.path.join(os.getcwd(), "img"), #add hash of filename to path
        	"user": data.user,
        	"time": time()
        }
        result = col.insert_one(post)

        return HttpResponse(status=201)
    return HttpResponse(status=501)