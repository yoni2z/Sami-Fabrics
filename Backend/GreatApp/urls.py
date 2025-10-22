from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static

from .views import CategoryViewSet, ProductViewSet, ProductsViewSet, login_view

router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='categories')
router.register("products", ProductViewSet, basename="products")
router.register("product-list", ProductsViewSet, basename="product-list")

urlpatterns = [
    path("api/login/", login_view, name="login"),
    path('api/', include(router.urls)),
    path("api/categories/featured/", CategoryViewSet.as_view({"get": "featured"}), name="featured-categories"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
