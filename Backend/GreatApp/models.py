from django.db import models
from django.utils.timezone import now

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    name_amh = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    description_amh = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to="categories/")
    is_featured = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    
class Product(models.Model):
    # name = models.CharField(max_length=255)
    # price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products")
    image = models.ImageField(upload_to="products/")
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

