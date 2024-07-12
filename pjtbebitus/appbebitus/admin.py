from django.contrib import admin

# Register your models here.
from .models import Producto, Producto2, Imagen

admin.site.register(Producto)
admin.site.register(Producto2)
admin.site.register(Imagen)
