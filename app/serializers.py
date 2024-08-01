from rest_framework import serializers
from .models import AdminUser, Form
from django.contrib.auth.models import User

class AdminUserSerial(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']

class AdminUserSerializer(serializers.ModelSerializer):
    user = AdminUserSerial()
    class Meta:
        model = AdminUser
        fields = ['user', "admin_type"]

class AS(serializers.ModelSerializer):
    class Meta:
        model = AdminUser
        exclude = ['password', 'email']

class FormSerializer(serializers.ModelSerializer):
    approved_by = AdminUserSerializer(many=True, read_only=True)
    
    class Meta:
        model = Form
        fields = '__all__'
        extra_kwargs = {
            'NameofApplicant': {'required': True},
            'constitution': {'required': True},
            'profession1': {'required': True},
            'profession2': {'required': True},
            'profession3': {'required': True},
            'YearofEstablishment': {'required': True},
            'Businessactivity': {'required': True},
            'Registerofficeaddress': {'required': True},
            'Addressforcommunication_office': {'required': True},
            'Addressforcommunication_work': {'required': True},
            'Communicationdetails_landline': {'required': True},
            'Communicationdetails_mobile': {'required': True},
            'Communicationdetails_email': {'required': True},
            'Communicationdetails_web': {'required': True},
            'Legalinfo_aadhar': {'required': True},
            'Legalinfo_pancard': {'required': True},
            'Legalinfo_GSTNo': {'required': True},
            'Legalinfo_CompanyFirmRegNo': {'required': True},
            'Legalinfo_SocietyAssociationRegNo': {'required': True},
            'Personauthorized_Name': {'required': True},
            'Personauthorized_Designation': {'required': True},
            'personauthorized_pan': {'required': True},
            'personauthorized_aadhar': {'required': True},
            'personauthorized_phone': {'required': True},
            'personauthorized_email': {'required': True},
            'Maincategory': {'required': True},
            'Subcategory': {'required': True},
            'Cateringtomarket': {'required': True},
            'Percentageofimports': {'required': True},
            'Percentageofexports': {'required': True},
            'Foreigncollaboration_country': {'required': True},
            'Foreigncollaboration_collaborator': {'required': True},
            'Classificationofindustry': {'required': True},
            'Annualturnover_year1': {'required': True},
            'Annualturnover_year2': {'required': True},
            'Annualturnover_year3': {'required': True},
            'Noofpersonsemployed_direct': {'required': True},
            'Noofpersonsemployed_works': {'required': True},
            'Noofpersonsemployed_indirect': {'required': True},
            'Noofpersonsemployed_outsourced': {'required': True},
            'ESIC': {'required': True},
            'EPF': {'required': True},
            'Detailsofbranches': {'required': True},
            'Memberofanyother': {'required': True},
            'association_name': {'required': True},
            'is_office_bearer': {'required': True},
            'association_position': {'required': True},
            'reason_for_joining_chamber': {'required': True},
            'e_sign': {'required': True},
            'IncomeandExpenditure': {'required': True},
            'incometaxtpan': {'required': True},
            'FactoryRegistrationCertificate': {'required': True},
            'MemorandumArticleofAssociation': {'required': True},
            'GSTINRegistrationCopy': {'required': True},
            'IECodeCertificate': {'required': True},
            'ProfessionalCertificate': {'required': True},
            'CopyofLandDocument': {'required': True},
            'LandHolding': {'required': True},
            'passportsizephoto': {'required': True},
            'DirectorsPartners': {'required': True},
            'form_status': {'required': True},
            'Reasonforrejection': {'required': True},
        }

    def validate(self, data):
        for field, value in data.items():
            if value is None:
                raise serializers.ValidationError({field: "This field cannot be null."})
        return data