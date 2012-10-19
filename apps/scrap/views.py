
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
        print data
        print request.user
        a = pinax.apps.account.models.Account.objects.filter(user=request.user)
        connect (settings.MONGODATABASENAME,host=settings.MONGOHOST, port =settings.MONGOPORT, username=settings.MONGOUSERNAME, password = settings.MONGOPASSWORD)
        print  'after connect'
                 
        a = pinax.apps.account.models.Account.objects.filter(user=request.user)
    
        user = None
        users = mongoobjects.User.objects().filter(name=request.user.username)
        print 'after users'
        if users.count() == 0:
            print 'adding user'
            try:
                user = mongoobjects.User(email = request.user.email, name = u'' + request.user.username, password = '12345')
                user.save()
            except Exception, ex:
                print ex
        else:
        
            user = users[0]

        name = id_generator(6)
        print 'after name'
        c = mongoobjects.Scrap(owner = user, name = 'S_%s'%name, 
                                 text = data, url=url )
        c.save()
        print "Scrap added"
    except Exception, ex:
        print ex

    
    return render_to_response(template_name, {
    'text':data, 'name': 'S_%s'%name},context_instance=RequestContext(request))
    
@csrf_exempt
@login_required
def doscrappypost(request,template_name="scrap/basic.html"):
    print 'do scrappy post'
    print ''
#    data =  request.POST.get('data')
#    url =  request.POST.get('origin')
#    
#    print url
#    print 'aaaaaaa'
#    print type(data)
#    print dir(data)
#    print ("" + data)
#    
#    u2 = data.decode('utf-8')
#    print (u2)
#    
#    import unicodedata
#    aaa = unicodedata.normalize('NFKD', u2).encode('ascii','ignore')
#    print aaa
    
    try:
        data =  request.POST.get('data')
        url = request.POST.get('origin')
        print request.POST
        print data
        print url
        print request.user
        a = pinax.apps.account.models.Account.objects.filter(user=request.user)
        connect (settings.MONGODATABASENAME,host=settings.MONGOHOST, port =settings.MONGOPORT, username=settings.MONGOUSERNAME, password = settings.MONGOPASSWORD)
        print  'after connect'
                 
        a = pinax.apps.account.models.Account.objects.filter(user=request.user)
    
        user = None
        users = mongoobjects.User.objects().filter(name=request.user.username)
        print 'after users'
        if users.count() == 0:
            print 'adding user'
            try:
                user = mongoobjects.User(email = request.user.email, name = u'' + request.user.username, password = '12345')
                user.save()
            except Exception, ex:
                print ex
        else:
        
            user = users[0]

        name = id_generator(6)
        print 'after name'
        print url
        c = mongoobjects.Scrap(owner = user, name = 'S_%s'%name, 
                                 text = data, url=url)
        c.save()
        print "Scrap added"
    except Exception, ex:
        print ex
    
    return render_to_response(template_name, {'text':'aaaa', 'name': 'S_qqqqq'},context_instance=RequestContext(request))
 
 
 
def dosave(request, template_name="scrap/basic.html"):
    print ' doscrappy log'   
    print request
    
    return render_to_response(template_name, {'text':'aaaa', 'name': 'S_qqqqq'},context_instance=RequestContext(request))
 
 