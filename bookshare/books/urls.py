from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from books import views


urlpatterns = [
	url(r'^books/$', views.BookList.as_view()),
	url(r'^my-books/(?P<id>[0-9]+)/$', views.BookDetail.as_view()),	
	url(r'^my-books/$', views.MyBookList.as_view())
]


