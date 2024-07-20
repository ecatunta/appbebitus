from django.urls import path
from . import views

urlpatterns = [
   #path('', views.index, name='index'),  # Define una vista simple para probar
   path('', views.home, name='home'),   
   path('listaproductos/', views.lista_productos, name='lista_productos'),
   path('producto/<int:pk>/', views.producto_detail, name='producto_detail'),   
   #path('', views.lista_productos, name='lista_productos'),   
   #path('home/', views.home, name='home'),   
] 