from django.conf.urls import url
from sneezeApi import views

urlpatterns = [
	url(r'^sneeze/$', views.sneeze),
	url(r'^getMemes/$', views.getMemes),
	url(r'^getData/$', views.getData),
]
