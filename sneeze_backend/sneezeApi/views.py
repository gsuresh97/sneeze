from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from pymongo import MongoClient, GEO2D
import os
from time import time
from bson.son import SON
from bson import BSON
from bson.binary import Binary
import uuid
import os


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

client = MongoClient('localhost', 27017)
db = client.memes
col = db.info
@api_view(['POST'])
def sneeze(request):
    if request.method == 'POST':
        data = request.data
        col.create_index( [("loc", GEO2D)] )

        # p = BSON.encode({"picture": data["data"].read()})
        name = uuid.uuid4(data["data"])
        f = open(name, "rw+")
        f.write(data["data"])
        f.close()
        post = {
            # is this the correct format for accessing attributes
            # from the POST request? we might need to do additional
            # parsing
            "loc": [float(data["longitude"]), float(data["latitude"])],
            "format": data["format"],
            "path": name, # https://docs.mongodb.com/manual/reference/bson-types/
            "user": data["user"],
            "radius": float(data["rad"]),
            "time": time(),
            "ids": []
        }
        # import pdb; pdb.set_trace()

        result = col.insert(post)

        return HttpResponse(status=201)
    return HttpResponse(status=501)

@api_view(['POST'])
def getMemes(request):
    if request.method == 'POST':
        data = request.data
        query = {"loc": {"$within": {"$center": [[float(data["longitude"]), float(data["latitude"])], 1000]}}}
        print col.find(query).count()
        pic = None
        for m in col.find(query):
            if data["id"] not in m["ids"]:
                pic = m
                break
        name = m["path"]
        f = open(name, "r")
        res = {
            "latitude": pic["loc"][1],
            "longitude": pic["loc"][0],
            "data": f.read()

        }
        return JsonResponse(res)
    return HttpResponse(status=501)
