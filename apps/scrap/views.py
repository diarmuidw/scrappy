
from django.shortcuts import render_to_response, get_object_or_404
from django.http import HttpResponseRedirect, Http404, QueryDict
from django.template import RequestContext
from django.core.urlresolvers import reverse
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views.generic import date_based
from django.conf import settings
from django.contrib import messages

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

def id_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for x in range(size))

@login_required
def doscrappy(request, template_name="scrap/basic.html"):
    print ' doscrappy log'
    try:
        data =  request.GET.get('q')
        url = request.GET.get('url')

        un = request.user.username
        a = pinax.apps.account.models.Account.objects.filter(user=request.user)
        savescrap(un, a,data, url)
    except Exception, ex:
        print ex

    
    return render_to_response(template_name, {
    'text':data, 'name': 'S_%s'%name},context_instance=RequestContext(request))
    
@csrf_exempt
@login_required
def doscrappypost(request,template_name="scrap/basic.html"):
    print 'do scrappy post'
    print ''
    try:
        data =  request.POST.get('data')
        url = request.POST.get('origin')
        un = request.user.username
        a = pinax.apps.account.models.Account.objects.filter(user=request.user)
        savescrap(un, a,data, url)
    except Exception, ex:
        print ex
    
    return render_to_response(template_name, {'text':'aaaa', 'name': 'S_qqqqq'},context_instance=RequestContext(request))
 
def savescrap(un, a, data, url):
    try:

        connect (settings.MONGODATABASENAME,host=settings.MONGOHOST, port =settings.MONGOPORT, username=settings.MONGOUSERNAME, password = settings.MONGOPASSWORD)

        user = None
        users = mongoobjects.User.objects().filter(un)
        print 'after users'
        if users.count() == 0:

            try:
                user = mongoobjects.User(email = request.user.email, name = u'' + un, password = '12345')
                user.save()
            except Exception, ex:
                print ex
        else:
        
            user = users[0]

        name = id_generator(6)

        c = mongoobjects.Scrap(owner = user, name = 'S_%s'%name, 
                                 text = data, url=url)
        c.save()
        print "Scrap added"
    except Exception, ex:
        print ex  
 
def dosave(request, template_name="scrap/basic.html"):
    print ' simple get based on delicious'   
   
    try:
        data =  request.GET.get('notes')
        url = request.GET.get('url')
        un = request.user.username
        
        print data
        print url
        
        a = pinax.apps.account.models.Account.objects.filter(user=request.user)
        savescrap(un, a,data, url)
        
    except Exception, ex:
        print ex
    
    
    
    return render_to_response(template_name, {'text':'aaaa', 'name': 'S_qqqqq'},context_instance=RequestContext(request))
 
def viewlastscraps(request, template_name="scrap/basicview.html"):
    print 'view scraps'
    
    scs = []
    try:

    
        a = pinax.apps.account.models.Account.objects.filter(user=request.user)
        connect (settings.MONGODATABASENAME,host=settings.MONGOHOST, port =settings.MONGOPORT, username=settings.MONGOUSERNAME, password = settings.MONGOPASSWORD)

   
        user = None
        users = mongoobjects.User.objects().filter(name=request.user.username)

        user = users[0]
        
        try:
            scraps = mongoobjects.Scrap.objects()
            for s in scraps[:10]:
                s1 = {}
                s1['url'] = s.url
                s1['clip'] = urllib2.unquote(s.text)
                s1['created'] = s.created
                scs.append(s1)

        except Exception , ex:
            print "problem getting scraps"
           
                    
    except Exception, ex:
        print ex
    
    return render_to_response(template_name, {'text':'aaaa', 'scraps': scs},context_instance=RequestContext(request))

 
def redirect(request, template_name="scrap/basic.html"):
    print ' simple get based on delicious'   

    url =  request.GET.get('target')
    return HttpResponseRedirect(url)
         
    