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

    class Meta:
        model = Author
        fields = '__all__'

    def validate(self, data):
        """
        Check that start is before finish.
        """
        first_name = data["first_name"]
        last_name = data["last_name"]

        query = Author.objects.filter(
            first_name=first_name, last_name=last_name)
        authors = query.all()

        if len(authors) > 0:
            raise serializers.ValidationError("Author already exist")
        return data


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'
