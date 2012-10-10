
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


import pinax.apps.account


if "notification" in settings.INSTALLED_APPS:
    from notification import models as notification
else:
    notification = None

from django import forms
            
import datetime
import string
import random


def doscrappy(request, template_name="log/basic.html"):
    print ' doscrappy log'
 
    val =  request.GET.get('q')
    a = pinax.apps.account.models.Account.objects.filter(user=request.user)
    
    
    
    return render_to_response(template_name, {
    'text':val},context_instance=RequestContext(request))