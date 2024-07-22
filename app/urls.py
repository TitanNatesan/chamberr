from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views
from .views import login, signup, test, create_form, form_detail, Get_form_details

urlpatterns = [
    path('test/', test, name='test'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('signup/', signup, name='signup'),
    path('membershipform/', create_form, name='Membership Form'),
    path('formdetails/<int:pk>/', form_detail, name='Form Detail'),
    path('getform/', Get_form_details, name='Get Form Details'),
    path("approval/", views.getApproval, name="Approval"),
    path("update/",views.update_form,name="Update Form"),
    path("existinglogin/",views.existingLogin,name = "Existign Login"),
]
 
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)