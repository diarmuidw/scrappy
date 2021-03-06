from django.conf.urls.defaults import *
from django.views.generic.simple import direct_to_template


urlpatterns = patterns("",
    url(r'^log/$', 'scrap.views.doscrappy', name='scrap_doscrappy'),
    url(r'^logpost/$', 'scrap.views.doscrappypost', name='scrap_doscrappypost'),
    url(r'^save/$', 'scrap.views.dosave', name='scrap_dosave'),
    url(r'^view/$', 'scrap.views.viewlastscraps', name='scrap_view'),
    url(r'^redirect/$', 'scrap.views.redirect', name='scrap_redirect'),
    url(r'^viewone/(?P<uniqueid>\w+)/$', 'scrap.views.viewone', name='scrap_view_one'),
    url(r'^embed/$', 'scrap.views.viewembedded', name='scrap_embed'),
    
)
