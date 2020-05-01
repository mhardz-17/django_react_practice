from django.contrib import admin

# Register your models here.

from django.contrib import admin
from .models import Todo  # add this


class TodoAdmin(admin.ModelAdmin):  # add this
    list_display = ('title', 'description', 'completed', 'created_at', 'updated_at')  # add this


# Register your models here.
admin.site.register(Todo, TodoAdmin)  # add this
