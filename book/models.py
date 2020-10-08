from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=32)

    def __str__(self):
        return self.name


class Publisher(models.Model):
    name = models.CharField(max_length=32)
    #type “government”, “standards-body”, “university”, “commercial”, “foundation”, “private”, “corporate”
    def __str__(self):
        return self.name


class Author(models.Model):
    last_name = models.CharField(max_length=32)
    first_name = models.CharField(max_length=32)

    def __str__(self):
        return self.last_name + " " + self.first_name

    @property
    def name(self):
        return self.last_name + " " + self.first_name


class Book(models.Model):
    title = models.CharField(max_length=255)
    category = models.ForeignKey(
        Category, null=True, on_delete=models.SET_NULL)
    publisher = models.ForeignKey(
        Publisher, null=True, on_delete=models.SET_NULL)
    author = models.ForeignKey(Author, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.title
