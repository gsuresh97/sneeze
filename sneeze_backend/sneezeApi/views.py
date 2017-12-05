from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from pymongo import MongoClient, GEO2D
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.conf import settings
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
ids = {}
@api_view(['POST'])
def sneeze(request):
    if request.method == 'POST':
        # import pdb; pdb.set_trace()
        # data = request.data
        col.create_index( [("loc", GEO2D)] )

        # p = BSON.encode({"picture": data["data"].read()})
        name = str(uuid.uuid4())

        path = default_storage.save(name, ContentFile(request.data['data']))
        tmp_file = os.path.join(settings.MEDIA_ROOT, path)

        post = {
            # is this the correct format for accessing attributes
            # from the POST request? we might need to do additional
            # parsing
            "loc": [float(request.data["longitude"]), float(request.data["latitude"])],
            "format": request.data["format"],
            "path": name, # https://docs.mongodb.com/manual/reference/bson-types/
            "user": request.data["user"],
            "radius": float(request.data["radius"]),
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
        # ids = []
        present = False

        for m in col.find(query):
            # import pdb; pdb.set_trace()
            try:
                ids[m["path"]]
            except:
                ids[m["path"]] = []
            # import pdb; pdb.set_trace()
            if data["id"] not in ids[m["path"]]:
                pic = m
                ids[m["path"]].append(data["id"])
                present = True
                break
                # ids.append(pic["path"])
        if present:
            id = pic.get("_id")
            # col.update_one({
            # "_id": id
            # },
            # {
            #     '$set': {
            #         'ids': pic["ids"].append(data["id"])
            #
            #     }
            # }, upsert = False)
            name = m["path"]
            f = open(name, "r")
            res = {
                "latitude": pic["loc"][1],
                "longitude": pic["loc"][0],
                # "ids": ids
                "newImage": present,
                "data": f.read()

            }
        else :
            res = {
                "latitude": None,
                "longitude": None,
                # "ids": ids
                "newImage": present,
                "data": None

            }
        return JsonResponse(res)
    return HttpResponse(status=501)

@api_view(['POST'])
def getData(request):
    if request.method == 'POST':
        f = open(request.POST.get('id'), "r")
        res = HttpResponse(f.read(), content_type="image/png")
        return res
    return HttpResponse(status=501)
