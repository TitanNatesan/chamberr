from django.contrib import admin
from .models import AdminUser, Form
from rest_framework.authtoken.admin import TokenAdmin

TokenAdmin.raw_id_fields = ['user']
class AdminUserAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'admin_type']

# class FormAdmin(admin.ModelAdmin):
    # list_display = ['id', 'NameofApplicant', 'constitution', 'form_status']
    # list_filter = ['constitution', 'form_status']
    # search_fields = ['NameofApplicant', 'Maincategory', 'Subcategory', 'association_name']

@admin.register(Form)
class FormAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Form._meta.fields]
    
admin.site.register(AdminUser, AdminUserAdmin)
