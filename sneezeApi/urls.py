from django.conf.urls import url
from sneezeApi import views

urlpatterns = [
	url(r'^save/$', views.saveMeme),
]