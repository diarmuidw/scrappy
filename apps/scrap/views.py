
from django.shortcuts import render_to_response, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, Http404, QueryDict
from django.template import RequestContext
from django.core.urlresolvers import reverse
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views.generic import date_based
from django.conf import settings
from django.contrib import messages
from django.utils import simplejson
from django.views.decorators.csrf import csrf_exempt

import pinax.apps.account


if "notification" in settings.INSTALLED_APPS:
    from notification import models as notification
else:
    notification = None

from django import forms
            
import datetime
import string
import random
import urllib2

from mongoengine import connect

import mongoobjects   

import logging

# Get an instance of a logger
logger = logging.getLogger(__name__)

def id_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for x in range(size))


def jsonify(object):
    if isinstance(object, QuerySet):
        return serialize('json', object)
    return simplejson.dumps(object)

def doscrappy(request, template_name="scrap/basic.html"):
    logger.debug( ' doscrappy log')
    try:
        data =  request.GET.get('q')
        url = request.GET.get('url')
        uniqueid = request.GET.get('uniqueid')
        un = request.user.username
        a = pinax.apps.account.models.Account.objects.filter(user=request.user)
        savescrap(un, a,data, url, uniqueid)
    except Exception, ex:
        logger.debug( ex)
    return render_to_response(template_name, {
    'text':data, 'name': 'S_%s'%url},context_instance=RequestContext(request))
    
@csrf_exempt
def doscrappypost(request,template_name="scrap/blank.html"):
    logger.debug( 'do scrappy post')
    
    try:
        data =  request.POST.get('data')
        url = request.POST.get('origin')
        uniqueid = request.POST.get('uniqueid')
        un = request.user.username
        if un != None:
            a = pinax.apps.account.models.Account.objects.filter(user=request.user)
            savescrap(un, a,data, url, uniqueid)
    except Exception, ex:
        logger.debug( ex)

    #return  HttpResponse(jsonify(), mimetype="application/json")
    return render_to_response(template_name, {'text':'aaaa', 'name': 'S_qqqqq'},context_instance=RequestContext(request))
 
def savescrap(un, a, data, url, uniqueid):
    try:
        logger.debug( "saving scarp %s "%(url))
        
        connect (settings.MONGODATABASENAME,host=settings.MONGOHOST, port =settings.MONGOPORT, username=settings.MONGOUSERNAME, password = settings.MONGOPASSWORD)

        user = None
        users = mongoobjects.User.objects().filter(un)
        logger.debug( users)
        logger.debug( 'after users')
        if users.count() == 0:
            logger.debug( "make new user")
            try:
                user = mongoobjects.User(email = request.user.email, name = u'' + un, password = '12345')
                user.save()
            except Exception, ex:
                logger.debug( ex)
        else:
            user = users[0]

        name = id_generator(6)
        logger.debug("just before mongo call ")
        c = mongoobjects.Scrap(owner = user, name = 'S_%s'%name, 
                                 text = data, url=url, uniqueid=uniqueid)
        c.save()
        logger.debug( "Scrap added")
    except Exception, ex:
        logger.debug( ex)
 
def dosave(request, template_name="scrap/basic.html"):
    logger.debug( ' simple get based on delicious'  ) 
   
    try:
        data =  request.GET.get('notes')
        url = request.GET.get('url')
        un = request.user.username
        
        logger.debug( data)
        logger.debug( url)
        
        a = pinax.apps.account.models.Account.objects.filter(user=request.user)
        savescrap(un, a,data, url)
        
    except Exception, ex:
        logger.debug( ex)
    
    
    
    return render_to_response(template_name, {'text':'aaaa', 'name': 'S_qqqqq'},context_instance=RequestContext(request))
 
 
 
def viewone(request, uniqueid = 0, template_name="scrap/basicview.html"):
    '''
    Called when a user clicks on a scrap icon on the page
    Just redirect to the
    '''
    logger.debug( "getting scrap %s"%uniqueid)
    scs = []
    try:

    
        a = pinax.apps.account.models.Account.objects.filter(user=request.user)
        connect (settings.MONGODATABASENAME,host=settings.MONGOHOST, port =settings.MONGOPORT, username=settings.MONGOUSERNAME, password = settings.MONGOPASSWORD)

   
        user = None
        users = mongoobjects.User.objects().filter(name=request.user.username)

        user = users[0]
        
        try:
            scraps = mongoobjects.Scrap.objects(uniqueid=uniqueid)
            for s in scraps[:10]:
                s1 = {}
                s1['url'] = urllib2.unquote(s.url)
                s1['clip'] =  replacehrefs(urllib2.unquote(s.url), urllib2.unquote(s.text), s.uniqueid)
                s1['created'] = s.created
                s1['uniqueid'] = s.uniqueid
                scs.append(s1)
                logger.debug( s1['clip'])
        except Exception , ex:
            logger.debug( "problem getting scraps")
           
                    
    except Exception, ex:
        logger.debug( ex)
    
    return render_to_response(template_name, {'text':'aaaa', 'scraps': scs},context_instance=RequestContext(request))


from BeautifulSoup import BeautifulSoup
import urllib2
import re

def locatescrap(url, data, uniqueid=0):
    '''
    will find the location of the scrap in the page and insert the link, highlight. etc
    Actually this should be done by the browser. It will be too hard to make the page look 
    correct. what about js and css files or page dynamic activity.
    actually it might work if the page redirects to a scrappy page with an iframe for the 
    target window. potentially allows for a toolbar too.
    
    '''
    pass
def replacehrefs(url, data, uniqueid =0 ):
    '''
    will replace the links with our own links. Maybe spnsored?
    
    '''

    if uniqueid == None:
        uniqueid = "Veryold"
    newdata = ''
    if len(data) > 0:
        soup = BeautifulSoup(data)
        for link in soup.findAll('a'):
            linkhref = link.get('href')
            if linkhref[:4]=="http":
                pass
            elif linkhref[0] == "/" and url[-1] =="/":
                #need to prefix the link with the url
                linkhref = url[:-1] + linkhref
            elif linkhref[0] == "/" and url[-1] !="/":
                linkhref = url + linkhref
            elif linkhref[0] != "/" and url =="/":
                linkhref = url + linkhref    
            elif linkhref[0] != "/" and url !="/":
                linkhref = url +"/" + linkhref
                           
            link['href'] =  "/scrap/redirect?src=" + uniqueid + "&target="  +linkhref
            link['target'] = "_blank"
            
            
    return str(soup)


 
def viewlastscraps(request, template_name="scrap/basicview.html"):
    logger.debug( 'view scraps')
    
    scs = []
    try:

    
        a = pinax.apps.account.models.Account.objects.filter(user=request.user)
        connect (settings.MONGODATABASENAME,host=settings.MONGOHOST, port =settings.MONGOPORT, username=settings.MONGOUSERNAME, password = settings.MONGOPASSWORD)

   
        user = None
        users = mongoobjects.User.objects().filter(name=request.user.username)

        user = users[0]
        
        try:
            scraps = mongoobjects.Scrap.objects()
            for s in scraps[:30]:
                s1 = {}
                s1['url'] = urllib2.unquote(s.url)
                
                s1['clip'] = replacehrefs(urllib2.unquote(s.url), urllib2.unquote(s.text), s.uniqueid)
                s1['created'] = s.created
                s1['uniqueid'] = s.uniqueid
                scs.append(s1)

        except Exception , ex:
            
            logger.debug( ex)
            logger.debug( "problem getting scraps")
           
                    
    except Exception, ex:
        logger.debug( ex)
    
    return render_to_response(template_name, {'text':'aaaa', 'scraps': scs},context_instance=RequestContext(request))

 
def redirect(request, template_name="scrap/basic.html"):
    logger.debug( 'redirect'   )

    url =  request.GET.get('target')
    return HttpResponseRedirect(url)
         
def viewembedded(request, template_name="scrap/iframe.html"):
    logger.debug( "viewembedded")
    url = request.GET.get('target')
    return render_to_response(template_name, {'url':url},context_instance=RequestContext(request))

    
    