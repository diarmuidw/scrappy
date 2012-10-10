from django.conf.urls.defaults import *
from django.views.generic.simple import direct_to_template


urlpatterns = patterns("",
    url(r'^log/$', 'scrap.views.doscrappy', name='scrap_doscrappy'),
    url(r'^logpost/$', 'scrap.views.doscrappypost', name='scrap_doscrappypost'),

)
