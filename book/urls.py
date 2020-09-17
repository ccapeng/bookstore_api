from rest_framework import routers
from .api import CategoryViewSet, PublisherViewSet, AuthorViewSet, BookViewSet

router = routers.DefaultRouter()
router.register("api/category", CategoryViewSet, "category")
router.register("api/publisher", PublisherViewSet, "publisher")
router.register("api/author", AuthorViewSet, "author")
router.register("api/book", BookViewSet, "book")

urlpatterns = router.urls
