from django.shortcuts import render, get_object_or_404

# Create your views here.

from django.http import HttpResponse,JsonResponse
from .models import Producto, Producto2

def index(request):
    return HttpResponse("¡Hola, mundo! Esta es la página de inicio de appbebitus.")

def lista_productos(request):
    productos = Producto2.objects.all()
    return render(request, 'catalogo/lista_productos_2.html', {'productos': productos})

def producto_detail_(request, pk):
    producto = get_object_or_404(Producto2, pk=pk)
    data = {
        'prod_marca': producto.prod_marca,
        'prod_talla': producto.prod_talla,
        'prod_peso_ini': producto.prod_peso_ini,
        'prod_peso_fin': producto.prod_peso_fin,
        'prod_tiempo_absorcion': producto.prod_tiempo_absorcion,
        'prod_jaba_paquetes': producto.prod_jaba_paquetes,
        'prod_jaba_precio': producto.prod_jaba_precio,
        'prod_paquete_unidad': producto.prod_paquete_unidad,
        'prod_paquete_precio': producto.prod_paquete_precio,
        'prod_detalle': producto.prod_detalle,
    }
    return JsonResponse(data)

def producto_detail(request, pk):
    producto = get_object_or_404(Producto2, pk=pk)
    return render(request, 'catalogo/producto_detail.html', {'producto': producto})