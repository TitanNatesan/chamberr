from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User


"""
approval order 

1) AO
2) CEO
3) MC
4) OB
5) GC

"""


class AdminUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    admin_type_options = [
        ('AO', 'AO'),
        ('CEO', 'CEO'),
        ('OB', 'OB'),
        ('MC', 'MC'),
        ('GC', 'GC'),
    ]
    admin_type = models.CharField(max_length=3, choices=admin_type_options, default='AO')
    
    def __str__(self):
        return self.user.username

class Form(models.Model):
    NameofApplicant = models.CharField("Name of Applicant", max_length=255, null=True, default=None)
    
    constitution_options = [
        ('Individual', 'Individual'),
        ('Proprietory Firm', 'Proprietory Firm'),
        ('Partnership Firm LLP', 'Partnership Firm LLP'),
        ('Private Limited', 'Private Limited'),
        ('Public Limited Unlisted', 'Public Limited Unlisted'),
        ('Public Limited Listed', 'Public Limited Listed'),
        ('Trust', 'Trust'),
        ('Society', 'Society'),
        ('Associations', 'Associations'),
    ]
    constitution = models.CharField("Constitution", max_length=50, choices=constitution_options, blank=True, null=True)
    
    profession1 = models.CharField("Profession 1", max_length=100, blank=True, null=True)
    profession2 = models.CharField("Profession 2", max_length=100, blank=True, null=True)
    profession3 = models.CharField("Profession 3", max_length=100, blank=True, null=True)
    
    YearofEstablishment = models.CharField("Year of Establishment", max_length=100, blank=True, null=True)
    Businessactivity = models.CharField("Business Activity", max_length=255, blank=True, null=True)
    Registerofficeaddress = models.TextField("Registered Office Address", blank=True, null=True)
    Addressforcommunication_office = models.TextField("Office Address for Communication", blank=True, null=True)
    Addressforcommunication_work = models.TextField("Work Address for Communication", blank=True, null=True)
    
    Communicationdetails_landline = models.CharField("Landline Number", max_length=20, blank=True, null=True,unique=True)
    Communicationdetails_mobile = models.CharField("Mobile Number", max_length=20, blank=True, null=True,unique=True)
    Communicationdetails_email = models.EmailField("Email Address", blank=True, null=True, unique=True)
    Communicationdetails_web = models.URLField("Website URL", max_length=200, blank=True, null=True,unique=True)
    
    Legalinfo_aadhar = models.CharField("Aadhar Number", max_length=12, blank=True, null=True,unique=True)
    Legalinfo_pancard = models.CharField("PAN Card Number", max_length=10, blank=True, null=True,unique=True)
    Legalinfo_GSTNo = models.CharField("GST Number", max_length=15, blank=True, null=True)
    Legalinfo_CompanyFirmRegNo = models.CharField("Company/Firm Registration Number", max_length=15, blank=True, null=True)
    Legalinfo_SocietyAssociationRegNo = models.CharField("Society/Association Registration Number", max_length=15, blank=True, null=True)
    
    Personauthorized_Name = models.CharField("Authorized Person Name", max_length=255, blank=True, null=True)
    Personauthorized_Designation = models.CharField("Authorized Person Designation", max_length=255, blank=True, null=True)
    personauthorized_pan = models.CharField("Authorized Person PAN Number", max_length=10, blank=True, null=True)
    personauthorized_aadhar = models.CharField("Authorized Person Aadhar Number", max_length=12, blank=True, null=True)
    personauthorized_phone = models.CharField("Authorized Person Phone Number", max_length=15, blank=True, null=True)
    personauthorized_email = models.EmailField("Authorized Person Email Address", blank=True, null=True)
    
    Maincategory = models.CharField("Main Category", max_length=255, blank=True, null=True)
    Subcategory = models.CharField("Subcategory", max_length=255, blank=True, null=True)
    
    Cateringtomarket_options = [
        ('Domestic', 'Domestic'),
        ('Global', 'Global'),
        ('Both', 'Both'),
    ]
    Cateringtomarket = models.CharField("Catering to Market", max_length=50, choices=Cateringtomarket_options, blank=True, null=True)
    
    Percentageofimports = models.CharField("Percentage of Imports", max_length=10, blank=True, null=True)
    Percentageofexports = models.CharField("Percentage of Exports", max_length=10, blank=True, null=True)
    
    Foreigncollaboration_country = models.CharField("Country of Foreign Collaboration", max_length=255, blank=True, null=True)
    Foreigncollaboration_collaborator = models.CharField("Collaborator Name", max_length=255, blank=True, null=True)
    
    Classificationofindustry_options = [
        ('Large', 'Large'),
        ('Medium', 'Medium'),
        ('Small', 'Small'),
        ('Micro', 'Micro'),
    ]
    Classificationofindustry = models.CharField("Classification of Industry", max_length=50, choices=Classificationofindustry_options, blank=True, null=True)
    
    Annualturnover_year1 = models.DecimalField("Annual Turnover Year 1", max_digits=15, decimal_places=2, blank=True, null=True)
    Annualturnover_year2 = models.DecimalField("Annual Turnover Year 2", max_digits=15, decimal_places=2, blank=True, null=True)
    Annualturnover_year3 = models.DecimalField("Annual Turnover Year 3", max_digits=15, decimal_places=2, blank=True, null=True)
    
    Noofpersonsemployed_direct = models.BigIntegerField("Number of Persons Employed Directly", blank=True, null=True)
    Noofpersonsemployed_works = models.BigIntegerField("Number of Workers Employed", blank=True, null=True)
    Noofpersonsemployed_indirect = models.BigIntegerField("Number of Indirect Employees", blank=True, null=True)
    Noofpersonsemployed_outsourced = models.BigIntegerField("Number of Outsourced Employees", blank=True, null=True)
    
    ESIC = models.CharField("ESIC Compliance", max_length=255, blank=True, null=True)
    EPF = models.CharField("EPF Compliance", max_length=255, blank=True, null=True)
    Detailsofbranches = models.TextField("Details of Branches", blank=True, null=True)
    
    Memberofanyother = models.CharField(
        "Member in Other Association",
        max_length=3,
        choices=[("Yes", "Yes"), ("No", "No")],
        default="No",
        null=True
    )
    association_name = models.CharField("Association Name", max_length=255, blank=True, null=True)
    is_office_bearer = models.CharField(
        "Office Bearer in Association",
        max_length=3,
        choices=[("Yes", "Yes"), ("No", "No")],
        default="No",
        null=True
    )
    association_position = models.CharField("Association Position", max_length=255, blank=True, null=True, default=None)
    reason_for_joining_chamber = models.TextField("Reason for Joining the Chamber", null=True, default=None)
    
    e_sign = models.FileField("E-Signature", upload_to='e_sign/', null=True)
    
    IncomeandExpenditure = models.FileField("Income and Expenditure Statement", upload_to='incomeandexpenditure/', null=True)
    incometaxtpan = models.FileField("Income Tax PAN Copy", upload_to='incometaxtpan/', null=True)
    FactoryRegistrationCertificate = models.FileField("Factory Registration Certificate", upload_to='FactoryRegistrationCertificate/', null=True)
    MemorandumArticleofAssociation = models.FileField("Memorandum and Articles of Association", upload_to='MemorandumArticleofAssociation/', null=True)
    GSTINRegistrationCopy = models.FileField("GSTIN Registration Copy", upload_to='GSTINRegistrationCopy/', null=True)
    IECodeCertificate = models.FileField("IEC Code Certificate", upload_to='IECodeCertificate/', null=True)
    ProfessionalCertificate = models.FileField("Professional Certificate", upload_to='ProfessionalCertificate/', null=True)
    CopyofLandDocument = models.FileField("Copy of Land Document", upload_to='CopyofLandDocument/', null=True)
    LandHolding = models.FileField("Land Holding", upload_to='LandHolding/', null=True)
    passportsizephoto = models.FileField("Passport Size Photo", upload_to='passportsizephoto/', null=True)
    DirectorsPartners = models.FileField("Details of Directors/Partners", upload_to='Direct1orsPartners/', null=True)
    
    form_status_options = [
        ("pending", "Pending"), 
        ("Approved by AO", "Approved by AO"), 
        ("Approved by CEO", "Approved by CEO"), 
        ("Approved by Membership Committee", "Approved by Membership Committee"), 
        ("Approved by OB", "Approved by OB"), 
        ("waiting for payment", "Waiting for Payment"),
        ("payment done (approved as Member)", "Payment Done (Approved as Member)"), 
        ("rejected", "Rejected"),
    ]
    form_status = models.CharField("Form Status", choices=form_status_options, max_length=50, default="pending",null=True)
    approved_by = models.ManyToManyField(AdminUser, related_name="approved_forms", blank=True)
    rejected_by = models.ManyToManyField(AdminUser, related_name="rejected_forms", blank=True)
    Reasonforrejection = models.TextField("Reason for Rejection", null=True, blank=True, default=None)

    # def __str__(self):
    #     return self.NameofApplicant