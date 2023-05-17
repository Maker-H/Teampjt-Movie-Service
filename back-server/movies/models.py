from django.db import models

# Create your models here.
class Genre(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.title

class Movie(models.Model):
    title = models.CharField(max_length=100)
    released_date = models.DateField()
    popularity = models.FloatField()
    vote_avg = models.FloatField()
    overview = models.TextField()
    vote_avg = models.FloatField()
    poster_path = models.CharField(max_length=500)
    genres = models.ManyToManyField(Genre)

    def __str__(self):
        return self.title

class Comment(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


