from rest_framework import serializers

from book.models import Category, Publisher, Author, Book


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = '__all__'


class AuthorSerializer(serializers.ModelSerializer):
    #lastName = serializers.CharField(source='last_name')
    #firstName = serializers.CharField(source='first_name')

    class Meta:
        model = Author
        fields = '__all__'
        #read_only_fields = ('last_name', 'first_name')


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'
