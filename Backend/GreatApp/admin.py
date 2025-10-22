from django.contrib import admin
from .models import Category, Product
# Register your models here.

class ProductInline(admin.TabularInline):  # or use admin.StackedInline for a different layout
    model = Product
    extra = 1  # Number of empty product slots shown by default

class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "is_featured")
    search_fields = ("name",)
    inlines = [ProductInline]  # Attach products inline

admin.site.register(Category, CategoryAdmin)
admin.site.register(Product)