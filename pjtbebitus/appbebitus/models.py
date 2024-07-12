from django.db import models

# Create your models here.
class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    imagen = models.ImageField(upload_to='productos/')  # Necesitarás Pillow para manejar imágenes

    def __str__(self):
        return self.nombre 
    
class Producto2(models.Model):
    prod_id = models.AutoField(primary_key=True)
    prod_marca = models.CharField(max_length=100)
    prod_talla = models.CharField(max_length=50)
    prod_peso_inicio = models.DecimalField(max_digits=10, decimal_places=1)
    prod_peso_fin = models.DecimalField(max_digits=10, decimal_places=1)
    prod_tiempo_proteccion = models.IntegerField()
    prod_jaba_paquete = models.IntegerField()
    prod_jaba_peso = models.DecimalField(max_digits=10, decimal_places=1)
    prod_jaba_precio = models.DecimalField(max_digits=10, decimal_places=1)
    prod_paquete_unidad = models.IntegerField()
    prod_paquete_medida = models.CharField(max_length=50)
    prod_paquete_peso = models.DecimalField(max_digits=10, decimal_places=1)
    prod_paquete_precio = models.DecimalField(max_digits=10, decimal_places=1)
    prod_color = models.CharField(max_length=50)
    prod_descripcion = models.TextField()

    def __str__(self):
        return self.prod_marca

class Imagen(models.Model):
    imagen_id = models.AutoField(primary_key=True)
    producto = models.ForeignKey(Producto2, on_delete=models.CASCADE, related_name='imagenes')
    imagen_nombre = models.ImageField(upload_to='productos/imagenes/')

    def __str__(self):
        return f'Imagen de {self.producto.prod_marca}'