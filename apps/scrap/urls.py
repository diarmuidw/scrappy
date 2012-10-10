from django.conf.urls.defaults import *
from django.views.generic.simple import direct_to_template


urlpatterns = patterns("",
    url(r'^log/$', 'log.views.doscrappy', name='log_doscrappy'),

)
