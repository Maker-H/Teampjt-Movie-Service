from django.db import models

# Create your models here.
class Map(models.Model):
    sido = models.CharField(max_length=100)
    gusi = models.CharField(max_length=100)
    dong = models.CharField(max_length=100)
    nx = models.IntegerField()
    ny = models.IntegerField()
    longitude = models.FloatField()
    latitude = models.FloatField()

    def __str__(self):
        return self.sido