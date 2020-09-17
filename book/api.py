# from rest_framework import viewsets, permissions
from collections import OrderedDict
#from django.shortcuts import get_object_or_404

#from rest_framework import viewsets, status
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import \
    CategorySerializer, \
    PublisherSerializer, \
    AuthorSerializer, \
    BookSerializer
from .models import Category, Publisher, Author, Book
# from django.core.exceptions import PermissionDenied


class CategoryViewSet(viewsets.ModelViewSet):
    """ Category ViewSet """
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class PublisherViewSet(viewsets.ModelViewSet):
    """ Publisher ViewSet """
    serializer_class = PublisherSerializer
    queryset = Publisher.objects.all()


class AuthorViewSet(viewsets.ModelViewSet):
    """ Author ViewSet """
    serializer_class = AuthorSerializer
    queryset = Author.objects.all()


class BookViewSet(viewsets.ModelViewSet):
    """ Book ViewSet """
    serializer_class = BookSerializer
    queryset = Book.objects.all()

    @action(detail=False)
    def get_all(self, request):
        query = Book.objects \
            .select_related("category") \
            .select_related("publisher") \
            .select_related("author") \
            .values("id", "title", "category__name", "publisher__name", "author__last_name", "author__first_name")
        books = query.all()
        book_list = []
        for book in books:
            first_name = book.get("author__first_name", "")
            last_name = book.get("author__last_name", "")
            if first_name is None:
                first_name = ""
            if last_name is None:
                last_name = ""
            author_name = "%s, %s" % (last_name, first_name)
            if len(author_name) == 2:
                author_name = ""
            ordered_dict = OrderedDict()
            ordered_dict["id"] = book.get("id")
            ordered_dict["title"] = book.get("title")
            ordered_dict["category"] = book.get("category__name", "")
            ordered_dict["publisher"] = book.get("publisher__name", "")
            ordered_dict["author"] = author_name
            book_list.append(ordered_dict)
        return Response(book_list)
