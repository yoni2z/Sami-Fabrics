from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer, ProductsSerializer

from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    # Check if username and password are provided
    if not username or not password:
        return Response({
            'success': False,
            'message': 'Username and password are required.',
        }, status=400)

    # Authenticate the user
    user = authenticate(username=username, password=password)
    
    if user is not None:
        # User exists and credentials are valid
        return Response({
            'success': True,
            'message': 'Login successful',
            'username': user.username,
            'is_staff': user.is_staff,  # Optional: Include staff status
        })
    else:
        # Invalid credentials or user does not exist
        return Response({
            'success': False,
            'message': 'Invalid credentials',
        }, status=400)   

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    @action(detail=False, methods=["get"])
    def featured(self, request):
        """Retrieve only featured categories"""
        featured_categories = Category.objects.filter(is_featured=True)
        serializer = self.get_serializer(featured_categories, many=True)
        return Response(serializer.data)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_available=True)  # Get only available products
    serializer_class = ProductSerializer

    def get_queryset(self):
        """Filter products by category if a query parameter is provided"""
        queryset = super().get_queryset()
        category_id = self.request.query_params.get("category")
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        return queryset
    
class ProductsViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductsSerializer
