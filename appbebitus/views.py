from django.shortcuts import render, get_object_or_404

# Create your views here.

from django.http import HttpResponse,JsonResponse
from .models import Producto, Producto2

def index(request):
    return HttpResponse("¡Hola, mundo! Esta es la página de inicio de appbebitus.")

def home(request):
    return render(request, 'catalogo/home.html')

def lista_productos(request):
    producto = Producto2.objects.all()
    
    breadcrumbs = [
        {'name': 'Inicio', 'url': '/'},
        {'name': 'Productos', 'url': '/listaproductos'}
    ]
    print ('breadcrumbs -> ' ,breadcrumbs)
    
    context = {
        'productos': producto,
        'breadcrumbs': breadcrumbs,
        
    }
    #return render(request, 'catalogo/lista_productos.html', {'productos': productos})
    return render(request, 'catalogo/lista_productos.html', context)

def producto_detail(request, pk):
    producto = get_object_or_404(Producto2, pk=pk)
    imagenes = list(producto.imagenes.all())    
    # Agrupamos las imágenes en pares    
    imagenes_en_pares = [imagenes[i:i + 2] for i in range(0, len(imagenes), 2)]
    breadcrumbs = [
        {'name': 'Inicio', 'url': '/'},
        {'name': 'Productos', 'url': '/listaproductos'},
        {'name': 'Detalle', 'url': '/Detalle'}
    ]
    print ('breadcrumbs -> ' ,breadcrumbs) 
    print ('imagenes_en_pares ->' ,imagenes_en_pares)   
    context = {
        'producto': producto,
        'breadcrumbs': breadcrumbs,
        'imagenes_en_pares': imagenes_en_pares,
    }
    #return render(request, 'catalogo/producto_detail.html', {'producto': producto})
    return render(request, 'catalogo/producto_detail.html', context)

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