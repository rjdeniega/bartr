"""untitled URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from bartr import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^admin/', admin.site.urls, name="admin"),
    url(r'^$', views.home, ),
    url(r'^home/$', views.home, name="home"),
    url(r'^sign_up/$', views.sign_up, name="sign_up"),
    url(r'^marketplace/$', views.marketplace, name="marketplace"),
    url(r'^create_user/$', views.create_user, name="create_user"),
    url(r'^profile/$', views.profile, name="profile"),
    url(r'^log_out/$', views.log_out, name="log_out"),
    url(r'^log_in/$', views.log_in, name="log_in"),
    url(r'^get_user/$', views.get_user, name="get_user"),
    url(r'^save_credentials/$', views.save_credentials, name="save_credetials"),
    url(r'^upload_photo/$', views.upload_photo, name="upload_photo"),
    url(r'^submit_post/$', views.submit_post, name="submit_post"),
    url(r'^retrieve_post/$', views.retrieve_post, name="retrieve_post"),
    url(r'^submit_offer/$', views.submit_offer, name="submit_offer"),
    url(r'^retrieve_offers/$', views.retrieve_offers, name="retrieve_offers"),
    url(r'^get_user/$', views.get_user, name="get_user"),
    url(r'^offer_info/$', views.offer_info, name="offer_info"),
    url(r'^get_by_category/$', views.get_by_category, name="get_by_category"),
    url(r'^get_by_name/$', views.get_by_name, name="get_by_name")



]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
