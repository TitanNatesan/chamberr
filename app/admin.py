from django.contrib import admin
from .models import AdminUser, Form

class AdminUserAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'admin_type']

# class FormAdmin(admin.ModelAdmin):
    # list_display = ['id', 'NameofApplicant', 'constitution', 'form_status']
    # list_filter = ['constitution', 'form_status']
    # search_fields = ['NameofApplicant', 'Maincategory', 'Subcategory', 'association_name']

@admin.register(Form)
class FormAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Form._meta.fields]

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        filtered_data = qs.filter(form_status='pending')  # Filter directly on queryset
        return filtered_data
    
admin.site.register(AdminUser, AdminUserAdmin)
