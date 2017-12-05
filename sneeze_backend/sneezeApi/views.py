from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from pymongo import MongoClient, GEO2D
import os
from time import time
from bson.son import SON


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
            "loc": [float(data["longitude"]), float(data["latitude"])],
            "format": data["format"],
            "data": data["data"], # https://docs.mongodb.com/manual/reference/bson-types/
            "user": data["user"],
            "radius": data["rad"],
            "time": time()
        }
        result = col.insert(post)
        col.create_index( {"loc": "2d"} )
        return HttpResponse(status=201)
    return HttpResponse(status=501)

@api_view(['POST'])
def getMemes(request):
    if request.method == 'POST':
        data = request.data
        import pdb; pdb.set_trace()
        client = MongoClient('localhost', 27017)
        db = client.memes
        col = db.info
        query = {
            "loc": SON([("$near", [float(data["longitude"]), float(data["latitude"])]),
             ("$maxDistance", 10000000)])
        }
        meme = db.places.find(query).limit(1)[0]
        res = {
            "latitude": meme["latitude"],
            "longitude": meme["longitude"],
            "data": meme["data"]

        }
        return JsonResponse(res)
    return HttpResponse(status=501)
