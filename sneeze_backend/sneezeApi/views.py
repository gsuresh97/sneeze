from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from pymongo import MongoClient, GEO2D
import os
from time import time


# Create your views here.


#use getCurrentPosition() in react native. This should return a Position object, which has a Coordinates member.
#Pass in Coordinates.latitude and Coordinates.longitude


# IGNORE THIS, unless legacy coords are insufficient (e.g. we want to easier
# calculate distance)
    # We want to store all memes as a GeoJSON Point
    #   http://geojson.org/
    #   https://docs.mongodb.com/manual/reference/geojson/
    # Then use geoNear to retrieve nearby GeoJSON points
    # and associated metadata
    #   https://docs.mongodb.com/manual/reference/command/geoNear/#dbcmd.geoNear
# /ENDIGNORE

@api_view(['POST'])
def sneeze(request):
    if request.method == 'POST':
        data = request.data
        client = MongoClient('localhost', 27017)
        db = client.memes
        col = db.info
        post = {
            # is this the correct format for accessing attributes
            # from the POST request? we might need to do additional
            # parsing
            "loc": [data.longitude, data.latitude],
            "path": os.path.join(os.getcwd(), "img"), #add hash of filename to path
            "user": data.user,
            "time": time()
        }
        result = col.save(post)
        col.createIndex( {"loc": "2d"} )
        return HttpResponse(status=201)
    return HttpResponse(status=501)

@api_view(['POST'])
def getMemes(request):
    if request.method == 'POST':
        data = request.data
        client = MongoClient('localhost', 27017)
        db = client.memes
        col = db.info
        res = db.runCommand(
            {
                "geoNear": "col",
                "near": [data.longitude, data.latitude],
                "spherical": true
            }
        )
        return JsonResponse(res)
    return HttpResponse(status=501)
