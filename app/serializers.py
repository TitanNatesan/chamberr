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
            'EPF': {'required': True},
            'ESIC': {'required': True},
            'e_sign': {'required': True},
            'Subcategory': {'required': True},
            'form_status': {'required': True},
            'constitution': {'required': True},
            'Maincategory': {'required': True},
            'Legalinfo_GSTNo': {'required': True},
            'NameofApplicant': {'required': True},
            'Cateringtomarket': {'required': True},
            'Businessactivity': {'required': True},
            'Legalinfo_aadhar': {'required': True},
            'association_name': {'required': True},
            'Memberofanyother': {'required': True},
            'is_office_bearer': {'required': True},
            'DirectorsPartners': {'required': True},
            'passportsizephoto': {'required': True},
            'Detailsofbranches': {'required': True},
            'Legalinfo_pancard': {'required': True},
            'Percentageofimports': {'required': True},
            'Percentageofexports': {'required': True},
            'YearofEstablishment': {'required': True},
            'personauthorized_pan': {'required': True},
            'Annualturnover_year1': {'required': True},
            'Annualturnover_year2': {'required': True},
            'Annualturnover_year3': {'required': True},
            'IncomeandExpenditure': {'required': True},
            'Personauthorized_Name': {'required': True},
            'Registerofficeaddress': {'required': True},
            'personauthorized_phone': {'required': True},
            'personauthorized_email': {'required': True},
            'personauthorized_aadhar': {'required': True},
            'Communicationdetails_web': {'required': True},
            'Classificationofindustry': {'required': True},
            'Noofpersonsemployed_works': {'required': True},
            'reason_for_joining_chamber': {'required': True},
            'Communicationdetails_email': {'required': True},
            'Legalinfo_CompanyFirmRegNo': {'required': True},
            'Noofpersonsemployed_direct': {'required': True},
            'Communicationdetails_mobile': {'required': True},
            'Noofpersonsemployed_indirect': {'required': True},
            'Addressforcommunication_work': {'required': True},
            'Foreigncollaboration_country': {'required': True},
            'Personauthorized_Designation': {'required': True},
            'Communicationdetails_landline': {'required': True},
            'Addressforcommunication_office': {'required': True},
            'Noofpersonsemployed_outsourced': {'required': True},
            'Legalinfo_SocietyAssociationRegNo': {'required': True},
            'Foreigncollaboration_collaborator': {'required': True},
            # 'LandHolding': {'required': True},
            # 'incometaxtpan': {'required': True},
            # 'IECodeCertificate': {'required': True},
            # 'CopyofLandDocument': {'required': True},
            # 'association_position': {'required': True},
            # 'GSTINRegistrationCopy': {'required': True},
            # 'ProfessionalCertificate': {'required': True},
            # 'FactoryRegistrationCertificate': {'required': True},
            # 'MemorandumArticleofAssociation': {'required': True},
        }

    def validate(self, data):
        for field, value in data.items():
            if value is None:
                raise serializers.ValidationError({field: "This field cannot be null."})
        return data
    
class UpFormSerializer(serializers.ModelSerializer):
    approved_by = AdminUserSerializer(many=True, read_only=True)
    
    class Meta:
        model = Form
        fields = '__all__'
        extra_kwargs = {
            'EPF': {'required': True},
            'ESIC': {'required': True},
            'Subcategory': {'required': True},
            'form_status': {'required': True},
            'constitution': {'required': True},
            'Maincategory': {'required': True},
            'Legalinfo_GSTNo': {'required': True},
            'NameofApplicant': {'required': True},
            'Cateringtomarket': {'required': True},
            'Businessactivity': {'required': True},
            'Legalinfo_aadhar': {'required': True},
            'association_name': {'required': True},
            'Memberofanyother': {'required': True},
            'is_office_bearer': {'required': True},
            'Detailsofbranches': {'required': True},
            'Legalinfo_pancard': {'required': True},
            'Percentageofimports': {'required': True},
            'Percentageofexports': {'required': True},
            'YearofEstablishment': {'required': True},
            'personauthorized_pan': {'required': True},
            'Annualturnover_year1': {'required': True},
            'Annualturnover_year2': {'required': True},
            'Annualturnover_year3': {'required': True},
            'Personauthorized_Name': {'required': True},
            'Registerofficeaddress': {'required': True},
            'personauthorized_phone': {'required': True},
            'personauthorized_email': {'required': True},
            'personauthorized_aadhar': {'required': True},
            'Communicationdetails_web': {'required': True},
            'Classificationofindustry': {'required': True},
            'Noofpersonsemployed_works': {'required': True},
            'reason_for_joining_chamber': {'required': True},
            'Communicationdetails_email': {'required': True},
            'Legalinfo_CompanyFirmRegNo': {'required': True},
            'Noofpersonsemployed_direct': {'required': True},
            'Communicationdetails_mobile': {'required': True},
            'Noofpersonsemployed_indirect': {'required': True},
            'Addressforcommunication_work': {'required': True},
            'Foreigncollaboration_country': {'required': True},
            'Personauthorized_Designation': {'required': True},
            'Communicationdetails_landline': {'required': True},
            'Addressforcommunication_office': {'required': True},
            'Noofpersonsemployed_outsourced': {'required': True},
            'Legalinfo_SocietyAssociationRegNo': {'required': True},
            'Foreigncollaboration_collaborator': {'required': True},
        }

    def validate(self, data):
        for field, value in data.items():
            if value is None:
                raise serializers.ValidationError({field: "This field cannot be null."})
        return data