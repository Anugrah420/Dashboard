<<<<<<< HEAD
from fastapi import APIRouter
from predictPrice import fare
from models import dataInput


def get_prediction(data:dataInput):
    
    result = fare(data.num1,data.num2)
    return result
=======
# from fastapi import APIRouter

# router=APIRouter()
# @router.post("/predict")
# async def get_prediction(data:ModelInput):
#     result = (data.feature_a + data.feaute_b)/2
#     return {"prediction": result,"Status":"success"}
>>>>>>> upstream/main
