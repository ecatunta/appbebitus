from django.urls import path
from . import views

urlpatterns = [
   # path('', views.index, name='index'),  # Define una vista simple para probar
   path('', views.lista_productos, name='lista_productos'),
   path('producto/<int:pk>/', views.producto_detail, name='producto_detail'),   
] 