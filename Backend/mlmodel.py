from fastapi import APIRouter
from predictPrice import fare
from models import dataInput
from models import appointmentData

def get_prediction(data:dataInput):
    
    result = fare(data.num1,data.num2)
    return result


def createAppointment(data:createAppointment,user):
    appointment_data = {
        "user_id": user.id,
        "shop_id": data.shop_id,
        "service": data.service_type,
        "scheduled_at": data.appointment_date.isoformat(),
        "status": "pending",
        "notes": data.notes
    }
    return appointment_data