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
    
    actions = [
        "setIndividual",
        "setProprietoryFirm",
        "setPartnershipFirmLLP",
        "setPrivateLimited",
        "setPublicLimitedUnlisted",
        "setPublicLimitedListed",
        "setTrust",
        "setSociety",
        "setAssociations",
    ]
    
    def setIndividual(self,request,queryset):
        queryset.update(constitution="Individual")
    
    def setProprietoryFirm(self,request,queryset):
        queryset.update(constitution="Proprietory Firm")
    
    def setPartnershipFirmLLP(self,request,queryset):
        queryset.update(constitution="Partnership Firm LLP")
        
    def setPrivateLimited(self,request,queryset):
        queryset.update(constitution="Private Limited")
    
    def setPublicLimitedUnlisted(self,request,queryset):
        queryset.update(constitution="Public Limited Unlisted")
    
    def setPublicLimitedListed(self,request,queryset):
        queryset.update(constitution="Public Limited Listed")
        
    def setTrust(self,request,queryset):
        queryset.update(constitution="Trust")
        
    def setSociety(self,request,queryset):
        queryset.update(constitution="Society")
        
    def setAssociations(self,request,queryset):
        queryset.update(constitution="Associations")
        
    
admin.site.register(AdminUser, AdminUserAdmin)
